import { HfInference } from '@huggingface/inference';
import './App.css';
import { useState, useEffect } from 'react';

function App() {
  const [translation, setTranslation] = useState('');
  const hf = new HfInference(process.env.REACT_APP_HF_TOKEN);

  const textToTranslate = "It's an exciting time to be an AI engineer"

  const fetchData = async () => {
    try {
      const response = await hf.translation({
        inputs: textToTranslate,
        model: "facebook/mbart-large-50-many-to-many-mmt",
        parameters: {
          src_lang: "en_XX",
          tgt_lang: "ur_PK"
        }
      });

      console.log(response.translation_text);
      setTranslation(response.translation_text)
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
        {translation}
      </p>
    </div>
  );
}

export default App;
