---
to: <%= absPath %>/<%= module_name %>.html
---

<!-- 
    <div class="incs" data-incs='{
      module: mBtn_test001,
      incFile: modulesUrl + "mBtn_test001/mBtn_test001.html",
      onLoadCallback(el){try {
        const {mname, iname} = initInstHtml({ el: el, 
          // appName: ``,
          instName: `instance1`});
        //el.extEl.innerHTML = el.extEl.innerHTML.replaceAll(`%inId%`,`${mname}_${iname}`); // преобразование перед вставкой
      } catch (e) {debugger;}},
      callbackAfterLoadHtml(el){try {
        const inst = initInstObj(el)
        inst.counter = 30;
        inst.disabled = false;
        inst.onIncCounter = (event, el) =>{
          console.log(`onIncCounter mBtn_test001.${inst.iname}.onIncCounter`);
        }        
      } catch (e) {debugger;}},
    }'>этот элемент будет заменён из mBtn_test001.html</div>
-->
<div id="extId" class="<%= module_name %>">
  <style>
    
  </style>
  <h3><%= module_name %>.<span class="instance">instance</span> </h3>
  <div class="box">
    <img src="./m_resurs/imgInHtml.svg" alt="cc.svg">
    
    <div class="box__row">
      <span>
        counter: 
        <span class="counter">0000</span>
      </span>
      <button onclick="<%= module_name %>.getModuleInstance(this).incCounter(event, this)">press for counter++</button>
    </div>
  </div>
</div>
