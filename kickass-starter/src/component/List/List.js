import React from 'react';
import { API } from './../../variables';
import { Link } from 'react-router-dom';

const List = (props) => {

	function handleDeleteItem(e, itemId, index) {
		e.stopPropagation();
		props.deleteItem(index);
		fetch(`${API}/${props.elementsType}/${itemId}`, {
			method: 'DELETE',
			headers: { 'Origin': 'Access-Control-Allow-Origin' }
		})
			.then(data => {
				console.log('user deleted');
			})
			.catch(err => console.log('error ', err));
	}

	function renderList() {
		return (
			props.datas === null
				? <p>
					<i className="fa fa-spin fa-spinner fa-2x"
						aria-hidden="true"
					></i>
				</p>
				: props.datas.map((data, index) => {
					return (
						<li
							style={{ display: "flex" }}
							key={index} >
							<Link to={`/${props.elementsType}/${data._id}`}>
								{eval('data.' + props.propertyCalling)}
							</Link>
							<button onClick={(e) => handleDeleteItem(e, data._id, index)}>Delete</button>
						</li>
					)
				})
		)
	}

	return (
		<ul className="home-list">
			<li>{props.title}</li>
			{renderList()}
		</ul>
	)

}
export default List;
