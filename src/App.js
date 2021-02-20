import logo from './logo.svg';
import './App.css';
import {Component,react} from 'react';


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
          <img src={logo} className="App-logo" alt="logo"/>
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
              className="App-link"
              href="https://reactjs.org"
              target="_blank"
              rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
  );
}
}

export default App;
