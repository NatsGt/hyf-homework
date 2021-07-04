import './App.css';
import Counter from './components/Counter';
import TodoListContainer from "./components/TodoListContainer"

export default function App() {
    return (
        <div className="App">
            <Counter />
            <TodoListContainer />
        </div>
    );
}