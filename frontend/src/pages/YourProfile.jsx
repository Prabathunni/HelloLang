import React from 'react'
import './Register.css'
import { Link } from 'react-router-dom'
import ChatList from '../components/ChatList'


function YourProfile() {
    return (
        <div className='form-wrapper d-flex' style={{ minHeight: '100vh' }}>
            <div style={{width:"25%"}}>
                <ChatList />
            </div>

            <div style={{width:'75%'}}>
                <div className="container" style={{ paddingTop: '50px' }}>
                    <Link to={'/dashboard'} className='text-decoration-none text-light'>
                        <i className="fa-solid fa-arrow-left"></i>
                    </Link>

                    <div className="mx-auto shadow-sm p-4" style={{ maxWidth: '500px' }}>
                        <div className="text-center">

                            {/* Profile Pic */}
                            <img
                                src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                                alt="User Profile"
                                className="rounded-circle mb-3"
                                style={{ width: '250px', height: '250px', objectFit: 'cover' }}
                            />

                            {/* Username (non-editable) */}
                            <h4 className="fw-bold mb-3">risna_user</h4>

                            {/* Bio (read-only) */}
                            <div className="mb-3 text-start">
                                <label className="form-label fw-semibold">Bio</label>
                                <p className="form-control bg-light">{`Loves learning new languages and meeting people.`}</p>
                            </div>

                            {/* Languages Spoken */}
                            <div className="mb-3 text-start">
                                <label className="form-label fw-semibold">Languages Spoken</label>
                                <p className="form-control bg-light mb-0">{`English, Hindi`}</p>
                            </div>

                            {/* Language to Learn */}
                            <div className="mb-3 text-start">
                                <label className="form-label fw-semibold">Language to Learn</label>
                                <p className="form-control bg-light mb-0">{`German`}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </div>
    )
}

export default YourProfile