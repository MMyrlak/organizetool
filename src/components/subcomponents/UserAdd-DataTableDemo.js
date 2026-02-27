import React, { useState, useRef, useEffect } from 'react';
import { Button } from 'primereact/button';
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { InputText } from 'primereact/inputtext';
import { Toast } from 'primereact/toast';
import { Checkbox } from 'primereact/checkbox';
import { Dropdown } from 'primereact/dropdown';
import { Dialog } from 'primereact/dialog';
import '../../css/ConfirmDialog.css';
import '../../css/UserAdd.css';
import { useOutletContext, useNavigate } from "react-router-dom";
import Loading from './Loading';

// Statyczna baza danych użytkowników na potrzeby DEMO
const DEMO_USER_LIST = [
  {
    company: "OrganizationTOOL-Company",
    createdAt: { seconds: 1736442802, nanoseconds: 986000000 },
    email: "admin@a.pl",
    isCompany: false,
    name: "Admin",
    phoneNumber: "333666999",
    role: "Admin",
    surname: "Admin",
    toRemove: false,
    uid: "o5kKpABdawdXQW6rOInLTnV0GQs2",
    userName: "Admin",
    userSurname: "Admin"
  },
  {
    company: "OrganizationTOOL-Company",
    createdAt: { seconds: 1736521400, nanoseconds: 125000000 },
    email: "jan.kowalski@demo.pl",
    isCompany: false,
    name: "Jan",
    phoneNumber: "500111222",
    role: "Pracownik",
    surname: "Kowalski",
    toRemove: false,
    uid: "a1b2c3d4e5f6g7h8i9j0k1l2m3n4",
    userName: "Jan",
    userSurname: "Kowalski"
  },
  {
    company: "OrganizationTOOL-Company",
    createdAt: { seconds: 1736605200, nanoseconds: 450000000 },
    email: "anna.nowak@demo.pl",
    isCompany: false,
    name: "Anna",
    phoneNumber: "600333444",
    role: "Project Menager",
    surname: "Nowak",
    toRemove: false,
    uid: "Z9Y8X7W6V5U4T3S2R1Q0P9O8N7M6",
    userName: "Anna",
    userSurname: "Nowak"
  },
  {
    company: "PartnerCorp-IT",
    createdAt: { seconds: 1736691600, nanoseconds: 880000000 },
    email: "kontakt@partnercorp.pl",
    isCompany: true,
    name: "Piotr",
    phoneNumber: "700555666",
    role: "Pracownik",
    surname: "Wiśniewski",
    toRemove: false,
    uid: "pL9oK8jI7hU6yG5tF4rE3dW2qS1a",
    userName: "Piotr",
    userSurname: "Wiśniewski"
  },
  {
    company: "OrganizationTOOL-Company",
    createdAt: { seconds: 1736778000, nanoseconds: 333000000 },
    email: "kasia.wojcik@demo.pl",
    isCompany: false,
    name: "Katarzyna",
    phoneNumber: "800777888",
    role: "Pracownik",
    surname: "Wójcik",
    toRemove: true,
    uid: "mN1bV2cC3xZ4aA5sS6dD7fF8gG9h",
    userName: "Katarzyna",
    userSurname: "Wójcik"
  }
];

