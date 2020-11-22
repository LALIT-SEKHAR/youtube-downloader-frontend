import React from 'react';
import './App.css';

const Loader = ({size}) => {
    return (
        size === 'mini' 
        ? 
        <div className="circle-loader-mini"></div>
        :
        <div className="circle-loader-mega"></div>
    );
};

export default Loader;