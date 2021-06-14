import React, { useContext } from "react";
import UsersContext from './UserContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import './UsersSearch.css'

library.add(fab)


function SearchInput() {
    const userInput = useContext(UsersContext);
    const { user, setUser } = userInput
    return (
        <div className="input-container">
            <input type="text" onChange={(e) => setUser(e.target.value)} value={user} placeholder="Search for GitHub users"></input>
        </div>
    )
}

function SearchBar() {
    return (
        <div className="search-container">
            <h1><FontAwesomeIcon icon={['fab', 'github']} /> GitHub Users</h1>
            <SearchInput />
        </div>
    )
}

export default function UsersSearch() {
    return <SearchBar />
}