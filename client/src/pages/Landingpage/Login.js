import React from "react";
import { Input, Space } from 'antd';
import logo from "../../assets/logo-full.svg";
import Button from '../../components/Button';
import "./styles.scoped.css";


export default function Login() {
    return(
        <div className="login">
            <img src={logo} alt="logo" />
            <form>
                <Space direction="vertical">
                    <Input className="inputField" name="username" placeholder="Username" />
                    <Input.Password className="inputField" name="password" placeholder="Password" />
                    <Button label="MASUK" to="#"/>
                </Space>
            </form>
        </div>
    )
}