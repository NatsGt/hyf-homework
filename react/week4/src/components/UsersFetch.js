import React, { useEffect, useState } from "react";
import { UserProvider } from './UserContext';
import UsersSearch from './UsersSearch';
import UsersList from './UsersList';
import useDebounce from "./UseDebounce";

export default function UsersFetch() {
    const [user, setUser] = useState("")
    const [result, setResult] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const debounceQuery = useDebounce(user);

    useEffect(() => {
        async function fetchApi(query) {
            if (query.length === 0) {
                setResult([]);
                return
            }
            setLoading(true);
            const data = await fetch(`https://api.github.com/search/users?q=${query}`);
            if (data.ok) {
                const apiResult = await data.json()
                const userList = await apiResult.items
                setResult(userList)
                setError("")
            } else {
                const errorResult = await data.json();
                setError(errorResult.message);
            }
            setLoading(false)
        }
        fetchApi(debounceQuery);
    }, [debounceQuery])

    return (
        <div>
            <UserProvider value={{ user, setUser, result, setResult, loading, error }}>
                <UsersSearch />
                <UsersList />
            </UserProvider>
        </div>
    )
}