// 此处填入你的真实环境 ID
const envId = "your-env-id"
const credentials = require('./tcb_custom_login_key.json')

const tcb = require('@cloudbase/node-sdk')

exports.main = async (event) => {
  // 1. 初始化 SDK
  const app = tcb.init({
    env: envId,
    // 传入自定义登录私钥
    credentials: credentials
  })

  // 2. 开发者自定义的用户唯一身份标识
  const body = JSON.parse(event.body)
  const customUserId = body.customUserId

  // 3. 创建ticket
  const ticket = app.auth().createTicket(customUserId)
  
  // 4. 将ticket返回至客户端
  return { ticket }
}