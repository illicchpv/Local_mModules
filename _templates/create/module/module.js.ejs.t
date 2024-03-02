---
to: <%= absPath %>/<%= module_name %>.js
---

{
  const mn = '<%= module_name %>';
  eval(`
    var ${mn} = new ${mn}fn('${mn}');
    ${mn}.forModulesLoader(${mn});
    ${mn}.moduleName = '${mn}';
  `);
}
function <%= module_name %>fn(mn) {
  mBase.call(this); // отнаследовать
  this.setModuleName(mn);

  this.createInstance_Base = this.createInstance;
  this.createInstance = function (instanceName) {
    if (this.getInstance(instanceName)){ const msg = `instance: '${this.moduleName}.${instanceName}' already exist!`; console.error(msg); throw new Error(msg)};

    const ins = {
      mname: this.moduleName,
      iname: instanceName,

      counter: 0,
      onIncCounter: undefined,

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
      incCounter(event, el){
        this.counter++;
        if (this.onIncCounter) this.onIncCounter(event, el);
        this.render();
        return this;
      },
    };

    ins.constructor();
    this.setInstance(instanceName, ins);
    return ins;
 };
}