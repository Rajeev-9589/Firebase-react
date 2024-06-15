import React,{useState} from 'react'
import Sidebar from './components/Sidebar'
import TodoList from './components/TodoList'
import './App.css'


function App() {
  const [selectedDate, setSelectedDate] = useState(new Date());


  return (
    <div className='h-screen w-screen flex'>
      <Sidebar selectedDate={selectedDate} onDateChange={setSelectedDate}/>
      <TodoList selectedDate={selectedDate}/>
    </div>
  )
}

export default App