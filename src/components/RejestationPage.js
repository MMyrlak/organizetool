import { Link, useNavigate } from "react-router-dom";
import '../css/LoginPage.css'
import { useEffect, useState } from "react";
import { InputText } from 'primereact/inputtext';
import { FloatLabel } from 'primereact/floatlabel';
import { Button } from 'primereact/button'
import { Password } from 'primereact/password';
import logo from '../css/photo/logo512.png';
import { saveCompany, getSignedInUser } from "../backend/UserAction";
export default function RejestrationPage() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    useEffect(() => {
       const loadData = async () => {
        getSignedInUser().then(([isSignedIn]) => {
            if(isSignedIn) {
              navigate('/');
            }
        }).catch(error => {
            console.error("Error fetching user:", error);
        });
       loadData();
     }
    }, [loading]);

    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password2, setPassword2] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    async function rejestation(){
        console.log(email);
        setLoading(true);
        if(name.length<=5){
            setErrorMsg("Podaj adres email");
            setLoading(false);
        }
        if(password.length<=0){
            setErrorMsg("Podaj hasło");
            setLoading(false);
        }
        if(password !== password2){
            setErrorMsg("Hasła się różnią");
            setLoading(false);
        }
        if(password.length<6){
            setErrorMsg("Hasło musi posiadać co najmniej 6 znaków");
            setLoading(false);
        }
        if(email && name && password2){
            try {
                const [isComplete, error] = await saveCompany(name, email, password);
                if(!isComplete) { 
                    setErrorMsg(error);
                    setLoading(false);
                }
            } catch (err) {
                setErrorMsg("Wystąpił błąd podczas zapisywania firmy.");
                setLoading(false);
            }
        } else {
            setErrorMsg("Brakuje danych");
            setLoading(false);
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
                        <InputText className={errorMsg.length>0 ? "p-invalid" : "" } id="name" value={name} onChange={(e) => setName(e.target.value)} />
                        <label htmlFor="username">Wprowadź nazwę firmy</label>
                    </FloatLabel>
                    <FloatLabel className="loginPage-panel-form-input">
                        <InputText className={errorMsg.length>0 ? "p-invalid" : "" } id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        <label htmlFor="email">Wprowadź e-mail firmy</label>
                    </FloatLabel>
                    <FloatLabel className="loginPage-panel-form-input">
                        <Password  className={errorMsg.length>0 ? "p-invalid" : "" } id="password" value={password} onChange={(e) => setPassword(e.target.value)} feedback={false} tabIndex={1} />  
                        <label htmlFor="password">Hasło</label>
                    </FloatLabel>
                    <FloatLabel className="loginPage-panel-form-input">
                        <Password  className={errorMsg.length>0 ? "p-invalid" : "" } id="password" value={password2} onChange={(e) => setPassword2(e.target.value)} feedback={false} tabIndex={1} />  
                        <label htmlFor="password">Potwierdź hasło</label>
                    </FloatLabel>
                    <Button className="loginPage-panel-form-button" label="Zarejestruj firmę" icon="pi pi-check" loading={loading} onClick={rejestation}/>
                </div>
            </div>
        </div>
    ); 
} 