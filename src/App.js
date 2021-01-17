import React, { useState, useCallback, useEffect } from "react";
import logo from './logo.svg';
import MyUploader from "./MyUploader";
import MyGallery from "./MyGallery";
import './App.css';

function transformUploads(uploads) {
  return uploads.map((u) => ({
    original: u.imageUrl,
    thumbnail: u.thumbnailUrl,
  }));
}

function App() {
  const [images, setImages] = useState(null);

  const fetchUploads = useCallback(() => {
    fetch("http://localhost:8000/api/uploads")
      .then((response) =>
        response.json().then((data) => setImages(transformUploads(data)))
      )
      .catch(console.error);
  }, []);

  useEffect(() => {
    fetchUploads();
  }, [fetchUploads]);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        {/* <MyGallery />
        <MyUploader /> */}
        <div>
          <MyUploader fetchUploads={fetchUploads} />
        </div>
        <div className="gallery-container">
          {images && images.length ? <MyGallery images={images} /> : null}
        </div>
      </header>
    </div>
  );
}

export default App;
