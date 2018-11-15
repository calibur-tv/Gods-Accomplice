import BaseApi from "./_baseApi";

export default class extends BaseApi {
  getTransactions({ min_id, take }) {
    return this.http.get("user/transactions", {
      min_id,
      take
    });
  }

  getNotifications({ minId }) {
    return this.http.get("user/notification/list", {
      params: { minId }
    });
  }
}
