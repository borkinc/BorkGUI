import React, {Component} from 'react';
import axios from "axios";
import {Chart} from "react-google-charts";

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
        }

    }
    componentDidMount() {
        this.getTrendingHashtags();
        this.getNumPosts();
        this.getNumLikes();
        this.getNumReplies();
        this.getNumDislikes();
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
                const data = [["Users", "Position"]];
                for (var i=0;i<response.data.length;i++){
                    data.push([response.data[i].day, parseInt(response.data[i].total)])
                }
                console.log(data);
                this.setState({num_daily_likes: data});
            })
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
                    {this.state.active_users.map(users_per_day =>
                        <h2>users_per_day.day</h2>
                        <Chart
                            width={'500px'}
                            height={'300px'}
                            chartType="Table"
                            data={users_per_day.users}
                        />
                    )}
                </div>
            </React.Fragment>
        )
    }
}

export default Stats;