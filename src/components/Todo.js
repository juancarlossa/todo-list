import React from 'react';
import axios from 'axios';
//import { useState } from 'react';
import { FaCheck } from 'react-icons/fa';
import { AiFillDelete } from 'react-icons/ai';

const Todo = ({text, id, todo, list, setList, input, setInput, handleSave, axiosEdit}) => {
  //const [_id, set_Id] = useState ('')

    const deleteHandler = () => {
      var id = todo._id
      axios.delete(`/api/tasks/${id}`)
        .then(res => console.log("Deleted task " + id))
        .catch(error => console.error(error));
      setList(list.filter((el) => el._id !== id));
      handleSave();
    }

    const completedHandler = () => {
      setList(list.map((el) => {
        if(el._id === todo._id) {
          return {
            ...el, completed: !el.completed
          }
        }
        return el;
      }))
    }

//    const putHandler = () => {
//      axiosEdit()
//    }
  
  return (
    <div className={`${todo.completed ? "py-5 px-2 bg-lime-400 my-2 rounded-lg" : "py-5 bg-stone-500 my-2 rounded-lg"}`}>
      <ul key={id} className={`${todo.completed ? "completed italic text-zinc-600" : "text-white font-medium"}`}>
      {text}
        <button className=" bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-3 ml-5 rounded transition ease-in-out delay-100" onClick={deleteHandler}><AiFillDelete /> </button>
        <button className=" bg-green-500 hover:bg-green-300 text-white font-bold py-2 px-3 mx-0 rounded transition ease-in-out delay-100" onClick={completedHandler}> <FaCheck /> </button>
      </ul>
    </div>
  )
}

export default Todo