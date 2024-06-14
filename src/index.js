import './pages/index.css';
import {initialCards} from './components/cards.js'
import { createCard, deleteCard, likeCard } from './components/card.js'
import { openModal, closeModal, closeByClickOnOverlay } from './components/modal.js'

// @todo: Темплейт карточки

const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы

const modalTypeEdit = document.querySelector('.popup_type_edit')  // попап с формой редактирования профиля
const modalTypeNewCard = document.querySelector('.popup_type_new-card')  // попап с формой добавления карточки


const profileEditButton = document.querySelector('.profile__edit-button') // кнопка редактирования профиля
const profileAddButton = document.querySelector('.profile__add-button') // кнопка добавления карточки

const placesList = document.querySelector('.places__list');

const modalTypeImage = document.querySelector('.popup_type_image')  // попап с карточкой

const modalInputName = document.querySelector('.popup__input_type_name')  // поле ввода имени профиля
const modalInputDescription = document.querySelector('.popup__input_type_description')  // поле ввода описания профиля

const profileTitle = document.querySelector('.profile__title')  // имя профиля
const profileDescription = document.querySelector('.profile__description')  // описание профиля

const nameInput = modalTypeNewCard.querySelector('.popup__input_type_card-name')
const linkInput = modalTypeNewCard.querySelector('.popup__input_type_url')

const modalImage = modalTypeImage.querySelector('.popup__image')
const modalCaption = modalTypeImage.querySelector('.popup__caption')
// функция вывода карточки на страницу

function renderCard(cardName, cardLink, renderCardModalFunc, start=true) {
  const card = createCard({'cardName': cardName, 'cardLink':cardLink},
     {'deleteFunc': deleteCard, 'likeFunc': likeCard, 'renderModalFunc': renderCardModalFunc});
  if (start) {
    placesList.append(card);
  } else {placesList.prepend(card);}
}


function renderCardModal(cardLink, cardName) {
  openModal(modalTypeImage)
  modalImage.src = cardLink
  modalImage.alt = cardName
  modalCaption.textContent = cardName
}


function fillFields() {
  modalInputName.value = profileTitle.textContent
  modalInputDescription.value = profileDescription.textContent}


// функция редактирование профиля
function editProfileFormSubmit(evt, modal) {

  evt.preventDefault(); 

  const nameInputValue = modalInputName.value
  const jobInputValue = modalInputDescription.value

  profileTitle.textContent = nameInputValue
  profileDescription.textContent = jobInputValue

  closeModal(evt.target.closest('.popup'))
}

function newCardFormSubmit(evt, renderCardFunc, renderCardModalFunc) {
  evt.preventDefault(); 

  renderCardFunc(nameInput.value, linkInput.value, renderCardModalFunc, false);
  closeModal(evt.target.closest('.popup'));
  
  nameInput.value = '';
  linkInput.value = '';
}

// @todo: Вывести карточки на страницу

initialCards.forEach(function(item) {
  renderCard(item.name, item.link, renderCardModal);
})





profileEditButton.addEventListener('click', () => { 
  openModal(modalTypeEdit);
  fillFields();
})

profileAddButton.addEventListener('click', () => { openModal(modalTypeNewCard) })


// форма для редактирования профиля
const editProfileForm = modalTypeEdit.querySelector('.popup__form')

editProfileForm.addEventListener('submit', (evt) =>
  {editProfileFormSubmit(evt, modalTypeEdit)}
);

// форма добавления карточки
const newCardForm = modalTypeNewCard.querySelector('.popup__form')

// функция для добавления карточки на страницу

newCardForm.addEventListener('submit', (evt) => {
  
  newCardFormSubmit(evt, renderCard, renderCardModal)
});

const closeButton = document.querySelectorAll('.popup__close')
closeButton.forEach(function(item) {
  item.addEventListener('click', () => { closeModal(item.closest('.popup')) })})

const contents = document.querySelectorAll('.popup__content')
contents.forEach(closeByClickOnOverlay)