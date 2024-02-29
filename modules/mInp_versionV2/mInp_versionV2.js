{
  const mn = 'mInp_versionV2';
  eval(`
    var ${mn} = new ${mn}fn('${mn}');
    ${mn}.forModulesLoader(${mn});
    ${mn}.moduleName = '${mn}';
  `);
}
function mInp_versionV2fn(mn) {
  mBase.call(this); // отнаследовать
  this.setModuleName(mn);

  this.createInstance_Base = this.createInstance;
  this.createInstance = function (instanceName) {
    if (this.getInstance(instanceName)){ const msg = `instance: '${this.moduleName}.${instanceName}' already exist!`; console.error(msg); throw new Error(msg)};

    const ins = {
      mname: this.moduleName,
      iname: instanceName,

      type: 'text',
      value: '1111',
      label: 'input:'+instanceName,
      onInput: undefined,
      onChange: undefined,

      constructor(){
        this.iEl = document.querySelector(`.${this.mname}.${this.iname}`);
        if (!this.iEl) {console.warn(`в конструкторе ${this.mname} не найден корневой элемент`); return; }
        this.iEl.querySelector('.input').setAttribute('id', `${this.mname}-${this.iname}`)
        this.iEl.querySelector('.label').setAttribute('for', `${this.mname}-${this.iname}`)
      },
      render(){
        if (!this.iEl) {
          if (!document.querySelector(`.${this.mname}.${this.iname}`)) return;
          this.constructor();
        }
        this.iEl.querySelector('.label').innerHTML = this.label
        this.iEl.querySelector('.input').setAttribute('type', this.type)
        this.iEl.querySelector('.input').value = this.value
        return this;
      },
      doOnInput(e, el){
        this.value = el.value;
        e.value = el.value;
        if(this.onInput) this.onInput(e, this);
      },
      doOnChange(e, el){
        if(this.onChange) this.onChange(e, this);
      },
    };

    ins.constructor();
    this.setInstance(instanceName, ins);
    return ins;
 };
}