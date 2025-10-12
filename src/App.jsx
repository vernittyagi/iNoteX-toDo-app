import { useState, useEffect } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import { v4 as uuidv4 } from 'uuid';
import { FaFilter } from "react-icons/fa";

function App() {
  const [toDo, settoDo] = useState("")
  const [toDos, settoDos] = useState([])
  const [showFinishedTodos, setshowFinishedTodos] = useState(false)
  const [input, setinput] = useState("")
  const [editId, seteditId] = useState(null)
  const [isLoaded, setisLoaded] = useState(false)

  useEffect(() => {
    const savedToDos = localStorage.getItem("todos");
    if (savedToDos) {
      settoDos(JSON.parse(savedToDos));
      console.log("got from local storage");
      console.log("todos in savetodos in local is - ", savedToDos);
    }
    setisLoaded(true)
  }, [])

  useEffect(() => {
    if(isLoaded){
      localStorage.setItem("todos", JSON.stringify(toDos))
    }
  }, [toDos, isLoaded])
  


  const handleChange = (e) => {
    setinput(e.target.value)
    settoDo(e.target.value)
  }

  const addToDo = (e) => {
    if (editId) {
      //editing existing todo
      settoDos(toDos.map(item =>
        item.id === editId ? { ...item, todo: toDo } : item
      ));
      seteditId(null) //reset edit mode here
    }
    else {
      //Adding a new todo
      settoDos([...toDos, { id: uuidv4(), todo: toDo, isCompleted: false }]);
    }
    setinput("")
    settoDo("")
  }

  const handleCheckbox = (e, taskid) => {
    settoDos(toDos.map((item) =>
      item.id === taskid ? { ...item, isCompleted: !item.isCompleted } : item
    ));
  }

  const handleDelete = (id) => {
    settoDos(toDos.filter(item => item.id !== id));
  }

  const handleEdit = (task, taskid) => {
    setinput(task);
    settoDo(task);
    seteditId(taskid); //edit mode is set here
  }

  const handleShowFinished = (e) => {
    if (toDos.length === 0 || toDos.filter(item => item.isCompleted === true).length === 0) {
      alert("No todos found or not completed any todos yet!!");
    }
    else {
      setshowFinishedTodos(!showFinishedTodos)
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
          <input className='w-3/4 p-2 text-lg rounded-full' type="text" onChange={handleChange} value={input} />
          <button onClick={addToDo} disabled={input.trim().length === 0} className='bg-blue-700 text-white font-medium w-20 text-lg p-2 rounded-full'>{editId ? 'Update' : 'Save'}</button>
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
                  <span><input onChange={(e) => handleCheckbox(e, item.id)} className='scale-150 hover:cursor-pointer' type="checkbox" checked={item.isCompleted} /></span>
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
