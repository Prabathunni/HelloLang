import React from 'react';
import './FriendRequest.module.css';
import { Link } from 'react-router-dom';

function FriendRequests() {
  const requests = [
    {
      id: 1,
      name: 'Rishna',
      image: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
    },
    {
      id: 2,
      name: 'Lena Max',
      image: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
    },
    {
      id: 2,
      name: 'Lena Max',
      image: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
    },
    {
      id: 2,
      name: 'Lena Max',
      image: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
    },
    {
      id: 2,
      name: 'Lena Max',
      image: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
    },
  ];

  return (
    <div className="friend-requests-wrapper py-5">
      <div className="container">
        <h3 className="text-primary fw-bold text-center mb-4">Friend Requests</h3>

        {requests.length === 0 ? (
          <p className="text-center text-muted">No friend requests.</p>
        ) : (
          <div className="row justify-content-center g-4">
            {requests.map(user => (
              <div  key={user.id} className="col-md-4">
                <div className="request-card d-flex align-items-center justify-content-between p-3 shadow-sm rounded bg-white">
                  <Link to={'/viewuserprofile/userprofileid'} className="d-flex align-items-center text-decoration-none text-dark">
                    <img
                      src={user.image}
                      alt={user.name}
                      className="rounded-circle me-3"
                      style={{ width: '60px', height: '60px', objectFit: 'cover' }}
                    />
                    <h5 className="mb-0">{user.name}</h5>
                  </Link>
                  <div className="d-flex gap-2">
                    <button className="btn btn-sm btn-success">Accept</button>
                    <button className="btn btn-sm btn-outline-danger">Reject</button>
                  </div>
                </div>
              </div>
            ))}

            
          </div>
        )}
      </div>
    </div>
  );
}

export default FriendRequests;
