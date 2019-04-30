import React, {Component} from 'react';
import axios from "axios";
import {Chart} from "react-google-charts";
import Input from "reactstrap/es/Input";
import Button from "reactstrap/es/Button";

class Stats extends Component {
    constructor(props){
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
        axios.get(`${process.env.REACT_APP_API_URL}` + 'stats/trending').then(
            response => {
                const data = [["Hashtags", "Position"]];
                for (var i=0;i<response.data.length;i++){
                    data.push([response.data[i].hashtag, response.data[i].position])
                }
                this.setState({trending_hashtags: data});

            }
        )
    };

    getNumPosts = () => {
        axios.get(`${process.env.REACT_APP_API_URL}` + 'stats/messages').then(
            response => {
                const data = [["Day", "Number of Messages"]];
                for (var i=0;i<response.data.length;i++){
                    data.push([response.data[i].day, parseInt(response.data[i].total)])
                }
                this.setState({num_daily_posts: data});
            })
    };
    getNumLikes = () => {
        axios.get(`${process.env.REACT_APP_API_URL}` + 'stats/likes').then(
            response => {
                const data = [["Day", "Number of Likes"]];
                for (var i=0;i<response.data.length;i++){
                    data.push([response.data[i].day, parseInt(response.data[i].total)])
                }
                console.log(data);
                this.setState({num_daily_likes: data});
            })
    };

    getNumReplies = () => {
        axios.get(`${process.env.REACT_APP_API_URL}` + 'stats/replies').then(
            response => {
                const data = [["Day", "Number of Replies"]];
                for (var i=0;i<response.data.length;i++){
                    data.push([response.data[i].day, parseInt(response.data[i].total)])
                }
                console.log(data);
                this.setState({num_daily_replies: data});
            })
    };

    getNumDislikes = () => {
        axios.get(`${process.env.REACT_APP_API_URL}` + 'stats/dislikes').then(
            response => {
                const data = [["Day", "Number of Dislikes"]];
                for (var i=0;i<response.data.length;i++){
                    data.push([response.data[i].day, parseInt(response.data[i].total)])
                }
                console.log(data);
                this.setState({num_daily_dislikes: data});
            })
    };

    getActiveUsers = () => {
        //this is going to be interesting not actually working right now
        axios.get(`${process.env.REACT_APP_API_URL}` + 'stats/active').then(
            response => {
                const active_users = [];
                for (var i=0;i<response.data.length;i++){
                    const data = [["Users", "Position"]];
                    for (var j=0;j<response.data[i].users.length;j++){
                        data.push([j+1, response.data[i].users[j].username]);
                    }
                    active_users.push({data: data, day: response.data[i].day});
                }
                this.setState({active_users: active_users});
                console.log(active_users);

            })
    };

    getUserNumMessages = () => {
      axios.get(`${process.env.REACT_APP_API_URL}` + 'stats/users/' + `${this.state.uid_messages}` + '/messages').then(
          response => {
              const data = [["Day", "Number of Messages"]];
              for (var i=0;i<response.data.length;i++){
                  data.push([response.data[i].day, parseInt(response.data[i].total)])
              }
              this.setState({num_user_messages: data, username_messages: response.data[0].username});
          }
      )
    };

    getPhotoNumReplies = () => {
        axios.get(`${process.env.REACT_APP_API_URL}` + 'stats/photos/' + `${this.state.pid_replies}` + '/replies').then(
            response => {
                const data = [["Day", "Number of replies"]];
                for (var i=0;i<response.data.length;i++){
                    data.push([response.data[i].day, parseInt(response.data[i].total)])
                }
                this.setState({num_pid_replies: data});
            }
        )
    };

    getPhotoNumLikes = () => {
        axios.get(`${process.env.REACT_APP_API_URL}` + 'stats/photos/' + `${this.state.pid_likes}` + '/likes').then(
            response => {
                const data = [["Day", "Number of Likes"]];
                for (var i=0;i<response.data.length;i++){
                    data.push([response.data[i].day, parseInt(response.data[i].total)])
                }
                this.setState({num_pid_likes: data});
            }
        )
    };

