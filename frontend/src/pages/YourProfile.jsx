import React from 'react'
import { Link } from 'react-router-dom'
import ChatList from '../components/ChatList'


function YourProfile() {
    return (
        <div className='d-flex' style={{ minHeight: '100vh',backgroundColor:'white' }}>

            <div style={{width:"25%"}}>

                <ChatList />

            </div>

            <div style={{width:'75%'}} className='shadow-sm'>


            <div className="container" style={{ paddingTop: '50px' }}>

                <div className="mx-auto shadow-sm p-4" style={{ maxWidth: '500px' }}>
                    <div className="text-center">

                        <img
                            src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                            alt="User Profile"
                            className="rounded-circle mb-3"
                            style={{ width: '250px', height: '250px', objectFit: 'cover' }}
                        />

                        <h4 className="fw-bold mb-3">risna_user</h4>

                        <div className="mb-3 text-start">
                            <label className="form-label fw-semibold">Bio</label>
                            <p className="form-control bg-light">{`Loves learning new languages and meeting people.`}</p>
                        </div>

                        <div className="mb-3 text-start">
                            <label className="form-label fw-semibold">Languages Spoken</label>
                            <p className="form-control bg-light mb-0">{`English, Hindi`}</p>
                        </div>

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