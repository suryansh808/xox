import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import API from '../API';


const CommunityDashboard = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({});
  const [friendRequests, setFriendRequests] = useState([]);
  const [friends, setFriends] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('com-user');
    
      const parsedUser = storedUser ? JSON.parse(storedUser) : {};
  
      setUserData(parsedUser);
      if (!parsedUser.userId || !parsedUser.name) {
        console.error('User not logged in: userId or name missing', parsedUser);
        navigate('/CommunityLogin');
      }
    } catch (error) {
      console.error('Error parsing user data from localStorage:', error);
      navigate('/CommunityLogin');
    }
  }, [navigate]);

  // Fetch friend requests and friends
  const fetchFriendData = async () => {
    if (!userData.userId) return;
    setIsLoading(true);
    try {
    
      const response = await axios.get(`${API}/checkfriend/${userData.userId}`);
      setFriendRequests(response.data.friendRequests || []);
      setFriends(response.data.friends || []);
    } catch (error) {
      console.error('Error fetching friend data:', error.response?.data || error.message);
      alert(error.response?.data?.message || 'Error fetching friend data');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (userData.userId) {
      fetchFriendData();
    }
  }, [userData.userId]);



  return (
    <div className="dashboard-container">
      {/* Main Content */}
      <div className="main-content">
        <div className="card-grid">
          {/* Profile Card */}
          <div className="card">
            <h2 className="card-title">Your Profile</h2>
            <div className="profile-info">
              <img
                src="https://via.placeholder.com/80"
                alt="Profile"
                className="profile-image"
              />
              <div>
                <p className="profile-name">{userData.name || 'N/A'}</p>
                <p className="profile-email">{userData.email || 'N/A'}</p>
              </div>
            </div>
            <div className="profile-actions">
              {/* <Link to="/Community" className="profile-edit-button">
                Edit Profile
              </Link> */}
              {/* <button className="logout-button" onClick={handleLogout}>
                Logout
              </button> */}
            </div>
          </div>
          <div className="card">
            <h2 className="card-title">Pending Friend Requests</h2>
            {isLoading ? (
              <p className="loading-text">Loading...</p>
            ) : friendRequests.length > 0 ? (
              <ul className="list">
                {friendRequests.map((request) => (
                  <li key={request.userId} className="list-item">
                    <span>{request.name} (Pending)</span>
                    <Link to="/CommunityPrivateChats" className="link">
                      View Request
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="no-data">No pending friend requests</p>
            )}
          </div>
          <div className="card">
            <h2 className="card-title">Your Friends</h2>
            {isLoading ? (
              <p className="loading-text">Loading...</p>
            ) : friends.length > 0 ? (
              <ul className="list">
                {friends.map((friend) => (
                  <li key={friend.userId} className="list-item">
                    <span>{friend.name}</span>
                    <Link to="/CommunityPrivateChats" className="link">
                      Message
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="no-data">No friends yet</p>
            )}
          </div>
        </div>
        <div className="cta-container">
          <Link to="/Community" className="cta-button">
            Find Friends & Share Thoughts
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CommunityDashboard;