import { LocalStorage, Notify, Loading } from "quasar";
const METHOD = {
  GET: "GET",
  HEAD: "HEAD",
  PUT: "PUT",
  DELETE: "DELETE",
  PATCH: "PATCH",
  POST: "POST"
};

const API_URI = process.env.PTW_API || "http://localhost:3000";

const request = {
  call: async (path, parameters = {}) => {
    try {
      // call API
      console.log(parameters);
      const url = `${API_URI}/${path}`;
      const response = await fetch(url, parameters);
      if (!response.ok) {
        const exception = await response.json();
        throw new Error(exception.message || "Internal server error");
      }
      const reponseBody = await response.json();
      if (reponseBody.statusCode >= 300) {
        throw Error(reponseBody.mesage);
      }
      return reponseBody;
    } catch (error) {
      Notify.create({
        type: "negative",
        color: "negative",
        timeout: 1000,
        position: "top-right",
        message: error.message || "Opps. Something went wrong !!!"
      });
    } finally {
      Loading.hide();
    }
  },
  parameters: (method = METHOD.GET, body = {}, extra) => {
    const withBody = [METHOD.PUT, METHOD.PATCH, METHOD.POST];
    const token = LocalStorage.getItem("token");
    let params = {};

    if (extra && extra.isUpload) {
      params = {
        method,
        "Cache-Control": "no-cache",
        ...(token && { Authorization: `bearer ${token}` }),
        body
      };
    } else {
      params = {
        method,
        headers: {
          "Content-type": "application/json",
          ...(token && { Authorization: `bearer ${token}` }),
          "Cache-Control": "no-cache",
          ...(method === METHOD.PUT && { "Content-Length": 0 })
        },
        ...(withBody.includes(method) && { body: JSON.stringify(body) })
      };
    }
    return params;
  },
  delete: url => {
    return request.call(url, request.parameters(METHOD.DELETE));
  },
  get: url => {
    return request.call(url, request.parameters(METHOD.GET));
  },
  patch: (url, body = {}) => {
    return request.call(url, request.parameters(METHOD.PATCH, body));
  },
  post: (url, body = {}) => {
    return request.call(url, request.parameters(METHOD.POST, body));
  },
  put: (url, body = {}) => {
    return request.call(url, request.parameters(METHOD.PUT, body));
  },
  upload: (url, formData) => {
    return request.call(
      url,
      request.parameters(METHOD.POST, formData, { isUpload: true })
    );
  }
};

export default request;
