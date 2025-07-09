import { pascal } from 'radash'
import { defineAsyncComponent } from 'vue'

// @keep-sorted
const rawWidgets = {
    LazyWidgetBlogLog: defineAsyncComponent(() => import('~/components/widget/BlogLog.vue')),
    LazyWidgetBlogStats: defineAsyncComponent(() => import('~/components/widget/BlogStats.vue')),
    LazyWidgetConnectivity: defineAsyncComponent(() => import('~/components/widget/Connectivity.vue')),
    LazyWidgetEmpty: defineAsyncComponent(() => import('~/components/widget/Empty.vue')),
    LazyWidgetGithubCard: defineAsyncComponent(() => import('~/components/widget/GithubCard.vue')),
    LazyWidgetLatestComments: defineAsyncComponent(() => import('~/components/WidgetLatestComments.vue')),
    LazyWidgetToc: defineAsyncComponent(() => import('~/components/widget/Toc.vue')),
}

type RawWidgetName = keyof typeof rawWidgets

/** 若首字母大写还需移除`-`前缀 */
type KebabCase<S extends string> = S extends `${infer First}${infer Rest}`
    ? `${First extends Capitalize<First> ? '-' : ''}${Lowercase<First>}${KebabCase<Rest>}`
    : ''

type RemovePrefix<S extends string, Prefix extends string> = S extends `${Prefix}${infer Rest}` ? Rest : S

export type WidgetName = RemovePrefix<KebabCase<RawWidgetName>, '-lazy-widget-'>

export default function useWidgets(widgetList: MaybeRefOrGetter<WidgetName[]>) {
    const widgets = computed(() => (toValue(widgetList) || []).map(widget => ({
        name: widget,
        comp: rawWidgets[`LazyWidget${pascal(widget)}` as RawWidgetName] || rawWidgets[`Widget${pascal(widget)}` as RawWidgetName],
    })))
    return {
        widgets,
    }
}
