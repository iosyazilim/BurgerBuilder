import React from 'react';
import classes from './Toolbar.module.css';
import Logo from '../../Logo/Logo';
import NavigationsItems from '../NavigationItems/NavigationItems';

const toolbar = props => {
  return (
    <header className={classes.Toolbar}>
      <div className={classes.DrawerToggle} onClick={props.hideShowSideMenu}>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <div className={classes.Logo}>
        <Logo />
      </div>
      <nav className={classes.DesktopOnly}>
        <NavigationsItems />
      </nav>
    </header>
  );
};

export default toolbar;
