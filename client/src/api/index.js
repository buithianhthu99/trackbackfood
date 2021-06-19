import request from "./request";
import requestWrapper from "./auth";

const api = requestWrapper(request);

export default api;
