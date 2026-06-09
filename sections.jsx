/* eslint-disable */
// СКАнгар — секции лендинга

const { useState, useEffect, useMemo, useRef } = React;

// Yandex.Metrika goals
function ymGoal(goalName) {
  if (typeof window !== 'undefined' && typeof window.ym === 'function') {
    window.ym(109449297, 'reachGoal', goalName);
  }
}

function ymGoals(...goalNames) {
  goalNames.forEach(ymGoal);
}


// Site integrations: form delivery and Telegram bot URLs.
// Для реальной отправки заявок используется api/send-lead.php.
const SKANGAR_CONFIG = window.SKANGAR_CONFIG || {
  leadEndpoint: 'api/send-lead.php',
  telegramBotUrl: 'https://t.me/skangar_bot'
};

function getTelegramBotUrl(start = 'site_lead') {
  const base = (SKANGAR_CONFIG.telegramBotUrl || 'https://t.me/skangar_bot').replace(/\?.*$/, '');
  return `${base}?start=${encodeURIComponent(start)}`;
}

async function sendLead(payload) {
  const endpoint = SKANGAR_CONFIG.leadEndpoint || 'api/send-lead.php';
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      ...payload,
      page: window.location.href,
      referrer: document.referrer || '',
      createdAt: new Date().toISOString()
    })
  });

  let data = {};
  try { data = await response.json(); } catch (e) {}
  if (!response.ok || data.ok === false) {
    throw new Error(data.error || 'Не удалось отправить заявку');
  }
  return data;
}

function useVisibleGoal(goalName, threshold = 0.45) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;
    let fired = false;
    const observer = new IntersectionObserver((entries) => {
      const entry = entries[0];
      if (!fired && entry && entry.isIntersecting) {
        fired = true;
        ymGoal(goalName);
        observer.disconnect();
      }
    }, { threshold });
    observer.observe(el);
    return () => observer.disconnect();
  }, [goalName, threshold]);
  return ref;
}

// ============================================================
// NAV
// ============================================================
function Nav({ dark = false }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  const bg = dark ? '#1F2528' : '#F5F3EE';
  return (
    <header style={{
      position: 'sticky', top: 0, zIndex: 50,
      background: bg,
      borderBottom: scrolled ? `1px solid ${dark ? 'rgba(245,243,238,0.08)' : 'rgba(31,37,40,0.08)'}` : '1px solid transparent',
      transition: 'border-color 200ms ease'
    }}>
      <div className="shell" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 72 }}>
        <Logo color={dark ? '#F5F3EE' : '#1F2528'} />
        <nav className="hide-sm" style={{ display: 'flex', alignItems: 'center', gap: 28, fontSize: 14, color: dark ? 'rgba(245,243,238,0.78)' : 'rgba(31,37,40,0.78)' }}>
          {[
          ['Решения', 'solutions'],
          ['Калькулятор', 'calc'],
          ['Этапы', 'stages'],
          ['Объекты', 'objects'],
          ['Кейсы', 'cases'],
          ['FAQ', 'faq'],
          ['Контакты', 'contacts']].
          map(([l, id]) =>
          <a key={id} href={`#${id}`} style={{ color: 'inherit', textDecoration: 'none' }}>{l}</a>
          )}
        </nav>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <a href="tel:+79186333221" onClick={() => ymGoal('click_phone')} className="hide-sm mono" style={{ fontSize: 20, color: dark ? '#F5F3EE' : '#1F2528', textDecoration: 'none' }}>+7 (918) 633-32-21</a>
          <a href="#contacts" onClick={() => ymGoals('click_request_form', 'open_request_form')} className="btn btn-primary" style={{ fontSize: 14, padding: '12px 18px' }}>Оставить заявку</a>
        </div>
      </div>
    </header>);

}

