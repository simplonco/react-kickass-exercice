import React, { Component } from 'react';


class AddUsers extends Component {

    constructor(props){
        super(props);
        this.state = {
        age:"",
        name: "",
        type:""
    }
    this.onSubmit = this.onSubmit.bind(this);
    this.createName = this.createName.bind(this);
    this.createAge = this.createAge.bind(this);
    this.createType = this.createType.bind(this);
}

        onSubmit = (e) => {
    e.preventDefault();
    fetch("https://kickass-sdw-3a.herokuapp.com/api/users", {
        method: "POST",
        header: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'name': this.state.name,
            'age': this.state.age,
            'type': this.state.type
        })
    });
    this.setState({
        name: "",
        age: "",
        type: ""
    })

}

createName = (e) => {
    this.setState({
    name: e.target.value,
    });
}

 createAge = (e) => {
    this.setState({
    age: e.target.value,
    });
 }

createType = (e) => {
    this.setState({
    type: e.target.value,
    });
}


onSubmit = (e) => {
    e.preventDefault();
    fetch("https://kickass-sdw-3a.herokuapp.com/api/users", {
        method: "POST",
        header: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'name': this.state.name,
            'age': this.state.age,
            'type': this.state.type
        })
    });
    this.setState({
        name: "",
        age: "",
        type: ""
    })

}

createName = (e) => {
    this.setState({
    name: e.target.value,
    });
}

 createAge = (e) => {
    this.setState({
    age: e.target.value,
    });
 }

createType = (e) => {
    this.setState({
    type: e.target.value,
    });
}




    render(){
        console.log( this.state.name + " et " +  this.state.age + " et " +  this.state.type)

        let {name, age, type} = this.state

        return(
            <div>
            <form onSubmit={this.onSubmit}>
                <input placeholder="nom" type="text" name="name" value={name} onChange={this.createName} />
                <input placeholder="age" type="text" name="age" value={age} onChange={this.createAge} />
                <input placeholder="type de projet" type="text" name="type" value={type} onChange={this.createType} />
                <input type="submit" value="submit" />
            </form>       
            </div>
        )
    }
}


export default AddUsers;