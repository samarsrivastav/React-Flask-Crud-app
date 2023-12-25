import { useState, useEffect } from 'react'
import { Route, Routes, BrowserRouter as Router ,useNavigate   } from 'react-router-dom'
import './App.css'
import Header from './components/header'
import 'bootstrap/dist/css/bootstrap.min.css';
import AddUser from './components/AddUser'
import UserList from './components/UserList';
import Update from './components/Update';
function App() {
  const [user, setUser] = useState([])
  const [firstName, setfirstName] = useState("")
  const [email, setEmail] = useState("")
  const [lastName, setLastName] = useState("")
  const [pUser, setPuser] = useState([])
  const [Pid, setId] = useState()
  const [d, setd] = useState(false)
  
  // const navigate = useNavigate();
  useEffect(() => {
    fetch("http://localhost:5000/users")
      .then(response => response.json())
      .then(json => setUser(json))
  }, [])
  const adduser = async (e) => {
    e.preventDefault();

    if (firstName != "" && lastName != "" && email != "") {
      fetch("http://localhost:5000/users", {
        method: 'POST',
        body: JSON.stringify({
          firstName,
          lastName,
          email
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(response => response.json())
        .then(data => {
          setUser([...user, data])
          setfirstName("")
          setEmail("")
          setLastName("")
          console.log("success")
          // window.location.href = '/users'
                    
        })
    }
  }
 
  const getRequest = async (i) => {
    const url = `http://localhost:5000/users/${i}`;
    const response = await fetch(url);
    const responseJson = await response.json();
    if (responseJson) {
      setPuser(responseJson);
      console.log(pUser)
    }
  } 
  const del = async (i) => {
    fetch(`http://localhost:5000/users/${i}`, {
      method: "DELETE",
    })
      .then(()=>{
        response => response.json()
      })
      .then(() => {
        setUser(values => {
          return values.filter(item => item.id !== i)
        })
        console.log('deleted')
        setd(false)
      })
  } 
  useEffect(() => {
    if(Pid){
      del(Pid);
    }
}, [d])
  const Updateuser = async (i) => {
    if (firstName != "" && lastName != "" && email != "") {
      fetch(`http://localhost:5000/users/${i}`, {
        method: 'PUT',
        body: JSON.stringify({
          firstName,
          lastName,
          email
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(response => response.json())
        .then(() => {
          console.log("success Updated")
          window.location.href = '/'
          // navigate('/')
        })

    }
  }
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path='/' element={<UserList d={d} setd={setd} user={user} Pid={Pid} setId={setId} getRequest={getRequest} del={del}/>}></Route>
          <Route path='/addUser' element={<AddUser user={user} adduser={adduser} firstName={firstName}
            lastName={lastName} email={email} setfirstName={setfirstName} setEmail={setEmail} setLastName={setLastName}
          />}></Route>
          <Route path="/update/:userId" element={<Update pUser={pUser} setPuser={setPuser} Pid={Pid} firstName={firstName} Updateuser={Updateuser} getRequest={getRequest}
            lastName={lastName} email={email} setfirstName={setfirstName} setEmail={setEmail} setLastName={setLastName}/>}> </Route>
        </Routes>
      </Router>
    </>
  )
}

export default App
