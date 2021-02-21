import { Component } from 'react';
import GetUserIds from "../GetUserIds";
import GetPotentialMatches from "../GetPotentialMatches";
import GetUserData from "../GetUserData";
import MatchUpdater from '../MatchUpdater';

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
        }
        this.getNewMatch(this.props.firebase);
    }

    async getNewMatch (firebase){
        let userIDs = await GetUserIds(firebase);
        const uid = userIDs[Math.floor(Math.random() * userIDs.length)] ;
        let secondUserIDs = await GetPotentialMatches(uid, false, firebase);
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

    }

    SHIP_IT(){
        MatchUpdater(this.state.userOne, this.state.userTwo, this.props.firebase)
    }



    render()
    {
        return (
            <p>
                Ship
            </p>
        )
    }

}