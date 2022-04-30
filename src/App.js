/*global chrome*/
import React, { Component } from 'react'

export default class App extends Component {
  constructor(props){
    super(props);
    this.state={
      users:[],
      inputVal:"",
      count:0
    }
  }

  getUsers = async() => {
    let users = await fetch("https://jsonplaceholder.typicode.com/users");
    users = await users.json();
    await this.setState({users});
    await this.setState({count:this.state.count + 1});

  }

  gotTabs = async(tabs) => {
    console.log(tabs);
    // await this.setState({tab:tabs[0]})
  }


  componentDidMount = async() => {
    console.log(window.location.href);
  }

  changeText = (event) => {
    let params = {
      active:true,
      currentWindow:true
    }
    chrome.tabs.query(params, gotTabs);
    
    function gotTabs(tabs){
      console.log(tabs);
      let message = event.target.value;
      let msg ={
        txt:message
      }  
      chrome.tabs.sendMessage(tabs[0].id, msg)
    }
  }

  render() {
    return (
      <>
        <input onChange={(event) => this.changeText(event)}/>
        <div>{this.state.count}</div>
        <button onClick={this.getUsers}>Click to get Users</button>
        <h1>List of users</h1>
        {this.state.users.map((user,index) => {
          return <li key={index}>{user.name}</li>
        })}
      </>
    )
  }
}
