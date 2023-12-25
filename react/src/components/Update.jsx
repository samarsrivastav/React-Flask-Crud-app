import React, { useEffect } from 'react'
import { useParams,useNavigate } from 'react-router-dom';
function Update(props) {
    const { userId } = useParams();
    const navigate = useNavigate();
    useEffect(() => {
        props.getRequest(userId)
      }, [userId]);
    console.log(props.pUser)
    console.log(userId)
    function callUpdate(i){
        props.Updateuser(i)
        // console.log(i)
        // navigate('/')  it needs to be reloaded so can't do this
    }
    return (  
        <div className="container my-3">
            <h2>Update Items</h2>
            <form >
                <div className="mb-3">
                    <label htmlFor="Title" className="form-label">First Name</label>
                    <input type="text" className="form-control" name="FirstName"  onChange={e=>props.setfirstName(e.target.value)} id="title" aria-describedby="title"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="Title" className="form-label">Last Name</label>
                    <input type="text" className="form-control" name="FirstName"  onChange={
                        e=>props.setLastName(e.target.value)
                    } id="title" aria-describedby="title"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="desc" className="form-label">Email</label>
                    <input type="email" className="form-control" name="desc" id="desc" onChange={
                        e=>props.setEmail(e.target.value)
                    }/>
                </div>
                <button type="button" onClick={()=>callUpdate(userId)} className="btn btn-dark">Update</button>
            </form>
        </div>
    )
}

export default Update