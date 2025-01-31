import React, { useState, useRef, useEffect} from 'react';
import { FloatLabel } from 'primereact/floatlabel';
import { InputText } from 'primereact/inputtext';
import { Calendar } from 'primereact/calendar';
import { MultiSelect } from 'primereact/multiselect';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import '../../css/TaskAdd.css'
import TaskCard from './TaskCard';
import { useLocation, useNavigate } from 'react-router-dom';
import { useOutletContext } from "react-router-dom";
import { TaskAddAction } from '../../backend/TaskAction';
import { getUser } from '../../backend/UserAction';
import Loading  from './Loading';
export default function TaskAdd(){
  const [user] = useOutletContext();
  const [loader, setLoader] = useState(true);
  const navigate = useNavigate();
    useEffect(() => {
            if (user.role === "Pracownik") {
                navigate('/error-page');
            } else {
                setLoader(false);
            }
        }, [user.role, navigate]);
    const locationTask = useLocation();
    const [userList, setUserList] = useState([]);
    let minDate = new Date();
    useEffect(() => {
      const loadData = async () => {
          if (!user.company) {
              return; // Poczekaj na załadowanie user.company
          }
          try {
              const data = await getUser(user.company);
              setUserList(data);
          } catch (error) {
              console.error("Błąd podczas ładowania danych:", error);
          } 
      };
      loadData();
    }, [user.company]);
    const updatedUserList = userList.map(user => ({
      ...user,
      fullName: `${user.userName} ${user.userSurname}`
        }));
    const [name, setName] = useState(locationTask.state ? locationTask.state.name : '');
    const [deadline, setDeadline] = useState(locationTask.state && locationTask.state.deadline.seconds ? new Date(locationTask.state.deadline.seconds * 1000) : null);
    const [description, setDescription] = useState(locationTask.state ? locationTask.state.description : '');
    const [team, setTeam] = useState(locationTask.state ? locationTask.state.team : []);
    const [id, setId] = useState(locationTask.state ? locationTask.state.id : '');
   const toast = useRef(null);
   function accept(){
    TaskAddAction(name,deadline,description, team, id, user.company);
    toast.current.show({ severity: 'info', summary: 'Zatwierdzono', detail: name, life: 1500 })
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
   if(loader) {
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
                    <Calendar hourFormat="24" inputId="deadline" value={deadline} onChange={(e) => setDeadline(e.value)} minDate={minDate} dateFormat="dd.mm.yy"   />
                    <label htmlFor="deadline">Deadline</label>
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
                            <InputText id={`name-${index}`} value={user.taskRole || ""} onChange={(e) => {
                              const updatedTeam = [...team];
                              updatedTeam[index] = {...updatedTeam[index], taskRole: e.target.value};
                              setTeam(updatedTeam);
                              console.log(team);
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
                              deadline: Date.parse(deadline),
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