exports.selectSkills = (selected = [], options) => {
  const skills = ['NodeJs', 'Vainilla JS', 'HTML5', 'CSS', 'Typescript', 'ReactJs', 'VueJs', 'MongoDB', 'MySql', 'PostgresSql', 'Sequelize', 'Mongoose']
  let html = ''
  skills.forEach(skill => {
    html += `<li>${skill}</li>`
  })

  return options.fn().html = html
}