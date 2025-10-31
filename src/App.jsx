import MyObservations from './pages/MyObservations'
import CreateObservation from './pages/CreateObservation'

function App() {
  const path = typeof window !== 'undefined' ? window.location.pathname : '/'
  const isCreate = path === '/create-observation'
  return (
    <div>
      {isCreate ? <CreateObservation /> : <MyObservations />}
    </div>
  )
}

export default App

