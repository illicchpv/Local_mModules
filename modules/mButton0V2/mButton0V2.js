var mButton0V2 = (() => {
  const moduleName = 'mButton0V2';

  // эта часть отвечает за создание и работу порождаемых экземпляров объектов 
  const instances = {};
  const createInstance = (instanceName) => {
    if (instances[instanceName]) throw new Error(`mButton0V2.instance '${instanceName}' already exist!`);

    const ins = {
      mname: moduleName,
      iname: instanceName,
      text: 'my button',
      onClick: undefined,
      clickCounter: 0,
      // ----------------------------------------------
      gmi: __modulesLoader.getModInst, // const someInstance = this.gmi('moduleName.instanceName')
      constructor() {
        this.iEl = document.querySelector(`.${moduleName}.${this.iname}`);
        if(!this.iEl) return
      },
      render() {
        if(!this.iEl){ 
          if(!document.querySelector(`.${moduleName}.${this.iname}`)) return
          this.constructor()
        }
        // this.iEl.querySelector('.instance').innerHTML = this.iname
        // this.iEl.querySelector('.counter').innerHTML = this.counter
        this.iEl.innerHTML = this.text;
        this.iEl.
          setAttribute('title', `mButton0V2.${this.iname} #${this.clickCounter}`);

        return this;
      },
      doClick(event, el) {
        this.clickCounter++;
        if (this.onClick) this.onClick(event, el);
        this.render();
      },
      // ----------------------------------------------
    };
    ins.constructor();
    instances[instanceName] = ins;
    // setTimeout(function (ins) {ins.constructor();}, 0, ins);
    return ins;
  };
  const getInstance = (instanceName) => {
    return instances[instanceName];
  };
  const getModuleInstance = (el) => {
    const inst = instances[el.closest('.' + moduleName).dataset.instance];
    // console.log('inst: ', inst);

    return inst;
  };
  const renderAllInstance = () => {
    for (const [key, value] of Object.entries(instances)) {
      value.render(); // render all module2 instances
    }
  };
  const scanAllInstance = (cbFunc) => {
    for (const [key, value] of Object.entries(instances)) {
      cbFunc(value);
    }
  };

  { //ВНИМАНИЕ! этот ОБЯЗАТЕЛЬНЫЙ кусок надо вставить перед return
    const __el = __modulesList.find(el => el.name === moduleName);
    if (__el) setTimeout(function (__el) {__modulesLoader.continueLoad(__el);}, 1, __el);
    const r = { // тут перечисляются функции и свойства модуля которые будут доступные из вне.
      moduleName,

      createInstance,
      getInstance,
      renderAllInstance,
      getModuleInstance,
      scanAllInstance,
    };
    const m = __modulesList.find(el => el.name === moduleName);
    if (m) {m.module = r;} else {throw new Error(`Ошибка в модуле: ${moduleName}`);}
    return r;
  }
})();
