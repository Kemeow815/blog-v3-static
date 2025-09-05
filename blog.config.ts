import type { FeedEntry } from './app/types/feed'

export { zhCN as dateLocale } from 'date-fns/locale/zh-CN'

const basicConfig = {
	title: '喵落阁',
	subtitle: '总有些事情高于其他！',
	// 长 description 利好于 SEO
	description: '克喵的个人博客，取自纸鹿的主题，克喵在这里记录日记、资源分享和踩坑教程。',
	author: {
		name: '克喵爱吃卤面',
		avatar: 'https://img.314926.xyz/images/2025/08/13/no-background-kemiaofxjun.webp',
		email: 'me@mail.kemeow.top',
		homepage: 'https://home.kemeow.top/',
	},
	copyright: {
		abbr: 'CC BY-NC-SA 4.0',
		name: '署名-非商业性使用-相同方式共享 4.0 国际',
		url: 'https://creativecommons.org/licenses/by-nc-sa/4.0/deed.zh-hans',
	},
	favicon: 'https://img.314926.xyz/images/2025/08/13/no-background-kemiaofxjun.webp',
	language: 'zh-CN',
	timeEstablished: '2025-02-11',
	timezone: 'Asia/Shanghai',
	url: 'https://blog-v3.kemeow.top/',
	defaultCategory: '未分类',
}

// 存储 nuxt.config 和 app.config 共用的配置
// 此处为启动时需要的配置，启动后可变配置位于 app/app.config.ts
// @keep-sorted
const blogConfig = {
	...basicConfig,

	artalk: {
		server: 'https://artalk.050815.xyz/',
		sitename: '喵洛阁',
	},

	article: {
		categories: {
			[basicConfig.defaultCategory]: { icon: 'ph:folder-dotted-bold' },
			经验分享: { icon: 'ph:mouse-bold', color: '#3af' },
			杂谈: { icon: 'ph:chat-bold', color: '#3ba' },
			技术分享: { icon: 'ph:share-network-bold', color: '#f3a' },
			资源分享: { icon: 'pepicons-pop:share-android-circle', color: '#58f100' },
			生活: { icon: 'ph:shooting-star-bold', color: '#f77' },
			代码: { icon: 'ph:code-bold', color: '#77f' },
		},
		defaultCategoryIcon: 'ph:folder-bold',
		/** 分类排序方式，键为排序字段，值为显示名称 */
		order: {
			date: '创建日期',
			updated: '更新日期',
			// title: '标题',
		},
		/** 使用 pnpm new 新建文章时自动生成自定义链接（permalink/abbrlink） */
		useRandomPremalink: true,
		/** 隐藏基于文件路由（不是自定义链接）的 URL /post 路径前缀 */
		hidePostPrefix: true,
		/** 禁止搜索引擎收录的路径 */
		robotsNotIndex: ['/preview', '/previews/*'],
	},

	/** 博客 Atom 订阅源 */
	feed: {
		/** 订阅源最大文章数量 */
		limit: 50,
		/** 订阅源是否启用XSLT样式 */
		enableStyle: true,
	},

	/** 向 <head> 中添加脚本 */
	scripts: [
		// 自己部署的 Umami 统计服务
		{ 'src': 'https://unami-kemiao.kemiaosw.top/script.js', 'data-website-id': '1a8feaa6-0c4d-444e-8693-02e5a547181a', 'defer': true },
		// Cloudflare Insights 统计服务
		{ 'src': 'https://static.cloudflareinsights.com/beacon.min.js', 'data-cf-beacon': '{"token": "8ed3d622df28470082073926f8c105d1"}', 'defer': true },
		// Twikoo 评论系统
		{ src: 'https://lib.baomitu.com/twikoo/1.6.44/twikoo.min.js', defer: true },
		// artalk 评论系统
		{ src: 'https://artalk.050815.xyz/dist/Artalk.js', defer: true },
	],

	/** 自己部署的 Twikoo 服务 */
	twikoo: {
		envId: 'https://twikoo-blog-v3.314926.xyz',
		preload: 'https://twikoo-blog-v3.314926.xyz',
	},
}

/** 用于生成 OPML 和友链页面配置 */
export const myFeed: FeedEntry = {
	author: blogConfig.author.name,
	sitenick: '摸鱼处',
	title: blogConfig.title,
	desc: blogConfig.subtitle || blogConfig.description,
	link: blogConfig.url,
	feed: new URL('/atom.xml', blogConfig.url).toString(),
	icon: blogConfig.favicon,
	avatar: blogConfig.author.avatar,
	archs: ['Nuxt', 'Vercel'],
	date: blogConfig.timeEstablished,
	comment: '这是我自己',
}

export default blogConfig
