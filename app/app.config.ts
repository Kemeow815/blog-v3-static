import type { Nav, NavItem } from '~/types/nav'
import blogConfig from '~~/blog.config'

// 图标查询：https://yesicon.app/ph
// 图标插件：https://marketplace.visualstudio.com/items?itemName=antfu.iconify

export default defineAppConfig({
    // 将 blog.config 中的配置项复制到 appConfig，方便调用
    ...blogConfig,

    article: {
        categories: <{ [category: string]: { icon: string, color?: string } }>{
            经验分享: { icon: 'ph:mouse-bold', color: '#3af' },
            生活: { icon: 'ph:shooting-star-bold', color: '#3ba' },
            代码: { icon: 'ph:code-bold', color: '#77f' },
            技术分享: { icon: 'ph:share-network-bold', color: '#f3a' },
            资源分享: { icon: 'pepicons-pop:share-android-circle', color: '#58f100' },
            专栏: { icon: 'line-md:coffee-half-empty-twotone-loop', color: '#B97BDB' },
            未分类: { icon: 'ph:folder-dotted-bold' },
        },
        defaultCategoryIcon: 'ph:folder-bold',
        /** 分类排序方式，键为排序字段，值为显示名称 */
        order: {
            date: '创建日期',
            updated: '更新日期',
            // title: '标题',
        },
        // 需要同时修改上方分类图标对应的键名
        uncategorizedLabel: '未分类',
    },

    content: {
        /** 代码块自动折叠触发行数 */
        codeblockCollapsibleRows: 16,
        /** 文章开头摘要 */
        excerpt: {
            animation: true,
            caret: '_',
        },
    },

    footer: {
        /** 页脚版权信息 */
        copyright: `© ${new Date().getFullYear()} ${blogConfig.author.name}`,
        /** 侧边栏底部图标导航 */
        iconNav: [
            { icon: 'ph:house-bold', text: '个人主页', url: blogConfig.author.homepage },
            { icon: 'mdi:telegram', text: '频道', url: 'https://t.me/kemiaofx_me' },
            { icon: 'ph:github-logo-bold', text: 'GitHub: 克喵Kemeow', url: 'https://github.com/Kemeow815' },
            { icon: 'ph:rss-simple-bold', text: 'Atom订阅', url: '/atom.xml' },
            { icon: 'ph:subway-bold', text: '开往', url: 'https://www.travellings.cn/go-by-clouds.html' },
        ] satisfies NavItem[],
        /** 页脚站点地图 */
        nav: [
            {
                title: '探索',
                items: [
                    { icon: 'ph:rss-simple-bold', text: 'Atom订阅', url: '/atom.xml' },
                    { icon: 'ph:subway-bold', text: '开往', url: 'https://www.travellings.cn/go-by-clouds.html' },
                    { icon: 'ph:flying-saucer-bold', text: '异次元旅行', url: 'https://travel.moe/go.html?travel=on' },
                ],
            },
            {
                title: '社交',
                items: [
                    { icon: 'ph:github-logo-bold', text: '克喵Kemeow', url: 'https://github.com/Kemeow815' },
                    { icon: 'mdi:telegram', text: '电报频道', url: 'https://t.me/kemiaofx_me' },
                    { icon: 'ph:envelope-simple-bold', text: blogConfig.author.email, url: `mailto:${blogConfig.author.email}` },
                ],
            },
            {
                title: '信息',
                items: [
                    { icon: 'simple-icons:nuxtdotjs', text: 'Nuxt开源博客主题', url: 'https://github.com/L33Z22L11/blog-v3' },
                    { icon: 'ph:swatches-bold', text: '主题和组件文档', url: 'https://blog.zhilu.cyou/theme' },
                    { icon: 'ph:certificate-bold', text: '萌备20250530号', url: 'https://icp.gov.moe/?keyword=20250530' },
                ],
            },
        ] satisfies Nav,
        /** 页脚版权信息底部的其他信息 */
        message: '<a href="https://icp.gov.moe/?keyword=20250530" target="_blank">萌ICP备20250530号</a>',
    },

    /** 左侧栏顶部 Logo */
    header: {
        logo: 'https://cn.cravatar.com/avatar/1F6C8947D35A8186A1647009BA8BC5F2',
        /** 展示标题文本，否则展示纯 Logo */
        showTitle: true,
        subtitle: blogConfig.subtitle,
        emojiTail: ['📄', '🦌', '🙌', '🐟', '🏖️'],
    },

    pagination: {
        perPage: 10,
        /** 默认排序方式，需要是 this.article.order 中的键名 */
        sortOrder: 'date' as const,
        /** 允许（普通/预览/归档）文章列表正序，开启后排序方式左侧图标可切换顺序 */
        allowAscending: true,
    },

    /** 左侧栏导航 */
    nav: [
        {
            title: '',
            items: [
                { icon: 'ph:files-bold', text: '文章', url: '/' },
                { icon: 'hugeicons:wechat', text: '朋友圈', url: 'https://pyq.kemiao.online' },
                { icon: 'tabler:photo', text: '时光馆', url: 'https://photos.050815.xyz' },
                { icon: 'ph:link-bold', text: '友链', url: '/link' },
                { icon: 'ph:archive-bold', text: '归档', url: '/archive' },
                { icon: 'icon-park-outline:game-handle', text: '游戏', url: '/game' },
                { icon: 'icon-park-outline:movie', text: '影视', url: '/real' },
                { icon: 'ph:television-simple-bold', text: '番剧', url: '/anime' },
                { icon: 'ph:info-bold', text: '关于', url: '/about' },
            ],
        },
    ] satisfies Nav,

    /** 风格化 blog-stats widget */
    seasonal: {
        // widgetBackground: 'https://wsrv.nl/?url=i2.hdslb.com/bfs/archive/46165212e09842103752c453d7987a470059760b.jpg@320w',
        // emoji: '🧧',
    },

    stats: {
        /** 归档页面每年标题对应的年龄 */
        birthYear: 2005,
        /** blog-stats widget 的预置文本 */
        wordCount: '约10万',
    },

    themes: {
        light: {
            icon: 'ph:sun-bold',
            tip: '浅色模式',
        },
        system: {
            icon: 'ph:monitor-bold',
            tip: '跟随系统',
        },
        dark: {
            icon: 'ph:moon-bold',
            tip: '深色模式',
        },
    },
})
