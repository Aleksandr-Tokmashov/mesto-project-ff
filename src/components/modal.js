
function renderCardModal(cardLink, cardName) {
  const modalTypeImage = document.querySelector('.popup_type_image')  // попап с карточкой
  openModal(modalTypeImage)
  const modalImage = modalTypeImage.querySelector('.popup__image')
  const modalCaption = modalTypeImage.querySelector('.popup__caption')
  modalImage.src = cardLink
  modalImage.alt = cardName
  modalCaption.textContent = cardName
}

// функция открытия попапа
function openModal(modal, type='') {
  fillFields(type)
  modal.classList.add('popup_is-opened' , 'popup_is-animated')

  const closeButton = modal.querySelector('.popup__close')
  closeButton.addEventListener('click', () => { closeModal(modal); })

  const content = modal.querySelector('.popup__content')
  content.addEventListener('click', (evt) => { evt.stopPropagation()})

  modal.addEventListener('click', () => { closeModal(modal);})

  document.addEventListener('keydown', closeModalWithEsc)
}

function closeModalWithEsc(evt) {
  if (evt.key === 'Escape') {
    closeModal(modal);
}
}

function fillFields(type) {
  if (type === 'edit') {
    const modalInputName = document.querySelector('.popup__input_type_name')  // поле ввода имени профиля
    const modalInputDescription = document.querySelector('.popup__input_type_description')  // поле ввода описания профиля

    const profileTitle = document.querySelector('.profile__title')  // имя профиля
    const profileDescription = document.querySelector('.profile__description')  // описание профиля


    modalInputName.value = profileTitle.textContent
    modalInputDescription.value = profileDescription.textContent}
}

// функция закрытия попапа
function closeModal(modal) {
  modal.classList.remove('popup_is-opened')
  document.removeEventListener('keydown', closeModalWithEsc)
}

// функция редактирование профиля
function handleFormSubmit(evt, modal) {

  const profileTitle = document.querySelector('.profile__title')  // имя профиля
  const profileDescription = document.querySelector('.profile__description')  // описание профиля

  const modalInputName = modal.querySelector('.popup__input_type_name')  // поле ввода имени профиля
  const modalInputDescription = modal.querySelector('.popup__input_type_description')  // поле ввода описания профиля

  evt.preventDefault(); 

  const nameInputValue = modalInputName.value
  const jobInputValue = modalInputDescription.value

  profileTitle.textContent = nameInputValue
  profileDescription.textContent = jobInputValue

  closeModal(evt.target.closest('.popup'))
}

function newCardFormSubmit(evt, renderCardFunc, renderCardModalFunc) {
  evt.preventDefault(); 
  const modalTypeNew = document.querySelector('.popup_type_new-card')

  const nameInput = modalTypeNew.querySelector('.popup__input_type_card-name')
  const linkInput = modalTypeNew.querySelector('.popup__input_type_url')

  renderCardFunc(nameInput.value, linkInput.value, renderCardModalFunc, false);
  closeModal(evt.target.closest('.popup'));
  
  nameInput.value = '';
  linkInput.value = '';
}


export { renderCardModal, openModal, closeModal, handleFormSubmit, newCardFormSubmit };