export default function UserAdd() {
    const [user] = useOutletContext();
    const [loader, setLoader] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        // Zostawiam sprawdzanie roli na wszelki wypadek, ale z reguły demo ignoruje back-end
        if (user?.role !== "Admin" && user?.role) {
             //navigate('/error-page');
        } else {
             // Symulacja opóźnienia ładowania widoku (dla dema)
             setTimeout(() => setLoader(false), 300);
        }
    }, [user?.role, navigate]);

    const [userList, setUserList] = useState([]);
    const toast = useRef(null);
    const [deleteUserIndex, setDeleteUserIndex] = useState("");
    const [checkedPassword, setCheckedPassword] = useState(true);
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [role, setRole] = useState("");
    const [id, setId] = useState("");
    const [password, setPassword] = useState("");
    const [editor, setEditor] = useState(false);
    const [visible, setVisible] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        // Wczytanie danych statycznych z dema
        setTimeout(() => {
            setUserList(DEMO_USER_LIST);
        }, 500);
    }, []);

    const randomPassword = () => {
        setPassword(checkedPassword ? Math.random().toString(36).slice(-8) : "")
    }

    useEffect(() => {
        randomPassword();
    }, [checkedPassword])

    const roleTemplate = [
        { name: 'Admin', code: 'Admin' },
        { name: 'Project Menager', code: 'Project Menager' },
        { name: 'Pracownik', code: 'Pracownik' },
    ];

    const deleteUser = (name, surname) => {
        confirmDialog({
            group: 'headless',
            message: 'Usunąć użytkownika?',
            header: name + " " + surname,
            defaultFocus: 'accept',
        });
    };

    function deleteUserAcceppt(index) {
        // DEMO - Usuwanie lokalnie (wyświetlenie tylko info)
        console.log("DEMO: Usuwanie użytkownika o ID:", index);
        toast.current.show({ severity: 'info', summary: 'Usunięto (Demo)', detail: 'Użytkownik został usunięty lokalnie.', life: 3000 });
        setDeleteUserIndex("");
    }

    const fixedEmail = email.trim().toLowerCase();

    function isValidEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    const accept = () => {
        if (!editor) randomPassword();
        if (name === "") { return setError("Brakuje imienia"); };
        if (surname === "") { return setError("Brakuje nazwiska"); };
        if (!isValidEmail(fixedEmail)) { return setError("Błędny email"); };
        if (role === "") { return setError("Brakuje roli"); };
        if (phone === "") { return setError("Brakuje numeru telefonu"); };
        if (phone.length !== 9) { return setError("Błędna długość numeru"); };
        if (password === "") { return setError("Brakuje hasła"); };
        if (password.length < 6) { return setError("Hasło powinno mieć co najmniej 6 znaków"); };

        setPassword(password);
        return setVisible(true);
    }

    const showSuccess = () => {
        // DEMO - Zamiast dzwonić do bazy pokazujemy toasty sukcesu
        if (editor) {
            console.log("DEMO: Edytowano użytkownika", { name, surname, phone, role, id });
            toast.current.show({ severity: 'success', summary: 'Edytowano użytkownika (Demo)', detail: name + " " + surname, life: 3000 });
        } else {
            console.log("DEMO: Dodano użytkownika", { name, surname, email, phone, role, password });
            toast.current.show({ severity: 'success', summary: 'Dodano użytkownika (Demo)', detail: name + " " + surname, life: 3000 });
        }
        setEditor(false);
    }

    const reset = () => {
        setName("");
        setSurname("");
        setEmail("");
        setPhone("");
        setCheckedPassword(true);
        setError("");
        setRole("");
        setEditor(false);
    }

    const edit = (user) => {
        setEditor(true);
        setName(user.userName);
        setSurname(user.userSurname);
        setEmail(user.email);
        setPhone(user.phoneNumber);
        setId(user.id);
        setRole(user.role);
        setError("");
    }

    const userBodyTemplate = (rowData) => {
        return (
            <div className='itemTemplate-personalInfo'>
                <div className='itemTemplate-nameSurname'>
                    <p>{rowData.userName}</p>
                    <p>{rowData.userSurname}</p>
                </div>
                <div className='itemTemplate-email'>
                    <p>{rowData.email}</p>
                </div>
                <div className='itemTemplate-role'>
                    <p>{rowData.role}</p>
                </div>
            </div>
        )
    }

    const deadlineBodyTemplate = (rowData) => {
        const timestamp = rowData.createdAt?.seconds; 
        
        // Zabezpieczenie przed brakiem daty
        if (!timestamp) return <p>Brak daty</p>;

        const convertTimestampToDate = (timestamp) => {
            const date = new Date(timestamp * 1000); 
            const day = String(date.getDate()).padStart(2, '0');
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const year = date.getFullYear();
            return `${day}.${month}.${year}`;
        };

        return (
            <div className='itemTemplate-personalInfo'>
                <div className='itemTemplate-role'>
                    <p>{convertTimestampToDate(timestamp)}</p>
                </div>
            </div>
        );
    }

    const optionBodyTempalet = (rowData) => {
        return (
            <div className='itemTemplate-createdAt'>
                <Button icon="pi pi-trash" rounded text raised severity="danger" aria-label="Usuń użytkownika" onClick={() => { deleteUser(rowData.userName, rowData.userSurname); setDeleteUserIndex(rowData.id) }} />
                <Button className='p-button-icon-only' icon="pi pi-pencil" rounded text raised aria-label="Edytuj użytkownika" onClick={() => { edit(rowData); }} />
            </div>
        )
    }

    if (loader) {
        return (
            <div>
                <Loading />
            </div>
        );
    }

    return (
        <div className='userAdd-container'>
            <Toast ref={toast} />
            <ConfirmDialog
                group="headless"
                content={({ headerRef, contentRef, footerRef, hide, message }) => (
                    <div className="confirmDialog">
                        <div className="confirmDialog-header-icon">
                            <i className="pi pi-trash" style={{ color: 'rgb(255, 255, 255)' }}></i>
                        </div>
                        <span className="confirmDialog-header" ref={headerRef}>
                            <i> {message.header} </i>
                        </span>
                        <p className="confirmDialog-message" ref={contentRef}>
                            {message.message}
                        </p>
                        <div className="confirmDialog-button" ref={footerRef}>
                            <Button
                                label="Zatwierdź"
                                onClick={(event) => {
                                    hide(event);
                                    deleteUserAcceppt(deleteUserIndex);
                                }}
                            ></Button>
                            <Button
                                label="Anuluj"
                                outlined
                                onClick={(event) => {
                                    hide(event);
                                }}
                            ></Button>
                        </div>
                    </div>
                )}
            />
            <div className='userAdd-container-left'>
                <h1 className='userAdd-container-left-header'>{!editor ? "Dodaj nowego użytkownika" : "Edytuj użytkownika"}</h1>
                {error.length > 0 ? <small style={{ color: 'rgb(255, 0, 0)', fontWeight: '400', fontSize: '15px', margin: '-10px auto' }}>{error}</small> : null}
                <div className={error.length > 0 ? 'p-inputgroup flex-1 userAdd-container-left-invalid' : 'p-inputgroup flex-1'}>
                    <span className="p-inputgroup-addon">
                        <i className="pi pi-user"></i>
                    </span>
                    <InputText id="name" value={name} placeholder="Imię" onChange={(e) => setName(e.target.value)} />
                </div>
                <div className={error.length > 0 ? 'p-inputgroup flex-1 userAdd-container-left-invalid' : 'p-inputgroup flex-1'}>
                    <span className="p-inputgroup-addon">
                        <i className="pi pi-user"></i>
                    </span>
                    <InputText id="surname" value={surname} placeholder="Nazwisko" onChange={(e) => setSurname(e.target.value)} />
                </div>
                {editor ? null : <div className={error.length > 0 ? 'p-inputgroup flex-1 userAdd-container-left-invalid' : 'p-inputgroup flex-1'}>
                    <span className="p-inputgroup-addon">
                        <i className="pi pi-at"></i>
                    </span>
                    <InputText id="email" keyfilter="email" value={email} placeholder="E-mail" onChange={(e) => setEmail(e.target.value)} />
                </div>}
                <div className={error.length > 0 ? 'p-inputgroup flex-1 userAdd-container-left-invalid' : 'p-inputgroup flex-1'}>
                    <span className="p-inputgroup-addon">
                        <i className="pi pi-users"></i>
                    </span>
                    <Dropdown value={role} onChange={(e) => setRole(e.value)} options={roleTemplate} optionLabel="name" optionValue="name"
                        placeholder="Wybierz rolę" />
                </div>
                <div className={error.length > 0 ? 'p-inputgroup flex-1 userAdd-container-left-invalid' : 'p-inputgroup flex-1'}>
                    <span className="p-inputgroup-addon">
                        <i className="pi pi-phone"></i>
                    </span>
                    <InputText id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Numer telefonu" />
                </div>
                {editor ? null : <div className={error.length > 0 ? 'p-inputgroup flex-1 userAdd-container-left-password userAdd-container-left-invalid' : 'p-inputgroup userAdd-container-left-password flex-1 '} >
                    <span className="p-inputgroup-addon">
                        <Checkbox checked={checkedPassword} onChange={() => { setCheckedPassword(!checkedPassword) }} />
                    </span>
                    <InputText id="password" className={checkedPassword ? 'p-disabled' : null} value={checkedPassword ? "Hasło generowane automatycznie" : password} placeholder='Hasło' onChange={(e) => setPassword(e.target.value)} />
                </div>}
                <div className='userAdd-container-left-button'>
                    <Button label="Zatwierdź" onClick={() => { accept() }} />
                    <Button label="Anuluj" outlined onClick={() => { reset() }} />
                </div>
            </div>
            <div className='userAdd-container-right'>
                {userList.length === 0 ? <Loading /> : <DataTable
                    value={userList}
                    paginator
                    rows={4}
                    dataKey="uid"
                    emptyMessage="Brak wyników."
                    rowHover
                    removableSort
                >
                    <Column
                        field="user"
                        header="Pracownik"
                        body={userBodyTemplate}
                        style={{ width: "500px" }}
                    />
                    <Column
                        field="phoneNumber"
                        header="Numer telefonu"
                        style={{ width: "0.13rem" }}
                    />
                    <Column
                        sortable
                        field="createdAt.seconds"
                        header="Data utworzenia"
                        body={deadlineBodyTemplate}
                        style={{ width: "0.13rem" }}
                    />
                    <Column
                        header="Opcje"
                        body={optionBodyTempalet}
                        style={{ width: "0.25rem" }}
                    />
                </DataTable>
                }
            </div>
            <Dialog header="Dane szczegółowe" visible={visible} draggable={false} resizable={false} style={{ width: '40vw' }} onHide={() => { setVisible(false); reset() }}>
                <div className='dialog-body'>
                    <div>
                        <i className="pi pi-user" style={{ fontSize: '1.5rem' }}></i>
                        <p>{name}  {surname} - {role}</p>
                    </div>
                    {editor ? null : <div>
                        <i className="pi pi-at" style={{ fontSize: '1.5rem' }}></i>
                        <p>E-mail:</p>
                        <p>{email}</p>
                    </div>
                    }
                    <div>
                        <i className="pi pi-phone" style={{ fontSize: '1.5rem' }}></i>
                        <p>Numer telefonu: </p>
                        <p>{phone}</p>
                    </div>
                    {editor ? null : <div>
                        <i className="pi pi-key" style={{ fontSize: '1.5rem' }}></i>
                        <p>Hasło: </p>
                        <p> {password} </p>
                    </div>}
                    <Button label="Save" icon="pi pi-check" severity="secondary" rounded onClick={() => { showSuccess(); setVisible(false); reset() }} />
                </div>
            </Dialog>
        </div>
    );
};