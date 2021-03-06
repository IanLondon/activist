import React, { Component } from 'react'
import { connect } from 'react-redux'

import actions from '../actions/actions'
import { get } from '../../utils/Request'


class Organizations extends Component {

	constructor(){
		super()
		this.state = {
			organization: {}
		}
	}

	componentDidMount(){
		get('/api/organization', this.props.location ? this.props.location.query : {})
		.then((response) => {
			this.props.organizationsReceived(response.results)
		})
		.catch((e) => {
			console.error(e)
		})
	}

	// updateOrganization(event){
	// 	let updated = Object.assign({}, this.state.organization)
	// 	updated[event.target.id] = event.target.value
	// 	this.setState({
	// 		organization: updated
	// 	})
	// }
	//
	// createOrganization(event){
	//
	// 	post('/api/organization', this.state.organization)
	// 	.then((response) => {
	// 		this.props.organizationCreated(response.result)
	// 	})
	// 	.catch( (e) => { console.error(e); console.warn("that post err") })
	//
	// }

	render(){
		const childEls = React.Children.map(this.props.children, (child) => {
			return React.cloneElement(child, {
				organizations: this.props.organizations,
				childClassName: this.props.childClassName
			})
		})

		return (
			<div id={this.props.id} className={this.props.className}>
				{childEls}
			</div>
		)
	}
}

const stateToProps = (state) => {
	return {
		organizations: state.organization.list
	}
}

const dispatchToProps = (dispatch) => {
	return {
		organizationsReceived: (organizations) => dispatch(actions.organizationsReceived(organizations)),
		organizationCreated: (organization) => dispatch(actions.organizationCreated(organization))
	}
}

export default connect(stateToProps, dispatchToProps)(Organizations)
