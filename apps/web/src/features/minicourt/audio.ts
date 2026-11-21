export type SfxName = "hit" | "perfect" | "smash" | "power" | "ready" | "point" | "lose" | "net" | "win";

/* One shared AudioContext, created on the first user gesture. Sound is off by default. */
export class Sfx {
  enabled = false;
  private ctx: AudioContext | null = null;

  unlock() {
    if (!this.ctx) {
      const C = window.AudioContext || (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (!C) return;
      this.ctx = new C();
    }
    if (this.ctx.state === "suspended") void this.ctx.resume();
  }

  private tone(freq: number, to: number, dur: number, vol: number, type: OscillatorType = "sine", delay = 0) {
    const c = this.ctx;
    if (!c) return;
    const t = c.currentTime + delay;
    const o = c.createOscillator();
    const g = c.createGain();
    o.type = type;
    o.frequency.setValueAtTime(freq, t);
    o.frequency.exponentialRampToValueAtTime(Math.max(to, 20), t + dur);
    g.gain.setValueAtTime(vol, t);
    g.gain.exponentialRampToValueAtTime(0.001, t + dur);
    o.connect(g).connect(c.destination);
    o.start(t);
    o.stop(t + dur + 0.02);
  }

  private snap(dur: number, freq: number, vol: number) {
    const c = this.ctx;
    if (!c) return;
    const len = Math.floor(c.sampleRate * dur);
    const buf = c.createBuffer(1, len, c.sampleRate);
    const d = buf.getChannelData(0);
    for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * (1 - i / len);
    const src = c.createBufferSource();
    src.buffer = buf;
    const f = c.createBiquadFilter();
    f.type = "bandpass";
    f.frequency.value = freq;
    const g = c.createGain();
    g.gain.value = vol;
    src.connect(f).connect(g).connect(c.destination);
    src.start();
  }

  play(name: SfxName) {
    if (!this.enabled || !this.ctx) return;
    switch (name) {
      case "hit":
        this.snap(0.05, 2200, 0.35);
        this.tone(520, 200, 0.06, 0.12);
        break;
      case "perfect":
        this.snap(0.06, 3000, 0.45);
        this.tone(880, 1320, 0.12, 0.14, "triangle");
        break;
      case "smash":
        this.snap(0.09, 1400, 0.6);
        this.tone(300, 60, 0.18, 0.3, "triangle");
        break;
      case "power":
        this.snap(0.14, 900, 0.7);
        this.tone(500, 50, 0.3, 0.35, "sawtooth");
        break;
      case "ready":
        [520, 660, 880].forEach((f, i) => this.tone(f, f * 1.01, 0.12, 0.12, "triangle", i * 0.07));
        break;
      case "point":
        this.tone(520, 520, 0.1, 0.15, "triangle");
        this.tone(780, 780, 0.18, 0.15, "triangle", 0.09);
        break;
      case "lose":
        this.tone(330, 220, 0.25, 0.14, "triangle");
        break;
      case "net":
        this.snap(0.08, 500, 0.25);
        break;
      case "win":
        [523, 659, 784, 1046].forEach((f, i) => this.tone(f, f, 0.22, 0.14, "triangle", i * 0.09));
        break;
    }
  }
}
