import logo from './logo.svg';
import './App.css';
import {Component} from 'react';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Routes from './Routes'

class App extends Component {

  constructor() {
    super();
    const mysql = require('mysql')
    const connection = mysql.createConnection({
      host: 'localhost',
      user: 'me',
      password: 'password',
      database: 'my_db',
    })
    //connection.connect();
    this.state={
      //initial state
      //mysql:connection,
    };
  }


render() {
  return (
      <div className="App">
        <header className="App-header">
         <BrowserRouter>
            <Routes/>
         </BrowserRouter>
        </header>
      </div>
  );
}
}

export default App;
