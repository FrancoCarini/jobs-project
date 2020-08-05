import axios from 'axios'
import Swal from 'sweetalert2'

document.addEventListener('DOMContentLoaded', () => {
  const skillsHtml = document.querySelector('.lista-conocimientos')

  if (skillsHtml) {
    skillsHtml.addEventListener('click', addSkill)
  }

  const jobsList = document.querySelector('.panel-administracion')
  if (jobsList) {
    jobsList.addEventListener('click', deleteJob)
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

const deleteJob = e => {
  e.preventDefault()
  if (e.target.dataset.id) {
    Swal.fire({
      title: 'Deseas borrar este trabajo?',
      text: 'Un trabajo borrado no se puede recuperar',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Borrar',
      cancelButtonText: 'Cancelar'
    })
    .then(result => {
      if (result.value) {
        const url = `${location.origin}/jobs/delete/${e.target.dataset.id}`
        axios.delete(url)
        .then(result => {
          if (result.status === 200) {
            Swal.fire(
              'Eliminado',
              result.data,
              'success'
            );

            e.target.parentElement.parentElement.parentElement.removeChild(e.target.parentElement.parentElement);
          }
        })
        .catch(() => {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No se pudo eliminar'
          })
        })
      }
    })
  } else if (e.target.tagName === 'A') {
    window.location.href = e.target.href
  }
}