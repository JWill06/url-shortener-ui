import React, { useState, useEffect } from 'react';
import './App.css';
import { getUrls } from '../../apiCalls';
import UrlContainer from '../UrlContainer/UrlContainer';
import UrlForm from '../UrlForm/UrlForm';

function App () {
  const [urls, setUrls] = useState([]);


  const addUrl = async (newUrl) => {
    await loadUrls()
    // setUrls(prevUrls => [...prevUrls, newUrl])
  }

  const loadUrls = async () => {
    try {
      const shortUrls = await getUrls()
      setUrls(shortUrls)
    } catch(error){
      console.error('Sorry, failed to retrieve Urls. Try later.')
    }
  }

  useEffect(() => {
    loadUrls()
  }, [])

  return (
    <main className="App">
      <header>
        <h1>URL Shortener</h1>
        <UrlForm addUrl={addUrl}/>
      </header>
      <UrlContainer  urls={urls}/>
    </main>
  );
}


export default App;
