
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

  if (cardData.profileInfo._id === cardData.cardInfo.owner._id ) {
    deleteButton.addEventListener('click', (evt) =>
      {callbacks.deleteFunc(evt);
       callbacks.deleteOnServerFunc(cardData.cardId)}
      );}
  else {
    deleteButton.remove()
  }
  
 

  const numberOfLikes = card.querySelector('.number-of-likes')
  numberOfLikes.textContent = cardData.likes.length

  const like = card.querySelector('.card__like-button')

  if (cardData.likes.some(like => {return like._id === cardData.profileInfo._id})) {
    like.classList.add('card__like-button_is-active')
  }

  like.addEventListener('click', evt => {
    callbacks.likeFunc(evt);
    if (evt.target.classList.contains('card__like-button_is-active')) {
      callbacks.likeCardOnServerFunc(cardData.cardId)
      .then(res => {
        numberOfLikes.textContent = res.likes.length
      })}
    else {
      callbacks.removeLikeFromCardOnServerFunc(cardData.cardId)
      .then(res => {
        numberOfLikes.textContent = res.likes.length
      })
    }
})

  

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