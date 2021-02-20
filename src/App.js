import logo from './logo.svg';
import './Styles/App.css';
import {Component} from 'react';
import {BrowserRouter} from "react-router-dom";
import Routes from './Routes'
import SideBar from './SideBar'

export default function app() 
{
  return (
      <div class="App">
        <SideBar />
        <Routes />
      </div>
  );
}
