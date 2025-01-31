import '../../css/TasksCard.css';
import { Button } from 'primereact/button';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { Dialog } from 'primereact/dialog';
import { Toast } from 'primereact/toast';
import React, { useState, useRef  } from 'react';
import 'primeicons/primeicons.css';
import { Link } from 'react-router-dom';
import { deleteTaskAction } from '../../backend/TaskAction';
export default function TaskCard({task, isAdmin, company}){
  const toast = useRef(null);
    const now = new Date();
    const dueDate = task.deadline
      ? task.deadline.toDate 
          ? task.deadline.toDate() 
          : new Date(task.deadline)
      : null; // Konwersja Timestamp na Date
    const deadlineDate = dueDate ? dueDate.toLocaleDateString() : null;
    const timeDiff = dueDate - now;
    const daysRemaining = Math.ceil(timeDiff / (1000 * 3600 * 24));
    let deadlineClass = '';
    let daysRemainingText = '';
    let daysRemainingClass = '';
    console.log(task.name, daysRemaining);
    if (daysRemaining < 0) {
      deadlineClass = 'deadline-0day';
      daysRemainingClass = 'daysRemaining-0day';
      daysRemainingText = 'Zadanie zaległe';
    } else if (daysRemaining === 0) {
      deadlineClass = 'deadline-1day';
      daysRemainingClass = 'daysRemaining-1day';
      daysRemainingText = 'Do dzisiaj';
    } else {
      deadlineClass = daysRemaining <= 3 ? 'deadline-3day' : daysRemaining <= 7 ? 'deadline-7day' : 'deadline-moreThanWeek';
      daysRemainingClass = daysRemaining <= 3 ? 'daysRemaining-3day' : daysRemaining <= 7 ? 'daysRemaining-7day' : 'daysRemaining-moreThanWeek';
      daysRemainingText = daysRemaining === 1 ? `Do jutra` : `Do zakończenia zostało: ${daysRemaining} dni`;
    }
  
    const confirmTask = () => {
      confirmDialog({
          group: 'headless',
          message: 'Zakończyć zadanie?',
          header: [task.name, task.id],
          defaultFocus: 'accept',
      });
  };
  
  const [visible, setVisible] = useState(false);
  const [dialogData, setDialogData] = useState({ email: '', phone: '', name: '', surname: '' });
  function openDialog(email, phone, name, surname){
        setDialogData({ email, phone, name, surname });
        setVisible(true);
  }
  const accept = () => {
    deleteTaskAction(task.id, company);
    toast.current.show({ severity: 'info', summary: 'Potwierdzono', detail: 'Usunąłeś zadanie', life: 3000 });
  }
  const reject = () => {
    toast.current.show({ severity: 'warn', summary: 'Anulowano', detail: 'Anulowałeś usunięcie zadania', life: 3000 });
}; 
  const showTemplateDelete = () => {
    confirmDialog({
        group: 'delete',
        header: 'Potwierdzenie',
        message: (
            <div className="flex flex-column align-items-center w-full gap-3 border-bottom-1 surface-border">
                <i className="pi pi-exclamation-circle text-6xl text-primary-500"></i>
                <span>Potwierdź, aby kontynuować</span>
            </div>
        ),
        accept,
        reject
    });

};

    return(
      <li className={`taskCard ${deadlineClass}`}>
          <div className={`taskCard-daysRemaining ${daysRemainingClass}`}>{daysRemainingText}</div>
        <h3 className="taskCard-name"> {task.name} </h3>
        <p className="taskCard-deadline">Deadline: {deadlineDate}</p>
        {task.description ? <p className="taskCard-description">{task.description.length > 0 ? task.description : null}</p> : null}
        <div className="taskCard-team">
          <h4> <i className="pi pi-users taskCard-team-icon" style={{ fontSize: '1.5rem'}}></i> Zespół:</h4>
            <div className='taskCard-team-body'>
            {task.team.length > 0 ? task.team.map((member, index)=> (
              <div onClick={() => {openDialog(member.email, member.phoneNumber, member.userName, member.userSurname)}} className={member.complete ? "taskCard-member complete" : "taskCard-member noComplete"} key={index}>{member.userName} {member.userSurname} - {member.taskRole ? member.taskRole.toLowerCase() : ''} </div> 
              )) : null}
              </div>
        </div>
        <div className='taskCard-button'>
          <Button onClick={confirmTask} icon="pi pi-check" label="Zakończ zadanie" className="button-taskCard" />   
          {isAdmin ? <Link to={'/taskAdd'} state={task} className='button-taskCard-round'>  
              <Button className='p-button-icon-only' severity="warning" icon="pi pi-pencil" rounded text raised aria-label="Edytuj zadanie"/>
          </Link>  
          : null} 
          { isAdmin ? <Button className='p-button-icon-only button-taskCard-round' icon="pi pi-trash" rounded text raised severity="danger" aria-label="Usuń zadanie" onClick={(event) => {showTemplateDelete(); }} /> : null}   
        </div>
        <Toast ref={toast} />
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