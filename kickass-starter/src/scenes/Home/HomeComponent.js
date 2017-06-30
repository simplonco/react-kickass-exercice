import React from 'react';
import List from './../../component/List/List';
import './Home.css';

const Home = (props) => (
	< div className="Home">
		<h3 className="text-center">Welcome to the admin board :</h3>
		<div className="flex-row">
			<List
				datas={props.users}
				title="Users"
				elementsType="user"
				propertyCalling="name"
				deleteItem={props.deleteUser}
			/>
			<List
				datas={props.projects}
				title="Projects"
				elementsType="project"
				propertyCalling="title"
				search={true}
				deleteItem={props.deleteProject}
			/>
		</div>
	</div >
)

export default Home;