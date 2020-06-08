/**
 * sum 函数
 */
exports.main = async (event) => {
  console.log(event);
  return {
    firstNumber: event.firstNumber,
    secondNumber: event.secondNumber,
    operationResult: event.firstNumber + event.secondNumber
  };
}
