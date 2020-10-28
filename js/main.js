'use strict'

// Получение элементов DOM
const cartButton = document.querySelector("#cart-button");
const modal = document.querySelector(".modal");
const close = document.querySelector(".close");
const buttonAuth = document.querySelector('.button-auth');
const modalAuth = document.querySelector('.modal-auth ');
const closeAuth = document.querySelector('.close-auth');
const loginForm = document.querySelector('#logInForm');
const loginInput = document.querySelector('#login');
const password = document.querySelector('#password');
const buttonOut = document.querySelector('.button-out');
const userName = document.querySelector('.user-name');
const cardsRestaurants = document.querySelector('.cards-restaurants');
const containerPromo = document.querySelector('.container-promo')
const restaurants = document.querySelector('.restaurants')
const menu = document.querySelector('.menu')
const logo = document.querySelector('.logo')
const cardsMenu = document.querySelector('.cards-menu')



// объявление вспомогательных переменных
let login = localStorage.getItem('gloDelivery');


// функция открытия / закрытия модального окна
function toggleModal() {
  modal.classList.toggle("is-open");
}
// функция открытия / закрытия модального окна с авторизацией
function toogleModalAuth() {
  modalAuth.classList.toggle('is-open')
}
//  функция авторизации
function authorized() {


  function logOut() {
    login = null
    buttonAuth.style.display = ''
    userName.classList.remove('is-open')
    buttonOut.classList.remove('is-open')
    buttonOut.removeEventListener('click', logOut)
    localStorage.removeItem("gloDelivery")

    checkAuth()
    containerPromo.classList.remove('hide')
    restaurants.classList.remove('hide')
    menu.classList.add('hide')
  }
  console.log('Авторизован');

  buttonAuth.style.display = 'none'
  userName.classList.add('is-open')
  buttonOut.classList.add('is-open')
  userName.textContent = login
  buttonOut.addEventListener('click', logOut)
}

function notAuthorized() {
  function logIn(e) {
    e.preventDefault()
    if (loginInput.value && password.value) {
      login = loginInput.value

      localStorage.setItem('gloDelivery', login)
      toogleModalAuth()
      buttonAuth.removeEventListener('click', toogleModalAuth)
      closeAuth.removeEventListener('click', toogleModalAuth)
      loginForm.removeEventListener('submit', logIn)
      loginForm.reset()
      checkAuth()
    } else {
      if (!loginInput.value) {
        loginInput.style.boxShadow = '0px 0px 15px rgb(233, 10, 10)'
        loginInput.addEventListener('input', () => {
          loginInput.style.boxShadow = ''
        })
      }
      if (!password.value) {
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
  if (login) {
    authorized()
  } else {
    notAuthorized()
  }
}

function createCardRestaurant() {
  const card = `
  <a class="card card-restaurant">
    <img src="img/pizza-plus/preview.jpg" alt="image" class="card-image"/>
    <div class="card-text">
      <div class="card-heading">
        <h3 class="card-title">Пицца плюс</h3>
        <span class="card-tag tag">50 мин</span>
        </div>
          <div class="card-info">
          <div class="rating">
            4.5
          </div>
        <div class="price">От 900 ₽</div>
        <div class="category">Пицца</div>
      </div>
    </div>
  </a>
  `;

  cardsRestaurants.insertAdjacentHTML('beforeend', card)


}

function createCardGood() {
  const card = document.createElement('div')
  card.className = 'card'

  card.innerHTML = `
    
      <img src="img/pizza-plus/pizza-classic.jpg" alt="image" class="card-image"/>
      <div class="card-text">
        <div class="card-heading">
          <h3 class="card-title card-title-reg">Пицца Классика</h3>
      </div>
        <div class="card-info">
          <div class="ingredients">Соус томатный, сыр «Моцарелла», сыр «Пармезан», ветчина, салями,
            грибы.
          </div>
        </div>
        <div class="card-buttons">
          <button class="button button-primary button-add-cart">
            <span class="button-card-text">В корзину</span>
            <span class="button-cart-svg"></span>
          </button>
          <strong class="card-price-bold">510 ₽</strong>
        </div>
      </div>
  `;

  cardsMenu.insertAdjacentElement('beforeend', card)
}

function openGoods(event) {

  if (login) {
    const target = event.target
    const restaurant = target.closest('.card-restaurant')

    if (restaurant) {
      cardsMenu.textContent = ''
      containerPromo.classList.add('hide')
      restaurants.classList.add('hide')
      menu.classList.remove('hide')

      createCardGood()
    }
  } else {
    toogleModalAuth()
  }



}

cartButton.addEventListener("click", toggleModal);

close.addEventListener("click", toggleModal);

cardsRestaurants.addEventListener('click', openGoods)

logo.addEventListener('click', () => {
  containerPromo.classList.remove('hide')
  restaurants.classList.remove('hide')
  menu.classList.add('hide')
})

checkAuth()
createCardRestaurant()