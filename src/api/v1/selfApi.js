import BaseApi from './_baseApi'

export default class extends BaseApi {
  getTransactions({ page, take }) {
    return this.http.get('user/transactions', {
      page,
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

  readMessage(id) {
    return this.http.post('user/notification/read', { id })
  }

  readNotice(id) {
    return this.http.post('user/notice/mark', { id })
  }

  readAllMessage() {
    return this.http.post('user/notification/clear')
  }

  systemNotice() {
    return this.http.get('user/notice/list')
  }
}
