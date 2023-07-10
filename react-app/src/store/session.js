// constants
const SET_USER = "session/SET_USER";
const REMOVE_USER = "session/REMOVE_USER";
const GET_USER = "user/getByUsername"
const CLEAR_USER = "user/clear"
const FOLLOW_USER = "user/follow"

const getUser = (user) => ({
	type: GET_USER,
	user
})

export const clearUser = () => ({
	type: CLEAR_USER
})


const setUser = (user) => ({
	type: SET_USER,
	payload: user,
});

const removeUser = () => ({
	type: REMOVE_USER,
});

const followUser = (followedUser, currentUser) => ({
	type: FOLLOW_USER,
	followedUser,
	currentUser
})

const initialState = { user: null, currentProfile: {} };

export const createFollow = (username) => async (dispatch) => {
	let res = await fetch(`/api/users/follow/${username}`, {
		method: "POST"
	})

	if (res.ok) {
		let [followedUser, currentUser] = await res.json()
		dispatch(followUser(followedUser, currentUser))
		return [followedUser, currentUser]
	} else {
		let errors = await res.json()
		return errors
	}
}

export const getByUsername = (username) => async (dispatch) => {
	let res = await fetch(`/api/users/find/${username}`)

	if (res.ok) {
		let user = await res.json()
		dispatch(getUser(user))
		return user
	} else {
		let errors = await res.json()
		return errors
	}
}

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
		case FOLLOW_USER:
			return {
				...state,
				user: {
					...state.user,
					following: {
						...state.user.following,
						[action.followedUser.id]: action.followedUser
					}
				},
				currentProfile: {
					...state.currentProfile,
					followers: {
						...action.currentProfile.followers,
						[action.currentUser.id]: action.currentUser
					}

				}
			}
		case CLEAR_USER:
			return { ...state, user: { ...state.user }, currentProfile: {} }
		case GET_USER:
			return { ...state, user: { ...state.user }, currentProfile: action.user }
		case SET_USER:
			return { user: action.payload };
		case REMOVE_USER:
			return { user: null };
		default:
			return state;
	}
}