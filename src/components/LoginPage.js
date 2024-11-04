import { Link,useNavigate } from "react-router-dom";
import '../css/LoginPage.css'
import { sha256 } from "js-sha256";
import { useState } from "react";
import { InputText } from 'primereact/inputtext';
import { FloatLabel } from 'primereact/floatlabel';
import { Button } from 'primereact/button'
import { Password } from 'primereact/password';
import logo from '../css/photo/logo512.png';
export default function LoginPage() {
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const navigate = useNavigate();
    function login(){
        setLoading(true);
        console.log("Przed SHA256: " + password);
        let shaPassword = "";
        if(password) { shaPassword = sha256(password);}
        console.log("Po SHA256: " + shaPassword);
        if(username && shaPassword){
            alert("Login: " + username +"\nhasło:" + shaPassword +"\nPrzejście do menu za 3s");
            setTimeout(() => {
                setLoading(false)
              }, "2500");
            setTimeout(() => {
                return navigate('/')
              }, "3000");
        } else {
            setErrorMsg("Błędny e-mail lub hasło");
            setPassword("");
            console.log("SSS");
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
                    <Link to="/rejestration">
                        <Button className="rejestationButtonPanel-button" label="Nie masz firmy? Zarejestruj się teraz" icon="pi pi-check"/>
                    </Link>
                </div>
            </div>
            <div className="sloganPanel">
                <p>Witamy w <b>OrganizeTOOL!</b></p>
                <p>Zacznij już teraz i zwiększ <br/> organizację w swojej firmie</p>
            </div>
            <div className="loginPage-panel">
                <h1 className="loginPage-panel-header">Logowanie</h1>
                <div>
                <p className="loginPage-panel-errorMsg">{errorMsg.length ? errorMsg : null  }</p>
                    <FloatLabel className="loginPage-panel-form-input">
                        <InputText className={errorMsg.length>0 ? "p-invalid" : "" } id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
                        <label htmlFor="username">Wprowadź e-mail</label>
                    </FloatLabel>
                    <FloatLabel className="loginPage-panel-form-input">
                        <Password  className={errorMsg.length>0 ? "p-invalid" : "" } id="password" value={password} onChange={(e) => setPassword(e.target.value)} feedback={false} tabIndex={1} />  
                        <label htmlFor="password">Hasło</label>
                    </FloatLabel>
                    <Button className="loginPage-panel-form-button" label="Zaloguj" icon="pi pi-check" loading={loading} onClick={login}/>
                </div>
            </div>
        </div>
    ); 
} 