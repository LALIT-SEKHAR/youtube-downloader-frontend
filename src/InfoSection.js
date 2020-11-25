import React, { useState } from 'react';
import './App.css';

const InfoSection = ({title, thumbnail, Videolink}) => {

    const [ytvideo, setytvideo] = useState('pause')
    
    const play = () => {
       const video = document.querySelector('.video-play');
       video.play();
       setytvideo('play')
    }
    const pause = () => {
       const video = document.querySelector('.video-play');
       video.pause();
       setytvideo('pause')
    }

    return (
        <div className="InfoSection">
            <h1 className="title">{title}</h1>
            <video className="video-play" poster={thumbnail} width="320" height="240">
                <source src={Videolink} type="video/mp4"></source>
            </video> 
            {
                ytvideo === 'pause' 
                ? 
                <span onClick={play} className="video-play-btn"></span>
                : 
                <span onClick={pause} className="video-pause-btn"></span>
            }
        </div>
    );
};

export default InfoSection;