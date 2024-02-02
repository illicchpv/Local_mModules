var mUserAccessRights = (() => {
  const moduleName = 'mUserAccessRights';

  // эта часть отвечает за создание и работу порождаемых экземпляров объектов 
  const istances = {};
  const createInstance = (instanceName) => {
    if (istances[instanceName]) throw new Error(`mUserAccessRights.instance '${instanceName}' already exist!`);

    const ins = {
      mname: moduleName,
      iname: instanceName,
      // counter: 0,
      title: '',
      accountEmail: '',
      url0: '',
      url1: '',
      uarInfo: undefined, // [{}, {}],
      uarInfoLoaded: false,
      // ----------------------------------------------
      nodeTemplate: '',
      subNodeTemplate: '',
      gmi: __modulesLoader.getModInst, // const someInstance = this.gmi('moduleName.instanceName')
      constructor() {
        this.iEl = document.querySelector(`.${moduleName}.${this.iname}`);
        nodeTemplate = stringToDomElement(this.iEl.querySelector('.nodeTemplate').innerHTML);
        nodeTemplate.innerHTML += ' ';
        subNodeTemplate = stringToDomElement(this.iEl.querySelector('.subNodeTemplate').innerHTML);
        subNodeTemplate.innerHTML += ' ';
        this.iEl.querySelector('.nodeTemplate').remove();
        this.iEl.querySelector('.subNodeTemplate').remove();
      },
      render() {
        this.iEl.querySelector('.title').innerHTML = this.title || `${this.iname} ${this.accountEmail}`;
        this.iEl.querySelectorAll('details').forEach(elRoots => elRoots.setAttribute('open', true));
        return this;
      },
      build() {
        const box = this.iEl.querySelector('.box');
        box.innerHTML = '';
        
        if (!this.uarInfo) return this;
        try {
          const [config, allowed] = this.uarInfo;
          config.roots.forEach(elRoots => {
            if (elRoots.root <= 0) return;
            const nn = nodeTemplate.cloneNode(true);
            nn.querySelector('.nn').innerHTML = elRoots.name;
            const rootSubNodes = config.subNodes.filter(ell => ell.root === elRoots.root).sort((a, b) => a.subNode - b.subNode);
            const allowedRootSubNodes = allowed.allowed.filter(ell => ell.root === elRoots.root);

            nn.querySelector('.available').innerHTML = allowedRootSubNodes.length;
            nn.querySelector('.total').innerHTML = rootSubNodes.length;

            const innerBox = nn.querySelector('.innerBox');
            rootSubNodes.forEach(ell => {
              const nsn = subNodeTemplate.cloneNode(true);
              const id = this.mname + '_' + this.iname + '_' + ell.root + '_' + ell.subNode;
              nsn.querySelector('label').innerHTML = ell.name;
              nsn.querySelector('label').setAttribute("for", id);
              nsn.querySelector('input').setAttribute("id", id);
              const e = allowedRootSubNodes.find(elll => elll.subNode === ell.subNode);
              if (e) nsn.querySelector('input').setAttribute("checked", true);

              innerBox.append(nsn);
            });

            box.append(nn);
          });
          box.innerHTML = box.innerHTML + ' ';

        } catch (e) {
          console.error(`mUserAccessRights.render e:${e}`);
          debugger;
        }
      },
      async setAccountEmail(email) {
        if (!this.url0 || !this.url1) {
          console.error('mUserAccessRights -- url0 или url1 не заданы!');
          debugger;
          return;
        }
        this.accountEmail = email;
        if (!this.uarInfoLoaded) {
          const rez = await this.doLoad([this.url0, this.url1]);
          this.uarInfo = [JSON.parse(rez[0].txt), JSON.parse(rez[1].txt)];
        }
        this.build();
        this.render();
        return this;
      },
      async doLoad(arr) {
        const rez = await IncludHtml.doLoadUrls(arr);
        this.uarInfoLoaded = true;
        return rez;
      },
      doOnChange(e, elRoots) {
        // debugger;
        const avail = elRoots.closest('details').querySelector('.available');
        const cnt = +avail.innerText;
        avail.innerText = elRoots.checked ? cnt + 1 : cnt - 1;
      },
      // ----------------------------------------------
    };
    istances[instanceName] = ins;

    setTimeout(function (ins) {ins.constructor();}, 0, ins);
    return ins;
  };
  const getInstance = (instanceName) => {
    return istances[instanceName];
  };
  const getModuleInstance = (elRoots) => {
    const inst = istances[elRoots.closest('.' + moduleName).dataset.instance];
    // console.log('inst: ', inst);

    return inst;
  };
  const renderAllInstance = () => {
    for (const [key, value] of Object.entries(istances)) {
      value.render(); // render all module2 instances
    }
  };
  const scanAllInstance = (cbFunc) => {
    for (const [key, value] of Object.entries(istances)) {
      cbFunc(value);
    }
  };

  { //ВНИМАНИЕ! этот ОБЯЗАТЕЛЬНЫЙ кусок надо вставить перед return
    const __el = __modulesList.find(elRoots => elRoots.name === moduleName);
    if (__el) setTimeout(function (__el) {__modulesLoader.continueLoad(__el);}, 1, __el);
    const r = { // тут перечисляются функции и свойства модуля которые будут доступные из вне.
      moduleName,

      createInstance,
      getInstance,
      renderAllInstance,
      getModuleInstance,
      scanAllInstance,
    };
    const m = __modulesList.find(elRoots => elRoots.name === moduleName);
    if (m) {m.module = r;} else {throw new Error(`Ошибка в модуле: ${moduleName}`);}
    return r;
  }
})();
