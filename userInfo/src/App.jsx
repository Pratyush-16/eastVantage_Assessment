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
    <div className="text-center my-8">
      <h1 className='text text-6xl  my-8'>User Info</h1>
      {userData ? (
        <div>
          <h1 className="text-4xl font-bold mb-2">
            {`${userData.name.title} ${userData.name.first} ${userData.name.last}`}
          </h1>
          <p className="text-gray-600">Email: {userData.email}</p>
        </div>
      ) : (
        <p className="text-gray-600">Loading...</p>
      )}
      <button
        onClick={handleRefresh}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
      >
        Refresh
      </button>
    </div>
  )
}

export default App
