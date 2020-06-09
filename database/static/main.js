// 此处填入你的真实环境 ID
var envId = "your-env-id"

class FunctionQuickStarter {
  constructor() {
    // 绑定 dom
    this.addNameInput = document.getElementById("add-name")
    this.queryNameInput = document.getElementById("query-name")
    this.deleteNameInput = document.getElementById("delete-name")
    this.addScoreInput = document.getElementById("add-score")
    this.addDataButton = document.getElementById("add-button")
    this.queryDataButton = document.getElementById("query-button")
    this.queryAllDataButton = document.getElementById("query-all-button")
    this.queryTopDataButton = document.getElementById("query-top-button")
    this.deleteDataButton = document.getElementById("delete-button")
    // 绑定 dom listener
    this.addDataButton.addEventListener("click", this.addData.bind(this), false)
    this.queryDataButton.addEventListener("click", this.queryData.bind(this), false)
    this.queryAllDataButton.addEventListener("click", this.queryAllData.bind(this), false)
    this.queryTopDataButton.addEventListener("click", this.queryTopData.bind(this), false)
    this.deleteDataButton.addEventListener("click", this.deleteData.bind(this), false)

    // 初始化 CloudBase
    this.app = tcb.init({
      env: envId
    })

    this.setButtonStatus(true)
    this.signIn()
  }

  setButtonStatus(status) {
    this.addDataButton.disabled = status
    this.queryDataButton.disabled = status
    this.queryAllDataButton.disabled = status
    this.queryTopDataButton.disabled = status
    this.deleteDataButton.disabled = status
  }

  // 匿名登录
  signIn() {
    var auth = this.app.auth({
      persistence: "local"
    })
    if(!auth.hasLoginState()) {
      auth.signInAnonymously().then(() => {
        this.setButtonStatus(false)
      })
    } else {
      this.setButtonStatus(false)
    }
  }

  // 录入成绩
  addData(e) {
    e.stopPropagation()
    e.preventDefault()
    
    var name = this.addNameInput.value
    var score = parseFloat(this.addScoreInput.value)
    var coll = this.app.database().collection("test_db")

    if (!name) {
      window.alert(
        `姓名不能为空!`
      )
      return
    }
    if (!(score > 0 && score < 100)) {
      window.alert(
        `录入成绩需要在 0 ~ 100 之间`
      )
      return
    }

    this.setButtonStatus(true)

    coll.add({
      name: name,
      score: score
    }).then((res) => {

      if (res.code) {
        console.log("数据库新增失败", res)
        // 打印数据库新增失败的信息
        window.alert(
          `成绩录入失败: [code=${res.code}] [message=${res.message}]`
        )
      } else {
        console.log("数据库新增成功", res)
        window.alert(
          `成绩录入成功!`
        )
      }

      this.setButtonStatus(false)
    })
  }

  // 查询个人成绩
  queryData(e) {
    e.stopPropagation()
    e.preventDefault()

    var name = this.queryNameInput.value
    var coll = this.app.database().collection("test_db")

    if (!name) {
      window.alert(
        `姓名不能为空!`
      )
      return
    }

    this.setButtonStatus(true)

    coll.where({
      name: name
    }).get().then((res) => {

      if (res.code) {
        console.log("数据库查询失败", res)
        // 打印数据库查询失败的信息
        window.alert(
          `成绩查询失败: [code=${res.code}] [message=${res.message}]`
        )
      } else {
        console.log("数据库查询成功", res)
        // 打印数据库查询结果
        if (res.data.length > 0) {
          var data = res.data[0]
          window.alert(
            `${name} 同学的成绩是: ${data.score} 分`
          )
        } else {
          window.alert(
            `查无此人!`
          )
        }
        
      }

      this.setButtonStatus(false)
    })
  }

  // 查询全部成绩
  queryAllData(e) {
    e.stopPropagation()
    e.preventDefault()

    var coll = this.app.database().collection("test_db")

    this.setButtonStatus(true)

    coll.where({}).get().then((res) => {

      if (res.code) {
        console.log("数据库查询失败", res)
        // 打印数据库查询失败的信息
        window.alert(
          `成绩查询失败: [code=${res.code}] [message=${res.message}]`
        )
      } else {
        console.log("数据库查询成功", res)
        // 打印数据库查询结果
        var printStr = ""
        res.data.forEach(item => {
          printStr += `${item.name} 同学的成绩是: ${item.score} 分 \n`
        })

        window.alert(printStr)
      }

      this.setButtonStatus(false)
    })
  }

  // 查询最高分
  queryTopData(e) {
    e.stopPropagation()
    e.preventDefault()

    var coll = this.app.database().collection("test_db")

    this.setButtonStatus(true)

    coll.where({}).orderBy("score", "desc").get().then((res) => {

      if (res.code) {
        console.log("数据库查询失败", res)
        // 打印数据库查询失败的信息
        window.alert(
          `成绩查询失败: [code=${res.code}] [message=${res.message}]`
        )
      } else {
        console.log("数据库查询成功", res)
        // 打印数据库查询结果
        if (res.data.length > 0) {
          var data = res.data[0]
          window.alert(
            `最高分是: ${data.name} 同学的 ${data.score} 分`
          )
        } else {
          window.alert(
            `请先录入学生成绩!`
          )
        }
        
      }

      this.setButtonStatus(false)
    })
  }

  // 删除成绩
  deleteData(e) {
    e.stopPropagation()
    e.preventDefault()

    var name = this.deleteNameInput.value
    var coll = this.app.database().collection("test_db")

    if (!name) {
      window.alert(
        `姓名不能为空!`
      )
      return
    }

    this.setButtonStatus(true)

    coll.where({
      name: name
    }).remove().then((res) => {

      if (res.code) {
        console.log("数据库删除失败", res)
        // 打印数据库删除失败的信息
        window.alert(
          `成绩删除失败: [code=${res.code}] [message=${res.message}]`
        )
      } else {
        console.log("数据库删除成功", res)
        window.alert(
          `成绩删除成功!`
        )        
      }

      this.setButtonStatus(false)
    })
  }
}

window.addEventListener("load", function() {
  window.app = new FunctionQuickStarter()
})