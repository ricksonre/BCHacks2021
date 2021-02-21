import {BrowserRouter, Route, Switch} from "react-router-dom";
import '../Styles/SideBar.css'
import {Link} from 'react-router-dom'

export default function sidebar()
{
	return(
		<div class="SideBar">
			<Link to="/">
				<img src="icon.png" class="Icon"></img>
			</Link>
			<div class="SideBarButton" >
				<Link to="/ship">Ship</Link>
			</div>
			<div class="SideBarButton" >
				<Link to="/yourboat">Your Boat</Link>
			</div>
			<div class="SideBarButton" >
				<Link to="/profile">Profile</Link>
			</div>
		</div>
	)
}