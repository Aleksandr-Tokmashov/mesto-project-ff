import './pages/index.css';
import {initialCards} from './components/cards.js'
import { createCard, renderCard, deleteCard, likeCard } from './components/card.js'
import { renderCardModal, openModal, closeModal, handleFormSubmit, newCardFormSubmit } from './components/modal.js'

// @todo: Темплейт карточки

const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы

const modalTypeEdit = document.querySelector('.popup_type_edit')  // попап с формой редактирования профиля
const modalTypeNew = document.querySelector('.popup_type_new-card')  // попап с формой добавления карточки


const profileEditButton = document.querySelector('.profile__edit-button') // кнопка редактирования профиля
const profileAddButton = document.querySelector('.profile__add-button') // кнопка добавления карточки

// @todo: Вывести карточки на страницу

initialCards.forEach(function(item) {
  renderCard(item.name, item.link, renderCardModal);
})



profileEditButton.addEventListener('click', () => { openModal(modalTypeEdit, 'edit') })

profileAddButton.addEventListener('click', () => { openModal(modalTypeNew) })


// форма для редактирования профиля
const formElement = modalTypeEdit.querySelector('.popup__form')

formElement.addEventListener('submit', (evt) =>
  {handleFormSubmit(evt, modalTypeEdit)}
);

// форма добавления карточки
const newCardForm = modalTypeNew.querySelector('.popup__form')

// функция для добавления карточки на страницу

newCardForm.addEventListener('submit', (evt) => {
  
  newCardFormSubmit(evt, renderCard, renderCardModal)
});
