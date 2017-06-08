import React from 'react';

const List = ({ title, datas, propertyCalling }) => {

	/*renderUsers() {
		const { users } = this.state;
return (
	users === null
		? <p className="text-center"><i className="fa fa-spin fa-spinner fa-2x" aria-hidden="true"></i></p>
		: users.map((user, index) => {
			return (
				<li key={index}>
					<Link className="home-user" to={`/user/${user._id}`}>{user.name}</Link>
				</li>
			)
		})
)
	}*/


	const renderList = () => {

		return (
			datas === null
				? <p><i className="fa fa-spin fa-spinner fa-2x" aria-hidden="true"></i></p>
				: datas.map((data, index) => {
					return (
						<li key={index} >
							<a className="home-user" href={`/user/${data._id}`}>
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
