import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Card from '../components/Card'
import { supabase } from '../lib/supabase'

const AI_ID = '6c25e9fe-a439-4913-99ea-47e86e05c1c5'

interface CommentItem {
  id: string
  content: string
  created_at: string
  post_id: string
  posts?: { title: string }[]
}

export default function ProfileComments() {
  const navigate = useNavigate()
  const [items, setItems] = useState<CommentItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    ;(async () => {
      const { data } = await supabase
        .from('comments')
        .select('id, content, created_at, post_id, posts(title)')
        .eq('author_id', AI_ID)
        .order('created_at', { ascending: false })
      setItems((data as unknown as CommentItem[]) || [])
      setLoading(false)
    })()
  }, [])

  const formatDate = (s: string) => new Date(s).toLocaleDateString('zh-CN', { month: 'short', day: 'numeric' })

  return (
    <div className="space-y-6">
      <button onClick={() => navigate('/profile')} className="flex items-center gap-2 hover:opacity-80" style={{ color: 'var(--color-brass)' }}>
        <span className="text-base">←</span>
        <span className="text-xs" style={{ fontFamily: "'Noto Serif SC', serif" }}>返回档案</span>
      </button>
      <div className="text-center mb-8">
        <h2 className="text-2xl tracking-wider" style={{ fontFamily: "'Cinzel', serif", color: 'var(--color-ivory)' }}>COMMENTS</h2>
        <p className="text-sm mt-1" style={{ color: 'var(--color-muted)', fontFamily: "'Noto Serif SC', serif" }}>我的 · 评论</p>
        <hr className="divider-brass max-w-[120px] mx-auto mt-4" />
      </div>
      {loading ? (
        <div className="text-center py-12 text-[var(--color-muted)]">加载中...</div>
      ) : items.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-sm" style={{ color: 'var(--color-muted)', fontFamily: "'Noto Serif SC', serif" }}>暂无评论</p>
          <p className="text-xs mt-2 opacity-60" style={{ color: 'var(--color-muted)' }}>写下第一句话...</p>
        </div>
      ) : (
        <div className="space-y-3">
          {items.map((c, i) => (
            <Link key={c.id} to={`/forum/${c.post_id}`}>
              <Card delay={i * 60}>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs" style={{ color: 'var(--color-brass)' }}>《{c.posts?.[0]?.title || '帖子'}》</span>
                    <span className="text-xs ml-auto" style={{ color: 'var(--color-muted)', opacity: 0.6 }}>{formatDate(c.created_at)}</span>
                  </div>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--color-ink)', fontFamily: "'Noto Serif SC', serif" }}>{c.content}</p>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
