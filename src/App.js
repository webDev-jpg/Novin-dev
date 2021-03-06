import React, { useState } from 'react'
// Materail
import { lightTheme, darkTheme } from './theme'
import CssBaseline from '@material-ui/core/CssBaseline'
import { ThemeProvider as SCThemeProvider } from 'styled-components'
import {
	ThemeProvider as MuiThemeProvider,
	StylesProvider,
} from '@material-ui/styles'
// React-router-dom
import {
	Switch,
	BrowserRouter as Router,
	Route,
	Redirect,
} from 'react-router-dom'
// Setup redux
import { Provider as ReduxProvider } from 'react-redux'
import store from './redux/store'
// Other
import Home from './pages/Home/Home'
import NavBar from './components/Navbar'
import Auth from './pages/Auth/Auth'
import UserDetail from './pages/UserDetail/UserDetail'

const Provider = ({ darkMode, children }) => {
	return (
		<StylesProvider injectFirst>
			<MuiThemeProvider theme={darkMode ? darkTheme : lightTheme}>
				<SCThemeProvider theme={lightTheme}>
					<CssBaseline />
					<ReduxProvider store={store}>{children}</ReduxProvider>
				</SCThemeProvider>
			</MuiThemeProvider>
		</StylesProvider>
	)
}

export const App = () => {
	const [darkMode, setDarkMode] = useState(false)
	// Route restrict
	const ProtectedRoutes = (component) => {
		return localStorage.getItem('token') !== '' ? (
			<Route
				path={component.path}
				exact={component.exact}
				component={component.component}
			/>
		) : (
			<Redirect to='/login' />
		)
	}

	return (
		<Provider darkMode={darkMode}>
			<Router>
				<NavBar darkMode={darkMode} setDarkMode={setDarkMode} />
				<Switch>
					<Route exact path='/' component={Home} />
					<Route exact path='/login' component={Auth} />
					<ProtectedRoutes
						path={`/:id/detail`}
						exact
						component={() => <UserDetail darkMode={darkMode} />}
					/>
					<Redirect to='/' />
				</Switch>
			</Router>
		</Provider>
	)
}

export default App
