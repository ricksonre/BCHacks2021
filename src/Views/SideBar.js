import {BrowserRouter, Route, Switch} from "react-router-dom";
import '../Styles/SideBar.css'

export default function sidebar()
{
	return(
		<div class="SideBar">
			<a href="/">
				<img src="icon.png" class="Icon"></img>
			</a>
			<div class="SideBarButton" >
				<a href="/ship">Ship</a>
			</div>
			<div class="SideBarButton" >
				<a href="/yourboat">Your Boat</a>
			</div>
			<div class="SideBarButton" >
				<a href="/profile">Profile</a>
			</div>
		</div>
	)
}