import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Tagging from './components/Tagging';
import Tag from './components2/Tag';
import Loadimg from './components2/Loadimg';
import Loader from './components2/Loader';
import Taggimgmain from './components2/Taggingmain';
import { Switch, Route } from 'react-router-dom';
import Pageredirect from './components2/Pageredirect';

class App extends Component {

  // state = { 
  //   _tempData:[],
  //   _tagdata:[],
  //   isFetched:true
  // }

  // fetchData(){
  //   fetch("http://localhost:5000/tags")
  //       .then(res => res.json())
  //       .then(result => this.setState({
  //           _tempData : result,
  //           isFetched : false
  //       }))
  //       .catch(e => {
  //         console.log("error");
  //       })
  // }

  // submitData(data){
  //   console.log("submit called");
    
  //   // fetch("",{
  //   //   method:'POST',
  //   //   body: JSON.stringify(data)
  //   // })
  //   // .then(res => res.json())
  //   // .then(result => {
  //   //   console.log(result)
  //   //   //if true
  //   //     //this.fetchData()
  //   // })

  // }

  // parseTemp(){
  //   Object.keys(this.state._tempData).map(i => {
  //     //console.log(this.state._tempData[i][0]);
  //     this.setState({
  //       _tagdata : this.state._tempData[i][0]
  //     })
  //   })
  // }

  // componentDidMount(){
  //   this.fetchData();
  //   setTimeout(() => {
  //     this.parseTemp();
  //     //console.log(this.state._tagdata);
  //   }, 100);
  // }

  render() {
    
    return (
      <div>
        <Switch>
                <Route exact path='/' component={ Taggimgmain }/>
                <Route path='/redirect' component={ Pageredirect }/>
        </Switch>
        {/* <Taggimgmain /> */}
      </div>
    );
  }
}

export default App;
