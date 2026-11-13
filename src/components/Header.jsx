import { Link } from 'react-router-dom'
import logo from '../assets/logo.jpg'
import './Header.css'

// MN-01 공통 헤더: 로고만 있음, 누르면 P01 메인
function Header() {
  return (
    <header className="header">
      <div className="header-inner">
        <Link to="/" className="header-logo" aria-label="립핏 메인으로">
          <span className="header-mark" aria-hidden="true">
            <img src={logo} alt="" />
          </span>
          <span className="header-wordmark">LipFit</span>
          <span className="header-sub">립핏</span>
        </Link>
      </div>
    </header>
  )
}

export default Header
