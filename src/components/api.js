const getProfileInfoFromServer = 
fetch('https://nomoreparties.co/v1/wff-cohort-17/users/me ', {
  headers: {
    authorization: 'ebda8151-d672-43e0-ab30-c2b206b24b49'
    }
  })
  
  .then(res => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  })
  .catch((err) => {
    console.log(err); 
  });


const getCardsFromServer = 
fetch('https://nomoreparties.co/v1/wff-cohort-17/cards', {
  headers: {
    authorization: 'ebda8151-d672-43e0-ab30-c2b206b24b49'
    }
  })
  .then(res => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  })
  .catch((err) => {
    console.log(err); 
  }); 


const addCardOnServer = (card) => {
  return fetch('https://nomoreparties.co/v1/wff-cohort-17/cards', {
    method: 'POST',
    body: JSON.stringify({
      name: card.name,
      link: card.link
    }),
    headers: {'Content-Type': 'application/json',
      authorization: 'ebda8151-d672-43e0-ab30-c2b206b24b49'
    }
    
  })
  .then(res => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  })
  .catch((err) => {
    console.log(err); 
  }); 
}; 


const editProfileOnServer = (profileInfo) => {
  return fetch('https://nomoreparties.co/v1/wff-cohort-17/users/me', {
    method: 'PATCH',
    headers: {
      authorization: 'ebda8151-d672-43e0-ab30-c2b206b24b49',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: profileInfo.name,
      about: profileInfo.about
    })
  })
  .then(res => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  })
  .catch((err) => {
    console.log(err); 
  }); 
}


const deleteCardOnServer = (cardId) => {
  fetch(`https://nomoreparties.co/v1/wff-cohort-17/cards/${cardId}`, {
    method: 'DELETE',
    headers: {
      authorization: 'ebda8151-d672-43e0-ab30-c2b206b24b49',
      'Content-Type': 'application/json'
    },
  })
  .then(res => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  })
  .catch((err) => {
    console.log(err); 
  }); 
}

const likeCardOnServer = (cardId) => {
  return fetch(`https://nomoreparties.co/v1/wff-cohort-17/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: {
      authorization: 'ebda8151-d672-43e0-ab30-c2b206b24b49',
      'Content-Type': 'application/json'
    },
  })
  .then(res => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  })
  .catch((err) => {
    console.log(err); 
  }); 
  }


const removeLikeFromCardOnServer = (cardId) => {
  return fetch(`https://nomoreparties.co/v1/wff-cohort-17/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: {
      authorization: 'ebda8151-d672-43e0-ab30-c2b206b24b49',
      'Content-Type': 'application/json'
    },
  })
  .then(res => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  })
  .catch((err) => {
    console.log(err); 
  }); 
  }


const editAvatarOnServer = (url) => {
  return fetch('https://nomoreparties.co/v1/wff-cohort-17/users/me/avatar', {
    method: 'PATCH',
    headers: {
      authorization: 'ebda8151-d672-43e0-ab30-c2b206b24b49',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      avatar: url
    })
  })
  .then(res => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  })
  .catch((err) => {
    console.log(err); 
  }); 
}

export {getProfileInfoFromServer, getCardsFromServer, addCardOnServer,
        editProfileOnServer, deleteCardOnServer, likeCardOnServer,
        removeLikeFromCardOnServer, editAvatarOnServer
}