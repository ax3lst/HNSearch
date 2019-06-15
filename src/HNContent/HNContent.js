import React, { Component } from 'react'
import HNElement from './HNElement/HNElement';
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

            entries = this.state.hits.map((hit) =>
                <HNElement 
                    id={hit.objectID} 
                    points={hit.points} 
                    url={hit.url}
                    title={hit.title}
                    created_at={hit} 
                />
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
