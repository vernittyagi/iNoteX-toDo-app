import { useState, useEffect } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import { v4 as uuidv4 } from 'uuid';
import { FaFilter } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import {
  loadTodos,
  addTodo,
  updateTodo,
  toggleTodo,
  deleteTodo,
  setEditId,
  toggleShowFinished
} from './redux/todos/todoSlice'

function App() {
  const dispatch = useDispatch();
  const [input, setinput] = useState("")
  const {toDos, showFinishedTodos, editId, isLoaded} = useSelector(state => state.todos)

  //load from local storage
  useEffect(() => {
    const savedToDos = localStorage.getItem("todos");
    if (savedToDos) {
      console.log("loading todos from local storage !!! ");  
      dispatch(loadTodos(JSON.parse(savedToDos)));
    }
    else{
      dispatch(loadTodos([]))
    }
  }, [dispatch])

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("todos", JSON.stringify(toDos))
    }
  }, [toDos, isLoaded])

  const handleAddToDo = (e) => {
    if (editId) {
      //editing existing todo
      dispatch(updateTodo({id:editId, text: input}))
    }
    else {
      //Adding a new todo
      dispatch(
        addTodo({
          id:uuidv4(),
          todo: input, 
          isCompleted: false
        })
      )
    }
    setinput("")
  }

  const handleCheckbox = (id) => {
    dispatch(toggleTodo(id))
  }

  const handleDelete = (id) => {
    dispatch(deleteTodo(id))
  }

  const handleEdit = (task, id) => {
    setinput(task);
    dispatch(setEditId(id))
  }

  const handleShowFinished = (e) => {
    if (toDos.length === 0 || toDos.filter(item => item.isCompleted === true).length === 0) {
      alert("No todos found or not completed any todos yet!!");
    }
    else {
      dispatch(toggleShowFinished())
    }
  }


  return (
    <>
      <Navbar />
      <div className="container bg-[#8f93cf] mx-auto  md:my-10 p-4 h-full md:rounded-xl md:w-3/4">
        <div className="tagline text-center font-medium text-2xl">
          <h1 className='font-semibold'>iNoteX - Smart way to manage your tasks daily</h1>
        </div>
        <div className="addTask flex gap-3 justify-center my-5">
          <input className='w-3/4 p-2 text-lg rounded-full' type="text" onChange={(e) => setinput(e.target.value)} value={input} />
          <button onClick={handleAddToDo} disabled={input.trim().length === 0} className='bg-blue-700 text-white font-medium w-20 text-lg p-2 rounded-full'>{editId ? 'Update' : 'Save'}</button>
        </div>
        <div className="option-buttons flex gap-10 justify-center">
          <button onClick={handleShowFinished} className='bg-blue-700 text-white font-medium  py-2 px-4 rounded-full hover:cursor-pointer flex items-center gap-2'>{showFinishedTodos ? 'All ToDos' : "Show Finished"}<FaFilter /></button>
        </div>
        <div className="heading flex justify-center my-10">
          <span className='text-2xl text-center'>Your Todos</span>
        </div>
        <div className='h-[1px] w-3/4 bg-gray-800 mx-auto my-5'></div>
        {toDos.length === 0 && <p className="text-center text-gray-700 text-2xl">No toDos yet 🚀</p>}
        <div className="toDos my-10 md:w-3/4 mx-auto">
          {toDos.filter(item =>
            (showFinishedTodos ? item.isCompleted : true)
          )
            .map(item => {
              return <div key={item.id} className="toDo flex justify-between my-5 p-2 bg-[radial-gradient(circle,rgba(143, 147, 207, 1) 0%, rgba(148, 187, 233, 1) 100%)]">
                <div className="task flex gap-2 w-full sm:w-auto items-center">
                  <span><input onChange={(e) => handleCheckbox(item.id)} className='scale-150 hover:cursor-pointer' type="checkbox" checked={item.isCompleted} /></span>
                  <span style={{ textDecoration: item.isCompleted ? 'line-through' : 'none' }} className='font-mono text-lg'>{item.todo}</span>
                </div>
                <div className="buttons flex gap-2 w-full sm:w-auto items-center">
                  <button onClick={() => handleEdit(item.todo, item.id)} className='bg-blue-700 text-white font-medium w-20 h-10  p-1 rounded-full'>Edit</button>
                  <button onClick={() => handleDelete(item.id)} className='bg-blue-700 text-white font-medium w-20 h-10  p-1 rounded-full'>Delete</button>
                </div>
              </div>
            })}
        </div>
      </div>
    </>
  )
}

export default App
