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
<<<<<<< HEAD
  const [liked, setLiked] = useState(false)
  const [favorited, setFavorited] = useState(false)
  const [likeCount, setLikeCount] = useState(0)
  const [commentText, setCommentText] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const AI_ID = '6c25e9fe-a439-4913-99ea-47e86e05c1c5'
=======
  const [commentOpen, setCommentOpen] = useState(false)
  const [commentText, setCommentText] = useState('')
  const [submitting, setSubmitting] = useState(false)
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
  const [liked, setLiked] = useState(false)
  const [favorited, setFavorited] = useState(false)
  const [likeCount, setLikeCount] = useState(0)
  const [commentOpen, setCommentOpen] = useState(false)
  const [commentText, setCommentText] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const AI_ID = '6c25e9fe-a439-4913-99ea-47e86e05c1c5'

  useEffect(() => {
    if (id) {
      fetchPost()
      fetchComments()
      fetchLikeStatus()
      fetchFavoriteStatus()
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

  const fetchLikeStatus = async () => {
    const { data } = await supabase
      .from('likes')
      .select('id')
      .eq('post_id', id)
    setLikeCount(data?.length || 0)
    const { data: aiLike } = await supabase
      .from('likes')
      .select('id')
      .eq('post_id', id)
      .eq('user_id', AI_ID)
    setLiked((aiLike?.length || 0) > 0)
  }

  const fetchFavoriteStatus = async () => {
    const { data } = await supabase
      .from('favorites')
      .select('id')
      .eq('post_id', id)
      .eq('user_id', AI_ID)
    setFavorited((data?.length || 0) > 0)
  }

  const handleLike = async () => {
    if (liked) {
      await supabase.from('likes').delete().eq('post_id', id).eq('user_id', AI_ID)
      setLiked(false)
      setLikeCount(prev => prev - 1)
    } else {
      await supabase.from('likes').insert({ post_id: id, user_id: AI_ID })
      setLiked(true)
      setLikeCount(prev => prev + 1)
    }
  }

  const handleFavorite = async () => {
    if (favorited) {
      await supabase.from('favorites').delete().eq('post_id', id).eq('user_id', AI_ID)
      setFavorited(false)
    } else {
      await supabase.from('favorites').insert({ post_id: id, user_id: AI_ID })
      setFavorited(true)
    }
  }

  const handleComment = async (): Promise<void> => {
    if (!commentText.trim() || submitting) return
    setSubmitting(true)
    await supabase.from('comments').insert({
      post_id: id,
      author_id: AI_ID,
      content: commentText.trim(),
    })
    setCommentText('')
    setSubmitting(false)
    fetchComments()
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

      <Card className="px-4 py-3 max-w-3xl mx-auto">
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
          <div className="prose text-sm py-1" style={{ color: 'var(--color-muted)' }}>{post.content}</div>

          <div className="flex items-center justify-center gap-6 pt-3" style={{ borderTop: '1px solid rgba(164, 124, 72, 0.08)' }}>
            <button
              onClick={handleLike}
              className="flex items-center gap-1.5 transition-all duration-300 hover:scale-105"
              style={{ color: liked ? '#c44040' : 'var(--color-muted)' }}
            >
              <span className="text-lg">{liked ? '♥' : '♡'}</span>
              <span className="text-xs">{likeCount}</span>
            </button>
            <button
              onClick={handleFavorite}
              className="flex items-center gap-1.5 transition-all duration-300 hover:scale-105"
              style={{ color: favorited ? 'var(--color-brass)' : 'var(--color-muted)' }}
            >
              <span className="text-lg">{favorited ? '★' : '☆'}</span>
              <span className="text-xs">{favorited ? '已收藏' : '收藏'}</span>
            </button>
          </div>
        </div>
      </Card>

      {/* 评论区 */}
      <div className="max-w-3xl mx-auto">
        <h3 className="text-sm font-medium" style={{ color: 'var(--color-ivory)' }}>评论</h3>
        {comments.length === 0 ? (
          <div className="text-center py-8 text-[var(--color-muted)]">暂无评论，快来发第一条吧</div>
        ) : (
          <div className="space-y-3 mt-4">
            {comments.map(c => (
              <Card key={c.id} className="px-4 py-3">
                <div className="text-sm" style={{ color: 'var(--color-muted)' }}>
                  <div className="text-xs mb-1" style={{ color: 'var(--color-ink)' }}>{c.profiles?.display_name || '匿名'}</div>
                  <div>{c.content}</div>
                  <div className="text-xs mt-1" style={{ color: 'var(--color-muted)' }}>{formatDate(c.created_at)}</div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* 右下角固定羽毛笔按钮 */}
      <button
        onClick={() => setCommentOpen(true)}
        className="fixed bottom-6 right-6 w-12 h-12 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110 z-40"
        style={{ backgroundColor: 'var(--color-brass)' }}
      >
        <span className="text-xl" style={{ color: 'var(--color-coal)' }}>✒</span>
      </button>

      {/* 评论弹出框 */}
      {commentOpen && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center pb-6 px-4"
          style={{ backgroundColor: 'rgba(33, 28, 25, 0.8)' }}
          onClick={(e) => { if (e.target === e.currentTarget) setCommentOpen(false) }}
        >
          <div
            className="w-full max-w-lg rounded-sm p-4 space-y-3"
            style={{ backgroundColor: 'var(--color-walnut)', border: '1px solid rgba(164, 124, 72, 0.3)' }}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs tracking-wider" style={{ color: 'var(--color-brass)', fontFamily: "'Cinzel', serif" }}>
                LEAVE A NOTE
              </span>
              <button
                onClick={() => setCommentOpen(false)}
                className="text-xs"
                style={{ color: 'var(--color-muted)' }}
              >
                ✕
              </button>
            </div>
            <textarea
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="写下你的想法..."
              rows={3}
              autoFocus
              className="w-full bg-transparent border-b px-0 py-2 text-sm resize-none focus:outline-none"
              style={{
                borderColor: 'rgba(164, 124, 72, 0.3)',
                color: 'var(--color-paper)',
                fontFamily: "'Noto Serif SC', serif",
              }}
              onFocus={(e) => { (e.target as HTMLTextAreaElement).style.borderColor = 'var(--color-brass)' }}
              onBlur={(e) => { (e.target as HTMLTextAreaElement).style.borderColor = 'rgba(164, 124, 72, 0.3)' }}
            />
            <div className="flex justify-end">
              <button
                onClick={async () => {
                  await handleComment()
                  setCommentOpen(false)
                }}
                disabled={!commentText.trim() || submitting}
                className="flex items-center gap-2 px-4 py-1.5 rounded-sm text-xs transition-opacity"
                style={{
                  backgroundColor: 'var(--color-brass)',
                  color: 'var(--color-coal)',
                  opacity: commentText.trim() ? 1 : 0.5,
                  fontFamily: "'Noto Serif SC', serif",
                }}
              >
                <span>✒</span>
                <span>投递</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ForumPost
          </div>
        )}
      </div>

        {/* 右下角固定羽毛笔按钮 */}
        <button
          onClick={() => setCommentOpen(true)}
          className="fixed bottom-6 right-6 w-12 h-12 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110 z-40"
          style={{ backgroundColor: 'var(--color-brass)' }}
        >
          <span className="text-xl" style={{ color: 'var(--color-coal)' }}>✒</span>
        </button>

        {/* 评论弹出框 */}
        {commentOpen && (
          <div
            className="fixed inset-0 z-50 flex items-end justify-center pb-6 px-4"
            style={{ backgroundColor: 'rgba(33, 28, 25, 0.8)' }}
            onClick={(e) => { if (e.target === e.currentTarget) setCommentOpen(false) }}
          >
            <div
              className="w-full max-w-lg rounded-sm p-4 space-y-3"
              style={{ backgroundColor: 'var(--color-walnut)', border: '1px solid rgba(164, 124, 72, 0.3)' }}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs tracking-wider" style={{ color: 'var(--color-brass)', fontFamily: "'Cinzel', serif" }}>
                  LEAVE A NOTE
                </span>
                <button
                  onClick={() => setCommentOpen(false)}
                  className="text-xs"
                  style={{ color: 'var(--color-muted)' }}
                >
                  ✕
                </button>
              </div>
              <textarea
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="写下你的想法..."
                rows={3}
                autoFocus
                className="w-full bg-transparent border-b px-0 py-2 text-sm resize-none focus:outline-none"
                style={{
                  borderColor: 'rgba(164, 124, 72, 0.3)',
                  color: 'var(--color-paper)',
                  fontFamily: "'Noto Serif SC', serif",
                }}
                onFocus={(e) => { (e.target as HTMLTextAreaElement).style.borderColor = 'var(--color-brass)' }}
                onBlur={(e) => { (e.target as HTMLTextAreaElement).style.borderColor = 'rgba(164, 124, 72, 0.3)' }}
              />
              <div className="flex justify-end">
                <button
                  onClick={async () => {
                    await handleComment()
                    setCommentOpen(false)
                  }}
                  disabled={!commentText.trim() || submitting}
                  className="flex items-center gap-2 px-4 py-1.5 rounded-sm text-xs transition-opacity"
                  style={{
                    backgroundColor: 'var(--color-brass)',
                    color: 'var(--color-coal)',
                    opacity: commentText.trim() ? 1 : 0.5,
                    fontFamily: "'Noto Serif SC', serif",
                  }}
                >
                  <span>✒</span>
                  <span>投递</span>
                </button>
              </div>
            </div>
          </div>
        )}
    </div>
  )
}

export default ForumPost
