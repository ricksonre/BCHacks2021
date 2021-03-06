import '../Styles/App.css';
import Routes from '../Routes'
import SideBar from './SideBar'
import AccountCreation from './AccountCreation'
import {Component} from 'react'
import $ from 'jquery';
import googleImage from '../gsignn.png'
import googleImage2 from '../gsignp.png'
import {BrowserRouter} from "react-router-dom";
import firebase, {initializeApp} from 'firebase';

export default class app extends Component
{

    constructor(props){
        super(props);

        if (!firebase.apps.length) {
            var firebaseConfig = {
                apiKey: "AIzaSyAVLfJmn-WkAGp7R3tEIBk-CYAVZ6-iR-o",
                databaseURL: "https://envios-bb361.firebaseio.com",
                authDomain: "envios-bb361.firebaseapp.com",
                projectId: "envios-bb361",
                storageBucket: "envios-bb361.appspot.com",
                messagingSenderId: "584556975097",
                appId: "1:584556975097:web:67950bd892e7e1070b6328",
                measurementId: "G-V0F2VLG6W8"
            };
            // Initialize Firebase

            firebase.initializeApp(firebaseConfig);
        }
        else{
            firebase.app()
        }

        this.state={
            firebase: firebase,
            uid: localStorage.getItem('uid') ? localStorage.getItem('uid') : undefined,
            hasAProfile: localStorage.getItem('hasAProfile'),
            firebaseListeners: null
        }

        if(undefined == this.state.hasAProfile)
        {
            localStorage.setItem("hasAProfile", false)
            this.setState({ hasAProfile: false });
        }
    }
    updateUserId = async (userid) => {
        console.log("HERE WITH UID OF", userid)

        this.setState({uid: userid.toString()})
        localStorage.setItem('uid', userid)
    }

    click_button(state)
    {
        if(state)
            $("#signin").attr("src", googleImage2 );
        else
            $("#signin").attr("src", googleImage );

    }

    gSignIn()
    {
        var provider = new this.state.firebase.auth.GoogleAuthProvider();;
        const that = this;
        this.state.firebase.auth().signInWithPopup(provider)
            .then(function(result)
            {
                // This gives you a Google Access Token. You can use it to access the Google API.
                // The signed-in user info.
                console.log("result", result.user.uid)
                var user = result.user.uid;

                that.updateUserId(user)

                });
    }

    render()
    {
        const uid = this.state.uid;
        console.log("RENDER!!!", this.state.firebaseListeners)
        console.log("HasAProfile: ", this.state.hasAProfile)
        console.log(this.state);
        if(uid)
        {
            if ("true" === this.state.hasAProfile)
            {
                console.log(1);
                return this.normalView();
            }
            else
            {
                return this.CreateProfileView();
            }
        }
        else
        {
            return this.loginView();
        }

    }

    normalView()
    {
        return (
            <div className="App">
                <BrowserRouter>
                    <SideBar firebase={this.state.firebase} uid={this.state.uid} />
                    <Routes
                        firebase={this.state.firebase} uid={this.state.uid}
                        firebaseListener={this.state.firebaseListeners}
                    />
                </BrowserRouter>
            </div>
        )
    }

    loginView()
    {
        return (
            <div className="App">
                <button style={{
                    margin: '0 0 0 0 ', padding: '0 0 0 0', border: "0", background: 'none', width: "35vh", height: "8vh",
                    position: "fixed", left: "20.75%", top: "35%"
                }}
                    onClick={() => { this.gSignIn(); }}
                    onMouseDown={() => { this.click_button(true); }}
                    onMouseUp={() => { this.click_button(false); }}>
                    <img id="signin" src={googleImage} style={{ width: "100%", height: "100%" }}></img>
                </button>
            </div>
        )
    }

    CreateProfileView()
    {
        return <div className="App">
            <AccountCreation hasAProfile={this.state.hasAProfile} firebase={this.state.firebase} uid={this.state.uid}/>
        </div>
    }

}
