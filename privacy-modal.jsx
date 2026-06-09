/* eslint-disable */
// Privacy policy modal — opens on click of any element with [data-open-privacy].
// Single global instance; reusable across footer, forms, cookie banner.
const { useState: usePPState, useEffect: usePPEffect } = React;

function PrivacyModal() {
  const [open, setOpen] = usePPState(false);
  const [closing, setClosing] = usePPState(false);

  usePPEffect(() => {
    const onClick = (e) => {
      const trigger = e.target.closest('[data-open-privacy]');
      if (trigger) {
        e.preventDefault();
        e.stopPropagation();
        setOpen(true);
      }
    };
    // Capture phase so we receive the event before any stopPropagation in handlers below us.
    document.addEventListener('click', onClick, true);
    return () => document.removeEventListener('click', onClick, true);
  }, []);

  usePPEffect(() => {
    if (!open) return;
    const onKey = (e) => { if (e.key === 'Escape') close(); };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const close = () => {
    setClosing(true);
    setTimeout(() => { setOpen(false); setClosing(false); }, 200);
  };

  if (!open) return null;

  return (
    <div
      onClick={close}
      style={{
        position: 'fixed', inset: 0, zIndex: 110,
        background: 'rgba(31,37,40,0.78)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: 24,
        opacity: closing ? 0 : 1, transition: 'opacity 200ms ease',
        fontFamily: "'IBM Plex Sans', system-ui, sans-serif",
      }}>
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: '#F5F3EE',
          width: '100%', maxWidth: 880, maxHeight: '88vh',
          display: 'flex', flexDirection: 'column',
          border: '1px solid rgba(31,37,40,0.18)',
          transform: closing ? 'translateY(8px)' : 'translateY(0)',
          transition: 'transform 200ms ease',
        }}>
        {/* Header */}
        <div style={{
          padding: '24px 36px',
          borderBottom: '1px solid rgba(31,37,40,0.12)',
          display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
          gap: 24,
          flexShrink: 0,
        }}>
          <div>
            <div style={{
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase',
              color: 'rgba(31,37,40,0.55)',
            }}>ДОКУМЕНТ · 152-ФЗ · РЕД. 01.01.2026</div>
            <h2 style={{ fontSize: 24, fontWeight: 600, margin: '8px 0 0', letterSpacing: '-0.01em' }}>
              Политика обработки персональных данных
            </h2>
          </div>
          <button
            onClick={close}
            aria-label="Закрыть"
            style={{
              background: 'transparent', border: '1px solid rgba(31,37,40,0.22)',
              width: 40, height: 40, cursor: 'pointer',
              fontFamily: 'inherit', fontSize: 22, lineHeight: 1, color: '#1F2528',
              flexShrink: 0,
            }}>×</button>
        </div>

        {/* Body */}
        <div style={{
          padding: '28px 36px',
          overflow: 'auto',
          fontSize: 14.5, lineHeight: 1.6, color: 'rgba(31,37,40,0.85)',
        }}>
          <PrivacyContent/>
        </div>

        {/* Footer */}
        <div style={{
          padding: '20px 36px',
          borderTop: '1px solid rgba(31,37,40,0.12)',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          flexShrink: 0,
          flexWrap: 'wrap', gap: 12,
        }}>
          <div style={{
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: 11, color: 'rgba(31,37,40,0.55)',
          }}>ООО «СКАнгар» · Краснодар · ЮФО</div>
          <button
            onClick={close}
            style={{
              background: '#F26A21', color: '#fff', border: '1px solid #F26A21',
              padding: '12px 22px', fontFamily: 'inherit', fontSize: 14, fontWeight: 500,
              cursor: 'pointer',
            }}>
            Принимаю
          </button>
        </div>
      </div>
    </div>
  );
}

