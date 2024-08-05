import React, { useState } from 'react';
import { updatedNewUrl } from '../../apiCalls';

function UrlForm({addUrl}) {
  const [title, setTitle] = useState('');
  const [urlToShorten, setUrlToShorten] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newURL = {
      id: Date.now(),
      long_url: urlToShorten,
      title,
    }
    try {
      const addedUrl = await updatedNewUrl(newURL)
      addUrl({addedUrl})
      clearInputs();
    }catch (error){
      throw new Error('Failed to add new Url. Try again.')
    }
  }

  const clearInputs = () => {
    setTitle('');
    setUrlToShorten('');
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type='text'
        placeholder='Title...'
        required
        name='title'
        value={title}
        onChange={e => setTitle(e.target.value)}
      />

      <input
        type='text'
        placeholder='URL to Shorten...'
        required
        name='url'
        value={urlToShorten}
        onChange={e => setUrlToShorten(e.target.value)}
      />

      <button>
        Shorten Please!
      </button>
    </form>
  )
}

export default UrlForm;
