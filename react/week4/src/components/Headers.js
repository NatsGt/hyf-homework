import './Headers.css'
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';

library.add(fab)

export default function MainTitle() {
    return <h1><FontAwesomeIcon icon={['fab', 'github']} /> GitHub Users</h1>
}

function SectionTitle(props) {
    return <h3 className={props.className}>{props.title}</h3>
}

export { SectionTitle }