import {
	LazyWidgetBlogLog,
	LazyWidgetBlogStats,
	LazyWidgetBlogTech,
	LazyWidgetCommGroup,
	LazyWidgetEmpty,
	LazyWidgetGithubCard,
	LazyWidgetLatestComments,
	LazyWidgetPoetry,
	LazyWidgetToc,
} from '#components'
import { pascal } from 'radash'

const rawWidgets = {
	LazyWidgetBlogLog,
	LazyWidgetBlogStats,
	LazyWidgetBlogTech,
	LazyWidgetCommGroup,
	LazyWidgetPoetry,
	LazyWidgetEmpty,
	LazyWidgetLatestComments,
	LazyWidgetGithubCard,
	LazyWidgetToc,
}

type RawWidgetName = keyof typeof rawWidgets

/** 若首字母大写还需移除`-`前缀 */
type KebabCase<S extends string> = S extends `${infer First}${infer Rest}`
	? `${First extends Capitalize<First> ? '-' : ''}${Lowercase<First>}${KebabCase<Rest>}`
	: ''

type TrimLeadingString<S extends string, Prefix extends string> = S extends `${Prefix}${infer Rest}` ? Rest : S

export type WidgetName = TrimLeadingString<KecabCase<RawWidgetName>, '-lazy-widget-'>

export default function useWidgets(widgetList: MaybeRefOrGetter<WidgetName[]>) {
	const widgets = computed(() => (toValue(widgetList) || []).map(widget => ({
		name: widget,
		comp: rawWidgets[`LazyWidget${pascal(widget)}` as RawWidgetName],
	})))
	return {
		widgets,
	}
}