// ============================================================
// HERO — 2 варианта
// ============================================================
function Hero({ variant = 'light' }) {
  const dark = variant === 'dark';
  return (
    <section id="top" className={dark ? 'dark' : ''} style={{ paddingTop: 56, paddingBottom: 80, background: dark ? '#1F2528' : '#F5F3EE' }}>
      <div className="shell">
        {/* Tech header bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: 24, marginBottom: 56, borderBottom: `1px solid ${dark ? 'rgba(245,243,238,0.1)' : 'rgba(31,37,40,0.1)'}` }}>
          <span className="tlabel">N° 01 · ПРОИЗВОДСТВО · ПРОЕКТ · МОНТАЖ</span>
          <span className="tlabel">КРАСНОДАР · ЮФО · 45°02'N 38°59'E</span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1.05fr 1fr', gap: 64, alignItems: 'start' }} className="hero-grid">
          {/* LEFT */}
          <div>
            <span className="tag" style={{ marginBottom: 24, display: 'inline-flex' }}>
              ПРОИЗВОДИТЕЛЬ В ЮФО · С 2014 ГОДА · 200+ ОБЪЕКТОВ СДАНО
            </span>
            <h1 style={{ marginTop: 20, marginBottom: 28, lineHeight: 1.02, letterSpacing: '-0.028em' }}>
              <span style={{ display: 'block' }}>Ангары под ключ</span>
              <span style={{ display: 'block', color: '#F26A21' }}>от 6 900 ₽/м².</span>
              <span style={{
                display: 'block',
                fontSize: '0.5em',
                fontWeight: 500,
                letterSpacing: '-0.012em',
                color: dark ? 'rgba(245,243,238,0.62)' : 'rgba(31,37,40,0.55)',
                marginTop: 18
              }}>
                Сдадим за 35–60 дней. Гарантия 10 лет.
              </span>
            </h1>
            <p style={{ fontSize: 18, lineHeight: 1.5, maxWidth: 560, color: dark ? 'rgba(245,243,238,0.78)' : 'rgba(31,37,40,0.72)', marginBottom: 28 }}>
              Проектируем, производим и монтируем арочные и прямостенные ангары
              для склада, производства, АПК, авиации и хранения техники.
              Один подрядчик от расчёта нагрузок до сдачи объекта
              с исполнительной документацией.
            </p>

            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 36px', display: 'flex', flexDirection: 'column', gap: 10, maxWidth: 560 }}>
              {[
              'Фиксированная цена в договоре — без удорожаний по ходу работ',
              'Расчёт стоимости и техническое решение за 30 минут',
              'Собственное производство в Краснодаре — без посредников'].
              map((t) =>
              <li key={t} style={{
                display: 'grid', gridTemplateColumns: '20px 1fr', gap: 12,
                fontSize: 15, color: dark ? 'rgba(245,243,238,0.86)' : 'rgba(31,37,40,0.82)',
                lineHeight: 1.45
              }}>
                  <svg width="18" height="18" viewBox="0 0 18 18" style={{ marginTop: 4, flexShrink: 0 }}>
                    <path d="M2 9 L7 14 L16 4" stroke="#F26A21" strokeWidth="2" fill="none" />
                  </svg>
                  <span>{t}</span>
                </li>
              )}
            </ul>

            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 14, alignItems: 'center' }}>
              <a href="#contacts" onClick={() => ymGoals('click_request_form', 'open_request_form')} className="btn btn-primary">
                Получить расчёт за 30 минут
                <svg className="btn-arrow" viewBox="0 0 18 18" fill="none"><path d="M3 9 H15 M10 4 L15 9 L10 14" stroke="currentColor" strokeWidth="1.6" /></svg>
              </a>
              <a href="#leadmagnet" onClick={() => ymGoals('click_get_catalog', 'open_catalog_form')} className="btn btn-secondary">Получить каталог PDF

              </a>
            </div>
            <div className="mono" style={{ fontSize: 12, color: dark ? 'rgba(245,243,238,0.45)' : 'rgba(31,37,40,0.45)', marginBottom: 48, letterSpacing: '0.04em' }}>
              Ответим в течение 30 минут в рабочее время · пн–пт 9:00–19:00 МСК
            </div>

            {/* Param row */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 28, paddingTop: 32, borderTop: `1px solid ${dark ? 'rgba(245,243,238,0.1)' : 'rgba(31,37,40,0.1)'}` }} className="hero-params">
              <div className="param">
                <div className="param-value mono">от 30</div>
                <div className="param-label">дней до запуска<br />работ после расчёта</div>
              </div>
              <div className="param">
                <div className="param-value mono">18×60</div>
                <div className="param-label">типовой пролёт<br />складского ангара, м</div>
              </div>
              <div className="param">
                <div className="param-value mono">до 12 м</div>
                <div className="param-label">высота в коньке<br />под технику и кран</div>
              </div>
              <div className="param">
                <div className="param-value mono">10 лет</div>
                <div className="param-label">гарантия на несущие<br />конструкции</div>
              </div>
            </div>
          </div>

          {/* RIGHT — blueprint card */}
          <div style={{
            background: dark ? '#2a3134' : '#FFFFFF',
            border: `1px solid ${dark ? 'rgba(245,243,238,0.12)' : 'rgba(31,37,40,0.12)'}`,
            padding: 24,
            position: 'relative'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <span className="tlabel">ЛИСТ 01 · ОБЩИЙ ВИД</span>
              <span className="tlabel">МАСШТАБ 1:200</span>
            </div>
            <div className="bp" style={{ padding: 12, border: `1px solid ${dark ? 'rgba(245,243,238,0.08)' : 'rgba(31,37,40,0.08)'}` }}>
              <ArchedHangar stroke={dark ? '#F5F3EE' : '#1F2528'} />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', borderTop: `1px solid ${dark ? 'rgba(245,243,238,0.12)' : 'rgba(31,37,40,0.12)'}`, marginTop: 16 }}>
              {[
              ['ПРОЛЁТ', '24 м'],
              ['ВЫСОТА', '9 м'],
              ['ДЛИНА', '60 м']].
              map(([k, v]) =>
              <div key={k} style={{ padding: '14px 12px', borderRight: `1px solid ${dark ? 'rgba(245,243,238,0.12)' : 'rgba(31,37,40,0.12)'}` }}>
                  <div className="tlabel">{k}</div>
                  <div className="mono" style={{ fontSize: 18, fontWeight: 600, marginTop: 4 }}>{v}</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <style>{`
        @media (max-width: 960px) {
          .hero-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
          .hero-params { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>
    </section>);

}

// ============================================================
// INDUSTRIES
// ============================================================
function Industries() {
  const items = [
  { k: 'warehouse', t: 'Склад', s: 'Хранение, обработка, отгрузка. Высота под стеллаж до 12 м.', dims: '18 × 60 м' },
  { k: 'production', t: 'Производство', s: 'Цех, сборочные линии, монтажные площадки.', dims: '24 × 72 м' },
  { k: 'agro', t: 'АПК и сельхоз', s: 'Зернохранилище, овощехранилище, навесы, фермы.', dims: '21 × 84 м' },
  { k: 'tech', t: 'Хранение техники', s: 'Гаражи под спецтехнику, машинно-тракторный парк.', dims: '18 × 48 м' },
  { k: 'logistics', t: 'Логистика', s: 'СВХ, кросс-докинг, площадки под фуры с воротами.', dims: '24 × 96 м' },
  { k: 'aviation', t: 'Авиация', s: 'Ангары под МВЛ, БПЛА, сервисные комплексы.', dims: '30 × 36 м' },
  { k: 'sport', t: 'Спорт-объекты', s: 'Манежи, крытые корты, ледовые арены.', dims: '36 × 60 м' },
  { k: 'retail', t: 'Торговля', s: 'Автосалоны, склады-магазины, павильоны.', dims: '18 × 36 м' }];

  return (
    <section id="solutions" className="sec">
      <div className="shell">
        <div className="sec-head">
          <div className="left">
            <span className="tag">N° 02 · НАЗНАЧЕНИЕ ОБЪЕКТА</span>
            <h2>Подбираем габариты, конструкцию и комплектацию<br />под назначение объекта.</h2>
          </div>
          <div className="right">
            Тип, пролёт, высоту, ворота и материал кровли подбираем под задачу,
            регион и режим эксплуатации.
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 0, border: '1px solid var(--border)' }} className="ind-grid">
          {items.map((x, i) =>
          <div key={x.k} style={{
            padding: 28,
            borderRight: i % 4 !== 3 ? '1px solid var(--border)' : 'none',
            borderBottom: i < 4 ? '1px solid var(--border)' : 'none',
            background: 'var(--concrete)',
            display: 'flex', flexDirection: 'column', gap: 16, minHeight: 220,
            cursor: 'pointer', transition: 'background 150ms ease'
          }}
          onMouseEnter={(e) => e.currentTarget.style.background = 'var(--steel)'}
          onMouseLeave={(e) => e.currentTarget.style.background = 'var(--concrete)'}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <IndIcon kind={x.k} />
                <span className="tlabel mono">{String(i + 1).padStart(2, '0')}</span>
              </div>
              <div>
                <h3 style={{ marginBottom: 6 }}>{x.t}</h3>
                <p style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.4 }}>{x.s}</p>
              </div>
              <div className="mono" style={{ marginTop: 'auto', fontSize: 13, color: 'var(--graphite)', borderTop: '1px solid var(--border)', paddingTop: 12 }}>
                Типовой размер · <b>{x.dims}</b>
              </div>
            </div>
          )}
        </div>
      </div>
      <style>{`
        @media (max-width: 960px) { .ind-grid { grid-template-columns: repeat(2, 1fr) !important; } .ind-grid > div { border-right: 1px solid var(--border) !important; border-bottom: 1px solid var(--border) !important; } }
        @media (max-width: 560px) { .ind-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>);

}

// ============================================================
// STATS BAND
// ============================================================
function StatsBand() {
  const items = [
  ['1', 'подрядчик от расчёта нагрузок до сдачи объекта'],
  ['—40°…+50°', 'эксплуатация в климате ЮФО и Юга России'],
  ['III–V', 'снеговые районы СНиП — расчёт под регион'],
  ['Ø 0,7 мм', 'оцинкованный профиль кровли с покрытием']];

  return (
    <section className="dark sec-sm">
      <div className="shell">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 32 }} className="stats-grid">
          {items.map(([v, l], i) =>
          <div key={i} className="param">
              <div className="param-value mono" style={{ color: '#F5F3EE' }}>{v}</div>
              <div className="param-label">{l}</div>
            </div>
          )}
        </div>
      </div>
      <style>{`@media (max-width: 720px) { .stats-grid { grid-template-columns: repeat(2, 1fr) !important; } }`}</style>
    </section>);

}

// ============================================================
// CALCULATOR
// ============================================================
function Calculator() {
  const [type, setType] = useState('arch');
  const [width, setWidth] = useState(24);
  const [length, setLength] = useState(60);
  const [height, setHeight] = useState(8);
  const [purpose, setPurpose] = useState('Склад');
  const [region, setRegion] = useState('Краснодарский край');

  const area = width * length;

  // base price per m2 (orientational)
  const baseByType = { arch: 7800, straight: 9600 };
  const purposeFactor = { 'Склад': 1.0, 'Производство': 1.12, 'АПК': 0.94, 'Логистика': 1.05, 'Авиация': 1.18, 'Хранение техники': 0.96, 'Спорт-объект': 1.15 };
  const snowByRegion = { 'Краснодарский край': 1.0, 'Ростовская обл.': 1.05, 'Ставропольский': 1.04, 'Волгоградская': 1.08, 'Астраханская': 1.02, 'Республика Адыгея': 1.0, 'Крым': 1.0 };
  const heightFactor = 1 + Math.max(0, height - 6) * 0.025;

  const pricePerM2 = Math.round(baseByType[type] * (purposeFactor[purpose] || 1) * (snowByRegion[region] || 1) * heightFactor / 100) * 100;
  const total = Math.round(pricePerM2 * area / 1000) * 1000;
  const term = Math.max(35, Math.round(area / 30 + 22));

  return (
    <section id="calc" className="sec" style={{ background: 'var(--steel)' }}>
      <div className="shell">
        <div className="sec-head" style={{ borderColor: 'rgba(31,37,40,0.18)' }}>
          <div className="left">
            <span className="tag">N° 03 · РАСЧЁТ СТОИМОСТИ</span>
            <h2>Калькулятор: ориентир по стоимости<br />и сроку запуска работ.</h2>
          </div>
          <div className="right">
            Базовый расчёт по типу, размеру, назначению и снеговому району.
            Точная стоимость — после расчёта нагрузок и ТЗ.
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: 0, background: 'var(--concrete)', border: '1px solid rgba(31,37,40,0.18)' }} className="calc-grid">
          {/* CONTROLS */}
          <div style={{ padding: 36, borderRight: '1px solid var(--border)' }} className="calc-controls">
            <div className="field" style={{ marginBottom: 24 }}>
              <label>Тип конструкции</label>
              <div className="seg" style={{ alignSelf: 'start' }}>
                <button className={type === 'arch' ? 'active' : ''} onClick={() => setType('arch')}>Арочный</button>
                <button className={type === 'straight' ? 'active' : ''} onClick={() => setType('straight')}>Прямостенный</button>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 20, marginBottom: 24 }}>
              <SliderField label="Пролёт, м" min={9} max={48} value={width} onChange={setWidth} />
              <SliderField label="Длина, м" min={12} max={120} value={length} onChange={setLength} />
              <SliderField label="Высота, м" min={4} max={14} value={height} onChange={setHeight} />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 24 }}>
              <div className="field">
                <label>Назначение</label>
                <select value={purpose} onChange={(e) => setPurpose(e.target.value)}>
                  {Object.keys(purposeFactor).map((p) => <option key={p}>{p}</option>)}
                </select>
              </div>
              <div className="field">
                <label>Регион (снеговая нагрузка)</label>
                <select value={region} onChange={(e) => setRegion(e.target.value)}>
                  {Object.keys(snowByRegion).map((p) => <option key={p}>{p}</option>)}
                </select>
              </div>
            </div>

            {/* preview */}
            <div className="bp" style={{ padding: 12, border: '1px solid var(--border)', background: '#FFFFFF' }}>
              <CrossSection type={type} width={width} height={height} />
            </div>
          </div>

          {/* RESULT */}
          <div style={{ background: 'var(--graphite)', color: 'var(--concrete)', padding: 36, display: 'flex', flexDirection: 'column' }} className="calc-result">
            <div className="tlabel" style={{ color: 'rgba(245,243,238,0.55)' }}>ОРИЕНТИР ПО ТЗ</div>

            <div style={{ marginTop: 28, marginBottom: 28, paddingBottom: 28, borderBottom: '1px solid rgba(245,243,238,0.14)' }}>
              <div style={{ fontSize: 13, color: 'rgba(245,243,238,0.6)', marginBottom: 8 }}>Итого, ориентир</div>
              <div className="mono" style={{ fontSize: 48, fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1 }}>
                {total.toLocaleString('ru-RU')} <span style={{ fontSize: 24, color: 'rgba(245,243,238,0.6)' }}>₽</span>
              </div>
              <div style={{ marginTop: 8, fontSize: 13, color: 'rgba(245,243,238,0.6)' }}>≈ <span className="mono">{pricePerM2.toLocaleString('ru-RU')} ₽/м²</span> · площадь <span className="mono">{area} м²</span></div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 28 }}>
              <div>
                <div style={{ fontSize: 13, color: 'rgba(245,243,238,0.6)' }}>Запуск работ</div>
                <div className="mono" style={{ fontSize: 28, fontWeight: 600, marginTop: 4 }}>от {term} дн.</div>
              </div>
              <div>
                <div style={{ fontSize: 13, color: 'rgba(245,243,238,0.6)' }}>Гарантия</div>
                <div className="mono" style={{ fontSize: 28, fontWeight: 600, marginTop: 4 }}>10 лет</div>
              </div>
            </div>

            <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: 14, color: 'rgba(245,243,238,0.78)', display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 28 }}>
              {['Проектирование и расчёт нагрузок',
              'Производство металлоконструкций',
              'Доставка по ЮФО',
              'Монтаж на площадке',
              'Сдача с исполнительной документацией'].map((t) =>
              <li key={t} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                  <svg width="14" height="14" viewBox="0 0 14 14" style={{ flexShrink: 0, marginTop: 4 }}><path d="M2 7 L6 11 L12 3" stroke="#F26A21" strokeWidth="1.8" fill="none" /></svg>
                  {t}
                </li>
              )}
            </ul>

            <a href="#contacts" onClick={() => ymGoals('click_request_form', 'open_request_form')} className="btn btn-primary" style={{ alignSelf: 'flex-start', marginTop: 'auto' }}>
              Получить КП
              <svg className="btn-arrow" viewBox="0 0 18 18" fill="none"><path d="M3 9 H15 M10 4 L15 9 L10 14" stroke="currentColor" strokeWidth="1.6" /></svg>
            </a>
          </div>
        </div>
      </div>
      <style>{`
        @media (max-width: 960px) { .calc-grid { grid-template-columns: 1fr !important; } .calc-controls { border-right: 0 !important; border-bottom: 1px solid var(--border); } }
        @media (max-width: 560px) { .calc-controls > div[style*="grid-template-columns"] { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>);

}

function SliderField({ label, min, max, value, onChange }) {
  return (
    <div className="field">
      <label>{label}</label>
      <div className="mono" style={{ fontSize: 24, fontWeight: 600, lineHeight: 1, marginBottom: 4 }}>{value}</div>
      <input type="range" min={min} max={max} value={value} onChange={(e) => onChange(+e.target.value)} style={{
        appearance: 'none', WebkitAppearance: 'none', background: 'transparent', padding: 0, height: 24
      }} />
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: 'var(--muted)' }} className="mono">
        <span>{min}</span><span>{max}</span>
      </div>
    </div>);

}

// ============================================================
// SERVICES (3 stages)
// ============================================================
function Services() {
  return (
    <section className="sec">
      <div className="shell">
        <div className="sec-head">
          <div className="left">
            <span className="tag">N° 04 · СОСТАВ РАБОТ</span>
            <h2>Один подрядчик. Три этапа.<br />Прозрачная ответственность.</h2>
          </div>
          <div className="right">
            Не передаём проект между подрядчиками. Проектирование, производство
            и монтаж — внутри одной команды.
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 0, border: '1px solid var(--border)' }} className="srv-grid">
          {[
          {
            n: '01', t: 'Проектирование', s: 'Расчёт нагрузок и КМ',
            items: ['Анализ ТЗ и геологии', 'Снеговая, ветровая, ветр. пульс', 'Подбор сечений и узлов', 'Раздел КМ / КМД'],
            viz: 'plan'
          },
          {
            n: '02', t: 'Производство', s: 'Собственный цех в Краснодаре',
            items: ['Лазерный раскрой и сварка', 'Контроль геометрии узлов', 'Огрунтовка / окраска', 'Маркировка по КМД'],
            viz: 'detail'
          },
          {
            n: '03', t: 'Монтаж', s: 'Сдача с исполнительной документацией',
            items: ['Доставка по ЮФО', 'Сборка по графику', 'Промежуточные акты', 'Гарантия 10 лет на каркас'],
            viz: 'arch'
          }].
          map((s, i) =>
          <div key={s.n} style={{ padding: 32, borderRight: i < 2 ? '1px solid var(--border)' : 'none', background: 'var(--concrete)', display: 'flex', flexDirection: 'column' }}>
              <div className="mono" style={{ fontSize: 12, color: 'var(--muted)', letterSpacing: '0.1em' }}>ЭТАП {s.n}</div>
              <h3 style={{ marginTop: 12, marginBottom: 4, fontSize: 26, fontWeight: 600 }}>{s.t}</h3>
              <div style={{ fontSize: 14, color: 'var(--muted)', marginBottom: 24 }}>{s.s}</div>

              <div className="bp" style={{ padding: 8, border: '1px solid var(--border)', background: '#FFFFFF', marginBottom: 24 }}>
                {s.viz === 'plan' && <FloorPlan />}
                {s.viz === 'detail' && <FrameDetail />}
                {s.viz === 'arch' && <CrossSection type="arch" width={24} height={9} label={false} />}
              </div>

              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10, fontSize: 14, marginTop: 'auto' }}>
                {s.items.map((t) =>
              <li key={t} style={{ display: 'flex', gap: 12 }}>
                    <span className="mono" style={{ color: 'var(--muted)', minWidth: 24 }}>0{s.items.indexOf(t) + 1}</span>
                    {t}
                  </li>
              )}
              </ul>
            </div>
          )}
        </div>
      </div>
      <style>{`@media (max-width: 960px) { .srv-grid { grid-template-columns: 1fr !important; } .srv-grid > div { border-right: 0 !important; border-bottom: 1px solid var(--border); } }`}</style>
    </section>);

}

// ============================================================
// CONFIGURATOR
// ============================================================
function Configurator() {
  const [type, setType] = useState('arch');
  const [width, setWidth] = useState(24);
  const [length, setLength] = useState(60);
  const [height, setHeight] = useState(8);
  const [opts, setOpts] = useState({ insulation: false, crane: false, gates: 1, doors: 1, floor: false });

  const toggle = (k) => setOpts((o) => ({ ...o, [k]: !o[k] }));
  const setN = (k, v) => setOpts((o) => ({ ...o, [k]: v }));

  return (
    <section id="config" className="sec dark">
      <div className="shell">
        <div className="sec-head">
          <div className="left">
            <span className="tag">N° 05 · КОНФИГУРАТОР</span>
            <h2>Соберите ангар под вашу задачу.<br />Параметры — в спецификацию.</h2>
          </div>
          <div className="right">
            Конструкция, размеры, проёмы и опции. Полученная спецификация
            уходит в работу инженеру и формирует ТЗ для КП.
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.1fr', gap: 0, border: '1px solid rgba(245,243,238,0.14)' }} className="cfg-grid">
          {/* preview */}
          <div style={{ padding: 36, borderRight: '1px solid rgba(245,243,238,0.14)' }} className="cfg-preview">
            <div className="bp" style={{ padding: 16, background: 'var(--graphite-2)', border: '1px solid rgba(245,243,238,0.08)', marginBottom: 16 }}>
              {type === 'arch' ?
              <ArchedHangar stroke="#F5F3EE" /> :
              <StraightHangar stroke="#F5F3EE" />}
            </div>
            <div className="bp" style={{ padding: 16, background: 'var(--graphite-2)', border: '1px solid rgba(245,243,238,0.08)' }}>
              <CrossSection type={type} width={width} height={height} stroke="#F5F3EE" />
            </div>
          </div>

          {/* spec */}
          <div style={{ padding: 36 }} className="cfg-spec">
            <div className="tlabel">СПЕЦИФИКАЦИЯ · ВЕРСИЯ  {Math.floor(Math.random() * 90 + 10)}.0</div>

            <h3 style={{ fontSize: 22, marginTop: 16, marginBottom: 24 }}>Параметры конструкции</h3>

            <div className="field" style={{ marginBottom: 24 }}>
              <label>Тип</label>
              <div className="seg" style={{ alignSelf: 'start' }}>
                <button className={type === 'arch' ? 'active' : ''} onClick={() => setType('arch')}>Арочный</button>
                <button className={type === 'straight' ? 'active' : ''} onClick={() => setType('straight')}>Прямостенный</button>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 28 }}>
              <SliderField label="Пролёт, м" min={9} max={48} value={width} onChange={setWidth} />
              <SliderField label="Длина, м" min={12} max={120} value={length} onChange={setLength} />
              <SliderField label="Высота, м" min={4} max={14} value={height} onChange={setHeight} />
            </div>

            <h3 style={{ fontSize: 18, marginTop: 8, marginBottom: 16 }}>Опции</h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 0, border: '1px solid rgba(245,243,238,0.14)' }}>
              <OptToggle on={opts.insulation} onChange={() => toggle('insulation')} label="Утепление (сэндвич / минвата)" detail="K = 0,3 Вт/м²·°C" />
              <OptToggle on={opts.crane} onChange={() => toggle('crane')} label="Под кран-балку до 5 т" detail="Усиление колонн и подкр. балок" />
              <OptToggle on={opts.floor} onChange={() => toggle('floor')} label="Бетонный пол с топпингом" detail="200 мм, M350, армированный" />
              <OptCounter value={opts.gates} onChange={(v) => setN('gates', v)} label="Секционные ворота 4×4 м" min={0} max={6} />
              <OptCounter value={opts.doors} onChange={(v) => setN('doors', v)} label="Эвакуационные двери" min={1} max={8} />
            </div>

            <div style={{ marginTop: 28, paddingTop: 24, borderTop: '1px solid rgba(245,243,238,0.14)', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
              <div>
                <div className="tlabel">ПЛОЩАДЬ</div>
                <div className="mono" style={{ fontSize: 22, fontWeight: 600 }}>{width * length} м²</div>
              </div>
              <div>
                <div className="tlabel">ВЕС КАРКАСА</div>
                <div className="mono" style={{ fontSize: 22, fontWeight: 600 }}>~{Math.round(width * length * 0.045)} т</div>
              </div>
              <div>
                <div className="tlabel">ОПЦИИ</div>
                <div className="mono" style={{ fontSize: 22, fontWeight: 600 }}>{Object.values(opts).filter((v) => v && v !== 0).length}</div>
              </div>
            </div>

            <a href="#leadmagnet" onClick={() => ymGoals('click_get_catalog', 'open_catalog_form')} className="btn btn-primary" style={{ marginTop: 28 }}>
              Сохранить спецификацию и получить КП
              <svg className="btn-arrow" viewBox="0 0 18 18" fill="none"><path d="M3 9 H15 M10 4 L15 9 L10 14" stroke="currentColor" strokeWidth="1.6" /></svg>
            </a>
          </div>
        </div>
      </div>
      <style>{`@media (max-width: 960px) { .cfg-grid { grid-template-columns: 1fr !important; } .cfg-preview { border-right: 0 !important; border-bottom: 1px solid rgba(245,243,238,0.14); } }`}</style>
    </section>);

}

function OptToggle({ on, onChange, label, detail }) {
  return (
    <button onClick={onChange} style={{
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      padding: '16px 20px',
      background: 'transparent',
      border: 0,
      borderBottom: '1px solid rgba(245,243,238,0.1)',
      cursor: 'pointer',
      textAlign: 'left',
      color: '#F5F3EE',
      fontFamily: 'inherit'
    }}>
      <div>
        <div style={{ fontSize: 15, fontWeight: 500 }}>{label}</div>
        <div style={{ fontSize: 12, color: 'rgba(245,243,238,0.55)', marginTop: 2 }} className="mono">{detail}</div>
      </div>
      <div style={{
        width: 44, height: 24,
        background: on ? '#F26A21' : 'transparent',
        border: '1px solid ' + (on ? '#F26A21' : 'rgba(245,243,238,0.3)'),
        position: 'relative',
        transition: 'all 150ms ease'
      }}>
        <div style={{ position: 'absolute', top: 3, left: on ? 23 : 3, width: 16, height: 16, background: on ? '#fff' : '#F5F3EE', transition: 'left 150ms ease' }} />
      </div>
    </button>);

}
function OptCounter({ value, onChange, label, min, max }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 20px', borderBottom: '1px solid rgba(245,243,238,0.1)' }}>
      <div style={{ fontSize: 15, fontWeight: 500 }}>{label}</div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <button onClick={() => onChange(Math.max(min, value - 1))} style={{ width: 28, height: 28, background: 'transparent', border: '1px solid rgba(245,243,238,0.3)', color: '#F5F3EE', cursor: 'pointer', fontFamily: 'inherit' }}>−</button>
        <span className="mono" style={{ minWidth: 28, textAlign: 'center', fontSize: 18, fontWeight: 600 }}>{value}</span>
        <button onClick={() => onChange(Math.min(max, value + 1))} style={{ width: 28, height: 28, background: 'transparent', border: '1px solid rgba(245,243,238,0.3)', color: '#F5F3EE', cursor: 'pointer', fontFamily: 'inherit' }}>+</button>
      </div>
    </div>);

}

// ============================================================
// YOUTUBE OBJECTS
// ============================================================
function YoutubeObjects() {
  // Real videos from @skangar.ru.23. Placeholder = null → blueprint preview.
  const videos = [
  { ytId: 'j0sZS0vtZOs', title: 'Склад 18×60 м · Краснодар', meta: 'Монтаж каркаса', tag: 'Склад' },
  { ytId: 'V79-4MpvLgw', title: 'Агроангар 21×84 м · Кубань', meta: 'Сдача объекта', tag: 'АПК' },
  { ytId: 'Gt-ujCzFin8', title: 'Производственный цех 24×72 м', meta: 'Установка ферм покрытия', tag: 'Производство' },
  { ytId: 'qIztB4rPo4M', title: 'Логистический терминал', meta: 'Кросс-докинг под фуры', tag: 'Логистика' }];

  const [active, setActive] = useState(null);

  useEffect(() => {
    if (!active) return;
    const onKey = (e) => {if (e.key === 'Escape') setActive(null);};
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {document.body.style.overflow = '';window.removeEventListener('keydown', onKey);};
  }, [active]);

  return (
    <section id="objects" className="sec">
      <div className="shell">
        <div className="sec-head">
          <div className="left">
            <span className="tag">N° 05 · ОБЪЕКТЫ В РАБОТЕ</span>
            <h2>Видео со стройплощадок:<br />как мы строим, что сдаём.</h2>
          </div>
          <div className="right">
            Хроника объектов с YouTube-канала 
            <a href="https://www.youtube.com/channel/UC3jGbzwbzZiYYXD9CJ5UUfA" target="_blank" rel="noreferrer" style={{ color: 'var(--graphite)', textDecoration: 'underline' }}>@skangar.ru.23</a>.
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 24 }} className="vid-grid">
          {videos.map((v, i) => {
            const realVideo = !!v.ytId;
            const onClick = (e) => {
              if (realVideo) {e.preventDefault();setActive(v);}
            };
            return (
              <a key={i} href={realVideo ? `https://youtu.be/${v.ytId}` : 'https://www.youtube.com/channel/UC3jGbzwbzZiYYXD9CJ5UUfA'} onClick={onClick} target="_blank" rel="noreferrer" style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
                <div style={{ position: 'relative', aspectRatio: '16 / 9', background: 'var(--graphite)', overflow: 'hidden', border: '1px solid var(--border)' }}>
                  {realVideo ?
                  <>
                      <img src={`https://img.youtube.com/vi/${v.ytId}/maxresdefault.jpg`}
                    alt={v.title}
                    onError={(e) => {e.currentTarget.src = `https://img.youtube.com/vi/${v.ytId}/hqdefault.jpg`;}}
                    style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', filter: 'saturate(0.9) contrast(1.02)' }} />
                      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(31,37,40,0.15) 0%, rgba(31,37,40,0.55) 100%)' }} />
                    </> :

                  <div className="bp" style={{ position: 'absolute', inset: 0, background: 'var(--graphite)' }}>
                      <div style={{ position: 'absolute', inset: 0, opacity: 0.18 }}>
                        {i % 2 === 0 ? <ArchedHangar stroke="#F5F3EE" /> : <StraightHangar stroke="#F5F3EE" />}
                      </div>
                      <div className="mono" style={{ position: 'absolute', top: '50%', left: 0, right: 0, transform: 'translateY(-50%)', textAlign: 'center', color: 'rgba(245,243,238,0.5)', fontSize: 11, letterSpacing: '0.1em' }}>СКОРО · СЪЁМКА В РАБОТЕ</div>
                    </div>
                  }
                  <div style={{
                    position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
                    width: 72, height: 72, background: realVideo ? 'rgba(242,106,33,0.98)' : 'rgba(242,106,33,0.5)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    transition: 'transform 200ms ease'
                  }}>
                    <svg width="22" height="22" viewBox="0 0 22 22"><path d="M5 3 L19 11 L5 19 Z" fill="#fff" /></svg>
                  </div>
                  <div style={{ position: 'absolute', top: 16, left: 16, background: 'rgba(31,37,40,0.85)', color: '#F5F3EE', padding: '6px 10px', fontSize: 12, letterSpacing: '0.06em' }} className="mono">{v.tag.toUpperCase()}</div>
                  
                </div>
                <div style={{ padding: '20px 4px 0' }}>
                  <h3 style={{ fontSize: 20, marginBottom: 4 }}>{v.title}</h3>
                  <div style={{ fontSize: 14, color: 'var(--muted)' }} className="mono">{v.meta}</div>
                </div>
              </a>);

          })}
        </div>

        {/* Modal player */}
        {active &&
        <div onClick={() => setActive(null)} style={{
          position: 'fixed', inset: 0, background: 'rgba(31,37,40,0.92)',
          zIndex: 100, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          padding: 32
        }}>
            <div onClick={(e) => e.stopPropagation()} style={{ width: '100%', maxWidth: 1200 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16, color: '#F5F3EE' }}>
                <div>
                  <div className="tlabel" style={{ color: 'rgba(245,243,238,0.55)' }}>{active.tag.toUpperCase()}</div>
                  <div style={{ fontSize: 20, fontWeight: 600, marginTop: 4 }}>{active.title}</div>
                </div>
                <button onClick={() => setActive(null)} style={{
                background: 'transparent', border: '1px solid rgba(245,243,238,0.3)', color: '#F5F3EE',
                width: 40, height: 40, cursor: 'pointer', fontFamily: 'inherit', fontSize: 18
              }} aria-label="Закрыть">×</button>
              </div>
              <div style={{ aspectRatio: '16 / 9', background: '#000' }}>
                <iframe
                src={`https://www.youtube.com/embed/${active.ytId}?autoplay=1&rel=0`}
                title={active.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{ width: '100%', height: '100%', border: 0 }} />
              </div>
            </div>
          </div>
        }
        <div style={{ marginTop: 32, display: 'flex', justifyContent: 'flex-end' }}>
          <a href="https://www.youtube.com/channel/UC3jGbzwbzZiYYXD9CJ5UUfA" target="_blank" rel="noreferrer" className="btn btn-secondary">
            Смотреть все видео на YouTube
            <svg className="btn-arrow" viewBox="0 0 18 18" fill="none"><path d="M3 9 H15 M10 4 L15 9 L10 14" stroke="currentColor" strokeWidth="1.6" /></svg>
          </a>
        </div>
      </div>
      <style>{`@media (max-width: 720px) { .vid-grid { grid-template-columns: 1fr !important; } }`}</style>
    </section>);

}

