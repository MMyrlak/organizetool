import React, { useState, useRef, useEffect } from 'react';
import { FloatLabel } from 'primereact/floatlabel';
import { InputText } from 'primereact/inputtext';
import { Calendar } from 'primereact/calendar';
import { MultiSelect } from 'primereact/multiselect';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import '../../css/TaskAdd.css';
import TaskCard from './TaskCard';
import { useLocation, useNavigate, useOutletContext } from 'react-router-dom';
import Loading from './Loading';

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
    role: "User",
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
    role: "Manager",
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
    role: "User",
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
    role: "User",
    surname: "Wójcik",
    toRemove: true,
    uid: "mN1bV2cC3xZ4aA5sS6dD7fF8gG9h",
    userName: "Katarzyna",
    userSurname: "Wójcik"
  }
];


export default function TaskAdd() {
  const [user] = useOutletContext();
  const [loader, setLoader] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.role === "Pracownik") {
      navigate('/error-page');
    } else {
      setTimeout(() => {
         setLoader(false);
      }, 500);
    }
  }, [user?.role, navigate]);

  const locationTask = useLocation();
  const [userList, setUserList] = useState([]);

  let minDate = new Date();

  useEffect(() => {
    setUserList(DEMO_USER_LIST);
  }, []);

  const updatedUserList = userList.map(user => ({
    ...user,
    fullName: `${user.userName} ${user.userSurname}`
  }));

  const [name, setName] = useState(locationTask.state ? locationTask.state.name : '');
  const [deadline, setDeadline] = useState(locationTask.state && locationTask.state.deadline?.seconds ? new Date(locationTask.state.deadline.seconds * 1000) : null);
  const [description, setDescription] = useState(locationTask.state ? locationTask.state.description : '');
  const [team, setTeam] = useState(locationTask.state ? locationTask.state.team : []);
  const [id, setId] = useState(locationTask.state ? locationTask.state.id : '');
  const toast = useRef(null);

  function accept() {
    console.log("DEMO: Zapisywanie zadania...", { name, deadline, description, team, id });
    toast.current.show({ severity: 'success', summary: 'Sukces (Demo)', detail: `Zadanie "${name}" zostało utworzone w pamięci lokalnej.`, life: 3000 });
    reset();
  }

  function reset() {
    setName("");
    setDeadline("");
    setDescription("");
    setTeam([]);
  }

  const removeFromTeam = (index) => {
    setTeam([
      ...team.slice(0, index),
      ...team.slice(index + 1)
    ]);
  }

  if (loader) {
    return (
      <div>
        <Loading />
      </div>
    );
  }

  return (
    <div className='taskAdd-container'>
      <Toast ref={toast} />
      <div className='taskAdd-container-body'>
        <div className='taskAdd-container-body-inputPanel'>
          <div className='taskAdd-container-body-inputPanel-left'>
            <FloatLabel className='taskAdd-container-body-inputPanel-input'>
              <InputText id="name" value={name} onChange={(e) => setName(e.target.value)} />
              <label htmlFor="name">Nazwa zadania</label>
            </FloatLabel>
            <FloatLabel className='taskAdd-container-body-inputPanel-input'>
              <Calendar hourFormat="24" inputId="deadline" value={deadline} onChange={(e) => setDeadline(e.value)} minDate={minDate} dateFormat="dd.mm.yy" />
              <label htmlFor="deadline">Deadline</label>
            </FloatLabel>
            <FloatLabel className='taskAdd-container-body-inputPanel-input'>
              <InputText id="description" value={description} onChange={(e) => setDescription(e.target.value)} />
              <label htmlFor="description">Opis Zadania</label>
            </FloatLabel>
            <FloatLabel className='taskAdd-container-body-inputPanel-input'>
              <MultiSelect value={team} onChange={(e) => setTeam(e.target.value)} options={updatedUserList} optionLabel="fullName" maxSelectedLabels={3} filter />
              <label htmlFor="ms-cities">Wybór zespołu</label>
            </FloatLabel>
          </div>
          <div className='taskAdd-container-body-inputPanel-right'>
            <p>Wprowadzanie roli użytkowników</p>
            <div className='taskAdd-container-body-inputPanel-right-userPanel'>
              {team ? team.map((user, index) => {
                return (
                  <div className='taskAdd-container-body-inputPanel-input-team' key={index}>
                    <div className='taskAdd-container-body-inputPanel-input-team-label'>
                      <label htmlFor={`name-${index}`}>{user.userName} {user.userSurname}</label>
                      <InputText id={`name-${index}`} value={user.taskRole || ""} onChange={(e) => {
                        const updatedTeam = [...team];
                        updatedTeam[index] = { ...updatedTeam[index], taskRole: e.target.value };
                        setTeam(updatedTeam);
                      }} />
                    </div>
                    <Button className="taskAdd-container-body-inputPanel-input-team-button"
                      icon="pi pi-times"
                      rounded text
                      severity="danger"
                      aria-label="Cancel"
                      size="small"
                      onClick={() => removeFromTeam(index)} />
                  </div>
                )
              }) : null}
            </div>
          </div>
        </div>
        <div className='taskAdd-container-body-card'>
          <TaskCard task={{
            name: name,
            deadline: deadline ? Date.parse(deadline) : null,
            description: description,
            team: team,
          }} />
        </div>
      </div>
      <div className='taskAdd-container-button'>
        <Button label="Zatwierdź" onClick={() => { accept() }} />
        <Button label="Anuluj" outlined onClick={() => { reset() }} />
      </div>
    </div>
  );
};