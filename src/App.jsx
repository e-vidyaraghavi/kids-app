import { useState, useEffect, useCallback } from 'react'
import FireworksCanvas from './components/FireworksCanvas'
import LetterDisplay from './components/LetterDisplay'
import { playPop } from './sounds'
import './App.css'

export default function App() { 
  // letters = array of all typed characters shown on screen
  const [letters, setLetters] = useState([])
  // trigger = object {id, x?, y?} — id changes each event; x/y optional tap coords
  const [trigger, setTrigger] = useState({ id: 0 })

  const fire = useCallback((x, y) => {
    playPop()
    setTrigger(prev => ({ id: prev.id + 1, x, y }))
  }, [])

  const handleKeyDown = useCallback((e) => {
    // Prevent browser shortcuts (F5 = reload, F11 = fullscreen, etc.)
    // from doing their default browser action while the app is focused
    if (e.key.startsWith('F') && e.key.length <= 3) e.preventDefault()

    // Every key (letters, numbers, space, F-keys, arrows, Enter…)
    // triggers a firework burst and a sound
    const isModifierOnly = ['Control', 'Alt', 'Meta', 'Shift',
                            'CapsLock', 'NumLock', 'ScrollLock'].includes(e.key)
    if (!isModifierOnly) {
      fire()
    }

    // Only A–Z (upper or lower) get shown on screen
    if (/^[a-zA-Z]$/.test(e.key)) {
      setLetters(prev => [...prev, e.key.toUpperCase()])
    }

    // Backspace removes the last displayed letter
    if (e.key === 'Backspace') {
      setLetters(prev => prev.slice(0, -1))
    }
  }, [fire])

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])

  // Tap / click anywhere: fire at the tap position (mobile + desktop).
  // Ignore taps on interactive UI onPointerDown={handlePointerDown}>
      {/* Layer 1: Fireworks (behind everything) */}
      <FireworksCanvas trigger={trigger} />

      {/* Layer 2: Typed letters (in front of fireworks) */}
      <LetterDisplay letters={letters} />

      {/* Layer 3: UI controls (on top) */}
      <div className="ui-overlay">
        {letters.length === 0 && (
          <div className="hint">
            <p>⌨️ Start typing or tap!</p>
            <p className="hint-sub">Every key & tapng) */}
      <FireworksCanvas trigger={trigger} />

      {/* Layer 2: Typed letters (in front of fireworks) */}
      <LetterDisplay letters={letters} />

      {/* Layer 3: UI controls (on top) */}
      <div className="ui-overlay">
        {letters.length === 0 && (
          <div className="hint">
            <p>⌨️ Start typing!</p>
            <p className="hint-sub">Every key makes fireworks & sounds! 🎆🔊</p>
          </div>
        )}
        {letters.length > 0 && (
          <button className="clear-btn" onClick={handleClear}>
            🗑️ Clear
          </button>
        )}
      </div>
    </div>
  )
}
