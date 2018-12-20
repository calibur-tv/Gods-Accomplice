import BaseApi from './_baseApi'

export default class extends BaseApi {
  getTransactions({ min_id, take }) {
    return this.http.get('user/transactions', {
      min_id,
      take
    })
  }

  getNotifications({ minId }) {
    return this.http.get('user/notification/list', { minId })
  }

  getBookmarks({ page, take, type }) {
    return this.http.get('user/bookmarks', { page, take, type })
  }

  daySign() {
    return this.http.post('user/daySign')
  }
}
