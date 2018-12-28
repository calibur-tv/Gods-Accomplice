import BaseApi from './_baseApi'

export default class extends BaseApi {
  getMainCommentList({ type, id, fetchId, onlySeeMaster, seeReplyId }) {
    return this.http.get('comment/main/list', {
      fetchId,
      onlySeeMaster,
      seeReplyId,
      type,
      id
    })
  }

  getMainCommentItem({ type, comment_id, reply_id }) {
    return this.http.get('comment/main/item', {
      type,
      comment_id,
      reply_id
    })
  }

  getSubCommentList({ type, id, maxId }) {
    return this.http.get('comment/sub/list', { maxId, type, id })
  }

  createMainComment({ type, id, content, images }) {
    return this.http.post('comment/main/create', {
      content,
      images,
      type,
      id
    })
  }

  createSubComment({ type, id, content, targetUserId }) {
    return this.http.post('comment/main/reply', {
      targetUserId,
      content,
      type,
      id
    })
  }

  deleteSubComment({ type, id }) {
    return this.http.post('comment/sub/delete', {
      type,
      id
    })
  }

  deleteMainComment({ type, id }) {
    return this.http.post('comment/main/delete', {
      type,
      id
    })
  }

  toggleLikeMainComment({ type, id }) {
    return this.http.post('comment/main/toggleLike', {
      type,
      id
    })
  }

  toggleLikeSubComment({ type, id }) {
    return this.http.post('comment/sub/toggleLike', {
      type,
      id
    })
  }

  reportComment({ id, model }) {
    return this.http.post('report/send', {
      id,
      type: 0,
      model
    })
  }
}
