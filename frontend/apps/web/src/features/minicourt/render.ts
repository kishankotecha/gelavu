import { COURT_L, COURT_R, FLOOR, H, NET_X, SWING_DUR, W } from "./engine";
import type { Athlete, MiniCourt } from "./engine";

export const COLORS = {
  lime: "#C8F135",
  coral: "#FF6B5E",
  gold: "#FF685B",
  ink: "#14212D",
  courtGreen: "#155E4E",
  courtLine: "rgba(255, 255, 255, 0.92)",
  netTape: "#F8FAFC",
  netTapeYellow: "#FF685B",
  woodBorder: "#1E1813",
};

interface AthleteStyle {
  name: string;
  skin: string;
  skinShadow: string;
  hair: string;
  headband: string;
  jerseyTop: string;
  jerseyBottom: string;
  jerseyStripe: string;
  jerseyNumber: string;
  shorts: string;
  shortsStripe: string;
  socks: string;
  sockStripe: string;
  shoes: string;
  shoeAccent: string;
  sole: string;
  wristband: string;
  racketFrame: string;
  racketStrings: string;
  racketGrip: string;
}

const PLAYER_STYLE: AthleteStyle = {
  name: "You (Kishan)",
  skin: "#F5C498",
  skinShadow: "#D49C6D",
  hair: "#1E293B",
  headband: "#FFFFFF",
  jerseyTop: "#FF685B",
  jerseyBottom: "#65A30D",
  jerseyStripe: "#0F172A",
  jerseyNumber: "1",
  shorts: "#0F172A",
  shortsStripe: "#FF685B",
  socks: "#FFFFFF",
  sockStripe: "#FF685B",
  shoes: "#FFFFFF",
  shoeAccent: "#FF685B",
  sole: "#D97706", // Gum rubber
  wristband: "#FFFFFF",
  racketFrame: "#FF685B",
  racketStrings: "rgba(255, 255, 255, 0.65)",
  racketGrip: "#FFFFFF",
};

const RIVAL_STYLE: AthleteStyle = {
  name: "Vikram Rao (Pro AI)",
  skin: "#E2AA7D",
  skinShadow: "#BC8156",
  hair: "#0F172A",
  headband: "#DC2626",
  jerseyTop: "#FF685B",
  jerseyBottom: "#991B1B",
  jerseyStripe: "#18181B",
  jerseyNumber: "7",
  shorts: "#18181B",
  shortsStripe: "#FF685B",
  socks: "#18181B",
  sockStripe: "#FF685B",
  shoes: "#0F172A",
  shoeAccent: "#FF685B",
  sole: "#D97706",
  wristband: "#DC2626",
  racketFrame: "#FF685B",
  racketStrings: "rgba(248, 113, 113, 0.75)",
  racketGrip: "#18181B",
};

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  max: number;
  size: number;
  color: string;
}

interface FloatText {
  x: number;
  y: number;
  text: string;
  color: string;
  life: number;
}

export class Fx {
  particles: Particle[] = [];
  texts: FloatText[] = [];
  trail: { x: number; y: number }[] = [];
  shake = 0;
  reduced = false;

  burst(x: number, y: number, color: string, n = 14, speed = 170) {
    const count = this.reduced ? Math.ceil(n / 3) : n;
    for (let i = 0; i < count; i++) {
      const a = Math.random() * Math.PI * 2;
      const s = speed * (0.35 + Math.random() * 0.65);
      this.particles.push({
        x,
        y,
        vx: Math.cos(a) * s,
        vy: Math.sin(a) * s - 45,
        life: 0.6,
        max: 0.6,
        size: 1.5 + Math.random() * 3,
        color,
      });
    }
  }

