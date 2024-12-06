import React, { useState, useRef } from 'react';
import { FloatLabel } from 'primereact/floatlabel';
import { InputText } from 'primereact/inputtext';
import { Calendar } from 'primereact/calendar';
import { MultiSelect } from 'primereact/multiselect';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import '../../css/TaskAdd.css'
import TaskCard from './TaskCard';
import { useLocation } from 'react-router-dom';
export default function TaskAdd(){
    const locationTask = useLocation();
    if(locationTask.state) console.log(locationTask.state.name);
    let minDate = new Date();
    const userList = [
      { userId: "user123", userName: "Jan", userSurname: "Kowalski"},
      { userId: "user456", userName: "Anna", userSurname: "Nowak"},
      { userId: "user101", userName: "Piotr", userSurname: "Wiśniewski"},
      { userId: "user789", userName: "Marta", userSurname: "Zalewska"},
      { userId: "user234", userName: "Kamil", userSurname: "Nowicki" },
      { userId: "user345", userName: "Ewa", userSurname: "Wojciechowska" },
      { userId: "user456", userName: "Rafał", userSurname: "Zieliński" },
      { userId: "user567", userName: "Karolina", userSurname: "Jankowska" },
      { userId: "user678", userName: "Tomasz", userSurname: "Dąbrowski" },
      { userId: "user789", userName: "Agnieszka", userSurname: "Piotrowska" },
      { userId: "user890", userName: "Paweł", userSurname: "Grabowski" },
      { userId: "user901", userName: "Monika", userSurname: "Sikorska" },
      { userId: "user012", userName: "Grzegorz", userSurname: "Ostrowski" },
      { userId: "user1234", userName: "Joanna", userSurname: "Adamczyk" },
      { userId: "user2345", userName: "Michał", userSurname: "Górecki" },
      { userId: "user3456", userName: "Katarzyna", userSurname: "Kaczmarek" },
      { userId: "user4567", userName: "Dariusz", userSurname: "Michalski" },
      { userId: "user5678", userName: "Natalia", userSurname: "Szymańska" },
      { userId: "user6789", userName: "Łukasz", userSurname: "Czajkowski" },
      { userId: "user7890", userName: "Emilia", userSurname: "Kozłowska" }
    ]
    const updatedUserList = userList.map(user => ({
      ...user,
      fullName: `${user.userName} ${user.userSurname}`
        }));
    const [name, setName] = useState(locationTask.state ? locationTask.state.name : '');
    const [deadline, setDeadline] = useState(locationTask.state ? locationTask.state.deadline : '');
    const [description, setDescription] = useState(locationTask.state ? locationTask.state.description : '');
    const [team, setTeam] = useState(locationTask.state ? locationTask.state.team : []);
    console.log(deadline);
   const toast = useRef(null);
   function accept(){
    toast.current.show({ severity: 'info', summary: 'Zatwierdzono', detail: name, life: 1500 });
    reset();
   };
   function reset(){
    setName("");
    setDeadline("");
    setDescription("");
    setTeam([]);
   }
   const removeFromTeam = (index) => {
      setTeam([
        ...team.slice(0,index),
        ...team.slice(index+1)
      ]);
      
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
                    <Calendar inputId="deadline" value={deadline} minDate={minDate} dateFormat="dd.mm.yy" onChange={(e) => setDeadline(e.target.value)} />
                    <label htmlFor="birth_date">Deadline</label>
                  </FloatLabel>
                  <FloatLabel className='taskAdd-container-body-inputPanel-input'>
                    <InputText id="name" value={description} onChange={(e) => setDescription(e.target.value)} resizable={false}/>
                    <label htmlFor="name">Opis Zadania</label>
                  </FloatLabel>
                  <FloatLabel className='taskAdd-container-body-inputPanel-input'>
                    <MultiSelect value={team} onChange={(e) => setTeam(e.target.value)} options={updatedUserList} optionLabel="fullName" maxSelectedLabels={3} filter  />
                    <label htmlFor="ms-cities">Wybór zespołu</label>
                  </FloatLabel>
                </div>
                <div className='taskAdd-container-body-inputPanel-right'>
                  <p>Wporwadzanie roli użytkowników</p>
                  <div className='taskAdd-container-body-inputPanel-right-userPanel'>
                    {team ? team.map((user, index) => {
                      return(
                        <div className='taskAdd-container-body-inputPanel-input-team'>
                          <div className='taskAdd-container-body-inputPanel-input-team-label'> 
                            <label htmlFor={`name-${index}`}>{user.userName} {user.userSurname}</label>
                            <InputText id={`name-${index}`} value={user.role || ""} onChange={(e) => {
                              const updatedTeam = [...team];
                              updatedTeam[index] = {...updatedTeam[index], role: e.target.value};
                              setTeam(updatedTeam);
                            }} />
                          </div>
                          <Button className="taskAdd-container-body-inputPanel-input-team-button" 
                                  icon="pi pi-times" 
                                  rounded text 
                                  severity="danger" 
                                  aria-label="Cancel" 
                                  size="small"
                                  onClick={(event) => removeFromTeam(index)}/>
                        </div>
                        )
                      }) : null}
                  </div>
                </div>
              </div>
              <div className='taskAdd-container-body-card'>
                <TaskCard task={{
                              name: name,
                              deadline: deadline,
                              description: description,
                              team: team,
                            }}/>
              </div>
            </div>
            <div className='taskAdd-container-button'>
                  <Button label="Zatwierdź" onClick={() => { accept() }}/>
                  <Button label="Anuluj" outlined onClick={() => { reset() }}/>
            </div>
        </div>
    );
};