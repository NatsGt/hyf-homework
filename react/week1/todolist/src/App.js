import './App.css';

const myTodo = [
  {
    id: 1,
    task: "Finish my hyf homework",
    dueDate: "Tue 18-05-2021"
  },
  {
    id: 2,
    task: "Shop groceries",
    dueDate: "Wed 19-05-2021"
  },
  {
    id: 3,
    task: "Do laundry",
    dueDate: "Thu 20-05-2021"
  }
]

function App() {
  return (
    <div className="App">
      <h1>Todo List</h1>
      <div className="container">
        <Table />
      </div>
    </div>
  );
}

function Table() {
  return (
    <table className="todo-table">
      <tr>
        <TableHeader title="Task" />
        <TableHeader title="Due Date" />
      </tr>
      {myTodo.map(list => {
        return (
          <Task key={list.id} task={list.task} dueDate={list.dueDate} />
        )
      }
      )}

    </table>
  )
}

function TableHeader(props) {
  return (
    <th>{props.title}</th>
  )
}

function Task(props) {
  return (
    <tr>
      <td>{props.task}</td>
      <td>{props.dueDate}</td>
    </tr>
  )
}
export default App;
