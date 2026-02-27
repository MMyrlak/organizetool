import React, { useState, useEffect, useRef } from 'react';
import '../../css/UserMe.css';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { useOutletContext } from 'react-router-dom';
import Loading from './Loading';
import { Password } from 'primereact/password';
import { Toast } from 'primereact/toast';
import gif from '../../css/photo/Progress.gif';

export default function UserMe() {
    // Pobieramy użytkownika z kontekstu lub ustawiamy domyślnego dla DEMO
    const [userRoot] = useOutletContext() || [{
        isCompany: false,
        userName: "Jan",
        userSurname: "Kowalski",
        email: "jan.kowalski@demo.pl",
        phoneNumber: "500111222",
        uid: "demo-uid-123",
        company: "OrganizationTOOL-Company",
        role: "User",
        createdAt: { seconds: 1736521400, nanoseconds: 0 }
    }];
    
    const [user] = useState(userRoot);
    const toast = useRef(null);

    const [loader, setLoader] = useState(true);
    const [isCompany, setIsCompany] = useState(false);

    useEffect(() => {
        if (user.isCompany) {
            setIsCompany(true);
        }
        setTimeout(() => setLoader(false), 300);
    }, [user.isCompany]);

    const [name, setName] = useState(user.userName);
    const [surname, setSurname] = useState(user.userSurname);
    const [email, setEmail] = useState("");
    const [oldEmail, setOldEmail] = useState(user.email);
    const [password, setPasword] = useState("");
    const [phone, setPhone] = useState(user.phoneNumber);
    
    const [editor, setEditor] = useState(false);
    const [editorEmail, setEditorEmail] = useState(false);
    const [editorPassword, setEditorPassword] = useState(false);
    
    const [newPassword, setNewPassword] = useState("");
    const [progress, setProgress] = useState(false);

    // BEZPIECZNE FORMATOWANIE DATY
    const formatDate = (timestamp) => {
        if (!timestamp) return 'brak danych';
        // Jeśli to prawdziwy obiekt Firebase Timestamp
        if (typeof timestamp.toDate === 'function') {
            return timestamp.toDate().toLocaleDateString();
        }
        // Jeśli to zwykły JSON z property 'seconds'
        if (timestamp.seconds) {
            return new Date(timestamp.seconds * 1000).toLocaleDateString();
        }
        return 'brak danych';
    };

    function isValidEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    const accept = () => {
        if (name !== "" && surname !== "" && phone !== "" && phone.length === 9) {
            setProgress(true);
            setTimeout(() => {
                console.log("DEMO: Edytowano dane użytkownika:", { name, surname, phone, isCompany });
                toast.current.show({ severity: 'success', summary: 'Sukces (Demo)', detail: 'Dane zostały zaktualizowane.', life: 3000 });
                setEditor(false);
                setProgress(false);
            }, 1000);
        }
    }

    const acceptEmail = () => {
        if (isValidEmail(email) && password !== "") {
            setProgress(true);
            setTimeout(() => {
                console.log("DEMO: Zmieniono adres email:", { oldEmail, newEmail: email });
                toast.current.show({ severity: 'success', summary: 'Sukces (Demo)', detail: 'Adres e-mail został zmieniony.', life: 3000 });
                setOldEmail(email); 
                setEmail("");
                setPasword("");
                setEditorEmail(false);
                setProgress(false);
            }, 1000);
        }
    }

    const acceptPassword = () => {
        if (isValidEmail(oldEmail) && password !== "" && newPassword !== "") {
            setProgress(true);
            setTimeout(() => {
                console.log("DEMO: Zmieniono hasło dla:", oldEmail);
                toast.current.show({ severity: 'success', summary: 'Sukces (Demo)', detail: 'Hasło zostało pomyślnie zmienione.', life: 3000 });
                setPasword("");
                setNewPassword("");
                setEditorPassword(false);
                setProgress(false);
            }, 1000);
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

    // USUŃ te instrukcje if:
    // if (loader) { return <div><Loading /></div>; }
    // if (progress) { return <div className='Progress-cointainer'>...</div>; }

    // Wklej ten główny blok return:
    return (
        <div className='UserMe-body'>
            {/* Toster musi tu być ZAWSZE, żeby toast.current nigdy nie było null */}
            <Toast ref={toast} />

            {loader ? (
                <div><Loading /></div>
            ) : progress ? (
                <div className='Progress-cointainer'>
                    <img src={gif} alt="Ładowanie..." />
                    <h1>Ładowanie</h1>
                </div>
            ) : (
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
                                </div>}
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
                                    <h2>W firmie: <i>{user.company}</i> od {formatDate(user.createdAt)} <br /> jako {user.role}</h2>
                                </div>}
                            <div className="UserMe-body-button">
                                {editor ?
                                    <>
                                        <Button label="Zaakceptuj" severity="success" onClick={() => accept()} />
                                        <Button label="Anuluj" severity="warning" onClick={() => reject()} />
                                    </>
                                    :
                                    <>
                                        <Button label="Edytuj dane" severity="info" onClick={() => setEditor(true)} />
                                        <Button label="Edytuj email" severity="info" onClick={() => setEditorEmail(true)} />
                                        <Button label="Zmień hasło" severity="info" onClick={() => setEditorPassword(true)} />
                                    </>
                                }
                            </div>
                        </>
                        :
                        <div className='UserMe-body-form'>
                            {editorEmail ? <>
                                <div className="UserMe-body-input">
                                    <label htmlFor="oldEmail">Obecny adres email</label>
                                    <InputText id="oldEmail"
                                        value={oldEmail}
                                        onChange={(e) => setOldEmail(e.target.value)} 
                                        className="p-disabled"/>
                                </div>
                                <div className="UserMe-body-input">
                                    <label htmlFor="newEmail">Nowy adres email</label>
                                    <InputText id="newEmail"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)} />
                                </div>
                                <div className="UserMe-body-input">
                                    <label htmlFor="password">Hasło konta</label>
                                    <Password id="password"
                                        value={password}
                                        onChange={(e) => setPasword(e.target.value)}
                                        feedback={false}
                                        tabIndex={1} />
                                </div>
                                <div className="UserMe-body-button">
                                    <Button label="Wróć" severity="secondary" icon="pi pi-arrow-left" onClick={() => { reject(); setEditorEmail(false); }} />
                                    <Button label="Zapisz zmiany" icon="pi pi-arrow-right" iconPos="right" onClick={() => acceptEmail()} />
                                </div>
                            </> :
                                <>
                                    <div className="UserMe-body-input">
                                        <label htmlFor="emailForPassword">Adres email</label>
                                        <InputText id="emailForPassword"
                                            value={oldEmail}
                                            onChange={(e) => setOldEmail(e.target.value)} />
                                    </div>
                                    <div className="UserMe-body-input">
                                        <label htmlFor="oldPassword">Stare hasło konta</label>
                                        <Password id="oldPassword"
                                            value={password}
                                            onChange={(e) => setPasword(e.target.value)}
                                            feedback={false}
                                            tabIndex={1} />
                                    </div>
                                    <div className="UserMe-body-input">
                                        <label htmlFor="newPassword">Nowe hasło konta</label>
                                        <Password id="newPassword"
                                            value={newPassword}
                                            onChange={(e) => setNewPassword(e.target.value)}
                                            feedback={false}
                                            tabIndex={1} />
                                    </div>
                                    <div className="UserMe-body-button">
                                        <Button label="Wróć" severity="secondary" icon="pi pi-arrow-left" onClick={() => { reject(); setEditorPassword(false); }} />
                                        <Button label="Zapisz zmiany" icon="pi pi-arrow-right" iconPos="right" onClick={() => acceptPassword()} />
                                    </div>
                                </>
                            }
                        </div>
                    }
                </div>
            )}
        </div>
    );
};