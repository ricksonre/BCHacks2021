import {BrowserRouter, Route, Switch} from "react-router-dom";
import Home from './Views/Home'
import Ship from './Views/Ship'
import Boat from './Views/Boat'
import Profile from './Views/Profile'

export default function routes(){
	return(
		<div style={{width: 'calc(100% - 3em)', position: 'absolute', left: '3em', top: 0,  height: '100%'}}>
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