import './Toast.css'

// 화면 아래 가운데에 잠깐 뜨는 안내 문구. 화면 읽기 프로그램에도 읽힘
function Toast({ message }) {
  return (
    <div className="toast-region" role="status" aria-live="polite">
      {message && (
        <div key={message} className="toast">
          {message}
        </div>
      )}
    </div>
  )
}

export default Toast
