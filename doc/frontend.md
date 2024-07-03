# 前端

前端仓库为：[https://github.com/wanglin2/lx-doc](https://github.com/wanglin2/lx-doc)。

仓库目录结构为：

- `workbench`：工作台项目，提供登录注册、文件夹和文件列表的管理；

- `mind-map`：思维导图项目，提供思维导图的编辑功能；

- `markdown`: Markdown 项目，提供 Markdown 的编辑功能；

- `doc`: 文档项目，提供文档的编辑功能；

- `sheet`: 电子表格项目，提供电子表格的编辑功能；

- `ppt`: 幻灯片项目，提供幻灯片的编辑功能；

- `whiteboard`: 白板项目，提供白板的编辑功能；

- `flowchart`: 流程图项目，提供流程图的编辑功能；

- `bpmn`: BPMN 项目，提供 BPMN 的编辑功能；

- `note`: 笔记项目，提供笔记的编辑功能；

每个目录都是一个完整的独立项目，需要单独启动和打包。

`whiteboard`项目为`React`项目，`flowchart`为原生项目，其他都为`Vue`项目。

项目默认最终部署的路径如下：

- `workbench`: 根路径`/`

- `mind-map`: 路径`/mind-map/`

- `markdown`: 路径`/markdown/`

- `doc`: 路径`/doc/`

- `sheet`: 路径`/sheet/`

- `ppt`: 路径`/ppt/`

- `whiteboard`: 路径`/whiteboard/`

- `bpmn`: 路径`/bpmn/`

- `flowchart`：路径`/flowchart/`

- `note`: 路径`/note/`

如果你要修改路径，那么首先需要修改对应项目的路由设置，然后修改`/workbench/src/hooks/useFileHandle.js`文件中的跳转路径。