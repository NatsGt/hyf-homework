import React, { useEffect, useState } from "react";
import { UserProvider } from './UserContext';
import UsersSearch from './UsersSearch';
import UsersList from './UsersList';

export default function UsersFetch() {
    const [users, setUsers] = useState("")
    const [result, setResult] = useState([{ id: 1, login: "No result" }]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        async function fetchApi(query) {
            if (query.length === 0) {
                setResult(() => [{ id: 1, login: "No result" }])
                return
            }
            setLoading(true);
            const data = await fetch(`https://api.github.com/search/users?q=${query}`);
            if (data.ok) {
                const apiResult = await data.json()
                const userList = await apiResult.items
                setResult(() => userList)
                setError("")
            } else {
                const errorResult = await data.json();
                setError(errorResult.message);
            }
            setLoading(false)
        }
        fetchApi(users);
    }, [users])

    return (
        <div>
            <UserProvider value={{ users, setUsers }}>
                <UsersSearch />
            </UserProvider>
            <UserProvider value={{ result, loading, error }} >
                <UsersList />
            </UserProvider>
        </div>
    )
}