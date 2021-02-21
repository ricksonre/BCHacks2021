import { Component } from 'react';
import '../Styles/Boat.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import $ from "jquery";

export default class Boat extends Component
{

    constructor(props)
    {
        super(props);
    }

    show_chat(user)
    {
        
    }

    add_user(user)
    {
        let userList = $("<div/>")
                        .attr("class", "UserContainer")
                        .on("click", ()=>
                        {
                            Boat.show_chat(user);
                        });

        $("<img />")
            .attr("class", "img-thumbnail")
            .attr("src", user.img)
            .appendTo(userList);

        $("<h3/>")
            .html(user.name)
            .appendTo(userList);
        
        $("<hr/>")
            .appendTo(userList
                );

        userList.appendTo("#UserList");


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
                        <button>Send</button>
                    </div>
                </div>
                <div class="UserInformation">

                </div>
            </div>
        )
    }

}