import '../../css/TasksCard.css';
import { Button } from 'primereact/button';
import { confirmDialog } from 'primereact/confirmdialog';
import { Dialog } from 'primereact/dialog';
import { useState } from 'react';
import 'primeicons/primeicons.css';
import { Link } from 'react-router-dom';
export default function TaskCard({task, isAdmin}){
    const now = new Date();
    const dueDate = new Date(task.deadline);
    const timeDiff = dueDate - now;
    const daysRemaining = Math.ceil(timeDiff / (1000 * 3600 * 24));
    let deadlineClass = '';
    if(daysRemaining <= 0){
      deadlineClass = 'deadline-0day';
    } else if (daysRemaining <= 3) {
      deadlineClass = 'deadline-3day';
    } else if (daysRemaining <= 7) {
      deadlineClass = 'deadline-7day';
    } else {
      deadlineClass = 'deadline-moreThanWeek';
    }
  
    const confirmTask = () => {
      confirmDialog({
          group: 'headless',
          message: 'Zakończyć zadanie?',
          header: task.name,
          defaultFocus: 'accept',
      });
  };
  
  const [visible, setVisible] = useState(false);
  const [dialogData, setDialogData] = useState({ email: '', phone: '', name: '', surname: '' });
  function openDialog(email, phone, name, surname){
        setDialogData({ email, phone, name, surname });
        setVisible(true);
  }
    return(
      <li className={`taskCard ${deadlineClass}`}>
        <h3 className="taskCard-name">{task.name} </h3>
        <p className="taskCard-deadline">Deadline: {new Date(task.deadline).toLocaleDateString()}</p>
        {task.description ? <p className="taskCard-description">{task.description.length > 0 ? task.description : null}</p> : null}
        <div className="taskCard-team">
          <h4> <i className="pi pi-users taskCard-team-icon" style={{ fontSize: '1.5rem'}}></i> Zespół:</h4>
            <div className='taskCard-team-body'>
            {task.team.length > 0 ? task.team.map((member, index)=> (
              <div onClick={() => {openDialog(member.email, member.phone, member.userName, member.userSurname)}} className={member.complete ? "taskCard-member complete" : "taskCard-member noComplete"} key={index}>{member.userName} {member.userSurname} - {member.role ? member.role.toLowerCase() : ''} </div> 
              )) : null}
              </div>
        </div>
        <div className='taskCard-button'>
          <Button onClick={confirmTask} icon="pi pi-check" label="Zakończ zadanie" className="button-taskCard" />   
          {isAdmin ? <Link to={'/taskAdd'} state={task}>
            <Button onClick={confirmTask} icon="pi pi-pencil" label="Edytuj zadanie" className="button-taskCard" style={{height:"100%"}}/>   
                     </Link>  : null}   
        </div>

        <Dialog header="Dane szczegółowe" visible={visible} draggable={false} resizable={false} style={{ width: '40vw' }} onHide={() => setVisible(false)}>
              <div className='dialog-body'>
              <div>
                  <i className="pi pi-user" style={{ fontSize: '1.5rem' }}></i>
                  <p>{dialogData.name}  {dialogData.surname}</p>
                </div>
                <div>
                  <i className="pi pi-at" style={{ fontSize: '1.5rem' }}></i>
                  <p>E-mail:</p> 
                  <p>{dialogData.email}</p>
                </div>
                <div>
                  <i className="pi pi-phone" style={{ fontSize: '1.5rem' }}></i>
                  <p>Numer telefonu: </p> 
                  <p>{dialogData.phone}</p>
                </div>
              </div>
          </Dialog>
      </li>
    )
  }