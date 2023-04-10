import './App.css';
import React, { useState, useEffect } from 'react';
import FormTodo from './components/FormTodo';
import ListTodo from './components/ListTodo';
import axios from 'axios';

function App(props, todo, _id) {
  const [input, setInput] = useState("");   //string para imput
  const [list, setList] = useState([]);     //array para to do's
  const [id, setId] = useState(0);

//AXIOS + SERVER
  //Post
  const axiosPost = (e) => {
    if (_id) {
      setInput(_id)
      console.log("PUT mode")
      axios.put(`/api/tasks/${_id}`, { text: input })
      setInput('')
    } else {
    console.log("POSTING data...")
    axios.post('/api/tasks', {
      text: input,
      _id: setId(id+1)
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
      //.then(res => res.json())
      .then(res => console.log(res.data))
      .catch(err => console.log(err));
    }
  }
  //DeleteAll
  const axiosDeleteAll = (e) => {
    axios.delete('/api/tasks')
      .then(res => console.log(res.data))
      .catch(error => console.error(error));
    setList([])
    handleSave()
  }
  //Delete

  //Fetch
  const axiosFetch = (e) => {
      axios.get('/api/tasks')
      .then(res => {
        const data = res.data;
        //console.log(data);
        if (data) {
          setList(data);
        } else {
          console.log("No data to FETCH")
        }
      })
      .catch(error => console.error(error));
    }
  
  //PUT
//  const axiosEdit = (e) => {
//      var id = todo._id
//      var text = todo.text
////      axios.put(`api/tasks/${id}`, {text: input})
//        .then(data => {
//         console.log(input)
//        })
//      console.log(_id)
      //handleSave();
//    }

  useEffect(() => {
    axiosFetch()
    //console.log("FETCHING data...")
  }, [])

  //FETCH LOCAL STORAGE
  useEffect(() => {
    const data = localStorage.getItem('list');
    if (data) {
      const retrievedArray = JSON.parse(data);
      setList(retrievedArray);
    }
  }, []);

  useEffect(() => {
    const idNumber = localStorage.getItem('id');
    if (idNumber) {
      const retIdNumber = parseInt(idNumber, 10);
      setId(retIdNumber);
   }
  }, [])

  const handleSave = (e) => {
    const data = JSON.stringify(list);
    localStorage.setItem('list', data);

    const idNumber = String(id);
    localStorage.setItem('id', idNumber);
    //console.log("handleSave")

  }

  const inputHandler = (e) => {
    setInput(e.target.value)
  }
  const idHandler = () => {
    setId(id+1)
  }

  const listHandler = (e) => {
    if(input !== "") {
      e.preventDefault();
      idHandler();
      setList([...list, {
        _id: id, 
        completed: false,
        text: input
      }])
      //Se realiza el post y automaticamente el Fetch para asignarle un _id de mongo
      axiosPost()
      axiosFetch()
      handleSave();
      setInput("");
      console.log({text: input})
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(input);
    setInput("");
  };

  return (
    <div className="App ">
    <h1 className="py-10 text-zinc-600 text-4xl font-bold">Type your task</h1>
      <button className="bg-red-700 hover:bg-red-900 text-stone-50 font-semibold py-2 px-3 ml-5 rounded transition ease-in-out delay-100" onClick={axiosDeleteAll}>Delete All</button>
      <button className="bg-green-600 hover:bg-green-800 text-stone-50 font-semibold py-2 px-3 ml-5 rounded transition ease-in-out delay-100" onClick={handleSave}>Save</button>
      
      <FormTodo inputHandler={inputHandler} listHandler={listHandler} handleSubmit={handleSubmit} handleSave={handleSave}/>
      <ListTodo list={list} setList={setList} handleSave={handleSave}/>
    </div>
  );
}

export default App;
