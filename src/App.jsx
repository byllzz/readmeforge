
import Home from './Home'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LandingPage from './components/pages/LandingPage'
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path='/' element={<LandingPage />}></Route>
          <Route path="/app" element={<Home />} />
        </Routes>
      </BrowserRouter>

  )
}

