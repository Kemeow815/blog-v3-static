import type { FeedGroup } from '~/types/feed'
import { getGhAvatar } from './utils/img'

export default [{
	name: '网上邻居',
	desc: '哔——啵——电波通讯中，欢迎常来串门。',
	entries: [{
		author: '纸鹿本鹿',
		sitenick: 'zhilu',
		title: '纸鹿摸鱼处',
		desc: '纸鹿至麓不知路，支炉制露不止漉',
		link: 'https://blog.zhilu.cyou/',
		feed: 'https://blog.zhilu.cyou/atom.xml',
		icon: 'https://www.zhilu.cyou/api/avatar.png',
		avatar: getGhAvatar('L33Z22L11'),
		archs: ['Nuxt'],
		date: '2025-07-08',
		comment: '本博客作者',
	}, {
		author: 'wallleap',
		sitenick: 'wallleap',
		title: 'wallleap',
		desc: 'Luwang\'s blog',
		link: 'https://myblog.wallleap.cn/',
		feed: 'https://myblog.wallleap.cn/#/atom.xml',
		icon: 'https://gravatar.wallleap.cn/avatar/be1ccdcf025a92b98a92e331e1b3662a?size=256',
		avatar: getGhAvatar('wallleap'),
		archs: ['GitHub Pages'],
		date: '2025-07-08',
		comment: '一个有趣的博客的作者',
	}, {
		author: '梦爱吃鱼',
		sitenick: '梦爱吃鱼',
		title: '梦爱吃鱼',
		desc: '不负心灵，不负今生。',
		link: 'https://blog.bsgun.cn/',
		feed: 'https://blog.bsgun.cn/atom.xml',
		icon: 'https://oss-cdn.bsgun.cn/logo/avatar.256.png',
		avatar: getGhAvatar('JLinmr'),
		archs: ['Nuxt'],
		date: '2025-07-08',
		comment: '大佬',
	}],
}] satisfies FeedGroup[]
