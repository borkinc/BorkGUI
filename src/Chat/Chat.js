import React, {Component} from 'react';
import './Chat.css';
import {Button, Input, InputGroup, InputGroupAddon} from "reactstrap";

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
            messages: [
                {
                    text: "This is a test message!",
                    member: {
                        id: 1,
                        username: randomName(),
                        color: randomColor()
                    }
                },
                {
                    text: "Hello test message, this is chat",
                    member: {
                        id: 2,
                        username: randomName(),
                        color: randomColor()
                    }
                },
                {
                    text: "Hello chat, this is person",
                    member: {
                        id: 3,
                        username: randomName(),
                        color: randomColor()
                    }
                },
                {
                    text: "Hello person, this is other person",
                    member: {
                        id: 4,
                        username: randomName(),
                        color: randomColor()
                    }
                },
                {
                    text: "Hello other person, this is patrick",
                    member: {
                        id: 5,
                        username: randomName(),
                        color: randomColor()
                    }
                },
                //    Delete these
                {
                    text: "Hello other person, this is patrick",
                    member: {
                        id: 5,
                        username: randomName(),
                        color: randomColor()
                    }
                },
                {
                    text: "Hello other person, this is patrick",
                    member: {
                        id: 5,
                        username: randomName(),
                        color: randomColor()
                    }
                },
                {
                    text: "Hello other person, this is patrick",
                    member: {
                        id: 5,
                        username: randomName(),
                        color: randomColor()
                    }
                },
                {
                    text: "Hello other person, this is patrick",
                    member: {
                        id: 5,
                        username: randomName(),
                        color: randomColor()
                    }
                },
                {
                    text: "Hello other person, this is patrick",
                    member: {
                        id: 5,
                        username: randomName(),
                        color: randomColor()
                    }
                },
                {
                    text: "Hello other person, this is patrick",
                    member: {
                        id: 5,
                        username: randomName(),
                        color: randomColor()
                    }
                },
                {
                    text: "Hello other person, this is patrick",
                    member: {
                        id: 5,
                        username: randomName(),
                        color: randomColor()
                    }
                },
                {
                    text: "Hello other person, this is patrick",
                    member: {
                        id: 5,
                        username: randomName(),
                        color: randomColor()
                    }
                },
                {
                    text: "Hello other person, this is patrick",
                    member: {
                        id: 5,
                        username: randomName(),
                        color: randomColor()
                    }
                },
                {
                    text: "Hello other person, this is patrick",
                    member: {
                        id: 5,
                        username: randomName(),
                        color: randomColor()
                    }
                }
            ],
        }
    }

    renderMessage = message => {
        const {member, text} = message;
        // const {currentMember} = this.props;
        // const messageFromMe = member.id === currentMember.id;
        const messageFromMe = member.id === 2;
        const className = messageFromMe ?
            "Messages-message currentMember" : "Messages-message";
        return (
            <li className={className}>
      <span
          className="avatar"
          style={{backgroundColor: member.color}}
      />
                <div className="Message-content">
                    <div className="username">
                        {member.username}
                    </div>
                    <div className="text">{text}</div>
                </div>
            </li>
        );
    };

    render() {
        return (
            <React.Fragment>
                <h2>Chatting with {this.props.name}</h2>
                <ul className="Messages-list">
                    {this.state.messages.map(m => this.renderMessage(m))}
                </ul>
                <InputGroup>
                    <Input/>
                    <InputGroupAddon addonType="append">
                        <Button color="secondary">To the Right!</Button>
                    </InputGroupAddon>
                </InputGroup>
                <br/>
            </React.Fragment>
        )
    }
}