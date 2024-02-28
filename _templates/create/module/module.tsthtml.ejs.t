---
to: <%= absPath %>/../../tst-<%= component_name %>.html
---


<!DOCTYPE html>
<html lang="ru">

<head>

  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="icon" type="image/x-icon" href="./favicon.ico">
  <title><%= component_name %> test</title>

  <!-- вставка для модулей -->
  <script src="/isLocal.js"></script>
  <script>
    if (typeof isLocal === 'undefined') var isLocal = false;
    const modulesUrl = isLocal ? '/modules/' : '//aclive.ru/modules-tests/lib1/';
    console.log('modulesUrl: ', modulesUrl);
    {
      const s0 = '<' + 'script '; const s1 = '<' + '/script>'; const eol = '\r';

      document.write(s0 + 'src="' + modulesUrl + 'utils.js" defer>' + s1);
      document.write(s0 + 'src="' + modulesUrl + 'IncludHtml.js" defer>' + s1);
      document.write(s0 + 'src="' + modulesUrl + 'modulesLoader.js" defer>' + s1);
    }

    // var __modulesList = [ // можно по простому так:
    //   {name: '<%= component_name %>', js: modulesUrl + '<%= component_name %>/<%= component_name %>.js', css: modulesUrl + '<%= component_name %>/<%= component_name %>.css', },
    // ];
    var __modulesList = [];
    {
      const mModulesList = ['<%= component_name %>',];
      mModulesList.forEach(mModuleName => {
        const str = `__modulesList.push({name: '${mModuleName}', js: modulesUrl + '${mModuleName}/${mModuleName}.js', css: modulesUrl + '${mModuleName}/${mModuleName}.css', })`;
        eval(str);
      });
    }
  </script>
  <!-- /вставка для модулей -->

  <style>
    body {
      font-family: Arial, Helvetica, sans-serif;
    }

    h1 {
      text-align: center;
    }

    .container {
      max-width: 1200px;
      background-color: lightcyan;
      margin: 0 auto;
      padding: 10px;
    }
  </style>
</head>

<body>
  <div class="container">
    <h2>test модуль: <%= component_name %></h2>
  </div>

  <div class="container">

    <div class="incs" data-incs='{
      module: <%= component_name %>,
      incFile: modulesUrl + "<%= component_name %>/<%= component_name %>.html",
      onLoadCallback(el){try {
          initInstHtml({ el: el, 
            // appName: ``,
            instName: `instance1`});
      } catch (e) {debugger;}},
      callbackAfterLoadHtml(el){try {
          const inst = initInstObj(el)
          inst.counter = 30;
      } catch (e) {debugger;}},
    }'>этот элемент будет заменён из <%= component_name %>.html</div>

  </div>

</body>

</html>
