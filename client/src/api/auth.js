import { buildQueryString } from "src/utils/helpers";

export default request => ({
  uploadFileToS3(url, formData) {
    return request.upload(url, formData);
  },
  logIn(param) {
    return request.post("users/signin", param);
  },

  //staff
  getEmployees(params) {
    const role = "staff";
    return request.get(`users?${buildQueryString(params)}&&role=${role}`);
  },

  createEmployee(param) {
    return request.post("users", param);
  },

  deleteEmployee(id) {
    return request.delete(`users/${id}`);
  },

  getEmployeeById(id) {
    return request.get(`users?id=${id}`);
  },

  updateEmployee(id, param) {
    return request.patch(`users/${id}`, param);
  },

  //customers
  getCustomers(params) {
    const role = "customer";
    return request.get(`users?${buildQueryString(params)}&&role=${role}`);
  },

  createCustomer(param) {
    return request.post("users", param);
  },

  getCustomerById(id) {
    return request.get(`users?id=${id}`);
  },

  updateCustomer(id, param) {
    return request.patch(`users/${id}`, param);
  },

  deleteCustomer(id) {
    return request.delete(`users/${id}`);
  },

  getCompanies() {
    return request.get("company");
  },

  searchCustomerByName(param) {
    const { role, name } = param;
    return request.get(`users?role=${role}&search=${name}`);
  },

  resetBalanceByMonth() {
    return request.patch("users/reset-balance");
  },

  resetBalanceByQuarter() {
    return request.patch("users/reset-balance-every-quarter");
  },
  //menu
  getCategories(params) {
    return request.get(`categories?${buildQueryString(params)}`);
  },

  deleteCategory(id) {
    return request.delete(`categories/${id}`);
  },

  createCategory(param) {
    return request.post("categories", param);
  },

  getCategoryById(id) {
    return request.get(`categories/${id}`);
  },
  updateCategory(id, param) {
    return request.patch(`categories/${id}`, param);
  },

  getProducts(params) {
    return request.get(`products?${buildQueryString(params)}`);
  },

  getProduct() {
    return request.get(`products`);
  },

  createProduct(param) {
    return request.post("products", param);
  },

  getProductById(id) {
    return request.get(`products/${id}`);
  },

  updateProduct(id, param) {
    return request.patch(`products/${id}`, param);
  },

  deleteProduct(id) {
    return request.delete(`products/${id}`);
  },

  getUploadUrl(filename) {
    return request.post(`file`, { filename });
  },

  getMenus(params) {
    return request.get(`menus?${buildQueryString(params)}`);
  },
  getMenuById(id) {
    return request.get(`menus/${id}`);
  },
  createMenu(param) {
    return request.post("menus", param);
  },
  updateMenu(id, param) {
    return request.patch(`menus/${id}`, param);
  },
  deleteMenu(id) {
    return request.delete(`menus/${id}`);
  },
  //order
  getOrders(queryParams) {
    return request.get(`orders?${buildQueryString(queryParams)}`);
  },
  deleteOrder(id) {
    return request.delete(`orders/firebase/${id}`);
  },

  //inventory
  getUnits() {
    return request.get("categories");
  },

  getUnitById(id) {
    return request.patch("categories/:id", id);
  },

  createUnit(param) {
    return request.post("categories", param);
  },

  updateUnit(id, param) {
    return request.patch("categories/:id", id, param);
  },

  deleteUnit(id) {
    return request.delete("orders/:id", id);
  },

  getRealInventory() {
    return request.get("categories");
  },

  getVirtualInventory() {
    return request.get("categories");
  },

  createInventory(param) {
    return request.post("categories", param);
  },

  getIngredientById(id) {
    return request.patch("categories/:id", id);
  },

  updateIngredient() {
    return request.patch("categories/:id", id, param);
  },

  deleteIngredient(id) {
    return request.delete("categories/:id", id);
  },

  getRequest(params) {
    return request.get(`stock-reports?${buildQueryString(params)}`);
  },
  getRequestById(id) {
    return request.get(`stock-reports/${id}`);
  },
  updateSentAmount(idProduct, idRequest, param) {
    return request.patch(
      `stock-reports/${idRequest}/stock-records/${idProduct}`,
      param
    );
  },
  updateStatus(id, param) {
    return request.patch(`stock-reports/${id}`, param);
  },

  //feedback
  getFeedBacks(payload) {
    const { limit = 10, offset = 0 } = payload;
    return request.get(`feedbacks?limit=${limit}&offset=${offset}`);
  },
  getFeedbackById(id) {
    return request.get(`feedbacks/${id}`);
  },
  //dashboard
  getDashboardImmediately() {
    return request.get("daily-reports/daily-report-immedialely");
  },
  getDashboard(payload) {
    return request.get(`daily-reports?${buildQueryString(payload)}`);
  },
  checkExistingId(params) {
    return request.post("users/checkId", params);
  }
});
