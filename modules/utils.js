function stringToDomElement(str) {
  const el = (new DOMParser()).parseFromString(str, "text/html");
  return el.documentElement;
}

function getRndIntInclusive(n, m, lg) {
  const min = Math.min(n, m);
  const max = Math.max(n, m);
  let r = Math.round(Math.random() * (max - min) + min);
  if (lg)
    console.log('r: ', r, min, max);
  return r;
}
/* debounce
Usage sample:
const handleMouseMove = debounce((mouseEvent) => {  // Do stuff with the event!}, 250);
   document.addEventListener('mousemove', handleMouseMove);    // Add listener
   document.removeEventListener('mousemove', handleMouseMove); // Remove listener
*/
function debounce(callback, wait) {
  let timeout;
  return function () {
    clearTimeout(timeout);
    timeout = setTimeout(() => callback.apply(this, arguments), wait);
  };
}
// const debounce = (callback, wait) => {
//   let timeoutId;
//   return (...args) => {
//     window.clearTimeout(timeoutId);
//     timeoutId = window.setTimeout(() => {
//       callback(...args);
//     }, wait);
//   };
// }

function formatConfigConvert(json, namePref = 'блок') {
  if (namePref) namePref = namePref.trim() + ' ';
  const rez = {};
  rez.roots = Object.entries(json).map(el => {
    const [name, id] = el[0].split('|');
    return {
      root: id.trim(),
      name: name.trim(),
    };
  });
  const add = Object.entries(json).map(el => {
    const [, id] = el[0].split('|');
    return el[1].map(el => {
      return {
        root: id.trim(),
        subNode: `${el}`,
        name: `${namePref}${el}`
      };
    });
  });
  rez.subNodes = add.reduce((sum, el) => [...sum, ...el], []);
  return rez;
}

function formatAccessConvert(cfg, ar) {
  const rez = {};
  const allAll = ar.find(el => el.name === '*');
  if (allAll) {
    rez.allowed = cfg.roots.map(el => {
      return {
        root: el.root,
        subNode: "*",
      };
    });
  }
  else {
    const add = ar.map(el => {
      return el.allow.map(el2 => {
        return {
          root: el.name,
          subNode: el2,
        };
      });
    });
    // debugger;
    rez.allowed = add.reduce((sum, el) => {
      const all = el.find(el2 => el2.subNode === '*');
      if (all) {
        return [...sum, all];
      }
      return [...sum, ...el];
    }, []);
  }
  return rez;
}
