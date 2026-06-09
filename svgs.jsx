/* eslint-disable */
// SVG blueprint-style illustrations for СКАнгар.
// All drawings use thin lines, dimension marks, and technical labels.

const STROKE = '#1F2528';
const STROKE_LIGHT = 'rgba(31,37,40,0.35)';
const STROKE_DARK = '#F5F3EE';
const STROKE_DARK_LIGHT = 'rgba(245,243,238,0.4)';
const ACCENT = '#F26A21';

// ---- Logo mark ---------------------------------------------------------
function Logo({ size = 38, color = STROKE }) {
  const dark = color !== STROKE; // light text → dark surface
  const src = dark
    ? (window.__resources && window.__resources.logoDark) || 'assets/logo-dark.png'
    : (window.__resources && window.__resources.logoLight) || 'assets/logo-trimmed.png';
  return (
    <a href="#top" style={{ display: 'inline-flex', alignItems: 'center', textDecoration: 'none', lineHeight: 0 }}>
      <img
        src={src}
        alt="СКАнгар"
        style={{ height: size, width: 'auto', display: 'block' }}
      />
    </a>
  );
}

// ---- Arched hangar 3/4 line drawing -----------------------------------
function ArchedHangar({ stroke = STROKE, accent = ACCENT, showDims = true, className = '' }) {
  const lite = stroke === STROKE ? STROKE_LIGHT : STROKE_DARK_LIGHT;
  return (
    <svg viewBox="0 0 800 460" className={className} style={{ width: '100%', height: 'auto', display: 'block' }} fill="none">
      {/* ground line */}
      <line x1="20" y1="400" x2="780" y2="400" stroke={stroke} strokeWidth="1"/>
      <g stroke={lite} strokeWidth="0.5">
        {/* hatched ground */}
        {Array.from({ length: 38 }).map((_, i) => (
          <line key={i} x1={20 + i * 20} y1="400" x2={10 + i * 20} y2="418"/>
        ))}
      </g>
      {/* back wall (perspective) */}
      <path d="M 230 380 L 230 250 Q 230 160 430 160 Q 630 160 630 250 L 630 380 Z" stroke={stroke} strokeWidth="1.2" fill="none"/>
      {/* front opening arch */}
      <path d="M 100 400 L 100 240 Q 100 130 360 130 Q 620 130 620 240 L 620 400" stroke={stroke} strokeWidth="1.6" fill="none"/>
      {/* roof depth lines */}
      <line x1="100" y1="240" x2="230" y2="250" stroke={stroke} strokeWidth="1"/>
      <line x1="620" y1="240" x2="630" y2="250" stroke={stroke} strokeWidth="1"/>
      {/* purlin ribs (curved structure inside) */}
      {[0.15, 0.3, 0.45, 0.6, 0.75, 0.9].map((t, i) => {
        // interpolate arch from front (100..620) to back (230..630)
        const x1 = 100 + (620 - 100) * t;
        const x2 = 230 + (630 - 230) * t;
        // arch top: ellipse-ish
        const cx1 = 360, cy1 = 130, r1 = 260;
        const cx2 = 430, cy2 = 160, r2 = 200;
        const y1 = cy1 + Math.sin(Math.acos((x1 - cx1) / r1)) * 0 + (r1 - Math.sqrt(Math.max(0, r1 * r1 - (x1 - cx1) * (x1 - cx1)))) * 0.5 + 130;
        const y2 = cy2 + Math.sin(Math.acos((x2 - cx2) / r2)) * 0 + (r2 - Math.sqrt(Math.max(0, r2 * r2 - (x2 - cx2) * (x2 - cx2)))) * 0.4 + 160;
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={lite} strokeWidth="0.7"/>;
      })}
      {/* arch frame ribs (front to back lines following the curve) */}
      {[0.15, 0.3, 0.5, 0.7, 0.85].map((t, i) => {
        const xFront = 100 + 520 * t;
        const yFront = 240 - Math.sqrt(Math.max(0, 110 * 110 - (xFront - 360) * (xFront - 360) / 5));
        const xBack = 230 + 400 * t;
        const yBack = 250 - Math.sqrt(Math.max(0, 90 * 90 - (xBack - 430) * (xBack - 430) / 4));
        return <line key={i} x1={xFront} y1={Math.max(130, yFront)} x2={xBack} y2={Math.max(160, yBack)} stroke={lite} strokeWidth="0.7"/>;
      })}
      {/* gate frame */}
      <rect x="240" y="270" width="240" height="130" stroke={stroke} strokeWidth="1" fill="none"/>
      <line x1="360" y1="270" x2="360" y2="400" stroke={stroke} strokeWidth="0.8"/>
      {/* small door */}
      <rect x="510" y="320" width="50" height="80" stroke={stroke} strokeWidth="1" fill="none"/>
      {/* dimensions */}
      {showDims && (
        <g fontFamily="IBM Plex Mono, monospace" fontSize="11" fill={stroke}>
          {/* width arrow */}
          <line x1="100" y1="430" x2="620" y2="430" stroke={stroke} strokeWidth="0.8"/>
          <line x1="100" y1="425" x2="100" y2="435" stroke={stroke} strokeWidth="0.8"/>
          <line x1="620" y1="425" x2="620" y2="435" stroke={stroke} strokeWidth="0.8"/>
          <rect x="340" y="422" width="40" height="14" fill={stroke === STROKE ? '#F5F3EE' : '#1F2528'}/>
          <text x="360" y="433" textAnchor="middle">24 м</text>
          {/* height arrow */}
          <line x1="70" y1="130" x2="70" y2="400" stroke={stroke} strokeWidth="0.8"/>
          <line x1="65" y1="130" x2="75" y2="130" stroke={stroke} strokeWidth="0.8"/>
          <line x1="65" y1="400" x2="75" y2="400" stroke={stroke} strokeWidth="0.8"/>
          <rect x="50" y="258" width="40" height="14" fill={stroke === STROKE ? '#F5F3EE' : '#1F2528'}/>
          <text x="70" y="269" textAnchor="middle">9 м</text>
        </g>
      )}
      {/* accent: gate top edge */}
      <line x1="240" y1="270" x2="480" y2="270" stroke={accent} strokeWidth="2"/>
      {/* tag */}
      <g fontFamily="IBM Plex Mono, monospace" fontSize="10" fill={stroke} opacity="0.65">
        <text x="100" y="120">АРОЧНЫЙ ТИП · ПРОЛЁТ 24 М</text>
      </g>
    </svg>
  );
}

