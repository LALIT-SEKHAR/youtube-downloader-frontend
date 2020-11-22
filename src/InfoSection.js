import React from 'react';

const InfoSection = ({title, thumbnail, Videolink}) => {
    return (
        <div>
            <h1 className="title">{title}</h1>
            <video poster={thumbnail} width="320" height="240" autoPlay>
            <source src={Videolink} type="video/mp4"></source>
            </video> 
        </div>
    );
};

export default InfoSection;