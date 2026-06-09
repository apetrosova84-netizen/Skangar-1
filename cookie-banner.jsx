/* eslint-disable */
// Cookie consent banner — графит, инженерный стиль, без шума.
const { useState: useStateCookie, useEffect: useEffectCookie } = React;

function CookieBanner() {
  const [visible, setVisible] = useStateCookie(false);
  const [closing, setClosing] = useStateCookie(false);

  useEffectCookie(() => {
    try {
      if (!localStorage.getItem('skangar-cookie-consent')) {
        // small delay so it doesn't fight with page load
        const t = setTimeout(() => setVisible(true), 800);
        return () => clearTimeout(t);
      }
    } catch (e) { setVisible(true); }
  }, []);

  const dismiss = (value) => {
    try { localStorage.setItem('skangar-cookie-consent', value); } catch (e) {}
    setClosing(true);
    setTimeout(() => setVisible(false), 220);
  };

  if (!visible) return null;

  return (
    <div style={{
      position: 'fixed',
      bottom: 24, left: 24, right: 24,
      zIndex: 80,
      display: 'flex', justifyContent: 'center',
      pointerEvents: 'none',
    }}>
      <div style={{
        pointerEvents: 'auto',
        background: '#1F2528',
        color: '#F5F3EE',
        border: '1px solid rgba(245,243,238,0.14)',
        padding: '20px 24px',
        maxWidth: 880, width: '100%',
        display: 'grid',
        gridTemplateColumns: 'auto 1fr auto',
        gap: 20,
        alignItems: 'center',
        boxShadow: '0 20px 50px rgba(0,0,0,0.35)',
        opacity: closing ? 0 : 1,
        transform: closing ? 'translateY(12px)' : 'translateY(0)',
        transition: 'opacity 200ms ease, transform 200ms ease',
        fontFamily: "'IBM Plex Sans', system-ui, sans-serif",
      }} className="cookie-banner">
        {/* Icon */}
        <div style={{
          width: 44, height: 44,
          border: '1px solid rgba(245,243,238,0.25)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0,
        }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="9" stroke="#F5F3EE" strokeWidth="1.4"/>
            <circle cx="8.5" cy="9" r="1.2" fill="#F26A21"/>
            <circle cx="15" cy="10.5" r="1.2" fill="#F26A21"/>
            <circle cx="9.5" cy="15" r="1.2" fill="#F26A21"/>
            <circle cx="14.5" cy="15.5" r="1.2" fill="#F26A21"/>
            <circle cx="12" cy="7" r="0.9" fill="#F26A21"/>
          </svg>
        </div>

        {/* Text */}
        <div style={{ lineHeight: 1.5 }}>
          <div style={{
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: 11,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: 'rgba(245,243,238,0.55)',
            marginBottom: 6,
          }}>
            COOKIE · 152-ФЗ
          </div>
          <div style={{ fontSize: 14, color: 'rgba(245,243,238,0.85)' }}>
            Мы используем файлы cookie для корректной работы сайта и&nbsp;анализа посещаемости.
            Продолжая, вы соглашаетесь с&nbsp;<a href="#" data-open-privacy onClick={(e) => e.stopPropagation()} style={{ color: '#F5F3EE', textDecoration: 'underline' }}>политикой обработки данных</a>.
          </div>
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', gap: 8, flexShrink: 0 }} className="cookie-actions">
          <button
            onClick={() => dismiss('declined')}
            style={{
              background: 'transparent',
              color: 'rgba(245,243,238,0.7)',
              border: '1px solid rgba(245,243,238,0.25)',
              padding: '12px 16px',
              fontFamily: 'inherit', fontSize: 13,
              cursor: 'pointer',
            }}>
            Отклонить
          </button>
          <button
            onClick={() => dismiss('accepted')}
            style={{
              background: '#F26A21',
              color: '#fff',
              border: '1px solid #F26A21',
              padding: '12px 20px',
              fontFamily: 'inherit', fontSize: 13, fontWeight: 500,
              cursor: 'pointer',
            }}>
            Принять
          </button>
        </div>
      </div>
      <style>{`
        @media (max-width: 720px) {
          .cookie-banner {
            grid-template-columns: 1fr !important;
            gap: 16px !important;
            padding: 20px !important;
          }
          .cookie-actions { width: 100%; }
          .cookie-actions button { flex: 1; }
        }
      `}</style>
    </div>
  );
}

window.CookieBanner = CookieBanner;
