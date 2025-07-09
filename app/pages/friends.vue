<script setup lang="ts">
import FriendCircleLite from '@/components/FriendCircleLite.client.vue'
import PostComment from '@/components/post/Comment.vue'
import { ref } from 'vue'

// 添加平滑滚动交互
const scrollContainer = ref(null)
</script>

<template>
    <div
        id="friend-circle-container"
        ref="scrollContainer"
        class="relative bg-gray-50 dark:bg-gray-900 min-h-screen transition-colors duration-300"
    >
        <!-- 沉浸式顶部背景 -->
        <div class="h-48 bg-gradient-to-r from-blue-500 to-purple-600 absolute top-0 inset-x-0 -z-10" />

        <div class="pt-16 pb-24 max-w-3xl mx-auto px-4 sm:px-6">
            <!-- 动态标题栏 -->
            <header class="sticky top-0 z-20 backdrop-blur-md bg-white/80 dark:bg-gray-800/80 py-4 rounded-xl shadow-sm mb-8 transition-all">
                <h1 class="text-2xl font-bold text-center text-gray-800 dark:text-white flex items-center justify-center">
                    <span class="icon-[mdi--account-group] mr-2 text-xl" />
                    朋友圈
                </h1>
            </header>

            <!-- 内容区域 -->
            <main class="space-y-6">
                <FriendCircleLite
                    class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden transition-all hover:shadow-2xl"
                />

                <PostComment
                    :key="$route.path"
                    class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 transition-all"
                />
            </main>
        </div>
    </div>
</template>

<style scoped lang="scss">
/* 滚动平滑效果 */
#friend-circle-container {
  scroll-behavior: smooth;
}

/* 深色模式适配 */
@media (prefers-color-scheme: dark) {
  .bg-gradient-to-r {
    background: linear-gradient(to right, #1e3a8a, #5b21b6);
  }
}

/* 响应式断点优化 */
@media (max-width: 640px) {
  .pt-16 {
    padding-top: 4rem;
  }

  header {
    border-radius: 0;
    @apply mx-[-1.5rem] px-6;
  }
}
</style>
