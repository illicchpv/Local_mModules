{
  const mn = 'm_template2_';
  eval(`
    var ${mn} = new ${mn}fn('${mn}');
    ${mn}.forModulesLoader(${mn});
    ${mn}.moduleName = '${mn}';
  `);
}
function m_template2_fn(mn) {
  mBase.call(this); // отнаследовать
  this.setModuleName(mn);

  this.createInstance_Base = this.createInstance;
  this.createInstance = function (instanceName) {
    if (this.getInstance(instanceName)){ const msg = `instance: '${this.moduleName}.${instanceName}' already exist!`; console.error(msg); throw new Error(msg)};

    const ins = {
      mname: this.moduleName,
      iname: instanceName,

      constructor(){
        this.iEl = document.querySelector(`.${this.mname}.${this.iname}`);
        if (!this.iEl) {console.warn(`в конструкторе ${this.mname} не найден корневой элемент`); return; }
      },
      render(){
        if (!this.iEl) {
          if (!document.querySelector(`.${this.mname}.${this.iname}`)) return;
          this.constructor();
        }
        this.iEl.querySelector('.instance').innerHTML = this.iname;
        this.iEl.querySelector('.counter').innerHTML = this.counter;
        return this;
      },
      incCounter(){
        this.counter++;
        this.render();
        return this;
      },
    };

    ins.constructor();
    this.setInstance(instanceName, ins);
    return ins;

    /*
    const ins = this.createInstance_Base(instanceName);
    // this.mname: moduleName,
    // this.iname: instanceName,
    ins.counter = 0;

    ins.constructor = function () {
      this.iEl = document.querySelector(`.${this.mname}.${this.iname}`);
      if (!this.iEl) {console.warn(`в конструкторе ${this.mname} не найден корневой элемент`); return; }
    }; ins.constructor.bind(ins);

    ins.render = function () {
      if (!this.iEl) {
        if (!document.querySelector(`.${this.mname}.${this.iname}`)) return;
        this.constructor();
      }
      this.iEl.querySelector('.instance').innerHTML = this.iname;
      this.iEl.querySelector('.counter').innerHTML = this.counter;
      return this;
    }; ins.render.bind(ins);

    ins.incCounter = function () {
      this.counter++;
      this.render();
      return this;
    }; ins.incCounter.bind(ins);

    ins.constructor();
    return ins;
    */
  };

}