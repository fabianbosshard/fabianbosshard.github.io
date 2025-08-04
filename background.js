/* background.js – Vanta FOG, 100 % driven by CSS variables */

(function () {
  let vanta;

  /* helpers */
  const css        = prop => getComputedStyle(document.documentElement).getPropertyValue(prop).trim();
  const cssFloat   = (prop, dflt) => parseFloat(css(prop)) || dflt;
  const cssBool    = (prop, dflt) => (parseInt(css(prop)) || 0) ? true : dflt;
  const cssColor   = (prop, dflt) => parseInt((css(prop) || dflt).replace('#', '0x'), 16);

  function make() {
    return VANTA.FOG({
      el: '#vanta-bg',

      /* dimensions & controls */
      minHeight:     cssFloat('--vanta-minh', 200),
      minWidth:      cssFloat('--vanta-minw', 200),
      mouseControls: cssBool ('--vanta-mouse', true),
      touchControls: cssBool ('--vanta-touch', true),
      gyroControls:  cssBool ('--vanta-gyro',  false),

      /* colours */
      highlightColor: cssColor('--vanta-highlight', '#dcb45f'),
      midtoneColor:   cssColor('--vanta-midtone',   '#e86e5c'),
      lowlightColor:  cssColor('--vanta-lowlight',  '#7c5fff'),
      baseColor:      cssColor('--vanta-base',      '#e1b5b5'),

      /* dynamics */
      blurFactor: cssFloat('--vanta-blur',  0.70),
      speed:      cssFloat('--vanta-speed', 1.00),
      zoom:       cssFloat('--vanta-zoom',  1.00)
    });
  }

  /* first paint */
  vanta = make();

  /* rebuild if the OS theme flips */
  matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
    vanta?.destroy();
    vanta = make();
  });
})();