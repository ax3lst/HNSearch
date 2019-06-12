import React, { Component } from 'react'
import Moment from 'react-moment';

import styles from './HNContent.module.css';

const API = 'http://hn.algolia.com/api/v1/search?query=';

export default class HNContent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            query: 'redux',
            hits: [],
            fetchInProgress: true,
            typing: false,
            typingTimeout: 0,
        }

        this.changeQuery = this.changeQuery.bind(this);
    }

    componentDidMount() {
        this.getHNContent();
    }

    changeQuery = (event) => {
        const self = this;
    
        if (self.state.typingTimeout) {
           clearTimeout(self.state.typingTimeout);
        }
    
        self.setState({
           query: event.target.value,
           typing: false,
           typingTimeout: setTimeout(function () {
               self.getHNContent();
             }, 100)
        });
    }

    getHNContent() {
        this.setState({ fetchInProgress: true });
        const that = this;
        fetch(API + this.state.query)
            .then(response => response.json())
            .then(function(data) {
                that.setState({ hits: data.hits });
                that.setState({ fetchInProgress: false })
            });
    }


    render() {
        let loader = <div className={styles.loader}></div>;
        let entries = null;

        if (!this.state.fetchInProgress) {
            // Its done loading
            loader = <div></div>;

            console.log(this.state.hits)

            entries = this.state.hits.map((hit) => 
                <div key={hit.objectID} className={styles.entry}>
                    <div>{hit.points}</div>
                    <div><a target="_blank" rel="noreferrer noopener" href={hit.url}>{hit.title}</a></div>
                    <div><Moment fromNow>{hit.created_at}</Moment></div>
                </div>
            );
        }

        return (
            <div className={styles.content}>
                <input type="text" value={this.state.query} onChange={this.changeQuery}/>
                {loader}
                {entries}
            </div>
        )
    }
}
