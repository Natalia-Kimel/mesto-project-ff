import { cardNameInput, cardImageInput } from '../index.js';
import { } from '../index.js';

const config = {
    baseUrl: 'https://nomoreparties.co/v1/wff-cohort-3',
    headers: {
      authorization: '15d64207-4e24-4a9b-be57-7c4bb960a247',
      'Content-Type': 'application/json'
    }
}

// проверка ответа сервера
const checkResponse = (res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
}

export const getUserInfo = () => {
    return fetch(`${config.baseUrl}/users/me`, {
      headers: config.headers
    })
    .then(res => checkResponse(res));
}


// получить все карточки с сервера
export const getInitialCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers
  })
    .then(res => checkResponse(res));
}

// отредактированные данные профиля сохраняются на сервере
export const pushUserInfo = (newInfo) => {
    return fetch(`${config.baseUrl}/users/me`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            name: newInfo.name,
            about: newInfo.about
        })
    })
    .then((res) => checkResponse(res));
}

//обновление аватара на сервере
export const pushAvatar = (avatar) => {
    return fetch(`${config.baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            avatar
        })
    })
    .then(res => checkResponse(res));
}

//добавить на сервер новую карточку
export const postCardApi = () => {
    return fetch(`${config.baseUrl}/cards`, {
        method: 'POST',
        headers: config.headers,
        body: JSON.stringify({
            name: cardNameInput.value,
            link: cardImageInput.value
        })
    })
    .then(res => checkResponse(res));
}

//удаление карточек с сервера
export const deleteCardApi = (cardId) => {
    return fetch(`${config.baseUrl}/cards/${cardId}`, {
        method:  'DELETE',
        headers: config.headers
    })
    .then(res => checkResponse(res));
}

//поставить лайк на сервере
export const putLikeCard = (cardId) => {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
        method:  'PUT',
        headers: config.headers
    })
    .then(res => checkResponse(res));
}

//снять лайк на сервере
export const deleteLikeCard = (cardId) => {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
        method:  'DELETE',
        headers: config.headers
    })
    .then(res => checkResponse(res));
}