import React from 'react';
import './App.css';

const InfoSection = ({title, thumbnail, Videolink}) => {
    return (
        <div className="InfoSection">
            <h1 className="title">{title}</h1>
            <video className="video-play" poster={thumbnail} width="320" height="240" autoPlay>
            <source src={Videolink} type="video/mp4"></source>
            </video> 
        </div>
    );
};

export default InfoSection;