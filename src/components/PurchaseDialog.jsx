import './PurchaseDialog.css'

// PU-01 구매완료 팝업. 확인 버튼이나 바깥 어두운 영역을 누르면 닫힘
function PurchaseDialog({ onClose }) {
  return (
    <div className="pdialog-wrap">
      <button type="button" className="pdialog-overlay" aria-label="팝업 닫기" onClick={onClose} />
      <div className="pdialog rise" role="dialog" aria-modal="true" aria-labelledby="pu-title">
        <svg width="56" height="56" viewBox="0 0 56 56" aria-hidden="true">
          <circle cx="28" cy="28" r="27" fill="#D42A5E" />
          <path d="M17 28.5l7.5 7.5L39 21" stroke="#FFFFFF" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <h2 id="pu-title" className="pdialog-title">
          구매가 완료되었어요
        </h2>
        <p className="pdialog-text">실습용 가상 구매라 실제 결제와 배송은 진행되지 않아요.</p>
        <button type="button" className="btn btn-m btn-primary pdialog-close" onClick={onClose} autoFocus>
          확인
        </button>
      </div>
    </div>
  )
}

export default PurchaseDialog