// ============================================================
// CASES with filter
// ============================================================
function Cases() {
  const all = [
  { id: 'k01', t: 'Склад под обработку заказов', loc: 'Краснодар', dim: '24 × 60 м', area: '1 440 м²', term: '48 дн.', cat: 'Склад', type: 'Прямостенный' },
  { id: 'k02', t: 'Зернохранилище с навесом', loc: 'Краснодарский край', dim: '21 × 84 м', area: '1 764 м²', term: '52 дн.', cat: 'АПК', type: 'Арочный' },
  { id: 'k03', t: 'Производственный цех с краном', loc: 'Ростов-на-Дону', dim: '24 × 72 м', area: '1 728 м²', term: '64 дн.', cat: 'Производство', type: 'Прямостенный' },
  { id: 'k04', t: 'Гараж под сельхозтехнику', loc: 'Ставропольский', dim: '18 × 48 м', area: '864 м²', term: '38 дн.', cat: 'Хранение техники', type: 'Арочный' },
  { id: 'k05', t: 'Кросс-докинг терминал', loc: 'Краснодар', dim: '24 × 96 м', area: '2 304 м²', term: '72 дн.', cat: 'Логистика', type: 'Прямостенный' },
  { id: 'k06', t: 'Овощехранилище', loc: 'Волгоградская', dim: '21 × 60 м', area: '1 260 м²', term: '46 дн.', cat: 'АПК', type: 'Арочный' }];

  const cats = ['Все', 'Склад', 'Производство', 'АПК', 'Логистика', 'Хранение техники'];
  const [filter, setFilter] = useState('Все');
  const items = filter === 'Все' ? all : all.filter((x) => x.cat === filter);

  return (
    <section id="cases" className="sec" style={{ background: 'var(--concrete-2)' }}>
      <div className="shell">
        <div className="sec-head" style={{ borderColor: 'rgba(31,37,40,0.18)' }}>
          <div className="left">
            <span className="tag">N° 06 · ОБЪЕКТЫ</span>
            <h2>Объекты в ЮФО: задача,<br />решение, результат.</h2>
          </div>
          <div className="right">
            Фильтр по отрасли. Подробные кейсы доступны после запроса.
          </div>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 32 }}>
          {cats.map((c) =>
          <button key={c} onClick={() => setFilter(c)} style={{
            padding: '8px 16px',
            background: filter === c ? 'var(--graphite)' : 'transparent',
            color: filter === c ? 'var(--concrete)' : 'var(--graphite)',
            border: '1px solid ' + (filter === c ? 'var(--graphite)' : 'var(--border-strong)'),
            cursor: 'pointer',
            fontFamily: 'inherit',
            fontSize: 13
          }}>{c}</button>
          )}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }} className="case-grid">
          {items.map((k) =>
          <div key={k.id} style={{ background: 'var(--concrete)', border: '1px solid var(--border)', padding: 24, display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span className="mono tlabel">{k.id.toUpperCase()}</span>
                <span className="mono tlabel">{k.cat.toUpperCase()}</span>
              </div>
              <div className="bp" style={{ margin: '16px 0', padding: 4, background: '#fff', border: '1px solid var(--border)' }}>
                <CrossSection type={k.type === 'Арочный' ? 'arch' : 'gable'} width={parseInt(k.dim)} height={9} label={false} />
              </div>
              <h3 style={{ fontSize: 18, marginBottom: 4 }}>{k.t}</h3>
              <div style={{ fontSize: 13, color: 'var(--muted)', marginBottom: 20 }}>{k.loc} · {k.type}</div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginTop: 'auto', borderTop: '1px solid var(--border)', paddingTop: 16 }}>
                <div>
                  <div className="tlabel">РАЗМЕР</div>
                  <div className="mono" style={{ fontSize: 14, fontWeight: 600 }}>{k.dim}</div>
                </div>
                <div>
                  <div className="tlabel">ПЛОЩАДЬ</div>
                  <div className="mono" style={{ fontSize: 14, fontWeight: 600 }}>{k.area}</div>
                </div>
                <div>
                  <div className="tlabel">СРОК</div>
                  <div className="mono" style={{ fontSize: 14, fontWeight: 600 }}>{k.term}</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <style>{`@media (max-width: 960px) { .case-grid { grid-template-columns: repeat(2, 1fr) !important; } } @media (max-width: 560px) { .case-grid { grid-template-columns: 1fr !important; } }`}</style>
    </section>);

}

