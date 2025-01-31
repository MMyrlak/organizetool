import { Link,useNavigate } from "react-router-dom";
import '../css/LoginPage.css'
import { useState } from "react";
import { InputText } from 'primereact/inputtext';
import { FloatLabel } from 'primereact/floatlabel';
import { Button } from 'primereact/button'
import { Password } from 'primereact/password';
import logo from '../css/photo/logo512.png';
import {loginUser, getSignedInUser} from '../backend/UserAction';
export default function LoginPage() {

    const navigate = useNavigate();
    getSignedInUser().then(([isSignedIn]) => {
          if(isSignedIn) {
            navigate('/');
          }
      }).catch(error => {
          console.error("Error fetching user:", error);
      });

    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    async function login() {
        setLoading(true);
        if (username && password) {
            try {
                const isLoggedIn = await loginUser(username, password); // czekanie na wynik logowania
                if (isLoggedIn) {
                    navigate('/task'); 
                } else {
                    setErrorMsg("Błędny e-mail lub hasło");
                    setPassword("");
                }
            } catch (error) {
                setErrorMsg("Wystąpił błąd podczas logowania.");
                console.error(error);
            } finally {
                setLoading(false);
            }
        } else {
            setLoading(false);
            setErrorMsg("Błędny e-mail lub hasło");
            setPassword("");
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