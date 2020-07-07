// 此处填入你的真实环境 ID
var envId = "your-env-id"

class AuthQuickStarter {
  constructor() {
    // 绑定 dom
    this.userStatus = document.getElementById("user-status")
    this.anonymousLoginButton = document.getElementById("anonymous-login-button")
    this.customLoginButton = document.getElementById("custom-login-button")
    this.customUserId = document.getElementById("custom-user-id")
    this.customUserName = document.getElementById("custom-user-name")
    this.customUserMail = document.getElementById("custom-user-mail")
    this.logoutButton = document.getElementById("logout-button")
    this.updateUserButton = document.getElementById("update-user-button")
    // 绑定 dom listener
    this.anonymousLoginButton.addEventListener("click", this.signInAnonymously.bind(this), false)
    this.customLoginButton.addEventListener("click", this.signInWithTicket.bind(this), false)
    this.logoutButton.addEventListener("click", this.signOut.bind(this), false)
    this.updateUserButton.addEventListener("click", this.updateUserInfo.bind(this), false)

    // 初始化 CloudBase
    this.app = tcb.init({
      env: envId
    })
    this.auth = this.app.auth({
      persistence: "local"
    })

    this.auth.onLoginStateChanged(this.onLoginStateChanged.bind(this))
  }

  // 匿名登录
  signInAnonymously(e) {
    e.stopPropagation()
    e.preventDefault()

    var loginState = this.auth.hasLoginState()

    if (loginState && loginState.isAnonymousAuth) {
      window.alert("[匿名登录] 登录态已存在，不能重新登录")
    } else {
      this.auth
        .anonymousAuthProvider()
        .signIn()
        .then(() => {
          window.alert("[匿名登录] 登录成功")
        })
        .catch((err) => {
          if (err.message === "[INVALID_OPERATION] Invalid operation") {
            window.alert("不能从 [自定义登录] 或 [微信登录] 退化到 [匿名登录]")
          } else {
            throw err
          }
        })
    }
  }

  // 自定义登录
  signInWithTicket(e) {
    e.stopPropagation()
    e.preventDefault()

    var loginState = this.auth.hasLoginState()

    if (loginState && loginState.isCustomAuth) {
      window.alert("[自定义登录] 登录态已存在，不能重新登录")
    } else {
      var userId = this.customUserId.value
      // 校验自定义用户ID
      var checkUserIdRegex = /^[a-zA-Z0-9_\-#@~=*(){}[\]:.,<>+]{4,32}$/
      if (!checkUserIdRegex.test(userId)) {
        window.alert("[自定义登录] 自定义用户ID必须是4-32位字符, 且字符只能是大小写英文字母、数字、以及 _-#@(){}<>[]:.,<>+#~ 中的字符")
        return
      }
      // 换取自定义登录凭证
      axios.post(
        "https://" + envId + ".service.tcloudbase.com/generateTicket",
        { customUserId: userId}
      )
      .then((res) => {
        // 进行自定义登录
        this.auth
          .customAuthProvider()
          .signIn(res.data.ticket)
          .then(() => {
            window.alert("[自定义登录] 登录成功")
          })
          .catch((err) => {
            throw err
          })
      })
      .catch((err) => {
        throw err
      })
    }
  }

  // 退出登录
  signOut(e) {
    e.stopPropagation()
    e.preventDefault()

    this.auth
      .signOut()
      .then(() => {
        window.alert("退出登录成功")
      })
      .catch((err) => {
        if (err.message === "[tcb-js-sdk] 匿名用户不支持登出操作") {
          window.alert("匿名用户不支持登出操作")
        } else {
          throw err
        }
      })
  }

  updateUserInfo(e) {
    e.stopPropagation()
    e.preventDefault()

    var loginState = this.auth.hasLoginState()
    var nickName = this.customUserName.value

    if (!loginState) {
      window.alert("请先登录")
    } else if (loginState.isAnonymousAuth) {
      window.alert("匿名登录不支持修改用户信息")
    } else {
      loginState
        .user
        .update({
          nickName: nickName,
        })
        .then(() => {
          window.alert("修改用户信息成功")
          this.onLoginStateChanged(loginState)
        })
        .catch((err) => {
          throw err
        })
    }
  }

  onLoginStateChanged(loginState) {
    console.log(loginState)
    // 匿名登录
    if (loginState && loginState.isAnonymousAuth) {
      this.userStatus.innerHTML = 
        "匿名登录<br>用户ID: " + loginState.user.uid
      return
    }

    // 自定义登录
    if (loginState && (loginState.isCustomAuth || loginState.user.customUserId)) {
      var content = "自定义登录<br>用户ID: " + loginState.user.customUserId
      if (loginState.user.nickName) {
        content += ("<br>用户昵称: " + loginState.user.nickName)
      }
      
      this.userStatus.innerHTML = content
      return
    }

    this.userStatus.innerHTML = "未登录"
  }
}

window.addEventListener("load", function() {
  window.app = new AuthQuickStarter()
})