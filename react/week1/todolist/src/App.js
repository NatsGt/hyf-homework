import './App.css';

const myTodoList = [
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
        <TodoTable />
      </div>
    </div>
  );
}

function TodoTable() {
  return (
    <table className="todo-table">
      <tbody>
        <tr>
          <TableHeader title="Task" />
          <TableHeader title="Due Date" />
        </tr>
      </tbody>

      {myTodoList.map(task => {
        return (
          <Task key={task.id} task={task.task} dueDate={task.dueDate} />
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
    <tbody>
      <tr>
        <td>{props.task}</td>
        <td>{props.dueDate}</td>
      </tr>

    </tbody>
  )
}
export default App;
