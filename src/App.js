import { HfInference } from '@huggingface/inference';
import './App.css';
import { useState, useEffect } from 'react';

function App() {
  const [results, setResults] = useState([{ label: '', score: 0 }]);
  const hf = new HfInference(process.env.REACT_APP_HF_TOKEN);

  const textsToClassify = [
    "I have brought a new camera. I may or may not like this camera",
    "I love Hugging Face",
    "I do not like Binance"
  ];

  const fetchData = async () => {
    try {
      const responses = await Promise.all(textsToClassify.map(async (text) => {
        return await hf.textClassification({
          inputs: text,
          model: "distilbert-base-uncased-finetuned-sst-2-english"
        });
      }));

      console.log(responses);
      setResults(responses.map(response => response[0] || { label: '', score: 0 }));
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
      {results.map((result, index) => (
        <div key={index}>
          <p>
            Label: {result.label}<br />
            Score: {result.score}
          </p>
          <hr />
        </div>
      ))}
    </div>
  );
}

export default App;
