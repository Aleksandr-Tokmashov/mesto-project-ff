// функция открытия попапа
function openModal(modal) {
  modal.classList.add('popup_is-opened' , 'popup_is-animated')
  document.addEventListener('keydown', closeModalWithEsc)
}

function closeByClickOnOverlay(popupContent) {
  popupContent.addEventListener('click', (evt) => { evt.stopPropagation()})
  const popup = popupContent.closest('.popup')
  popup.addEventListener('click', () => { closeModal(popup);})
}




// функция закрытия попапа
function closeModal(modal) {
  modal.classList.remove('popup_is-opened')
  document.removeEventListener('keydown', closeModalWithEsc)
}

function closeModalWithEsc(evt) {
  if (evt.key === 'Escape') {
    const modal = document.querySelector('.popup_is-opened')
    closeModal(modal);}
  }

export { openModal, closeModal, closeByClickOnOverlay };