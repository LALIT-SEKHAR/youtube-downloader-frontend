import React, { useState } from 'react';
import './App.css';
import InfoSection from './InfoSection';

function App() {

  const [value, setvalue] = useState({
    ytid: '',
    ytvideodata: '',
  });
  
  const inputchenge = (e) =>{
    setvalue({...value, [e.target.name]:e.target.value})
  }

  const getytvideo = async (e) =>{
    e.preventDefault()
    // setvalue({...value, ytid: ''})
    setvalue({...value, ytlink: ''})
    fetch(`https://dountubeapi.herokuapp.com/getytvideo/${(value.ytid).split('v=')[1]}`)
    .then(res=> res.json())
    .then(data => setvalue({...value, ytvideodata: data}))
    .catch(err => console.log(err))
  }

  const download = async (e) =>{
    e.preventDefault()
    // setvalue({...value, ytid: ''})
    fetch(`https://dountubeapi.herokuapp.com/download/${(value.ytid).split('v=')[1]}/${value.ytvideodata.formate}`)
    // .then(res=> res.json())
    .then(data => window.location = data.url)
    .catch(err => console.log(err))
  }

  return (
    <div className="ytdl">
      <form className="ytlinkinputwraper">
        <input className="ytlinkinput" onChange={inputchenge} value={value.ytid} type="text" name="ytid" placeholder="Enter Youtube Video Link"/>
        {console.log(value.ytvideodata.Videolink)}
        <button className="ytlinkinputbtn" onClick={getytvideo}>Search</button>
      </form>
      {
      value.ytvideodata 
      && 
      <>
        <InfoSection title={value.ytvideodata.title} thumbnail={value.ytvideodata.thumbnail} Videolink={value.ytvideodata.Videolink}/>
        <button className="download-btn" onClick={download}>Download</button>
      </>
      }
    </div>
  );
}

export default App;
