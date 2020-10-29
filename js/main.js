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
const sectionHeading = document.querySelector('.menu-heading')



// объявление вспомогательных переменных
let login = localStorage.getItem('gloDelivery');

// Функция запроса данных
const getData = async function (url) {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Ошибка по адресу ${url}, статус ошибки ${response.status}!`)
  }

  return await response.json()
}










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

function createCardRestaurant(restaurant) {

  const {
    image,
    kitchen,
    name,
    stars,
    price,
    products,
    time_of_delivery: timeOfDelivery
  } = restaurant
  const card = `
    <a class="card card-restaurant" data-products="${products}" data-name="${name}" data-price="${price}" data-stars="${stars}" data-kitchen="${kitchen}">
      <img src="${image}" alt="${name}" class="card-image"/>
      <div class="card-text">
        <div class="card-heading">
          <h3 class="card-title">${name}</h3>
          <span class="card-tag tag">${timeOfDelivery} мин</span>
          </div>
            <div class="card-info">
            <div class="rating">
              ${stars}
            </div>
          <div class="price">От ${price} ₽</div>
          <div class="category">${kitchen}</div>
        </div>
      </div>
    </a>
  `;

  cardsRestaurants.insertAdjacentHTML('beforeend', card)


}



function createCardGood(goods) {

  const card = document.createElement('div')
  card.className = 'card'

  const {
    description,
    image,
    name,
    price
  } = goods

  card.innerHTML = `
    
      <img src="${image}" alt="${name}" class="card-image"/>
      <div class="card-text">
        <div class="card-heading">
          <h3 class="card-title card-title-reg">${name}</h3>
      </div>
        <div class="card-info">
          <div class="ingredients">${description}</div>
        </div>
        <div class="card-buttons">
          <button class="button button-primary button-add-cart">
            <span class="button-card-text">В корзину</span>
            <span class="button-cart-svg"></span>
          </button>
          <strong class="card-price-bold">${price} ₽</strong>
        </div>
      </div>
  `;

  cardsMenu.insertAdjacentElement('beforeend', card)


}

// Функция заполнения заголовка в menu
function createSectionHeading(name, price, stars, kitchen) {
  const content = `
    <h2 class="section-title restaurant-title">${name}</h2>
    <div class="card-info">
      <div class="rating">
        ${stars}
      </div>
      <div class="price">От ${price} ₽</div>
      <div class="category">${kitchen}</div>
    </div>
  `;
  sectionHeading.innerHTML = content
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
      getData(`./db/${restaurant.dataset.products}`).then(data => {
        data.forEach(createCardGood)
        createSectionHeading(restaurant.dataset.name, restaurant.dataset.price, restaurant.dataset.stars, restaurant.dataset.kitchen)
      })
    }
  } else {
    toogleModalAuth()
  }
}



function init() {
  getData('./db/partners.json').then(data => {
    data.forEach(createCardRestaurant)
  })


  cartButton.addEventListener("click", toggleModal);

  close.addEventListener("click", toggleModal);

  cardsRestaurants.addEventListener('click', openGoods)

  logo.addEventListener('click', () => {
    containerPromo.classList.remove('hide')
    restaurants.classList.remove('hide')
    menu.classList.add('hide')
  })

  checkAuth()
}

init()