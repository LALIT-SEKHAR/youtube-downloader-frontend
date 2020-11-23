import React, { useState } from 'react';
import './App.css';
import Loader from './Loader';
import MUTE from './images/mute.png';
import UNMUTE from './images/unmute.png';

const DownloadSection = ({datas, index, ytid}) => {

    const [value, setvalue] = useState({
        ytid: ytid,
        video: datas,
        isdownloading: false,
    })

    const download = async (e) =>{
        e.preventDefault()
        setvalue({...value, isdownloading: true})
        fetch(`http://localhost:7000/download/${ytid}/${e.target.value.split('-')[0]}/${e.target.value.split('-')[1]}`)
        // .then(res=> res.json())
        .then(data => {
          window.location = data.url
          setvalue({...value, isdownloading: false})
        })
        .catch(err => {
          console.log(err)
          setvalue({...value, isdownloading: false})
        })
      }

    return (
        <div className="DownloadSection">
            <span key={`${index}-${value.video.format_id}`} className="download-data" onClick={download}>
                <span>{value.video.audio === 'none' ? <img height="25px" src={MUTE} alt="MUTE"/> : <img height="25px" src={UNMUTE} alt="UNMUTE"/>}</span>
                <span>{value.video.resolution}</span>
                <span>{value.video.exten}</span>
                <span>{value.video.Size}</span>
            </span>
            <button value={`${value.video.format_id}-${value.video.exten}`} onClick={download} className="download-btn">
                {value.isdownloading ? 'Preparing..' : 'Download'}
                <span>{value.isdownloading && <Loader size="mini"/>}</span>
            </button>
        </div>
    );
};

export default DownloadSection;