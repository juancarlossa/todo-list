import React from 'react'
import Todo from './Todo'

const ListTodo = ({list, setList, handleSave}) => {
  return (
        <section className=' py-4 grid grid-cols-4 gap-5 mx-60'>
          {list.map((todo) => 
              <Todo 
                handleSave={handleSave}
                setList={setList}
                list={list}
                key={todo._id}
                text={todo.text}
                todo={todo}
              />
            
          )}
        </section>
  )
}

export default ListTodo