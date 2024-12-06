import '../../css/Tasks.css';
import '../../css/ConfirmDialog.css';
import 'primeicons/primeicons.css';
import { Button } from 'primereact/button';
import { useState, useLayoutEffect, useRef } from 'react';
import { ConfirmDialog } from 'primereact/confirmdialog';
import { Toast } from 'primereact/toast';
import { useOutletContext } from "react-router-dom";
import TaskCard from './TaskCard';
export default function TaskList() {
  const sampleTasks = [
  {
    id: "task1",
    name: "Przygotowanie prezentacji dla klienta",
    deadline: "2024-11-08T00:00:00Z",
    description: "Przygotowanie materiałów i prezentacji na spotkanie z klientem.",
    team: [
      {
        userId: "user123",
        userName: "Jan",
        userSurname: "Kowalski",
        role: "Analityk",
        email: "jan.kowalski@example.com",
        phone: "+48123456789",
        complete: false
      },
      {
        userId: "user456",
        userName: "Anna",
        userSurname: "Nowak",
        role: "Kierownik",
        email: "anna.nowak@example.com",
        phone: "+48987654321",
        complete: true
      },{
        userId: "user123",
        userName: "Jan",
        userSurname: "Kowalski",
        role: "Analityk",
        email: "jan.kowalski@example.com",
        phone: "+48123456789",
        complete: false
      },{
        userId: "user123",
        userName: "Jan",
        userSurname: "Kowalski",
        role: "Analityk",
        email: "jan.kowalski@example.com",
        phone: "+48123456789",
        complete: false
      }
    ]
  },
  {
    id: "task2",
    name: "Spotkanie z zespołem projektowym",
    deadline: "2024-11-09T00:00:00Z",
    description: "Omówienie postępu prac nad projektem oraz przyszłych kroków.",
    team: [
      {
        userId: "user789",
        userName: "Marta",
        userSurname: "Zalewska",
        role: "Koordynator",
        email: "marta.zalewska@example.com",
        phone: "+48123409876",
        complete: true
      },
      {
        userId: "user101",
        userName: "Piotr",
        userSurname: "Wiśniewski",
        role: "Menadżer projektu",
        email: "piotr.wisniewski@example.com",
        phone: "+48765432109",
        complete: false
      }
    ]
  },
  {
    id: "task3",
    name: "Weryfikacja dokumentów prawnych",
    deadline: "2024-11-10T00:00:00Z",
    description: "Sprawdzenie poprawności dokumentów prawnych przed podpisaniem umowy.",
    team: [
      {
        userId: "user123",
        userName: "Jan",
        userSurname: "Kowalski",
        role: "Prawnik",
        email: "jan.kowalski@example.com",
        phone: "+48123456789",
        complete: true
      },
      {
        userId: "user456",
        userName: "Anna",
        userSurname: "Nowak",
        role: "Analityk",
        email: "anna.nowak@example.com",
        phone: "+48987654321",
        complete: false
      }
    ]
  },
  {
    id: "task4",
    name: "Zebranie danych finansowych na raport",
    deadline: "2024-11-12T00:00:00Z",
    description: "Zebranie i analiza danych finansowych niezbędnych do raportu kwartalnego.",
    team: [
      {
        userId: "user789",
        userName: "Marta",
        userSurname: "Zalewska",
        role: "Analityk",
        email: "marta.zalewska@example.com",
        phone: "+48123409876",
        complete: false
      },
      {
        userId: "user101",
        userName: "Piotr",
        userSurname: "Wiśniewski",
        role: "Finansista",
        email: "piotr.wisniewski@example.com",
        phone: "+48765432109",
        complete: true
      }
    ]
  },
  {
    id: "task5",
    name: "Przygotowanie oferty dla nowego klienta",
    deadline: "2024-11-13T00:00:00Z",
    description: "Przygotowanie spersonalizowanej oferty dla potencjalnego klienta.",
    team: [
      {
        userId: "user123",
        userName: "Jan",
        userSurname: "Kowalski",
        role: "Kierownik sprzedaży",
        email: "jan.kowalski@example.com",
        phone: "+48123456789",
        complete: true
      },
      {
        userId: "user456",
        userName: "Anna",
        userSurname: "Nowak",
        role: "Specjalista ds. sprzedaży",
        email: "anna.nowak@example.com",
        phone: "+48987654321",
        complete: false
      }
    ]
  },
  {
    id: "task6",
    name: "Zorganizowanie spotkania z partnerami biznesowymi",
    deadline: "2024-11-15T00:00:00Z",
    description: "Koordynacja spotkania z kluczowymi partnerami biznesowymi.",
    team: [
      {
        userId: "user789",
        userName: "Marta",
        userSurname: "Zalewska",
        role: "Manager",
        email: "marta.zalewska@example.com",
        phone: "+48123409876",
        complete: false
      },
      {
        userId: "user123",
        userName: "Jan",
        userSurname: "Kowalski",
        role: "Koordynator",
        email: "jan.kowalski@example.com",
        phone: "+48123456789",
        complete: true
      }
    ]
  },{
    id: "task7",
    name: "Testowanie aplikacji mobilnej",
    deadline: "2024-11-16T00:00:00Z",
    description: "Przeprowadzenie testów aplikacji mobilnej przed jej premierą.",
    team: [
      {
        userId: "user456",
        userName: "Anna",
        userSurname: "Nowak",
        role: "Tester",
        email: "anna.nowak@example.com",
        phone: "+48987654321",
        complete: false
      },
      {
        userId: "user101",
        userName: "Piotr",
        userSurname: "Wiśniewski",
        role: "Developer",
        email: "piotr.wisniewski@example.com",
        phone: "+48765432109",
        complete: false
      }
    ]
  },
  {
    id: "task8",
    name: "Opracowanie strategii marketingowej",
    deadline: "2024-11-17T00:00:00Z",
    description: "Stworzenie kompleksowej strategii marketingowej na nowy produkt.",
    team: [
      {
        userId: "user123",
        userName: "Jan",
        userSurname: "Kowalski",
        role: "Specjalista ds. marketingu",
        email: "jan.kowalski@example.com",
        phone: "+48123456789",
        complete: false
      },
      {
        userId: "user789",
        userName: "Marta",
        userSurname: "Zalewska",
        role: "Kierownik marketingu",
        email: "marta.zalewska@example.com",
        phone: "+48123409876",
        complete: false
      }
    ]
  },
  {
    id: "task9",
    name: "Aktualizacja strony internetowej",
    deadline: "2024-11-18T00:00:00Z",
    description: "Przeprowadzenie aktualizacji i optymalizacji strony internetowej.",
    team: [
      {
        userId: "user101",
        userName: "Piotr",
        userSurname: "Wiśniewski",
        role: "Webmaster",
        email: "piotr.wisniewski@example.com",
        phone: "+48765432109",
        complete: false
      },
      {
        userId: "user123",
        userName: "Jan",
        userSurname: "Kowalski",
        role: "Content Manager",
        email: "jan.kowalski@example.com",
        phone: "+48123456789",
        complete: false
      }
    ]
  },
  {
    id: "task10",
    name: "Audyt bezpieczeństwa danych",
    deadline: "2024-11-22T00:00:00Z",
    description: "Przeprowadzenie audytu wewnętrznego w celu oceny bezpieczeństwa danych.",
    team: [
      {
        userId: "user456",
        userName: "Anna",
        userSurname: "Nowak",
        role: "Audytor",
        email: "anna.nowak@example.com",
        phone: "+48987654321",
        complete: false
      },
      {
        userId: "user789",
        userName: "Marta",
        userSurname: "Zalewska",
        role: "Specjalista ds. IT",
        email: "marta.zalewska@example.com",
        phone: "+48123409876",
        complete: false
      }
    ]
  },
  {
    id: "task11",
    name: "Przygotowanie raportu rocznego",
    deadline: "2024-11-25T00:00:00Z",
    description: "Zebranie i przygotowanie danych do raportu rocznego firmy.",
    team: [
      {
        userId: "user123",
        userName: "Jan",
        userSurname: "Kowalski",
        role: "Analityk finansowy",
        email: "jan.kowalski@example.com",
        phone: "+48123456789",
        complete: false
      },
      {
        userId: "user456",
        userName: "Anna",
        userSurname: "Nowak",
        role: "Specjalista ds. raportów",
        email: "anna.nowak@example.com",
        phone: "+48987654321",
        complete: false
      }
    ]
  },
  {
    id: "task12",
    name: "Udoskonalenie procesu sprzedaży",
    deadline: "2024-11-28T00:00:00Z",
    description: "Opracowanie usprawnień w procesie sprzedaży na podstawie analiz rynkowych.",
    team: [
      {
        userId: "user101",
        userName: "Piotr",
        userSurname: "Wiśniewski",
        role: "Specjalista ds. sprzedaży",
        email: "piotr.wisniewski@example.com",
        phone: "+48765432109",
        complete: false
      },
      {
        userId: "user789",
        userName: "Marta",
        userSurname: "Zalewska",
        role: "Menadżer sprzedaży",
        email: "marta.zalewska@example.com",
        phone: "+48123409876",
        complete: false
      }
    ]
  },
  {
    id: "task13",
    name: "Przygotowanie prezentacji dla PM",
    deadline: "2024-11-30T00:00:00Z",
    description: "Przygotowanie materiałów i prezentacji na spotkanie z PM.",
    team: [
      {
        userId: "user123",
        userName: "Jan",
        userSurname: "Kowalski",
        role: "Analityk",
        email: "jan.kowalski@example.com",
        phone: "+48123456789",
        complete: false
      },
      {
        userId: "user456",
        userName: "Anna",
        userSurname: "Nowak",
        role: "Kierownik",
        email: "anna.nowak@example.com",
        phone: "+48987654321",
        complete: false
      }
    ]
  }
];
const [user] = useOutletContext();
const toast = useRef(null);
const [isAdmin] = useState(user.role==="admin" ? true : false);
const [slide, setSlide] = useState(0);
const [animation, setAnimation] = useState('right');
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
    toast.current.show({ severity: 'info', summary: 'Zatwierdzono', detail: task, life: 1500 });
  };

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
                          isAdmin = {isAdmin}
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
