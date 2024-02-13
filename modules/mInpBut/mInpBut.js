var mInpBut = (() => {
  const moduleName = 'mInpBut';

  // эта часть отвечает за создание и работу порождаемых экземпляров объектов 
  const instances = {};
  const createInstance = (instanceName) => {
    if (instances[instanceName]) throw new Error(`mInpBut.instance '${instanceName}' already exist!`);

    const ins = {
      mname: moduleName,
      iname: instanceName,
      aname: '',
      title: '',
      // ----------------------------------------------
      gmi: __modulesLoader.getModInst, // const someInstance = this.gmi('moduleName.instanceName')
      constructor() {
        this.iEl = document.querySelector(`.${moduleName}.${this.iname}`);
      },
      render() {
        this.iEl.querySelector('.instance').innerHTML = this.iname;
        if (this.title) {
          this.iEl.querySelector('.title').innerHTML = this.title;
        } else {
          this.iEl.querySelector('.title').style.display = 'none';
        }
        return this;
      },
      // incCounter() {
      //   this.counter++
      //   this.render()
      //   return this
      // },
      // ----------------------------------------------
    };
    instances[instanceName] = ins;

    setTimeout(function (ins) {ins.constructor();}, 0, ins);
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
