
// @todo: Функция создания карточки

function createCard(cardName, cardLink, deleteFunc, likeFunc,  renderModalFunc) {
  const cardTemplate = document.querySelector('#card-template').content;
  const card = cardTemplate.querySelector('.places__item').cloneNode(true);

  const cardImage = card.querySelector('.card__image');
  cardImage.src = cardLink;
  cardImage.alt = cardName;

  const cardTitle = card.querySelector('.card__title');
  cardTitle.textContent = cardName;

  const deleteButton = card.querySelector('.card__delete-button');
  deleteButton.addEventListener('click', deleteFunc);

  
  const like = card.querySelector('.card__like-button')
  like.addEventListener('click', likeFunc)

  cardImage.addEventListener('click', () => {renderModalFunc(cardLink, cardName)})

  return card
}

// функция вывода карточки на страницу

function renderCard(cardName, cardLink, renderCardModalFunc, start=true) {
  const placesList = document.querySelector('.places__list');
  const card = createCard(cardName, cardLink, deleteCard, likeCard, renderCardModalFunc);
  if (start) {
    placesList.append(card);
  } else {placesList.prepend(card);}
  
}


// @todo: Функция удаления карточки

function deleteCard(evt) {
  const eventTarget = evt.target;
  const targetParent = eventTarget.closest('.places__item')
  targetParent.remove()
}

// лайк карточки

function likeCard(evt) {
  evt.target.classList.add('card__like-button_is-active')
}


export { createCard, renderCard, deleteCard, likeCard };