//import React, {useState} from 'react';
import Table from './Table';
import Form from './Form';
import axios from 'axios';
import React, {useState, useEffect} from 'react';

function MyApp() {
  useEffect(() => {
    fetchAll().then( result => {
       if (result)
          setCharacters(result);
     });
  }, [] );

  const [characters, setCharacters] = useState([]);
  return (
    <div className="container">
      <Table characterData={characters} removeCharacter={removeOneCharacter} />
      <Form handleSubmit={updateList} />
    </div>
  )

function removeOneCharacter (index) {
   //axios.delete('http://localhost:5000/users/:id');         // added for backend delete
  const updated = characters.filter((character, i) => {
      return i !== index
    });
    setCharacters(updated);
  }

  function updateList(person) { 
    makePostCall(person).then( result => {
    if (result && result.status === 201)
       setCharacters([...characters, person] );
    });
 }

  async function makePostCall(person){
    try {
       const response = await axios.post('http://localhost:5000/users', person);
       //response.id = response.data;
       return response;
    }
    catch (error) {
       console.log(error);
       return false;
    }
 }
}

async function fetchAll(){
  try {
     const response = await axios.get('http://localhost:5000/users');
     return response.data.users_list;     
  }
  catch (error){
     //We're not handling errors. Just logging into the console.
     console.log(error); 
     return false;         
  }
}

export default MyApp;
