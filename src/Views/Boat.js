import { Component } from 'react';
import '../Styles/Boat.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import sendMessage from './../sendMessage'
import GetUserData from './../GetUserData'
import getMatches from './../GetMatches'
import $ from 'jquery'

export default class Boat extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedUser: null,
            userList: [],
            messages: {}
        }
    }

    componentDidMount() {
        let messageTemp = this.state.messages;
        const ref = this.props.firebase.firestore().collection('users').doc('00000Example').collection('Messages')
        ref.onSnapshot(colSnap => {
            colSnap.docs.forEach(data => {
                console.log("DOC DATA WOOOO", data.data())
                messageTemp[data.data().otherUser] = {messages: data.data().messages, user: data.data().otherUser};
            })
            this.setState({messages: messageTemp})
        })

        let context = this;
        $("#SendButton").on("click", () => {
            let message = $("#SendMessage").val();
            if (message.length > 0) {
                context.messageUser(message);
            }
            $("#SendMessage").val("");
        });

        getMatches("00000Example", this.props.firebase).then(matches => {
            $("#UsersList").innerHTML = "";
            $.each(matches, (key, val) => {
                let user = GetUserData(val.userID, this.props.firebase);
                let first = true;
                user.then((value) => {
                    if (null != value) {
                        if (first) {
                            context.showChat(value);
                            first = false;
                        }
                        context.add_user(value);
                    }
                })
            })
        })
    }

    updateChat() {

        $(".MessagesContainer").empty();
        let messages = this.state.messages;
        let context = this;
        console.log(messages)
        if (messages) {

            $.each(messages.messages, (key, val) => {
                let other = true;
                if (val["user"] === context.props.uid) {
                    other = false;
                }
                context.add_message(val["message"], other);
            })
        }
    }

        componentDidUpdate()
        {
            this.updateChat();
        }

        messageUser = (message) => {
            console.log(`Sending ${message} to: ${this.state.selectedUser}`);
            sendMessage(this.props.uid, this.state.selectedUser, this.props.firebase, message);
        }

        showChat(user)
        {
            this.updateChat();
            let userInfo = $(".UserInformation");
            userInfo.find(".name").html(user.name);
            userInfo.find(".age").html(user.birthday);
            userInfo.find(".location").html(user.location);
            userInfo.find(".hobby").html(user.hobby);
            userInfo.find(".movie").html(user.movie);
            userInfo.find(".food").html(user.food);

            this.setState(
                {
                    selectedUser: "U1"
                }
            )
        }

        add_message(text, other = false)
        {
            $("<div/>")
                .attr("class", "MessageContainer")
                .append(
                    $("<div/>")
                        .attr("class", `Message ${other ? "Other" : "User"}`)
                        .html(text)
                )
                .appendTo($(".MessagesContainer"))
        }

        add_user(user)
        {
            let newUser = (
                <div class="UserContainer" onClick={() => {
                    this.showChat(user);
                }}>
                    <img class="img-thumbnail"/>
                    <h3>
                        {user["name"] != null ? user["name"] : "XXX"}
                    </h3>
                    <hr/>
                </div>
            );
            let users = this.state.userList;
            this.setState({userList: [...users, newUser]})

        }

        render()
        {
            return (
                <div class="Boat">
                    <div id="UsersList">
                        {this.state.userList}
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
                            <input id="SendMessage" type="text" placeholder="Message"></input>
                            <button id="SendButton">Send</button>
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
