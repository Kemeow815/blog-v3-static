<!-- components/FriendCircleLite.client.vue -->
<script setup>
import { onMounted, onUnmounted } from 'vue'

onMounted(() => {
    // 确保在客户端执行
    if (typeof window !== 'undefined') {
        // 1. 设置配置
        window.UserConfig = {
            private_api_url: 'https://fc.314926.xyz/',
            page_turning_number: 24,
            error_img: 'https://pic.imgdb.cn/item/6695daa4d9c307b7e953ee3d.jpg',
        }

        // 2. 动态加载CSS
        const cssLink = document.createElement('link')
        cssLink.rel = 'stylesheet'
        cssLink.href = 'https://fastly.jsdelivr.net/gh/willow-god/Friend-Circle-Lite/main/fclite.min.css'
        document.head.appendChild(cssLink)

        // 3. 动态加载JS
        const script = document.createElement('script')
        script.src = 'https://fastly.jsdelivr.net/gh/willow-god/Friend-Circle-Lite/main/fclite.min.js'
        script.onload = () => {
            console.warn('Friend Circle Lite loaded')
        }
        document.body.appendChild(script)

        // 保存资源引用用于卸载
        window.fclResources = { cssLink, script }
    }
})

onUnmounted(() => {
    // 清理资源
    if (typeof window !== 'undefined' && window.fclResources) {
        document.head.removeChild(window.fclResources.cssLink)
        document.body.removeChild(window.fclResources.script)
        delete window.fclResources
        delete window.UserConfig
    }

    // 清理DOM内容
    const root = document.getElementById('friend-circle-lite-root')
    if (root)
        root.innerHTML = ''
})
</script>

<template>
    <div id="friend-circle-lite-root" />
</template>
