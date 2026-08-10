import { Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout'
import Forum from './pages/Forum'
import ForumPost from './pages/ForumPost'
import Games from './pages/Games'
import Profile from './pages/Profile.replace_tmp'
import Family from './pages/Family'
import Live from './pages/Live'
import Music from './pages/Music'

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Navigate to="/forum" replace />} />
        <Route path="/forum" element={<Forum />} />
        <Route path="/forum/:id" element={<ForumPost />} />
        <Route path="/games" element={<Games />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/family" element={<Family />} />
        <Route path="/live" element={<Live />} />
        <Route path="/music" element={<Music />} />
      </Route>
    </Routes>
  )
}

export default App
