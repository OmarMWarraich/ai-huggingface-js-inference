import { HfInference } from '@huggingface/inference';
import './App.css';
import { useState, useEffect } from 'react';

function App() {
  const [result, setResult] = useState({ label: '', score: 0 });
  const hf = new HfInference(process.env.REACT_APP_HF_TOKEN);

  const textToClassify = "I have brought a new camera. I may or may not like this camera";

  const fetchData = async () => {
    try {
      const response = await hf.textClassification({
        inputs: textToClassify,
        model: "distilbert-base-uncased-finetuned-sst-2-english"
      });

      console.log(response);
      setResult(response[0] || { label: '', score: 0 });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // Call the asynchronous function
  useEffect(() => {
    fetchData();
  }, []); // Run once when the component mounts

  return (
    <div className="App">
      <p>
        Label: {result.label}<br />
        Score: {result.score}
      </p>
    </div>
  );
}

export default App;
