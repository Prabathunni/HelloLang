import React, { useState } from 'react';
import './FindFriends.css';
import { Link } from 'react-router-dom';

function FindFriends() {
  const [search, setSearch] = useState("");

  const friends = [
    { id: 1, name: 'Rishna', image: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png' },
    { id: 2, name: 'John Doe', image: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png' },
    { id: 3, name: 'Lena Max', image: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png' },
    { id: 4, name: 'Rahul', image: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png' },
  ];

  const filtered = friends.filter(friend =>
    friend.name.toLowerCase().includes(search.toLowerCase())
  );

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
          {filtered.map(friend => (
            <div  className="col-md-3 col-sm-6" key={friend.id}>
              <div className="friends-card">
                <Link to={'/viewuserprofile/users._id'} className='text-decoration-none text-dark'>
                  <img src={friend.image} alt={friend.name} />
                  <h5>{friend.name}</h5>
                </Link>
                <p>Language : <span className='fw-bolder text-danger'>English</span></p>
                <button className="btn btn-outline-primary btn-sm">Send Request</button>
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
