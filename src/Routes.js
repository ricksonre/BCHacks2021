import {BrowserRouter, Route, Switch} from "react-router-dom";
import Home from './Views/Home'
import Ship from './Views/Ship'
import Boat from './Views/Boat'
import Profile from './Views/Profile'
import './Styles/Routes'

export default function routes(){
	return(
		<div class="Content">
		<BrowserRouter>
			<main>
				<div>
					<Switch>
						<Route path={'/'} component={Home}/>
						<Route path={'/ship'} component={Ship}/>
						<Route path={'/yourboat'} component={Boat}/>
						<Route path={'/profile'} component={Profile}/>
					</Switch>
				</div>
			</main>
		</BrowserRouter>
		</div>
	)
}