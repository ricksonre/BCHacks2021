import {BrowserRouter, Route, Switch} from "react-router-dom";
import Home from './Home'


export default function routes(){
	return(
		<main>
			<Switch>
				<Route path={'/'} component={Home}/>
			</Switch>
		</main>
	)
}