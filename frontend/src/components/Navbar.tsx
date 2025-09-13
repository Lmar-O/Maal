import Link from 'next/link'
import { useRouter } from 'next/router'
import { BookOpen, Calculator, Home, Menu, X } from 'lucide-react'
import { useState, useEffect } from 'react'

const Navbar = () => {
  const router = useRouter()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  const isActive = (path: string) => router.pathname === path
  const isLandingPage = router.pathname === '/'

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const isScrollingDown = scrollTop > lastScrollY
      const isAtTop = scrollTop <= 50
      
      // Prevent scrolling above the top of the page
      if (scrollTop < 0) {
        window.scrollTo(0, 0)
        return
      }
      
      setIsScrolled(scrollTop > 50)
      
      // Show navbar when at top, or when scrolling up, hide when scrolling down
      if (isAtTop) {
        setIsVisible(true)
      } else if (isScrollingDown && scrollTop > 200) {
        setIsVisible(false)
      } else if (!isScrollingDown) {
        setIsVisible(true)
      }
      
      setLastScrollY(scrollTop)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''} ${!isLandingPage ? 'non-landing' : ''} ${isVisible ? 'visible' : 'hidden'}`}>
      <div className="container">
        <div className="nav-content">
          <Link href="/" className="nav-logo" onClick={closeMenu}>
            <span className="logo-text" style={{ fontWeight: 600, letterSpacing: '0.01em', fontFamily: "'Poppins', 'Inter', sans-serif" }}>maal</span>
          </Link>
          
          {/* Desktop Navigation - Centered */}
          <div className="nav-links desktop-nav centered-nav">
            <Link 
              href="/" 
              className={`nav-link ${isActive('/') ? 'active' : ''}`}
              onClick={closeMenu}
            >
              <Home size={20} />
              <span>Home</span>
            </Link>
            
            <Link 
              href="/learn" 
              className={`nav-link ${isActive('/learn') ? 'active' : ''}`}
              onClick={closeMenu}
            >
              <BookOpen size={20} />
              <span>Learn</span>
            </Link>
            
            <Link 
              href="/calculator" 
              className={`nav-link ${isActive('/calculator') ? 'active' : ''}`}
              onClick={closeMenu}
            >
              <Calculator size={20} />
              <span>Calculator</span>
            </Link>
          </div>

          {/* Spacer for balanced layout */}
          <div className="nav-spacer desktop-only"></div>

          {/* Mobile Menu Button */}
          <button className="mobile-menu-btn" onClick={toggleMenu}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <div className={`mobile-nav ${isMenuOpen ? 'open' : ''}`}>
          <Link 
            href="/" 
            className={`mobile-nav-link ${isActive('/') ? 'active' : ''}`}
            onClick={closeMenu}
          >
            <Home size={20} />
            <span>Home</span>
          </Link>
          
          <Link 
            href="/learn" 
            className={`mobile-nav-link ${isActive('/learn') ? 'active' : ''}`}
            onClick={closeMenu}
          >
            <BookOpen size={20} />
            <span>Learn</span>
          </Link>
          
          <Link 
            href="/calculator" 
            className={`mobile-nav-link ${isActive('/calculator') ? 'active' : ''}`}
            onClick={closeMenu}
          >
            <Calculator size={20} />
            <span>Calculator</span>
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
