# 前端本地开发

前端仓库为：[https://github.com/wanglin2/lx-doc](https://github.com/wanglin2/lx-doc)。

实现克隆本仓库，然后要开发哪个项目进入哪个目录即可。

## 通用项目

`workbench`、`whiteboard`、`sheet`、`ppt`、`doc`、`markdown`、`bpmn`、`note`项目的本地开发模式都是一致的。

1.安装依赖

进入对应项目目录下执行：

```bash
npm i
```

2.启动

```bash
npm run mockDev
```

接口请求都会走模拟数据，模拟数据可以在`/src/api/mock.js`文件中配置。

如果你先启动了后端项目，那么可以直接访问后端接口，此时启动命令为：

```bash
npm run dev
```

默认代理的地址为`http://localhost:9222/`，如果你部署的后端服务端口不是`9222`，那么可以自行修改各个项目下的配置文件。

3.打包

```bash
npm run build
```

打包生成的`dist`目录下的内容即是部署产物。

## 思维导图项目

`mind-map`目录。

1.安装依赖

进入项目目录下执行：

```bash
npm i
```

2.启动

```bash
npm run mockServe
```

接口请求都会走模拟数据，模拟数据可以在`/src/api/mock.js`文件中配置。

如果你先启动了后端项目，那么可以直接访问后端接口，此时启动命令为：

```bash
npm run serve
```

默认代理的地址为`http://localhost:9222/`，如果你部署的后端服务端口不是`9222`，那么可以自行修改各个项目下的配置文件。

3.打包

```bash
npm run build
```

打包生成的`dist`目录下的内容即是部署产物。

## 流程图项目

`flowchart`项目。

这个项目是在[drawio](https://github.com/jgraph/drawio)仓库的源码基础上修改的，由于`drawio`项目非常复杂，想要达到能修改和扩展的程度，需要花费大量时间，所以不建议修改该项目。

这个项目因为启动时间非常早，所以没有使用任何框架，也没有使用构建工具。

1.安装依赖

进入项目目录下执行：

```bash
npm i
```

2.启动

```bash
npm run dev
```

要使用模拟数据，需要手动修改`/src/main/webapp/js/ui/api.js`文件中的`useMock`变量为`true`。

访问的地址为`http://localhost:9097/?id=123&dev=1`，`id`可以随便写。

3.打包

```bash
npm run build
```

因为这个项目的打包是通过`java`来实现的，所以你还需要安装`java`的环境。可以参考网上的一些教程，比如

[DrawIO 二开](https://juejin.cn/post/7017686432009420808#heading-4)。

生成环境访问不需要带`dev`参数。

打包完了需要把整个`webapp`目录下的文件都上传到服务器。