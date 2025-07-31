import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import './App.css'
import LandingPage from './pages/LandingPage'
import LearnPage from './pages/LearnPage'
import InvestmentCalculator from './pages/InvestmentCalculator'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

// Component to scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}

function App() {
  return (
    <Router>
      <div className="App">
        <ScrollToTop />
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/learn" element={<LearnPage />} />
            <Route path="/calculator" element={<InvestmentCalculator />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App
