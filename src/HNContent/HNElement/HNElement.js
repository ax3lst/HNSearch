import React from 'react'
import Moment from 'react-moment';

import styles from './HNElement.module.css';

export default function HNElement(props) {
    return (
        <div key={props.id} className={styles.entry}>
            <div>{props.points}</div>
            <div><a target="_blank" rel="noreferrer noopener" href={props.url}>{props.title}</a></div>
            <div><Moment fromNow>{props.created_at}</Moment></div>
        </div>
    )
}
