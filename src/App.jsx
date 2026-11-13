import { useEffect } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import Header from './components/Header.jsx'
import ArrowCursor from './components/ArrowCursor.jsx'
import Main from './pages/Main.jsx'
import Diagnosis from './pages/Diagnosis.jsx'
import Result from './pages/Result.jsx'
import Product from './pages/Product.jsx'

// 페이지를 옮기면 맨 위에서 시작
function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

function App() {
  return (
    <div className="page">
      <ScrollToTop />
      {/* 전체 페이지 공통 화살표 커서 */}
      <ArrowCursor />
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/diagnosis" element={<Diagnosis />} />
        <Route path="/result" element={<Result />} />
        <Route path="/product" element={<Product />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  )
}

export default App
