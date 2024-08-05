export const getUrls = async () => {
 try {
  const res = await fetch('http://localhost:3001/api/v1/urls');
      if(!res.ok){
        throw new Error(`Failed to retrieve shortened Urls. Status: ${res.status}`)
      }
      const data = await res.json();
      return data.urls;
    } catch (error){
      console.error('Failed to fetch urls', error);
      throw error;
    }
}

export const updatedNewUrl = async (url) => {
  try {
    const res = await fetch('http://localhost:3001/api/v1/urls', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(url)
    });
    if(!res.ok){
      throw new Error(`Failed to add new Url. Status: ${res.status}`)
    } 
    const data = await res.json();
    return data
    }catch (error){
      console.error('Error trying to add url', error)
    }
}

