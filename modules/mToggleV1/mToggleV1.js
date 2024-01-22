var mToggleV1 = (() => {
  const moduleName = 'mToggleV1'

  // эта часть отвечает за создание и работу порождаемых экземпляров объектов 
  const istances = {}
  const createInstance = (instanceName) => {
    if (istances[instanceName]) throw new Error(`mToggleV1.instance '${instanceName}' already exist!`)

    const ins = {
      mname: moduleName,
      iname: instanceName,
      isChecked: false,
      // counter: 0,
      // ----------------------------------------------
      gmi: __modulesLoader.getModInst, // const someInstance = this.gmi('moduleName.instanceName')
      constructor() {
        this.iEl = document.querySelector(`.${moduleName}.${this.iname}`)
      },
      render() {
        if(this.isChecked){
          this.iEl.querySelector('input').setAttribute('checked', '');
        }else{
          this.iEl.querySelector('input').removeAttribute('checked');
        }
        // this.iEl.querySelector('.instance').innerHTML = this.iname
        // this.iEl.querySelector('.counter').innerHTML = this.counter
        return this
      },
      setChecked(el){
        this.isChecked = el.checked;
        if (this.onCheck) this.onCheck(el);
      },
      // incCounter() {
      //   this.counter++
      //   this.render()
      //   return this
      // },
      // ----------------------------------------------
    }
    istances[instanceName] = ins

    setTimeout(function (ins) { ins.constructor() }, 0, ins)
    return ins
  }
  const getInstance = (instanceName) => {
    return istances[instanceName]
  }
  const getModuleInstance = (el) => {
    const inst = istances[el.closest('.' + moduleName).dataset.instance]
    // console.log('inst: ', inst);

    return inst
  }
  const renderAllInstance = () => {
    for (const [key, value] of Object.entries(istances)) {
      value.render() // render all module2 instances
    }
  }
  const scanAllInstance = (cbFunc) => {
    for (const [key, value] of Object.entries(istances)) {
      cbFunc(value)
    }
  }

  { //ВНИМАНИЕ! этот ОБЯЗАТЕЛЬНЫЙ кусок надо вставить перед return
    const __el = __modulesList.find(el => el.name === moduleName)
    if (__el) setTimeout(function (__el) { __modulesLoader.continueLoad(__el) }, 1, __el)
    const r = { // тут перечисляются функции и свойства модуля которые будут доступные из вне.
      moduleName,

      createInstance,
      getInstance,
      renderAllInstance,
      getModuleInstance,
      scanAllInstance,
    }
    const m = __modulesList.find(el => el.name === moduleName)
    if(m) {m.module = r} else { throw new Error(`Ошибка в модуле: ${moduleName}`)}
    return r
  }
})()
