import React, { useContext } from "react";
import UsersContext from './UserContext';
import MainTitle from './Headers';
import './UsersSearch.css'

function SearchInput() {
    const userInput = useContext(UsersContext);
    const { users, setUsers } = userInput
    return (
        <div className="input-container">
            <input type="text" onChange={(e) => setUsers(e.target.value)} value={users} placeholder="Search for GitHub users"></input>
        </div>
    )
}

function NavBar() {
    return (
        <nav>
            <MainTitle />
            <SearchInput />
        </nav>
    )
}

export default function UsersSearch() {
    return <NavBar />
}