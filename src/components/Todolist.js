import React, { Component } from 'react'
import '../assets/css/index.css'
import Storage from '../module/storage'


class Todolist extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [
                {
                    title: "homework",
                    checked: true
                },
                {
                    title: "goodday",
                    checked: false
                }
            ]
        };
    }

    addData = (e) => {
        if(e.keyCode == 13){
            let title = this.refs.title.value;
            var tempList = this.state.list;
            tempList.push({
                title: title,
                checked: false
            });

            this.setState({
                list: tempList
            })
            this.refs.title.value = "";
        }

        Storage.set("todolist", tempList);
    }

    removeData = (key) => {
        var tempList = this.state.list;
        tempList.splice(key, 1);
        this.setState({
            list: tempList
        })

        Storage.set("todolist", tempList);
    }

    checkboxChange = (key) => {
        var tempList = this.state.list;
        tempList[key].checked = !tempList[key].checked;
        this.setState({
            list: tempList
        })
        Storage.set("todolist", tempList);

    }

    componentDidMount(){
        var todolist = Storage.get("todolist");
        if(todolist){
            this.setState({
                list: todolist
            })
        }

    }
    render() {
        return (
            <div >
                <header className="title">
                    <h2>Todo List</h2>
                    <input ref="title" onKeyUp={this.addData}/> <button onClick={this.addData}>Add the todo+</button>
                </header>
                <hr />
                <h2>Things to do</h2>
                <ul>
                    {
                        this.state.list.map((value, key) => {
                            if (!value.checked) {
                                return (
                                    <li key={key}>
                                        <input type="checkbox" checked={value.checked} onChange={this.checkboxChange.bind(this,key)}/> {value.title}
                                        <button onClick={this.removeData.bind(this,key)}>Delete</button>
                                    </li>

                                )
                            }
                        })
                    }
                </ul>
                <hr />
                <h2>Things Done</h2>
                <ul>
                    {
                        this.state.list.map((value, key) => {
                            if (value.checked) {
                                return (
                                    <li key={key}>
                                        <input type="checkbox" checked={value.checked} onChange={this.checkboxChange.bind(this,key)}/> {value.title}
                                        <button onClick={this.removeData.bind(this,key)}>Delete</button>
                                    </li>
                                )
                            }
                        })
                    }
                </ul>
            </div>
        );
    }
}

export default Todolist;