// ---- Straight wall hangar 3/4 ------------------------------------------
function StraightHangar({ stroke = STROKE, accent = ACCENT, className = '' }) {
  const lite = stroke === STROKE ? STROKE_LIGHT : STROKE_DARK_LIGHT;
  return (
    <svg viewBox="0 0 800 460" className={className} style={{ width: '100%', height: 'auto', display: 'block' }} fill="none">
      <line x1="20" y1="400" x2="780" y2="400" stroke={stroke} strokeWidth="1"/>
      {/* back box */}
      <path d="M230 380 L230 220 L420 160 L620 220 L620 380 Z" stroke={stroke} strokeWidth="1.2" fill="none"/>
      {/* front box */}
      <path d="M100 400 L100 200 L360 120 L620 200 L620 400" stroke={stroke} strokeWidth="1.6" fill="none"/>
      {/* depth lines */}
      <line x1="100" y1="200" x2="230" y2="220" stroke={stroke} strokeWidth="1"/>
      <line x1="360" y1="120" x2="420" y2="160" stroke={stroke} strokeWidth="1"/>
      <line x1="620" y1="200" x2="620" y2="220" stroke={stroke} strokeWidth="1"/>
      {/* purlins */}
      {[0.2, 0.4, 0.6, 0.8].map((t, i) => {
        const x = 100 + 520 * t;
        const yTop = x < 360 ? 200 + ((120 - 200) * (x - 100) / 260) : 120 + ((200 - 120) * (x - 360) / 260);
        const xBack = 230 + 390 * t;
        const yBack = xBack < 420 ? 220 + ((160 - 220) * (xBack - 230) / 190) : 160 + ((220 - 160) * (xBack - 420) / 200);
        return <line key={i} x1={x} y1={yTop} x2={xBack} y2={yBack} stroke={lite} strokeWidth="0.7"/>;
      })}
      {/* gate */}
      <rect x="240" y="260" width="240" height="140" stroke={stroke} strokeWidth="1" fill="none"/>
      <line x1="360" y1="260" x2="360" y2="400" stroke={stroke} strokeWidth="0.8"/>
      {/* dim */}
      <g fontFamily="IBM Plex Mono, monospace" fontSize="11" fill={stroke}>
        <line x1="100" y1="430" x2="620" y2="430" stroke={stroke} strokeWidth="0.8"/>
        <line x1="100" y1="425" x2="100" y2="435" stroke={stroke} strokeWidth="0.8"/>
        <line x1="620" y1="425" x2="620" y2="435" stroke={stroke} strokeWidth="0.8"/>
        <rect x="340" y="422" width="40" height="14" fill={stroke === STROKE ? '#F5F3EE' : '#1F2528'}/>
        <text x="360" y="433" textAnchor="middle">30 м</text>
      </g>
      <line x1="240" y1="260" x2="480" y2="260" stroke={accent} strokeWidth="2"/>
      <g fontFamily="IBM Plex Mono, monospace" fontSize="10" fill={stroke} opacity="0.65">
        <text x="100" y="110">ПРЯМОСТЕННЫЙ ТИП · ПРОЛЁТ 30 М</text>
      </g>
    </svg>
  );
}

