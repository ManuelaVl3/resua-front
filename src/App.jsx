import MyObservations from './pages/MyObservations'
import CreateObservation from './pages/CreateObservation'
import ObservationDetail from './pages/ObservationDetail'
import EditObservation from './pages/EditObservation'
import SearchObservations from './pages/SearchObservations'

function App() {
  const path = typeof window !== 'undefined' ? window.location.pathname : '/'
  const isCreate = path === '/create-observation'
  const isDetail = path === '/observation-detail'
  const isEdit = path === '/edit-observation'
  const isMy = path === '/my-observations'
  const isSearch = path === '/search-observation'

  if (typeof window !== 'undefined') {
    // Redirige raíz a my-observations
    if (path === '/') {
      window.history.replaceState(null, '', '/my-observations')
    } else if (!isCreate && !isDetail && !isEdit && !isMy && !isSearch) {
      // Normaliza rutas desconocidas a my-observations
      window.history.replaceState(null, '', '/my-observations')
    }
  }
  return (
    <div>
      {isCreate ? (
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

