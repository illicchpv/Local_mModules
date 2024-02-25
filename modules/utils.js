function stringToDomElement(str) {
  const el = (new DOMParser()).parseFromString(str, "text/html");
  const d = el.body.firstChild; // el.documentElement;
  // console.log('d: ', d.outerHTML);
  // debugger
  return d;
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

const getPostRez = function (url, postObj, rezultCallback) {
  postObj = (typeof (postObj) === 'string') ? JSON.parse(postObj) : postObj;
  const postBody = JSON_to_URLEncoded(postObj);
  fetch(url, {
    method: "POST",
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      'Sec-Fetch-Mode': 'cors',
      'Sec-Fetch-Site': 'cross-site',
      'Accept': 'application/json',
    },
    body: postBody,
  })
    .then(function (response) {
      return response.json();
    }).then(function (json) {
      if (!json) {
        return rezultCallback('rezult is empty!', false);
      }
      if (!json.err) {
        if (rezultCallback) rezultCallback(false, json);
      } else {
        if (rezultCallback) rezultCallback(json.err, false);
      }
    }).catch(function (ex) {
      if (rezultCallback) rezultCallback(ex.toString(), false);
    });
};

function JSON_to_URLEncoded(element, key, list) {
  var list = list || [];
  if (typeof (element) == 'object') {
    for (var idx in element)
      JSON_to_URLEncoded(element[idx], key ? key + '[' + idx + ']' : idx, list);
  } else {
    list.push(key + '=' + encodeURIComponent(element));
  }
  return list.join('&');
}

function objToBase64(obj) {
  return btoa(JSON.stringify(obj));
}
function objFromBase64(b64) {
  return JSON.parse(atob(b64));
}

function jsonToBase64(object) {
  const json = JSON.stringify(object);
  return Buffer.from(json).toString("base64");
}
function base64ToJson(base64String) {
  const json = Buffer.from(base64String, "base64").toString();
  return JSON.parse(json);
}

