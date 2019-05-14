import React, {Component} from 'react';
import axios from "axios";
import {Chart} from "react-google-charts";
import {Card} from "reactstrap";
import CardBody from "reactstrap/es/CardBody";
import CardColumns from "reactstrap/es/CardColumns";
import '../../css/Stats.css';

class Stats extends Component {
    constructor(props) {
        super(props);
        this.state = {
            trending_hashtags: [],
            num_daily_posts: [],
            num_daily_likes: [],
            num_daily_replies: [],
            num_daily_dislikes: [],
            active_users: [],
            uid_messages: '',
            num_user_messages: [],
            username_messages: '',
            pid_replies: '',
            num_pid_replies: [],
            pid_likes: '',
            num_pid_likes: [],
            pid_dislikes: '',
            num_pid_dislikes: []
        }

    }

    componentDidMount() {
        this.getTrendingHashtags();
        this.getNumPosts();
        this.getNumLikes();
        this.getNumReplies();
        this.getNumDislikes();
        this.getActiveUsers();
    }

    getTrendingHashtags = () => {
        axios.get(`${process.env.REACT_APP_API_URL}stats/trending`).then(
            response => {
                const data = [["Hashtags", "Position"]];
                for (let i = 0; i < response.data.length; i++) {
                    data.push([response.data[i].hashtag, response.data[i].position])
                }
                this.setState({trending_hashtags: data});

            }
        )
    };

    getNumPosts = () => {
        axios.get(`${process.env.REACT_APP_API_URL}stats/messages`).then(
            response => {
                const data = [["Day", "Number of Messages"]];
                for (let i = 0; i < response.data.length; i++) {
                    data.push([new Date(response.data[i].day).toDateString(), parseInt(response.data[i].total)])
                }
                this.setState({num_daily_posts: data});
            })
    };
    getNumLikes = () => {
        axios.get(`${process.env.REACT_APP_API_URL}stats/likes`).then(
            response => {
                const data = [["Day", "Number of Likes"]];
                for (let i = 0; i < response.data.length; i++) {
                    data.push([new Date(response.data[i].day), parseInt(response.data[i].total)])
                }
                this.setState({num_daily_likes: data});
            })
    };

    getNumReplies = () => {
        axios.get(`${process.env.REACT_APP_API_URL}stats/replies`).then(
            response => {
                const data = [["Day", "Number of Replies"]];
                for (let i = 0; i < response.data.length; i++) {
                    data.push([new Date(response.data[i].day), parseInt(response.data[i].total)])
                }
                this.setState({num_daily_replies: data});
            })
    };

    getNumDislikes = () => {
        axios.get(`${process.env.REACT_APP_API_URL}stats/dislikes`).then(
            response => {
                const data = [["Day", "Number of Dislikes"]];
                for (let i = 0; i < response.data.length; i++) {
                    data.push([new Date(response.data[i].day), parseInt(response.data[i].total)])
                }
                this.setState({num_daily_dislikes: data});
            })
    };

    getActiveUsers = () => {
        //this is going to be interesting not actually working right now
        axios.get(`${process.env.REACT_APP_API_URL}stats/active`).then(
            response => {
                const active_users = [];
                for (let i = 0; i < response.data.length; i++) {
                    const data = [["Users", "Position"]];
                    for (let j = 0; j < response.data[i].users.length; j++) {
                        data.push([response.data[i].users[j].username, j + 1]);
                    }
                    active_users.push({data: data, day: new Date(response.data[i].day)});
                }
                this.setState({active_users: active_users});

            })
    };

    getUserNumMessages = () => {
        axios.get(`${process.env.REACT_APP_API_URL}stats/users/${this.state.uid_messages}/messages`).then(
            response => {
                const data = [["Day", "Number of Messages"]];
                for (let i = 0; i < response.data.length; i++) {
                    data.push([new Date(response.data[i].day), parseInt(response.data[i].total)])
                }
                this.setState({num_user_messages: data, username_messages: response.data[0].username});
            }
        )
    };

    getPhotoNumReplies = () => {
        axios.get(`${process.env.REACT_APP_API_URL}stats/photos/${this.state.pid_replies}/replies`).then(
            response => {
                const data = [["Day", "Number of replies"]];
                for (let i = 0; i < response.data.length; i++) {
                    data.push([new Date(response.data[i].day), parseInt(response.data[i].total)])
                }
                this.setState({num_pid_replies: data});
            }
        )
    };

    getPhotoNumLikes = () => {
        axios.get(`${process.env.REACT_APP_API_URL}stats/photos/${this.state.pid_likes}/likes`).then(
            response => {
                const data = [["Day", "Number of Likes"]];
                for (let i = 0; i < response.data.length; i++) {
                    data.push([new Date(response.data[i].day), parseInt(response.data[i].total)])
                }
                this.setState({num_pid_likes: data});
            }
        )
    };

    getPhotoNumDislikes = () => {
        axios.get(`${process.env.REACT_APP_API_URL}stats/photos/${this.state.pid_dislikes}/dislikes`).then(
            response => {
                const data = [["Day", "Number of Dislikes"]];
                for (let i = 0; i < response.data.length; i++) {
                    data.push([new Date(response.data[i].day), parseInt(response.data[i].total)])
                }
                this.setState({num_pid_dislikes: data});
            }
        )
    };

    handleUserMessageChange = event => {
        this.setState({uid_messages: event.target.value})
    };

