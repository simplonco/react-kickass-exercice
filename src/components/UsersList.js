import React, { Component } from 'react';

class UsersList extends Component {
    render(){
        return(
            <ul>
                {this.props.users.map((user, index) =>
                { return <li key={index}> Nom: {user.name} Type: {user.type} </li>}
                )}
             </ul>
        )
    }
}

export default UsersList;
