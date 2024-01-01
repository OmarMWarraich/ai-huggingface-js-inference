import { HfInference } from '@huggingface/inference';
import './App.css';
import { useState } from 'react';

function App() {
  const [text, setText] = useState('')
  const hf = new HfInference(process.env.REACT_APP_HF_TOKEN);

  const textToGenerate = "The definition of machine learning inference is ";

  const fetchData = async () => {
    try {
      const response = await hf.textGeneration({
        inputs: textToGenerate,
        model: "mistralai/Mixtral-8x7B-Instruct-v0.1"
      });
      setText(response.generated_text)
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // Call the asynchronous function
  fetchData();

  return (
    <div className="App">
      {text}
    </div>
  );
}

export default App;
