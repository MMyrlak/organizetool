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
import { saveUser, editUser, getUser, deleteUserAction } from "../../backend/UserAction";
import Loading  from './Loading';


export default function UserAdd(){
    const [user] = useOutletContext();
    const [loader, setLoader] = useState(true);
    const navigate = useNavigate();
    useEffect(() => {
        if (user.role !== "Admin") {
            navigate('/error-page');
        } else {
            setLoader(false);
        }
    }, [user.role, navigate]);
    const [userList, setUserList] = useState([]);
    const toast = useRef(null);
    const [deleteUserIndex ,setDeleteUserIndex] = useState("");
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
    //Pobieranie z bazy użytkowników, którzy należą do zmiennej user.company
    useEffect(() => {
        const loadData = async () => {
            if (!user.company) {
                return; // Poczekaj na załadowanie user.company
            }
            try {
                const data = await getUser(user.company);
                setUserList(data);
                setLoader(false);
            } catch (error) {
                console.error("Błąd podczas ładowania danych:", error);
            } 
        };
        loadData();
      }, [user.company, loader]);
    const randomPassword = () => {
        setPassword(checkedPassword ? Math.random().toString(36).slice(-8) : "")
    }   
    useEffect(()=>{
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
        deleteUserAction(index);
        setLoader(!loader);
        setDeleteUserIndex("");
    } 
    const fixedEmail = email.trim().toLowerCase();
    function isValidEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
      }
    const accept = () =>{
        if(!editor) randomPassword();
        if(name === "") { return setError("Brakuje imienia");};
        if(surname === "") { return setError("Brakuje nazwiska");};
        if(!isValidEmail(fixedEmail)) { return setError("Błędny email");};
        if(role === "") { return setError("Brakuje roli");};
        if(phone === "") { return setError("Brakuje numeru telefonu");};
        if(phone.length !== 9) { return setError("Błędna długość numeru");};
        if(password === "") { return setError("Brakuje hasła");};
        if(password.length < 6 ) { return setError("Hasło powinno mieć co najmniej 6 znaków");};

        setPassword(password);
        return setVisible(true);
    }
    const showSuccess = () => {
        if(editor){
            if(!editUser(name,surname,phone,role,id)){
                setError("Nie zedytowno użytkownika");
            } else {
                toast.current.show({severity:'success', summary: 'Dodano użytkownika', detail:name + " " + surname, life: 3000});
                setLoader(!loader);
            }
        } else {
            if(!saveUser(name,surname,email,phone,role,password,user.company)){
                setError("Nie dodano użytkownika");
            }else {
                toast.current.show({severity:'success', summary: 'Dodano użytkownika', detail:name + " " + surname, life: 3000});
                setLoader(!loader);
            }
        };
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
            const timestamp = rowData.createdAt.seconds; // Jeśli `createdAt` jest obiektem timestamp z Firestore, weź `seconds`
        
            const convertTimestampToDate = (timestamp) => {
                const date = new Date(timestamp * 1000); // Przemnóż przez 1000, bo timestamp jest w sekundach
                const day = String(date.getDate()).padStart(2, '0'); // Dodaj 0 przed dniem, jeśli jednocyfrowy
                const month = String(date.getMonth() + 1).padStart(2, '0'); // Dodaj 0 przed miesiącem, jeśli jednocyfrowy
                const year = date.getFullYear();
                return `${day}.${month}.${year}`; // Zwróć datę w formacie DD.MM.YYYY
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
                <Button icon="pi pi-trash" rounded text raised severity="danger" aria-label="Usuń użytkownika" onClick={(event) => {deleteUser(rowData.userName, rowData.userSurname); setDeleteUserIndex(rowData.id)}}/>    
                <Button className='p-button-icon-only' icon="pi pi-pencil" rounded text raised aria-label="Edytuj użytkownika" onClick={(event) => {edit(rowData);}}/>
            </div>
        )
    }
    if(loader) {
        return (
          <div>
            <Loading />
          </div>
        );
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
                {error.length > 0 ? <small style={{color: 'rgb(255, 0, 0)', fontWeight: '400', fontSize:'15px', margin: '-10px auto'}}>{error}</small> : null }
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
                {editor ?  null : <div className={error.length > 0 ? 'p-inputgroup flex-1 userAdd-container-left-invalid' : 'p-inputgroup flex-1'}>
                    <span className="p-inputgroup-addon">
                        <i className="pi pi-user"></i>
                    </span>
                    <InputText id="email" keyfilter="email" value={email} placeholder="E-mail" onChange={(e) => setEmail(e.target.value)} />
                </div>}
                <div className={error.length > 0 ? 'p-inputgroup flex-1 userAdd-container-left-invalid' : 'p-inputgroup flex-1'}>
                    <span className="p-inputgroup-addon">
                        <i className="pi pi-user"></i>
                    </span>
                    <Dropdown value={role} onChange={(e) => setRole(e.value)} options={roleTemplate} optionLabel="name" optionValue="name"
                        placeholder="Wybierz role" /> 
                        </div>
                <div className={error.length > 0 ? 'p-inputgroup flex-1 userAdd-container-left-invalid' : 'p-inputgroup flex-1'}>
                    <span className="p-inputgroup-addon">
                        <i className="pi pi-user"></i>
                    </span>
                    <InputText id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Numer telefonu"/>
                </div>
                {editor ?  null : <div className={error.length > 0 ? 'p-inputgroup flex-1 userAdd-container-left-password userAdd-container-left-invalid' : 'p-inputgroup userAdd-container-left-password flex-1 '} >
                    <span className="p-inputgroup-addon">
                        <Checkbox checked={checkedPassword} onChange={(e) =>{setCheckedPassword(!checkedPassword)}} />
                    </span>
                        <InputText id="password" className={checkedPassword ? 'p-disabled' : null}  value={checkedPassword ? "Hasło generowane automatycznie" : password} placeholder='Hasło' onChange={(e) => setPassword(e.target.value)} />
                </div>}
                <div className='userAdd-container-left-button'>
                    <Button label="Zatwierdź" onClick={() => { accept() }}/>
                    <Button label="Anuluj" outlined onClick={() => { reset() }}/>
                </div>
            </div>
            <div className='userAdd-container-right'>
             {loader ? <Loading /> : <DataTable
                value={userList}
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
                    style={{ width: "0.13rem" }}
                />
                <Column 
                    sortable
                    field="createdAt"
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
            {/* Dialog ze szczegółami nowego/edytowanego użytkownika */}
            <Dialog header="Dane szczegółowe" visible={visible} draggable={false} resizable={false} style={{ width: '40vw' }} onHide={() => {setVisible(false); reset()}}>
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
                  <i className="pi pi-phone" style={{ fontSize: '1.5rem' }}></i>
                  <p>Hasło: </p> 
                  <p> {password} </p>
                </div>}
                <Button label="Save" icon="pi pi-check" severity="secondary" rounded onClick={() => {showSuccess(); setVisible(false); reset() }}/>
              </div>
          </Dialog>
        </div>
    );
};
