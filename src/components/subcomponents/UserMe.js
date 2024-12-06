import React, {useState} from 'react';
import '../../css/UserMe.css'
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import {useOutletContext} from 'react-router-dom'

export default function UserMe() {

    const [userRoot] = useOutletContext();
    const [user, setUser] = useState (userRoot);
    const [name, setName] = useState(user.userName);
    const [surname, setSurname] = useState(user.userSurname);
    const [email, setEmail] = useState(user.email);
    const [phone, setPhone] = useState(user.phoneNumber);
    const [editor, setEditor] = useState(false);
    function isValidEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
      }
    const accept = () => {
        if(name!=="" && surname!=="" && isValidEmail(email) && phone !== "" && phone.length === 9 ){
            setUser({
                ...user,
                userName: name,
                userSurname: surname,
                email: email,
                phoneNumber: phone
            });
            setEditor(false);
        }
    }
    const reject = () => {
       setName(user.userName);
       setSurname(user.userSurname);
       setEmail(user.email);
       setPhone(user.phoneNumber);
       setEditor(false);
    }
    return (
        <div className='UserMe-body'>
            <div className='UserMe-body-form'>
                <div className='UserMe-body-name_surname'>
                    <div className="UserMe-body-input">
                        <label htmlFor="username">Imię</label>
                        <InputText id="username" 
                            value={name} 
                            className={editor ? '' : 'p-disabled'}
                            onChange={(e) => setName(e.target.value)} 
                            aria-describedby="username" />
                    </div>
                    <div className="UserMe-body-input">
                        <label htmlFor="surname">Nazwisko</label>
                        <InputText id="surname" 
                            value={surname} 
                            className={editor ? '' : 'p-disabled'}
                            onChange={(e) => setSurname(e.target.value)} 
                             aria-describedby="surname" />
                    </div>
                </div>
                <div className="UserMe-body-input">
                    <label htmlFor="email">Adres e-mail</label>
                    <InputText id="email"  
                            value={email} 
                            className={editor ? '' : 'p-disabled'}
                            onChange={(e) => setEmail(e.target.value)} 
                            aria-describedby="email" />
                </div>
                <div className="UserMe-body-input">
                    <label htmlFor="phone">Numer Telefonu</label>
                    <InputText id="phone"  
                            value={phone} 
                            className={editor ? '' : 'p-disabled'}
                            onChange={(e) => setPhone(e.target.value)} 
                            aria-describedby="phone" />
                </div>
                <div className="UserMe-body-detail">
                    <h2>W firmie: <i>{user.company}</i> od {new Date(user.createdAt).toLocaleDateString()}</h2>
                </div>
                <div className="UserMe-body-button"> 
                    {editor ? 
                        <>
                        <Button label="Zaakceptuj" severity="success" onClick={(event) => accept()} /> 
                        <Button label="Anuluj" severity="warning" onClick={(event) => reject()} />
                        </>
                            : 
                        <Button label="Edytuj dane" severity="info" onClick={(event) => setEditor(true)} /> 
                            }
                            </div>
            </div>
        </div>
    );
};
