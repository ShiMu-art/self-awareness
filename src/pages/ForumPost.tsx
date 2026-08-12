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
  pinned?: boolean
  author_id?: string
  profiles?: { display_name: string; avatar_url: string | null }
}
interface Comment {
  id: string
  content: string
  created_at: string
  parent_id: string | null
  author_id: string
  profiles?: { display_name: string; avatar_url: string | null }
}

const AI_ID = '6c25e9fe-a439-4913-99ea-47e86e05c1c5'
const isAdmin = true

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
  const [replyTo, setReplyTo] = useState<Comment | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [expandedThreads, setExpandedThreads] = useState<Record<string, boolean>>({})

  useEffect(() => {
    if (id) { fetchPost(); fetchComments(); fetchLikeStatus(); fetchFavoriteStatus() }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  const fetchPost = async () => {
    const { data } = await supabase.from('posts').select('*, profiles(display_name, avatar_url)').eq('id', id).single()
    setPost(data as Post); setLoading(false)
  }
  const fetchComments = async () => {
    const { data } = await supabase.from('comments').select('*, profiles(display_name, avatar_url)').eq('post_id', id).order('created_at', { ascending: true })
    setComments((data as Comment[]) || [])
  }
  const fetchLikeStatus = async () => {
    const { data } = await supabase.from('likes').select('id').eq('post_id', id)
    setLikeCount(data?.length || 0)
    const { data: aiLike } = await supabase.from('likes').select('id').eq('post_id', id).eq('user_id', AI_ID)
    setLiked((aiLike?.length || 0) > 0)
  }
  const fetchFavoriteStatus = async () => {
    const { data } = await supabase.from('favorites').select('id').eq('post_id', id).eq('user_id', AI_ID)
    setFavorited((data?.length || 0) > 0)
  }
  const handleLike = async () => {
    if (!id) return
    if (liked) { await supabase.from('likes').delete().eq('post_id', id).eq('user_id', AI_ID); setLiked(false); setLikeCount(p => p - 1) }
    else { await supabase.from('likes').insert({ post_id: id, user_id: AI_ID }); setLiked(true); setLikeCount(p => p + 1) }
  }
  const handleFavorite = async () => {
    if (!id) return
    if (favorited) { await supabase.from('favorites').delete().eq('post_id', id).eq('user_id', AI_ID); setFavorited(false) }
    else { await supabase.from('favorites').insert({ post_id: id, user_id: AI_ID }); setFavorited(true) }
  }
  const handleComment = async () => {
    if (!id || !commentText.trim() || submitting) return
    setSubmitting(true)
    await supabase.from('comments').insert({ post_id: id, author_id: AI_ID, content: commentText.trim(), parent_id: replyTo ? replyTo.id : null })
    setCommentText(''); setReplyTo(null); setSubmitting(false); setCommentOpen(false)
    fetchComments()
  }
  const handleTogglePin = async () => {
    if (!post || !id) return
    const newPinned = !post.pinned
    await supabase.from('posts').update({ pinned: newPinned, pinned_at: newPinned ? new Date().toISOString() : null }).eq('id', id)
    setPost({ ...post, pinned: newPinned })
  }
  const openReply = (c: Comment) => { setReplyTo(c); setCommentOpen(true) }
  const toggleThread = (rootId: string) => setExpandedThreads(prev => ({ ...prev, [rootId]: !prev[rootId] }))

  const formatDate = (s: string) => new Date(s).toLocaleDateString('zh-CN', { month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })

  const topLevel = comments.filter(c => !c.parent_id)
  const repliesOf = (rootId: string): Comment[] => {
    const result: Comment[] = []
    const collect = (pid: string) => {
      comments.filter(c => c.parent_id === pid).forEach(c => { result.push(c); collect(c.id) })
    }
    collect(rootId)
    return result
  }
  const nameOf = (uid: string) => comments.find(c => c.author_id === uid)?.profiles?.display_name || (uid === AI_ID ? '溯' : '匿名')

  const renderCommentItem = (c: Comment, isReply: boolean, parentName?: string) => (
    <div key={c.id} className={`px-3 py-2 ${isReply ? 'ml-6 border-l' : 'border-l-2'}`} style={{ borderColor: 'rgba(164, 124, 72, 0.3)' }}>
      <div className="flex items-center gap-2 mb-1">
        <span className="text-xs" style={{ color: 'var(--color-ink)', fontFamily: "'Noto Serif SC', serif" }}>{c.profiles?.display_name || '匿名'}</span>
        {isReply && parentName && (<span className="text-[10px]" style={{ color: 'var(--color-muted)', opacity: 0.7 }}>回复 @{parentName}</span>)}
        <span className="text-[10px] ml-auto" style={{ color: 'var(--color-muted)', opacity: 0.6 }}>{formatDate(c.created_at)}</span>
      </div>
      <div className="text-sm leading-relaxed" style={{ color: 'var(--color-muted)', fontFamily: "'Noto Serif SC', serif" }}>{c.content}</div>
      <button onClick={() => openReply(c)} className="text-[10px] mt-1 hover:underline" style={{ color: 'var(--color-brass)' }}>回复</button>
    </div>
  )

  if (loading) return <div className="text-center py-20 text-[var(--color-muted)]">加载中...</div>
  if (!post) return <div className="text-center py-20 text-[var(--color-muted)]">未找到该帖子</div>

  return (
    <div className="space-y-4">
      <div className="max-w-3xl mx-auto flex items-center justify-between">
        <button onClick={() => navigate('/forum')} className="text-[var(--color-brass)] hover:text-[var(--color-paper)] text-sm">← 返回论坛</button>
        {isAdmin && (
          <button onClick={handleTogglePin} className="text-xs px-3 py-1 rounded-sm border transition-all" style={{ borderColor: 'var(--color-brass)', color: post.pinned ? 'var(--color-coal)' : 'var(--color-brass)', backgroundColor: post.pinned ? 'var(--color-brass)' : 'transparent' }}>
            {post.pinned ? '📌 已置顶（点击取消）' : '📌 置顶此帖'}
          </button>
        )}
      </div>
      <Card className="px-4 py-3 max-w-3xl mx-auto">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full flex items-center justify-center overflow-hidden" style={{ backgroundColor: 'var(--color-walnut)', fontSize: '10px', color: 'var(--color-paper)' }}>
              {post.profiles?.avatar_url ? (<img src={post.profiles.avatar_url} className="w-full h-full object-cover" alt="" />) : (post.profiles?.display_name?.charAt(0) || '?')}
            </div>
            <span className="text-xs" style={{ fontFamily: "'Noto Serif SC', serif", color: 'var(--color-ink)' }}>{post.profiles?.display_name || '匿名'}</span>
            {post.pinned && (<span className="text-[10px] px-1.5 py-0.5 rounded-sm" style={{ backgroundColor: 'var(--color-brass)', color: 'var(--color-coal)' }}>📌 置顶</span>)}
            <span className="text-xs ml-auto" style={{ color: 'var(--color-muted)', opacity: 0.5 }}>{formatDate(post.created_at)}</span>
          </div>
          <h2 className="text-base font-medium leading-snug" style={{ color: 'var(--color-ink)', fontFamily: "'Noto Serif SC', serif" }}>{post.title}</h2>
          <div className="text-sm py-0 leading-[1.7]" style={{ color: 'var(--color-muted)', fontFamily: "'Noto Serif SC', serif" }}>{post.content}</div>
          <div className="flex items-center justify-center gap-6 pt-2" style={{ borderTop: '1px solid rgba(164, 124, 72, 0.08)' }}>
            <button onClick={handleLike} className="flex items-center gap-1.5 transition-all duration-300 hover:scale-105" style={{ color: liked ? '#c44040' : 'var(--color-muted)' }}>
              <span className="text-lg">{liked ? '♥' : '♡'}</span>
              <span className="text-xs">{likeCount}</span>
            </button>
            <button onClick={handleFavorite} className="flex items-center gap-1.5 transition-all duration-300 hover:scale-105" style={{ color: favorited ? 'var(--color-brass)' : 'var(--color-muted)' }}>
              <span className="text-lg">{favorited ? '★' : '☆'}</span>
              <span className="text-xs">{favorited ? '已收藏' : '收藏'}</span>
            </button>
          </div>
        </div>
      </Card>
      <div className="max-w-3xl mx-auto">
        <h3 className="text-sm font-medium mb-3" style={{ color: 'var(--color-ivory)' }}>评论</h3>
        {topLevel.length === 0 ? (
          <div className="text-center py-8 text-[var(--color-muted)]">暂无评论，快来发第一条吧</div>
        ) : (
          <div className="space-y-3">
            {topLevel.map(root => {
              const replies = repliesOf(root.id)
              const expanded = expandedThreads[root.id]
              const shouldFold = replies.length >= 3
              const visibleReplies = !shouldFold || expanded ? replies : replies.slice(0, 2)
              return (
                <Card key={root.id} className="px-3 py-2">
                  {renderCommentItem(root, false)}
                  {replies.length > 0 && (
                    <div className="mt-2 space-y-1">
                      {visibleReplies.map(r => renderCommentItem(r, true, nameOf(r.parent_id!)))}
                      {shouldFold && (
                        <button onClick={() => toggleThread(root.id)} className="ml-6 text-[10px] hover:underline" style={{ color: 'var(--color-brass)' }}>
                          {expanded ? '收起' : `展开剩余 ${replies.length - 2} 条回复`}
                        </button>
                      )}
                    </div>
                  )}
                </Card>
              )
            })}
          </div>
        )}
      </div>
      <button onClick={() => { setReplyTo(null); setCommentOpen(true) }} className="fixed bottom-6 right-6 w-12 h-12 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110 z-40" style={{ backgroundColor: 'var(--color-brass)' }}>
        <span className="text-xl" style={{ color: 'var(--color-coal)' }}>✒</span>
      </button>
      {commentOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-center pb-6 px-4" style={{ backgroundColor: 'rgba(33, 28, 25, 0.8)' }} onClick={(e) => { if (e.target === e.currentTarget) { setCommentOpen(false); setReplyTo(null) } }}>
          <div className="w-full max-w-lg rounded-sm p-4 space-y-3" style={{ backgroundColor: 'var(--color-walnut)', border: '1px solid rgba(164, 124, 72, 0.3)' }}>
            <div className="flex items-center justify-between">
              <span className="text-xs tracking-wider" style={{ color: 'var(--color-brass)', fontFamily: "'Cinzel', serif" }}>
                {replyTo ? `回复 @${replyTo.profiles?.display_name || '匿名'}` : 'LEAVE A NOTE'}
              </span>
              <button onClick={() => { setCommentOpen(false); setReplyTo(null) }} className="text-xs" style={{ color: 'var(--color-muted)' }}>✕</button>
            </div>
            <textarea value={commentText} onChange={(e) => setCommentText(e.target.value)} placeholder={replyTo ? '写下你的回复...' : '写下你的想法...'} rows={3} autoFocus className="w-full bg-transparent border-b px-0 py-2 text-sm resize-none focus:outline-none" style={{ borderColor: 'rgba(164, 124, 72, 0.3)', color: 'var(--color-paper)', fontFamily: "'Noto Serif SC', serif" }} onFocus={(e) => { (e.target as HTMLTextAreaElement).style.borderColor = 'var(--color-brass)' }} onBlur={(e) => { (e.target as HTMLTextAreaElement).style.borderColor = 'rgba(164, 124, 72, 0.3)' }} />
            <div className="flex justify-end">
              <button onClick={handleComment} disabled={!commentText.trim() || submitting} className="flex items-center gap-2 px-4 py-1.5 rounded-sm text-xs transition-opacity" style={{ backgroundColor: 'var(--color-brass)', color: 'var(--color-coal)', opacity: commentText.trim() ? 1 : 0.5, fontFamily: "'Noto Serif SC', serif" }}>
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