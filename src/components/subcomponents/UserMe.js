import React, {useState, useEffect} from 'react';
import '../../css/UserMe.css'
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import {useOutletContext} from 'react-router-dom'
import Loading  from './Loading';
import { editCompany, editMyUser, editUserEmail, editUserPassword} from '../../backend/UserAction';
import { Password } from 'primereact/password';

import gif from '../../css/photo/Progress.gif';
export default function UserMe() {

    const [userRoot] = useOutletContext();
    const [user] = useState(userRoot);
    const [loader, setLoader] = useState(true);
    const [isCompany, setIsCompany] = useState(false);
    useEffect(() => {
            if (user.isCompany) {
                setIsCompany(true);
                setLoader(false);
            } else {
                setLoader(false);
            }
        }, [user.isCompany]);
    const [name, setName] = useState(user.userName);
    const [surname, setSurname] = useState(user.userSurname);
    const [email, setEmail] = useState("");
    const [oldEmail, setOldEmail] = useState(user.email);
    const [password, setPasword] = useState("");
    const [phone, setPhone] = useState(user.phoneNumber);
    const [editor, setEditor] = useState(false);
    const [editorEmail, setEditorEmail] = useState(false);
    const [editorPassword,setEditorPassword] = useState(false);
    const [newPassword , setNewPassword] = useState("");
    const [progress, setProgress] = useState(false);
    function isValidEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
      }
    const accept = () => {
        if(name!=="" && surname!=="" && phone !== "" && phone.length === 9 ){
            if(isCompany){
                if(!editCompany(phone, email, user.uid)){
                    setProgress(false);
                };
            } else {
                if(!editMyUser(name, surname, phone, user.uid)){
                    setProgress(false);
                }
            }

            setEditor(false);
        }
    }
    const acceptEmail = () => {
        if(isValidEmail(email) && password !== ""){
            if(!editUserEmail(oldEmail, email, password, user.uid)){
                setProgress(false);
            }
        }
    }
    const acceptPassword = () => {
        if(isValidEmail(oldEmail) && password !== "" && newPassword !==""){
            setProgress(true);
            if(!editUserPassword(oldEmail, password, newPassword)){
                setProgress(false);
            }
        }
    }
    const reject = () => {
       setName(user.userName);
       setSurname(user.userSurname);
       setOldEmail(user.email);
       setPhone(user.phoneNumber);
       setPasword("");
       setEmail("");
       setEditor(false);
    }
    if(loader) {
        return (
          <div>
            <Loading />
          </div>
        );
      }
      if(progress) {
        return ( <>
            <div className='Progress-cointainer'>
                <img src={gif} alt=""/>
                <h1>Ładowanie</h1>
                
            </div>
            <Button label="Ładowanie check" iconPos="right" onClick={() => setProgress(!progress)} style={{marginTop: "-40px"}}> </Button>
            </>
        )
      }
    return (
        <div className='UserMe-body'>
                <div className='UserMe-body-form'>
                    {!editorEmail && !editorPassword ? 
                    <>
                    <div className='UserMe-body-name_surname'>
                        <div className="UserMe-body-input">
                            <label htmlFor="username">Imię</label>
                            <InputText id="username" 
                                value={name} 
                                className={editor ? '' : 'p-disabled'}
                                onChange={(e) => setName(e.target.value)} 
                                aria-describedby="username" />
                        </div>
                        {isCompany ? null : <div className="UserMe-body-input">
                            <label htmlFor="surname">Nazwisko</label>
                            <InputText id="surname" 
                                value={surname} 
                                className={editor ? '' : 'p-disabled'}
                                onChange={(e) => setSurname(e.target.value)} 
                                aria-describedby="surname" />
                        </div> }
                    </div>
                    <div className="UserMe-body-input">
                        <label htmlFor="phone">Numer Telefonu</label>
                        <InputText id="phone"  
                                value={phone} 
                                className={editor ? '' : 'p-disabled'}
                                onChange={(e) => setPhone(e.target.value)} 
                                aria-describedby="phone" />
                    </div>
                    {isCompany ? null : 
                    <div className="UserMe-body-detail">
                        <h2>W firmie: <i>{user.company}</i> od {user.createdAt?.toDate().toLocaleDateString() || 'brak danych'} <br/> jako {user.role}</h2>
                    </div>}
                <div className="UserMe-body-button"> 
                    {editor ? 
                        <>
                        <Button label="Zaakceptuj" severity="success" onClick={(event) => accept()} /> 
                        <Button label="Anuluj" severity="warning" onClick={(event) => reject()} />
                        </>
                            : 
                        <>    
                            <Button label="Edytuj dane" severity="info" onClick={(event) => setEditor(true)} />
                            <Button label="Edytuj email"severity="info" onClick={(event) => setEditorEmail(true)}/>
                            <Button label="Zmień hasło"severity="info" onClick={(event) => setEditorPassword(true)}/>
                            </>
                        }
                </div>
                </>
                : 
                <div className='UserMe-body-form'>
                    
                    {editorEmail ? <>
                        <div className="UserMe-body-input">
                            <label htmlFor="oldEmail">Stary adres email</label>
                            <InputText id="oldEmail"  
                                value={oldEmail} 
                                onChange={(e) => setOldEmail(e.target.value)}/>
                        </div>
                        <div className="UserMe-body-input">
                            <label htmlFor="oldEmail">Nowy adres email</label>
                            <InputText id="email"  
                                value={email} 
                                onChange={(e) => setEmail(e.target.value)}/>
                        </div>
                        <div className="UserMe-body-input">
                            <label htmlFor="password">Hasło konta</label>
                            <Password id="password"  
                                value={password} 
                                onChange={(e) => setPasword(e.target.value)}
                                feedback={false} 
                                tabIndex={1}/>
                        </div>
                        <div className="UserMe-body-button">
                            <Button label="Wróć" severity="secondary" icon="pi pi-arrow-left" onClick={() => {reject();setEditorEmail(false);}} />
                            <Button label="Zapisz zmiany" icon="pi pi-arrow-right" iconPos="right" onClick={() => acceptEmail()} />
                        </div>
                    </> : 
                    <>
                    <div className="UserMe-body-input">
                        <label htmlFor="oldEmail">Adres email</label>
                        <InputText id="email"  
                            value={oldEmail} 
                            onChange={(e) => setOldEmail(e.target.value)}/>
                    </div>
                    <div className="UserMe-body-input">
                        <label htmlFor="password">Stare hasło konta</label>
                        <Password id="password"  
                            value={password} 
                            onChange={(e) => setPasword(e.target.value)}
                            feedback={false} 
                            tabIndex={1}/>
                    </div>
                    <div className="UserMe-body-input">
                        <label htmlFor="password">Nowe hasło konta</label>
                        <Password id="password"  
                            value={newPassword} 
                            onChange={(e) => setNewPassword(e.target.value)}
                            feedback={false} 
                            tabIndex={1}/>
                    </div>
                    <div className="UserMe-body-button">
                        <Button label="Wróć" severity="secondary" icon="pi pi-arrow-left" onClick={() => {reject();setEditorPassword(false);}} />
                        <Button label="Zapisz zmiany" icon="pi pi-arrow-right" iconPos="right" onClick={() => acceptPassword()} />
                    </div>
                    </> 
                    } 
                </div>
            }
            </div>    
        <Button label="Ładowanie check" iconPos="right" onClick={() => setProgress(!progress)}> </Button>
        </div>
        
    );
};
