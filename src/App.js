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

      // Sort models by likes in descending order
      fetchedModels.sort((model1, model2) => model2.likes - model1.likes);

      setModels(fetchedModels);
    };

    fetchModels();
  }, [token]);

  // Log model details
  useEffect(() => {
    models.forEach((model) => {
      console.log(`${model.likes} Likes: https://huggingface.co/${model.name}`);
    });
  }, [models]);

  return (
    <div>
      <h1>Text to Image Models</h1>
      <ul>
        {models.map((model) => (
          <li key={model.name}>
            <p>
              <strong>Name:</strong> {model.name}
            </p>
            <p>
              <strong>Likes:</strong> {model.likes}
            </p>
            <p>
              <strong>Details:</strong> <a href={`https://huggingface.co/${model.name}`}>View Model</a>
            </p>
            {/* Add more details as needed */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
