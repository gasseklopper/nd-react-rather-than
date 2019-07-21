import React, {Fragment} from 'react'
import {Redirect, Route} from 'react-router-dom'
import {connect} from 'react-redux'
import {isEmpty} from "../utils/helpers"
import {  Container } from 'semantic-ui-react'

import Navigation from './Navigation'


const PrivateRoute = ({component: Component, isAuthenticated, ...rest}) => (
	<Route {...rest} render={(props) => {
		return (
			isAuthenticated
				?
				<Fragment>
					<Navigation/>
					<Container >
						<div>
							<div>
								<Component {...props}/>
							</div>
						</div>
					</Container>
				</Fragment>
				: <Redirect to={{
					pathname: '/login',
					state: {from: props.location}
				}}/>
		)
	}}/>
)

function mapStateToProps({authedUser}) {
	return {
		isAuthenticated: !isEmpty(authedUser)
	}
}

export default connect(mapStateToProps, null, null, {pure: false,})(PrivateRoute)