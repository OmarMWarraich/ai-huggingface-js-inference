// App.js
import React, { useEffect, useState } from 'react';
import { HfInference } from '@huggingface/inference';
import './App.css';

const App = () => {
  const [newImageSrc, setNewImageSrc] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      
      const hf = new HfInference(process.env.REACT_APP_HF_TOKEN);

      const model = "stabilityai/stable-diffusion-xl-refiner-1.0";
      const oldImageUrl = "/old-photo.jpg";

      try {
        const oldImageResponse = await fetch(oldImageUrl);
        const oldImageBlob = await oldImageResponse.blob();

        const newImageBlob = await hf.imageToImage({
          model: model,
          inputs: oldImageBlob,
          parameters: {
            prompt: "Imagine a cartoon character with an elongated face and a humorously large forehead, embodying the distinctive features of a South Asian middle aged individual. The playful exaggeration adds a whimsical touch, celebrating the unique cultural characteristics with charm and lightheartedness. This animated depiction infuses a South Asian flair into the character, turning ordinary features into a delightful and culturally inspired cartoon persona.",
            negative_prompt: "text, bad anatomy, blurry, low quality",
            strength: 0.9
          }
        });

        const newImageBase64 = await blobToBase64(newImageBlob);
        setNewImageSrc(newImageBase64);
      } catch (error) {
        console.error('Error fetching or processing images:', error);
      }
    };

    fetchData();
  }, []);

  const blobToBase64 = async (blob) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  };

  return (
    <div className="app">
      <img src="hf-logo.svg" alt="Hugging Face Logo" />
      <img id="old-image" src="old-photo.jpg" alt="Old Age Pensioners Elderly Life by Pavlofox on Pixabay" />
      <img id="new-image" src={newImageSrc} alt="New Image" />
    </div>
  );
};

export default App;
