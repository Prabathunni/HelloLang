import React from 'react'
import './Register.css'
import { Link, useParams } from 'react-router-dom'
import ChatList from '../components/ChatList'
import { updateProfileAPI, viewaUserProfileAPI } from '../services/appServices';
import { useEffect } from 'react';
import { useState } from 'react';


function MyProfile() {


  const { id } = useParams();
  const [userData, setUserData] = useState()

  const [bio, setBio] = useState('');
  const [languagesSpoken, setLanguagesSpoken] = useState([]);
  const [languagesToLearn, setLanguagesToLearn] = useState([]);
  const [profilePic, setProfilePic] = useState(null);


  const updateUser = async (e) => {
    e.preventDefault();


    const formData = new FormData();
    formData.append('bio', bio);
    formData.append('languagesSpoken', JSON.stringify(languagesSpoken));
    formData.append('languagesToLearn', JSON.stringify(languagesToLearn));

    if (profilePic) {
      formData.append('profilePicture', profilePic);
    }

    try {
      const result = await updateProfileAPI(id, formData)
      console.log(result);
      alert(result?.data.message)
      setBio('')
      setLanguagesSpoken([])
      setLanguagesToLearn([])
      setProfilePic(null)
      getUserProfile()
    } catch (error) {
      console.log(error);

    }

  }


  const getUserProfile = async () => {
    try {
      const result = await viewaUserProfileAPI(id);
      setUserData(result?.data)

    } catch (error) {
      console.log(error);

    }
  }

  useEffect(() => {
    getUserProfile()
  }, [])


  // MOdication Check

  const isBioChanged = bio && bio !== userData?.bio;
  const isSpokenChanged =
    languagesSpoken.length > 0 &&
    JSON.stringify(languagesSpoken) !== JSON.stringify(userData?.languagesSpoken);

  const isLearnChanged =
    languagesToLearn.length > 0 &&
    JSON.stringify(languagesToLearn) !== JSON.stringify(userData?.languagesToLearn);

  const isImageChanged = !!profilePic;

  const formChanged = isBioChanged || isSpokenChanged || isLearnChanged || isImageChanged;



  return (

    <div className="d-flex " style={{ height: '100vh' }}>
      {/* Left Sidebar - ChatList */}
      <div style={{ width: '25%', backgroundColor: '#f8f9fa' }}>
        <div className="h-100 overflow-auto">
          <ChatList />
        </div>
      </div>

      {/* Right Content - MyProfile */}
      <div style={{ width: '75%', backgroundColor: '#fff', overflowY: 'auto' }} className='shadow-sm'>

        <div className="container py-4">
          <div className="mx-auto shadow-sm" style={{ maxWidth: '500px' }}>
            <div className="text-center p-4">

              <div className="position-relative text-center">
                <img
                  src={userData?.profilePicture || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"}
                  alt={userData?.username}
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
                  <i className="fa-solid fa-pen me-2"></i>{isImageChanged && <span className="text-success ms-2">✓ selected</span>}
                </label>
                <input
                  type="file"
                  id="profilePicInput"
                  accept="image/*"
                  style={{ display: 'none' }}
                  onChange={(e) => setProfilePic(e.target.files[0])}

                />
              </div>

              <h4 className="fw-bold mb-3 mt-2">{userData?.username}</h4>

              <div className="mb-3 text-start">
                <label className="form-label fw-semibold">
                  Bio {isBioChanged && <span className="text-success ms-2">✓ selected</span>}
                </label>
                <textarea
                  className="form-control"
                  rows="2"
                  placeholder={userData?.bio}
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                ></textarea>
              </div>

              <div className="mb-3 text-start">
                <label className="form-label fw-semibold">
                   Languages Spoken {isSpokenChanged && <span className="text-success ms-2">✓ selected</span>}
                </label>
                <input type="text" onChange={(e) => setLanguagesSpoken(e.target.value.split(',').map((lang) => lang.trim()))} className="form-control" placeholder={userData?.languagesSpoken?.join(', ')} />
              </div>

              <div className="mb-4 text-start">
                <label className="form-label fw-semibold">
                  Languages To Learn {isLearnChanged && <span className="text-success ms-2">✓ selected</span>}
                </label>
                <input type="text" onChange={(e) => setLanguagesToLearn(e.target.value.split(',').map((lang) => lang.trim()))} className="form-control" placeholder={userData?.languagesToLearn?.join(', ') || "give a lang buddy!"} />
              </div>

              {
                formChanged && 
              <button onClick={updateUser}  className="btn btn-primary w-100">
                Save Changes
               </button>

              }
            </div>
          </div>
        </div>



      </div>
    </div>

  )
}

export default MyProfile