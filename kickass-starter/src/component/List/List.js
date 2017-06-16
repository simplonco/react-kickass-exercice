import React from 'react';
import { API } from './../../variables';

const List = (props) => {

	function handleDeleteItem(e, itemId) {
		e.stopPropagation();
		fetch(`${API}/${props.elementsType}/${itemId}`, {
			method: 'DELETE',
			headers: { 'Origin': 'Access-Control-Allow-Origin' }
		})
			.then(data => {
				console.log('user deleted');
				window.location.reload();
			})
			.catch(err => console.log('error ', err));
	}

	function renderList() {
		return (
			props.datas === null
				? <p><i className="fa fa-spin fa-spinner fa-2x" aria-hidden="true"></i></p>
				: props.datas.map((data, index) => {
					return (
						<li
							style={{ display: "flex" }}
							key={index} >
							<a className="home-user" style={{ flex: 1 }} onClick={() => console.log('clicked link')} href={`/${props.elementsType}/${data._id}`}>
								{eval('data.' + props.propertyCalling)}
							</a>
							<button onClick={(e) => handleDeleteItem(e, data._id)}>Delete</button>
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
