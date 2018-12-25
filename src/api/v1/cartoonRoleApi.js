import BaseApi from './_baseApi'

export default class extends BaseApi {
  star({ roleId }) {
    return this.http.post(`/cartoon_role/${roleId}/star`)
  }

  fans({ roleId, seenIds, minId, sort }) {
    return this.http.get(`/cartoon_role/${roleId}/fans`, {
      seenIds,
      minId,
      sort
    })
  }
}
