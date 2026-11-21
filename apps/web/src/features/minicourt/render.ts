import { COURT_L, COURT_R, FLOOR, H, NET_X, SWING_DUR, W } from "./engine";
import type { Athlete, MiniCourt } from "./engine";

export const COLORS = { lime: "#C8F135", coral: "#FF6B5E", gold: "#E6B84F", skin: "#F2C29B", ink: "#0B1220" };

interface Particle { x: number; y: number; vx: number; vy: number; life: number; max: number; size: number; color: string }
interface FloatText { x: number; y: number; text: string; color: string; life: number }

/* Visual effects live apart from game logic */
export class Fx {
  particles: Particle[] = [];
  texts: FloatText[] = [];
  trail: { x: number; y: number }[] = [];
  shake = 0;
  reduced = false;

  burst(x: number, y: number, color: string, n = 10, speed = 150) {
    const count = this.reduced ? Math.ceil(n / 3) : n;
    for (let i = 0; i < count; i++) {
      const a = Math.random() * Math.PI * 2;
      const s = speed * (0.35 + Math.random() * 0.65);
      this.particles.push({ x, y, vx: Math.cos(a) * s, vy: Math.sin(a) * s - 40, life: 0.5, max: 0.5, size: 1.5 + Math.random() * 2.5, color });
    }
  }
  text(text: string, x: number, y: number, color: string) {
    this.texts.push({ x, y, text, color, life: 0.9 });
  }
  kick(power: number) {
    if (!this.reduced) this.shake = Math.max(this.shake, power);
  }
  clear() {
    this.particles.length = 0;
    this.texts.length = 0;
    this.trail.length = 0;
    this.shake = 0;
  }
  update(dt: number) {
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.life -= dt;
      if (p.life <= 0) {
        this.particles.splice(i, 1);
        continue;
      }
      p.vy += 420 * dt;
      p.x += p.vx * dt;
      p.y += p.vy * dt;
    }
    for (let i = this.texts.length - 1; i >= 0; i--) {
      const t = this.texts[i];
      t.life -= dt;
      t.y -= 34 * dt;
      if (t.life <= 0) this.texts.splice(i, 1);
    }
    this.shake *= Math.pow(0.001, dt);
    if (this.shake < 0.2) this.shake = 0;
  }
}

export function resizeCanvas(canvas: HTMLCanvasElement) {
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const w = Math.max(canvas.clientWidth, 1);
  const pw = Math.round(w * dpr);
  const ph = Math.round((w * dpr * H) / W);
  if (canvas.width !== pw || canvas.height !== ph) {
    canvas.width = pw;
    canvas.height = ph;
  }
  return pw / W;
}

