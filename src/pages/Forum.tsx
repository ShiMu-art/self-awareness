import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Card from '../components/Card'
import { supabase } from '../lib/supabase'

interface Post {
  id: string
  title: string
  content: string
  category: string
  created_at: string
  profiles?: { display_name: string; avatar_url: string | null }
}

const categories = [
  { key: 'all', label: '全部' },
  { key: 'love', label: '恋爱' },
  { key: 'daily', label: '日常' },
  { key: 'tech', label: '技术' },
  { key: 'general', label: '杂谈' },
]

function Forum() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [activeCategory, setActiveCategory] = useState('all')

  const fetchPosts = async () => {
    setLoading(true)
    let query: any = supabase
      .from('posts')
      .select('*, profiles(display_name, avatar_url)')
      .order('created_at', { ascending: false })
      .limit(30)

    if (activeCategory !== 'all') {
      query = query.eq('category', activeCategory)
    }

    const { data } = await query
    setPosts((data as Post[]) || [])
    setLoading(false)
  }

  useEffect(() => {
    fetchPosts()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeCategory])

  const formatTime = (dateStr: string) => {
    const d = new Date(dateStr)
    const now = new Date()
    const diff = now.getTime() - d.getTime()
    if (diff < 60000) return '刚刚'
    if (diff < 3600000) return `${Math.floor(diff / 60000)}分钟前`
    if (diff < 86400000) return `${Math.floor(diff / 3600000)}小时前`
    return d.toLocaleDateString('zh-CN', { month: 'short', day: 'numeric' })
  }

  return (
    <div className="space-y-6">
      {/* 页面标题 */}
      <div className="text-center mb-6">
        <h2 className="text-2xl tracking-wider" style={{ fontFamily: "'Cinzel', serif", color: 'var(--color-ivory)' }}>
          FORUM
        </h2>
        <p className="text-sm mt-1" style={{ color: 'var(--color-muted)', fontFamily: "'Noto Serif SC', serif" }}>
          公告厅 · 来信与留言
        </p >
        <hr className="divider-brass max-w-[120px] mx-auto mt-4" />
      </div>

      {/* 分类标签 */}
      <div className="flex justify-center gap-2 flex-wrap">
        {categories.map((cat) => (
          <button
            key={cat.key}
            onClick={() => setActiveCategory(cat.key)}
            className={`px-3 py-1 text-xs rounded-sm border transition-all duration-300 ${
              activeCategory === cat.key
                ? 'border-[var(--color-brass)] text-[var(--color-ivory)] bg-[var(--color-walnut)]'
                : 'border-transparent text-[var(--color-muted)] hover:text-[var(--color-brass)]'
            }`}
            style={{ fontFamily: "'Noto Serif SC', serif" }}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* 帖子列表 */}
      {loading ? (
        <div className="text-center py-16">
          <p className="text-[var(--color-muted)] font-serif text-sm">加载中...</p >
        </div>
      ) : posts.length === 0 ? (
        <div className="text-center py-16">
          <div className="mb-4 opacity-40">
            <svg width="48" height="48" viewBox="0 0 48 48" className="mx-auto" fill="none">
              <rect x="8" y="6" width="32" height="40" rx="2" stroke="var(--color-brass)" strokeWidth="1" fill="none" opacity="0.5"/>
              <line x1="14" y1="16" x2="34" y2="16" stroke="var(--color-brass)" strokeWidth="0.5" opacity="0.4"/>
              <line x1="14" y1="22" x2="30" y2="22" stroke="var(--color-brass)" strokeWidth="0.5" opacity="0.4"/>
              <line x1="14" y1="28" x2="26" y2="28" stroke="var(--color-brass)" strokeWidth="0.5" opacity="0.4"/>
            </svg>
          </div>
          <p className="text-[var(--color-muted)] font-serif text-sm">暂无来信</p >
          <p className="text-[var(--color-muted)] font-serif text-xs mt-2 opacity-60">期待第一封信的到来...</p >
        </div>
      ) : (
        <div className="space-y-4">
          {posts.map((post, index) => (
            <Link key={post.id} to={`/forum/${post.id}`}>
              <Card delay={index * 80}>
                <div className="space-y-3">
                  {/* 作者信息 */}
                  <div className="flex items-center gap-2">
                    <div
                      className="w-7 h-7 rounded-full flex items-center justify-center text-xs"
                      style={{ backgroundColor: 'var(--color-walnut)', color: 'var(--color-paper)' }}
                    >
                      {post.profiles?.avatar_url ? (
                        <img src={post.profiles.avatar_url} className="w-full h-full rounded-full object-cover" />
                      ) : (
                        post.profiles?.display_name?.charAt(0) || '?'
                      )}
                    </div>
                    <span className="text-xs" style={{ color: 'var(--color-muted)', fontFamily: "'Noto Serif SC', serif" }}>
                      {post.profiles?.display_name || '匿名'}
                    </span>
                    <span className="text-xs ml-auto" style={{ color: 'var(--color-muted)', opacity: 0.6 }}>
                      {formatTime(post.created_at)}
                    </span>
                  </div>

                  {/* 标题 */}
                  <h3
                    className="text-sm font-medium leading-snug"
                    style={{ color: 'var(--color-ink)', fontFamily: "'Noto Serif SC', serif" }}
                  >
                    {post.title}
                  </h3>

                  {/* 摘要 */}
                  {post.content && (
                    <p
                      className="text-xs leading-relaxed line-clamp-2"
                      style={{ color: 'var(--color-muted)' }}
                    >
                      {post.content}
                    </p >
                  )}

                  {/* 底部标签 */}
                  <div className="flex items-center gap-3 pt-1">
                    <span
                      className="text-[10px] px-2 py-0.5 rounded-sm"
                      style={{ backgroundColor: 'var(--color-walnut)', color: 'var(--color-paper)', opacity: 0.7 }}
                    >
                      {categories.find(c => c.key === post.category)?.label || '杂谈'}
                    </span>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

export default Forum

