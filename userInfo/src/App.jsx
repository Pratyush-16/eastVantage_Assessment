import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css'

function App() {
  
  const [userData, setUserData] = useState(0)

  const fetchdata = async() => {
    try{
      const response = await axios.get('https://randomuser.me/api');
      const { name, email } = response.data.results[0];

      localStorage.setItem('user', JSON.stringify({ name, email }));

      setUserData({ name, email });

    }
    catch(err){
      console.log(err)
    }
  }

  useEffect(()=> {
    fetchdata()
  },[])

  const handleRefresh = () => {
    // Refresh the component by fetching new user data
    fetchdata();
  };

  

  return (
    <>
     <h1>User Info</h1>

     {userData ? (
        <div>
          <h1>{`${userData.name.title} ${userData.name.first} ${userData.name.last}`}</h1>
          <p>Email: {userData.email}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
      <button onClick={handleRefresh}>Refresh</button>
    
    </>
  )
}

export default App
