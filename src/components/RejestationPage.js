import { Link, useNavigate } from "react-router-dom";
import '../css/LoginPage.css'
import { sha256 } from "js-sha256";
import { useState } from "react";
import { InputText } from 'primereact/inputtext';
import { FloatLabel } from 'primereact/floatlabel';
import { Button } from 'primereact/button'
import { Password } from 'primereact/password';
import logo from '../css/photo/logo512.png';
export default function RejestrationPage() {
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [password2, setPassword2] = useState("");
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const navigate = useNavigate();
    function login(){
        setLoading(true);
        let shaPassword = "";
        if(username.length<=5){
            setErrorMsg("Podaj adres email");
        }
        console.log(password.length);
        if(password.length<=0){
            setErrorMsg("Podaj hasło");
        }
        if(password !== password2){
            setErrorMsg("Hasła się różnią");
        }
        if(password) { shaPassword = sha256(password);}
        if(username && shaPassword && password2){
            alert("działa");
            setTimeout(() => {
                setLoading(false)
              }, "2500");
            setTimeout(() => {
                return navigate('/')
              }, "3000");
        } else {
            alert("Nie działa");
            setPassword("");
            setTimeout(() => {
                setLoading(false)
              }, "2500");
        }
    }
    return ( 
        <div className="loginPage-background">
                    <div className="decorCointainer-circle1"></div>
                    <div className="decorCointainer-circle2"></div>
                    <div className="decorCointainer-circle3"></div>
            <div className="logoPanel">
                <div className="logoPanel-body">
                    <div className="logoPanel-Logo">
                        <img src={logo} alt="Logo"/>
                    </div>
                    <div className="logoPanel-name">
                        <h1>OrganizeTOOL</h1>
                    </div>
                </div>
            </div>
            <div className="rejestationButtonPanel">
                <div className="rejestationButtonPanel-body">
                    <Link to="/login">
                        <Button className="rejestationButtonPanel-button" label="Masz już konto? Zaloguj się" icon="pi pi-check"/>
                    </Link>
                </div>
            </div>
            <div className="rejestationPage-panel">
                <h1 className="loginPage-panel-header">Zarejestruj się!</h1>
                <div>
                <p className="loginPage-panel-errorMsg">{errorMsg.length ? errorMsg : null  }</p>
                    <FloatLabel className="loginPage-panel-form-input">
                        <InputText className={errorMsg.length>0 ? "p-invalid" : "" } id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
                        <label htmlFor="username">Wprowadź e-mail firmy</label>
                    </FloatLabel>
                    <FloatLabel className="loginPage-panel-form-input">
                        <Password  className={errorMsg.length>0 ? "p-invalid" : "" } id="password" value={password} onChange={(e) => setPassword(e.target.value)} feedback={false} tabIndex={1} />  
                        <label htmlFor="password">Hasło</label>
                    </FloatLabel>
                    <FloatLabel className="loginPage-panel-form-input">
                        <Password  className={errorMsg.length>0 ? "p-invalid" : "" } id="password" value={password2} onChange={(e) => setPassword2(e.target.value)} feedback={false} tabIndex={1} />  
                        <label htmlFor="password">Potwierdź hasło</label>
                    </FloatLabel>
                    <Button className="loginPage-panel-form-button" label="Zarejestruj firmę" icon="pi pi-check" loading={loading} onClick={login}/>
                </div>
            </div>
        </div>
    ); 
} 