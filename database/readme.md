# 云数据库快速开始

## 准备工作
1. [拥有腾讯云账号](https://docs.cloudbase.net/quick-start/create-env.html)
2. **务必**[创建云开发环境](https://docs.cloudbase.net/quick-start/create-env.html)，获得 **环境 ID**
3. 安装 [Node.js](https://nodejs.org/en/)
4. 安装 [Cloudbase CLI](https://docs.cloudbase.net/quick-start/install-cli.html)

```sh
npm install -g @cloudbase/cli
```

## 第 1 步：注入环境 ID

打开源码目录下的 `cloudbaserc.js` 文件，并填入你的 `envId`

```js
module.exports = {
    // 此处填入你的真实环境 ID
    envId: "your-env-id",

    ...
};
```

打开源码目录下的 `static/main.js` 文件，并填入你的 `envId`

```js
// 此处填入你的真实环境 ID
var envId = 'your-env-id'

...
```

## 第 2 步：添加安全域名

```sh
cloudbase login

# envId 应该是你的真实环境 ID
cloudbase env:domain:create envId.tcloudbaseapp.com
```

## 第 3 步：部署静态网站

进入源码目录进行静态网站部署

```js
cd database

cloudbase hosting:deploy ./static ./database
```

使用 envId.tcloudbaseapp.com/database 访问你的网站（envId 应该是你的真实环境 ID）