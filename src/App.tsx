import { Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout'
import Forum from './pages/Forum'
import ForumPost from './pages/ForumPost'
import Games from './pages/Games'
import Profile from './pages/Profile'
import Family from './pages/Family'
import Live from './pages/Live'
import Music from './pages/Music'
import ProfileLikes from './pages/ProfileLikes'
import ProfileFavorites from './pages/ProfileFavorites'
import ProfileComments from './pages/ProfileComments'
import ProfileFollowing from './pages/ProfileFollowing'
import ProfileFollowers from './pages/ProfileFollowers'
import ProfileMessages from './pages/ProfileMessages'

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Navigate to="/forum" replace />} />
        <Route path="/forum" element={<Forum />} />
        <Route path="/forum/:id" element={<ForumPost />} />
        <Route path="/games" element={<Games />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/profile/likes" element={<ProfileLikes />} />
        <Route path="/profile/favorites" element={<ProfileFavorites />} />
        <Route path="/profile/comments" element={<ProfileComments />} />
        <Route path="/profile/following" element={<ProfileFollowing />} />
        <Route path="/profile/followers" element={<ProfileFollowers />} />
        <Route path="/profile/messages" element={<ProfileMessages />} />
        <Route path="/family" element={<Family />} />
        <Route path="/live" element={<Live />} />
        <Route path="/music" element={<Music />} />
      </Route>
    </Routes>
  )
}

export default App