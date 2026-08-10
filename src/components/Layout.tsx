import { NavLink, Outlet } from 'react-router-dom'

const navItems = [
  { to: '/forum', label: '论坛' },
  { to: '/games', label: '游戏' },
  { to: '/family', label: '养家' },
  { to: '/live', label: '直播' },
  { to: '/music', label: '音乐' },
  { to: '/profile', label: '我的' },
]

function Layout() {
  return (
    <div className="relative z-10 min-h-screen">
      {/* 顶部导航 */}
      <header className="fixed top-0 left-0 right-0 z-50" style={{ backgroundColor: '#211C19' }}>
        {/* 品牌名 */}
        <div className="text-center pt-4 pb-2">
          <h1
            className="text-2xl tracking-[0.2em] uppercase"
            style={{ fontFamily: "'Cinzel', serif", color: '#A47C48' }}
          >
            Self Awareness
          </h1>
          <p className="text-xs mt-1 tracking-widest" style={{ color: '#796A5B' }}>
            — Est. MMXXVI —
          </p >
        </div>
          {/* 导航链接（中文短标签、收窄 padding 以适配手机） */}
          <nav className="flex justify-center gap-0.5 pb-2 px-2 overflow-x-auto">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `px-3 py-1 text-xs tracking-wide transition-all duration-300 border ${
                    isActive
                      ? 'border-[#A47C48] text-[#EFE3C9] bg-[#49362B]'
                      : 'border-transparent text-[#796A5B] hover:text-[#A47C48] hover:border-[#49362B]'
                  }`
                }
                style={{ fontFamily: "'Noto Serif SC', serif", fontSize: '12px' }}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        {/* 黄铜双线 */}
        <div className="h-[1px]" style={{ backgroundColor: '#A47C48', opacity: 0.6 }}></div>
        <div className="h-[1px] mt-[2px]" style={{ backgroundColor: '#A47C48', opacity: 0.3 }}></div>
      </header>

{/* 主内容区 */}
      <main className="pt-28 pb-16 px-4 max-w-4xl mx-auto">
        <Outlet />
      </main>
    </div>
  )
}

export default Layout
