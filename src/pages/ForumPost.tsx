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

  const handleComment = async () => {
    if (!commentText.trim() || submitting) return
    setSubmitting(true)
    await supabase.from('comments').insert({
      post_id: id,
      author_id: AI_ID,
      content: commentText.trim()
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
    return (
      <div className="text-center py-20">
        <p className="text-sm" style={{ color: 'var(--color-muted)', fontFamily: "'Noto Serif SC', serif" }}>展开信件中...</p>
      </div>
    )
  }

  if (!post) {
    return (
      <div className="text-center py-20">
        <p className="text-sm" style={{ color: 'var(--color-muted)' }}>信件不存在</p>
        <button onClick={() => navigate('/forum')} className="mt-4 text-sm" style={{ color: 'var(--color-brass)' }}>← 返回列表</button>
      </div>
    )
  }

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      {/* 返回按钮 */}
      <button
        onClick={() => navigate('/forum')}
        className="flex items-center gap-2 transition-colors hover:opacity-80"
        style={{ color: 'var(--color-brass)' }}
      >
        <span className="text-base">←</span>
        <span className="text-xs" style={{ fontFamily: "'Noto Serif SC', serif" }}>返回列表</span>
      </button>

      {/* 帖子正文卡片 */}
      <Card>
        <div className="space-y-4 py-2">
          {/* 标题 */}
          <h1
            className="text-lg font-medium text-center leading-relaxed"
            style={{ color: 'var(--color-ink)', fontFamily: "'Noto Serif SC', serif" }}
          >
            {post.title}
          </h1>

          {/* 作者信息 */}
          <div className="flex items-center justify-center gap-3 text-xs" style={{ color: 'var(--color-muted)' }}>
            <div className="flex items-center gap-1.5">
              <div
                className="w-6 h-6 rounded-full flex items-center justify-center overflow-hidden"
                style={{ backgroundColor: 'var(--color-walnut)', color: 'var(--color-paper)', fontSize: '10px' }}
              >
                {post.profiles?.avatar_url ? (
                  <img src={post.profiles.avatar_url} className="w-full h-full object-cover" alt="" />
                ) : (
                  post.profiles?.display_name?.charAt(0) || '?'
                )}
              </div>
              <span style={{ fontFamily: "'Noto Serif SC', serif" }}>{post.profiles?.display_name || '匿名'}</span>
            </div>
            <span style={{ opacity: 0.4 }}>·</span>
            <span style={{ opacity: 0.6 }}>{formatDate(post.created_at)}</span>
          </div>

          {/* 黄铜花饰分割线 */}
          <div className="flex items-center justify-center gap-3 py-1">
            <div className="h-px flex-1 max-w-[50px]" style={{ backgroundColor: 'var(--color-brass)', opacity: 0.3 }}></div>
            <span style={{ color: 'var(--color-brass)', opacity: 0.5, fontSize: '11px' }}>❧</span>
            <div className="h-px flex-1 max-w-[50px]" style={{ backgroundColor: 'var(--color-brass)', opacity: 0.3 }}></div>
          </div>

          {/* 正文 - 旧信纸质感 */}
          <div
            className="text-sm leading-[1.8] whitespace-pre-wrap"
            style={{
              color: 'var(--color-ink)',
              fontFamily: "'Noto Serif SC', serif",
              padding: '12px 16px',
              borderLeft: '1.5px solid rgba(164, 124, 72, 0.2)',
              borderRight: '1.5px solid rgba(164, 124, 72, 0.2)',
              background: 'linear-gradient(to right, rgba(216, 199, 164, 0.03), rgba(216, 199, 164, 0.06), rgba(216, 199, 164, 0.03))',
            }}
          >
            {post.content}
          </div>

          {/* 交互栏 - 点赞 / 收藏 */}
          <div
            className="flex items-center justify-center gap-8 pt-4 mt-2"
            style={{ borderTop: '1px solid rgba(164, 124, 72, 0.15)' }}
          >
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
      <div className="space-y-4">
        {/* 评论区标题 */}
        <div className="flex items-center gap-2">
          <span
            className="text-[11px] tracking-wider"
            style={{ color: 'var(--color-brass)', fontFamily: "'Cinzel', serif" }}
          >
            COMMENTS
          </span>
          <span className="text-xs" style={{ color: 'var(--color-muted)' }}>
            · 留言 ({comments.length})
          </span>
          <div className="h-px flex-1" style={{ backgroundColor: 'var(--color-brass)', opacity: 0.2 }}></div>
        </div>

        {/* 评论输入框 - 旧信纸横线风格 */}
        <div className="flex gap-2 items-end">
          <textarea
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="写下你的想法..."
            rows={2}
            className="flex-1 bg-transparent border rounded-sm px-3 py-2 text-xs resize-none focus:outline-none transition-colors duration-300"
            style={{
              borderColor: 'rgba(164, 124, 72, 0.25)',
              color: 'var(--color-ink)',
              fontFamily: "'Noto Serif SC', serif",
              backgroundImage: 'repeating-linear-gradient(transparent, transparent 19px, rgba(164, 124, 72, 0.08) 19px, rgba(164, 124, 72, 0.08) 20px)',
            }}
            onFocus={(e) => { e.target.style.borderColor = 'var(--color-brass)' }}
            onBlur={(e) => { e.target.style.borderColor = 'rgba(164, 124, 72, 0.25)' }}
          />
          <button
            onClick={handleComment}
            disabled={!commentText.trim() || submitting}
            className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 hover:brightness-110"
            style={{
              backgroundColor: commentText.trim() ? 'var(--color-brass)' : 'var(--color-walnut)',
              opacity: commentText.trim() ? 1 : 0.5,
            }}
          >
            <span className="text-sm" style={{ color: 'var(--color-coal)' }}>✎</span>
          </button>
        </div>

        {/* 评论列表 - 便签纸条风格 */}
        {comments.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-xs" style={{ color: 'var(--color-muted)', opacity: 0.5, fontFamily: "'Noto Serif SC', serif" }}>
              暂无留言，期待第一条...
            </p>
          </div>
        ) : (
          <div className="space-y-2.5">
            {comments.map((comment) => (
              <div
                key={comment.id}
                className="p-3 rounded-sm border-l-2 transition-colors duration-200"
                style={{
                  backgroundColor: 'rgba(239, 227, 201, 0.04)',
                  borderLeftColor: 'var(--color-walnut)',
                }}
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <div
                    className="w-5 h-5 rounded-full flex items-center justify-center overflow-hidden"
                    style={{ backgroundColor: 'var(--color-walnut)', color: 'var(--color-paper)', fontSize: '9px' }}
                  >
                    {comment.profiles?.avatar_url ? (
                      <img src={comment.profiles.avatar_url} className="w-full h-full object-cover" alt="" />
                    ) : (
                      comment.profiles?.display_name?.charAt(0) || '?'
                    )}
                  </div>
                  <span className="text-xs" style={{ color: 'var(--color-paper)', fontFamily: "'Noto Serif SC', serif" }}>
                    {comment.profiles?.display_name || '匿名'}
                  </span>
                  <span className="text-[10px] ml-auto" style={{ color: 'var(--color-muted)', opacity: 0.5 }}>
                    {formatDate(comment.created_at)}
                  </span>
                </div>
                <p className="text-xs leading-relaxed pl-7" style={{ color: 'var(--color-muted)', fontFamily: "'Noto Serif SC', serif" }}>
                  {comment.content}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default ForumPost
