import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react'
import { Tabs } from './data/data';
import { Footer } from './data/Footer';

function App() {
  const [todolist, setTodolist] = useState([]);
  const [activeTab, setActivetab] = useState(0);
  const [activeContent, setActivecontent] = useState(Tabs[0]);

  let saveTodolist = (event) => {
    let toname = event.target.todoname.value;
    if (!todolist.includes(toname)) {
      setTodolist([...todolist, toname]);
    }
    else {
      alert("This task already exists in the list");
    }
    event.preventDefault();
  }


  let list = todolist.map((value, index) => {
    return (
      <TodoListItems value={value} key={index} indexNumber={index}
        todolist={todolist}
        setTodolist={setTodolist}
      />
    )
  })


  let changeData = (index) => {
    setActivetab(index);
    setActivecontent(Tabs[index]);
  }


  return (
    <>
      <h1 className='text-center mt-2'> Mini Projects</h1>
      <div className="container shadow mt-2">
        <div className="row m-0 p-0">
          <div className="col-md-12">
            <h1 className="bg-primary text-white mt-2 p-1">Todo List</h1>
          </div>
          <form onSubmit={saveTodolist}>
            <div className="row">
              <div className="col-md-10 p-2">
                <input type="text" name="todoname" className="form-control" />
              </div>
              <div className="col-md-2 p-2">
                <button className="btn btn-dark w-100 mb-2">Add</button>
              </div>
            </div>
          </form>
          <div className="row m-0">
            <div className="col-md-12 border mt-4 mb-3">
              <ul>
                {list}
              </ul>
            </div>
          </div>
        </div>
        <hr />
        <div className="row p-0 m-0">
          <div className="col-md-12 bg-danger text-white">
            <h1>Tabs Change Daynamic</h1>
          </div>
          <div className="col-md-12 tab">
            <ul className='mt-2'>
              {
                Tabs.map((item, index) => {
                  return (
                    <li><button onClick={() => changeData(index)} className={activeTab === index ? 'active btn text-white' : 'btn btn-outline-dark'}>{item.title}</button></li>
                  )
                })
              }
            </ul>
            {
              activeContent !== undefined ?
                <p>
                  {activeContent.body}
                </p>
                :
                ''
            }
          </div>
        </div>
        <hr />
        <div className='row'></div>
        <div className='col-md-12'></div>
        <hr />
        <div className='row'></div>
        <div className='col-md-12'>
          <Footer/>
        </div>
      </div>
    </>
  );
}

export default App;

function TodoListItems({ value, indexNumber, todolist, setTodolist }) {
  const [status, setStatus] = useState(false)
  let deleteTodo = () => {
    let FinalData = todolist.filter((v, i) => i !== indexNumber)
    setTodolist(FinalData);
  }
  let checkStatus = () => {
    setStatus(!status)
  }
  return (
    <li className={(status) ? 'completetodo p-2 mt-2' : 'bg-dark text-white p-2 mt-2'} onClick={checkStatus}>{indexNumber + 1}. {value}<span onClick={deleteTodo}>&times;</span></li>
  )
}