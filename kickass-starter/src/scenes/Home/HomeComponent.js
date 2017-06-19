import React from 'react';
import List from './../../component/List/List';
import './Home.css';

const Home = (props) => (
	< div className="flex-row" >
		<List
			datas={props.users}
			title="Users :"
			elementsType="user"
			propertyCalling="name"
			deleteItem={props.deleteUser}
		/>
		<List
			datas={props.projects}
			title="Projects :"
			elementsType="project"
			propertyCalling="title"
			deleteItem={props.deleteProject}
		/>
	</div >
)

export default Home;