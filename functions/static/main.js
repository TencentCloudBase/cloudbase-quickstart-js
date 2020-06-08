class FunctionQuickStarter {
  constructor() {
    // 绑定 dom
    this.firstNumber = document.getElementById('first-number');
    this.secondNumber = document.getElementById('second-number');
    this.addNumbersButton = document.getElementById('add-button');
    // 绑定 dom listener
    this.addNumbersButton.addEventListener('click', this.handleAddNumbers.bind(this), false)

    // 初始化 CloudBase
    this.app = tcb.init({
      env: "test-cloud-5f25f8"
    })

    this.addNumbersButton.disabled = true
    this.signIn()
  }

  signIn() {
    const auth = this.app.auth({
      persistence: 'local'
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
    var firstNumber = parseFloat(this.firstNumber.value);
    var secondNumber = parseFloat(this.secondNumber.value);
    var addNumbersButton = this.addNumbersButton

    addNumbersButton.disabled = true

    this.app.callFunction({
      name: 'addNumbers',
      data: { firstNumber: firstNumber, secondNumber: secondNumber }
    }).then(function(data) {

      if (data.code) {
        console.log('云函数调用失败', data);
        // 打印云函数失败信息
        window.alert(
          `云函数调用失败: [code=${data.code}] [message=${data.message}]`
        )
      } else {
        console.log('云函数调用成功', data);
        var firstNumber = data.result.firstNumber;
        var secondNumber = data.result.secondNumber;
        var operationResult = data.result.operationResult;
        // 打印云函数结果
        window.alert(
          '云函数计算结果: ' 
          + firstNumber + ' + '
          + secondNumber + ' = ' 
          + operationResult
        );
      }

      addNumbersButton.disabled = false;
    })
  }
}

window.addEventListener('load', function() {
  window.app = new FunctionQuickStarter()
})