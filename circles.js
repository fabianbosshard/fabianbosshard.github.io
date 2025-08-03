// Dynamic blinking circles background
// This script creates a canvas that spans the full viewport and animates
// a collection of circles that fade in and out at different rates.

(() => {
  const canvas = document.getElementById('bg-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let width, height;

  // Read the accent colour from the root CSS variables. Fallback to a
  // pleasant green if not defined.
  function getAccentRGB() {
    const rootStyle = getComputedStyle(document.documentElement);
    let hex = rootStyle.getPropertyValue('--highlights').trim();
    if (!hex) {
      // default accent colour used on the reference site
      hex = '#27ae60';
    }
    // Remove optional leading '#'
    hex = hex.replace(/^#/,'');
    // Expand shorthand form (#abc) to full form (#aabbcc)
    if (hex.length === 3) {
      hex = hex.split('').map(c => c + c).join('');
    }
    const intVal = parseInt(hex, 16);
    return {
      r: (intVal >> 16) & 255,
      g: (intVal >> 8) & 255,
      b: intVal & 255
    };
  }

  const colour = getAccentRGB();

  // Circle constructor
  function createCircle() {
    const radius = Math.random() * 4 + 1; // radii between 1 and 5 px
    return {
      x: Math.random() * width,
      y: Math.random() * height,
      r: radius,
      alpha: Math.random(),
      delta: Math.random() * 0.02 + 0.005 // blink speed
    };
  }

  let circles = [];
  const NUM_CIRCLES = 80;

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    // Recreate circles on resize to fill the new area
    circles = [];
    for (let i = 0; i < NUM_CIRCLES; i++) {
      circles.push(createCircle());
    }
  }

  window.addEventListener('resize', resize);

  function animate() {
    ctx.clearRect(0, 0, width, height);
    for (const c of circles) {
      // update alpha
      c.alpha += c.delta;
      if (c.alpha >= 1) {
        c.alpha = 1;
        c.delta = -c.delta;
      } else if (c.alpha <= 0) {
        c.alpha = 0;
        c.delta = -c.delta;
        // re-randomize position when fully faded out
        c.x = Math.random() * width;
        c.y = Math.random() * height;
      }
      ctx.beginPath();
      ctx.arc(c.x, c.y, c.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${colour.r}, ${colour.g}, ${colour.b}, ${c.alpha})`;
      ctx.fill();
    }
    requestAnimationFrame(animate);
  }

  resize();
  requestAnimationFrame(animate);
})();