    getPhotoNumDislikes = () => {
        axios.get(`${process.env.REACT_APP_API_URL}` + 'stats/photos/' + `${this.state.pid_dislikes}` + '/dislikes').then(
            response => {
                const data = [["Day", "Number of Dislikes"]];
                for (var i=0;i<response.data.length;i++){
                    data.push([response.data[i].day, parseInt(response.data[i].total)])
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

    handlePhotoLikesChange = event =>{
        this.setState({pid_likes: event.target.value})
    };

    handlePhotoDislikesChange = event =>{
        this.setState({pid_dislikes: event.target.value})
    };

    render() {
        return (
            <React.Fragment>
                <h1>Trending hashtags</h1>
                <div>
                    <Chart
                        width={'500px'}
                        height={'300px'}
                        chartType="Table"
                        data={this.state.trending_hashtags}
                        options={{
                            title: 'Trending hashtags',
                            chartArea: { width: '50%' },
                            hAxis: {
                                title: 'Hashtags',

                            },
                            vAxis: {
                                title: 'Position',
                                minValue: 0,
                            },
                        }}
                        // For tests
                    />
                    <h1>Number of messages per day</h1>
                    <Chart
                    width={'500px'}
                    height={'300px'}
                    chartType="BarChart"
                    data={this.state.num_daily_posts}
                    options={{

                        chart: {
                            title: 'Number of daily messages',
                        },
                            chartArea: { width: '50%' , height: '70%'},
                        hAxis: {
                            title: 'Number of messages',

                        },
                        vAxis: {
                            title: 'Day',
                        },
                    }}
                    bars="vertical"
                />
                    <h1>Number of likes per day</h1>
                    <Chart
                        width={'500px'}
                        height={'300px'}
                        chartType="BarChart"
                        data={this.state.num_daily_likes}
                        options={{

                            chart: {
                                title: 'Number of daily likes',
                            },
                            chartArea: { width: '50%' , height: '70%'},
                            hAxis: {
                                title: 'Number of likes',

                            },
                            vAxis: {
                                title: 'Day',
                            },
                        }}
                        bars="vertical"
                    />
                    <h1>Number of dislikes per day</h1>
                    <Chart
                        width={'500px'}
                        height={'300px'}
                        chartType="BarChart"
                        data={this.state.num_daily_dislikes}
                        options={{

                            chart: {
                                title: 'Number of daily dislikes',
                            },
                            chartArea: { width: '50%' , height: '70%'},
                            hAxis: {
                                title: 'Number of dislikes',

                            },
                            vAxis: {
                                title: 'Day',
                            },
                        }}
                        bars="vertical"
                    />
                    <h1>Number of replies per day</h1>
                    <Chart
                        width={'500px'}
                        height={'300px'}
                        chartType="BarChart"
                        data={this.state.num_daily_replies}
                        options={{

                            chart: {
                                title: 'Number of daily replies',
                            },
                            chartArea: { width: '50%' , height: '70%'},
                            hAxis: {
                                title: 'Number of replies',

                            },
                            vAxis: {
                                title: 'Day',
                            },
                        }}
                        bars="vertical"
                    />
                    <h1>Active users per day</h1>
                    {this.state.active_users.map((users_per_day) => {
                        return (
                            <React.Fragment>
                            <h4>{users_per_day.day}</h4>
                            <Chart
                            width={'500px'}
                            height={'300px'}
                            chartType="Table"
                            data={users_per_day.data}
                            options={{
                                title: 'Active Users',
                                chartArea: { width: '50%' },
                                hAxis: {
                                    title: 'Username',

                                },
                                vAxis: {
                                    title: 'Position',
                                    minValue: 0,
                                },
                            }}
                            // For tests
                            /> </React.Fragment>)
                    })}
                </div>
                <h1>Total messages per user</h1>
                <Input type="text" onChange={this.handleUserMessageChange}/>
                <Button onClick={this.getUserNumMessages}>Get data</Button>
                {this.state.username_messages !== '' ? (
                    <Chart chartType="Table" data={this.state.num_user_messages}/>
                ) : (<p>Enter uid</p>)}
                <h1>Total replies per photo</h1>
                <Input type="text" onChange={this.handlePhotoRepliesChange}/>
                <Button onClick={this.getPhotoNumReplies}>Get data</Button>
                {this.state.num_pid_replies !== [] ? (
                    <Chart chartType="Table" data={this.state.num_pid_replies}/>
                ) : (<p>Enter pid</p>)}
                <h1>Total likes per photo</h1>
                <Input type="text" onChange={this.handlePhotoLikesChange}/>
                <Button onClick={this.getPhotoNumLikes}>Get data</Button>
                {this.state.num_pid_likes !== [] ? (
                    <Chart chartType="Table" data={this.state.num_pid_likes}/>
                ) : (<p>Enter pid</p>)}
                <h1>Total dislikes per photo</h1>
                <Input type="text" onChange={this.handlePhotoDislikesChange}/>
                <Button onClick={this.getPhotoNumDislikes}>Get data</Button>
                {this.state.num_pid_dislikes !== [] ? (
                    <Chart chartType="Table" data={this.state.num_pid_dislikes}/>
                ) : (<p>Enter pid</p>)}
            </React.Fragment>
        )
    }
}

export default Stats;