function drawBackground(ctx: CanvasRenderingContext2D, g: MiniCourt, time: number) {
  const sky = ctx.createLinearGradient(0, 0, 0, FLOOR);
  sky.addColorStop(0, "#080D16");
  sky.addColorStop(1, "#102038");
  ctx.fillStyle = sky;
  ctx.fillRect(-20, -20, W + 40, FLOOR + 20);

  for (const lx of [150, 650]) {
    const l = ctx.createRadialGradient(lx, 0, 10, lx, 0, 340);
    l.addColorStop(0, "rgba(200,241,53,0.13)");
    l.addColorStop(1, "rgba(200,241,53,0)");
    ctx.fillStyle = l;
    ctx.fillRect(0, 0, W, FLOOR);
  }

  ctx.fillStyle = "rgba(255,255,255,0.035)";
  ctx.font = "800 54px Inter, system-ui, sans-serif";
  ctx.textAlign = "center";
  ctx.fillText("GELAVU", W / 2, 96);

  /* crowd: more excited in long rallies */
  const hype = g.rally > 6 ? 1 : 0.35;
  for (let i = 0; i < 44; i++) {
    const x = 18 + i * 18.2;
    const row = i % 2;
    const bob = Math.sin(time * 3.2 + i * 1.7) * 2.4 * hype;
    const y = 170 + row * 16 - bob;
    ctx.fillStyle = i % 5 === 0 ? "rgba(200,241,53,0.16)" : "rgba(255,255,255,0.09)";
    ctx.beginPath();
    ctx.arc(x, y, 6.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillRect(x - 8, y + 7, 16, 14);
  }
}

function drawFloor(ctx: CanvasRenderingContext2D) {
  const f = ctx.createLinearGradient(0, FLOOR, 0, H);
  f.addColorStop(0, "#1A2C47");
  f.addColorStop(1, "#0C1829");
  ctx.fillStyle = f;
  ctx.fillRect(-20, FLOOR, W + 40, H - FLOOR + 20);
  ctx.fillStyle = "rgba(255,255,255,0.14)";
  ctx.fillRect(-20, FLOOR, W + 40, 2);
  ctx.strokeStyle = "rgba(255,255,255,0.28)";
  ctx.lineWidth = 2;
  for (const x of [COURT_L, COURT_R, NET_X - 140, NET_X + 140, NET_X - 330, NET_X + 330]) {
    ctx.beginPath();
    ctx.moveTo(x, FLOOR + 2);
    ctx.lineTo(x, H);
    ctx.stroke();
  }
}

function drawNet(ctx: CanvasRenderingContext2D, g: MiniCourt) {
  const top = g.netTop;
  ctx.fillStyle = "#E2E8F0";
  ctx.fillRect(NET_X - 3, top - 6, 6, FLOOR - top + 6);
  ctx.strokeStyle = "rgba(255,255,255,0.22)";
  ctx.lineWidth = 1;
  for (let y = top + 6; y < FLOOR; y += 8) {
    ctx.beginPath();
    ctx.moveTo(NET_X - 16, y);
    ctx.lineTo(NET_X + 16, y);
    ctx.stroke();
  }
  for (let x = NET_X - 16; x <= NET_X + 16; x += 8) {
    ctx.beginPath();
    ctx.moveTo(x, top);
    ctx.lineTo(x, FLOOR);
    ctx.stroke();
  }
  ctx.fillStyle = COLORS.lime;
  ctx.fillRect(NET_X - 18, top - 3, 36, 5);
}

function drawAthlete(ctx: CanvasRenderingContext2D, a: Athlete, g: MiniCourt, color: string, glow: boolean) {
  const p = a.swing >= 0 ? Math.min(a.swing / SWING_DUR, 1) : 0;
  const lift = a.swing >= 0 ? a.jumpMax * Math.sin(Math.PI * p) : 0;

  ctx.fillStyle = "rgba(0,0,0,0.38)";
  ctx.beginPath();
  ctx.ellipse(a.x, FLOOR + 9, 22 - lift * 0.12, 5, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.save();
  ctx.translate(a.x, FLOOR - lift);
  ctx.scale(a.dir, 1);
  ctx.lineCap = "round";

  const stride = a.moving > 0.4 ? Math.sin(a.run) * 11 : 0;
  ctx.strokeStyle = COLORS.skin;
  ctx.lineWidth = 6;
  ctx.beginPath();
  ctx.moveTo(-3, -30);
  ctx.lineTo(-3 - stride, -2);
  ctx.moveTo(4, -30);
  ctx.lineTo(4 + stride, -2);
  ctx.stroke();
  ctx.fillStyle = "#FFFFFF";
  ctx.fillRect(-9 - stride, -5, 12, 5);
  ctx.fillRect(-2 + stride, -5, 12, 5);

  ctx.fillStyle = "#101828";
  ctx.beginPath();
  ctx.roundRect(-10, -38, 20, 14, 3);
  ctx.fill();
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.roundRect(-11, -64, 22, 30, 7);
  ctx.fill();
  ctx.fillStyle = "rgba(255,255,255,0.85)";
  ctx.fillRect(-2, -62, 4, 24);

  ctx.fillStyle = COLORS.skin;
  ctx.beginPath();
  ctx.arc(1, -75, 9, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "#1E293B";
  ctx.beginPath();
  ctx.arc(1, -77, 9.5, Math.PI, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = color;
  ctx.fillRect(-8, -79, 18, 4);

  /* racket swing: the head passes the logical hit point (28, -66) at the moment of contact */
  const phi = a.swing >= 0 ? -0.245 + (p - 0.55) * 3.8 : -0.5 + Math.sin(g.now * 3) * 0.05;
  const px = -1;
  const py = -60;
  const R = 29;
  const hx = px + R * Math.cos(phi);
  const hy = py + R * Math.sin(phi);
  ctx.strokeStyle = COLORS.skin;
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.moveTo(px, py);
  ctx.lineTo(px + R * 0.45 * Math.cos(phi), py + R * 0.45 * Math.sin(phi));
  ctx.stroke();
  ctx.strokeStyle = "#FFFFFF";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(px + R * 0.45 * Math.cos(phi), py + R * 0.45 * Math.sin(phi));
  ctx.lineTo(hx, hy);
  ctx.stroke();
  ctx.save();
  ctx.translate(hx + 5 * Math.cos(phi), hy + 5 * Math.sin(phi));
  ctx.rotate(phi + Math.PI / 2);
  ctx.strokeStyle = glow ? COLORS.gold : color;
  ctx.lineWidth = 2.5;
  if (glow) {
    ctx.shadowColor = COLORS.gold;
    ctx.shadowBlur = 14;
  }
  ctx.beginPath();
  ctx.ellipse(0, -9, 8, 12, 0, 0, Math.PI * 2);
  ctx.stroke();
  ctx.shadowBlur = 0;
  ctx.strokeStyle = "rgba(255,255,255,0.4)";
  ctx.lineWidth = 0.8;
  ctx.beginPath();
  ctx.moveTo(-6, -9);
  ctx.lineTo(6, -9);
  ctx.moveTo(0, -20);
  ctx.lineTo(0, 2);
  ctx.stroke();
  ctx.restore();
  ctx.restore();
}

function drawShuttle(ctx: CanvasRenderingContext2D, g: MiniCourt, fx: Fx) {
  const s = g.shuttle;
  if (fx.trail.length > 1) {
    for (let i = 1; i < fx.trail.length; i++) {
      ctx.strokeStyle = `rgba(200,241,53,${(i / fx.trail.length) * 0.4})`;
      ctx.lineWidth = 1 + (i / fx.trail.length) * 3;
      ctx.beginPath();
      ctx.moveTo(fx.trail[i - 1].x, fx.trail[i - 1].y);
      ctx.lineTo(fx.trail[i].x, fx.trail[i].y);
      ctx.stroke();
    }
  }
  ctx.fillStyle = "rgba(0,0,0,0.3)";
  ctx.beginPath();
  ctx.ellipse(s.x, FLOOR + 9, 8, 2.4, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.save();
  ctx.translate(s.x, s.y);
  ctx.rotate(s.angle);
  ctx.fillStyle = "rgba(255,255,255,0.96)";
  ctx.beginPath();
  ctx.moveTo(-3, -2.5);
  ctx.lineTo(-19, -10);
  ctx.lineTo(-19, 10);
  ctx.lineTo(-3, 2.5);
  ctx.closePath();
  ctx.fill();
  ctx.strokeStyle = "rgba(0,0,0,0.25)";
  ctx.lineWidth = 0.8;
  for (const k of [-6, -2, 2, 6]) {
    ctx.beginPath();
    ctx.moveTo(-3, k * 0.35);
    ctx.lineTo(-19, k * 1.5);
    ctx.stroke();
  }
  ctx.fillStyle = COLORS.gold;
  ctx.beginPath();
  ctx.arc(0, 0, 4.6, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

export function drawScene(ctx: CanvasRenderingContext2D, g: MiniCourt, fx: Fx, time: number, scale: number) {
  ctx.setTransform(scale, 0, 0, scale, 0, 0);
  ctx.clearRect(0, 0, W, H);
  ctx.save();
  if (fx.shake > 0) ctx.translate((Math.random() - 0.5) * fx.shake, (Math.random() - 0.5) * fx.shake);

  drawBackground(ctx, g, time);
  drawFloor(ctx);
  drawNet(ctx, g);
  drawAthlete(ctx, g.bot, g, COLORS.coral, false);
  drawAthlete(ctx, g.player, g, COLORS.lime, g.meter >= 100);
  drawShuttle(ctx, g, fx);

  for (const p of fx.particles) {
    ctx.globalAlpha = Math.max(p.life / p.max, 0);
    ctx.fillStyle = p.color;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.textAlign = "center";
  ctx.font = "800 20px Inter, system-ui, sans-serif";
  for (const t of fx.texts) {
    ctx.globalAlpha = Math.min(t.life / 0.5, 1);
    ctx.fillStyle = t.color;
    ctx.fillText(t.text, t.x, t.y);
  }
  ctx.globalAlpha = 1;
  ctx.restore();
}
