import React, {Component} from 'react';
import axios from "axios";
import {Chart} from "react-google-charts";

class Stats extends Component {
    constructor(props){
        super(props);
        this.state = {
            trending_hashtags: [],
            num_daily_posts: [],
        }

    }
    componentDidMount() {
        this.getTrendingHashtags();
        this.getNumPosts();
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
                const data = [["Day", "Number of Posts"]];
                for (var i=0;i<response.data.length;i++){
                    data.push([response.data[i].day, parseInt(response.data[i].total)])
                }
                this.setState({num_daily_posts: data});
            })
    };

    render() {
        return (
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
            <Chart
                width={'500px'}
                height={'300px'}
                chartType="BarChart"
                data={this.state.num_daily_posts}
                options={{
                    title: 'Number of messages',
                        chartArea: { width: '50%' , height: '70%'},
                    hAxis: {
                        title: 'Number of messages',

                    },
                    vAxis: {
                        title: 'Day',
                    },
                }}
                bars="vertical"
                    // For tests
            />
            </div>
        )
    }
}

export default Stats;