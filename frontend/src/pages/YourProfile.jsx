import React from 'react'
import { Link, useParams } from 'react-router-dom'
import ChatList from '../components/ChatList'
import { useState } from 'react';
import { viewaUserProfileAPI } from '../services/appServices';
import { useEffect } from 'react';


function YourProfile() {

    const { id } = useParams();
    const [userData, setUserData] = useState()


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


    return (
        <div className='d-flex' style={{ minHeight: '100vh', backgroundColor: 'white' }}>

            <div style={{ width: "25%" }}>

                <ChatList />

            </div>

            <div style={{ width: '75%' }} className='shadow-sm'>


                <div className="container" style={{ paddingTop: '50px' }}>

                    <div className="mx-auto shadow-sm p-4" style={{ maxWidth: '500px' }}>
                        <div className="text-center">

                            <img
                                src={userData?.profilePicture ||"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"}
                                alt={userData?.username}
                                className="rounded-circle mb-3"
                                style={{ width: '250px', height: '250px', objectFit: 'cover' }}
                            />

                            <h4 className="fw-bold mb-3">{userData?.username}</h4>

                            <div className="mb-3 text-start">
                                <label className="form-label fw-semibold">Bio</label>
                                <p className="form-control bg-light">{userData?.bio}</p>
                            </div>

                            <div className="mb-3 text-start">
                                <label className="form-label fw-semibold">Languages Spoken</label>
                                <p className="form-control bg-light mb-0">
                                    {userData?.languagesSpoken?.join(', ')}
                                </p>
                            </div>

                            <div className="mb-3 text-start">
                                <label className="form-label fw-semibold">Language to Learn</label>
                                <p className="form-control bg-light mb-0">
                                    {userData?.languagesToLearn?.join(', ') || "seeking to..." }
                                </p>
                            </div>

                        </div>

                    </div>


                </div>

            </div>


        </div>
    )
}

export default YourProfile