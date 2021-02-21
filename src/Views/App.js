import '../Styles/App.css';
import Routes from '../Routes'
import SideBar from './SideBar'
import {Component} from 'react'
import firebaseHelper from "../firebaseHelper";

export default class app extends Component
{

    constructor(props){
        super(props);

        const firebase = firebaseHelper();

        this.state={
            firebase: firebase,
            uid: false,
            firebaseListeners: null
        }
    }

    updateUserId = (uid) => {
        const listener = this.state.firebase.firestore().collection('users').doc(this.state.uid).collection('Messages')
        this.setState({firebaseListeners: listener})
    }

    render(){
        const uid = this.state.uid;
        return uid ?
           (
                <div className="App">
                    <SideBar/>
                    <Routes
                        firebase={this.state.firebase} uid={this.state.uid}
                            firebaseListener={this.state.firebaseListeners}
                    />
                </div>
           ) : (
                        <div className="App">
                            Login here aaaa
                        </div>
                    )

    }

}
