// 공유하기: 회원 기능 없이 링크로 공유
// - 터치 기기(휴대폰·태블릿): 기기의 공유창(navigator.share)
// - 마우스 기기(데스크톱)나 공유창이 없는 브라우저: 링크를 클립보드에 복사
// 결과: 'shared' | 'copied' | 'cancelled' | 'failed'

const isTouchDevice = () => window.matchMedia?.('(hover: none) and (pointer: coarse)').matches

async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch {
    // 클립보드 API를 못 쓰는 환경(보안 연결이 아닌 주소 등)을 위한 예전 방식
    const area = document.createElement('textarea')
    area.value = text
    area.setAttribute('readonly', '')
    area.style.cssText = 'position:fixed;top:0;left:0;opacity:0'
    document.body.appendChild(area)
    area.select()
    let ok = false
    try {
      ok = document.execCommand('copy')
    } catch {
      ok = false
    }
    area.remove()
    return ok
  }
}

export async function shareLink({ title, text, url = window.location.href }) {
  if (isTouchDevice() && navigator.share) {
    try {
      await navigator.share({ title, text, url })
      return 'shared'
    } catch (err) {
      if (err?.name === 'AbortError') return 'cancelled' // 사용자가 공유창을 닫음
      // 그 밖의 실패는 링크 복사로 넘어감
    }
  }
  return (await copyText(url)) ? 'copied' : 'failed'
}

// 공유 결과에 맞는 안내 문구 (없으면 안내하지 않음)
export const shareMessage = (result) =>
  ({ copied: '링크를 복사했어요', failed: '링크를 복사하지 못했어요. 주소창의 주소를 직접 복사해 주세요' })[result] ?? null
