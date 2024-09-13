import React, { useState } from 'react';
import axios from '../axios';
import { toast } from 'react-toastify';

function AIChat() {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post('/users/generate-response', { prompt });
      setResponse(result.data.message);
    }catch (error) {
    
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        
        toast.error("An unexpected error occurred. Please try again later.");
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-semibold text-gray-800 mb-4">Guruji AI</h1>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Ask something..."
            className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="p-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
          >
            Generate
          </button>
        </form>
        {response && (
          <p className="mt-6 text-gray-700 p-4 bg-gray-100 rounded-md shadow-inner">
            Response: {response}
          </p>
        )}
      </div>
    </div>
  );
}

export default AIChat;
