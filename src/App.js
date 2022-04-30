/*global chrome*/
// import React, { Component } from 'react'

// export default class App extends Component {

//   constructor(props){
//     super(props);
//     this.state={
//       users:[],
//       inputVal:"",
//       count:0,
//       linkUrl:""
//     }
    
//   }

//   getUsers = async() => {
//     let users = await fetch("https://jsonplaceholder.typicode.com/users");
//     users = await users.json();
//     await this.setState({users});
//     await this.setState({count:this.state.count + 1});

//   }

//   // gotTabs = async(tabs) => {
//   //   console.log(tabs);
//   //   // await this.setState({tab:tabs[0]})
//   // }


//   componentDidMount = async() => {
//     console.log(window.location.href);
//     let message = {
//       task:"GETTABLINK"
//     }
//     chrome.runtime.sendMessage(message);
    
//     let linkObj = chrome.extension.getBackgroundPage();
//     console.log(linkObj);
//     await this.setState({linkUrl: linkObj.link});

//     ///////////////////////
//     let params = {
//       active:true,
//       currentWindow:true
//     }
//     chrome.tabs.query(params, gotTabs);

//     function gotTabs(tabs){
//       console.log(tabs);
//       let message = event.target.value;
//       let msg ={
//         txt:message
//       }  
//       chrome.tabs.sendMessage(tabs[0].id, msg);
//       console.log(tabUrl);
//       tabUrl = tabs[0].url;
//       console.log(tabUrl);
//     }

    
//     // chrome.runtime.onMessage.addListener(gotMessage);
//     // function gotMessage(message, sender, sendResponse){
//     //   console.log(message);
//     // }
//   }

  

//   // changeText = async(event) => {
//   //   var tabUrl = "";
//   //   let params = {
//   //     active:true,
//   //     currentWindow:true
//   //   }
//   //   chrome.tabs.query(params, gotTabs);

//   //   function gotTabs(tabs){
//   //     console.log(tabs);
//   //     let message = event.target.value;
//   //     let msg ={
//   //       txt:message
//   //     }  
//   //     chrome.tabs.sendMessage(tabs[0].id, msg);
//   //     console.log(tabUrl);
//   //     tabUrl = tabs[0].url;
//   //     console.log(tabUrl);
//   //   }
//   // }

//   render() {
//     return (
//       <>
//         <div>{this.state.linkUrl}</div>
//         {/* <input onChange={(event) => this.changeText(event)}/> */}
//         <div>{this.state.count}</div>
//         <button onClick={this.getUsers}>Click to get Users</button>
//         <h1>List of users</h1>
//         {this.state.users.map((user,index) => {
//           return <li key={index}>{user.name}</li>
//         })}
//       </>
//     )
//   }
// }


import React,{useEffect, useState} from 'react'

export default function App() {

  const [linkUrl, setlinkUrl] = useState("");
  const [linkUrl2, setlinkUrl2] = useState("");
  const [count, setCount] = useState(0);

  useEffect(() => {
    chrome.storage.sync.get("url", function (obj) {
      setlinkUrl2(obj.url);
  });
    // chrome.storage.sync.get(['linkUser'], (data) => {
    //   console.log(data);
    // })

    // localStorage['user'] = "tirth"
    // console.log(localStorage['user']);

    let params = {
      active:true,
      currentWindow:true
    }
    chrome.tabs.query(params, gotTabs);

    function gotTabs(tabs){
      console.log(tabs);
      let tabUrl = tabs[0].url;
      console.log(tabUrl);
      setlinkUrl(tabUrl);
      
    }
  
  }, [])
  


  return (
    <>
      <div>{linkUrl2}</div>
      <div>{linkUrl}</div>
      <button onClick={() => setCount(count + 1)}>Change Count</button>
    </>
  )
}