// ---- Cross section -----------------------------------------------------
function CrossSection({ type = 'arch', width = 24, height = 9, stroke = STROKE, accent = ACCENT, label = true }) {
  const lite = stroke === STROKE ? STROKE_LIGHT : STROKE_DARK_LIGHT;
  // map widths/heights to svg coords
  const svgW = 600, svgH = 360;
  const margin = 60;
  const scale = Math.min((svgW - 2 * margin) / Math.max(width, 1), (svgH - margin - 40) / Math.max(height, 1));
  const pxW = width * scale;
  const pxH = height * scale;
  const x0 = (svgW - pxW) / 2;
  const yGround = svgH - 40;
  const yTop = yGround - pxH;

  let shape;
  if (type === 'arch') {
    // semi-circle/ellipse arch
    shape = <path d={`M${x0} ${yGround} L${x0} ${yTop + pxH * 0.4} Q${x0} ${yTop} ${x0 + pxW / 2} ${yTop} Q${x0 + pxW} ${yTop} ${x0 + pxW} ${yTop + pxH * 0.4} L${x0 + pxW} ${yGround} Z`} stroke={stroke} strokeWidth="1.8" fill="none"/>;
  } else {
    // gable
    shape = <path d={`M${x0} ${yGround} L${x0} ${yTop + pxH * 0.3} L${x0 + pxW / 2} ${yTop} L${x0 + pxW} ${yTop + pxH * 0.3} L${x0 + pxW} ${yGround} Z`} stroke={stroke} strokeWidth="1.8" fill="none"/>;
  }

  return (
    <svg viewBox={`0 0 ${svgW} ${svgH}`} style={{ width: '100%', height: 'auto', display: 'block' }} fill="none">
      {/* ground */}
      <line x1="20" y1={yGround} x2={svgW - 20} y2={yGround} stroke={stroke} strokeWidth="1"/>
      <g stroke={lite} strokeWidth="0.5">
        {Array.from({ length: 30 }).map((_, i) => (
          <line key={i} x1={20 + i * 20} y1={yGround} x2={10 + i * 20} y2={yGround + 14}/>
        ))}
      </g>
      {/* shape */}
      {shape}
      {/* internal ribs */}
      {Array.from({ length: 6 }).map((_, i) => {
        const xx = x0 + (pxW * (i + 1)) / 7;
        return <line key={i} x1={xx} y1={yGround} x2={xx} y2={yTop + (type === 'arch' ? 8 : 8)} stroke={lite} strokeWidth="0.6" strokeDasharray="2 3"/>;
      })}
      {/* width dim */}
      <g fontFamily="IBM Plex Mono, monospace" fontSize="11" fill={stroke}>
        <line x1={x0} y1={yGround + 28} x2={x0 + pxW} y2={yGround + 28} stroke={stroke} strokeWidth="0.8"/>
        <line x1={x0} y1={yGround + 24} x2={x0} y2={yGround + 32} stroke={stroke} strokeWidth="0.8"/>
        <line x1={x0 + pxW} y1={yGround + 24} x2={x0 + pxW} y2={yGround + 32} stroke={stroke} strokeWidth="0.8"/>
        <rect x={x0 + pxW / 2 - 22} y={yGround + 20} width="44" height="14" fill={stroke === STROKE ? '#F5F3EE' : '#1F2528'}/>
        <text x={x0 + pxW / 2} y={yGround + 31} textAnchor="middle">{width} м</text>
      </g>
      {/* height dim */}
      <g fontFamily="IBM Plex Mono, monospace" fontSize="11" fill={stroke}>
        <line x1={x0 - 28} y1={yTop} x2={x0 - 28} y2={yGround} stroke={stroke} strokeWidth="0.8"/>
        <line x1={x0 - 32} y1={yTop} x2={x0 - 24} y2={yTop} stroke={stroke} strokeWidth="0.8"/>
        <line x1={x0 - 32} y1={yGround} x2={x0 - 24} y2={yGround} stroke={stroke} strokeWidth="0.8"/>
        <rect x={x0 - 48} y={(yTop + yGround) / 2 - 7} width="42" height="14" fill={stroke === STROKE ? '#F5F3EE' : '#1F2528'}/>
        <text x={x0 - 27} y={(yTop + yGround) / 2 + 4} textAnchor="middle">{height} м</text>
      </g>
      {/* tag */}
      {label && (
        <g fontFamily="IBM Plex Mono, monospace" fontSize="10" fill={stroke} opacity="0.65">
          <text x="20" y="22">РАЗРЕЗ · {type === 'arch' ? 'АРОЧНЫЙ' : 'ПРЯМОСТЕННЫЙ'}</text>
          <text x={svgW - 20} y="22" textAnchor="end">ШАГ РАМ 3 М</text>
        </g>
      )}
    </svg>
  );
}

