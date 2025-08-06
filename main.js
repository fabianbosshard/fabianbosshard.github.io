const io=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');io.unobserve(e.target);}}),{threshold:0.15});
document.querySelectorAll('section').forEach(s=>io.observe(s));


document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('click', e => {
      if (!e.target.closest('a')) window.location.href = card.dataset.href;
    });
  });
});