// ============================================================
// STAGES (process timeline)
// ============================================================
function Stages() {
  const items = [
  ['Заявка', 'Принимаем ТЗ или собираем его на встрече: назначение, регион, режим эксплуатации, нагрузки.', '1 день'],
  ['Расчёт', 'Подбираем тип, пролёт, высоту. Считаем нагрузки и ориентир по стоимости.', '2–5 дней'],
  ['КП и договор', 'Готовим коммерческое предложение и согласуем спецификацию. Подписываем договор.', '3–7 дней'],
  ['Проектирование', 'Раздел КМ, КМД. Готовим чертежи и спецификации для производства.', '14–21 день'],
  ['Производство', 'Собственный цех в Краснодаре: раскрой, сварка, грунтовка, маркировка по КМД.', '20–45 дней'],
  ['Монтаж и сдача', 'Доставка по ЮФО, сборка, исполнительная документация, гарантия 5 лет.', '20–45 дней']];

  return (
    <section id="stages" className="sec">
      <div className="shell">
        <div className="sec-head">
          <div className="left">
            <span className="tag">N° 07 · ЭТАПЫ РАБОТЫ</span>
            <h2>От заявки до сдачи объекта.<br />Понятные этапы и сроки, договор</h2>
          </div>
          <div className="right">
            Каждый этап закрываем актом или промежуточным документом —
            на стороне клиента нет «чёрного ящика».
          </div>
        </div>

        <div style={{ position: 'relative' }}>
          <div style={{ position: 'absolute', top: 32, left: 0, right: 0, height: 1, background: 'var(--border)' }} />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 0 }} className="stages-grid">
            {items.map(([t, d, term], i) =>
            <div key={t} style={{ position: 'relative', paddingTop: 56, paddingRight: 24 }}>
                <div style={{
                position: 'absolute', top: 22, left: 0,
                width: 20, height: 20,
                background: i === 0 ? '#F26A21' : 'var(--concrete)',
                border: '1px solid ' + (i === 0 ? '#F26A21' : 'var(--graphite)'),
                display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}>
                  <span className="mono" style={{ fontSize: 10, color: i === 0 ? '#fff' : 'var(--graphite)' }}>{i + 1}</span>
                </div>
                <h3 style={{ fontSize: 18, marginBottom: 8 }}>{t}</h3>
                <p style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.45, marginBottom: 16 }}>{d}</p>
                <div className="mono" style={{ fontSize: 13, fontWeight: 600, color: 'var(--graphite)' }}>{term}</div>
              </div>
            )}
          </div>
        </div>
      </div>
      <style>{`@media (max-width: 960px) { .stages-grid { grid-template-columns: repeat(2, 1fr) !important; gap: 32px 0 !important; } } @media (max-width: 560px) { .stages-grid { grid-template-columns: 1fr !important; } }`}</style>
    </section>);

}

