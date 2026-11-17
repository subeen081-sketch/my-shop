// 저장하기: 진단 결과를 1080×1350(4:5) 이미지로 그려 내려받음. 회원 기능·서버 없이 브라우저에서만 처리
// 구성: 로고 → 결과 이미지 → '나의 립 컬러 결과' → 톤 제목 → 설명 → 추천 립 3개

const W = 1080
const H = 1350
const FONT = '"IBM Plex Sans KR", "Apple SD Gothic Neo", "Malgun Gothic", sans-serif'
const C = {
  pageTop: '#FFEEF3',
  pageMid: '#FFF7F9',
  surface: '#FFFFFF',
  ink: '#2A2027',
  muted: '#6F5A65',
  rose: '#D42A5E',
  rose600: '#BC2152',
  line: '#F6E4EA',
}

const loadImage = (src) =>
  new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve(img)
    img.onerror = reject
    img.src = src
  })

const roundRect = (g, x, y, w, h, r) => {
  g.beginPath()
  g.roundRect(x, y, w, h, r)
}

// 이미지를 상자에 꽉 차게(cover) 잘라 그림
function drawCover(g, img, x, y, w, h, r) {
  const scale = Math.max(w / img.naturalWidth, h / img.naturalHeight)
  const sw = w / scale
  const sh = h / scale
  const sx = (img.naturalWidth - sw) / 2
  const sy = (img.naturalHeight - sh) / 2
  g.save()
  roundRect(g, x, y, w, h, r)
  g.clip()
  g.drawImage(img, sx, sy, sw, sh, x, y, w, h)
  g.restore()
}

// 한글은 단어 단위로 줄바꿈 (화면의 word-break: keep-all과 같게)
function wrapLines(g, text, maxWidth) {
  const lines = []
  let line = ''
  for (const word of text.split(' ')) {
    const next = line ? `${line} ${word}` : word
    if (g.measureText(next).width > maxWidth && line) {
      lines.push(line)
      line = word
    } else {
      line = next
    }
  }
  if (line) lines.push(line)
  return lines
}

// 한 줄에 안 들어가면 끝을 …로 줄임
function fitOneLine(g, text, maxWidth) {
  if (g.measureText(text).width <= maxWidth) return text
  let t = text
  while (t.length > 1 && g.measureText(`${t}…`).width > maxWidth) t = t.slice(0, -1)
  return `${t}…`
}

async function drawResult({ tone, headerImage, products, logoImage }) {
  // 글꼴이 다 불러와진 뒤에 그려야 기본 글꼴로 그려지지 않음
  await Promise.all(['400', '500', '600', '700'].map((w) => document.fonts?.load(`${w} 32px "IBM Plex Sans KR"`)))
  const [header, logo, ...thumbs] = await Promise.all([
    loadImage(headerImage),
    loadImage(logoImage),
    ...products.map((p) => loadImage(p.image)),
  ])

  const canvas = document.createElement('canvas')
  canvas.width = W
  canvas.height = H
  const g = canvas.getContext('2d')

  // 바탕: 사이트와 같은 블러시 → 흰색 그라데이션
  const bg = g.createLinearGradient(0, 0, 0, H)
  bg.addColorStop(0, C.pageTop)
  bg.addColorStop(0.38, C.pageMid)
  bg.addColorStop(1, C.surface)
  g.fillStyle = bg
  g.fillRect(0, 0, W, H)

  // 로고 (헤더와 같은 구성: logo.jpg의 로즈 마크 + LipFit + 립핏)
  const mark = 52
  g.save()
  roundRect(g, 90, 56, mark, mark, 16)
  g.clip()
  // logo.jpg(1376×768)에서 로즈 사각형 부분(약 480~897, 175~592)만 잘라 그림
  g.drawImage(logo, 480, 175, 417, 417, 90, 56, mark, mark)
  g.restore()
  g.textBaseline = 'middle'
  g.fillStyle = C.ink
  g.font = `700 40px ${FONT}`
  g.fillText('LipFit', 160, 83)
  const lipFitW = g.measureText('LipFit').width
  g.fillStyle = C.muted
  g.font = `500 28px ${FONT}`
  g.fillText('립핏', 160 + lipFitW + 14, 85)

  // 결과 이미지
  drawCover(g, header, 90, 140, 900, 480, 36)

  // 결과 문구
  g.textAlign = 'center'
  g.textBaseline = 'alphabetic'
  g.fillStyle = C.rose600
  g.font = `600 28px ${FONT}`
  g.fillText('나의 립 컬러 결과', W / 2, 690)
  g.fillStyle = C.ink
  g.font = `700 60px ${FONT}`
  g.fillText(tone.title, W / 2, 770)
  g.fillStyle = C.muted
  g.font = `400 28px ${FONT}`
  wrapLines(g, tone.desc, 860)
    .slice(0, 3)
    .forEach((line, i) => g.fillText(line, W / 2, 828 + i * 44))

  // 추천 립 3개
  g.fillStyle = C.ink
  g.font = `600 28px ${FONT}`
  g.fillText('나에게 어울리는 추천 립', W / 2, 1000)
  const size = 250
  const gap = (900 - size * 3) / 2
  thumbs.forEach((img, i) => {
    const x = 90 + i * (size + gap)
    drawCover(g, img, x, 1030, size, size, 24)
    g.fillStyle = C.ink
    g.font = `500 24px ${FONT}`
    // 상품명에서 제형 이름을 빼고 색 이름만 (예: 벨벳 매트 립스틱 코랄 로즈 → 코랄 로즈)
    const shade = products[i].name.replace(/^(벨벳 매트 립스틱|샤인 글로스) /, '')
    g.fillText(fitOneLine(g, shade, size), x + size / 2, 1318)
  })

  return canvas
}

export async function downloadResultImage({ tone, toneKey, headerImage, products, logoImage }) {
  const canvas = await drawResult({ tone, headerImage, products, logoImage })
  const blob = await new Promise((resolve) => canvas.toBlob(resolve, 'image/png'))
  if (!blob) throw new Error('이미지를 만들지 못했어요')
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `lipfit-result-${toneKey}.png`
  document.body.appendChild(a)
  a.click()
  a.remove()
  setTimeout(() => URL.revokeObjectURL(url), 1000)
}
