import React, { useState, useEffect } from 'react';
import { listModels } from "@huggingface/hub";

const App = () => {
  const [models, setModels] = useState([]);
  const token = process.env.REACT_APP_HF_TOKEN;

  useEffect(() => {
    const isModelInferenceEnabled = async (modelName) => {
      const response = await fetch(`https://api-inference.huggingface.co/status/${modelName}`);
      const data = await response.json();
      return data.state === "Loadable";
    };

    const fetchModels = async () => {
      const fetchedModels = [];

      for await (const model of listModels({
        credentials: {
          accessToken: token
        },
        search: {
          task: "text-to-image"
        }
      })) {
        if (model.likes < 2000) {
          continue;
        }

        if (await isModelInferenceEnabled(model.name)) {
          fetchedModels.push(model);
        }
      }

      setModels(fetchedModels);
    };

    fetchModels();
  }, [token]);

  return (
    <div>
      <h1>Text to Image Models</h1>
      <ul>
        {models.map((model) => (
          <li key={model.name}>
            <p>Name: {model.name}</p>
            <p>Likes: {model.likes}</p>
            {/* Add more details as needed */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
