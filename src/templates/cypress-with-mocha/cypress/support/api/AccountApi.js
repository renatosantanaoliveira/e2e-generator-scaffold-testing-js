import BaseApi from './BaseApi'

class AccountApi extends BaseApi {
  createUser(username, password) {
    return this._request({
      method: 'POST',
      endpoint: '/Account/v1/User',
      body: { userName: username, password },
    })
  }

  generateToken(username, password) {
    return this._request({
      method: 'POST',
      endpoint: '/Account/v1/GenerateToken',
      body: { userName: username, password },
    })
  }

  deleteUser(userId, token) {
    return this._request({
      method: 'DELETE',
      endpoint: `/Account/v1/User/${userId}`,
      headers: { Authorization: `Bearer ${token}` },
    })
  }

  authorizeUser(username, password) {
    return this._request({
      method: 'POST',
      endpoint: '/Account/v1/Authorized',
      body: { userName: username, password },
    })
  }
}

export default new AccountApi()
