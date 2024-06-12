import './pages/index.css';
import {initialCards} from './scripts/cards.js'
// @todo: Темплейт карточки

const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы

const placesList = document.querySelector('.places__list');

// @todo: Функция создания карточки

function createCard(cardName, cardLink, deleteFunc) {
  const card = cardTemplate.querySelector('.places__item').cloneNode(true);

  const cardImage = card.querySelector('.card__image');
  cardImage.src = cardLink;
  cardImage.alt = cardName;

  const cardTitle = card.querySelector('.card__title');
  cardTitle.textContent = cardName;

  const deleteButton = card.querySelector('.card__delete-button');
  deleteButton.addEventListener('click', deleteFunc);

  return card
}


function renderCard(cardName, cardLink) {
  const card = createCard(cardName, cardLink, deleteCard);
  placesList.append(card);
}


// @todo: Функция удаления карточки

function deleteCard(evt) {
  const eventTarget = evt.target;
  const targetParent = eventTarget.closest('.places__item')
  targetParent.remove()
}

// @todo: Вывести карточки на страницу

initialCards.forEach(function(item) {
  renderCard(item.name, item.link, deleteCard);
})

