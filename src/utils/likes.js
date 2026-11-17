// 찜: 회원 기능 없이 이 브라우저에만 저장 (다른 기기와는 공유되지 않음)
// 사생활 보호 모드 등에서 저장소를 못 쓰면 저장 없이 화면에서만 켜고 끔
const KEY = 'lipfit:liked'

export function loadLikes() {
  try {
    const parsed = JSON.parse(localStorage.getItem(KEY) ?? '{}')
    return parsed && typeof parsed === 'object' ? parsed : {}
  } catch {
    return {}
  }
}

export function saveLikes(likes) {
  try {
    // 꺼진 하트는 지워서 저장 크기를 작게 유지
    const onlyLiked = Object.fromEntries(Object.entries(likes).filter(([, on]) => on))
    localStorage.setItem(KEY, JSON.stringify(onlyLiked))
  } catch {
    // 저장 실패는 무시 (화면의 하트 상태는 그대로)
  }
}
