var mUserAccessRights = (() => {
  const moduleName = 'mUserAccessRights';

  // эта часть отвечает за создание и работу порождаемых экземпляров объектов 
  const instances = {};
  const createInstance = (instanceName) => {
    if (instances[instanceName]) throw new Error(`mUserAccessRights.instance '${instanceName}' already exist!`);

    const ins = {
      mname: moduleName,
      iname: instanceName,
      // counter: 0,
      title: '',
      noUserTitle: '',
      accountEmail: '',
      url0: '',
      url1: '',
      uarInfo: undefined, // [{}, {}],
      // uarInfoLoaded: false,
      open: 'all', // 'none' 'hasCheck' 'hasNoCheck'
      style: 'mUserAccessRights.css', // mUserAccessRightsV2.css
      // ----------------------------------------------
      nodeTemplate: '',
      subNodeTemplate: '',
      gmi: __modulesLoader.getModInst, // const someInstance = this.gmi('moduleName.instanceName')
      constructor() {
        this.iEl = document.querySelector(`.${moduleName}.${this.iname}`);
        if (!this.iEl) return;
        nodeTemplate = stringToDomElement(this.iEl.querySelector('.nodeTemplate').innerHTML);
        // nodeTemplate.innerHTML += ' ';
        subNodeTemplate = stringToDomElement(this.iEl.querySelector('.subNodeTemplate').innerHTML);
        // subNodeTemplate.innerHTML += ' ';
        this.iEl.querySelector('.nodeTemplate').remove();
        this.iEl.querySelector('.subNodeTemplate').remove();
      },
      ar: [],
      render() {
        if (!this.iEl) {
          if (!document.querySelector(`.${moduleName}.${this.iname}`)) return;
          this.constructor();
        }
        if (this.accountEmail === 'no@no.no') {
          this.iEl.querySelector('.title').innerHTML = this.noUserTitle || `${this.iname} ${this.accountEmail}`;
        }
        else {
          this.iEl.querySelector('.title').innerHTML = this.title || `${this.iname} ${this.accountEmail}`;
        }
        const details = this.iEl.querySelectorAll('details');

        this.ar = [];
        details.forEach((el, i) => {
          const rootCheck = el.querySelector('.rootCheck');
          const checks = el.querySelectorAll('.subNodeCheck');
          const avail = el.closest('details').querySelector('.available');
          const arSt = {
            name: el.dataset.st,
            allow: [],
          };
          let cntAvail = 0;
          let st = true;
          checks.forEach(el2 => {
            if (el2.checked) {
              cntAvail++;
              arSt.allow.push(el2.dataset.bl);
            }
            else st = false;
          });
          rootCheck.checked = st ? true : false;
          avail.innerText = cntAvail;
          if (rootCheck.checked) arSt.allow = ['*'];
          // console.log(`rootCheck(${i}).checked: `, rootCheck.checked, st);
          this.ar.push(arSt);
        });

        console.log('this.ar: ', this.ar);
        return this;
      },
      reopenRoots() {
        const details = this.iEl.querySelectorAll('details');
        details.forEach((el, i) => {
          const rootCheck = el.querySelector('.rootCheck');
          const checks = el.querySelectorAll('.subNodeCheck');
          const avail = el.closest('details').querySelector('.available');
          let cntAvail = +avail.innerText;
          {
            const detail = el;
            if (this.open.toLowerCase() === 'none') {
              detail.removeAttribute('open');
            }
            else if (this.open.toLowerCase() === 'hascheck') {
              if (cntAvail > 0) detail.setAttribute('open', true);
              else detail.removeAttribute('open');
            }
            else if (this.open.toLowerCase() === 'hasnocheck') {
              if (cntAvail === 0) detail.setAttribute('open', true);
              else detail.removeAttribute('open');
            }
            else {
              detail.setAttribute('open', true);
            }
          }

        });
      },
      build() {
        const box = this.iEl.querySelector('.box');
        box.innerHTML = '';

        if (!this.uarInfo) return this;
        try {
          const [config, allowed] = this.uarInfo;
          config.roots.forEach(elRoots => {
            if (!elRoots.root || elRoots.root <= 0) return;
            const detail = nodeTemplate.cloneNode(true);
            detail.dataset.st = elRoots.root;

            detail.querySelector('.nn').innerHTML = elRoots.name;
            const rootSubNodes = config.subNodes.filter(ell => ell.root === elRoots.root).sort((a, b) => a.subNode - b.subNode);
            const allowedRootSubNodes = allowed.allowed.filter(ell => ell.root === elRoots.root);

            detail.querySelector('.available').innerHTML = allowedRootSubNodes.length;
            detail.querySelector('.total').innerHTML = rootSubNodes.length;

            const innerBox = detail.querySelector('.innerBox');
            let cntAvail = 0;
            rootSubNodes.forEach(ell => {
              const nsn = subNodeTemplate.cloneNode(true);
              // nsn.dataset.bl = ell.subNode;
              const id = this.mname + '_' + this.iname + '_' + ell.root + '_' + ell.subNode;
              nsn.querySelector('label').innerHTML = ell.name;
              nsn.querySelector('label').setAttribute("for", id);
              nsn.querySelector('input').setAttribute("id", id);
              nsn.querySelector('input').dataset.bl = ell.subNode;
              const e = allowedRootSubNodes.find(el3 => el3.subNode === '*' || el3.subNode === ell.subNode);
              if (e) {nsn.querySelector('input').setAttribute("checked", true); cntAvail++;}

              innerBox.append(nsn);
            });

            {
              if (this.open.toLowerCase() === 'none') {
                ;
              }
              else if (this.open.toLowerCase() === 'hascheck') {
                if (cntAvail > 0) detail.setAttribute('open', true);
              }
              else if (this.open.toLowerCase() === 'hasnocheck') {
                if (cntAvail === 0) detail.setAttribute('open', true);
              }
              else {
                detail.setAttribute('open', true);
              }
            }

            box.append(detail);
          });
          // box.innerHTML = box.innerHTML + ' ';

        } catch (e) {
          console.error(`mUserAccessRights.render e:${e}`);
          debugger;
        }
      },
      async setAccountEmail(email) {
        if (email === 'no@no.no') {
          if (!this.url0) {
            console.error('mUserAccessRights -- url0!');
            debugger;
            return;
          }
          this.accountEmail = email;
          {
            const dl = async (arr) => {
              const rez = await IncludHtml.doLoadUrls(arr);
              return rez;
            };
            const rez = await dl([this.url0]);
            let config = JSON.parse(rez[0].txt);
            if (!config.roots) {
              config = formatConfigConvert(config, namePref = 'блок');
            }
            this.uarInfo = [config, {allowed: []}];
          }
        }
        else {
          if (!this.url0 || !this.url1) {
            console.error('mUserAccessRights -- url0 или url1 не заданы!');
            debugger;
            return;
          }
          this.accountEmail = email;
          // if (!this.uarInfoLoaded) 
          {
            const dl = async (arr) => {
              const rez = await IncludHtml.doLoadUrls(arr);
              // this.uarInfoLoaded = true;
              return rez;
            };
            const rez = await dl([this.url0, this.url1]);
            let config = JSON.parse(rez[0].txt);
            if (!config.roots) {
              config = formatConfigConvert(config, namePref = 'блок');
            }
            let allow = JSON.parse(rez[1].txt);
            if (!allow.allowed) {
              allow = formatAccessConvert(config, allow);
            }
            this.uarInfo = [config, allow];
          }
        }
        this.build();
        this.render();
        return this;
      },
      doOnChange(e, el) {
        this.render();
      },
      doOnChangeRoot(e, elSub) {
        const nodeCheckArr = elSub.closest('details').querySelectorAll('.subNodeCheck');
        nodeCheckArr.forEach(el => el.checked = elSub.checked);
        this.render();
      },
      setStyle(style) {
        const s = document.getElementById(moduleName + '_css');
        if (s) {
          if (style.indexOf('/') < 0) s.href = s.href.substring(0, s.href.lastIndexOf('/') + 1) + style;
          else s.href = style;
        }
      },
      set urlConfig(v) {
        this.url0 = v;
      },
      set urlUserAccess(v) {
        this.url1 = v;
      },
      loadAccessRightsStart(params) {
        const {userId, lang, storUrl, getPsid} = params;
        console.log('loadAccessRightsStart params: ', params);
        try {
          // используя storUrl получаем moduleId
          // ???
          const moduleId = 'moduleId???';
          // используя moduleId получаем psid
          getPsid('moduleId', (psid) => {
            console.log('getPsid: psid: ', psid);
            // debugger;
            // после получения psid moduleId не надо использовать в запросах !!!
            // запрашиваем инфо по блоку moduleId + !!! URL ---moduleId
            this._getAllBlockInfo(psid, moduleId, lang, (blockInfo) => {
              console.log('_getAllBlockInfo: blockInfo: ', blockInfo);
              // debugger;
            });
            // запрашиваем права пользователя + !!! URL  ??? lang ---moduleId
            this._getUserAr(psid, moduleId, userId, lang, (userAr) => {
              console.log('_getUserAr: userAr: ', userAr);
              // debugger;
            });
          });

        } catch (e) {
          console.error('loadAccessRightsStart -- catch(e):', e);
          debugger;
        }
      },
      _getAllBlockInfo(psid, moduleId, lang, cb) {
        console.log('_getAllBlockInfo psid, moduleId, lang, cb: ', psid, moduleId, lang, !!cb);
        if (cb) cb('BlockInfo');
      },
      _getUserAr(psid, moduleId, userId, lang, cb) {
        console.log('_getAllBlockInfo psid, moduleId, userId, lang, cb: ', psid, moduleId, userId, lang, !!cb);
        if (cb) cb('UserAr');
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
  const getModuleInstance = (elRoots) => {
    const inst = instances[elRoots.closest('.' + moduleName).dataset.instance];
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
