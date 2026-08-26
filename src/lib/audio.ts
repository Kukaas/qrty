/**
 * Web Audio API synthesizer for serene Zen garden sound effects.
 * 100% synthesized in-browser, no external audio files required.
 */

class SoundController {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private ambientTimer: number | null = null;

  constructor() {
    // Initialized on first user interaction to comply with browser autoplay policies
  }

  private init() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
    if (muted && this.ambientTimer) {
      clearInterval(this.ambientTimer);
      this.ambientTimer = null;
    }
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  /**
   * Crisp organic wooden tap sound (wood block / bonsai garden tile tap)
   */
  public playWoodClick() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(420, t);
    osc.frequency.exponentialRampToValueAtTime(140, t + 0.06);

    gain.gain.setValueAtTime(0.2, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.06);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(t);
    osc.stop(t + 0.07);
  }

  /**
   * Gentle airy whoosh with serene bell tone when transitioning between 3D and 2D
   */
  public playTransitionSwoosh(isTo3D: boolean) {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    
    // Wind whoosh noise buffer
    const bufferSize = this.ctx.sampleRate * 0.4;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }

    const whiteNoise = this.ctx.createBufferSource();
    whiteNoise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.Q.setValueAtTime(3.0, t);

    if (isTo3D) {
      filter.frequency.setValueAtTime(350, t);
      filter.frequency.exponentialRampToValueAtTime(1200, t + 0.35);
    } else {
      filter.frequency.setValueAtTime(1100, t);
      filter.frequency.exponentialRampToValueAtTime(320, t + 0.35);
    }

    const noiseGain = this.ctx.createGain();
    noiseGain.gain.setValueAtTime(0.01, t);
    noiseGain.gain.linearRampToValueAtTime(0.07, t + 0.15);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, t + 0.38);

    whiteNoise.connect(filter);
    filter.connect(noiseGain);
    noiseGain.connect(this.ctx.destination);

    whiteNoise.start(t);
    whiteNoise.stop(t + 0.4);

    // Chime overtone
    const osc = this.ctx.createOscillator();
    const chimeGain = this.ctx.createGain();
    osc.type = 'sine';
    const baseFreq = isTo3D ? 880 : 587.33; // A5 or D5
    osc.frequency.setValueAtTime(baseFreq, t);

    chimeGain.gain.setValueAtTime(0.04, t);
    chimeGain.gain.exponentialRampToValueAtTime(0.0001, t + 0.5);

    osc.connect(chimeGain);
    chimeGain.connect(this.ctx.destination);

    osc.start(t);
    osc.stop(t + 0.5);
  }

  /**
   * Serene melodic chime chord (Japanese pentatonic scale: D, F, G, A, C)
   */
  public playSeasonChime(index: number = 0) {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    // Japanese Hirajoshi / Insen pentatonic frequencies
    const notes = [
      [587.33, 880, 1174.66], // Spring (D5, A5, D6)
      [659.25, 987.77, 1318.51], // Summer (E5, B5, E6)
      [523.25, 783.99, 1046.50], // Autumn (C5, G5, C6)
      [440.00, 659.25, 880.00], // Winter (A4, E5, A5)
    ];

    const chord = notes[index % notes.length];
    const t = this.ctx.currentTime;

    chord.forEach((freq, i) => {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, t + i * 0.05);

      gain.gain.setValueAtTime(0.001, t + i * 0.05);
      gain.gain.linearRampToValueAtTime(0.05 / (i + 1), t + i * 0.05 + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + i * 0.05 + 0.8);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(t + i * 0.05);
      osc.stop(t + i * 0.05 + 0.85);
    });
  }

  /**
   * Soft celebratory harp twinkle for export
   */
  public playExportSound() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    const arpeggio = [523.25, 659.25, 783.99, 1046.5, 1318.51]; // C major pentatonic

    arpeggio.forEach((freq, i) => {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, t + i * 0.06);

      gain.gain.setValueAtTime(0.04, t + i * 0.06);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + i * 0.06 + 0.6);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(t + i * 0.06);
      osc.stop(t + i * 0.06 + 0.65);
    });
  }
}

export const sound = new SoundController();
