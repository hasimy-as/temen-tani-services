import React from "react";
import { Input, Space, Select } from 'antd';
import logo from "../../assets/logo-full.svg";
import Button from '../../components/Button';
import "./styles.scoped.css";

export default function SignUp() {
    const {Option} = Select;

    return(
        <div className="login">
            <img src={logo} alt="logo" />
            <form>
                <Space direction="vertical">
                    <Input className="inputField" name="name" placeholder="Nama" />
                    <Input className="inputField" name="nik" placeholder="NIK" type="number" maxLength={16} />
                    <Input className="inputField" name="email" placeholder="Email" type="email" />
                    <Input className="inputField" name="phone" placeholder="No. Telepon" type="number"/>
                    <Input.TextArea className="inputField" name="address" placeholder="Alamat" />
                    <Input.Password className="inputField" name="password" placeholder="Password" />
                    <Input.Group name="role">
                        <Select className="inputField" defaultValue="Petani">
                            <Option value="farmer">Petani</Option>
                            <Option value="wholesale">Tengkulak/Pengepul</Option>
                        </Select>
                    </Input.Group>
                    
                    <Button label="DAFTAR" to="#"/>
                </Space>
            </form>
        </div>
    )
}