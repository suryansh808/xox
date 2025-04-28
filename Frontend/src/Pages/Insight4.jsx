import React, { useEffect, useState } from 'react';
// import axios from 'axios';

const Insight4 = () => {
  const [thought, setThought] = useState('');
  const [thoughts, setThoughts] = useState([]);
  const [replyText, setReplyText] = useState({}); 
  const [selectedThought, setSelectedThought] = useState(null); 

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/thoughts', { text: thought });
      console.log('Thought saved:', response.data);
      setThought('');
      alert("your thought has been share...")
    } catch (error) {
      console.error('Error saving thought:', error);
    }
  };

 
  const fetchThoughts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/thoughts');
      setThoughts(response.data);
    } catch (error) {
      console.error('Error fetching thoughts:', error);
    }
  };
  useEffect(() => {
    fetchThoughts();
  }, []);



  const handleReplyChange = (thoughtId, text) => {
    setReplyText((prev) => ({
      ...prev,
      [thoughtId]: text,
    }));
  };

  const handleReplySubmit = async (thoughtId) => {
    if (!replyText[thoughtId]) return; // Prevent empty replies

    try {
      const response = await axios.post(`http://localhost:5000/api/thoughts/${thoughtId}/replies`, {
        text: replyText[thoughtId],
      });
      fetchThoughts();
      setReplyText((prev) => ({ ...prev, [thoughtId]: '' }));
    } catch (error) {
      console.error('Error adding reply:', error);
    }
  };

  const handleThoughtSelect = (thought) => {
    setSelectedThought(thought); // Update selected thought
  };

  return (
   <div id="mainpage" className="flex flex-col items-center">
  <div className="form-group mb-4">
    <input
      className="text-black rounded-xl px-2 py-2 mr-2"
      placeholder='write your thoughts....'
      type="text"
      value={thought}
      onChange={(e) => setThought(e.target.value)}
    />
    <button onClick={handleSubmit} className="px-3 py-2 bg-white text-black rounded-xl" type="submit">Share</button>
  </div>

  <div className="flex w-full">
    {/* Left Side: Thoughts List */}
    <div className="w-1/4 px-2 py-2 border-r">
      <div className='w-full h-[80vh]'>
        {thoughts.map((thought) => (
          <div className='border rounded-md shadow-md px-2 mb-2 py-2 cursor-pointer' key={thought._id} onClick={() => handleThoughtSelect(thought)}>
            <p>{thought.text}</p>
          </div>
        ))}
      </div>
    </div>

    {/* Right Side: Selected Thought and Replies */}
    <div className="w-2/3 px-2 py-2">
     <div className='w-full h-[80vh] relative'>
     {selectedThought && (
        <>
         <div className='mb-1'>
          <h2>{selectedThought.text}</h2>
         </div>
          <div className='border-t'>
            <p>replies:</p>
          <div className='px-2'>
          {selectedThought.replies.map((reply, index) => (
              <p className='' key={index}>{reply.text}</p>
            ))}
          </div>
          </div>
         <div className=' absolute bottom-0 w-full flex items-center'>
         <textarea
            placeholder='reply...'
            className='text-black w-full resize-none rounded-md px-2'
            type="text"
            value={replyText[selectedThought._id] || ''}
            onChange={(e) => handleReplyChange(selectedThought._id, e.target.value)}
          />
          <button className='px-3 py-3 rounded-md bg-blue-500 text-black' onClick={() => handleReplySubmit(selectedThought._id)}>Share</button>
         </div>
         
        </>
      )}
     </div>
    </div>
  </div>
</div>
  );
};

export default Insight4;