function PrivacyContent() {
  const sections = [
    {
      n: '01', t: 'Общие положения',
      body: (
        <>
          Настоящая политика обработки персональных данных составлена в&nbsp;соответствии
          с требованиями Федерального закона от 27.07.2006 № 152-ФЗ «О&nbsp;персональных
          данных» и определяет порядок обработки персональных данных и&nbsp;меры
          по обеспечению безопасности персональных данных, предпринимаемые
          ООО «СКАнгар» (далее — Оператор).
        </>
      ),
    },
    {
      n: '02', t: 'Состав обрабатываемых данных',
      list: [
        'Фамилия, имя, отчество (при указании)',
        'Контактный телефон',
        'Адрес электронной почты',
        'Наименование организации (при указании)',
        'Содержание заявки и сведения об объекте строительства',
        'Технические данные: IP-адрес, cookie, информация о браузере и устройстве',
      ],
    },
    {
      n: '03', t: 'Цели обработки',
      list: [
        'Подготовка коммерческого предложения и сметы по&nbsp;запросу пользователя',
        'Подбор технического решения и расчёт стоимости ангара',
        'Отправка PDF-каталога типовых решений',
        'Связь с пользователем по указанным контактам',
        'Анализ посещаемости и улучшение работы сайта',
      ],
    },
    {
      n: '04', t: 'Правовые основания',
      body: (
        <>
          Оператор обрабатывает персональные данные пользователя только в&nbsp;случае
          их заполнения и/или отправки пользователем самостоятельно через специальные
          формы, расположенные на сайте. Заполняя соответствующие формы и/или
          отправляя свои персональные данные, пользователь выражает согласие
          с данной политикой.
        </>
      ),
    },
    {
      n: '05', t: 'Передача данных третьим лицам',
      body: (
        <>
          Персональные данные пользователя не передаются третьим лицам, за&nbsp;исключением
          случаев, предусмотренных законодательством Российской Федерации.
          Оператор не использует персональные данные для рекламной рассылки
          без отдельного согласия пользователя.
        </>
      ),
    },
    {
      n: '06', t: 'Сроки и хранение',
      body: (
        <>
          Персональные данные пользователя хранятся в течение срока, необходимого
          для достижения целей их обработки, но не более 5&nbsp;лет с&nbsp;момента
          последнего взаимодействия с пользователем. По истечении срока данные
          удаляются или обезличиваются.
        </>
      ),
    },
    {
      n: '07', t: 'Права пользователя',
      body: (
        <>
          Пользователь имеет право на получение информации об&nbsp;обработке своих
          персональных данных, их уточнение, блокирование или&nbsp;уничтожение
          в случае, если данные являются неполными, устаревшими, неточными,
          незаконно полученными или не являются необходимыми для&nbsp;заявленной
          цели обработки. Запрос направляется на&nbsp;<a href="mailto:timmetall@yandex.ru" onClick={() => ymGoal('click_email')} style={{ color: '#1F2528' }}>timmetall@yandex.ru</a>.
        </>
      ),
    },
    {
      n: '08', t: 'Cookie-файлы',
      body: (
        <>
          Сайт использует файлы cookie для корректной работы интерфейса
          и анализа посещаемости. Пользователь может отключить cookie в&nbsp;настройках
          браузера — это может повлиять на отдельные функции сайта.
        </>
      ),
    },
    {
      n: '09', t: 'Контакты оператора',
      body: (
        <>
          ООО «СКАнгар» · г. Краснодар, ЮФО<br/>
          Телефон: <a href="tel:+79186333221" onClick={() => ymGoal('click_phone')} style={{ color: '#1F2528' }}>+7 (918) 633-32-21</a><br/>
          Email: <a href="mailto:timmetall@yandex.ru" onClick={() => ymGoal('click_email')} style={{ color: '#1F2528' }}>timmetall@yandex.ru</a>
        </>
      ),
    },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
      {sections.map((s) => (
        <div key={s.n} style={{ display: 'grid', gridTemplateColumns: '56px 1fr', gap: 16 }}>
          <div style={{
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: 11, letterSpacing: '0.08em',
            color: 'rgba(31,37,40,0.55)',
            paddingTop: 4,
          }}>{s.n}</div>
          <div>
            <h3 style={{ fontSize: 17, fontWeight: 600, margin: '0 0 8px', color: '#1F2528' }}>{s.t}</h3>
            {s.body && <p style={{ margin: 0 }}>{s.body}</p>}
            {s.list && (
              <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
                {s.list.map((item, i) => (
                  <li key={i} style={{
                    display: 'grid', gridTemplateColumns: '20px 1fr', gap: 8,
                    padding: '4px 0',
                  }}>
                    <span style={{ color: '#F26A21' }}>—</span>
                    <span dangerouslySetInnerHTML={{ __html: item }}/>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

window.PrivacyModal = PrivacyModal;
