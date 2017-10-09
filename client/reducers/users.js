import axios from 'axios'

//Actions Types
const GET_USERS = 'GET_USERS'

//Action Creators
const getUsers = (users) => ({
	type 			: GET_USERS,
	users 	: users
})

//Thunk Creators
export function fetchUsers() {
	console.log('calling fetchusers')
	return function thunk(dispatch) {
		axios.get(`/api/users`)
			.then((users)=> {
				console.log('success get')
				dispatch(getUsers(users.data))
			})
	}
}

//Action Reducer
const userReducer = function(state={}, action) {
	switch(action.type) {
		case GET_USERS : 
			return action.users
		default: return state
	}
}

export default userReducer
