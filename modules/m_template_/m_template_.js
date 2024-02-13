/* 
const myInstances = {};

class MInstance {
  _mInts = undefined;
  _mName = '';
  _iName = '';

  constructor(mInts, mName, iName) {
    if(!mInts) throw new Error(`MInstance: mInts required!`);
    if(!mName) throw new Error(`MInstance: mName required!`);
    if(!iName) throw new Error(`MInstance: iName required!`);
    if (mInts[iName]) throw new Error(`${mName}.instance '${iName}' already exist!`);
    this._mInts = mInts;
    this._mName = mName;
    this._iName = iName;
    mInts[iName] = this;
  }
  get mname() {return this._mName;}
  get iname() {return this._iName;}

  render() { }
}

class Test extends MInstance{
  constructor(inst){
    super(myInstances, 'test', inst)
  }
  render(){
    console.log(`Test.render ${this.mname}.${this.iname}`);
  }
}

const t1 = new Test('inst1')
const t2 = new Test('inst2')
console.log('t1: ', t1);
console.log('t2: ', t2);
t1.render()
t2.render()
debugger

*/

var m_template_ = (() => {
  const moduleName = 'm_template_';

  // эта часть отвечает за создание и работу порождаемых экземпляров объектов 
  const instances = {};
  const createInstance = (instanceName) => {
    if (instances[instanceName]) throw new Error(`m_template_.instance '${instanceName}' already exist!`);

    const ins = {
      mname: moduleName,
      iname: instanceName,
      counter: 0,
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
        this.iEl.querySelector('.instance').innerHTML = this.iname;
        this.iEl.querySelector('.counter').innerHTML = this.counter;
        return this;
      },
      incCounter() {
        this.counter++;
        this.render();
        return this;
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
