import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
function AddUser(props) {
    // const navigate = useNavigate();
    return (
        <div className='container'>
            <form onSubmit={props.adduser}>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name='email' value={props.email} onChange={
                        e=>props.setEmail(e.target.value)
                    }/>
                  </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">First Name</label>
                    <input type="text" className="form-control" id="firstName" name='firstName' value={props.firstName} onChange={
                        e=>props.setfirstName(e.target.value)
                    }/>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Last Name</label>
                    <input type="text" className="form-control" id="lastName" name='lastName' value={props.lastName} onChange={
                        e=>props.setLastName(e.target.value)
                    }/>
                </div>
                <button type='submit' className="btn btn-dark mx-2">ADD USER</button>
                <button type='button' onClick={() => window.location.href = '/'} className="btn btn-danger">Go HOME</button>
            </form>
        </div>
    )
}

export default AddUser