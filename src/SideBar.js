import {BrowserRouter, Route, Switch} from "react-router-dom";
import Home from './Home'
import Routes from './Routes'
import './sideBar.css'

export default function sidebar()
{
	return(
		<div class="SideBar">
			<img src="icon.png" class="Icon"></img>
		</div>
	)
}