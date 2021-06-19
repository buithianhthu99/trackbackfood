import request from "src/api/request";
import authenModule from "src/api/auth";

const apiRoot = {
  auth: authenModule(request)
};

export default ({ app, router, Vue }) => {
  Vue.prototype.$api = apiRoot;
};
