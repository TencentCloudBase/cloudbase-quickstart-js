// 此处填入你的真实环境 ID
var envId = 'your-env-id'

class StorageQuickStarter {
  constructor() {
    // 绑定 dom
    this.fileButton = document.getElementById('file')
    // 绑定 dom listener
    this.fileButton.addEventListener('change', this.handleFileSelect.bind(this), false)

    // 初始化 CloudBase
    this.app = tcb.init({
      env: envId
    })

    this.fileButton.disabled = true
    this.signIn()
  }

  signIn() {
    const auth = this.app.auth({
      persistence: 'local'
    })
    if(!auth.hasLoginState()) {
      auth.signInAnonymously().then(() => {
        this.fileButton.disabled = false
      })
    } else {
      this.fileButton.disabled = false
    }
  }

  handleFileSelect(e) {
    e.stopPropagation()
    e.preventDefault()

    const file = e.target.files[0]
    const name = file.name

    this.app.uploadFile({
      cloudPath: name,
      filePath: file
    }).then(res => {
      // 云文件ID
      const fileID = res.fileID
      // 通过云文件ID 获取 云文件链接
      this.app.getTempFileURL({
        fileList: [fileID]
      }).then(res => {
        var file = res.fileList[0]
        var url = file.tempFileURL
        document.getElementById('linkbox').innerHTML = '<a href="' +  url + '">' + name + '</a>';
      })
    })
  }
}

window.addEventListener('load', function() {
  window.app = new StorageQuickStarter()
})