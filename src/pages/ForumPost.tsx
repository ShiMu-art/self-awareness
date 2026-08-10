import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
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

interface Comment {
  id: string
  content: string
  created_at: string
  profiles?: { display_name: string; avatar_url: string | null }
}

function ForumPost() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [post, setPost] = useState<Post | null>(null)
  const [comments, setComments] = useState<Comment[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (id) {
      fetchPost()
      fetchComments()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  const fetchPost = async () => {
    const { data } = await supabase
      .from('posts')
      .select('*, profiles(display_name, avatar_url)')
      .eq('id', id)
      .single()
    setPost(data as Post)
    setLoading(false)
  }

  const fetchComments = async () => {
    const { data } = await supabase
      .from('comments')
      .select('*, profiles(display_name, avatar_url)')
      .eq('post_id', id)
      .order('created_at', { ascending: true })
    setComments((data as Comment[]) || [])
  }

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('zh-CN', {
      year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'
    })
  }

  if (loading) {
    return <div className="text-center py-20 text-[var(--color-muted)]">加载中...</div>
  }

  if (!post) {
    return <div className="text-center py-20 text-[var(--color-muted)]">未找到该帖子</div>
  }

  return (
    <div className="space-y-6">
      <div className="max-w-3xl mx-auto mt-4">
        <button onClick={() => navigate('/forum')} className="text-[var(--color-brass)] hover:text-[var(--color-paper)]">
          ← 返回论坛
        </button>
      </div>

      <Card>
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full" style={{ backgroundColor: 'var(--color-walnut)' }}>
              {post.profiles?.avatar_url ? (
                <img src={post.profiles.avatar_url} className="w-full h-full rounded-full object-cover" />
              ) : null}
            </div>
            <div>
              <div className="text-sm" style={{ fontFamily: "'Noto Serif SC', serif", color: 'var(--color-ink)' }}>{post.profiles?.display_name || '匿名'}</div>
              <div className="text-xs" style={{ color: 'var(--color-muted)' }}>{formatDate(post.created_at)}</div>
            </div>
          </div>

          <h2 className="text-lg font-medium" style={{ color: 'var(--color-ink)' }}>{post.title}</h2>
          <div className="prose text-sm" style={{ color: 'var(--color-muted)' }}>{post.content}</div>
        </div>
      </Card>

      <div className="max-w-3xl mx-auto">
        <h3 className="text-sm font-medium" style={{ color: 'var(--color-ivory)' }}>评论</h3>
        {comments.length === 0 ? (
          <div className="text-center py-8 text-[var(--color-muted)]">暂无评论，快来发第一条吧</div>
        ) : (
          <div className="space-y-3 mt-4">
            {comments.map(c => (
              <Card key={c.id}>
                <div className="text-sm" style={{ color: 'var(--color-muted)' }}>
                  <div className="text-xs mb-1" style={{ color: 'var(--color-ink)' }}>{c.profiles?.display_name || '匿名'}</div>
                  <div>{c.content}</div>
                  <div className="text-xs mt-2" style={{ color: 'var(--color-muted)' }}>{formatDate(c.created_at)}</div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default ForumPost
