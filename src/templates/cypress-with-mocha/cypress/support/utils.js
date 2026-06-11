class Util {
  getRandomPhone() {
    return Math.floor(Math.random() * 99999999999 + 1)
  }

  getRandomPassword() {
    return Math.random().toString(36).slice(-7)
  }

  getRandomCode(length = 6) {
    const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
    let result = ''
    for (let i = 0; i < length; i++) {
      result += chars[Math.floor(Math.random() * chars.length)]
    }
    return result
  }
}

export default new Util()
