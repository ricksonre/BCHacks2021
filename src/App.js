import logo from './logo.svg';
import './App.css';
import {Component} from 'react';
import {BrowserRouter} from "react-router-dom";
import Routes from './Routes'
import Layout from './Layout'

export default function app() {

  return (
      <div className="App">
        <header className="App-header">
         <Layout/>
        </header>
      </div>
  );
}
