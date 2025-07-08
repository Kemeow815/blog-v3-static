import type { NitroConfig } from 'nitropack'
import type { BundledLanguage, BundledTheme } from 'shiki'
import type { FeedEntry } from '~/types/feed'
import redirectList from './redirects.json'

export { zhCN as dateLocale } from 'date-fns/locale/zh-CN'

// 存储 nuxt.config 和 app.config 共用的配置
// 此处为启动时需要的配置，启动后可变配置位于 app/app.config.ts
const blogConfig = {
    title: '喵落阁',
    bgmUsername: 'kemiao',
    subtitle: '总有些事情高于其他！',
    // 长 description 利好于 SEO
    description: '克喵的个人博客，取自纸鹿的主题。',
    author: {
        name: '克喵爱吃卤面',
        avatar: 'https://cn.cravatar.com/avatar/1F6C8947D35A8186A1647009BA8BC5F2?size=256',
        email: 'me@mail.kemeow.top',
        homepage: 'https://www.kemiao.online/',
    },
    copyright: {
        abbr: 'CC BY-NC-SA 4.0',
        name: '署名-非商业性使用-相同方式共享 4.0 国际',
        url: 'https://creativecommons.org/licenses/by-nc-sa/4.0/deed.zh-hans',
    },
    favicon: 'https://cdn.jsdelivr.net/gh/kmfx/tuchuang@main/img/Kemeow815avatar.png',
    language: 'zh-Hans',
    tgGroup: 'https://t.me/KemiaoJun',
    timeEstablished: '2025-02-11',
    timezone: 'Asia/Shanghai',
    url: 'https://blog-v3.kemeow.top/',

    feed: {
        limit: 50,
    },

    // 在 URL 中隐藏的路径前缀
    hideContentPrefixes: ['/posts'],

    imageDomains: [
        'blog-v3.kemeow.top',
        // 自动启用本域名的 Nuxt Image
        // 'www.zhilu.cyou',
        // '7.isyangs.cn',
    ],

    // 禁止搜索引擎收录的路径
    robotsNotIndex: ['/preview', '/previews/*'],

    scripts: [
        // 自己部署的 Umami 统计服务
        { 'src': 'https://cloud.umami.is/script.js', 'data-website-id': '6aeee90d-4cea-4484-82bd-956217f7d6eb', 'defer': true },
        // Cloudflare Insights 统计服务
        { 'src': 'https://static.cloudflareinsights.com/beacon.min.js', 'data-cf-beacon': '{"token": "97a4fe32ed8240ac8284e9bffaf03962"}', 'defer': true },
    ],

    // 用于 Shiki、Plain Shiki 引入代码高亮
    // 同时用于显示代码块语言对应的 Iconify Catppuccin 图标
    shiki: {
        bundledLangs: <BundledLanguage[]>['bat', 'log', 'sh', 'powershell'],
        langs: <BundledLanguage[]>['bat', 'c', 'cpp', 'css', 'diff', 'html', 'ini', 'java', 'js', 'json', 'log', 'makefile', 'matlab', 'md', 'mdc', 'powershell', 'python', 'sh', 'sql', 'ssh-config', 'toml', 'ts', 'tsx', 'vb', 'vue', 'xml', 'yaml'],
        themes: <BundledTheme[]>['catppuccin-latte', 'one-dark-pro'],
        defaultTheme: <BundledTheme>'catppuccin-latte',
        darkTheme: <BundledTheme>'one-dark-pro',
    },

    // 用于 Twikoo 评论系统
    twikoo: {
        js: 'https://source.314926.xyz/assets/twikoo.min.js',
        envId: 'https://twikoo-blog-v3.314926.xyz/',
        preload: 'https://twikoo-blog-v3.314926.xyz/',
    },
}

// 用于生成 OPML 和友链页面配置
export const myFeed = <FeedEntry>{
    author: blogConfig.author.name,
    sitenick: '喵落阁',
    title: blogConfig.title,
    desc: blogConfig.subtitle || blogConfig.description,
    link: blogConfig.url,
    feed: new URL('/atom.xml', blogConfig.url).toString(),
    icon: blogConfig.favicon,
    avatar: blogConfig.author.avatar,
    archs: ['Nuxt', 'Vercel'],
    date: blogConfig.timeEstablished,
    comment: '奇迹只是一时，命运总是漫长。',
}

// 将旧页面永久重定向到新页面
const redirectRouteRules = Object.entries(redirectList)
    .reduce<NitroConfig['routeRules']>((acc, [from, to]) => {
        acc![from] = { redirect: { to, statusCode: 301 } }
        return acc
    }, {})

// https://nitro.build/config#routerules
// @keep-sorted
export const routeRules = <NitroConfig['routeRules']>{
    ...redirectRouteRules,
    '/api/stats': { prerender: true, headers: { 'Content-Type': 'application/json' } },
    '/atom.xml': { prerender: true, headers: { 'Content-Type': 'application/xml' } },
    '/favicon.ico': { redirect: { to: blogConfig.favicon } },
    '/zhilu.opml': { prerender: true, headers: { 'Content-Type': 'application/xml' } },
}

export default blogConfig
