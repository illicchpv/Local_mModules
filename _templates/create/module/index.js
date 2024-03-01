module.exports = {
  prompt: ({inquirer}) => {
    const questions = [
      {
        type: 'input',
        name: 'module_type',
        message: 'тип модуля ([1-btn], 2-check, 3-input)?',
      },
      {
        type: 'input',
        name: 'module_name',
        message: 'имя модуля',
      },
    ];

    return inquirer.prompt(questions).then(answers => {
      const {module_name, module_type} = answers;
      // throw new Error(` module_type:[${module_type.trim()}] module_name:[${module_name.trim()}]`);

      let mn = 'mBtn_';
      switch (module_type.trim()) {
        default: break; //case '1'
        case '2': mn = 'mCheck_'; break;
        case '3': mn = 'mInp_'; break;
      }
      const min_len = 4;
      const mn2 = module_name.trim();
      const len = mn2.length;
      if (len < min_len) {
        throw new Error(`название модуля не менее ${min_len} букв`);
      }
      const mod_name = mn + mn2;
      const path = `${mod_name}`;
      const absPath = `modules/${path}`;
      // throw new Error(`mn:[${mod_name}]`);
      return {module_name: mod_name, path, absPath};

      /*
      const path = `${module_name}`;
      const absPath = `modules/${path}`;
      const len = module_name.length;
      if (len < 5) {
        throw new Error('название модуля не менее 5 букв');
      }
      if (module_name[0] !== 'm' || module_name[1] !== module_name[1].toUpperCase()) {
        throw new Error('название модуля должно начинаться с "m" далее с большой буквы ');
      }
      */
      // const {module_name, module_type} = answers
      // const path = `${module_type ? `${module_type}/` : ''}${module_name}`

      return {...answers, path, absPath};
    });
  }
};
