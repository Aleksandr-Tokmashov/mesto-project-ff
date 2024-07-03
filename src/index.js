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
// функция вывода карточки на страницу

function renderCard(cardData, callbacks, start=true) {
  const card = createCard({'cardName': cardData.cardName, 'cardLink': cardData.cardLink, 
    'cardId': cardData.cardId, 'likes': cardData.likes, 'cardInfo':  cardData.cardInfo,
    'profileInfo': cardData.profileInfo},
    {'deleteFunc': deleteCard, 'likeFunc': likeCard, 'likeCardOnServerFunc': likeCardOnServer,
     'renderModalFunc': callbacks.renderCardModalFunc, 'deleteOnServerFunc': deleteCardOnServer,
     'removeLikeFromCardOnServerFunc': removeLikeFromCardOnServer});
    
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
    .finally(() => {
      renderLoading(editProfileForm, false)
    })
  profileTitle.textContent = nameInputValue
  profileDescription.textContent = jobInputValue

  closeModal(evt.target.closest('.popup'))
}

function newCardFormSubmit(evt, renderCardFunc, renderCardModalFunc) {
  const newCard = addCardOnServer({name: nameInput.value, link: linkInput.value})
  evt.preventDefault();
  renderLoading(newCardForm, true)
  Promise.all([getProfileInfoFromServer, newCard])
  .then((results) => {
    const profileInfo = results[0];
    const res = results[1];
    renderCardFunc({
      'cardInfo': res,
      'profileInfo': profileInfo,
      'cardName': res.name, 
      'cardLink': res.link,
      'cardId': res._id,
      'likes': res.likes},
      {'renderCardModalFunc' : renderCardModalFunc}, 
      false);
    })
    .finally(() => {
      renderLoading(newCardForm, false)
    })

  closeModal(evt.target.closest('.popup'));
  
  nameInput.value = '';
  linkInput.value = '';
}



profileEditButton.addEventListener('click', () => {
  clearValidation(editProfileForm,
    {
      formSelector: '.popup__form',
      inputSelector: '.popup__input',
      submitButtonSelector: '.popup__button',
      inactiveButtonClass: 'popup__button_disabled',
      inputErrorClass: 'popup__input_type_error',
      errorClass: 'popup__error_visible'
    }
  )
  openModal(modalTypeEdit);
  fillFields();
})

profileAddButton.addEventListener('click', () => {
  openModal(modalTypeNewCard);
})


// форма для редактирования профиля
const editProfileForm = modalTypeEdit.querySelector('.popup__form');




enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}); 



editProfileForm.addEventListener('submit', (evt) =>
  {editProfileFormSubmit(evt, modalTypeEdit)}
);

// форма добавления карточки
const newCardForm = modalTypeNewCard.querySelector('.popup__form')

newCardForm.addEventListener('submit', (evt) => {
  
  newCardFormSubmit(evt, renderCard, renderCardModal)
  clearValidation(newCardForm,
    {
      formSelector: '.popup__form',
      inputSelector: '.popup__input',
      submitButtonSelector: '.popup__button',
      inactiveButtonClass: 'popup__button_disabled',
      inputErrorClass: 'popup__input_type_error',
      errorClass: 'popup__error_visible'
    }
  )
});

const closeButton = document.querySelectorAll('.popup__close')
closeButton.forEach(function(item) {
  item.addEventListener('click', () => { closeModal(item.closest('.popup')) })})

const contents = document.querySelectorAll('.popup__content')
contents.forEach(closeByClickOnOverlay)


Promise.all([getProfileInfoFromServer, getCardsFromServer])
  .then((results) => {
    const profileInfo = results[0];
    const cards = results[1];

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
  });
  


profileImage.addEventListener('click', () => {
  openModal(modalTypeNewAvatar);
})

const newAvatarForm = modalTypeNewAvatar.querySelector('.popup__form')

newAvatarForm.addEventListener('submit', (evt) => {
  
  newAvatarFormSubmit(evt)
  clearValidation(newCardForm,
    {
      formSelector: '.popup__form',
      inputSelector: '.popup__input',
      submitButtonSelector: '.popup__button',
      inactiveButtonClass: 'popup__button_disabled',
      inputErrorClass: 'popup__input_type_error',
      errorClass: 'popup__error_visible'
    }
  )
});



function newAvatarFormSubmit(evt) {
  evt.preventDefault();
  renderLoading(newAvatarForm, true)
  editAvatarOnServer(avatarLinkInput.value)
    .finally(() => {
      renderLoading(newAvatarForm, false)
    })
  profileImage.style = `background-image: url(${avatarLinkInput.value})`
  closeModal(evt.target.closest('.popup'));
  avatarLinkInput.value = '';
}


function renderLoading(form, isLoading) {
  const button = form.querySelector('.popup__button');

  if (isLoading) {
    button.textContent = 'Сохранение...'
  } else {
    button.textContent = 'Сохранить'
  }
}