// ============================================================
// LEAD MAGNET
// ============================================================
function LeadMagnet() {
  const sectionRef = useVisibleGoal('open_catalog_form');
  const [form, setForm] = useState({ name: '', phone: '', email: '', company: '' });
  const [agree, setAgree] = useState(false);
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const upd = (k, v) => {setForm((f) => ({ ...f, [k]: v }));setErrors((e) => ({ ...e, [k]: undefined }));};
  const submit = async (e) => {
    e.preventDefault();
    setSubmitError('');
    const er = {};
    if (!form.name.trim()) er.name = 'Укажите имя';
    if (!/^[\d+()\-\s]{10,}$/.test(form.phone)) er.phone = 'Укажите телефон';
    if (form.email && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) er.email = 'Неверный email';
    if (!agree) er.agree = 'Нужно согласие на обработку персональных данных';
    setErrors(er);
    if (Object.keys(er).length === 0) {
      try {
        setSending(true);
        await sendLead({
          formType: 'catalog_bot',
          formTitle: 'Каталог PDF через Telegram-бота',
          name: form.name,
          phone: form.phone,
          email: form.email,
          company: form.company
        });
        setSent(true);
        ymGoal('lead_catalog_bot');
      } catch (error) {
        setSubmitError('Заявка не отправилась. Пожалуйста, позвоните нам или напишите в Telegram.');
      } finally {
        setSending(false);
      }
    }
  };
  return (
    <section id="leadmagnet" ref={sectionRef} className="dark sec">
      <div className="shell">
        <div style={{ display: 'grid', gridTemplateColumns: '1.05fr 1fr', gap: 56, alignItems: 'start' }} className="lm-grid">
          <div>
            <span className="tag">N° 08 · ЛИД-МАГНИТ</span>
            <h2 style={{ marginTop: 18, marginBottom: 24 }}>
              Каталог типовых решений<br />2026 года.
            </h2>
            <p style={{ fontSize: 17, color: 'rgba(245,243,238,0.78)', maxWidth: 520, marginBottom: 32 }}>
              42 типовых ангара под склад, производство, АПК, логистику и технику.
              По каждому — размеры, нагрузки, состав работ и ориентир по стоимости в ЮФО.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 20, marginBottom: 32, maxWidth: 520 }}>
              {[
              ['42', 'типовых решения'],
              ['12 типов', 'нагрузок · СНиП'],
              ['7 отраслей', 'с примерами'],
              ['PDF · 38 стр.', 'через Telegram-бота']].
              map(([v, l], i) =>
              <div key={i} style={{ borderTop: '1px solid rgba(245,243,238,0.18)', paddingTop: 14 }}>
                  <div className="mono" style={{ fontSize: 22, fontWeight: 600 }}>{v}</div>
                  <div style={{ fontSize: 13, color: 'rgba(245,243,238,0.6)' }}>{l}</div>
                </div>
              )}
            </div>

            {/* Mini "PDF" preview */}
            <div style={{ display: 'flex', gap: 12 }}>
              {[1, 2, 3].map((i) =>
              <div key={i} style={{
                width: 96, height: 132, background: 'var(--concrete)',
                border: '1px solid rgba(245,243,238,0.18)',
                position: 'relative', overflow: 'hidden'
              }}>
                  <div style={{ padding: '8px 8px 0', fontSize: 8, color: 'var(--muted)' }} className="mono">КАТАЛОГ · {i}/3</div>
                  <div style={{ padding: 6, transform: 'scale(0.9)', transformOrigin: 'top left' }}>
                    {i === 1 && <CrossSection type="arch" width={24} height={9} label={false} />}
                    {i === 2 && <FloorPlan />}
                    {i === 3 && <CrossSection type="gable" width={30} height={10} label={false} />}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* FORM */}
          <form onSubmit={submit} style={{ background: 'var(--graphite-2)', border: '1px solid rgba(245,243,238,0.14)', padding: 32 }}>
            <div className="tlabel">ФОРМА · ПОЛУЧИТЬ PDF В TELEGRAM</div>
            <h3 style={{ fontSize: 22, marginTop: 12, marginBottom: 24 }}>Чтобы бесплатно получить каталог в Telegram-боте, заполните контактные данные:</h3>

            {sent ?
            <div style={{ padding: '36px 24px', textAlign: 'center', border: '1px dashed rgba(245,243,238,0.3)', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                {/* Telegram paper-plane in orange brand block */}
                <div style={{
                width: 56, height: 56, background: '#F26A21',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                marginBottom: 20
              }}>
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                    <path d="M21.5 3 L2 11 L9 13.5 L18 6.5 L11 14.5 L11 21 L14.5 16.5 L19 19 Z" fill="#fff" />
                  </svg>
                </div>
                <div style={{ fontSize: 20, fontWeight: 600, marginBottom: 10, color: '#F5F3EE' }}>Каталог готов.</div>
                <div style={{ fontSize: 14, color: 'rgba(245,243,238,0.72)', maxWidth: 360, lineHeight: 1.55, marginBottom: 24 }}>
                  Чтобы получить PDF и расчёт под ваш тип ангара, перейдите в&nbsp;бот.
                  Он пришлёт каталог в течение минуты.
                </div>
                <a
                href={getTelegramBotUrl('site_lead')}
                onClick={() => ymGoal('click_telegram_bot')}
                target="_blank"
                rel="noreferrer"
                className="btn btn-primary"
                style={{ justifyContent: 'center', width: '100%', maxWidth: 320 }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
                    <path d="M21.5 3 L2 11 L9 13.5 L18 6.5 L11 14.5 L11 21 L14.5 16.5 L19 19 Z" fill="currentColor" />
                  </svg>
                  Получить каталог в Telegram
                </a>
                <button
                onClick={() => setSent(false)}
                type="button"
                style={{
                  marginTop: 16, background: 'transparent', border: 0,
                  color: 'rgba(245,243,238,0.5)', fontSize: 13,
                  fontFamily: 'inherit', cursor: 'pointer', textDecoration: 'underline'
                }}>Заполнить ещё раз</button>
              </div> :

            <>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  <div className="field">
                    <label>Имя</label>
                    <input value={form.name} onChange={(e) => upd('name', e.target.value)} placeholder="Иван Петров" />
                    {errors.name && <span className="err">{errors.name}</span>}
                  </div>
                  <div className="field">
                    <label>Телефон</label>
                    <input value={form.phone} onChange={(e) => upd('phone', e.target.value)} placeholder="+7 ___ ___-__-__" />
                    {errors.phone && <span className="err">{errors.phone}</span>}
                  </div>
                  <div className="field">
                    <label>EMAIL </label>
                    <input value={form.email} onChange={(e) => upd('email', e.target.value)} placeholder="ivan@company.ru" />
                    {errors.email && <span className="err">{errors.email}</span>}
                  </div>
                  <div className="field">
                    <label>КОМПАНИЯ (ПО ЖЕЛАНИЮ)</label>
                    <input value={form.company} onChange={(e) => upd('company', e.target.value)} placeholder="ООО «Кубань-логистика»" />
                  </div>
                </div>
                <button type="submit" disabled={sending} className="btn btn-primary" style={{ marginTop: 24, width: '100%', justifyContent: 'center', opacity: agree && !sending ? 1 : 0.55 }}>
                  {sending ? 'Отправляем...' : 'Получить каталог · PDF'}
                  <svg className="btn-arrow" viewBox="0 0 18 18" fill="none"><path d="M3 9 H15 M10 4 L15 9 L10 14" stroke="currentColor" strokeWidth="1.6" /></svg>
                </button>
                <label style={{
                display: 'flex', gap: 12, alignItems: 'flex-start', marginTop: 16,
                fontSize: 12, color: 'rgba(245,243,238,0.7)', lineHeight: 1.45,
                cursor: 'pointer'
              }}>
                  <span style={{
                  position: 'relative', flexShrink: 0, width: 18, height: 18,
                  border: '1px solid ' + (errors.agree ? '#F26A21' : 'rgba(245,243,238,0.45)'),
                  background: agree ? '#F26A21' : 'transparent',
                  borderColor: agree ? '#F26A21' : errors.agree ? '#F26A21' : 'rgba(245,243,238,0.45)',
                  transition: 'all 120ms ease',
                  marginTop: 1
                }}>
                    {agree && <svg width="18" height="18" viewBox="0 0 18 18" style={{ position: 'absolute', top: -1, left: -1 }}><path d="M4 9 L8 13 L14 5" stroke="#fff" strokeWidth="2" fill="none" /></svg>}
                  </span>
                  <input type="checkbox" checked={agree} onChange={(e) => {setAgree(e.target.checked);setErrors((er) => ({ ...er, agree: undefined }));}} style={{ position: 'absolute', opacity: 0, pointerEvents: 'none' }} />
                  <span>
                    Я согласен на обработку персональных данных
                    в соответствии с 152-ФЗ и <a href="#" data-open-privacy style={{ color: '#F5F3EE', textDecoration: 'underline' }} onClick={(e) => e.stopPropagation()}>политикой конфиденциальности</a>.
                  </span>
                </label>
                {errors.agree && <span className="err" style={{ display: 'block', marginTop: 8 }}>{errors.agree}</span>}
                {submitError && <span className="err" style={{ display: 'block', marginTop: 8 }}>{submitError}</span>}
              </>
            }
          </form>
        </div>
      </div>
      <style>{`@media (max-width: 960px) { .lm-grid { grid-template-columns: 1fr !important; gap: 40px !important; } }`}</style>
    </section>);

}

// ============================================================
// FAQ
// ============================================================
function FAQ() {
  const items = [
  ['Чем арочный ангар отличается от прямостенного?', 'Арочный — полусфера или эллиптический профиль, проще и быстрее в монтаже, ниже стоимость на квадрат. Прямостенный (с фермами) — полезная высота вдоль всех стен, проще размещать стеллажи, краны и инженерные системы.'],
  ['Какой срок от заявки до сдачи?', 'От 30 дней — это срок запуска работ после согласования ТЗ и договора. Полный цикл (проектирование + производство + монтаж) для типового склада 18×60 м — 70–90 дней.'],
  ['Считаете ли вы снеговую и ветровую нагрузку под мой регион?', 'Да. Для каждого объекта в ЮФО считаем нагрузки по СП 20.13330: снеговой район III–V, ветровой район I–III, плюс коэффициент ветровой пульсации.'],
  ['Что входит в стоимость «под ключ»?', 'Проектирование (КМ/КМД), производство металлоконструкций, грунтовка/окраска, доставка по ЮФО, монтаж, исполнительная документация. Фундамент и инженерные сети — отдельная смета.'],
  ['Можно ли поставить кран-балку или мостовой кран?', 'Да. На этапе расчёта закладываем подкрановые балки и усиление колонн под грузоподъёмность от 1 до 20 т.'],
  ['Есть ли гарантия?', '5 лет на несущие конструкции, 2 года на ограждающие конструкции и узлы. Гарантию закрепляем договором.'],
  ['Работаете только в Краснодарском крае?', 'Основные объекты — ЮФО: Краснодарский край, Ростовская и Волгоградская области, Ставрополье, Адыгея, Астрахань, Крым. По запросу выезжаем за пределы округа.'],
  ['Можно ли получить шаблон ТЗ?', 'Да, шаблон ТЗ на ангар входит в PDF-каталог типовых решений.']];

  const [open, setOpen] = useState(0);
  return (
    <section id="faq" className="sec">
      <div className="shell">
        <div className="sec-head">
          <div className="left">
            <span className="tag">N° 9 · ЧАСТЫЕ ВОПРОСЫ</span>
            <h2>Что обычно спрашивают<br />до подписания договора.</h2>
          </div>
          <div className="right">
            Если вопроса нет в списке — задайте его в форме контактов.
          </div>
        </div>
        <div style={{ borderTop: '1px solid var(--border)' }}>
          {items.map(([q, a], i) =>
          <div key={i} style={{ borderBottom: '1px solid var(--border)' }}>
              <button onClick={() => setOpen(open === i ? -1 : i)} style={{
              width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              padding: '24px 0', background: 'transparent', border: 0, cursor: 'pointer',
              fontFamily: 'inherit', textAlign: 'left', color: 'var(--graphite)'
            }}>
                <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
                  <span className="mono" style={{ fontSize: 12, color: 'var(--muted)', minWidth: 28 }}>{String(i + 1).padStart(2, '0')}</span>
                  <span style={{ fontSize: 18, fontWeight: 500 }}>{q}</span>
                </div>
                <span style={{
                width: 28, height: 28, border: '1px solid var(--border-strong)',
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                transition: 'transform 200ms ease, background 150ms ease',
                transform: open === i ? 'rotate(45deg)' : 'rotate(0)',
                background: open === i ? 'var(--graphite)' : 'transparent',
                color: open === i ? 'var(--concrete)' : 'var(--graphite)'
              }}>+</span>
              </button>
              <div style={{
              maxHeight: open === i ? 400 : 0, overflow: 'hidden', transition: 'max-height 300ms ease'
            }}>
                <p style={{
                paddingLeft: 52, paddingRight: 56, paddingBottom: 28,
                fontSize: 16, color: 'var(--muted)', maxWidth: 760, lineHeight: 1.55
              }}>{a}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>);

}

// ============================================================
// CONTACTS
// ============================================================
function Contacts() {
  const sectionRef = useVisibleGoal('open_request_form');
  const [form, setForm] = useState({ name: '', phone: '', task: '' });
  const [agree, setAgree] = useState(false);
  const [agreeErr, setAgreeErr] = useState(false);
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const submit = async (e) => {
    e.preventDefault();
    setSubmitError('');
    if (!agree) {setAgreeErr(true);return;}
    try {
      setSending(true);
      await sendLead({
        formType: 'request_form',
        formTitle: 'Открытая форма заявки',
        name: form.name,
        phone: form.phone,
        task: form.task
      });
      setSent(true);
      ymGoal('lead_request_form');
      setTimeout(() => setSent(false), 5000);
    } catch (error) {
      setSubmitError('Заявка не отправилась. Пожалуйста, позвоните нам или напишите в мессенджер.');
    } finally {
      setSending(false);
    }
  };
  return (
    <section id="contacts" ref={sectionRef} className="sec" style={{ background: 'var(--steel)' }}>
      <div className="shell">
        <div className="sec-head" style={{ borderColor: 'rgba(31,37,40,0.2)' }}>
          <div className="left">
            <span className="tag">N° 10 · КОНТАКТЫ</span>
            <h2><br />Подготовим КП по вашему ТЗ с составом работ, сроками и сметой для согласования и закупки.</h2>
          </div>
          <div className="right">
            Краснодар, ЮФО · работаем по всему Югу России.
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.1fr', gap: 0, background: 'var(--concrete)', border: '1px solid rgba(31,37,40,0.18)' }} className="ct-grid">
          <div style={{ padding: 36, borderRight: '1px solid var(--border)', display: 'flex', flexDirection: 'column', gap: 28 }} className="ct-info">
            <div>
              <div className="tlabel">ТЕЛЕФОН</div>
              <a href="tel:+79186333221" onClick={() => ymGoal('click_phone')} className="mono" style={{ display: 'block', fontSize: 30, fontWeight: 600, color: 'var(--graphite)', textDecoration: 'none', marginTop: 8 }}>+7 (918) 633-32-21</a>
              <div style={{ fontSize: 13, color: 'var(--muted)', marginTop: 4 }}>пн–пт · 9:00–19:00 МСК</div>
            </div>
            <div>
              <div className="tlabel">EMAIL</div>
              <a href="mailto:timmetall@yandex.ru" onClick={() => ymGoal('click_email')} style={{ display: 'block', fontSize: 20, color: 'var(--graphite)', textDecoration: 'none', marginTop: 8 }}>timmetall@yandex.ru</a>
            </div>
            <div>
              <div className="tlabel">АДРЕС</div>
              <div style={{ fontSize: 16, marginTop: 8 }}>Краснодар · ЮФО<br />Производство и офис</div>
              <div className="mono" style={{ fontSize: 12, color: 'var(--muted)', marginTop: 6 }}>45.0355°N · 38.9753°E</div>
            </div>
            <div>
              <div className="tlabel">МЕССЕНДЖЕРЫ</div>
              <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
                {[
                  ['WhatsApp', 'https://wa.me/79186333221', 'click_whatsapp'],
                  ['Telegram', getTelegramBotUrl('site_contacts'), 'click_telegram']
                ].map(([m, href, goal]) =>
                <a key={m} href={href} target="_blank" rel="noreferrer" onClick={() => ymGoal(goal)} style={{ padding: '8px 14px', border: '1px solid var(--border-strong)', textDecoration: 'none', color: 'var(--graphite)', fontSize: 13 }}>{m}</a>
                )}
              </div>
            </div>
            <div className="bp" style={{ padding: 12, background: '#fff', border: '1px solid var(--border)', marginTop: 'auto' }}>
              <YufoMap />
            </div>
          </div>

          <form onSubmit={submit} style={{ padding: 36, display: 'flex', flexDirection: 'column' }} className="ct-form">
            <div className="tlabel">ФОРМА · РАСЧЁТ ПО ЗАДАЧЕ</div>
            <h3 style={{ fontSize: 22, marginTop: 12, marginBottom: 24 }}>Оставьте заявку и наш менеджер свяжется с вами, чтобы обсудить детали </h3>

            {sent ?
            <div style={{ padding: '32px 16px', textAlign: 'center', border: '1px dashed var(--border-strong)' }}>
                <div style={{ fontSize: 18, fontWeight: 600, marginBottom: 8 }}>Заявка принята</div>
                <div style={{ fontSize: 14, color: 'var(--muted)' }}>Инженер свяжется с вами в течение рабочего дня.</div>
              </div> :

            <>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  <div className="field">
                    <label>Имя</label>
                    <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required placeholder="Иван Петров" />
                  </div>
                  <div className="field">
                    <label>Телефон</label>
                    <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} required placeholder="+7 ___ ___-__-__" />
                  </div>
                  <div className="field">
                    <label>Задача (назначение, размер, регион)</label>
                    <textarea rows="4" value={form.task} onChange={(e) => setForm({ ...form, task: e.target.value })} placeholder="Склад 24×60×8 м, Краснодарский край, утепление, 2 ворот" />
                  </div>
                </div>
                <button type="submit" disabled={sending} className="btn btn-primary" style={{ marginTop: 24, alignSelf: 'flex-start', opacity: agree && !sending ? 1 : 0.55 }}>
                  {sending ? 'Отправляем...' : 'Отправить'}
                  <svg className="btn-arrow" viewBox="0 0 18 18" fill="none"><path d="M3 9 H15 M10 4 L15 9 L10 14" stroke="currentColor" strokeWidth="1.6" /></svg>
                </button>
                <label style={{
                display: 'flex', gap: 12, alignItems: 'flex-start', marginTop: 16,
                fontSize: 12, color: 'var(--muted)', lineHeight: 1.45, cursor: 'pointer'
              }}>
                  <span style={{
                  position: 'relative', flexShrink: 0, width: 18, height: 18,
                  border: '1px solid ' + (agreeErr ? '#F26A21' : 'var(--border-strong)'),
                  background: agree ? '#F26A21' : 'transparent',
                  borderColor: agree ? '#F26A21' : agreeErr ? '#F26A21' : 'var(--border-strong)',
                  transition: 'all 120ms ease', marginTop: 1
                }}>
                    {agree && <svg width="18" height="18" viewBox="0 0 18 18" style={{ position: 'absolute', top: -1, left: -1 }}><path d="M4 9 L8 13 L14 5" stroke="#fff" strokeWidth="2" fill="none" /></svg>}
                  </span>
                  <input type="checkbox" checked={agree} onChange={(e) => {setAgree(e.target.checked);setAgreeErr(false);}} style={{ position: 'absolute', opacity: 0, pointerEvents: 'none' }} />
                  <span>
                    Я согласен на обработку персональных данных в соответствии с 152-ФЗ и <a href="#" data-open-privacy style={{ color: 'var(--graphite)', textDecoration: 'underline' }} onClick={(e) => e.stopPropagation()}>политикой конфиденциальности</a>.
                  </span>
                </label>
                {agreeErr && <span className="err" style={{ display: 'block', marginTop: 8 }}>Нужно согласие на обработку персональных данных</span>}
                {submitError && <span className="err" style={{ display: 'block', marginTop: 8 }}>{submitError}</span>}
              </>
            }
          </form>
        </div>
      </div>
      <style>{`@media (max-width: 960px) { .ct-grid { grid-template-columns: 1fr !important; } .ct-info { border-right: 0 !important; border-bottom: 1px solid var(--border); } }`}</style>
    </section>);

}

// ============================================================
// FOOTER
// ============================================================
function Footer() {
  return (
    <footer className="dark" style={{ paddingTop: 64, paddingBottom: 32 }}>
      <div className="shell">
        <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr 1fr 1fr', gap: 40, paddingBottom: 48, borderBottom: '1px solid rgba(245,243,238,0.14)' }} className="ft-grid">
          <div>
            <Logo color="#F5F3EE" />
            <p style={{ fontSize: 14, color: 'rgba(245,243,238,0.6)', marginTop: 20, maxWidth: 320, lineHeight: 1.5 }}>
              Производитель быстровозводимых ангаров и промышленных зданий
              в Краснодаре. Работаем по всему ЮФО с 2014 года.
            </p>
          </div>
          <div>
            <div className="tlabel" style={{ marginBottom: 14 }}>РЕШЕНИЯ</div>
            {['Склад', 'Производство', 'АПК', 'Авиация', 'Логистика'].map((x) =>
            <a key={x} href="#solutions" style={{ display: 'block', color: 'rgba(245,243,238,0.78)', textDecoration: 'none', fontSize: 14, marginBottom: 8 }}>{x}</a>
            )}
          </div>
          <div>
            <div className="tlabel" style={{ marginBottom: 14 }}>КОМПАНИЯ</div>
            {[['Этапы работы', '#stages'], ['Объекты', '#cases'], ['YouTube', 'https://www.youtube.com/channel/UC3jGbzwbzZiYYXD9CJ5UUfA'], ['Контакты', '#contacts']].map(([t, h]) =>
            <a key={t} href={h} style={{ display: 'block', color: 'rgba(245,243,238,0.78)', textDecoration: 'none', fontSize: 14, marginBottom: 8 }}>{t}</a>
            )}
          </div>
          <div>
            <div className="tlabel" style={{ marginBottom: 14 }}>СВЯЗЬ</div>
            <a href="tel:+79186333221" onClick={() => ymGoal('click_phone')} className="mono" style={{ display: 'block', color: '#F5F3EE', textDecoration: 'none', fontWeight: 500, marginBottom: 12, fontSize: 20 }}>+7 (918) 633-32-21</a>
            <a href="mailto:timmetall@yandex.ru" onClick={() => ymGoal('click_email')} style={{ display: 'block', color: 'rgb(255, 244, 244)', textDecoration: 'none', fontSize: 14, marginBottom: 8 }}>timmetall@yandex.ru</a>
            <div style={{ fontSize: 13, color: 'rgba(245,243,238,0.6)', marginTop: 12 }}>Краснодар · ЮФО</div>
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 24, fontSize: 12, color: 'rgba(245,243,238,0.5)' }} className="mono">
          <span>© 2026 СКАнгар · Все права защищены</span>
          <a href="#" data-open-privacy style={{ color: 'rgba(245,243,238,0.7)', textDecoration: 'underline' }}>Политика конфиденциальности</a>
        </div>
      </div>
      <style>{`@media (max-width: 720px) { .ft-grid { grid-template-columns: 1fr 1fr !important; } }`}</style>
    </footer>);

}

Object.assign(window, {
  Nav, Hero, Industries, StatsBand, Calculator, Services, Configurator,
  YoutubeObjects, Cases, Stages, LeadMagnet, FAQ, Contacts, Footer
});