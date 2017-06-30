import React, { Component } from 'react';
import { API } from './../../variables';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import './list.css';

export default class List extends Component {
	constructor(props) {
		super(props);
		this.state = {
			spreadList: true,
			search: "",
			searchData: this.props.datas,
		}
	}

	componentDidMount() {
		this.handleSearch(this.props.datas);
	}

	handleDeleteItem(e, itemId, index) {
		e.stopPropagation();

		this.props.deleteItem(index);

		fetch(`${API}/${this.props.elementsType}/${itemId}`, { method: 'DELETE' })
			.then(data => {
				console.log('Element deleted');
			})
			.catch(err => console.log('error ', err));
	}

	handleInputChange(e) {
		this.setState({
			search: e.target.value,
		});

		this.handleSearch(e.target.value);
	}



	spreadListSwitch(e) {
		this.setState({
			spreadList: !this.state.spreadList,
		});
	}

	renderList() {
		return (
			(this.props.datas === [])
				? (<p>
					<i className="fa fa-spin fa-spinner fa-2x"
						aria-hidden="true"
					></i>
				</p>)

				: this.props.datas.map((data, index) => {
					return (
						<li
							style={{ display: "flex" }}
							key={index} >
							<Link to={`/${this.props.elementsType}/${data._id}`}>
								{eval('data.' + this.props.propertyCalling)}
							</Link>
							{
								(this.props.deleteItem)
									? <button className="gradient-btn color-1-gradient"
										onClick={(e) => this.handleDeleteItem(e, data._id, index)}>
										<span>Delete</span>
									</button>
									: null
							}

						</li>
					)
				})
		)
	}

	handleSearch() {
		const { search } = this.state;
		const { datas } = this.props;

		const replace = search.toLowerCase();
		const re = new RegExp("^" + replace, "g");

		let searchData = datas.filter((data) => {
			return re.test(eval('data.' + this.props.propertyCalling).toLowerCase());
		});

		this.setState({ searchData });
	}


	renderSearchInput() {
		return (
			(this.props.search)
				? (
					<input className="search-input" type="text"
						placeholder="Your Search" onChange={(e) => this.handleInputChange(e)} value={this.state.search} />
				)
				: null
		)
	}

	renderSpreadIcon() {
		return (
			(this.state.spreadList)
				? <span onClick={(e) => this.spreadListSwitch(e)}><i className="fa fa-caret-square-o-up"></i></span>
				: <span onClick={(e) => this.spreadListSwitch(e)}><i className="fa fa-caret-square-o-down"></i></span>
		)
	}

	render() {

		const list = (this.state.spreadList)
			? <ul>{this.renderList()}</ul>
			: null

		return (
			<ul className="List">
				<li >
					<div>{this.props.title} ({this.props.datas.length}) :</div>
					{this.renderSearchInput()}
					{this.renderSpreadIcon()}
				</li>
				<li>
					<ul className="users-container">
						<ReactCSSTransitionGroup
							transitionName="spreadList"
							transitionEnterTimeout={1000}
							transitionLeaveTimeout={1000} >
							{list}
						</ReactCSSTransitionGroup>
					</ul>
				</li>
			</ul>
		)
	}
}


List.propTypes = {
	datas: PropTypes.array.isRequired,
	title: PropTypes.string.isRequired,
	elementsType: PropTypes.string.isRequired,
	propertyCalling: PropTypes.string.isRequired,
	deleteItem: PropTypes.func,
	search: PropTypes.bool,
}

List.defaultProps = {
	search: false,
}