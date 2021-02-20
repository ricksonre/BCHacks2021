import {BrowserRouter, Route, Switch} from "react-router-dom";
import Home from './Home'


export default function routes(){
	return(
		<div style={{width: 'calc(100% - 3em)', position: 'absolute', left: '3em', top: 0,  height: '100%'}}>
		<BrowserRouter>
			<main>
				<div>
					<Switch>
						<Route path={'/'} component={Home}/>
					</Switch>
				</div>
			</main>
		</BrowserRouter>
		</div>
	)
}