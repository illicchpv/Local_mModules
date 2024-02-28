module.exports = {
  prompt: ({inquirer}) => {
    const questions = [
      {
        type: 'input',
        name: 'component_name',
        message: 'имя компонента',
      },
      // {
      //   type: 'input',
      //   name: 'dir',
      //   message: 'вложенная директория?(optional)',
      // },
    ];

    return inquirer.prompt(questions).then(aunswers => {
      const {component_name} = aunswers;
      const path = `${component_name}`;
      const absPath = `modules/${path}`;
      const len = component_name.length;
      if (len < 5) {
        throw new Error('название модуля не менее 5 букв');
      }
      if (component_name[0] !== 'm' || component_name[1] !== component_name[1].toUpperCase()) {
        throw new Error('название модуля должно начинаться с "m" далее с большой буквы ');
      }
      return {...aunswers, path, absPath};
      // const {component_name, dir} = aunswers
      // const path = `${dir ? `${dir}/` : ''}${component_name}`
      // const absPath = `src/components/${path}`
      // return {...aunswers, path, absPath}
    });
  }
};
