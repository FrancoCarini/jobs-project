document.addEventListener('DOMContentLoaded', () => {
  const skillsHtml = document.querySelector('.lista-conocimientos')

  if (skillsHtml) {
    skillsHtml.addEventListener('click', addSkill)
  }
})

const skills = []
const addSkill = e => {
  if (e.target.tagName === 'LI') {
    const skillid = e.target.dataset.skillid
    if (e.target.classList.contains('activo')) {
      // Remove from skills array
      const index = skills.indexOf(skillid);
      if (index > -1) {
        skills.splice(index, 1);
      }
      // Remove class activo from li
      e.target.classList.remove('activo')
    } else {
      // add to skills array
      skills.push(skillid)
      // Add class activo to li
      e.target.classList.add('activo')
    }
  }
  document.querySelector('input[name="skills"]').value = skills
}