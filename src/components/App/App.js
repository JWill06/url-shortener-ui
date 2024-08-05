import React, { useState, useEffect } from 'react';
import './App.css';
import { getUrls, updatedNewUrl } from '../../apiCalls';
import UrlContainer from '../UrlContainer/UrlContainer';
import UrlForm from '../UrlForm/UrlForm';

function App () {
  const [urls, setUrls] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const addUrl = async (newUrl) => {
    setIsLoading(true); 
    try {
      const addedUrl = await updatedNewUrl(newUrl);
      setUrls(prevUrls => [...prevUrls, addedUrl]);
    } catch (error) {
      console.error('Failed to add new Url:', error);
      setIsLoading(false); 
    }
  };

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
