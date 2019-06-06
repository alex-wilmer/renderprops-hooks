import React, { useState, useEffect } from "react";
import "./App.css";

function useImageSearch () {  
  const [images, setImages] = useState([])
  const [loading, setLoading] = useState(false)
  const [query, setQuery] = useState("cats")
  
  useEffect(() => {
    setLoading(true);

    fetch(`https://www.reddit.com/r/aww/search.json?q=${query}`)
      .then(response => response.json())
      .then(json => {
        setLoading(false)
        setImages(json.data.children.map(child => 
          child.data.thumbnail)
        )
      });
  }, [query])
  
  return {
    images,
    loading,
    query,
    setQuery
  }
}

function App() {
  const values = useImageSearch()
  return (
    <div className="App">
      <h1>Cute Reddit Images - {values.loading && "loading"}</h1>
      <input value={values.query} onChange={event =>
        values.setQuery(event.target.value)
      } />
      <hr />
      {values.images.map(src => (
        <img src={src} />
      ))}
    </div>
  );
}

export default App;
