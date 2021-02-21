import { Component } from 'react';
import '../Styles/Boat.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import sendMessage from './../sendMessage'
import GetUserData from './../GetUserData'
import getMatches from './../GetMatches'
import $ from 'jquery'

export default class Boat extends Component
{
    constructor(props)
    {
        super(props);
        this.state= {
            selectedUser: null,
        }
    }

    componentDidMount()
    {
        let context =  this;
        $("#SendButton").on("click", ()=>
        {
            let message = $(".ChatMessageInputContainer").find("input").html();
            if(message.length > 0)
            {
                context.sendMessage();
            }
        });

        getMatches("00000Example", this.props.firebase).then(matches => {
            console.log("MATCHES", matches)
            $.each(matches, (key,val)=>
            {
                let user = GetUserData(val.userID, this.props.firebase);
                user.then((value)=>
                {
                    if(null != value)
                    {
                        context.add_user(value);
                    }
                })
            })
        })

    }

    messageUser = (message) => {
        sendMessage(this.props.uid, this.state.selectedUser, this.props.firebase, message);
    }

    show_chat(user)
    {
        
    }

    add_message(text, other=false)
    {
        $("<div/>")
            .attr("class", "MessageContainer")
            .append(
                $("<div/>")
                    .attr("class", `Message ${other? "Other": "User"}`)
                    .html(text)
            )
            .appendTo($(".MessagesContainer"))
    }

    add_user(user)
    {
        $("#UsersList").append(
            `
                <div class="UserContainer">
                    <img class="img-thumbnail"/>
                    <h3>
                        ${user["name"] != null ? user["name"]: "Name Missing"}
                    </h3>
                    <hr/>
                </div>
            `);

        $(".UserContainer")
            .on("click", () =>
            {
                Boat.showChat(user);
            });
    }

    render()
    {
        return (
            <div class="Boat">
                <div id="UsersList">
                    
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
                        <button id="SendButton" >Send</button>
                    </div>
                </div>
                <div class="UserInformation">

                </div>
            </div>
        )
    }

}
