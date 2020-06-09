// 此处填入你的真实环境 ID
var envId = "your-env-id"

class FunctionQuickStarter {
  constructor() {
    // 绑定 dom
    this.firstNumber = document.getElementById("first-number");
    this.secondNumber = document.getElementById("second-number");
    this.addNumbersButton = document.getElementById("add-button");
    // 绑定 dom listener
    this.addNumbersButton.addEventListener("click", this.handleAddNumbers.bind(this), false)

    // 初始化 CloudBase
    this.app = tcb.init({
      env: envId
    })

    this.addNumbersButton.disabled = true
    this.signIn()
  }

  signIn() {
    var auth = this.app.auth({
      persistence: "local"
    })
    if(!auth.hasLoginState()) {
      auth.signInAnonymously().then(() => {
        this.addNumbersButton.disabled = false
      })
    } else {
      this.addNumbersButton.disabled = false
    }
  }

  handleAddNumbers(e) {
    e.stopPropagation()
    e.preventDefault()
    
    var firstNumber = parseFloat(this.firstNumber.value);
    var secondNumber = parseFloat(this.secondNumber.value);
    var addNumbersButton = this.addNumbersButton

    addNumbersButton.disabled = true

    this.app.callFunction({
      name: "addNumbers",
      data: { firstNumber: firstNumber, secondNumber: secondNumber }
    }).then(function(res) {

      if (res.code) {
        console.log("云函数调用失败", res);
        // 打印云函数失败信息
        window.alert(
          `云函数调用失败: [code=${res.code}] [message=${res.message}]`
        )
      } else {
        console.log("云函数调用成功", res);
        // 提取云函数回包信息
        var result = res.result
        // 打印云函数结果
        window.alert(
          "云函数计算结果: " 
          + result.firstNumber + " + "
          + result.secondNumber + " = " 
          + result.operationResult
        );
      }

      addNumbersButton.disabled = false;
    })
  }
}

window.addEventListener("load", function() {
  window.app = new FunctionQuickStarter()
})