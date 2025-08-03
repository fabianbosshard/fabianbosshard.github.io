// background.js
jQuery(function () {
  // Pre-compute possible x/y positions
  const xs = [...Array($(window).innerWidth()).keys()];
  const ys = [...Array($(window).innerHeight()).keys()];
  const pick = arr => arr[Math.floor(Math.random() * arr.length)];

  const canvas = oCanvas.create({
    canvas: "#canvas",
    background: "#111",
    fps: 60
  });

  // every 100 ms: create a tiny dot that grows & fades
  setInterval(() => {
    const dot = canvas.display.ellipse({
      x: pick(xs),
      y: pick(ys),
      origin: { x: "center", y: "center" },
      radius: 0,
      fill: "#27ae60",
      opacity: 1
    });

    canvas.addChild(dot);

    dot.animate(
      { radius: 12, opacity: 0 },
      { duration: 1000, easing: "linear" }
    );
  }, 100);

  // keep the canvas size in sync with the window
  $(window).on("resize", () => {
    canvas.width = $(window).innerWidth();
    canvas.height = $(window).innerHeight();
  }).trigger("resize");
});