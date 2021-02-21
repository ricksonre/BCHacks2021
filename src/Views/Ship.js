import { Component } from 'react';
import GetUserIds from "../GetUserIds";
import GetPotentialMatches from "../GetPotentialMatches";
import GetUserData from "../GetUserData";
import MatchUpdater from '../MatchUpdater';
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
        if(index > 0){
            secondUserIDs.splice(index, 1)
        }
        let secondId = secondUserIDs[Math.floor(Math.random() * secondUserIDs.length)];
        this.setState({userOne: uid, userTwo: secondId});

        GetUserData(uid, firebase).then(data => {
            this.setState({userOneData: data})
            if(data.image){
                firebase.storage().ref().child(this.props.uid + '.' + data.image).getDownloadURL().then(url => {
                    this.setState({userOneImage: url})
                })
            }
        })
        GetUserData(secondId, firebase).then(data => {
            this.setState({userTwoData: data})
            if(data.image){
                firebase.storage().ref().child(this.props.uid + '.' + data.image).getDownloadURL().then(url => {
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
            console.log(data)
        })
    }



    render()
    {
        return (
            <div>
            <div style={{ marginTop: '2em', marginLeft: '2em', display: 'inline-block'}}>

                <div style={{display: 'inline-block'}}>
                <div >
                    {this.state.userOneImage && (<img src={this.state.userOneImage} style={{maxWidth: '10em', maxHeight: '10em'}}/>)}
                </div>
                <div>
                    {this.state.userOneData && (
                        <div>
                            <Typography style={{fontSize: '2em', color: 'white'}}>
                                Name: {this.state.userOneData.name}
                            </Typography>
                            <Typography style={{fontSize: '2em', color: 'white'}}>
                                Location: {this.state.userOneData.location}
                            </Typography>
                            <Typography style={{fontSize: '2em', color: 'white'}}>
                                Occupation: {this.state.userOneData.occupation}
                            </Typography>
                            <Typography style={{fontSize: '2em', color: 'white'}}>
                                Hobby: {this.state.userOneData.hobby}
                            </Typography>
                            <Typography style={{fontSize: '2em', color: 'white'}}>
                                Favorite Food: {this.state.userOneData.food}
                            </Typography>
                            <Typography style={{fontSize: '2em', color: 'white'}}>
                                Favorite Movie: {this.state.userOneData.movie}
                            </Typography>

                        </div>
                    )}</div>
                </div>
            </div>
                <div style={{ marginTop: '2em', marginLeft: '2em', display: 'inline-block'}}>

                    <div style={{}}>
                        <div >
                            {this.state.userTwoImage && (<img src={this.state.userTwoImage} style={{maxWidth: '10em', maxHeight: '10em'}}/>)}
                        </div>
                        <div>
                            {this.state.userTwoData && (
                                <div>
                                    <Typography style={{fontSize: '2em', color: 'white'}}>
                                        Name: {this.state.userTwoData.name}
                                    </Typography>
                                    <Typography style={{fontSize: '2em', color: 'white'}}>
                                        Location: {this.state.userTwoData.location}
                                    </Typography>
                                    <Typography style={{fontSize: '2em', color: 'white'}}>
                                        Occupation: {this.state.userTwoData.occupation}
                                    </Typography>
                                    <Typography style={{fontSize: '2em', color: 'white'}}>
                                        Hobby: {this.state.userTwoData.hobby}
                                    </Typography>
                                    <Typography style={{fontSize: '2em', color: 'white'}}>
                                        Favorite Food: {this.state.userTwoData.food}
                                    </Typography>
                                    <Typography style={{fontSize: '2em', color: 'white'}}>
                                        Favorite Movie: {this.state.userTwoData.movie}
                                    </Typography>

                                </div>
                            )}</div></div>
                </div>
                <div>
                <Button style={{marginLeft: '10em',backgroundColor: '#084DFF', marginTop: '5em', width: '5em'}} onClick={() => this.SHIP_IT()}>
                    SHIP IT
                </Button>
                    <Button style={{marginLeft: '10em',backgroundColor: '#ff4DFF', marginTop: '5em', width: '10em'}} onClick={() => this.getNewMatch(this.props.firebase)}>
                        DON'T SHIP IT
                    </Button>
            </div>
            </div>
        )
    }

}