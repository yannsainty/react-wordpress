import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './components/Home'
import NosChambres from './components/NosChambres';


class App extends React.Component {

  render(){   

    return (
      <BrowserRouter>
        <div className="App" id="container-app">
          <Navbar />
          <Route exact path='/' component={Home} />
          <Route exact path='/nos-chambres' component={NosChambres} />
        </div>
      </BrowserRouter>
    );
  }
  
}

export default App;
