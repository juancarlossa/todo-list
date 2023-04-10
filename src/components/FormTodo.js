import React from 'react'

const FormTodo = ({listHandler, handleSubmit, inputHandler, input, setInput, handleSave}) => {

  const restartInput = () => {
    
  }
  return (
    <form type="submit" onSubmit={[handleSubmit, restartInput]}>
      <div className= "">
        <h1>{input}</h1>
        <input 
        type="text" 
        placeholder= "Type item"
        onChange={inputHandler}
        value={input}
        className="text-stone-500 placeholder:italic placeholder:text-slate-400 bg-white border border-stone-400 rounded-md py-2 pl-3 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
        />

        <button
          className="bg-blue-500 hover:bg-blue-700 text-stone-50 font-semibold py-2 px-4 rounded transition ease-in-out delay-150"
          type="submit"
          onClick={listHandler}>
        add
        </button>
      </div>
    </form>
  )
}

export default FormTodo