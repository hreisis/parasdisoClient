import * as ActionTypes from './ActionTypes';
import { baseUrl } from '../shared/baseUrl';

export const fetchTeas = () => dispatch => {
    dispatch(teasLoading());

    return fetch(baseUrl + 'teas')
        .then(response => {
                if (response.ok) {
                    return response;
                } else {
                    const error = new Error(`Error ${response.status}: ${response.statusText}`);
                    error.response = response;
                    throw error;
                }
            },
            error => {
                const errMess = new Error(error.message);
                throw errMess;
            }
        )
        .then(response => response.json())
        .then(teas => dispatch(addTeas(teas)))
        .catch(error => dispatch(teasFailed(error.message)));
};

export const teasLoading = () => ({
    type: ActionTypes.TEAS_LOADING
});

export const teasFailed = errMess => ({
    type: ActionTypes.TEAS_FAILED,
    payload: errMess
});

export const addTeas = teas => ({
    type: ActionTypes.ADD_TEAS,
    payload: teas
});

export const fetchComments = () => dispatch => {
    return fetch(baseUrl + 'comments')
        .then(response => {
                if (response.ok) {
                    return response;
                } else {
                    const error = new Error(`Error ${response.status}: ${response.statusText}`);
                    error.response = response;
                    throw error;
                }
            },
            error => {
                const errMess = new Error(error.message);
                throw errMess;
            }
        )
        .then(response => response.json())
        .then(comments => dispatch(addComments(comments)))
        .catch(error => dispatch(commentsFailed(error.message)));
};

export const commentsFailed = errMess => ({
    type: ActionTypes.COMMENTS_FAILED,
    payload: errMess
});

export const addComments = comments => ({
    type: ActionTypes.ADD_COMMENTS,
    payload: comments
});

export const addComment = comment => ({
    type: ActionTypes.ADD_COMMENT,
    payload: comment
});

export const postComment = (teaId, rating, text) => dispatch => {

    const newComment = {
        tea: teaId,
        rating: rating,
        text: text
    }
    console.log('Comment ', newComment);

    const bearer = 'Bearer ' + localStorage.getItem('token');

    return fetch(baseUrl + 'comments', {
        method: 'POST',
        body: JSON.stringify(newComment),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': bearer
        },
        credentials: 'same-origin'
    })
    .then(response => {
            if (response.ok) {
                return response;
            } else {
                const error = new Error(`Error ${response.status}: ${response.statusText}`);
                error.response = response;
                throw error;
            }
        },
        error => { throw error; }
    )
    .then(response => response.json())
    .then(response => dispatch(addComment(response)))
    .catch(error => {
        console.log('post comment', error.message);
        alert('Your comment could not be posted\nError: ' + error.message);
    });
};

export const fetchPromotions = () => dispatch => {
    dispatch(promotionsLoading());

    return fetch(baseUrl + 'promotions')
        .then(response => {
                if (response.ok) {
                    return response;
                } else {
                    const error = new Error(`Error ${response.status}: ${response.statusText}`);
                    error.response = response;
                    throw error;
                }
            },
            error => {
                const errMess = new Error(error.message);
                throw errMess;
            }
        )
        .then(response => response.json())
        .then(promotions => dispatch(addPromotions(promotions)))
        .catch(error => dispatch(promotionsFailed(error.message)));
};

export const promotionsLoading = () => ({
    type: ActionTypes.PROMOTIONS_LOADING
});

export const promotionsFailed = errMess => ({
    type: ActionTypes.PROMOTIONS_FAILED,
    payload: errMess
});

export const addPromotions = promotions => ({
    type: ActionTypes.ADD_PROMOTIONS,
    payload: promotions
});

export const fetchPartners = () => dispatch => {
    dispatch(partnersLoading());

    return fetch(baseUrl + 'partners')
        .then(response => {
                if (response.ok) {
                    return response;
                } else {
                    const error = new Error(`Error ${response.status}: ${response.statusText}`);
                    error.response = response;
                    throw error;
                }
            },
            error => {
                const errMess = new Error(error.message);
                throw errMess;
            }
        )
        .then(response => response.json())
        .then(partners => dispatch(addPartners(partners)))
        .catch(error => dispatch(partnersFailed(error.message)));
};

export const partnersLoading = () => ({
    type: ActionTypes.PARTNERS_LOADING
});

export const partnersFailed = errMess => ({
    type: ActionTypes.PARTNERS_FAILED,
    payload: errMess
});

export const addPartners = partners => ({
    type: ActionTypes.ADD_PARTNERS,
    payload: partners
});

