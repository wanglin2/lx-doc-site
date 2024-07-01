import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: '/lx-doc-site/',
  title: '理想文档',
  description: '定位于个人和小团队的在线云文档',
  head: [['link', { rel: 'icon', href: '/logo.svg' }]],
  outDir: './docs',
  themeConfig: {
    logo: './logo.svg',
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '首页', link: '/' },
      { text: '详细了解', link: '/detail/workbench' },
      { text: '文档', link: '/doc/introduction' },
      { text: '定价', link: '/price/price' }
    ],

    sidebar: {
      '/detail/': [
        {
          text: '功能介绍',
          items: [
            { text: '工作台', link: '/detail/workbench' },
            { text: '思维导图', link: '/detail/mindMap' },
            { text: '白板', link: '/detail/whiteboard' },
            { text: '流程图', link: '/detail/flowchart' },
            { text: 'PPT', link: '/detail/ppt' },
            { text: '电子表格', link: '/detail/sheet' },
            { text: '文档', link: '/detail/doc' },
            { text: 'Markdown', link: '/detail/markdown' },
            { text: 'BPMN', link: '/detail/bpmn' },
            { text: '笔记', link: '/detail/note' }
          ]
        }
      ],
      '/doc/': [
        {
          text: '基础',
          items: [
            { text: '简介', link: '/doc/introduction' },
            { text: '前端', link: '/doc/frontend' },
            { text: '后端', link: '/doc/backend' }
          ]
        },
        {
          text: '部署',
          items: [{ text: '部署', link: '/doc/deploy' }]
        },
        {
          text: '本地开发',
          items: [
            { text: '前端', link: '/doc/frontendDev' },
            { text: '后端', link: '/doc/backendDev' },
            { text: '联调测试', link: '/doc/test' }
          ]
        }
      ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/wanglin2/lx-doc' }
    ],

    footer: {
      message: 'AGPL-3.0 License.',
      copyright: 'Copyright © 2024-present lx-doc team'
    },

    darkModeSwitchLabel: '暗黑模式'
  }
})