// ---- Plan view ---------------------------------------------------------
function FloorPlan({ stroke = STROKE, accent = ACCENT }) {
  const lite = stroke === STROKE ? STROKE_LIGHT : STROKE_DARK_LIGHT;
  return (
    <svg viewBox="0 0 600 360" style={{ width: '100%', height: 'auto', display: 'block' }} fill="none">
      <rect x="60" y="60" width="480" height="240" stroke={stroke} strokeWidth="1.6"/>
      {/* columns (frame steps) */}
      {Array.from({ length: 9 }).map((_, i) => (
        <g key={i}>
          <rect x={60 + (i + 1) * 48 - 3} y="57" width="6" height="6" fill={stroke}/>
          <rect x={60 + (i + 1) * 48 - 3} y="297" width="6" height="6" fill={stroke}/>
          <line x1={60 + (i + 1) * 48} y1="60" x2={60 + (i + 1) * 48} y2="300" stroke={lite} strokeDasharray="2 4" strokeWidth="0.5"/>
        </g>
      ))}
      {/* gate (orange accent) */}
      <line x1="220" y1="300" x2="380" y2="300" stroke={accent} strokeWidth="3"/>
      {/* door */}
      <line x1="450" y1="300" x2="490" y2="300" stroke={stroke} strokeWidth="3"/>
      <path d="M450 300 A40 40 0 0 1 490 260" stroke={lite} strokeWidth="0.7" fill="none"/>
      {/* dimensions */}
      <g fontFamily="IBM Plex Mono, monospace" fontSize="11" fill={stroke}>
        <line x1="60" y1="330" x2="540" y2="330" stroke={stroke} strokeWidth="0.8"/>
        <line x1="60" y1="325" x2="60" y2="335" stroke={stroke} strokeWidth="0.8"/>
        <line x1="540" y1="325" x2="540" y2="335" stroke={stroke} strokeWidth="0.8"/>
        <rect x="278" y="322" width="44" height="14" fill={stroke === STROKE ? '#F5F3EE' : '#1F2528'}/>
        <text x="300" y="333" textAnchor="middle">60 м</text>
        <line x1="30" y1="60" x2="30" y2="300" stroke={stroke} strokeWidth="0.8"/>
        <line x1="25" y1="60" x2="35" y2="60" stroke={stroke} strokeWidth="0.8"/>
        <line x1="25" y1="300" x2="35" y2="300" stroke={stroke} strokeWidth="0.8"/>
        <rect x="10" y="173" width="42" height="14" fill={stroke === STROKE ? '#F5F3EE' : '#1F2528'}/>
        <text x="31" y="184" textAnchor="middle">24 м</text>
        <text x="60" y="50" fontSize="10" opacity="0.65">ПЛАН · ШАГ КОЛОНН 6 М</text>
      </g>
    </svg>
  );
}

