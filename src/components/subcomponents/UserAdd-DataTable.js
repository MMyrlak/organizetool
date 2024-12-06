import React, { useState, useRef, useEffect } from 'react';
import { Button } from 'primereact/button';
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { FilterMatchMode} from "primereact/api";
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { InputText } from 'primereact/inputtext';
import { Toast } from 'primereact/toast';
import { Checkbox } from 'primereact/checkbox';
import { InputMask } from 'primereact/inputmask';
import { Dialog } from 'primereact/dialog';
import '../../css/ConfirmDialog.css';
import '../../css/UserAdd.css';


export default function UserAdd(){
    const userList = [
        { userId: "user123", userName: "Jan", userSurname: "Kowalski", email: "jan.kowalski@example.com", createdAt: "2023-05-12", phoneNumber: "123456789" },
        { userId: "user456", userName: "Anna", userSurname: "Nowak", email: "anna.nowak@example.com", createdAt: "2023-06-25", phoneNumber: "234567890" },
        { userId: "user101", userName: "Piotr", userSurname: "Wiśniewski", email: "piotr.wisniewski@example.com", createdAt: "2022-08-19", phoneNumber: "345678901" },
        { userId: "user789", userName: "Marta", userSurname: "Zalewska", email: "marta.zalewska@example.com", createdAt: "2021-03-10", phoneNumber: "456789012" },
        { userId: "user234", userName: "Kamil", userSurname: "Nowicki", email: "kamil.nowicki@example.com", createdAt: "2020-11-15", phoneNumber: "567890123" },
        { userId: "user345", userName: "Ewa", userSurname: "Wojciechowska", email: "ewa.wojciechowska@example.com", createdAt: "2022-02-03", phoneNumber: "678901234" },
        { userId: "user456", userName: "Rafał", userSurname: "Zieliński", email: "rafal.zielinski@example.com", createdAt: "2021-09-22", phoneNumber: "789012345" },
        { userId: "user567", userName: "Karolina", userSurname: "Jankowska", email: "karolina.jankowska@example.com", createdAt: "2024-01-14", phoneNumber: "890123456" },
        { userId: "user678", userName: "Tomasz", userSurname: "Dąbrowski", email: "tomasz.dabrowski@example.com", createdAt: "2023-10-30", phoneNumber: "901234567" },
        { userId: "user789", userName: "Agnieszka", userSurname: "Piotrowska", email: "agnieszka.piotrowska@example.com", createdAt: "2022-05-08", phoneNumber: "123456789" },
        { userId: "user890", userName: "Paweł", userSurname: "Grabowski", email: "pawel.grabowski@example.com", createdAt: "2023-07-18", phoneNumber: "234567890" },
        { userId: "user901", userName: "Monika", userSurname: "Sikorska", email: "monika.sikorska@example.com", createdAt: "2023-12-01", phoneNumber: "345678901" },
        { userId: "user012", userName: "Grzegorz", userSurname: "Ostrowski", email: "grzegorz.ostrowski@example.com", createdAt: "2020-09-04", phoneNumber: "456789012" },
        { userId: "user1234", userName: "Joanna", userSurname: "Adamczyk", email: "joanna.adamczyk@example.com", createdAt: "2021-11-09", phoneNumber: "567890123" },
        { userId: "user2345", userName: "Michał", userSurname: "Górecki", email: "michal.gorecki@example.com", createdAt: "2023-03-15", phoneNumber: "678901234" },
        { userId: "user3456", userName: "Katarzyna", userSurname: "Kaczmarek", email: "katarzyna.kaczmarek@example.com", createdAt: "2022-06-06", phoneNumber: "789012345" },
        { userId: "user4567", userName: "Dariusz", userSurname: "Michalski", email: "dariusz.michalski@example.com", createdAt: "2024-04-22", phoneNumber: "890123456" },
        { userId: "user5678", userName: "Natalia", userSurname: "Szymańska", email: "natalia.szymanska@example.com", createdAt: "2023-09-30", phoneNumber: "901234567" },
        { userId: "user6789", userName: "Łukasz", userSurname: "Czajkowski", email: "lukasz.czajkowski@example.com", createdAt: "2022-01-17", phoneNumber: "123456789" },
        { userId: "user7890", userName: "Emilia", userSurname: "Kozłowska", email: "emilia.kozlowska@example.com", createdAt: "2023-11-02", phoneNumber: "234567890" }
    ];
    const toast = useRef(null);
    const [deleteUserIndex ,setDeleteUserIndex] = useState("");
    const [checkedPassword, setCheckedPassword] = useState(true);
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState(Math.random().toString(36).slice(-8));
    const [editor, setEditor] = useState(false);
    useEffect(()=>{
        setPassword(checkedPassword ? Math.random().toString(36).slice(-8) : "") 
    }, [checkedPassword])

    const [error, setError] = useState("");
    const deleteUser = (name, surname) => {
        confirmDialog({
            group: 'headless',
            message: 'Usunąć użytkownika?',
            header: name + " " + surname,
            defaultFocus: 'accept',
        });
    };
    function deleteUserAcceppt(index) {
        console.log(`Delete user: ${index}` );
        setDeleteUserIndex("");
    }
    const date = new Date();    
    const zeroPadding = (num, digit) => {
        return num.toString().padStart(digit, '0');
    };
    const formattedDate = `${zeroPadding(date.getDate(), 2)}-${zeroPadding(date.getMonth() + 1, 2)}-${zeroPadding(date.getFullYear(), 4)}`;

    const fixedEmail = email.trim().toLowerCase();
    function isValidEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
      }
      const [visible, setVisible] = useState(false);
    const accept = () =>{
        console.log("Imię i Naziwsko:" + name + " " + surname + "\nEmail: " + fixedEmail+ "\nNr Telefonu: "+phone+"\nHasło: "+password+"\nData dodania: "+formattedDate);
            
        if(name !== "" && 
            surname !== "" && 
            email !== "" && 
            isValidEmail(fixedEmail) && 
            phone !== "" && 
            phone.length === 9 && 
            password !== ""){
            console.log("Imię i Naziwsko:" + name + " " + surname + "\nEmail: " + fixedEmail+ "\nNr Telefonu: "+phone+"\nHasło: "+password+"\nData dodania: "+formattedDate);
            setEditor(false);
            setVisible(true);

        } else {
            setError("Brakuje danych");
        }
    }
    const showSuccess = () => {
        toast.current.show({severity:'success', summary: 'Dodano użytkownika', detail:name + " " + surname, life: 3000});
    }
    const reset = () => {
        setName("");
        setSurname("");
        setEmail("");
        setPhone("");
        setPassword("");
        setCheckedPassword(true);
        setError("");
        setEditor(false);
    }
    const edit = (user) => {
        setEditor(true);
        setName(user.userName);
        setSurname(user.userSurname);
        setEmail(user.email);
        setPhone(user.phoneNumber);
        setPassword(checkedPassword ? Math.random().toString(36).slice(-8) : password)
        setError("");
    }
    const [userDataTable, setUserDataTable] = useState(userList);
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
            </div>
        )
        }

    const optionBodyTempalet = (rowData) => {
        return (
            <div className='itemTemplate-createdAt'>
                <Button icon="pi pi-trash" rounded text raised severity="danger" aria-label="Usuń użytkownika" onClick={(event) => {deleteUser(rowData.userName, rowData.userSurname); setDeleteUserIndex(rowData.userId)}}/>    
                <Button className='p-button-icon-only' icon="pi pi-pencil" rounded text raised aria-label="Edytuj użytkownika" onClick={(event) => {edit(rowData);}}/>
            </div>
        )
    }
    return (
        <div className='userAdd-container'>
            <Toast ref={toast} />
            {/* Dialog do usuwania użytkownika */}
            <ConfirmDialog
                group="headless"
                content={({ headerRef, contentRef, footerRef, hide, message }) => (
                    <div className="confirmDialog">
                        <div className="confirmDialog-header-icon">
                            <i className="pi pi-trash" style={{color: 'rgb(255, 255, 255)'}}></i>
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
                                    deleteUser(deleteUserIndex);
                                }}
                            ></Button>
                            <Button
                                label="Anuluj"
                                outlined
                                onClick={(event) => {
                                    hide(event);
                                    deleteUserAcceppt(deleteUserIndex);
                                }}
                            ></Button>
                        </div>
                    </div>
                )}
            />
            <div className='userAdd-container-left'>
                <h1 className='userAdd-container-left-header'>{!editor ? "Dodaj nowego użytkownika" : "Edytuj użytkownika"}</h1>
                {error.length > 0 ? <small style={{color: 'rgb(255, 0, 0)', fontWeight: '400', fontSize:'15px', margin: '-10px auto'}}>Brakuje danych</small> : null }
                <div className={error.length > 0 ? 'p-inputgroup flex-1 userAdd-container-left-invalid' : 'p-inputgroup flex-1'}>
                    <span className="p-inputgroup-addon">
                        <i className="pi pi-user"></i>
                    </span>
                    <InputText id="name"  value={name} placeholder="Imię" onChange={(e) => setName(e.target.value)} />
 
                </div>
                <div className={error.length > 0 ? 'p-inputgroup flex-1 userAdd-container-left-invalid' : 'p-inputgroup flex-1'}>
                    <span className="p-inputgroup-addon">
                        <i className="pi pi-user"></i>
                    </span>
                    <InputText id="surname" value={surname} placeholder="Naziwsko" onChange={(e) => setSurname(e.target.value)} />
                </div>
                <div className={error.length > 0 ? 'p-inputgroup flex-1 userAdd-container-left-invalid' : 'p-inputgroup flex-1'}>
                    <span className="p-inputgroup-addon">
                        <i className="pi pi-user"></i>
                    </span>
                    <InputText id="email" keyfilter="email" value={email} placeholder="E-mail" onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className={error.length > 0 ? 'p-inputgroup flex-1 userAdd-container-left-invalid' : 'p-inputgroup flex-1'}>
                    <span className="p-inputgroup-addon">
                        <i className="pi pi-user"></i>
                    </span>
                        <InputText id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Numer telefonu"/>
                </div>
                <div className={error.length > 0 ? 'p-inputgroup flex-1 userAdd-container-left-password userAdd-container-left-invalid' : 'p-inputgroup userAdd-container-left-password flex-1 '} >
                    <span className="p-inputgroup-addon">
                        <Checkbox checked={checkedPassword} onChange={(e) =>{setCheckedPassword(!checkedPassword)}} />
                    </span>
                        <InputText id="password" className={checkedPassword ? 'p-disabled' : null}  value={checkedPassword ? "Hasło generowane automatycznie" : password} placeholder='Hasło' onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div className='userAdd-container-left-button'>
                    <Button label="Zatwierdź" onClick={() => { accept() }}/>
                    <Button label="Anuluj" outlined onClick={() => { reset() }}/>
                </div>
            </div>
            <div className='userAdd-container-right'>
            <DataTable
                value={userDataTable}
                paginator
                rows={4}
                dataKey="userId"
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
                    style={{ width: "0.15rem" }}
                />
                <Column 
                    sortable
                    field="createdAt"
                    header="Data utworzenia"
                    style={{ width: "0.15rem" }}
                />
                <Column 
                    header="Opcje"
                    body={optionBodyTempalet}
                    style={{ width: "0.3rem" }}
                />
            </DataTable>
            </div>
            {/* Dialog ze szczegółami nowego użytkownika */}
            <Dialog header="Dane szczegółowe" visible={visible} draggable={false} resizable={false} style={{ width: '40vw' }} onHide={() => {setVisible(false); reset()}}>
              <div className='dialog-body'>
              <div>
                  <i className="pi pi-user" style={{ fontSize: '1.5rem' }}></i>
                  <p>{name}  {surname}</p>
                </div>
                <div>
                  <i className="pi pi-at" style={{ fontSize: '1.5rem' }}></i>
                  <p>E-mail:</p> 
                  <p>{email}</p>
                </div>
                <div>
                  <i className="pi pi-phone" style={{ fontSize: '1.5rem' }}></i>
                  <p>Numer telefonu: </p> 
                  <p>{phone}</p>
                </div>
                <div>
                  <i className="pi pi-phone" style={{ fontSize: '1.5rem' }}></i>
                  <p>Hasło: </p> 
                  <p>{password}</p>
                </div>
                <Button label="Save" icon="pi pi-check" severity="secondary" rounded onClick={() => {showSuccess(); setVisible(false); reset()}}/>
              </div>
          </Dialog>
        </div>
    );
};
