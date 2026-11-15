/**
 * Web Audio API based mechanical printer sound synthesizer.
 * Zero external audio files required. Generates tactile stepper motor clicks,
 * paper friction whirrs, and thermal feed hums.
 */

class PrinterAudio {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;

  private getContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  public playPrintSequence(durationSeconds = 2.2) {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;

      // 1. Paper sliding white-noise bandpassed buffer
      const bufferSize = ctx.sampleRate * Math.min(durationSeconds, 4);
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
      }

      const whiteNoise = ctx.createBufferSource();
      whiteNoise.buffer = buffer;

      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(1400, now);
      filter.Q.setValueAtTime(3, now);

      const noiseGain = ctx.createGain();
      noiseGain.gain.setValueAtTime(0.001, now);
      noiseGain.gain.exponentialRampToValueAtTime(0.035, now + 0.2);
      noiseGain.gain.setValueAtTime(0.035, now + durationSeconds - 0.3);
      noiseGain.gain.exponentialRampToValueAtTime(0.001, now + durationSeconds);

      whiteNoise.connect(filter);
      filter.connect(noiseGain);
      noiseGain.connect(ctx.destination);

      whiteNoise.start(now);
      whiteNoise.stop(now + durationSeconds);

      // 2. Periodic stepper motor clicks
      const clickCount = Math.floor(durationSeconds * 6);
      for (let i = 0; i < clickCount; i++) {
        const clickTime = now + 0.15 + (i * (durationSeconds - 0.4) / clickCount);
        const osc = ctx.createOscillator();
        const clickGain = ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(180 + Math.random() * 60, clickTime);
        osc.frequency.exponentialRampToValueAtTime(40, clickTime + 0.035);

        clickGain.gain.setValueAtTime(0.05, clickTime);
        clickGain.gain.exponentialRampToValueAtTime(0.001, clickTime + 0.035);

        osc.connect(clickGain);
        clickGain.connect(ctx.destination);

        osc.start(clickTime);
        osc.stop(clickTime + 0.04);
      }

      // 3. Final mechanical tear / paper cut "snip" click
      const snipTime = now + durationSeconds;
      const snipOsc = ctx.createOscillator();
      const snipGain = ctx.createGain();

      snipOsc.type = 'square';
      snipOsc.frequency.setValueAtTime(750, snipTime);
      snipOsc.frequency.exponentialRampToValueAtTime(120, snipTime + 0.06);

      snipGain.gain.setValueAtTime(0.06, snipTime);
      snipGain.gain.exponentialRampToValueAtTime(0.001, snipTime + 0.06);

      snipOsc.connect(snipGain);
      snipGain.connect(ctx.destination);

      snipOsc.start(snipTime);
      snipOsc.stop(snipTime + 0.07);

    } catch (err) {
      console.warn('Audio synthesis notice:', err);
    }
  }

  public playClick() {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(550, now);
      osc.frequency.exponentialRampToValueAtTime(200, now + 0.03);

      gain.gain.setValueAtTime(0.04, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.03);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.035);
    } catch {
      // Ignore audio context errors
    }
  }

  public playTearSound() {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const snipOsc = ctx.createOscillator();
      const snipGain = ctx.createGain();

      snipOsc.type = 'square';
      snipOsc.frequency.setValueAtTime(750, now);
      snipOsc.frequency.exponentialRampToValueAtTime(120, now + 0.06);

      snipGain.gain.setValueAtTime(0.06, now);
      snipGain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);

      snipOsc.connect(snipGain);
      snipGain.connect(ctx.destination);

      snipOsc.start(now);
      snipOsc.stop(now + 0.07);
    } catch {
      // Ignore audio context errors
    }
  }
}

export const printerAudio = new PrinterAudio();
