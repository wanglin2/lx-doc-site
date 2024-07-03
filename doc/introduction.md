# 简介

`理想文档`是一个定位于个人和小团队的在线云文档，我们倡导私有化部署，数据掌握在自己手里，不用受制于人。

因为能力和精力有限，不会支持以下特性：

> 1.不会支持协同编辑；
>
> 2.不会支持手机端、客户端；
>
> 3.不会提供在线服务，只做私有化部署；

目前我们提供了九种类型的文档编辑：思维导图、白板、流程图、文档、电子表格、幻灯片、Markdown、BPMN、笔记。从技术实现上来说，开发其中的任何一个都不是一件简单的事情，基本上只有大公司或专业公司才能做到完全自研，所以我们的策略是选择对应的开源项目来实现，具体来说我们精选了开源社区中以下这些优秀的项目：

- 思维导图: [mind-map](https://github.com/wanglin2/mind-map)

- Markdown：[md-editor-v3](https://github.com/imzbf/md-editor-v3)

- 文档：[wangEditor](https://github.com/wangeditor-team/wangEditor)

- 电子表格：[Luckysheet](https://github.com/dream-num/Luckysheet)

- 幻灯片：[PPTist](https://github.com/pipipi-pikachu/PPTist)

- 白板: [excalidraw](https://github.com/excalidraw/excalidraw)

- 流程图: [drawio](https://github.com/jgraph/drawio)

- BPMN：[bpmn-js](https://github.com/bpmn-io/bpmn-js)

- 笔记：[editor.js](https://github.com/codex-team/editor.js)

我们开发了后端接口，然后在这些开源项目的基础上添加了云存储的功能，另外开发了工作台，用于提供登录注册、文件和文件夹的管理功能，如你所见，我们以最简单的方式搭建了一个支持多种文档类型的在线云文档。

其中每种文档都为独立可运行的项目，所以也可只选择其中的几种文档类型来部署。如果你是开发者，不喜欢其中某个编辑器，那么完全可以选择其他你喜欢的项目来接入，本质上就是对接对应的接口而已。

当然因为我们也是站在这些巨人的肩膀上，所以原则上来说原项目不支持的功能我们也无法支持，原项目的bug，我们也不一定能修复。

所以如果您对功能要求非常高，那么建议还是去购买市面上成熟的此类产品，他们大多也会提供私有化部署服务，当然费用也会比较昂贵。

