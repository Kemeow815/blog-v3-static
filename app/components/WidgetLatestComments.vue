<script setup lang="ts">
import { useAppConfig } from '#app'
import { onMounted, ref } from 'vue'

const appConfig = useAppConfig()
const twikooConfig = appConfig.twikoo

const comments = ref<any[]>([])
const loading = ref(true)
const error = ref<string | null>(null)

// 获取最新评论
async function fetchRecentComments() {
    try {
        loading.value = true
        error.value = null

        // 检查 Twikoo 配置
        if (!twikooConfig || !twikooConfig.envId) {
            throw new Error('Twikoo 配置信息不完整')
        }

        // 调用 Twikoo 的 getRecentComments API
        const result = await (window as any).twikoo.getRecentComments({
            envId: twikooConfig.envId,
            region: twikooConfig.region,
            pageSize: 5, // 获取5条最新评论
            includeReply: false, // 不包含回复
        })

        if (result.code === 0) {
            comments.value = result.data
        }
        else {
            error.value = `获取评论失败: ${result.message}`
        }
    }
    catch (err: any) {
        console.error('获取评论出错:', err)
        error.value = err.message || '获取评论时发生错误'
    }
    finally {
        loading.value = false
    }
}

onMounted(() => {
    // 确保 Twikoo 已加载
    if (typeof (window as any).twikoo !== 'undefined') {
        fetchRecentComments()
    }
    else {
    // 如果 Twikoo 未加载，设置错误状态
        error.value = 'Twikoo 评论系统未初始化'
        loading.value = false
    }
})

// 格式化时间显示
function formatTime(timestamp: number) {
    const date = new Date(timestamp)
    const now = new Date()
    const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24))

    if (diffDays === 0) {
    // 显示具体时间（如：今天 15:30）
        return `今天 ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`
    }
    else if (diffDays === 1) {
        return '昨天'
    }
    else if (diffDays < 7) {
        return `${diffDays}天前`
    }
    else if (diffDays < 30) {
        const weeks = Math.floor(diffDays / 7)
        return `${weeks}周前`
    }

    // 超过30天显示具体日期
    return date.toLocaleDateString('zh-CN', {
        month: 'short',
        day: 'numeric',
    })
}

// 简化评论内容
function truncateComment(comment: string, maxLength: number = 60) {
    // 移除HTML标签
    const text = comment.replace(/<[^>]*>?/g, '')
    if (text.length <= maxLength)
        return text
    return `${text.substring(0, maxLength)}...`
}

// 获取头像URL
function getAvatarUrl(email: string) {
    // 使用Gravatar作为默认头像服务
    if (!email)
        return `https://gravatar.com/avatar/00000000000000000000000000000000?d=mp&s=40`

    // 简单MD5实现（实际应用中建议使用完整MD5库）
    const hash = btoa(email).replace(/[^a-z0-9]/gi, '').substring(0, 32)
    return `https://gravatar.com/avatar/${hash}?s=40&d=mp`
}
</script>

<template>
    <div class="latest-comments-widget">
        <h3 class="widget-title">
            <i class="icon">💬</i> 最新评论
        </h3>

        <div class="widget-card">
            <!-- 加载状态 -->
            <div v-if="loading" class="loading-state">
                <div class="spinner" />
                <span>加载评论中...</span>
            </div>

            <!-- 错误状态 -->
            <div v-else-if="error" class="error-state">
                <i class="icon">⚠️</i>
                <p>{{ error }}</p>
            </div>

            <!-- 空状态 -->
            <div v-else-if="comments.length === 0" class="empty-state">
                <i class="icon">💬</i>
                <p>暂无评论，期待您的留言！</p>
            </div>

            <!-- 评论列表 -->
            <ul v-else class="comments-list">
                <li v-for="comment in comments" :key="comment.id" class="comment-item">
                    <a :href="`${comment.url}#twikoo-comment`" class="comment-link">
                        <div class="comment-header">
                            <img :src="getAvatarUrl(comment.mail)" :alt="comment.nick" class="avatar">
                            <div class="comment-meta">
                                <strong class="comment-author">{{ comment.nick }}</strong>
                                <time class="comment-time">{{ formatTime(comment.created) }}</time>
                            </div>
                        </div>
                        <div class="comment-content">
                            {{ truncateComment(comment.comment) }}
                        </div>
                        <div class="comment-source">
                            来自: {{ comment.url.replace(/^https?:\/\//, '').split('/')[0] || '未知页面' }}
                        </div>
                    </a>
                </li>
            </ul>
        </div>
    </div>
</template>

<style scoped>
.latest-comments-widget {
  margin-bottom: 2rem;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.widget-title {
  font-size: 1.2rem;
  font-weight: 600;
  margin: 0 0 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #4a6cf7;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #2d3748;
}

.widget-card {
  background: #ffffff;
  border-radius: 12px;
  padding: 1.25rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  transition: transform 0.2s, box-shadow 0.2s;
  border: 1px solid #e2e8f0;
}

.widget-card:hover {
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.12);
  transform: translateY(-3px);
}

/* 加载状态 */
.loading-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  color: #718096;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 3px solid rgba(74, 108, 247, 0.2);
  border-top: 3px solid #4a6cf7;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 1rem;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* 错误和空状态 */
.error-state, .empty-state {
  text-align: center;
  padding: 1.5rem;
  color: #718096;
  border-radius: 8px;
  background: #f8fafc;
}

.error-state .icon, .empty-state .icon {
  font-size: 2rem;
  margin-bottom: 0.75rem;
  display: block;
}

.error-state p, .empty-state p {
  margin: 0;
  font-size: 0.95rem;
}

.error-state {
  background: #fff5f5;
  color: #e53e3e;
}

/* 评论列表 */
.comments-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.comment-item {
  border-bottom: 1px solid #edf2f7;
  padding: 1rem 0;
  transition: background 0.2s;
}

.comment-item:last-child {
  border-bottom: none;
  padding-bottom: 0;
}

.comment-link {
  text-decoration: none;
  color: inherit;
  display: block;
  transition: all 0.2s;
  border-radius: 8px;
  padding: 0.5rem;
}

.comment-link:hover {
  background: #f7faff;
  box-shadow: 0 2px 8px rgba(74, 108, 247, 0.1);
}

.comment-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.5rem;
}

.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  background: #e2e8f0;
  border: 2px solid #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.comment-meta {
  display: flex;
  flex-direction: column;
  flex: 1;
}

.comment-author {
  font-size: 0.95rem;
  font-weight: 600;
  color: #2d3748;
}

.comment-time {
  font-size: 0.75rem;
  color: #718096;
}

.comment-content {
  font-size: 0.9rem;
  line-height: 1.5;
  color: #4a5568;
  margin: 0.75rem 0;
  padding-left: 52px; /* 对齐头像 */
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  min-height: 2.7em; /* 保持高度一致 */
}

.comment-source {
  font-size: 0.75rem;
  color: #a0aec0;
  padding-left: 52px; /* 对齐头像 */
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-style: italic;
}

/* 响应式调整 */
@media (max-width: 768px) {
  .widget-card {
    padding: 1rem;
  }

  .comment-content, .comment-source {
    padding-left: 0;
  }

  .comment-header {
    flex-wrap: wrap;
  }

  .comment-content {
    min-height: auto;
  }
}
</style>
