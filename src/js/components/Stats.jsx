import React, {Component} from 'react';
import {AxiosInstance as axios} from "axios";

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
    }

    getTrendingHashtags = () => {
        axios.get(`${process.env.REACT_APP_API_URL}` + 'stats/trending').then(
            response => {
                this.setState({trending_hashtags: response.data})
            }
        )
    };

    render() {
        return (
            <h1>Stats</h1>

        )
    }
}