  text(text: string, x: number, y: number, color: string) {
    this.texts.push({ x, y, text, color, life: 0.95 });
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
      t.y -= 38 * dt;
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

/* ========================================================================== */
/* 1. PLAYSTORE TOURNAMENT STADIUM ARENA                                       */
/* ========================================================================== */
function drawBackground(ctx: CanvasRenderingContext2D, g: MiniCourt, time: number) {
  // Stadium rafters & gradient lighting
  const sky = ctx.createLinearGradient(0, 0, 0, FLOOR);
  sky.addColorStop(0, "#050912");
  sky.addColorStop(0.5, "#0A1322");
  sky.addColorStop(1, "#101E34");
  ctx.fillStyle = sky;
  ctx.fillRect(-20, -20, W + 40, FLOOR + 20);

  // Stadium Roof Truss & Overhead Lighting Rig
  ctx.strokeStyle = "rgba(255, 255, 255, 0.08)";
  ctx.lineWidth = 1.5;
  for (let x = 60; x < W; x += 120) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x + 60, 45);
    ctx.lineTo(x + 120, 0);
    ctx.stroke();
  }

  // 4 Overhead Tournament Floodlight Banks with Volumetric Cones
  const lightBanks = [
    { x: 140, tx: 220, col: "rgba(200, 241, 53, 0.09)" },
    { x: 320, tx: 360, col: "rgba(255, 255, 255, 0.06)" },
    { x: 480, tx: 440, col: "rgba(255, 255, 255, 0.06)" },
    { x: 660, tx: 580, col: "rgba(243, 209, 90, 0.09)" },
  ];

  for (const lb of lightBanks) {
    // Light housing unit
    ctx.fillStyle = "#334155";
    ctx.fillRect(lb.x - 22, 0, 44, 10);
    ctx.fillStyle = "#F8FAFC";
    ctx.fillRect(lb.x - 18, 8, 36, 3);

    // Volumetric light beam cone
    const beam = ctx.createRadialGradient(lb.x, 10, 10, lb.tx, FLOOR * 0.7, 340);
    beam.addColorStop(0, lb.col);
    beam.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = beam;
    ctx.beginPath();
    ctx.moveTo(lb.x - 24, 10);
    ctx.lineTo(lb.x + 24, 10);
    ctx.lineTo(lb.tx + 140, FLOOR);
    ctx.lineTo(lb.tx - 140, FLOOR);
    ctx.closePath();
    ctx.fill();
  }

  // Digital LED Stadium Ribbon Board (Playstore Style)
  ctx.fillStyle = "#090D16";
  ctx.fillRect(0, 70, W, 26);
  ctx.fillStyle = "rgba(243, 209, 90, 0.15)";
  ctx.fillRect(0, 70, W, 1);
  ctx.fillRect(0, 95, W, 1);

  // Animated LED Ribbon Banner Text
  const textOffset = (time * 45) % (W + 300);
  ctx.fillStyle = "#FF685B";
  ctx.font = "900 12px Inter, system-ui, sans-serif";
  ctx.textAlign = "left";
  ctx.letterSpacing = "2px";
  ctx.fillText("★ GELAVU ALL-INDIA BADMINTON MASTERS ★ COURT 1 LIVE ★ 100% HOST PAYOUTS ★ RANKINGS SANCTIONED ★", -textOffset + W, 87);
  ctx.fillText("★ GELAVU ALL-INDIA BADMINTON MASTERS ★ COURT 1 LIVE ★ 100% HOST PAYOUTS ★ RANKINGS SANCTIONED ★", -textOffset, 87);

