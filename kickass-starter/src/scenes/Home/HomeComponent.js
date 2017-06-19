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
		/>
		{/*<List
			datas={props.projects}
			title="Projects :"
			elementsType="project"
			propertyCalling="title"
		/>*/}
	</div >
)

export default Home;