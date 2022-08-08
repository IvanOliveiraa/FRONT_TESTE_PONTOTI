import React, { Component } from 'react';
import { AuthProvider } from './contexts/auth';

import './App.css';
import { BrowserRouter as Router, Routes } from 'react-router-dom';

import Rotas from './routes';

class App extends Component {
  render() {
    return (
      <>
      <title>Ponto TI</title>
      <AuthProvider>
        
      <div className="App" style={{backgroundColor:'#232729',height:'100vh'}}>
      
        <Router>
          <Rotas/>
        </Router>
      </div>
      </AuthProvider>
      </>);
  }
}

export default App;
