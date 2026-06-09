/* eslint-disable */
// СКАнгар — Main App
const { useState } = React;

const DEFAULTS = /*EDITMODE-BEGIN*/{
  "heroVariant": "light",
  "accentColor": "#F26A21",
  "showStatsBand": true
}/*EDITMODE-END*/;

function App() {
  const [tweaks, setTweak] = (window.useTweaks ? window.useTweaks(DEFAULTS) : [DEFAULTS, () => {}]);
  const heroVariant = tweaks.heroVariant || 'light';
  const accent = tweaks.accentColor || '#F26A21';

  // Push accent color into CSS var for buttons / dimensions
  React.useEffect(() => {
    document.documentElement.style.setProperty('--orange', accent);
  }, [accent]);

  const navDark = heroVariant === 'dark';

  return (
    <>
      <Nav dark={navDark}/>
      <Hero variant={heroVariant}/>
      <Industries/>
      {tweaks.showStatsBand !== false && <StatsBand/>}
      <Calculator/>
      <Services/>
      <YoutubeObjects/>
      <Cases/>
      <Stages/>
      <LeadMagnet/>
      <FAQ/>
      <Contacts/>
      <Footer/>

      {window.CookieBanner && <window.CookieBanner/>}
      {window.PrivacyModal && <window.PrivacyModal/>}

      {window.TweaksPanel && (
        <window.TweaksPanel title="Tweaks">
          <window.TweakSection title="Главный экран">
            <window.TweakRadio
              label="Вариант hero"
              value={tweaks.heroVariant}
              onChange={(v) => setTweak('heroVariant', v)}
              options={[
                { value: 'light', label: 'Светлый' },
                { value: 'dark', label: 'Тёмный' },
              ]}/>
          </window.TweakSection>
          <window.TweakSection title="Акцент">
            <window.TweakColor
              label="Цвет действия"
              value={tweaks.accentColor}
              onChange={(v) => setTweak('accentColor', v)}
              options={['#F26A21', '#D85510', '#3D5A45', '#1F2528']}/>
          </window.TweakSection>
          <window.TweakSection title="Блоки">
            <window.TweakToggle
              label="Показывать тёмную полосу со статистикой"
              value={tweaks.showStatsBand !== false}
              onChange={(v) => setTweak('showStatsBand', v)}/>
          </window.TweakSection>
        </window.TweaksPanel>
      )}
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App/>);
