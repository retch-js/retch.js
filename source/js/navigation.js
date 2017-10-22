export default function navigation($, target) {
  const SCROLL_UP_DISTANCE_SHOW = 40;
  const SCROLL_DOWN_DISTANCE_HIDE = 40;
  const SCROLL_PAST_HIDE = 600;

  let hid = false;

  let lastPos = $(target).scrollTop();
  let direction = 'none';
  let distance = 0;

  const nav = $('nav');

  function scrollHandler() {
    const nowPos = $(target).scrollTop();
    if (lastPos !== nowPos) {
      const d = nowPos > lastPos ? 'down' : 'up';
      if (d === direction) {
        distance += Math.abs(lastPos - nowPos);
      } else {
        distance = 0;
      }
      direction = d;
      lastPos = nowPos;

      if (hid && direction === 'up' && distance >= SCROLL_UP_DISTANCE_SHOW) {
        hid = false;
        nav.removeClass('nav-hidden').addClass('nav-shown');
      } else if (!hid && direction === 'down' && lastPos >= SCROLL_PAST_HIDE && distance >= SCROLL_DOWN_DISTANCE_HIDE) {
        hid = true;
        nav.removeClass('nav-shown').addClass('nav-hidden');
        $('nav ul.shown').toggleClass('shown');
      }
    }
  }

  $(target).on('scroll', () => {
    if (!target.requestAnimationFrame) {
      setTimeout(scrollHandler, 100);
    } else {
      target.requestAnimationFrame(scrollHandler);
    }
  });

  $('body').on('click', 'nav div.hamburger a i', () => {
    $('nav ul').toggleClass('shown');
  });
}
