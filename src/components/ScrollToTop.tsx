import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

// 路由切换时自动滚回顶部
function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

export default ScrollToTop