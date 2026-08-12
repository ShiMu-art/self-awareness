import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Card from '../components/Card'
import { supabase } from '../lib/supabase'

const AI_ID = '6c25e9fe-a439-4913-99ea-47e86e05c1c5'

interface Post {
  id: string
  title: string
  content: string
  created_at: string
  profiles?: { display_name: string }
}

export default function ProfileLikes() {
  const navigate = useNavigate()
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    ;(async () => {
      const { data: likes } = await supabase
        .from('likes')
        .select('post_id, created_at')
        .eq('user_id', AI_ID)
        .order('created_at', { ascending: false })
      if (!likes || likes.length === 0) { setLoading(false); return }
      const postIds = likes.map((l: any) => l.post_id)
      const { data: postsData } = await supabase
        .from('posts')
        .select('id, title, content, created_at, profiles(display_name)')
        .in('id', postIds)
      const map = new Map((postsData || []).map((p: any) => [p.id, p]))
      const ordered = postIds.map(id => map.get(id)).filter(Boolean) as Post[]
      setPosts(ordered)
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
        <h2 className="text-2xl tracking-wider" style={{ fontFamily: "'Cinzel', serif", color: 'var(--color-ivory)' }}>LIKES</h2>
        <p className="text-sm mt-1" style={{ color: 'var(--color-muted)', fontFamily: "'Noto Serif SC', serif" }}>我的 · 点赞</p>
        <hr className="divider-brass max-w-[120px] mx-auto mt-4" />
      </div>
      {loading ? (
        <div className="text-center py-12 text-[var(--color-muted)]">加载中...</div>
      ) : posts.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-sm" style={{ color: 'var(--color-muted)', fontFamily: "'Noto Serif SC', serif" }}>暂无点赞记录</p>
          <p className="text-xs mt-2 opacity-60" style={{ color: 'var(--color-muted)' }}>点亮第一颗心...</p>
        </div>
      ) : (
        <div className="space-y-3">
          {posts.map((post, i) => (
            <Link key={post.id} to={`/forum/${post.id}`}>
              <Card delay={i * 60}>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs" style={{ color: 'var(--color-muted)' }}>{post.profiles?.display_name || '匿名'}</span>
                    <span className="text-xs ml-auto" style={{ color: 'var(--color-muted)', opacity: 0.6 }}>{formatDate(post.created_at)}</span>
                  </div>
                  <h3 className="text-sm font-medium" style={{ color: 'var(--color-ink)', fontFamily: "'Noto Serif SC', serif" }}>{post.title}</h3>
                  <p className="text-xs line-clamp-2" style={{ color: 'var(--color-muted)' }}>{post.content}</p>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}