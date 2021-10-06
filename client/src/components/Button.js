import React from "react";
import { Link } from "react-router-dom";
import './styles.css';

export default function Button(props) {
    const {to, label} = props; 
    return(
        <>
            <Link to={to}>
                <button className="button">{label}</button>
            </Link>
        </>
    )
}