// ---- Region map (ЮФО abstract) -----------------------------------------
function YufoMap({ stroke = STROKE, accent = ACCENT, highlight = 'Краснодарский край' }) {
  const lite = stroke === STROKE ? STROKE_LIGHT : STROKE_DARK_LIGHT;
  // schematic blobs for ЮФО regions (not geographically accurate, just iconographic)
  const regions = [
    { id: 'krd', name: 'Краснодарский край', d: 'M40 180 L120 150 L200 170 L220 230 L180 280 L100 290 L50 250 Z', cx: 130, cy: 220 },
    { id: 'ros', name: 'Ростовская обл.', d: 'M200 80 L320 70 L340 140 L300 180 L220 170 L210 120 Z', cx: 270, cy: 125 },
    { id: 'stv', name: 'Ставропольский', d: 'M220 170 L300 180 L340 230 L280 270 L220 230 Z', cx: 270, cy: 215 },
    { id: 'vlg', name: 'Волгоградская', d: 'M260 30 L380 30 L380 80 L320 70 L260 80 Z', cx: 320, cy: 55 },
    { id: 'ast', name: 'Астраханская', d: 'M340 90 L420 110 L430 180 L380 200 L340 140 Z', cx: 380, cy: 145 },
    { id: 'adg', name: 'Адыгея', d: 'M150 200 L190 200 L195 235 L160 235 Z', cx: 172, cy: 218 },
    { id: 'krm', name: 'Крым', d: 'M40 230 L60 220 L75 245 L60 270 L30 265 Z', cx: 52, cy: 245 },
    { id: 'sev', name: 'Севастополь', d: 'M20 260 L40 260 L40 280 L25 280 Z', cx: 30, cy: 270 },
  ];
  return (
    <svg viewBox="0 0 460 320" style={{ width: '100%', height: 'auto', display: 'block' }} fill="none">
      <g stroke={lite} strokeWidth="0.5">
        {Array.from({ length: 15 }).map((_, i) => (
          <line key={`h${i}`} x1="0" y1={i * 20} x2="460" y2={i * 20}/>
        ))}
        {Array.from({ length: 24 }).map((_, i) => (
          <line key={`v${i}`} x1={i * 20} y1="0" x2={i * 20} y2="320"/>
        ))}
      </g>
      {regions.map(r => (
        <g key={r.id}>
          <path d={r.d}
                stroke={stroke}
                strokeWidth={r.name === highlight ? 1.6 : 1}
                fill={r.name === highlight ? accent : 'none'}
                fillOpacity={r.name === highlight ? 0.12 : 0}/>
          <circle cx={r.cx} cy={r.cy} r={r.name === highlight ? 4 : 2.5} fill={r.name === highlight ? accent : stroke}/>
        </g>
      ))}
      <g fontFamily="IBM Plex Mono, monospace" fontSize="10" fill={stroke}>
        {regions.map(r => (
          <text key={r.id} x={r.cx + 8} y={r.cy + 3} opacity={r.name === highlight ? 1 : 0.6}>
            {r.name}
          </text>
        ))}
        <text x="10" y="14" opacity="0.65">ГЕОГРАФИЯ · ЮФО</text>
      </g>
    </svg>
  );
}

