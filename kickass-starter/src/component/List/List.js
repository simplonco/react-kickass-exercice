import React from 'react';

const List = ({ title, datas, propertyCalling, elementsType }) => {

	const renderList = () => {

		return (
			datas === null
				? <p><i className="fa fa-spin fa-spinner fa-2x" aria-hidden="true"></i></p>
				: datas.map((data, index) => {
					return (
						<li key={index} >
							<a className="home-user" href={`/${elementsType}/${data._id}`}>
								{eval('data.' + propertyCalling)}
							</a>
						</li>
					)
				})
		)
	}


	return (
		<ul className="home-list">
			<li>{title}</li>
			{renderList()}
		</ul>
	)
}
export default List;
