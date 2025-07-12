import React from 'react'
import './Register.css'
import { Link } from 'react-router-dom'
import ChatList from '../components/ChatList'


function MyProfile() {
    return (

        <div className='form-wrapper d-flex' style={{ minHeight: '100vh' }}>

            <div style={{ width: "25%" }}>
                <ChatList />
            </div>

            <div style={{ width: '75%' }}>
                <div className="container" style={{ paddingTop: '50px' }}>
                    <Link to={'/dashboard'} className='text-decoration-none text-light'><i class="fa-solid fa-arrow-left"></i></Link>

                    <div className="mx-auto shadow-sm p-4" style={{ maxWidth: '500px' }}>

                        <div className="text-center">

                            {/* Profile Pic */}
                            <div className="position-relative text-center">
                                {/* Profile Image */}
                                <img
                                    src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                                    alt="Profile"
                                    className="rounded-circle mb-3 shadow"
                                    style={{ width: '250px', height: '250px', objectFit: 'cover' }}
                                />

                                {/* Edit Label as Button */}
                                <label
                                    htmlFor="profilePicInput"
                                    className="position-absolute bg-warning px-2  rounded"
                                    style={{ bottom: '19px', left: '65%', transform: 'translateX(-50%)', cursor: 'pointer' }}
                                >
                                    <i class="fa-sharp-duotone fa-solid fa-pen"></i>
                                </label>

                                {/* Hidden File Input */}
                                <input
                                    type="file"
                                    id="profilePicInput"
                                    accept="image/png"
                                    style={{ display: 'none' }}
                                />
                            </div>


                            {/* Username (not editable) */}
                            <h4 className="fw-bold mb-3 mt-2">prabath_unni</h4>

                            {/* Bio */}
                            <div className="mb-3 text-start">
                                <label className="form-label fw-semibold">Bio</label>
                                <textarea className="form-control" rows="2" placeholder="Say something about yourself..."></textarea>
                            </div>

                            {/* Languages Spoken */}
                            <div className="mb-3 text-start">
                                <label className="form-label fw-semibold">Languages Spoken</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="e.g., English, Malayalam"
                                />
                            </div>

                            {/* Language to Learn */}
                            <div className="mb-4 text-start">
                                <label className="form-label fw-semibold">Language to Learn</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="e.g., Spanish"
                                />
                            </div>

                            {/* Save Button */}
                            <button className="btn btn-primary w-100">Save Changes</button>
                        </div>

                    </div>
                </div>

            </div>



        </div>

    )
}

export default MyProfile