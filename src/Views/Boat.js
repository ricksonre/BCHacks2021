import { Component } from 'react';
import '../Styles/Boat.css'
import 'bootstrap/dist/css/bootstrap.min.css';

export default class Boat extends Component
{

    constructor(props)
    {
        super(props);
    }

    render()
    {
        return (
            <div class="Boat">
                <div class="UsersList">
                    <div class="UserContainer">
                        <i class="bi bi-card-image">
                            <img class="img-thumbnail" />
                        </i>
                        <h3>
                            User Name
                        </h3>
                        <hr/>
                    </div>
                    <div class="UserContainer">
                        <i class="bi bi-card-image">
                            <img class="img-thumbnail" />
                        </i>
                        <h3>
                            User Name
                        </h3>
                        <hr/>
                    </div>
                    <div class="UserContainer">
                        <i class="bi bi-card-image">
                            <img class="img-thumbnail" />
                        </i>
                        <h3>
                            User Name
                        </h3>
                        <hr/>
                    </div>
                    <div class="UserContainer">
                        <i class="bi bi-card-image">
                            <img class="img-thumbnail" />
                        </i>
                        <h3>
                            User Name
                        </h3>
                        <hr/>
                    </div>
                    <div class="UserContainer">
                        <i class="bi bi-card-image">
                            <img class="img-thumbnail" />
                        </i>
                        <h3>
                            User Name
                        </h3>
                        <hr/>
                    </div>
                    <div class="UserContainer">
                        <i class="bi bi-card-image">
                            <img class="img-thumbnail" />
                        </i>
                        <h3>
                            User Name
                        </h3>
                        <hr/>
                    </div>
                    <div class="UserContainer">
                        <i class="bi bi-card-image">
                            <img class="img-thumbnail" />
                        </i>
                        <h3>
                            User Name
                        </h3>
                        <hr/>
                    </div>
                    <div class="UserContainer">
                        <i class="bi bi-card-image">
                            <img class="img-thumbnail" />
                        </i>
                        <h3>
                            User Name
                        </h3>
                        <hr/>
                    </div>
                </div>
                <div class="ChatContainer">
                    <div class="MessagesContainer">
                        <div class="MessageContainer">
                            <div class="Message User">
                                message 1
                            </div>
                        </div>
                        <div class="MessageContainer">
                            <div class="Message Other">
                                message 2
                            </div>
                        </div>
                    </div>
                    <div class="ChatMessageInputContainer">
                        <input type="text" placeholder="Message"></input>
                        <button>Send</button>
                    </div>
                </div>
                <div class="UserInformation">

                </div>
            </div>
        )
    }

}