// ---- Frame node detail -------------------------------------------------
function FrameDetail({ stroke = STROKE, accent = ACCENT }) {
  return (
    <svg viewBox="0 0 240 200" style={{ width: '100%', height: 'auto', display: 'block' }} fill="none">
      {/* I-beam vertical */}
      <rect x="100" y="20" width="40" height="160" stroke={stroke} strokeWidth="1.2"/>
      <line x1="120" y1="20" x2="120" y2="180" stroke={stroke} strokeWidth="1.2"/>
      {/* horizontal beam */}
      <rect x="20" y="60" width="200" height="22" stroke={stroke} strokeWidth="1.2"/>
      <line x1="20" y1="71" x2="220" y2="71" stroke={stroke} strokeWidth="1"/>
      {/* gusset plate */}
      <path d="M100 60 L80 40 L100 40 Z" stroke={stroke} strokeWidth="1.2" fill="none"/>
      <path d="M140 60 L160 40 L140 40 Z" stroke={stroke} strokeWidth="1.2" fill="none"/>
      {/* bolts */}
      {[28, 36, 44, 52].map(y => (
        <g key={y}>
          <circle cx="106" cy={y} r="2" fill={stroke}/>
          <circle cx="134" cy={y} r="2" fill={stroke}/>
        </g>
      ))}
      {/* label */}
      <line x1="160" y1="40" x2="200" y2="20" stroke={stroke} strokeWidth="0.7"/>
      <text x="202" y="18" fontFamily="IBM Plex Mono, monospace" fontSize="10" fill={stroke}>УЗЕЛ A1</text>
      <line x1="120" y1="180" x2="160" y2="195" stroke={stroke} strokeWidth="0.7"/>
      <text x="162" y="195" fontFamily="IBM Plex Mono, monospace" fontSize="10" fill={stroke}>анкер · M24</text>
    </svg>
  );
}

// ---- Load icons --------------------------------------------------------
function SnowLoadIcon({ stroke = STROKE }) {
  return (
    <svg viewBox="0 0 80 80" width="56" height="56" fill="none">
      <path d="M10 50 L40 18 L70 50" stroke={stroke} strokeWidth="1.6"/>
      <line x1="10" y1="50" x2="70" y2="50" stroke={stroke} strokeWidth="1"/>
      {[20, 30, 40, 50, 60].map((x, i) => (
        <g key={i}>
          <line x1={x} y1="6" x2={x} y2="14" stroke={stroke} strokeWidth="1"/>
          <line x1={x - 3} y1="9" x2={x + 3} y2="11" stroke={stroke} strokeWidth="1"/>
        </g>
      ))}
    </svg>
  );
}
function WindLoadIcon({ stroke = STROKE }) {
  return (
    <svg viewBox="0 0 80 80" width="56" height="56" fill="none">
      <path d="M10 30 H50 Q60 30 60 22 Q60 14 52 14" stroke={stroke} strokeWidth="1.4"/>
      <path d="M10 45 H60 Q72 45 72 35" stroke={stroke} strokeWidth="1.4"/>
      <path d="M10 60 H44 Q52 60 52 52" stroke={stroke} strokeWidth="1.4"/>
      <rect x="10" y="68" width="60" height="2" fill={stroke}/>
    </svg>
  );
}
function SpanIcon({ stroke = STROKE }) {
  return (
    <svg viewBox="0 0 80 80" width="56" height="56" fill="none">
      <path d="M8 56 Q40 12 72 56" stroke={stroke} strokeWidth="1.6"/>
      <line x1="8" y1="60" x2="72" y2="60" stroke={stroke} strokeWidth="1"/>
      <line x1="8" y1="56" x2="8" y2="64" stroke={stroke} strokeWidth="1"/>
      <line x1="72" y1="56" x2="72" y2="64" stroke={stroke} strokeWidth="1"/>
      <text x="40" y="76" textAnchor="middle" fontFamily="IBM Plex Mono, monospace" fontSize="11" fill={stroke}>L</text>
    </svg>
  );
}
function HeightIcon({ stroke = STROKE }) {
  return (
    <svg viewBox="0 0 80 80" width="56" height="56" fill="none">
      <line x1="20" y1="8" x2="20" y2="68" stroke={stroke} strokeWidth="1.2"/>
      <line x1="14" y1="8" x2="26" y2="8" stroke={stroke} strokeWidth="1"/>
      <line x1="14" y1="68" x2="26" y2="68" stroke={stroke} strokeWidth="1"/>
      <rect x="36" y="20" width="34" height="48" stroke={stroke} strokeWidth="1.4"/>
      <text x="20" y="44" textAnchor="middle" fontFamily="IBM Plex Mono, monospace" fontSize="11" fill={stroke}>H</text>
    </svg>
  );
}

