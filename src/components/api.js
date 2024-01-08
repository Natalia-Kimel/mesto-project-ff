import { editSubmitButton, cardNameInput, cardImageInput } from '../index';

//запросы к серверу
const config = {
    baseUrl: 'https://nomoreparties.co/v1/cohort-42',
    headers: {
      authorization: 'c56e30dc-2883-4270-a59e-b2f7bae969c6',
      'Content-Type': 'application/json'
    }
}

const checkResponse = (res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
}

const getuserInfo = () => {
    return fetch(`${config.baseUrl}/users/me`, {
      headers: config.headers
    })
    .then(res => checkResponse(res))
    .catch((err) => {
        console.log(err);
    });
}

export const getInitialCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers
  })
    .then(res => checkResponse(res))
    .catch((err) => {
        console.log(err);
    });
}

// отредактированные данные профиля сохраняются на сервере
export const newInfo = (editInfo) => {
    editSubmitButton.textContent = 'Сохранение...';
    return fetch(`${config.baseUrl}/users/me`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            name: editInfo.name,
            about: editInfo.about
        })
    })
    .then((res) => checkResponse(res))
    .catch((err) => {
        console.log(err);
    })
    .finally(() => {
        editSubmitButton.textContent = "Сохранить";
    });
}

//обновление аватара
export const newAvatar = (avatar) => {
    return fetch(`${config.baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            avatar
        })
    })
    .then(res => checkResponse(res))
    .catch((err) => {
        console.log(err);
    })
}

//добавить на сервер новую карточку
export const postCard = () => {
    addSubmitButton.textContent = 'Сохранение...';
    return fetch(`${config.baseUrl}/cards`, {
        method: 'POST',
        headers: config.headers,
        body: JSON.stringify({
            name: cardNameInput.value,
            link: cardImageInput.value
        })
    })
    .then(res => checkResponse(res))
    .catch(err => {
        console.log(err);
    })
    .finally(() => {
        addSubmitButton.textContent = "Сохранить";
    });
}

//удаление своих карточек с сервера
export const deleteCardAPI = (cardId) => {
    return fetch(`${config.baseUrl}/cards/${cardId}`, {
        method:  'DELETE',
        headers: config.headers
    })
    .then(res => checkResponse(res))
    .catch((err) => {
        console.log(err);
    })
};

//поставить лайк на сервере
export const putLikeCard = (cardId) => {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
        method:  'PUT',
        headers: config.headers
    })
    .then(res => checkResponse(res))
    .then((data) => {
        return data.likes.length})
    .catch((err) => {
        console.log(err);
    })
};

//снять лайк на сервере
export const deletelikeCard = (cardId) => {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
        method:  'DELETE',
        headers: config.headers
    })
    .then(res => checkResponse(res))
    .then((data) => {
        return data.likes.length})
    .catch((err) => {
        console.log(err);
    })
};