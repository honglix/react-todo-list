import React, { Component } from 'react'
import '../assets/css/index.css'
class Todolist extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list: []
        };
    }

    addData = () => {
        var tempList = this.state.list;
        tempList.push(this.refs.title.value);
        this.setState({
            list: tempList
        })
        this.refs.title.value = "";
    }

    removeDate = (key) => {
        var tempList = this.state.list;
        tempList.splice(key,1);
        this.setState({
            list: tempList
        })
    }
    render() {
        return (
            <div>
                <h2>Todo List</h2>
                <input ref="title" /> <button onClick={this.addData}>Add the todo+</button>
                <hr />
                <ul className="list">
                {
                    this.state.list.map((value,key) => (
                        <li key={key}> {value} <button onClick={this.removeDate.bind(this,key)}>Delete</button></li> 
                    ))
                }
                </ul>
            </div>
        );
    }
}

export default Todolist;