  // Animated Spectators in Stadium Grandstand
  const hype = g.rally > 4 ? 1.2 : 0.4;
  for (let i = 0; i < 48; i++) {
    const x = 12 + i * 16.5;
    const row = i % 2;
    const bob = Math.sin(time * 3.8 + i * 1.5) * 2.5 * hype;
    const y = 166 + row * 16 - bob;

    // Crowd heads & jerseys
    const isPlayerFan = i % 5 === 0;
    const isRivalFan = i % 5 === 2;
    ctx.fillStyle = isPlayerFan
      ? "rgba(145, 185, 121, 0.28)"
      : isRivalFan
      ? "rgba(239, 68, 68, 0.28)"
      : "rgba(255, 255, 255, 0.11)";

    ctx.beginPath();
    ctx.arc(x, y, 5.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillRect(x - 6, y + 6, 12, 12);
  }
}

/* ========================================================================== */
/* 2. REALISTIC BWF TOURNAMENT COURT & FLOOR                                  */
/* ========================================================================== */
function drawFloor(ctx: CanvasRenderingContext2D) {
  // 1. Premium Outer Teak Wood Surround
  const wood = ctx.createLinearGradient(0, FLOOR, 0, H);
  wood.addColorStop(0, "#261C14");
  wood.addColorStop(1, "#140E0A");
  ctx.fillStyle = wood;
  ctx.fillRect(-20, FLOOR, W + 40, H - FLOOR + 20);

  // 2. Official BWF Emerald Green Synthetic Court Mat
  const courtMat = ctx.createLinearGradient(0, FLOOR, 0, H);
  courtMat.addColorStop(0, "#166554"); // Vibrant tournament green
  courtMat.addColorStop(0.35, "#135748");
  courtMat.addColorStop(1, "#0D3C32");
  ctx.fillStyle = courtMat;
  ctx.fillRect(COURT_L - 10, FLOOR, (COURT_R - COURT_L) + 20, H - FLOOR);

  // Soft court surface gloss reflection
  ctx.fillStyle = "rgba(255, 255, 255, 0.06)";
  ctx.fillRect(COURT_L - 10, FLOOR, (COURT_R - COURT_L) + 20, 2);

  // 3. Crisp BWF Badminton Lines (40mm white court tape)
  ctx.strokeStyle = COLORS.courtLine;
  ctx.lineWidth = 2.5;

  // Baseline top boundary
  ctx.beginPath();
  ctx.moveTo(COURT_L, FLOOR);
  ctx.lineTo(COURT_R, FLOOR);
  ctx.stroke();

  // Bottom boundary
  ctx.beginPath();
  ctx.moveTo(COURT_L, H - 4);
  ctx.lineTo(COURT_R, H - 4);
  ctx.stroke();

  // Vertical Court Boundaries & Service Lines
  ctx.lineWidth = 2;
  const lines = [
    COURT_L,            // Player Back boundary
    COURT_L + 34,       // Player Doubles service line
    NET_X - 110,        // Player Short service line
    NET_X,              // Net center divider
    NET_X + 110,        // Bot Short service line
    COURT_R - 34,       // Bot Doubles service line
    COURT_R,            // Bot Back boundary
  ];

  for (const x of lines) {
    ctx.beginPath();
    ctx.moveTo(x, FLOOR);
    ctx.lineTo(x, H - 4);
    ctx.stroke();
  }

  // Longitudinal Center Line (running between short service lines and baselines)
  const midY = (FLOOR + H - 4) / 2;
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(COURT_L, midY);
  ctx.lineTo(NET_X - 110, midY);
  ctx.moveTo(NET_X + 110, midY);
  ctx.lineTo(COURT_R, midY);
  ctx.stroke();
}

/* ========================================================================== */
/* 3. TOURNAMENT NET & UMPIRE HIGH CHAIR                                      */
/* ========================================================================== */
function drawNet(ctx: CanvasRenderingContext2D, g: MiniCourt) {
  const top = g.netTop;

  // Official Badminton Umpire High Chair behind the net (Playstore Detail!)
  ctx.fillStyle = "#334155";
  // Chair ladder legs
  ctx.beginPath();
  ctx.moveTo(NET_X - 28, top - 32);
  ctx.lineTo(NET_X - 34, FLOOR);
  ctx.moveTo(NET_X - 22, top - 32);
  ctx.lineTo(NET_X - 18, FLOOR);
  ctx.strokeStyle = "#475569";
  ctx.lineWidth = 2;
  ctx.stroke();
  // Chair seat & umpire silhouette
  ctx.fillStyle = "#1E293B";
  ctx.fillRect(NET_X - 32, top - 36, 14, 5);
  ctx.fillStyle = "#F8FAFC";
  ctx.beginPath();
  ctx.arc(NET_X - 25, top - 44, 4.5, 0, Math.PI * 2); // Umpire head
  ctx.fill();
  ctx.fillStyle = "#3B82F6"; // Official blue referee blazer
  ctx.fillRect(NET_X - 29, top - 39, 9, 7);

  // Heavy-duty Net Posts at sides
  ctx.fillStyle = "#1E293B";
  ctx.fillRect(NET_X - 4, top - 10, 8, FLOOR - top + 10);
  // Red Protective Post Pads with Gelavu brand accent
  ctx.fillStyle = "#DC2626";
  ctx.fillRect(NET_X - 5, top + 10, 10, 24);
  ctx.fillStyle = "#FFFFFF";
  ctx.fillRect(NET_X - 5, top + 21, 10, 2);

  // Drop shadow behind net mesh
  ctx.fillStyle = "rgba(0, 0, 0, 0.4)";
  ctx.fillRect(NET_X - 16, top + 5, 32, FLOOR - top - 5);

  // Fine-woven Tournament Net Mesh
  ctx.strokeStyle = "rgba(248, 250, 252, 0.38)";
  ctx.lineWidth = 1;

  for (let y = top + 6; y < FLOOR; y += 7) {
    ctx.beginPath();
    ctx.moveTo(NET_X - 18, y);
    ctx.lineTo(NET_X + 18, y);
    ctx.stroke();
  }
  for (let x = NET_X - 16; x <= NET_X + 16; x += 7) {
    ctx.beginPath();
    ctx.moveTo(x, top + 4);
    ctx.lineTo(x, FLOOR);
    ctx.stroke();
  }

  // Official 76mm White Vinyl Top Net Tape with Yellow Accent (BWF spec)
  ctx.fillStyle = COLORS.netTape;
  ctx.fillRect(NET_X - 22, top - 3.5, 44, 7);
  ctx.fillStyle = COLORS.netTapeYellow;
  ctx.fillRect(NET_X - 22, top + 3.5, 44, 2); // Yellow bottom edge seam
}

/* ========================================================================== */
/* 4. REALISTIC HUMAN ATHLETE RENDERER (PLAYER & RIVAL)                       */
/* ========================================================================== */
function drawRealisticHumanAthlete(
  ctx: CanvasRenderingContext2D,
  a: Athlete,
  g: MiniCourt,
  style: AthleteStyle,
  isPowered: boolean
) {
  const p = a.swing >= 0 ? Math.min(a.swing / SWING_DUR, 1) : 0;
  const lift = a.swing >= 0 ? a.jumpMax * Math.sin(Math.PI * p) : 0;

  // 1. Realistic Dynamic Contact Shadow on Court
  const shadowScale = Math.max(0.28, 1 - lift / 85);
  ctx.fillStyle = "rgba(0, 0, 0, 0.45)";
  ctx.beginPath();
  ctx.ellipse(a.x, FLOOR + 6, 22 * shadowScale, 5.5 * shadowScale, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.save();
  ctx.translate(a.x, FLOOR - lift);
  ctx.scale(a.dir, 1);
  ctx.lineCap = "round";
  ctx.lineJoin = "round";

  const stride = a.moving > 0.4 ? Math.sin(a.run) * 12 : 0;
  const idleBob = a.moving <= 0.4 ? Math.sin(g.now * 4) * 1.5 : 0;

  // -------------------------------------------------------------------------
  // 2. NON-RACKET BALANCING ARM (Crucial for Realistic Human Pose!)
  // -------------------------------------------------------------------------
  // In real badminton, the non-racket arm aims at the shuttlecock or counter-balances
  ctx.save();
  const nonRacketAngle =
    a.swing >= 0
      ? -Math.PI * 0.7 + p * Math.PI * 0.9 // Swings back during overhead strike
      : -Math.PI * 0.4 + Math.sin(g.now * 3) * 0.1; // Raised ready pose

  ctx.translate(-4, -58 + idleBob);
  ctx.rotate(nonRacketAngle);

  // Upper arm
  ctx.strokeStyle = style.skin;
  ctx.lineWidth = 4.5;
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(0, 16);
  ctx.stroke();

  // Forearm & Hand
  ctx.beginPath();
  ctx.moveTo(0, 16);
  ctx.lineTo(8, 28);
  ctx.stroke();

  // Wristband on balancing hand
  ctx.fillStyle = style.wristband;
  ctx.beginPath();
  ctx.arc(4, 22, 3, 0, Math.PI * 2);
  ctx.fill();

  ctx.restore();

  // -------------------------------------------------------------------------
  // 3. HUMAN LEGS, SOCKS & BADMINTON COURT SHOES
  // -------------------------------------------------------------------------
  // Back Leg & Front Leg with knee joints
  ctx.strokeStyle = style.skin;
  ctx.lineWidth = 6;

  // Back leg
  ctx.beginPath();
  ctx.moveTo(4, -28 + idleBob);
  ctx.lineTo(4 + stride, -12);
  ctx.lineTo(4 + stride, -4);
  ctx.stroke();

  // Front leg
  ctx.beginPath();
  ctx.moveTo(-3, -28 + idleBob);
  ctx.lineTo(-3 - stride, -12);
  ctx.lineTo(-3 - stride, -4);
  ctx.stroke();

  // Muscular calf contour shadow
  ctx.strokeStyle = style.skinShadow;
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  ctx.moveTo(-2 - stride, -14);
  ctx.lineTo(-2 - stride, -6);
  ctx.stroke();

  // Athletic Crew Socks with Team Stripe
  ctx.strokeStyle = style.socks;
  ctx.lineWidth = 6.5;
  ctx.beginPath();
  ctx.moveTo(-3 - stride, -11);
  ctx.lineTo(-3 - stride, -4);
  ctx.moveTo(4 + stride, -11);
  ctx.lineTo(4 + stride, -4);
  ctx.stroke();

  // Sock colored stripe
  ctx.strokeStyle = style.sockStripe;
  ctx.lineWidth = 1.8;
  ctx.beginPath();
  ctx.moveTo(-6 - stride, -9);
  ctx.lineTo(0 - stride, -9);
  ctx.moveTo(1 + stride, -9);
  ctx.lineTo(7 + stride, -9);
  ctx.stroke();

  // Professional Badminton Shoes (Padded upper, color flash, gum rubber sole)
  // Shoe Front
  ctx.fillStyle = style.shoes;
  ctx.beginPath();
  ctx.roundRect(-11 - stride, -5, 14, 6, [3, 4, 2, 2]);
  ctx.fill();
  // Shoe Back
  ctx.beginPath();
  ctx.roundRect(-3 + stride, -5, 14, 6, [3, 4, 2, 2]);
  ctx.fill();

  // Shoe colored athletic accent slash
  ctx.fillStyle = style.shoeAccent;
  ctx.fillRect(-8 - stride, -4, 6, 2);
  ctx.fillRect(0 + stride, -4, 6, 2);

  // Amber Gum Rubber Grippy Outsole with Treads
  ctx.fillStyle = style.sole;
  ctx.fillRect(-11 - stride, 1, 14, 2.5);
  ctx.fillRect(-3 + stride, 1, 14, 2.5);

  // -------------------------------------------------------------------------
  // 4. ATHLETIC BADMINTON SHORTS
  // -------------------------------------------------------------------------
  ctx.fillStyle = style.shorts;
  ctx.beginPath();
  ctx.roundRect(-12, -40 + idleBob, 24, 16, [4, 4, 3, 3]);
  ctx.fill();

  // Contrast side racing piping on shorts
  ctx.fillStyle = style.shortsStripe;
  ctx.fillRect(-12, -38 + idleBob, 2.5, 14);
  ctx.fillRect(9.5, -38 + idleBob, 2.5, 14);

  // -------------------------------------------------------------------------
  // 5. TOURNAMENT PERFORMANCE JERSEY (With Shading & Athlete Number)
  // -------------------------------------------------------------------------
  const jerseyGrad = ctx.createLinearGradient(0, -68, 0, -38);
  jerseyGrad.addColorStop(0, style.jerseyTop);
  jerseyGrad.addColorStop(1, style.jerseyBottom);
  ctx.fillStyle = jerseyGrad;
  ctx.beginPath();
  // Anatomical athletic V-taper torso
  ctx.roundRect(-12.5, -68 + idleBob, 25, 30, [7, 7, 3, 3]);
  ctx.fill();

  // Contrast side aerodynamic mesh panels
  ctx.fillStyle = style.jerseyStripe;
  ctx.fillRect(-12.5, -66 + idleBob, 3, 27);
  ctx.fillRect(9.5, -66 + idleBob, 3, 27);

  // Athletic V-Neck Collar
  ctx.strokeStyle = "#FFFFFF";
  ctx.lineWidth = 1.8;
  ctx.beginPath();
  ctx.moveTo(-4, -68 + idleBob);
  ctx.lineTo(0, -61 + idleBob);
  ctx.lineTo(4, -68 + idleBob);
  ctx.stroke();

  // Tournament Player Number on Chest/Back
  ctx.fillStyle = "#FFFFFF";
  ctx.font = "900 11px Inter, system-ui, sans-serif";
  ctx.textAlign = "center";
  ctx.fillText(style.jerseyNumber, 0, -48 + idleBob);

  // -------------------------------------------------------------------------
  // 6. HUMAN HEAD, EXPRESSIVE FACE & HAIR
  // -------------------------------------------------------------------------
  // Muscular Neck
  ctx.fillStyle = style.skin;
  ctx.fillRect(-4, -72 + idleBob, 8, 6);

  // Head Oval
  ctx.beginPath();
  ctx.arc(0, -78 + idleBob, 10, 0, Math.PI * 2);
  ctx.fill();

  // Human Ear
  ctx.fillStyle = style.skinShadow;
  ctx.beginPath();
  ctx.arc(-8, -78 + idleBob, 2.8, 0, Math.PI * 2);
  ctx.fill();

  // Athletic Tournament Headband
  ctx.fillStyle = style.headband;
  ctx.fillRect(-9, -82 + idleBob, 18, 4.2);

  // Athletic Textured Haircut
  ctx.fillStyle = style.hair;
  ctx.beginPath();
  ctx.arc(0, -81 + idleBob, 10.5, Math.PI * 0.85, Math.PI * 2.15);
  ctx.fill();
  // Hair tuft spikes
  ctx.beginPath();
  ctx.moveTo(3, -91 + idleBob);
  ctx.lineTo(6, -95 + idleBob);
  ctx.lineTo(8, -90 + idleBob);
  ctx.fill();

  // Focused Human Eyes Looking Toward the Shuttlecock!
  const eyeX = 3;
  const eyeY = -79 + idleBob;
  // White sclera
  ctx.fillStyle = "#FFFFFF";
  ctx.beginPath();
  ctx.ellipse(eyeX, eyeY, 3, 2.2, 0, 0, Math.PI * 2);
  ctx.fill();

  // Pupil looking at the shuttlecock in flight
  const lookAngle = Math.atan2(g.shuttle.y - (FLOOR - lift - 79), g.shuttle.x - a.x);
  const lookDir = a.dir === 1 ? lookAngle : Math.PI - lookAngle;
  const pupilX = eyeX + Math.cos(lookDir) * 1.3;
  const pupilY = eyeY + Math.sin(lookDir) * 1;
  ctx.fillStyle = "#0F172A";
  ctx.beginPath();
  ctx.arc(pupilX, pupilY, 1.4, 0, Math.PI * 2);
  ctx.fill();

  // Focused Eyebrow
  ctx.strokeStyle = style.hair;
  ctx.lineWidth = 1.3;
  ctx.beginPath();
  ctx.moveTo(1, -83 + idleBob);
  ctx.lineTo(6, -82 + idleBob);
  ctx.stroke();

  // Nose contour
  ctx.strokeStyle = style.skinShadow;
  ctx.lineWidth = 1.2;
  ctx.beginPath();
  ctx.moveTo(7, -79 + idleBob);
  ctx.lineTo(9, -77 + idleBob);
  ctx.stroke();

  // -------------------------------------------------------------------------
  // 7. RACKET ARM & PROFESSIONAL ISOMETRIC BADMINTON RACKET
  // -------------------------------------------------------------------------
  const phi = a.swing >= 0 ? -0.245 + (p - 0.55) * 3.8 : -0.5 + Math.sin(g.now * 3) * 0.05;
  const px = 0;
  const py = -61 + idleBob;
  const R = 31;
  const hx = px + R * Math.cos(phi);
  const hy = py + R * Math.sin(phi);

  // Muscular Upper Arm (Bicep)
  ctx.strokeStyle = style.skin;
  ctx.lineWidth = 5.5;
  ctx.beginPath();
  ctx.moveTo(px, py);
  ctx.lineTo(px + R * 0.45 * Math.cos(phi), py + R * 0.45 * Math.sin(phi));
  ctx.stroke();

  // Athletic Wristband on hitting arm
  const wx = px + R * 0.42 * Math.cos(phi);
  const wy = py + R * 0.42 * Math.sin(phi);
  ctx.fillStyle = style.wristband;
  ctx.beginPath();
  ctx.arc(wx, wy, 4, 0, Math.PI * 2);
  ctx.fill();

  // Forearm & Hand Gripping the Racket
  ctx.strokeStyle = style.skin;
  ctx.lineWidth = 4.8;
  ctx.beginPath();
  ctx.moveTo(wx, wy);
  ctx.lineTo(hx, hy);
  ctx.stroke();

  // Racket Handle Grip Tape
  ctx.strokeStyle = style.racketGrip;
  ctx.lineWidth = 3.8;
  ctx.beginPath();
  ctx.moveTo(hx - 6 * Math.cos(phi), hy - 6 * Math.sin(phi));
  ctx.lineTo(hx + 3 * Math.cos(phi), hy + 3 * Math.sin(phi));
  ctx.stroke();

  // Graphite Racket Shaft
  ctx.strokeStyle = "#94A3B8";
  ctx.lineWidth = 2.2;
  ctx.beginPath();
  ctx.moveTo(hx, hy);
  ctx.lineTo(hx + 12 * Math.cos(phi), hy + 12 * Math.sin(phi));
  ctx.stroke();

  // Racket Head with Strings
  ctx.save();
  ctx.translate(hx + 12 * Math.cos(phi), hy + 12 * Math.sin(phi));
  ctx.rotate(phi + Math.PI / 2);

  // Aerodynamic Isometric Racket Frame
  ctx.strokeStyle = isPowered ? COLORS.gold : style.racketFrame;
  ctx.lineWidth = 2.6;
  if (isPowered) {
    ctx.shadowColor = COLORS.gold;
    ctx.shadowBlur = 18;
  }
  ctx.beginPath();
  ctx.ellipse(0, -11, 8.5, 13, 0, 0, Math.PI * 2);
  ctx.stroke();
  ctx.shadowBlur = 0;

  // High-Tension String Grid
  ctx.strokeStyle = style.racketStrings;
  ctx.lineWidth = 0.8;
  // Horizontal cross strings
  for (const sy of [-18, -14, -10, -6, -2]) {
    const span = Math.sqrt(Math.max(0, 1 - Math.pow((sy + 11) / 13, 2))) * 8;
    ctx.beginPath();
    ctx.moveTo(-span, sy);
    ctx.lineTo(span, sy);
    ctx.stroke();
  }
  // Vertical main strings
  for (const sx of [-5, -2, 2, 5]) {
    ctx.beginPath();
    ctx.moveTo(sx, -23);
    ctx.lineTo(sx, 1);
    ctx.stroke();
  }

  // T-Joint reinforcement block
  ctx.fillStyle = "#334155";
  ctx.fillRect(-2.5, 0, 5, 3.5);

  ctx.restore();
  ctx.restore();
}

/* ========================================================================== */
/* 5. REALISTIC SHUTTLECOCK WITH HIGH-SPEED MOTION BLUR TRAIL                 */
/* ========================================================================== */
function drawShuttle(ctx: CanvasRenderingContext2D, g: MiniCourt, fx: Fx) {
  const s = g.shuttle;

  // Multi-tier speed trail
  if (fx.trail.length > 1) {
    for (let i = 1; i < fx.trail.length; i++) {
      const alpha = (i / fx.trail.length) * 0.5;
      ctx.strokeStyle = `rgba(200, 241, 53, ${alpha})`;
      ctx.lineWidth = 1 + (i / fx.trail.length) * 3.8;
      ctx.beginPath();
      ctx.moveTo(fx.trail[i - 1].x, fx.trail[i - 1].y);
      ctx.lineTo(fx.trail[i].x, fx.trail[i].y);
      ctx.stroke();
    }
  }

  // Soft Contact Shadow on Court Floor
  ctx.fillStyle = "rgba(0, 0, 0, 0.4)";
  ctx.beginPath();
  ctx.ellipse(s.x, FLOOR + 6, 8, 2.5, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.save();
  ctx.translate(s.x, s.y);
  ctx.rotate(s.angle);

  // Realistic Goose Feather Skirt (16 feathers flared cone)
  ctx.fillStyle = "#FFFFFF";
  ctx.beginPath();
  ctx.moveTo(-3, -2.5);
  ctx.lineTo(-20, -11);
  ctx.lineTo(-20, 11);
  ctx.lineTo(-3, 2.5);
  ctx.closePath();
  ctx.fill();

  // Feather shafts & binding threads
  ctx.strokeStyle = "rgba(100, 116, 139, 0.45)";
  ctx.lineWidth = 0.9;
  for (const k of [-7, -3, 3, 7]) {
    ctx.beginPath();
    ctx.moveTo(-3, k * 0.35);
    ctx.lineTo(-20, k * 1.55);
    ctx.stroke();
  }

  // Red binding tape line around feather base (Official Yonex spec)
  ctx.fillStyle = "#FF685B";
  ctx.fillRect(-6, -4.5, 2.5, 9);

  // Natural Rounded Cork Head
  ctx.fillStyle = "#FDE047";
  ctx.beginPath();
  ctx.arc(0, 0, 5, 0, Math.PI * 2);
  ctx.fill();

  ctx.restore();
}

/* ========================================================================== */
/* MAIN SCENE DRAW LOOP                                                       */
/* ========================================================================== */
export function drawScene(ctx: CanvasRenderingContext2D, g: MiniCourt, fx: Fx, time: number, scale: number) {
  ctx.setTransform(scale, 0, 0, scale, 0, 0);
  ctx.clearRect(0, 0, W, H);
  ctx.save();

  if (fx.shake > 0) {
    ctx.translate((Math.random() - 0.5) * fx.shake, (Math.random() - 0.5) * fx.shake);
  }

  drawBackground(ctx, g, time);
  drawFloor(ctx);
  drawNet(ctx, g);

  // Render Realistic Human Athletes (You vs Rival Vikram Rao)
  drawRealisticHumanAthlete(ctx, g.bot, g, RIVAL_STYLE, false);
  drawRealisticHumanAthlete(ctx, g.player, g, PLAYER_STYLE, g.meter >= 100);

  drawShuttle(ctx, g, fx);

  // Visual Effects & Smash Sparks
  for (const p of fx.particles) {
    ctx.globalAlpha = Math.max(p.life / p.max, 0);
    ctx.fillStyle = p.color;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    ctx.fill();
  }

  // Playstore Arcade In-Game Text Hits ("380 KM/H SMASH!", "PERFECT HIT!")
  ctx.textAlign = "center";
  ctx.font = "900 22px Inter, system-ui, sans-serif";
  for (const t of fx.texts) {
    ctx.globalAlpha = Math.min(t.life / 0.5, 1);
    ctx.fillStyle = t.color;
    ctx.fillText(t.text, t.x, t.y);
  }

  ctx.globalAlpha = 1;
  ctx.restore();
}
