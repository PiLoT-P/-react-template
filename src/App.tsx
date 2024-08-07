import { BrowserRouter as Router } from 'react-router-dom'
import { useRoutes } from './routes/useRoutes'
import { useAuthStore } from './lib/stores/Auth.store'

function App() {
  const { isAuthorized } = useAuthStore();

  const routes = useRoutes(isAuthorized);

  return (
    <Router>{routes}</Router>
  )
}

export default App
