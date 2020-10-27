const cartButton = document.querySelector("#cart-button");
const modal = document.querySelector(".modal");
const close = document.querySelector(".close");

cartButton.addEventListener("click", toggleModal);
close.addEventListener("click", toggleModal);

function toggleModal() {
  modal.classList.toggle("is-open");
}


const buttonAuth = document.querySelector('.button-auth');
const modalAuth = document.querySelector('.modal-auth ');
const closeAuth = document.querySelector('.close-auth');
const loginForm = document.querySelector('#logInForm')
const loginInput = document.querySelector('#login')
const password = document.querySelector('#password')

const buttonOut = document.querySelector('.button-out')
const userName = document.querySelector('.user-name')

let login = localStorage.getItem('gloDelivery');

function toogleModalAuth() {
  modalAuth.classList.toggle('is-open')
}

function authorized() {

  function logOut() {
    login = null
    buttonAuth.style.display = ''
    userName.classList.remove('is-open')
    buttonOut.classList.remove('is-open')
    buttonOut.removeEventListener('click', logOut)
    localStorage.removeItem("gloDelivery")
    
    checkAuth()
  }
  console.log('Авторизован');

  buttonAuth.style.display = 'none'
  userName.classList.add('is-open')
  buttonOut.classList.add('is-open')
  userName.textContent = login
  buttonOut.addEventListener('click', logOut)
}

function notAuthorized() {
  console.log(' не Авторизован');

  function logIn(e) {
    e.preventDefault()
    if (loginInput.value && password.value){
      login = loginInput.value

      localStorage.setItem('gloDelivery', login)
      toogleModalAuth()
      buttonAuth.removeEventListener('click', toogleModalAuth)
      closeAuth.removeEventListener('click', toogleModalAuth)
      loginForm.removeEventListener('submit', logIn)
      loginForm.reset()
      checkAuth()
    } else {
      if (!loginInput.value){
        loginInput.style.boxShadow = '0px 0px 15px rgb(233, 10, 10)'
        loginInput.addEventListener('input', () => {
          loginInput.style.boxShadow = ''
        })
      }
      if (!password.value){
        password.style.boxShadow = '0px 0px 15px rgb(233, 10, 10)'
        password.addEventListener('input', () => {
          password.style.boxShadow = ''
        })
      }
      
    }
    
  }

  buttonAuth.addEventListener('click', toogleModalAuth)
  closeAuth.addEventListener('click', toogleModalAuth)
  loginForm.addEventListener('submit', logIn)
}


function checkAuth() {
  if (login){
    authorized()
  } else {
    notAuthorized()
  }
}



checkAuth()