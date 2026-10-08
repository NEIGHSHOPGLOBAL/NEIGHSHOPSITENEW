const PALETTES = [
  ['#2F5D3A', '#1E7A46'],
  ['#3F3F40', '#111111'],
  ['#2B6CB0', '#1a4971'],
  ['#A0A593', '#6B6B66'],
  ['#B7791F', '#8a5a14'],
  ['#C23B3B', '#8a2929'],
]

function hash(str) {
  let h = 0
  for (let i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) >>> 0
  return h
}

export function gradientFor(seed) {
  const [a, b] = PALETTES[hash(seed) % PALETTES.length]
  const angle = (hash(seed) % 360)
  return `linear-gradient(${angle}deg, ${a}, ${b})`
}
