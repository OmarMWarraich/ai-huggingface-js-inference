import { HfInference } from '@huggingface/inference';
import './App.css';
import { useState, useEffect } from 'react';

function App() {
  const hf = new HfInference(process.env.REACT_APP_HF_TOKEN);

  const text = "It's an exciting time to be an A I engineer"

  const fetchData = async () => {
    try {
      const response = await hf.textToSpeech({
        inputs: text,
        model: "facebook/mms-tts-eng",
      });
      console.log(response);
      const audioEl = document.getElementById('speech');
      const speechUrl = URL.createObjectURL(response)
      audioEl.src = speechUrl
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className="App">
      <audio id="speech" controls />
    </div>
  );
}

export default App;
