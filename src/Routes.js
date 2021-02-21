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
						<Route path={'/ship'} component={() => <Ship firebase={this.props.firebase} uid={this.props.uid}/>}/>
						<Route path={'/yourboat'} component={() => <Boat firebase={this.props.firebase} uid={this.props.uid}/>}/>
						<Route path={'/profile'} component={() => <Profile firebase={this.props.firebase} uid={this.props.uid}/>}/>
						<Route path={'/home'} component={() => <Home firebase={this.props.firebase} uid={this.props.uid}/>}/>
						<Route path={'/accountcreation'} component={() => <AccountCreation firebase={this.props.firebase} uid={this.props.uid}/>}/>
					</Switch>
				</div>
			</main>
		</BrowserRouter>
		</div>
	)
}
