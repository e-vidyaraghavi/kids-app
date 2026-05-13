const COLORS = [
  '#FF4444', '#FF8800', '#FFDD00', '#44FF44',
  '#44AAFF', '#AA44FF', '#FF44AA', '#FF6666',
  '#00FFCC', '#FFB347',
]

export default function LetterDisplay({ letters }) {
  if (letters.length === 0) return null

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 1,              // in front of canvas
        display: 'flex',
        flexWrap: 'wrap',
        alignContent: 'flex-start',
        padding: '20px',
        gap: '8px',
        pointerEvents: 'none', // clicks pass through to the page
        overflow: 'hidden',
      }}
    >
      {letters.map((letter, i) => (
        <span
          key={i}
          style={{
            fontSize: '5rem',
            fontWeight: '900',
            fontFamily: "'Comic Sans MS', 'Chalkboard SE', cursive",
            color: COLORS[i % COLORS.length],
            textShadow: `0 0 20px ${COLORS[i % COLORS.length]}, 0 4px 8px rgba(0,0,0,0.8)`,
            lineHeight: 1,
            animation: 'popIn 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
            display: 'inline-block',
          }}
        >
          {letter === ' ' ? '\u00A0' : letter}
        </span>
      ))}
    </div>
  )
}
