import '../../css/Tasks.css';
import '../../css/ConfirmDialog.css';
import 'primeicons/primeicons.css';
import { Button } from 'primereact/button';
import React, { useState, useLayoutEffect, useRef, useEffect} from 'react';
import { ConfirmDialog } from 'primereact/confirmdialog';
import { Toast } from 'primereact/toast';
import { useOutletContext } from "react-router-dom";
import TaskCard from './TaskCard';
import Loading  from './Loading';
import { acceptMemberTast, acceptFullTask } from '../../backend/TaskAction';
import { fetchTasksWithTeam } from "../../backend/TaskGet";
export default  function TaskList() {
const [user] = useOutletContext();
const toast = useRef(null);
const [isAdmin, setIsAdmin] = useState(false);
const [isProjectMenager,setIsProjectMenager ] = useState(false);
const [slide, setSlide] = useState(0);
const [animation, setAnimation] = useState('right');
const [taskCardLimit, setTaskCardLimit] = useState(3);
//Pobieranie zadań z bazy danych
const [sampleTasks, setTasks] = useState([]);
const [loading, setLoading] = useState(true);
useEffect(() => {
  if(user.role === 'Admin') {
    setIsAdmin(true);
  }
  if(user.role==='Project Menager') {
    setIsProjectMenager(true);
  }
  const loadData = async () => {
      if (!user.company) {
          return; // Poczekaj na załadowanie user.company
      }
      try {
          const data = await fetchTasksWithTeam(user.company, !isAdmin ? user.uid : null, false);
          setTasks(data);
      } catch (error) {
          console.error("Błąd podczas ładowania danych:", error);
      } finally {
          setLoading(false);
      }
  };

  loadData();
}, [user.uid, isAdmin, user.role, loading]); // Zależności: ładowanie zaktualizowanych danych po zmianie user.company lub user.uid



  useLayoutEffect(() => {
      function updateSize() {
          if(window.innerWidth >= 1900){
            setTaskCardLimit(4);
          } else if(window.innerWidth >= 1200){
            setTaskCardLimit(3);
          } else if(window.innerWidth >= 950){
            setTaskCardLimit(2);
          } else {
            setTaskCardLimit(1);
          }
    }
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);
  const nextSlide = () => {
    const nextSlide = slide >= (Math.ceil(sampleTasks.length / taskCardLimit) - 1) ? 0 : slide + 1;
    setSlide(nextSlide);
    setAnimation('right');
  }

  const prevSlide = () => {
    const prevSlide = slide === 0 ? (Math.ceil(sampleTasks.length / taskCardLimit) - 1) : slide - 1;
    setSlide(prevSlide);
    setAnimation('left');
  }

  const accept = (task) => {
    if(isAdmin || isProjectMenager) {
      if(acceptFullTask(user.company, task[1])) { setLoading(!loading); }
    } else {
      if(acceptMemberTast(user.company, task[1], user.uid)) { setLoading(!loading); }
    }
    toast.current.show({ severity: 'info', summary: 'Zatwierdzono', detail: task[0], life: 1500 });
  };
    if(loading) {
      return (
        <div>
          <Loading />
        </div>
      );
    }
    return (
        <div className="taskList">
          <Toast ref={toast} />
            <ConfirmDialog
                group="headless"
                content={({ headerRef, contentRef, footerRef, hide, message }) => (
                    <div className="confirmDialog">
                      
                        <div className="confirmDialog-header-icon">
                            <i className="pi pi-check" style={{color: 'rgb(255, 255, 255)'}}></i>
                        </div>
                        <span className="confirmDialog-header" ref={headerRef}>
                           <i> {message.header[0]} </i>
                        </span>
                        <p className="confirmDialog-message" ref={contentRef}>
                            {message.message}
                        </p>
                        <div className="confirmDialog-button" ref={footerRef}>
                            <Button
                                label="Zatwierdź"
                                onClick={(event) => {
                                    hide(event);
                                    accept(message.header);
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
            <ConfirmDialog group="delete" />
            <Button className="button button-next" onClick={prevSlide} icon="pi pi-angle-left"  rounded text raised severity="info" aria-label="Next Task" />
            <div className='taskList-cointainer'>
              {sampleTasks.map((task, index) => {
                const isStartOfNewGroup = index % taskCardLimit === 0;
                return (
                  isStartOfNewGroup ? (
                    <ul  className={ 
                      slide === (Math.floor(index / taskCardLimit)) ? `taskGroup taskGroup-visible-${animation}`: `taskGroup taskGroup-hidden-${animation}`
                    } key={`group-${index}`}>
                      {sampleTasks.slice(index, index + taskCardLimit).map((groupedTask, groupIndex) => (
                        <TaskCard
                          key={`task-${index + groupIndex}`}
                          task={groupedTask}
                          isAdmin = {isAdmin || isProjectMenager}
                          company = {user.company}
                        />
                      ))}
                    </ul >
                  ) : null
                );
              })}
            </div>
            <Button className="button button-next" onClick={nextSlide} icon="pi pi-angle-right"  rounded text raised severity="info" aria-label="Prev Task" />
        </div>
    );
    
}
