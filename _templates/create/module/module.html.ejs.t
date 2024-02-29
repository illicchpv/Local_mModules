---
to: <%= absPath %>/<%= module_name %>.html
---

<!-- 
    <div class="incs" data-incs='{
      incFile: modulesUrl + "<%= module_name %>/<%= module_name %>.html",
      callbackAfterLoadHtml(el){
        try {
          const inst = initInstanceAfterLoadHtml({
            module: <%= module_name %>, el: el,
            // appName:`a1_`, // указывается в случае модуля-приложения(состоит из нескольких модулей)
            instName: `instance1`
          });
          inst.counter = 30;
        } catch (e) { }
      },
    }'>этот элемент будет заменён из <%= module_name %>.html</div>
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
      <button onclick="<%= module_name %>.getModuleInstance(this).incCounter()">press for counter++</button>
    </div>
  </div>
</div>
