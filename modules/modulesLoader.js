var __modulesLoader = (() => {
  let __loadreadyCalBack = undefined;

  function doload(__modulesList, loadreadyCalBack) {
    __loadreadyCalBack = loadreadyCalBack;
    if (!__modulesList || __modulesList.length == 0) {
      if (__loadreadyCalBack) __loadreadyCalBack();
      return;
    }
    {
      __modulesList.forEach(el => {
        // console.log('css module: ', el);
        if (!el.css) return;
        const jsList = el.css.split(';').forEach(css => {
          css = css.trim();
          if (css === '') return;
          const style = document.createElement('link');
          style.id = el.name + '_css'
          style.href = css;
          style.setAttribute('rel', 'stylesheet');
          document.head.append(style);
        });
      });
    }
    {
      for (const el of __modulesList) {
        el.ok = false;
      }
      for (const el of __modulesList) {
        // console.log('el: ', el);
        if (!el.js) continue;
        let js = el.js.trim();
        if (js === '') continue;
        // console.log('js: ', js);
        const script = document.createElement('script');
        script.src = js;
        script.setAttribute('defer', '');
        document.head.append(script);
        break;
      }
    }
  }
  function continueLoad(readyEl) {
    // console.log('-------------readyEl: ', readyEl);
    readyEl.ok = true;
    for (const el of __modulesList) {
      // console.log('el: ', el);
      if (el.ok) continue;
      if (!el.js) continue;
      let js = el.js.trim();
      if (js === '') continue;
      // console.log('js: ', js);
      const script = document.createElement('script');
      script.src = js;
      script.setAttribute('defer', '');
      document.head.append(script);
      return;
    }
    if (__loadreadyCalBack) __loadreadyCalBack();
    return true;
  }

  function getModInst(ModInst) {
    // console.log('getModInst(ModInst: ', ModInst, __modulesList);
    try {
      const [mod, inst] = ModInst.split('.');
      console.log('inst: ', inst);
      for (const el of __modulesList) {
        if (el.name === mod) {
          return el.module.getInstance(inst);
        }
      }
    } catch (e) {
      console.error('__modulesLoader.ModInst catch(e): ', e);
    }
  }
  return {
    continueLoad,
    doload,
    getModInst,
  };
})();

document.addEventListener("DOMContentLoaded", async function () {
  __modulesLoader.doload(__modulesList, __modulesReady);
});

function __modulesReady() {
  console.log('!!! __modulesReady !!!');

  IncludHtml.doIncludAll(
    {
      insertType: "replace", incInner: false,
      replace: [
        {from: '../img/', to: './img/'},
      ],
      incFromId: "extId",
    },
    (defProps) => { // вызывается когда IncludHtml.doIncludAll всё сделал 
      setTimeout(function () {
        __modulesList.forEach(el => {el.module.renderAllInstance();});
      }, 1);
    }
  );
}

function initInstance({module, el, appName, instName}) {
  appName = !appName ? '' : appName;
  const iName = appName + instName;
  const inst = module.createInstance(iName);
  if (appName) el.extEl.dataset.app = appName;
  el.extEl.innerHTML = el.extEl.innerHTML.replaceAll(`./m_resurs/`, `${modulesUrl}${inst.mname}/m_resurs/`);
  if (appName) inst.aname = appName;
  el.extEl.dataset.instance = iName;
  el.extEl.classList.add(iName);
  return inst;
}
