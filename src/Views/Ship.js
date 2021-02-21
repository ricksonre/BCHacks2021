import { Component } from 'react';
import GetUserIds from "../GetUserIds";
import GetPotentialMatches from "../GetPotentialMatches";
import GetUserData from "../GetUserData";
import MatchUpdater from '../MatchUpdater';
import "../Styles/Ship.css"
import {Button, Typography} from "@material-ui/core";

export default class Ship extends Component
{

    constructor(props)
    {
        super(props);
        this.state={
            userOne: false,
            userTwo: false,
            userOneData: false,
            userTwoData: false,
            userOneImage: false,
            userTwoImage: false,
            hasShipped: false,
        }
        this.getNewMatch(this.props.firebase);
    }

    async getNewMatch (firebase){
        let userIDs = await GetUserIds(firebase);
        const uid = userIDs[Math.floor(Math.random() * userIDs.length)] ;
        let secondUserIDs = await GetPotentialMatches(uid, false, firebase);
        const index = secondUserIDs.indexOf(uid)
        console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAH", index)
        if(index !== -1){
            secondUserIDs.splice(index, 1)
        }
        let secondId = secondUserIDs[Math.floor(Math.random() * secondUserIDs.length)];
        this.setState({userOne: uid, userTwo: secondId});

        GetUserData(uid, firebase).then(data => {
            this.setState({userOneData: data})
            if(data.image){
                firebase.storage().ref().child(uid + '.' + data.image).getDownloadURL().then(url => {
                    this.setState({userOneImage: url})
                })
            }
        })
        GetUserData(secondId, firebase).then(data => {
            this.setState({userTwoData: data})
            if(data.image){
                firebase.storage().ref().child(secondId + '.' + data.image).getDownloadURL().then(url => {
                    this.setState({userTwoImage: url})
                })
            }
        })

        this.setState({hasShipped: false})

    }

    SHIP_IT(){
        if(this.state.hasShipped)
            return;
        this.setState({hasShipped: true})
        console.log(this.state.userOne, this.state.userTwo)
        MatchUpdater(this.state.userOne, this.state.userTwo, this.props.firebase).then(data => {
            this.getNewMatch()
            console.log(data)
        })
    }



    render()
    {
        return (
            <div class="UsersContainer">
            <div class="UserProfileContainer">

                <div style={{display: 'inline-block'}}>
                <div >
                    {this.state.userOneImage && (<img src={this.state.userOneImage} style={{maxWidth: '10em', maxHeight: '10em'}}/>)}
                </div>
                <div>
                    {this.state.userOneData && (
                                <div class="UserProfile">
                            <Typography>
                                Name: {this.state.userOneData.name}
                            </Typography>
                            <Typography>
                                Location: {this.state.userOneData.location}
                            </Typography>
                            <Typography>
                                Occupation: {this.state.userOneData.occupation}
                            </Typography>
                            <Typography>
                                Hobby: {this.state.userOneData.hobby}
                            </Typography>
                            <Typography>
                                Favorite Food: {this.state.userOneData.food}
                            </Typography>
                            <Typography>
                                Favorite Movie: {this.state.userOneData.movie}
                            </Typography>

                        </div>
                    )}</div>
                </div>
            </div>
                <div class="UserProfileContainer">

                    <div style={{}}>
                        <div >
                            {this.state.userTwoImage && (<img src={this.state.userTwoImage} style={{maxWidth: '10em', maxHeight: '10em'}}/>)}
                        </div>
                        <div>
                            {this.state.userTwoData && (
                                <div class="UserProfile">
                                    <Typography>
                                        Name: {this.state.userTwoData.name}
                                    </Typography>
                                    <Typography>
                                        Location: {this.state.userTwoData.location}
                                    </Typography>
                                    <Typography>
                                        Occupation: {this.state.userTwoData.occupation}
                                    </Typography>
                                    <Typography>
                                        Hobby: {this.state.userTwoData.hobby}
                                    </Typography>
                                    <Typography>
                                        Favorite Food: {this.state.userTwoData.food}
                                    </Typography>
                                    <Typography>
                                        Favorite Movie: {this.state.userTwoData.movie}
                                    </Typography>

                                </div>
                            )}</div></div>
                </div>
                <div class="ButtonsDivs">
                <Button class="btn btn-success" onClick={() => this.SHIP_IT()}>
                    SHIP IT
                </Button>
                    <Button class="btn btn-danger" onClick={() => this.getNewMatch(this.props.firebase)}>
                        SINK IT
                </Button>
            </div>
            </div>
        )
    }

}