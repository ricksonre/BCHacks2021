import { Component } from 'react';
import GetUserData from '../GetUserData';

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
            <div>
                <p>
                    profile
                </p>
                {this.state.image && (<img src={this.state.image}/>)}
                {this.state.userData && JSON.stringify(this.state.userData)}

            </div>
        )
    }

}