import React, { useState } from 'react';
import { createVideoPost } from '../services/VideoPostService';
import { toast } from 'react-toastify';

const CreateVideoPost = () => {
  const [postName, setPostName] = useState('');
  const [video, setVideo] = useState(null);
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false); // Loading state

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true

    const formData = new FormData();
    formData.append('postName', postName);
    formData.append('video', video);
    formData.append('description', description);

    try {
      await createVideoPost(formData);
      toast.success('Video posted successfully');
      
      setPostName('');
      setVideo(null);
      setDescription('');
    } catch (error) {
      toast.error(error.message);
      console.error(error);
    } finally {
      setLoading(false); // Set loading to false when done
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto mt-8 shadow-md p-6 bg-white rounded-lg">
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Heading:</label>
        <input
          type="text"
          value={postName}
          onChange={(e) => setPostName(e.target.value)}
          required
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Video:</label>
        <input
          type="file"
          accept="video/*"
          onChange={(e) => setVideo(e.target.files[0])}
          required
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Description:</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          rows="5"
        />
      </div>
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        disabled={loading} // Disable button when loading
      >
        {loading ? 'Uploading...' : 'Create Video Post'}
      </button>
      {loading && <p className="text-blue-500 mt-2">Uploading video, please wait...</p>} {/* Loading message */}
    </form>
  );
};

export default CreateVideoPost;
