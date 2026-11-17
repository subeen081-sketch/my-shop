import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'

// 터치 기기(특히 iOS Safari)에서 누르는 순간 :active(살짝 눌린 모양)가 보이게 함. 마우스 동작에는 영향 없음
document.addEventListener('touchstart', () => {}, { passive: true })

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* vite.config.js의 base(/my-shop/) 아래에서 주소를 맞춤 */}
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
