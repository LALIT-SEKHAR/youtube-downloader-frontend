import React, { useState } from 'react';
import './App.css';
import { API, Prepairtitle } from './backend';
import DownloadSection from './DownloadSection';
import InfoSection from './InfoSection';
import Loader from './Loader';

function App() {

  const [value, setvalue] = useState({
    ytid: '',
    ytvideodata: '',
    issearching: false,
    isdownloading: false,
  });
  
  const inputchenge = (e) =>{
    setvalue({...value, [e.target.name]:e.target.value})
  }

  const ExtractYTID = (link) => {
    if (link.search("v=") !== -1) {
      return link.split('v=')[1];
    } else if (link.search("youtu.be" !== -1)) {
      return link.split('/')[link.split('/').length - 1]
    }
  }

  const getytvideo = async (e) =>{
    e.preventDefault();
    setvalue({...value, ytlink: '', issearching: true, ytvideodata: ''})
    fetch(`${API}/getytvideo/${ExtractYTID(value.ytid)}`)
    .then(res=> res.json())
    .then(data => {
      setvalue({...value, ytvideodata: data, issearching: false})
      // console.log(data.AllFormates);
    })
    .catch(err => {
      console.log(err);
      setvalue({...value, issearching: false})
    })
  }

  const download = async (e) =>{
    e.preventDefault()
    setvalue({...value, isdownloading: true})
    // fetch(`${API}/download/${Prepairtitle(value.ytvideodata.title)}/${ExtractYTID(value.ytid)}/highestaudio/mp3`)
    fetch(`${API}/download?name=${Prepairtitle(value.ytvideodata.title)}&id=${ExtractYTID(value.ytid)}&quality=highestaudio&formate=mp3`)
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

  const ReadClipBordData = (e) => {
    if (navigator.clipboard.readText) { 
      navigator.clipboard.readText()
      .then((text)=>{
          setvalue({...value, ytid: text})
          document.querySelector('.ytlinkinputbtn').click();
      });
    }
  }

  return (
    <>
      <header>
        <h1>DownTube</h1>
      </header>
      <div className="ytdl">
        <form className="ytlinkinputwraper">
          <input onClick={ReadClipBordData} className="ytlinkinput" onChange={inputchenge} value={value.ytid} type="text" name="ytid" placeholder="Enter Youtube Video Link"/>
          <button className="ytlinkinputbtn" onClick={getytvideo}>{value.issearching ? 'Searching..' : 'Search'}</button>
        </form>
        {
        value.ytvideodata 
        &&
        <>
          {
          value.ytvideodata.error 
          ? 
          <p style={{color: 'red'}}>{value.ytvideodata.error}</p>
          : 
          <>
          <InfoSection title={value.ytvideodata.title} thumbnail={value.ytvideodata.thumbnail} Videolink={value.ytvideodata.Videolink}/>
          <div className="video-audio-wraper">
            <span className="video-section">VIDEO</span>
            <span onClick={download} className="audio-section">{value.isdownloading ? 'Finding..' : 'AUDIO'}{value.isdownloading && <Loader size="mini"/>}</span>
          </div>
          <div className="download-btn-wraper">
            {
              value.ytvideodata.AllFormates.map((datas, index)=>{
                return <DownloadSection key={index} datas={datas}  index={index} ytid={ExtractYTID(value.ytid)} title={value.ytvideodata.title}/>
              })
            }
          </div>
          </>
          }
        </> 
        }
        {
        value.issearching 
        && 
        <Loader size="mega"/>
        }
      </div>
    </>
  );
}

export default App;