export const postFeedback = feedback => () => {
    return fetch(baseUrl + 'feedback', {
        method: 'POST',
        body: JSON.stringify(feedback),
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'same-origin'
    })
    .then(response => {
            if (response.ok) {
                return response;
            } else {
                const error = new Error(`Error ${response.status}: ${response.statusText}`);
                error.response = response;
                throw error;
            }
        },
        error => { throw error; }             
    )
    .then(response => response.json())
    .then(response => {
        console.log('Feedback:', response);
        alert('Thank you for your feedback!\n' + JSON.stringify(response));
    })
    .catch(error => {
        console.log('Feedback:', error.message);
        alert('Your feedback could not be posted\nError: ' + error.message);
    });
};

export const requestLogin = creds => {
    return {
        type: ActionTypes.LOGIN_REQUEST,
        creds
    }
}
  
export const receiveLogin = response => {
    return {
        type: ActionTypes.LOGIN_SUCCESS,
        token: response.token
    }
}
  
export const loginError = message => {
    return {
        type: ActionTypes.LOGIN_FAILURE,
        message
    }
}

export const loginUser = creds => dispatch => {
    // We dispatch requestLogin to kickoff the call to the API
    dispatch(requestLogin(creds))

    return fetch(baseUrl + 'users/login', {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json' 
        },
        body: JSON.stringify(creds)
    })
    .then(response => {
            if (response.ok) {
                return response;
            } else {
                const error = new Error(`Error ${response.status}: ${response.statusText}`);
                error.response = response;
                throw error;
            }
        },
        error => { throw error; }
    )
    .then(response => response.json())
    .then(response => {
        if (response.success) {
            // If login was successful, set the token in local storage
            localStorage.setItem('token', response.token);
            localStorage.setItem('creds', JSON.stringify(creds));
            // Dispatch the success action
            dispatch(fetchFavorites());
            dispatch(receiveLogin(response));
        } else {
            const error = new Error('Error ' + response.status);
            error.response = response;
            throw error;
        }
    })
    .catch(error => dispatch(loginError(error.message)))
};

export const requestLogout = () => {
    return {
        type: ActionTypes.LOGOUT_REQUEST
    }
}
  
export const receiveLogout = () => {
    return {
        type: ActionTypes.LOGOUT_SUCCESS
    }
}

// Logs the user out
export const logoutUser = () => dispatch => {
    dispatch(requestLogout())
    localStorage.removeItem('token');
    localStorage.removeItem('creds');
    dispatch(favoritesFailed('Error 401: Unauthorized'));
    dispatch(receiveLogout())
}

export const postFavorite = teaId => dispatch => {

    const bearer = 'Bearer ' + localStorage.getItem('token');

    return fetch(baseUrl + 'favorites/' + teaId, {
        method: 'POST',
        headers: {
            'Authorization': bearer
        },
        credentials: 'same-origin'
    })
    .then(response => {
            if (response.ok) {
                return response;
            } else {
                const error = new Error(`Error ${response.status}: ${response.statusText}`);
                error.response = response;
                throw error;
            }
        },
        error => { throw error; }
    )
    .then(response => response.json())
    .then(favorites => {
        console.log('Favorite Added', favorites);
        dispatch(addFavorites(favorites));
    })
    .catch(error => dispatch(favoritesFailed(error.message)));
}

export const deleteFavorite = teaId => dispatch => {

    const bearer = 'Bearer ' + localStorage.getItem('token');

    return fetch(baseUrl + 'favorites/' + teaId, {
        method: 'DELETE',
        headers: {
            'Authorization': bearer
        },
        credentials: 'same-origin'
    })
    .then(response => {
            if (response.ok) {
                return response;
            } else {
                const error = new Error(`Error ${response.status}: ${response.statusText}`);
                error.response = response;
                throw error;
            }
        },
        error => { throw error; }
    )
    .then(response => response.json())
    .then(favorites => {
        console.log('Favorite Deleted', favorites);
        dispatch(addFavorites(favorites));
    })
    .catch(error => dispatch(favoritesFailed(error.message)));
};

export const fetchFavorites = () => dispatch => {
    dispatch(favoritesLoading());

    const bearer = 'Bearer ' + localStorage.getItem('token');

    return fetch(baseUrl + 'favorites', {
        headers: {
            'Authorization': bearer
        },
    })
    .then(response => {
            if (response.ok) {
                return response;
            } else {
                const error = new Error(`Error ${response.status}: ${response.statusText}`);
                error.response = response;
                throw error;
            }
        },
        error => { throw error; }
    )
    .then(response => response.json())
    .then(favorites => dispatch(addFavorites(favorites)))
    .catch(error => dispatch(favoritesFailed(error.message)));
}

export const favoritesLoading = () => ({
    type: ActionTypes.FAVORITES_LOADING
});

export const favoritesFailed = errMess => ({
    type: ActionTypes.FAVORITES_FAILED,
    payload: errMess
});

export const addFavorites = favorites => ({
    type: ActionTypes.ADD_FAVORITES,
    payload: favorites
});