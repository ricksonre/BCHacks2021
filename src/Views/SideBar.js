import {BrowserRouter, Route, Switch} from "react-router-dom";
import '../Styles/SideBar.css'
import {Link} from 'react-router-dom'
import {Component} from 'react';

export default class Sidebar extends Component
{

	constructor(props){
		super(props);
		this.state={
			notificationNumber: 0,
			messagesTotal: 0,
			firstTime: true,
			cachedTotal: 0,
		}
	}

	componentDidMount(){
		let messageTemp = []
		const ref = this.props.firebase.firestore().collection('users').doc(this.props.uid).collection('Messages')
		ref.onSnapshot(colSnap => {
			colSnap.docs.forEach(data => {
				console.log("DOC DATA WOOOO", data.data())
				messageTemp[data.data().otherUser] = {messages: data.data().messages, user: data.data().otherUser};
			})
			let total = 0;
			messageTemp.forEach(user => {
				total += user.messages.length
			})
			if(this.state.firstTime || window.location.href.includes('/yourboat')){
				this.setState({messagesTotal: total, firstTime: false})
			}
			else{
				this.setState({notificationNumber: total-this.state.messagesTotal, cachedTotal: total})
			}
		})
	}

	render() {
		return (
			<div class="SideBar">
				<Link to="/">
					<img src="icon.png" class="Icon"></img>
				</Link>
				<div class="SideBarButton">
					<Link to="/ship">Ship</Link>
				</div>
				<div class="SideBarButton" onClick={() => this.setState({notificationNumber: 0, messagesTotal: this.state.cachedTotal})}>
					<Link to="/yourboat">Your Boat</Link>
				</div>
				<div class="SideBarButton">
					<Link to="/profile">Profile</Link>
				</div>
			</div>
		)
	}
}