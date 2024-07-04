const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-17',
  headers: {
    authorization: 'ebda8151-d672-43e0-ab30-c2b206b24b49',
    'Content-Type': 'application/json'
  }
}

function handleResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
}

const getProfileInfoFromServer = 
fetch(`${config.baseUrl}/users/me`, {
  headers: config.headers
  })
  .then(handleResponse);


const getCardsFromServer = 
fetch(`${config.baseUrl}/cards`, {
  headers: config.headers
  })
  .then(handleResponse); 


const addCardOnServer = (card) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    body: JSON.stringify({
      name: card.name,
      link: card.link
    }),
    headers: config.headers
    
  })
  .then(handleResponse); 
}; 


const editProfileOnServer = (profileInfo) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: profileInfo.name,
      about: profileInfo.about
    })
  })
  .then(handleResponse); 
}


const deleteCardOnServer = (cardId) => {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: config.headers,
  })
  .then(handleResponse); 
}

const likeCardOnServer = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: config.headers,
  })
  .then(handleResponse); 
  }


const removeLikeFromCardOnServer = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: config.headers,
  })
  .then(handleResponse); 
  }


const editAvatarOnServer = (url) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: url
    })
  })
  .then(handleResponse); 
}

export {getProfileInfoFromServer, getCardsFromServer, addCardOnServer,
        editProfileOnServer, deleteCardOnServer, likeCardOnServer,
        removeLikeFromCardOnServer, editAvatarOnServer
}