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
            $(".MessagesContainer").empty();
            $.each(matches, (key,val)=>
            {
                let user = GetUserData(val.userID, this.props.firebase);
                let first = true;
                user.then((value)=>
                {
                    if(null != value)
                    {
                        if (first)
                        {
                            context.showChat(value);
                            first = false;
                        }
                        context.add_user(value);
                    }
                })
            })
        })

    }

    messageUser = (message) => {
        sendMessage(this.props.uid, this.state.selectedUser, this.props.firebase, message);
    }

    showChat(user)
    {
        let userInfo = $(".UserInformation");
        console.log(userInfo);
        userInfo.find(".name").html(user.name);
        userInfo.find(".age").html(user.birthday);
        userInfo.find(".location").html(user.location);
        userInfo.find(".hobby").html(user.hobby);
        userInfo.find(".movie").html(user.movie);
        userInfo.find(".food").html(user.food);
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
        
        let context = this;
        $(".UserContainer")
            .on("click", () =>
            {
                context.showChat(user);
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
                    <img/>
                    <h3 class="name">asdf</h3>
                    <h4 class="age">asdf</h4>
                    <h4 class="location">asdf</h4>
                    <h4 class="hobby">asdf</h4>
                    <h4 class="movie">asdf</h4>
                    <h4 class="food">asdf</h4>
                </div>
            </div>
        )
    }

}