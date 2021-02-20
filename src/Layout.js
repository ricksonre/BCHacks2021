import {BrowserRouter, Route, Switch} from "react-router-dom";
import Home from './Home'
import Routes from './Routes'


export default function routes(){
	return(
		<div>
			<div style={{backgroundColor: '#397FCF', width: '3em', height: '100%', position: 'absolute', left: 0, top: 0}}>
				<div style={{width: '100%', height: '3em'}}>
					
				</div>
				<div style={{width: '100%', height: '3em'}}>

				</div>
				<div style={{width: '100%', height: '3em'}}>

				</div>
			</div>
			<Routes/>
		</div>
	)
}