import React from 'react';
import './FriendRequest.module.css';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { acceptReqAPI, getMyFriendReqAPI, rejectReqAPI } from '../services/appServices';
import { useEffect } from 'react';
import { toast } from 'react-toastify';

function FriendRequests() {

  const [requestData, setRequestData] = useState([]);

  const getMyRequests = async () => {
    try {
      const result = await getMyFriendReqAPI()
      // console.log(result);
      setRequestData(result?.data)
      
    } catch (error) {
      console.log(error);
      
    }
  }


  const acceptFriend = async (id) => {
    try {
        const result = await acceptReqAPI(id)
        toast.success(result?.data)
        getMyRequests()
        
    } catch (error) {
      console.log(error);
      toast.error
      
    }
  }

  const rejectFriend = async (id) => {
    try {
        const result = await rejectReqAPI(id)
        toast.success(result?.data)
        getMyRequests()
        
    } catch (error) {
      console.log(error);
      
    }
  }

  

  


  useEffect(() => {
    getMyRequests()
  }, [])

  

  return (
    <div className="friend-requests-wrapper py-5" style={{minHeight:'100vh'}}>
      <div className="container">
        <h3 className="text-primary fw-bold text-center mb-4">Friend Requests</h3>

        {requestData?.length === 0 ? (
          <p className="text-center text-muted">No friend requests.</p>
        ) : (
          <div className="row justify-content-center g-4">
            {requestData.map(user => (
              <div  key={user?._id} className="col-md-4">
                <div className="request-card d-flex align-items-center justify-content-between p-3 shadow-sm rounded bg-white">
                  <Link to={`/viewuserprofile/${user?._id}`} className="d-flex align-items-center text-decoration-none text-dark">
                    <img
                      src={user?.profilePicture || 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'}
                      alt={user?.username}
                      className="rounded-circle me-3"
                      style={{ width: '60px', height: '60px', objectFit: 'cover' }}
                    />
                    <h5 className="mb-0">{user?.username}</h5>
                  </Link>
                  <div className="d-flex gap-2">
                    <button onClick={()=>acceptFriend(user._id)} className="btn btn-sm btn-success">Accept</button>
                    <button onClick={()=>rejectFriend(user._id)} className="btn btn-sm btn-outline-danger">Reject</button>
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
