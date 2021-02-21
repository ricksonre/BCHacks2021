import { Component } from 'react';
import GetUserData from '../GetUserData';
import '../Styles/Profile.css';
import {Typography} from "@material-ui/core";

export default class Profile extends Component
{

    constructor(props)
    {
        super(props);
        this.state = {image: false, userData: false}

        GetUserData(this.props.uid, this.props.firebase).then(data => {
            this.setState({userData: data})
            if(data.image){
                this.props.firebase.storage().ref().child(this.props.uid + '.' + data.image).getDownloadURL().then(url => {
                    this.setState({image: url})
                })
            }
        })

    }

    render()
    {
        console.log(this.state.image)
        return (
            <div style={{ marginTop: '2em', marginLeft: '2em'}}>


                <div style={{display: 'inline-block'}}>
            {this.state.image && (<img src={this.state.image} style={{marginTop: '-5em',maxWidth: '30em', maxHeight: '30em'}}/>)}
            </div>
                <div style={{marginLeft: '10em',display: 'inline-block'}}>
            {this.state.userData && (
                <div>
                    <Typography style={{fontSize: '2em', color: 'white'}}>
                        Name: {this.state.userData.name}
                    </Typography>
                    <Typography style={{fontSize: '2em', color: 'white'}}>
                        Location: {this.state.userData.location}
                    </Typography>
                    <Typography style={{fontSize: '2em', color: 'white'}}>
                        Occupation: {this.state.userData.occupation}
                    </Typography>
                    <Typography style={{fontSize: '2em', color: 'white'}}>
                        Hobby: {this.state.userData.hobby}
                    </Typography>
                    <Typography style={{fontSize: '2em', color: 'white'}}>
                        Favorite Food: {this.state.userData.food}
                    </Typography>
                    <Typography style={{fontSize: '2em', color: 'white'}}>
                        Favorite Movie: {this.state.userData.movie}
                    </Typography>

                </div>
            )}</div>
            </div>
        )
    }

}
