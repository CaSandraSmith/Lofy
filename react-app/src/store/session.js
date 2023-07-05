// constants
const SET_USER = "session/SET_USER";
const REMOVE_USER = "session/REMOVE_USER";
const DELETE_SAVED_SONG = "delete/savedSongs"
const SAVE_SONG = "post/savedSongs"


const setUser = (user) => ({
	type: SET_USER,
	payload: user,
});

const removeUser = () => ({
	type: REMOVE_USER,
});

export const removeUserSavedSong = (songId) => ({
	type: DELETE_SAVED_SONG,
	songId
})

export const saveNewSong = (songId) => ({
	type: SAVE_SONG,
	songId
})

const initialState = { user: null };

export const authenticate = () => async (dispatch) => {
	const response = await fetch("/api/auth/", {
		headers: {
			"Content-Type": "application/json",
		},
	});
	if (response.ok) {
		const data = await response.json();
		if (data.errors) {
			return;
		}

		dispatch(setUser(data));
	}
};

export const login = (email, password) => async (dispatch) => {
	const response = await fetch("/api/auth/login", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			email,
			password,
		}),
	});

	if (response.ok) {
		const data = await response.json();
		dispatch(setUser(data));
		return null;
	} else if (response.status < 500) {
		const data = await response.json();
		if (data.errors) {
			return data.errors;
		}
	} else {
		return ["An error occurred. Please try again."];
	}
};

export const logout = () => async (dispatch) => {
	const response = await fetch("/api/auth/logout", {
		headers: {
			"Content-Type": "application/json",
		},
	});

	if (response.ok) {
		dispatch(removeUser());
	}
};

export const signUp = (username, email, password) => async (dispatch) => {
	const response = await fetch("/api/auth/signup", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			username,
			email,
			password,
		}),
	});

	if (response.ok) {
		const data = await response.json();
		dispatch(setUser(data));
		return null;
	} else if (response.status < 500) {
		const data = await response.json();
		if (data.errors) {
			return data.errors;
		}
	} else {
		return ["An error occurred. Please try again."];
	}
};

export default function reducer(state = initialState, action) {
	switch (action.type) {
		case SAVE_SONG:
			let newState1 = {...state, user: {...state.user, saved_songs: [...state.user.saved_songs]}}
			let index = newState.user.saved_songs.indexOf(action.songId)
			if (index != -1) {
				return newState
			}
			newState1.user.saved_songs.push(action.songId)
			return newState1
		case DELETE_SAVED_SONG:
			let newState = {...state, user: {...state.user, saved_songs: [...state.user.saved_songs]}}
			let i = newState.user.saved_songs.indexOf(action.songId)
			if (i === -1) {
				return newState
			}
			newState.user.saved_songs.splice(i, 1)
			return newState
		case SET_USER:
			return { user: action.payload };
		case REMOVE_USER:
			return { user: null };
		default:
			return state;
	}
}