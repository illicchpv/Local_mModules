{
  const mn = 'mCheck_toggleV1';
  eval(`
    var ${mn} = new ${mn}fn('${mn}');
    ${mn}.forModulesLoader(${mn});
    ${mn}.moduleName = '${mn}';
  `);
}
function mCheck_toggleV1fn(mn) {
  mBase.call(this); // отнаследовать
  this.setModuleName(mn);

  this.createInstance_Base = this.createInstance;
  this.createInstance = function (instanceName) {
    if (this.getInstance(instanceName)){ const msg = `instance: '${this.moduleName}.${instanceName}' already exist!`; console.error(msg); throw new Error(msg)};

    const ins = {
      mname: this.moduleName,
      iname: instanceName,

      isChecked: false,

      constructor(){
        this.iEl = document.querySelector(`.${this.mname}.${this.iname}`);
        if (!this.iEl) {console.warn(`в конструкторе ${this.mname} не найден корневой элемент`); return; }
      },
      render(){
        if (!this.iEl) {
          if (!document.querySelector(`.${this.mname}.${this.iname}`)) return;
          this.constructor();
        }
        if(this.isChecked){
          this.iEl.querySelector('input').setAttribute('checked', '');
        }else{
          this.iEl.querySelector('input').removeAttribute('checked');
        }
        return this;
      },
      setChecked(el){
        this.isChecked = el.checked;
        if (this.onCheck) this.onCheck(el);
      },
    };

    ins.constructor();
    this.setInstance(instanceName, ins);
    return ins;
 };
}