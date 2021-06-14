import React, { useContext } from "react";
import UsersContext from './UserContext';
import './UsersList.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner, faFrown } from '@fortawesome/free-solid-svg-icons'


function RenderUsers(props) {
    return (
        <li className="user-name">
            <a href={props.url} target="_blank" rel="noreferrer">{props.name}</a>
        </li>
    )
}

function ResultList() {
    const resultData = useContext(UsersContext)
    const { result, loading } = resultData;
    return (
        <div>
            {loading && <LoadState />}
            <ul>
                {result.map((data) => {
                    return (
                        <RenderUsers
                            key={data.id}
                            name={data.login}
                            url={data.html_url}

                        />)
                })}
            </ul>
        </div>
    )
}

function ErrorMessage() {
    const resultData = useContext(UsersContext)
    const { error } = resultData;
    return (
        <div className="result-list">
            <div><FontAwesomeIcon icon={faFrown} size="2x" /></div>
            <div className="error-text"> {error} </div>
        </div>
    )
}

function LoadState() {
    return <div>Loading<FontAwesomeIcon icon={faSpinner} /></div>
}

function SucessFetch() {
    const resultData = useContext(UsersContext)
    const { result } = resultData;
    return (
        <div>
            <h3 className="user-list-title">Found users</h3>
            <ul className="result-list">
                {(result.length > 0) ? <ResultList /> : <div>No result</div>}
            </ul>
        </div>

    )
}

function UsersResult() {
    const resultData = useContext(UsersContext)
    const { error } = resultData;
    return (
        <div className="render-result-container">
            <div className="render-result-box">
                {(error.length === 0) ? <SucessFetch /> : <ErrorMessage />}
            </div>
        </div>
    )
}

export default function UsersList() {
    return <UsersResult />
}