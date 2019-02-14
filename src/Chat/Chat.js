import React, {Component} from 'react';
import './Chat.css';
import {Button, Input, InputGroup, InputGroupAddon} from "reactstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

function randomName() {
    const adjectives = ["autumn", "hidden", "bitter", "misty", "silent", "empty", "dry", "dark", "summer", "icy", "delicate", "quiet", "white", "cool", "spring", "winter", "patient", "twilight", "dawn", "crimson", "wispy", "weathered", "blue", "billowing", "broken", "cold", "damp", "falling", "frosty", "green", "long", "late", "lingering", "bold", "little", "morning", "muddy", "old", "red", "rough", "still", "small", "sparkling", "throbbing", "shy", "wandering", "withered", "wild", "black", "young", "holy", "solitary", "fragrant", "aged", "snowy", "proud", "floral", "restless", "divine", "polished", "ancient", "purple", "lively", "nameless"];
    const nouns = ["waterfall", "river", "breeze", "moon", "rain", "wind", "sea", "morning", "snow", "lake", "sunset", "pine", "shadow", "leaf", "dawn", "glitter", "forest", "hill", "cloud", "meadow", "sun", "glade", "bird", "brook", "butterfly", "bush", "dew", "dust", "field", "fire", "flower", "firefly", "feather", "grass", "haze", "mountain", "night", "pond", "darkness", "snowflake", "silence", "sound", "sky", "shape", "surf", "thunder", "violet", "water", "wildflower", "wave", "water", "resonance", "sun", "wood", "dream", "cherry", "tree", "fog", "frost", "voice", "paper", "frog", "smoke", "star"];
    const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
    const noun = nouns[Math.floor(Math.random() * nouns.length)];
    return adjective + noun;
}

function randomColor() {
    return '#' + Math.floor(Math.random() * 0xFFFFFF).toString(16);
}

export default class Chat extends Component {

    constructor(props) {
        super(props);
        this.state = {
            messages: []
        }
    }

    renderMessage = message => {
        const {member, text} = message;
        // const {currentMember} = this.props;
        // const messageFromMe = member.id === currentMember.id;
        const messageFromMe = member.id === 2;
        let msgContentDate = <span className={"msg-content-date"}> 11:01 AM    |    June 9</span>;
        return (
            <React.Fragment>
                {!messageFromMe ? (
                    <div className={"incoming-msg"}>
                        <div className={"incoming-msg-img"}>
                            <FontAwesomeIcon icon="user-circle"/>
                        </div>
                        <div className={"received-msg"}>
                            <div className={"msg-content"}>
                                <p>{text}</p>
                                {msgContentDate}
                            </div>
                        </div>
                    </div>) : (
                    <div className={"outgoing-msg"}>
                        <div className={"sent-msg"}>
                            <p>{text}</p>
                            {msgContentDate}
                        </div>
                    </div>)}
            </React.Fragment>
        )
            ;
    };

    render() {
        return (
            <React.Fragment>
                {/*<h2 className={"text-center"}>Chatting with {this.props.name}</h2>*/}
                <div className={"chat-messages"}>
                    <div className={"chat-history"}>
                            {this.state.messages.map(m => this.renderMessage(m))}
                            <div className={"msg-input"}>
                                <InputGroup>
                                    <Input/>
                                    <InputGroupAddon addonType="append">
                                        <Button color="secondary">To the Right!</Button>
                                    </InputGroupAddon>
                                </InputGroup>
                                <br/>
                            </div>
                        </div>
                    </div>

            </React.Fragment>
        )
    }
}