    handlePhotoRepliesChange = event => {
        this.setState({pid_replies: event.target.value})
    };

    handlePhotoLikesChange = event => {
        this.setState({pid_likes: event.target.value})
    };

    handlePhotoDislikesChange = event => {
        this.setState({pid_dislikes: event.target.value})
    };

    render() {
        const {active_users} = this.state;
        return (
            <React.Fragment>
                <CardColumns>
                    <Card>
                        <CardBody>
                            <Chart
                                className={"bork-table"}
                                width={'100%'}
                                height={'100%'}
                                chartType="Table"
                                loader={<div>Loading Chart</div>}
                                data={this.state.trending_hashtags}
                                options={{
                                    width: '100%',
                                    maxHeight: 400
                                }}
                            />
                        </CardBody>
                    </Card>
                    <Card>
                        <CardBody>
                            <Chart
                                width={'100%'}
                                height={'100%'}
                                chartType="BarChart"
                                loader={<div>Loading Chart</div>}
                                data={this.state.num_daily_posts}
                                options={{
                                    title: 'Messages per day',
                                    bar: {groupWidth: '95%'},
                                    legend: {position: 'none'},
                                    chartArea: {width: '50%'},
                                }}
                            />
                        </CardBody>
                    </Card>
                    <Card>
                        <CardBody>
                            <Chart
                                width={'100%'}
                                height={'100%'}
                                chartType="BarChart"
                                data={this.state.num_daily_likes}
                                options={{
                                    title: 'Number of likes per day',
                                    chartArea: {width: '50%', height: '70%'},
                                    hAxis: {
                                        title: 'Number of likes',
                                        minValue: 0,
                                    },
                                    vAxis: {
                                        title: 'Day',
                                    },
                                }}
                                bars="vertical"
                            />
                        </CardBody>
                    </Card>
                    <Card>
                        <CardBody>
                            <Chart
                                width={'100%'}
                                height={'100%'}
                                chartType="BarChart"
                                data={this.state.num_daily_dislikes}
                                options={{
                                    title: 'Number of dislikes per day',
                                    chartArea: {width: '50%', height: '70%'},
                                    hAxis: {
                                        title: 'Number of dislikes',
                                    },
                                    vAxis: {
                                        title: 'Day',
                                    },
                                }}
                                bars="vertical"
                            />
                        </CardBody>
                    </Card>
                    <Card>
                        <CardBody>
                            <Chart
                                width={'100%'}
                                height={'100%'}
                                chartType="BarChart"
                                data={this.state.num_daily_replies}
                                options={{
                                    title: 'Number of replies per day',
                                    chartArea: {width: '50%', height: '70%'},
                                    hAxis: {
                                        title: 'Number of replies',
                                    },
                                    vAxis: {
                                        title: 'Day',
                                    },
                                    legend: 'none'
                                }}
                                bars="vertical"
                            />
                        </CardBody>
                    </Card>
                    {active_users.map((users_per_day) => {
                        return (
                            <React.Fragment>
                                {/*<h4>{users_per_day.day}</h4>*/}
                                <Card>
                                    <CardBody>
                                        <Chart
                                            width={'100%'}
                                            height={'100%'}
                                            chartType="Table"
                                            data={users_per_day.data}
                                            // style={'margin: 0 auto'}
                                            options={{
                                                title: 'Active Users',
                                                width: '100%',
                                            }}
                                        />
                                    </CardBody>
                                </Card>
                            </React.Fragment>)
                    })}
                </CardColumns>
                {/*<CardGroup>*/}
                {/*    */}
                {/*    */}
                {/*</CardGroup>*/}
                {/*<h1>Total messages per user</h1>*/}
                {/*<Input type="text" onChange={this.handleUserMessageChange}/>*/}
                {/*<Button onClick={this.getUserNumMessages}>Get data</Button>*/}
                {/*{username_messages !== '' ? (*/}
                {/*    <Chart chartType="Table" data={this.state.num_user_messages}/>*/}
                {/*) : (<p>Enter uid</p>)}*/}
                {/*<h1>Total replies per photo</h1>*/}
                {/*<Input type="text" onChange={this.handlePhotoRepliesChange}/>*/}
                {/*<Button onClick={this.getPhotoNumReplies}>Get data</Button>*/}
                {/*{num_pid_replies !== [] ? (*/}
                {/*    <Chart chartType="Table" data={this.state.num_pid_replies}/>*/}
                {/*) : (<p>Enter pid</p>)}*/}
                {/*<h1>Total likes per photo</h1>*/}
                {/*<Input type="text" onChange={this.handlePhotoLikesChange}/>*/}
                {/*<Button onClick={this.getPhotoNumLikes}>Get data</Button>*/}
                {/*{num_pid_likes !== [] ? (*/}
                {/*    <Chart chartType="Table" data={this.state.num_pid_likes}/>*/}
                {/*) : (<p>Enter pid</p>)}*/}
                {/*<h1>Total dislikes per photo</h1>*/}
                {/*<Input type="text" onChange={this.handlePhotoDislikesChange}/>*/}
                {/*<Button onClick={this.getPhotoNumDislikes}>Get data</Button>*/}
                {/*{num_pid_dislikes !== [] ? (*/}
                {/*    <Chart chartType="Table" data={this.state.num_pid_dislikes}/>*/}
                {/*) : (<p>Enter pid</p>)}*/}
            </React.Fragment>
        )
    }
}

export default Stats;