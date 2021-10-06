import React from "react";
// import {Button} from 'antd';
import Button from '../../components/Button';
import farmerIc from "../../assets/lp-image.svg";
import logo from "../../assets/logo-full.svg";
import "./styles.scoped.css"

export default function Home() {
    return(
        <>
        <div className="root">
            <div className="logo">
                <img src={logo} alt="logo"/>
                <Button label="MASUK" to="/login"/>
                <Button label="DAFTAR" to="/signup"/>
            </div>
            <div className="image">
                <img src={farmerIc} alt="img" />
            </div>           
        </div>
        </>
    )
}