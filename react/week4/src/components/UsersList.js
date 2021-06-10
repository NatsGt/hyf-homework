import React, { useContext } from "react";
import UsersContext from './UserContext';
import { SectionTitle } from './Headers'
import './UsersList.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner, faFrown } from '@fortawesome/free-solid-svg-icons'


function RenderUsers(props) {
    return (<li className="user-name">
        <a href={props.url} target="_blank" rel="noreferrer">{props.name}</a>
    </li>)
}

function LoadState() {
    return <div>Loading<FontAwesomeIcon icon={faSpinner} /></div>
}

export default function UsersList() {
    const resultData = useContext(UsersContext)
    const { result, loading, error } = resultData;
    if (error.length === 0) {
        return (
            <div className="background">
                <div className="users-result-container">
                    <SectionTitle title="Found users" className="user-list-title" />
                    {loading && <LoadState />}
                    <ul className="user-name-list">
                        {result.map((data) => <RenderUsers key={data.id} name={data.login} url={data.html_url} />)}
                    </ul>
                </div>
            </div>

        )
    } else {

        return (
            <div className="background">
                <div className="users-result-container">
                    <div><FontAwesomeIcon icon={faFrown} size="2x" /></div>
                    <div className="error-text"> {error} </div>
                </div>
            </div>)
    }

}