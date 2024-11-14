import '../../css/Tasks.css';
import 'primeicons/primeicons.css';
import { Button } from 'primereact/button';
import { useState, useLayoutEffect } from 'react';
export default function TaskList() {
  const sampleTasks = [
    {
      id: "task1",
      name: "Przygotowanie prezentacji dla klienta",
      deadline: "2024-11-08T00:00:00Z",
      description: "Przygotowanie materiałów i prezentacji na spotkanie z klientem.",
      team: [
        { userId: "user123", userName: "Jan", userSurname: "Kowalski", role: "Analityk" },
        { userId: "user456", userName: "Anna", userSurname: "Nowak", role: "Kierownik" }
      ]
    },
    {
      id: "task2",
      name: "Spotkanie z zespołem projektowym",
      deadline: "2024-11-09T00:00:00Z",
      description: "Omówienie postępu prac nad projektem oraz przyszłych kroków.",
      team: [
        { userId: "user789", userName: "Marta", userSurname: "Zalewska", role: "Koordynator" },
        { userId: "user101", userName: "Piotr", userSurname: "Wiśniewski", role: "Menadżer projektu" }
      ]
    },
    {
      id: "task3",
      name: "Weryfikacja dokumentów prawnych",
      deadline: "2024-11-10T00:00:00Z",
      description: "Sprawdzenie poprawności dokumentów prawnych przed podpisaniem umowy.",
      team: [
        { userId: "user123", userName: "Jan", userSurname: "Kowalski", role: "Prawnik" },
        { userId: "user456", userName: "Anna", userSurname: "Nowak", role: "Analityk" }
      ]
    },
    {
      id: "task4",
      name: "Zebranie danych finansowych na raport",
      deadline: "2024-11-12T00:00:00Z",
      description: "Zebranie i analiza danych finansowych niezbędnych do raportu kwartalnego.",
      team: [
        { userId: "user789", userName: "Marta", userSurname: "Zalewska", role: "Analityk" },
        { userId: "user101", userName: "Piotr", userSurname: "Wiśniewski", role: "Finansista" }
      ]
    },
    {
      id: "task5",
      name: "Przygotowanie oferty dla nowego klienta",
      deadline: "2024-11-13T00:00:00Z",
      description: "Przygotowanie spersonalizowanej oferty dla potencjalnego klienta.",
      team: [
        { userId: "user123", userName: "Jan", userSurname: "Kowalski", role: "Kierownik sprzedaży" },
        { userId: "user456", userName: "Anna", userSurname: "Nowak", role: "Specjalista ds. sprzedaży" }
      ]
    },
    {
      id: "task6",
      name: "Zorganizowanie spotkania z partnerami biznesowymi",
      deadline: "2024-11-15T00:00:00Z",
      description: "Koordynacja spotkania z kluczowymi partnerami biznesowymi.",
      team: [
        { userId: "user789", userName: "Marta", userSurname: "Zalewska", role: "Manager" },
        { userId: "user123", userName: "Jan", userSurname: "Kowalski", role: "Koordynator" }
      ]
    },
    {
      id: "task7",
      name: "Testowanie aplikacji mobilnej",
      deadline: "2024-11-16T00:00:00Z",
      description: "Przeprowadzenie testów aplikacji mobilnej przed jej premierą.",
      team: [
        { userId: "user456", userName: "Anna", userSurname: "Nowak", role: "Tester" },
        { userId: "user101", userName: "Piotr", userSurname: "Wiśniewski", role: "Developer" }
      ]
    },
    {
      id: "task8",
      name: "Opracowanie strategii marketingowej",
      deadline: "2024-11-17T00:00:00Z",
      description: "Stworzenie kompleksowej strategii marketingowej na nowy produkt.",
      team: [
        { userId: "user123", userName: "Jan", userSurname: "Kowalski", role: "Specjalista ds. marketingu" },
        { userId: "user789", userName: "Marta", userSurname: "Zalewska", role: "Kierownik marketingu" }
      ]
    },
    {
      id: "task9",
      name: "Aktualizacja strony internetowej",
      deadline: "2024-11-18T00:00:00Z",
      description: "Przeprowadzenie aktualizacji i optymalizacji strony internetowej.",
      team: [
        { userId: "user101", userName: "Piotr", userSurname: "Wiśniewski", role: "Webmaster" },
        { userId: "user123", userName: "Jan", userSurname: "Kowalski", role: "Content Manager" }
      ]
    },
    {
      id: "task10",
      name: "Audyt bezpieczeństwa danych",
      deadline: "2024-11-22T00:00:00Z",
      description: "Przeprowadzenie audytu wewnętrznego w celu oceny bezpieczeństwa danych.",
      team: [
        { userId: "user456", userName: "Anna", userSurname: "Nowak", role: "Audytor" },
        { userId: "user789", userName: "Marta", userSurname: "Zalewska", role: "Specjalista ds. IT" }
      ]
    },
    {
      id: "task11",
      name: "Przygotowanie raportu rocznego",
      deadline: "2024-11-25T00:00:00Z",
      description: "Zebranie i przygotowanie danych do raportu rocznego firmy.",
      team: [
        { userId: "user123", userName: "Jan", userSurname: "Kowalski", role: "Analityk finansowy" },
        { userId: "user456", userName: "Anna", userSurname: "Nowak", role: "Specjalista ds. raportów" }
      ]
    },
    {
      id: "task12",
      name: "Udoskonalenie procesu sprzedaży",
      deadline: "2024-11-28T00:00:00Z",
      description: "Opracowanie usprawnień w procesie sprzedaży na podstawie analiz rynkowych.",
      team: [
        { userId: "user101", userName: "Piotr", userSurname: "Wiśniewski", role: "Specjalista ds. sprzedaży" },
        { userId: "user789", userName: "Marta", userSurname: "Zalewska", role: "Menadżer sprzedaży" }
      ]
    },
    {
      id: "task13",
      name: "Przygotowanie prezentacji dla PM",
      deadline: "2024-11-30T00:00:00Z",
      description: "Przygotowanie materiałów i prezentacji na spotkanie z PM.",
      team: [
        { userId: "user123", userName: "Jan", userSurname: "Kowalski", role: "Analityk" },
        { userId: "user456", userName: "Anna", userSurname: "Nowak", role: "Kierownik" }
      ]
    },
  ];
  const [slide, setSlide] = useState(0);
  const [taskCardLimit, setTaskCardLimit] = useState(3);
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
    setSlide(slide >= (Math.ceil(sampleTasks.length / taskCardLimit) - 1) ? 0 : slide + 1);
  }
  const prevSlide = () => {
    setSlide(slide === 0 ? (Math.ceil(sampleTasks.length / taskCardLimit) - 1) : slide - 1 );
  }
    return (
        <div className="taskList">
            <Button className="button button-next" onClick={prevSlide} icon="pi pi-angle-left"  rounded text raised severity="info" aria-label="Next Task" />
            <div className='taskList-cointainer'>
              {sampleTasks.map((task, index) => {
                const isStartOfNewGroup = index % taskCardLimit === 0;
                return (
                  isStartOfNewGroup ? (
                    <div className={ 
                      slide === (Math.floor(index / taskCardLimit)) ? "taskGroup taskGroup-visible": "taskGroup taskGroup-hidden"
                    } key={`group-${index}`}>
                      {sampleTasks.slice(index, index + taskCardLimit).map((groupedTask, groupIndex) => (
                        <TaskCard
                          key={`task-${index + groupIndex}`}
                          task={groupedTask}
                        />
                      ))}
                    </div>
                  ) : null
                );
              })}
            </div>
            <Button className="button button-next" onClick={nextSlide} icon="pi pi-angle-right"  rounded text raised severity="info" aria-label="Prev Task" />
        </div>
    );
    
}

function TaskCard({task, nameOfClass, indexTask}){
  const now = new Date();
  const dueDate = new Date(task.deadline);
  const timeDiff = dueDate - now;
  const daysRemaining = Math.ceil(timeDiff / (1000 * 3600 * 24));
  let deadlineClass = '';
  if (daysRemaining <= 3) {
    deadlineClass = 'deadline-3day';
  } else if (daysRemaining <= 7) {
    deadlineClass = 'deadline-7day';
  } else {
    deadlineClass = 'deadline-moreThanWeek';
  }
  return(
    <div className={`taskCard ${deadlineClass}`}>
      <h3 className="taskCard-name">{task.name} </h3>
      <p className="taskCard-deadline">Deadline: {new Date(task.deadline).toLocaleDateString()}</p>
      <p className="taskCard-description">{task.description.length > 0 ? task.description : null}</p>
      <div className="taskCard-team">
        <h4> <i className="pi pi-users taskCard-team-icon" style={{ fontSize: '1.5rem'}}></i> Zespół:</h4>
        <ul>
          {task.team.map((member, index)=> (
            <li key={index}>{member.userName} {member.userSurname} - {member.role}.</li>
            ))}
        </ul>
      </div>
    </div>
  )
}