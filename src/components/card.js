
// @todo: Функция создания карточки

function createCard(cardData, callbacks) {

  const cardTemplate = document.querySelector('#card-template').content;
  const card = cardTemplate.querySelector('.places__item').cloneNode(true);

  const cardImage = card.querySelector('.card__image');
  cardImage.src = cardData.cardLink;
  cardImage.alt = cardData.cardName;

  const cardTitle = card.querySelector('.card__title');
  cardTitle.textContent = cardData.cardName;

  const deleteButton = card.querySelector('.card__delete-button');
  deleteButton.addEventListener('click', callbacks.deleteFunc);

  
  const like = card.querySelector('.card__like-button')
  like.addEventListener('click', callbacks.likeFunc)

  cardImage.addEventListener('click', () => {callbacks.renderModalFunc(cardData.cardLink, cardData.cardName)})

  return card
}

// @todo: Функция удаления карточки

function deleteCard(evt) {
  const eventTarget = evt.target;
  const targetParent = eventTarget.closest('.places__item')
  targetParent.remove()
}

// лайк карточки

function likeCard(evt) {
  evt.target.classList.toggle('card__like-button_is-active')
}


export { createCard, deleteCard, likeCard };