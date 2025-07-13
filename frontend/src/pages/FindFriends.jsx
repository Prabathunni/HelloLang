import React, { useState } from 'react';
import './FindFriends.css';
import { Link } from 'react-router-dom';
import { getAllUsersAPI } from '../services/appServices';
import { useEffect } from 'react';

function FindFriends() {
  const [search, setSearch] = useState("");

  const [usersData, setUsersData] = useState([])


  const getAllUsers = async () => {
    try {
      const result = await getAllUsersAPI()
      setUsersData(result?.data)

    } catch (error) {
      console.log(error);

    }
  }


  const filtered = usersData.filter(friend =>
    friend.username.toLowerCase().includes(search.toLowerCase())
  );



  useEffect(() => {
    getAllUsers()
  }, [])

  return (
    <div className="find-friends-wrapper">
      <div className="container">
        <h2 className="friends-title text-center">Find New Friends</h2>

        <div className="d-flex justify-content-center mb-4 search-bar">
          <input
            type="text"
            placeholder="Search users..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>

        <div className="row g-4 justify-content-center">
          {filtered?.map(friend => (
            <div className="col-md-3 col-sm-6 mb-4" key={friend?._id}>

              <div className="friend-card-colored">
                <Link
                  to={`/viewuserprofile/${friend?._id}`}
                  className="text-decoration-none text-dark"
                >
                  <img
                    src={
                      friend?.profilePicture ||
                      'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
                    }
                    alt={friend?.username}
                    className="profile-img"
                  />
                  <div className="card-details">
                    <h5 className="username">{friend?.username}</h5>

                    <div className="language-section">
                      {/* <p className="mb-2 text-muted">Languages :</p> */}
                      <div className="languages">
                        {friend?.languagesSpoken?.map((language, index) => (
                          <span key={index} className="language-pill">
                            {language}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </Link>
                <div className="text-center mt-3 mb-3">
                  <button className="btn btn-request">Send Request</button>
                </div>

              </div>

            </div>
          ))}

          {filtered.length === 0 && (
            <p className="text-center text-muted">No users found.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default FindFriends;
