import React from 'react'
import {render} from 'react-dom'
import {Provider} from 'react-redux'
import store from './store'
import Main from './components/Main'
import {BrowserRouter} from 'react-router-dom'

render(
	<Provider store={store}>
		<BrowserRouter>
			<Main />
		</BrowserRouter>
	</Provider>,
	document.getElementById('main')
)
