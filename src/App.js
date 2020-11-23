import React, { useState } from 'react';
import './App.css';
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
    fetch(`https://dountubeapi.herokuapp.com/getytvideo/${ExtractYTID(value.ytid)}`)
    .then(res=> res.json())
    .then(data => setvalue({...value, ytvideodata: data, issearching: false}))
    .catch(err => {
      console.log(err);
      setvalue({...value, issearching: false})
    })
  }

  const download = async (e) =>{
    e.preventDefault()
    setvalue({...value, isdownloading: true})
    fetch(`https://dountubeapi.herokuapp.com/download/${ExtractYTID(value.ytid)}/${value.ytvideodata.formate}`)
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
    <>
      <header>
        <h1>DownTube</h1>
      </header>
      <div className="ytdl">
        <form className="ytlinkinputwraper">
          <input className="ytlinkinput" onChange={inputchenge} value={value.ytid} type="text" name="ytid" placeholder="Enter Youtube Video Link"/>
          <button className="ytlinkinputbtn" onClick={getytvideo}>{value.issearching ? 'Searching..' : 'Search'}</button>
        </form>
        {
        value.ytvideodata 
        && 
        <>
          <InfoSection title={value.ytvideodata.title} thumbnail={value.ytvideodata.thumbnail} Videolink={value.ytvideodata.Videolink}/>
          <button className="download-btn" onClick={download}>{value.isdownloading ? 'Preparing..' : 'Download'}{value.isdownloading&&<Loader size="mini"/>}</button>
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
