import React from 'react'
import './Register.css'
import { Link } from 'react-router-dom'
import ChatList from '../components/ChatList'


function MyProfile() {
  return (

    <div className="d-flex " style={{ height: '100vh' }}>
      {/* Left Sidebar - ChatList */}
      <div style={{ width: '25%', backgroundColor: '#f8f9fa' }}>
        <div className="h-100 overflow-auto">
          <ChatList />
        </div>
      </div>

      {/* Right Content - MyProfile */}
      <div style={{ width: '75%', backgroundColor: '#fff', overflowY: 'auto' }}>

        <div className="container py-4">
             <div className="mx-auto shadow-sm" style={{ maxWidth: '500px' }}>
               <div className="text-center p-4">
              {/* Profile Pic with Edit */}
               <div className="position-relative text-center">
                <img
                  src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                  alt="Profile"
                  className="rounded-circle mb-3 shadow"
                  style={{ width: '250px', height: '250px', objectFit: 'cover' }}
                />
                <label
                  htmlFor="profilePicInput"
                  className="position-absolute bg-warning px-2 rounded"
                  style={{
                    bottom: '19px',
                    left: '65%',
                    transform: 'translateX(-50%)',
                    cursor: 'pointer'
                  }}
                >
                  <i className="fa-solid fa-pen"></i>
                </label>
                <input
                  type="file"
                  id="profilePicInput"
                  accept="image/png"
                  style={{ display: 'none' }}
                />
              </div>

              <h4 className="fw-bold mb-3 mt-2">prabath_unni</h4>

              <div className="mb-3 text-start">
                <label className="form-label fw-semibold">Bio</label>
                <textarea
                  className="form-control"
                  rows="2"
                  placeholder="Say something about yourself..."
                ></textarea>
              </div>

              <div className="mb-3 text-start">
                <label className="form-label fw-semibold">Languages Spoken</label>
                <input type="text" className="form-control" placeholder="e.g., English, Malayalam" />
              </div>

              <div className="mb-4 text-start">
                <label className="form-label fw-semibold">Language to Learn</label>
                <input type="text" className="form-control" placeholder="e.g., Spanish" />
              </div>

              <button className="btn btn-primary w-100">Save Changes</button>
            </div>
          </div>
        </div>



      </div>
    </div>

  )
}

export default MyProfile