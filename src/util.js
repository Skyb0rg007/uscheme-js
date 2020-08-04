
import React from 'react';

export const useLocalStorage = (key, defaultVal = '') => {
  const [value, setValue] = React.useState(() => (window.localStorage.getItem(key) || defaultVal));
  React.useEffect(() => {
    window.localStorage.setItem(key, value);
  }, [key, value]);
  return [value, setValue];
};

export const simpleDrag = (el, onDrag, onStop, direction) => {
  let startX = 0;
  let startY = 0;
  let dragging = false;

  const move = e => {
    let fix = {};
    onDrag && onDrag(el, e.pageX, startX, e.pageY, startY, fix);
    if (direction === 'horizontal') {
      const pageX = ('pageX' in fix) ? fix.pageX : e.pageX;
      if ('startX' in fix)
        startX = fix.startX;
      if (!('skipX' in fix))
        el.style.left = (pageX - startX) + 'px';
    }
    if (direction === 'vertical') {
      const pageY = ('pageY' in fix) ? fix.pageY : e.pageY;
      if ('startY' in fix)
        startY = fix.startY;
      if (!('skipY' in fix))
        el.style.top = (pageY - startY) + 'px';
    }
  };

  const startDragging = e => {
    if (e.currentTarget instanceof HTMLElement || e.currentTarget instanceof SVGElement) {
      dragging = true;
      const left = el.style.left ? parseInt(el.style.left) : 0;
      const top = el.style.top ? parseInt(el.style.top) : 0;
      startX = e.pageX - left;
      startY = e.pageY - top;
      window.addEventListener('mousemove', move);
    } else {
      throw new Error('Move target must be an html element');
    }
  };

  el.addEventListener('mousedown', startDragging);
  window.addEventListener('mouseup', e => {
    if (dragging) {
      dragging = false;
      window.removeEventListener('mousemove', move);
      onStop && onStop(el, e.pageX, startX, e.pageY, startY);
    }
  });
};

