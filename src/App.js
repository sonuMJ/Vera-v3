import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Tagging from './components/Tagging';
import Tag from './components2/Tag';
import Loadimg from './components2/Loadimg';

class App extends Component {
  render() {
    return (
      <div>
        {/* <Tagging /> */}
        <Tag />
      </div>
    );
  }
}

export default App;
