{
  const mn = 'mBtn_flatV1';
  eval(`
    var ${mn} = new ${mn}fn('${mn}');
    ${mn}.forModulesLoader(${mn});
    ${mn}.moduleName = '${mn}';
  `);
}
function mBtn_flatV1fn(mn) {
  mBase.call(this); // отнаследовать
  this.setModuleName(mn);

  this.createInstance_Base = this.createInstance;
  this.createInstance = function (instanceName) {
    if (this.getInstance(instanceName)){ const msg = `instance: '${this.moduleName}.${instanceName}' already exist!`; console.error(msg); throw new Error(msg)};

    const ins = {
      mname: this.moduleName,
      iname: instanceName,
      
      text: 'my button',
      onClick: undefined,
      clickCounter: 0,
      _disabled: false,

      constructor(){
        this.iEl = document.querySelector(`.${this.mname}.${this.iname}`);
        if (!this.iEl) {console.warn(`в конструкторе ${this.mname} не найден корневой элемент`); return; }
      },
      render(){
        if (!this.iEl) {
          if (!document.querySelector(`.${this.mname}.${this.iname}`)) return;
          this.constructor();
        }
        this.iEl.innerHTML = this.text;
        this.iEl.
          setAttribute('title', `mBtn_flatV1.${this.iname} #${this.clickCounter}`);
        if(this._disabled) this.iEl.setAttribute('disabled', true);
        else this.iEl.removeAttribute('disabled', true);
        return this;
      },
      set disabled(v){
        this._disabled = !!v;
        this.render();
      },
      get disabled(){
        return !!this_disabled;
      },
      doClick(event, el) {
        event.preventDefault();
        this.clickCounter++;
        if (this.onClick) this.onClick(event, el);
        this.render();
      },
    };

    ins.constructor();
    this.setInstance(instanceName, ins);
    return ins;
 };
}