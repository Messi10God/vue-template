const users = [
  /** 为权限设置不同用户 */
  {
    userName: 'admin',
    password: '12345'
  }
]

module.exports = [
  {
    url: '/login',
    type: 'post',
    response: (config) => {
      const { userName, password } = config.body;
      if(users.find(t => t.userName === userName && t.password === password)) {
        return {
          success: true,
          data: {
            token: 'OIHOHASOIFHOIASH',
          }
        }
      } else {
        return {
          success: false,
          data: {
            token: '',
          }
        }
      }
    }
  }
]
