import React, { useEffect, useState } from "react";
import axios from 'axios';
import API from '../API';

const Insight4 = () => {
  const [thought, setThought] = useState("");
  const [thoughts, setThoughts] = useState([]);
  const [replyText, setReplyText] = useState({});
  const [selectedThought, setSelectedThought] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${API}/thoughts`, {
        text: thought,
      });
      setThought("");
      fetchThoughts();
      alert("your thought has been share...");
    } catch (error) {
      console.error("Error saving thought:", error);
    }
  };

  const fetchThoughts = async () => {
    try {
      const response = await axios.get(`${API}/getthoughts`);
      setThoughts(response.data.filter((item) => item.visible === "show"));
    } catch (error) {
      console.error("Error fetching thoughts:", error);
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
    if (!replyText[thoughtId]) return;
    const newReply = { text: replyText[thoughtId], createdAt: new Date().toISOString(), visible: "show", };
    try {
      await axios.post(`${API}/thoughtsreplies/${thoughtId}`, newReply);
      alert("submited");
      if (selectedThought && selectedThought._id === thoughtId) {
        setSelectedThought((prev) => ({
          ...prev,
          replies: [...(prev.replies || []), newReply],
        }));
      }
  
      setReplyText((prev) => ({ ...prev, [thoughtId]: "" }));
    } catch (error) {
      console.error("Error adding reply:", error);
    }
  };
  
  useEffect(() => {
    if (!selectedThought && thoughts.length > 0) {
      setSelectedThought(thoughts[0]);
    }
  }, [thoughts, selectedThought]);

  const handleThoughtSelect = (thought) => {
    setSelectedThought(thought);
  };

  return (
    <div id="sharethoughts">
      <div className="share__container">

        <div className="form-group">
          <form onSubmit={handleSubmit}>
            <input
              placeholder="write your thoughts...."
              type="text"
              value={thought}
              required
              onChange={(e) => setThought(e.target.value)}
            />
            <button type="submit">Share</button>
          </form>
        </div>

        <div className="flex__container">
          {/* Left Side: Thoughts List */}
          <div className="left">
            <div className="left__inside">
              {thoughts.map((thought) => (
                <div
                  className="left__boxs"
                  key={thought._id}
                  onClick={() => handleThoughtSelect(thought)}
                >
                  <p>{thought.text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side: Selected Thought and Replies */}
          <div className="right">
            <div className="right__inside">
              {selectedThought && (
                <div className="right__sideBox">
                  <h2>{selectedThought.text}</h2>
                  <div className="reply__container">
                    <h2>replies:</h2>
                    <div className="replies">
                      {selectedThought?.replies?.filter(reply => reply.visible === "show").map((reply, index) => (
                          <div className="replyprofile" key={index}>
                                  <i class="fa fa-user" aria-hidden="true"></i>
                                <span>{new Date(reply.createdAt).toLocaleString("en-IN",{timeZone: "Asia/Kolkata",dateStyle: "medium",timeStyle: "short",})}   </span>                           
                                  <pre>{reply.text}</pre>
                          </div>
                      ))}
                    </div>
                  </div>
                  <div className="replytextbox">
                    <textarea
                      placeholder="reply..."
                      type="text"
                      value={replyText[selectedThought._id] || ""}
                      onChange={(e) =>
                        handleReplyChange(selectedThought._id, e.target.value)
                      }
                    />
                    <button
                      onClick={() => handleReplySubmit(selectedThought._id)}
                    >
                      Share
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default Insight4;
