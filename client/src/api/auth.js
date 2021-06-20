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
  },
  addHarvest(param) {
    return request.post("harvests/", param);
  },
  harvestByOwnerId(ownerId) {
    return request.get(`harvests/listByOwner/${ownerId}`);
  },
  harvestById(id) {
    return request.get(`harvests/info/${id}`)
  },
  harvests() {
    return request.get("harvests/list");
  },
  addProduct(param) {
    return request.post("products/", param);
  },
  productsByHarvestId(harvestId) {
    return request.get(`products/list/${harvestId}`);
  },
  addProcess(param) {
    return request.post("processes/", param);
  },
  GetProccessById(harvestId, ProductId) {
    return request.get(`processes/list/${harvestId}/${ProductId}`);
  },
  productByUniqueId(uniqueId) {
    return request.get(`products/detailByUniqueId/${uniqueId}`)
  },
  updateProduct(param) {
    return request.post("products/update/", param);
  },
  processesByHarvestAndProduct(harvestId, productId) {
    return request.get(`processes/list/${harvestId}/${productId}`)
  }
});
