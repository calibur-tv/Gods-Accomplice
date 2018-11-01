web templates in app

## Prepare

`node v8.9.4`    `npm 5.6.0`

```
npm i
```

## development

```
npm run dev
```

```
npm run mock
```

通过6006端口即可在浏览器中预览模板
预览地址示例: http://localhost:6006/hugo/v9

> 暂不支持auto reload功能，需要手动刷新浏览器

## build

```
// staging build
npm run sg

// production build
npm run build
```
## deploy

```
// 第一次需要执行
ssh-add -k

// 部署到staging
npm run dsg

// 部署到production
npm run dpd
```

## 文件说明

* mock-server 用于mock数据
* src/container 用于存放文章页及分享模板的vue文件
* src/tpl 用于存放文章页及分享模板的入口文件

