// @todo: Темплейт карточки

const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы

const placesList = document.querySelector('.places__list');

// @todo: Функция создания карточки

function createCard(cardName, cardLink, deleteFunc) {
  card = cardTemplate.querySelector('.places__item').cloneNode(true);
  card.querySelector('.card__image').src = cardLink;
  card.querySelector('.card__title').textContent = cardName;
  placesList.append(card);
  const deleteButton = card.querySelector('.card__delete-button');
  deleteButton.addEventListener('click', deleteFunc);

}

// @todo: Функция удаления карточки

function deleteCard(evt) {
  const eventTarget = evt.target;
  const targetParent = eventTarget.parentElement
  targetParent.remove()
}

// @todo: Вывести карточки на страницу

initialCards.forEach(function(item) {
  createCard(item.name, item.link, deleteCard);
})
