import {BrowserRouter, Route, Switch} from "react-router-dom";
import Home from './Views/Home'
import Ship from './Views/Ship'
import Boat from './Views/Boat'
import Profile from './Views/Profile'
import AccountCreation from './Views/AccountCreation'
import {Component} from 'react';

export default class routes extends Component{

	constructor(props){
		super(props);
	}
	render(){
		return(
			<div>

					<main>
						<div>
							<Switch>
								<Route path={'/ship'} component={() => <Ship firebase={this.props.firebase} uid={this.props.uid}/>}/>
								<Route path={'/yourboat'} component={() =>(<Boat firebase={this.props.firebase} uid={this.props.uid}/>)} firebaseListeners={this.props.firebaseListeners}/>
								<Route path={'/profile'} component={() => (<Profile firebase={this.props.firebase} uid={this.props.uid}/>)}/>
								<Route path={'/home'} component={() => (<Home firebase={this.props.firebase} uid={this.props.uid}/>)}/>
								<Route path={'/accountcreation'} component={() => (<AccountCreation firebase={this.props.firebase} uid={this.props.uid}/>)}/>
							</Switch>
						</div>
					</main>
			</div>
		)
	}
}
