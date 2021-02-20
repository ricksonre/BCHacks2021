import {BrowserRouter, Route, Switch} from "react-router-dom";
import Home from './Views/Home'
import Ship from './Views/Ship'
import Boat from './Views/Boat'
import Profile from './Views/Profile'
import AccountCreation from './Views/AccountCreation'

export default function routes(){
	return(
		<div>
		<BrowserRouter>
			<main>
				<div>
					<Switch>
						<Route path={'/ship'} component={Ship}/>
						<Route path={'/yourboat'} component={Boat}/>
						<Route path={'/profile'} component={Profile}/>
						<Route path={'/home'} component={Home}/>
						<Route path={'/accountcreation'} component={AccountCreation}/>
					</Switch>
				</div>
			</main>
		</BrowserRouter>
		</div>
	)
}
