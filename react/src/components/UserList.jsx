import React, { useEffect } from 'react'
import { Link ,useNavigate } from 'react-router-dom'
function UserList(props) {
    const navigate = useNavigate();
    useEffect(() => {
        console.log('id is now: ', props.Pid);
      }, [props.Pid]);
    const handleClick =  (i) => {
        props.getRequest(i);
        props.setId(i);
        //  navigate('/update')
      };
    const  handleDElClick =(i)=>{
        props.del(props.Pid);
        props.setId(i);
        props.setd(true)
    }
    return (
        <div className='container List-cont my-3'>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Handle</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {/* {props.Pid} */}
                    {props.user.map((users,i )=> (
                       
                        <tr key={users._id}>
                            {/* <button onClick={() => handleClick(users.id)}>{users.id}</button> */}
                            <th scope="row">{++i}</th>
                            <td>{users.firstName} {users.lastName}</td>
                            <td>{users.email}</td>
                            
                            <td>
                                    <button onClick={() => handleDElClick(users.id)}  className="btn btn-danger ">Delete</button>
                                
                                <Link  to={`/update/${users.id}`}>
                                    <button  className="btn btn-dark mx-2">Update</button>
                                </Link>
                            </td>
                        </tr>
                       
                    ))}

                </tbody>
            </table>
        </div>
    )
}

export default UserList