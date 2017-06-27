import React, { Component } from 'react';
import { API } from './../../variables';
import { Link } from 'react-router-dom';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

export default class List extends Component {
	constructor(props) {
		super(props);
		this.state = {
			spreadList: true,
			listHeight: "auto",
		}
	}

	handleDeleteItem(e, itemId, index) {
		e.stopPropagation();
		this.props.deleteItem(index);
		fetch(`${API}/${this.props.elementsType}/${itemId}`, {
			method: 'DELETE',
			headers: { 'Origin': 'Access-Control-Allow-Origin' }
		})
			.then(data => {
				console.log('user deleted');
			})
			.catch(err => console.log('error ', err));
	}

	spreadList(e) {
		const list = document.querySelector('.home-list li');
		const listHeight = parseInt(window.getComputedStyle(list).height) + parseInt(window.getComputedStyle(list).padding) * 2;
		console.log(this.state.listHeight);

		this.setState({
			spreadList: !this.state.spreadList,
			listHeight: (this.state.spreadList) ? listHeight : 'auto'
		});
	}

	renderList() {
		return (
			this.props.datas === []
				? <p>
					<i className="fa fa-spin fa-spinner fa-2x"
						aria-hidden="true"
					></i>
				</p>
				: this.props.datas.map((data, index) => {
					return (
						<li
							style={{ display: "flex" }}
							key={index} >
							<Link to={`/${this.props.elementsType}/${data._id}`}>
								{eval('data.' + this.props.propertyCalling)}
							</Link>
							<button className="gradient-btn color-1-gradient"
								onClick={(e) => this.handleDeleteItem(e, data._id, index)}>
								<span>Delete</span></button>
						</li>
					)
				})
		)
	}


	render() {
		const listHeight = this.state.listHeight;
		return (
			<ul className="home-list" style={{ height: listHeight, transition: "0.3s" }}>
				<li
					onClick={(e) => this.spreadList(e)}
				>{this.props.title} ({this.props.datas.length}) :</li>

				{this.renderList()}

			</ul>
		)
	}
}
