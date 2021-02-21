import { Component } from 'react';
import '../Styles/Boat.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import sendMessage from './../sendMessage'
import GetUserData from './../GetUserData'
import getMatches from './../GetMatches'
import $ from 'jquery'
import UpdateUserProfile from "../UpdateUserProfile";

export default class Boat extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedUser: null,
            userList: [],
            messages: {},
            userData: null,
            viewed: {},
            unread: {},
            selectedUserImage: false,
        }
    }

    componentDidMount() {
        let messageTemp = this.state.messages;
        const ref = this.props.firebase.firestore().collection('users').doc(this.props.uid).collection('Messages')
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
        GetUserData(this.props.uid, this.props.firebase).then(data => {
            this.setState({userData: data})
            let viewed = this.state.viewed
            getMatches(this.props.uid, this.props.firebase).then(matches => {
                $("#UsersList").innerHTML = "";
                $.each(matches, (key, val) => {
                    let user = GetUserData(val.uid, this.props.firebase);
                    viewed[val.uid] = data[`viewedFrom${val.uid}`]?data[`viewedFrom${val.uid}`]:0;
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
                this.setState({viewed:viewed})
            })
        })



    }

    updateChat() {
        if(this.state.userData && this.state.messages[this.state.selectedUser]){
            const newData = {
                ...this.state.userData
            }
            newData[`viewedFrom${this.state.selectedUser}`] = this.state.messages[this.state.selectedUser].messages.length;
            UpdateUserProfile(this.props.firebase, newData, this.props.uid)
        }
        let unread={}
        Object.keys(this.state.messages).forEach((key) =>{
            if(this.state.selectedUser && this.state.selectedUser.otherUser !== key) {
                if (this.state.messages.key) {
                    let diff = this.state.viewed.key - this.state.messages.key.messages.length;
                    unread.key = diff;
                    const value = $(`userInfo${key}`).text();
                    let num = value.split(':')
                    let temp = ''
                    for (let i = 0; i < num - 1; i++) {
                        temp += value[i] + ':'
                    }
                    temp += diff;
                    $(`userInfo${key}`).text(temp)

                }
            }
        } )
        console.log("messages")
        console.log(this.state.messages)
        $(".MessagesContainer").empty();
        let messages = this.state.messages[this.state.selectedUser];
        let context = this;
        if (messages)
        {

            $.each(messages.messages, (key, val) => {
                let other = true;
                if (val["user"] === context.props.uid) {
                    other = false;
                }
                context.add_message(val["message"], other);
            })
        }
        else
        {
            console.log("message is undefined");
        }
    }

        componentDidUpdate()
        {
            if(this.state.selectedUser){
                GetUserData(this.state.selectedUser, this.props.firebase).then(data => {
                    if(data.image){
                        this.props.firebase.storage().ref().child(this.state.selectedUser + '.' + data.image).getDownloadURL().then(url => {
                            this.setState({selectedUserImage: url})
                        })
                    }
                })
            }
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
                    selectedUser: user.uid
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
                    <h3 id={`userInfo${user.uid}`}>
                        {user["name"] != null ? user["name"] : "XXX"}, Unread: {this.state.messages.user && this.state.viewed.user ? this.state.messages.user.uid.messages.length - this.state.viewed.user.uid : 0}
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
                            <input id="SendMessage" class="form-control" type="text" placeholder="Message"></input>
                            <button id="SendButton" class="btn btn-secondary">Send</button>
                        </div>
                    </div>
                    <div class="UserInformation">
                        <img src={this.state.selectedUserImage}/>
                        <h2 class="name">asdf</h2>
                        <br/>
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