// ---- Industry icons (line/blueprint) -----------------------------------
function IndIcon({ kind, stroke = STROKE }) {
  const s = stroke;
  switch (kind) {
    case 'warehouse':
      return (
        <svg viewBox="0 0 80 80" width="56" height="56" fill="none">
          <path d="M8 32 L40 12 L72 32 V68 H8 Z" stroke={s} strokeWidth="1.4"/>
          <rect x="20" y="44" width="14" height="12" stroke={s}/>
          <rect x="46" y="44" width="14" height="12" stroke={s}/>
          <line x1="20" y1="68" x2="60" y2="68" stroke={s} strokeWidth="1.4"/>
        </svg>
      );
    case 'production':
      return (
        <svg viewBox="0 0 80 80" width="56" height="56" fill="none">
          <path d="M8 68 V36 L28 48 V36 L48 48 V36 L72 48 V68 Z" stroke={s} strokeWidth="1.4"/>
          <rect x="16" y="54" width="8" height="14" stroke={s}/>
          <rect x="36" y="54" width="8" height="14" stroke={s}/>
          <rect x="56" y="54" width="8" height="14" stroke={s}/>
          <line x1="14" y1="30" x2="20" y2="36" stroke={s}/>
          <line x1="20" y1="30" x2="14" y2="36" stroke={s}/>
        </svg>
      );
    case 'agro':
      return (
        <svg viewBox="0 0 80 80" width="56" height="56" fill="none">
          <path d="M8 60 Q40 16 72 60" stroke={s} strokeWidth="1.4"/>
          <line x1="8" y1="60" x2="72" y2="60" stroke={s}/>
          <path d="M30 60 V46 H50 V60" stroke={s}/>
          <path d="M38 70 Q40 64 42 70" stroke={s} strokeWidth="0.8"/>
        </svg>
      );
    case 'logistics':
      return (
        <svg viewBox="0 0 80 80" width="56" height="56" fill="none">
          <rect x="8" y="32" width="36" height="22" stroke={s} strokeWidth="1.4"/>
          <path d="M44 38 H60 L68 46 V54 H44 Z" stroke={s} strokeWidth="1.4"/>
          <circle cx="22" cy="58" r="5" stroke={s}/>
          <circle cx="56" cy="58" r="5" stroke={s}/>
          <line x1="8" y1="20" x2="44" y2="20" stroke={s} strokeDasharray="2 3"/>
        </svg>
      );
    case 'aviation':
      return (
        <svg viewBox="0 0 80 80" width="56" height="56" fill="none">
          <path d="M8 60 Q40 18 72 60" stroke={s} strokeWidth="1.4"/>
          <line x1="8" y1="60" x2="72" y2="60" stroke={s}/>
          <path d="M40 50 L30 56 L40 56 L50 56 L40 50 Z M40 50 V44" stroke={s}/>
          <line x1="40" y1="52" x2="40" y2="60" stroke={s}/>
        </svg>
      );
    case 'tech':
      return (
        <svg viewBox="0 0 80 80" width="56" height="56" fill="none">
          <rect x="10" y="34" width="60" height="28" stroke={s} strokeWidth="1.4"/>
          <path d="M14 34 L26 22 H54 L66 34" stroke={s} strokeWidth="1.4"/>
          <circle cx="40" cy="48" r="6" stroke={s}/>
          <line x1="40" y1="42" x2="40" y2="54" stroke={s} strokeWidth="0.8"/>
          <line x1="34" y1="48" x2="46" y2="48" stroke={s} strokeWidth="0.8"/>
        </svg>
      );
    case 'sport':
      return (
        <svg viewBox="0 0 80 80" width="56" height="56" fill="none">
          <path d="M8 58 Q40 22 72 58" stroke={s} strokeWidth="1.4"/>
          <line x1="8" y1="58" x2="72" y2="58" stroke={s}/>
          <circle cx="40" cy="50" r="6" stroke={s}/>
          <path d="M34 50 L46 50 M40 44 L40 56" stroke={s} strokeWidth="0.8"/>
        </svg>
      );
    case 'retail':
      return (
        <svg viewBox="0 0 80 80" width="56" height="56" fill="none">
          <path d="M14 28 H66 L62 60 H18 Z" stroke={s} strokeWidth="1.4"/>
          <path d="M22 28 V20 H58 V28" stroke={s}/>
          <line x1="28" y1="40" x2="52" y2="40" stroke={s} strokeWidth="0.8"/>
        </svg>
      );
    default: return null;
  }
}

// Expose
Object.assign(window, {
  Logo, ArchedHangar, StraightHangar, CrossSection, FloorPlan, YufoMap, FrameDetail,
  SnowLoadIcon, WindLoadIcon, SpanIcon, HeightIcon, IndIcon
});
