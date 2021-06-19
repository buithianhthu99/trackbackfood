import { buildQueryString } from "src/utils/helpers";

export default request => ({
  uploadFileToS3(url, formData) {
    return request.upload(url, formData);
  },
  logIn(param) {
    return request.post("users/signin", param);
  },
  SignUp(param) {
    return request.post("users/signup", param);
  }
});
