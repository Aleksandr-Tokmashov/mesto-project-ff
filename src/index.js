import './pages/index.css';
import {initialCards} from './components/cards.js'
import { createCard, deleteCard, likeCard } from './components/card.js'
import { openModal, closeModal, closeByClickOnOverlay } from './components/modal.js'
import { enableValidation, clearValidation } from './components/validation.js'
import {getProfileInfoFromServer, getCardsFromServer, addCardOnServer,
  editProfileOnServer, deleteCardOnServer, likeCardOnServer,
  removeLikeFromCardOnServer, editAvatarOnServer
} from './components/api.js'

// @todo: Темплейт карточки

const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы

const modalTypeEdit = document.querySelector('.popup_type_edit')  // попап с формой редактирования профиля
const modalTypeNewCard = document.querySelector('.popup_type_new-card');
const modalTypeNewAvatar = document.querySelector('.popup_type_new-avatar')  // попап с формой добавления карточки


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

const avatarLinkInput = modalTypeNewAvatar.querySelector('.popup__input_type_url')

const modalImage = modalTypeImage.querySelector('.popup__image')
const modalCaption = modalTypeImage.querySelector('.popup__caption')

const profileImage = document.querySelector('.profile__image')

const formValidation = 
  {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
  }
// функция вывода карточки на страницу

const likeCallback = (evt, cardId, numberOfLikes) => {
  const likeMethod = evt.target.classList.contains('card__like-button_is-active') ? removeLikeFromCardOnServer : likeCardOnServer;
  likeMethod(cardId) 
      .then(res => { 
        numberOfLikes.textContent = res.likes.length; 
        likeCard(evt); 
      }) 
      .catch((err) => { 
        console.log(err); 
      }); 
}


function renderCard(cardData, callbacks, start=true) {
  const card = createCard({'cardName': cardData.cardName, 'cardLink': cardData.cardLink, 
    'cardId': cardData.cardId, 'likes': cardData.likes, 'cardInfo':  cardData.cardInfo,
    'profileInfo': cardData.profileInfo},
    {'deleteFunc': deleteCard, 'likeFunc': likeCard, 'likeCardOnServerFunc': likeCardOnServer,
     'renderModalFunc': callbacks.renderCardModalFunc, 'deleteOnServerFunc': deleteCardOnServer,
     'removeLikeFromCardOnServerFunc': removeLikeFromCardOnServer, 'likeCallback': likeCallback});
    
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
  renderLoading(editProfileForm, true)
  const nameInputValue = modalInputName.value
  const jobInputValue = modalInputDescription.value
  editProfileOnServer({name: nameInputValue, about: jobInputValue})
    .then((res) => {
      profileTitle.textContent = res.name
      profileDescription.textContent = res.about
    })
    .catch((err) => {
      console.log(err); 
    })
    .finally(() => {
      renderLoading(editProfileForm, false)
    })
  

  closeModal(evt.target.closest('.popup'))
}

function newCardFormSubmit(evt, renderCardFunc, renderCardModalFunc) {

  evt.preventDefault();
  renderLoading(newCardForm, true)
  addCardOnServer({name: nameInput.value, link: linkInput.value})
    .then(res => {
      renderCardFunc({
        'cardInfo': res,
        'profileInfo': res.owner,
        'cardName': res.name, 
        'cardLink': res.link,
        'cardId': res._id,
        'likes': res.likes},
        {'renderCardModalFunc' : renderCardModalFunc}, 
        false);
      })
      .catch((err) => {
        console.log(err); 
      })
      .finally(() => {
        renderLoading(newCardForm, false)
      })

  closeModal(evt.target.closest('.popup'));
  
  newCardForm.reset();
}



profileEditButton.addEventListener('click', () => {
  clearValidation(editProfileForm, formValidation)
  openModal(modalTypeEdit);
  fillFields();
})

profileAddButton.addEventListener('click', () => {
  openModal(modalTypeNewCard);
})


// форма для редактирования профиля
const editProfileForm = modalTypeEdit.querySelector('.popup__form');




enableValidation(formValidation); 



editProfileForm.addEventListener('submit', (evt) =>
  {editProfileFormSubmit(evt, modalTypeEdit)}
);

// форма добавления карточки
const newCardForm = modalTypeNewCard.querySelector('.popup__form')

newCardForm.addEventListener('submit', (evt) => {
  
  newCardFormSubmit(evt, renderCard, renderCardModal)
  clearValidation(newCardForm, formValidation)
});

const closeButton = document.querySelectorAll('.popup__close')
closeButton.forEach(function(item) {
  item.addEventListener('click', () => { closeModal(item.closest('.popup')) })})

const contents = document.querySelectorAll('.popup__content')
contents.forEach(closeByClickOnOverlay)


Promise.all([getProfileInfoFromServer, getCardsFromServer])
  .then(([profileInfo, cards]) =>  {

    profileImage.style = `background-image: url(${profileInfo.avatar})`
    profileTitle.textContent = profileInfo.name
    profileDescription.textContent = profileInfo.about

    cards.forEach(function(item) {
        const card = renderCard(
          {'cardInfo': item,
           'profileInfo': profileInfo,
           'cardName': item.name, 
           'cardLink': item.link,
           'cardId': item._id,
           'likes': item.likes},
          {'renderCardModalFunc': renderCardModal}, 
          true)
    })
    })
    .catch((err) => {
      console.log(err); 
    });
  


profileImage.addEventListener('click', () => {
  openModal(modalTypeNewAvatar);
})

const newAvatarForm = modalTypeNewAvatar.querySelector('.popup__form')

newAvatarForm.addEventListener('submit', (evt) => {
  
  newAvatarFormSubmit(evt)
  clearValidation(newCardForm, formValidation)
});



function newAvatarFormSubmit(evt) {
  evt.preventDefault();
  renderLoading(newAvatarForm, true)
  editAvatarOnServer(avatarLinkInput.value)
    .then((res) => {
      profileImage.style = `background-image: url(${res.avatar})`
    })
    .catch((err) => {
      console.log(err); 
    })
    .finally(() => {
      renderLoading(newAvatarForm, false)
    })
  
  closeModal(evt.target.closest('.popup'));
  newAvatarForm.reset();
}


function renderLoading(form, isLoading) {
  const button = form.querySelector('.popup__button');

  button.textContent = isLoading ? 'Сохранение...' : 'Сохранить'
}