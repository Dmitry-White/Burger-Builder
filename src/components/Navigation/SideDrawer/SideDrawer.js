import React from 'react';
import classes from "./SideDrawer.module.css";

import Logo from '../../Logo/Logo';
import Backdrop from '../../UI/Backdrop/Backdrop';
import NavigationItems from '../NavigationItems/NavigationItems';

const sideDrawer = props => {
    let attachedClasses = [classes.SideDrawer, classes.Close].join(" ");
    if (props.open) {
        attachedClasses = [classes.SideDrawer, classes.Open].join(" ");
    }
    return (
        <>
            <Backdrop 
                show={props.open}
                hide={props.closed}
            />
            <div className={attachedClasses}>
                <div className={classes.Logo}>
                    <Logo/>
                </div>
                <nav>
                    <NavigationItems isAuth={props.isAuth}/>
                </nav>
            </div>
        </>
    );
}

export default sideDrawer;