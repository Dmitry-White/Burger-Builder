import React from 'react';
import classes from './BuildControl.module.css'

const buildControl = props => <div className={classes.BuildControl}>
    <div className={classes.Label}>{props.label}</div>
    <button 
        disabled={props.disabled}
        className={classes.Less}
        onClick={props.less}>Less</button>
    <button 
        className={classes.More}
        onClick={props.more}>More</button>
</div>;

export default buildControl;