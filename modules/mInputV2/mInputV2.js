var mInputV2 = (() => {
  const moduleName = 'mInputV2'

  // эта часть отвечает за создание и работу порождаемых экземпляров объектов
  const instances = {}
  const createInstance = (instanceName) => {
    if (instances[instanceName]) throw new Error(`mInputV2.instance '${instanceName}' already exist!`)

    const ins = {
      mname: moduleName,
      iname: instanceName,
      type: 'text',
      value: '1111',
      label: 'input:'+instanceName,
      // counter: 0,
      onInput: undefined,
      onChange: undefined,
      // ----------------------------------------------
      gmi: __modulesLoader.getModInst, // const someInstance = this.gmi('moduleName.instanceName')
      constructor() {
        this.iEl = document.querySelector(`.${moduleName}.${this.iname}`)
        if(!this.iEl) return
        this.iEl.querySelector('.input').setAttribute('id', `${moduleName}-${this.iname}`)
        this.iEl.querySelector('.label').setAttribute('for', `${moduleName}-${this.iname}`)
      },
      render() {
        if(!this.iEl){ 
          if(!document.querySelector(`.${moduleName}.${this.iname}`)) return
          this.constructor()
        }
        this.iEl.querySelector('.label').innerHTML = this.label
        this.iEl.querySelector('.input').setAttribute('type', this.type)
        this.iEl.querySelector('.input').value = this.value
        return this
      },
      doOnInput(e, el){
        this.value = el.value;
        e.value = el.value;
        if(this.onInput) this.onInput(e, this);
      },
      doOnChange(e, el){
        if(this.onChange) this.onChange(e, this);
      },
      // incCounter() {
      //   this.counter++
      //   this.render()
      //   return this
      // },
      // ----------------------------------------------
    }
    ins.constructor();
    instances[instanceName] = ins
    // setTimeout(function (ins) { ins.constructor() }, 0, ins)
    return ins
  }
  const getInstance = (instanceName) => {
    return instances[instanceName]
  }
  const getModuleInstance = (el) => {
    debugger
    const inst = instances[el.closest('.' + moduleName).dataset.instance]
    // console.log('inst: ', inst);

    return inst
  }
  const renderAllInstance = () => {
    for (const [key, value] of Object.entries(instances)) {
      value.render() // render all module2 instances
    }
  }
  const scanAllInstance = (cbFunc) => {
    for (const [key, value] of Object.entries(instances)) {
      cbFunc(value)
    }
  }

  const setValues = (arrArr) => {
    arrArr.forEach(([n, v]) => {
      const ins = getInstance(n)
      if(ins){
        ins.value = v;
        ins.render();
      }
    });
  }
  const getJsonValues = (arrArr) => {
    const rez = [];
    arrArr.forEach((n) => {
      const ins = getInstance(n)
      if(ins){
        rez.push({inst: n, val: ins.value})
      }
    });
    return JSON.stringify(rez, null, 2)
  }

  { //ВНИМАНИЕ! этот ОБЯЗАТЕЛЬНЫЙ кусок надо вставить перед return
    const __el = __modulesList.find(el => el.name === moduleName)
    if (__el) setTimeout(function (__el) { __modulesLoader.continueLoad(__el) }, 1, __el)
    const r = { // тут перечисляются функции и свойства модуля которые будут доступные из вне.
      moduleName,

      setValues,
      getJsonValues,

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
