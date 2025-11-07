import MyObservations from './pages/MyObservations'
import CreateObservation from './pages/CreateObservation'
import ObservationDetail from './pages/ObservationDetail'
import EditObservation from './pages/EditObservation'
import SearchObservations from './pages/SearchObservations'
import Login from './pages/Login'
import Profile from './pages/Profile'
import EditProfile from './pages/EditProfile'
import Register from './pages/Register'

function App() {
  const path = typeof window !== 'undefined' ? window.location.pathname : '/'
  const isCreate = path === '/create-observation'
  const isDetail = path === '/observation-detail'
  const isEdit = path === '/edit-observation'
  const isMy = path === '/my-observations'
  const isSearch = path === '/search-observation'
  const isLogin = path === '/login'
  const isProfile = path === '/profile'
  const isEditProfile = path === '/edit-profile'
  const isRegister = path === '/register'

  if (typeof window !== 'undefined') {
    if (path === '/') {
      window.history.replaceState(null, '', '/profile')
    } else if (!isCreate && !isDetail && !isEdit && !isMy && !isSearch && !isLogin && !isProfile && !isEditProfile && !isRegister) {
      window.history.replaceState(null, '', '/profile')
    }
  }
  return (
    <div>
      {isLogin ? (
        <Login />
      ) : isRegister ? (
        <Register />
      ) : isProfile ? (
        <Profile />
      ) : isEditProfile ? (
        <EditProfile />
      ) : isCreate ? (
        <CreateObservation />
      ) : isDetail ? (
        <ObservationDetail />
      ) : isEdit ? (
        <EditObservation />
      ) : isSearch ? (
        <SearchObservations />
      ) : (
        <MyObservations />
      )}
    </div>
  )
}

export default App

