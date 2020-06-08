# 云函数快速开始

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

## 第 2 步：部署云函数

进入源码目录进行云函数部署

```sh
cd functions
cloudbase login
cloudbase functions:deploy
```

## 第 3 步：部署静态网站

进入源码目录进行静态网站部署

```js
cd functions
cloudbase hosting:deploy ./static
```

使用 envId.tcloudbaseapp.com 访问你的网站