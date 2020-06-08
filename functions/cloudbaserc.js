module.exports = {
    envId: "test-cloud-5f25f8",
    functionRoot: "./functions",
    functions: [
        {
            name: "addNumbers",
            // 超时时间
            timeout: 5,
            // 环境变量
            envVariables: {},
            runtime: "Nodejs10.15",
            // 内存 128
            memorySize: 128,
            handler: "index.main"
        }
    ]
};
