import React from 'react';
import classes from './Toolbar.module.css';
import Logo from '../../Logo/Logo';
import NavigationsItems from '../NavigationItems/NavigationItems';

const toolbar = props => {
  return (
    <header className={classes.Toolbar}>
      <div>Menu</div>
      <Logo />
      <NavigationsItems />
    </header>
  );
};

export default toolbar;
