// Web Audio API — each tab gets its own AudioContext.
// This is completely isolated: other tabs, other apps, system audio
// are never touched. Think of it as your tab's own tiny sound studio.

let audioCtx = null

// Create the AudioContext only after the user interacts with the page.
// Browsers block audio until then — this is a browser security rule.
function getCtx() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)()
  }
  // If the browser suspended it (e.g. tab was in background), wake it up
  if (audioCtx.state === 'suspended') {
    audioCtx.resume()
  }
  return audioCtx
}

// Plays a fun pitched "boing / pop" sound.
// Each key gets a random pitch so it feels musical and playful.
export function playPop() {
  const ctx = getCtx()
  const now = ctx.currentTime

  // --- Oscillator: generates the actual tone ---
  const osc = ctx.createOscillator()
  // --- Gain node: controls the volume over time ---
  const gain = ctx.createGain()

  // Wire them: oscillator → gain → speakers (destination)
  osc.connect(gain)
  gain.connect(ctx.destination)

  // Random base pitch between 300 Hz (low-ish) and 900 Hz (high)
  // 440 Hz = middle A on a piano, for reference
  const baseFreq = 300 + Math.random() * 600

  // The pitch bounces UP then trails off — classic "boing"
  osc.frequency.setValueAtTime(baseFreq, now)
  osc.frequency.exponentialRampToValueAtTime(baseFreq * 2, now + 0.06)  // shoot up
  osc.frequency.exponentialRampToValueAtTime(80, now + 0.35)            // fall off

  // 'sine' = smooth round sound (good for kids, not harsh)
  osc.type = 'sine'

  // Volume envelope: pop loud → fade to silence in 0.35 seconds
  gain.gain.setValueAtTime(0.35, now)
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35)

  osc.start(now)
  osc.stop(now + 0.35)  // automatically cleaned up after it finishes
}
