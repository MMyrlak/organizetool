import '../../css/Tasks.css';
import '../../css/ConfirmDialog.css';
import 'primeicons/primeicons.css';
import { Button } from 'primereact/button';
import React, { useState, useLayoutEffect, useRef, useEffect } from 'react';
import { ConfirmDialog } from 'primereact/confirmdialog';
import { Toast } from 'primereact/toast';
import { useOutletContext } from "react-router-dom";
import TaskCard from './TaskCardDemo';
import Loading from './Loading';

// Statyczna lista 15 zadań DEMO (ta, którą wygenerowaliśmy przed chwilą)
const DEMO_TASKS_LIST = [
    {
        "id": "mh2s3w5FmiKZtIAY7JUP",
        "name": "Dodanie obsługi błędów",
        "description": "Zbadaj, zaplanuj i zaimplementuj wymagania dla: Dodanie obsługi błędów.",
        "complete": true,
        "deadline": { "seconds": 0, "nanoseconds": 0 }, // Wartości zostaną zaraz nadpisane w useEffect
        "team": [
            { "id": "Dx07mUfrOpuAhg6yhFe5NCnsd43E", "toRemove": true, "taskRole": "Tester", "company": "PartnerCorp-IT", "userSurname": "Kowalski", "createdAt": { "seconds": 1734682229, "nanoseconds": 482130128 }, "userName": "Marcin", "fullName": "Marcin Kowalski", "phoneNumber": "291258727", "email": "marcin.kowalski@example.com", "complete": false, "role": "User", "isCompany": false },
            { "id": "QVUTLhKZI7MhG9ieWiGezEjmFGCc", "toRemove": true, "taskRole": "Tester", "company": "InnoDev", "userSurname": "Wójcik", "createdAt": { "seconds": 1735796407, "nanoseconds": 636382530 }, "userName": "Piotr", "fullName": "Piotr Wójcik", "phoneNumber": "563191965", "email": "piotr.wojcik@example.com", "complete": false, "role": "Manager", "isCompany": true },
            { "id": "wwgDGYgpfkm2w2CwsL5ZMkKBkqx8", "toRemove": false, "taskRole": "Analityk", "company": "TechSolutions", "userSurname": "Lewandowska", "createdAt": { "seconds": 1733059288, "nanoseconds": 6848672 }, "userName": "Agnieszka", "fullName": "Agnieszka Lewandowska", "phoneNumber": "583350664", "email": "agnieszka.lewandowska@example.com", "complete": false, "role": "Pracownik", "isCompany": false },
            { "id": "3wV0esbacK0DEQrbnx7CKDArtX42", "toRemove": false, "taskRole": "Programista", "company": "TechSolutions", "userSurname": "Kowalski", "createdAt": { "seconds": 1733542774, "nanoseconds": 868428095 }, "userName": "Krzysztof", "fullName": "Krzysztof Kowalski", "phoneNumber": "354146362", "email": "krzysztof.kowalski@example.com", "complete": false, "role": "Project Menager", "isCompany": true }
        ]
    },
    {
        "id": "nKok28ACN8zL7ps40n0d",
        "name": "Tworzenie dokumentacji technicznej",
        "description": "Zbadaj, zaplanuj i zaimplementuj wymagania dla: Tworzenie dokumentacji technicznej.",
        "complete": false,
        "deadline": { "seconds": 0, "nanoseconds": 0 },
        "team": [
            { "id": "dh8KqGt9GX8V5oCqKLdKGEQi7Fmz", "toRemove": true, "taskRole": "Scrum Master", "company": "TechSolutions", "userSurname": "Kaczmarek", "createdAt": { "seconds": 1729639509, "nanoseconds": 569887169 }, "userName": "Paweł", "fullName": "Paweł Kaczmarek", "phoneNumber": "661796908", "email": "pawel.kaczmarek@example.com", "complete": false, "role": "User", "isCompany": true },
            { "id": "0m3JELy8mFTNkMMKYEvWcoqy0sEP", "toRemove": false, "taskRole": "Programista", "company": "OrganizationTOOL-Company", "userSurname": "Nowak", "createdAt": { "seconds": 1730605775, "nanoseconds": 939690800 }, "userName": "Paweł", "fullName": "Paweł Nowak", "phoneNumber": "564798614", "email": "pawel.nowak@example.com", "complete": true, "role": "Manager", "isCompany": false },
            { "id": "xawjvXivqFoWNPHrHC4AO5eMF1aj", "toRemove": false, "taskRole": "Scrum Master", "company": "PartnerCorp-IT", "userSurname": "Woźniak", "createdAt": { "seconds": 1731309366, "nanoseconds": 642966502 }, "userName": "Piotr", "fullName": "Piotr Woźniak", "phoneNumber": "559152369", "email": "piotr.wozniak@example.com", "complete": true, "role": "Project Menager", "isCompany": false },
            { "id": "4RMOA7PCnSCRPeT1jTXa2E3mUuuZ", "toRemove": false, "taskRole": "Projektant", "company": "PartnerCorp-IT", "userSurname": "Wójcik", "createdAt": { "seconds": 1734152178, "nanoseconds": 618263445 }, "userName": "Joanna", "fullName": "Joanna Wójcik", "phoneNumber": "915358216", "email": "joanna.wojcik@example.com", "complete": false, "role": "Manager", "isCompany": true }
        ]
    },
    {
        "id": "GUytHxCashSInC9rvHrq",
        "name": "Audyt bezpieczeństwa",
        "description": "Zbadaj, zaplanuj i zaimplementuj wymagania dla: Audyt bezpieczeństwa.",
        "complete": false,
        "deadline": { "seconds": 0, "nanoseconds": 0 },
        "team": [
            { "id": "8ccId9zDFduR7HV0MDdiirD8vuto", "toRemove": false, "taskRole": "Analityk", "company": "OrganizationTOOL-Company", "userSurname": "Kamińska", "createdAt": { "seconds": 1726937392, "nanoseconds": 879737369 }, "userName": "Katarzyna", "fullName": "Katarzyna Kamińska", "phoneNumber": "469736622", "email": "katarzyna.kaminska@example.com", "complete": true, "role": "Manager", "isCompany": true },
            { "id": "aygc5GGZNzgZDFwMMzb9yje7Hd8g", "toRemove": true, "taskRole": "Projektant", "company": "TechSolutions", "userSurname": "Woźniak", "createdAt": { "seconds": 1727844184, "nanoseconds": 75137464 }, "userName": "Katarzyna", "fullName": "Katarzyna Woźniak", "phoneNumber": "241163701", "email": "katarzyna.wozniak@example.com", "complete": true, "role": "User", "isCompany": true },
            { "id": "SH3PGv6S3jxeIDtvQPBeggeMYBoA", "toRemove": false, "taskRole": "DevOps", "company": "OrganizationTOOL-Company", "userSurname": "Szymańska", "createdAt": { "seconds": 1735355599, "nanoseconds": 274197154 }, "userName": "Magdalena", "fullName": "Magdalena Szymańska", "phoneNumber": "408993580", "email": "magdalena.szymanska@example.com", "complete": true, "role": "Manager", "isCompany": true }
        ]
    },
    {
        "id": "tlGIP143YGh1qfZbTPOd",
        "name": "Analiza logów serwera",
        "description": "Zbadaj, zaplanuj i zaimplementuj wymagania dla: Analiza logów serwera.",
        "complete": true,
        "deadline": { "seconds": 0, "nanoseconds": 0 },
        "team": [
            { "id": "KMp7BeUiLHfN52yp5vvtWdN3TToO", "toRemove": false, "taskRole": "DevOps", "company": "TechSolutions", "userSurname": "Wójcik", "createdAt": { "seconds": 1734873833, "nanoseconds": 610920437 }, "userName": "Krzysztof", "fullName": "Krzysztof Wójcik", "phoneNumber": "254259988", "email": "krzysztof.wojcik@example.com", "complete": true, "role": "Admin", "isCompany": false },
            { "id": "dqWO1tbIY1sq4NeX84qH8HdMkk8t", "toRemove": false, "taskRole": "Scrum Master", "company": "PartnerCorp-IT", "userSurname": "Wójcik", "createdAt": { "seconds": 1733688691, "nanoseconds": 310761798 }, "userName": "Maciej", "fullName": "Maciej Wójcik", "phoneNumber": "625292971", "email": "maciej.wojcik@example.com", "complete": false, "role": "Pracownik", "isCompany": false },
            { "id": "fwn0u7VyAMDhh75bHZKlGECq8nCm", "toRemove": false, "taskRole": "Analityk", "company": "OrganizationTOOL-Company", "userSurname": "Szymańska", "createdAt": { "seconds": 1728220634, "nanoseconds": 392823016 }, "userName": "Magdalena", "fullName": "Magdalena Szymańska", "phoneNumber": "384386207", "email": "magdalena.szymanska@example.com", "complete": false, "role": "Project Menager", "isCompany": true }
        ]
    },
    {
        "id": "yUqlxcxIkl67uU08SIIG",
        "name": "Aktualizacja bibliotek",
        "description": "Zbadaj, zaplanuj i zaimplementuj wymagania dla: Aktualizacja bibliotek.",
        "complete": false,
        "deadline": { "seconds": 0, "nanoseconds": 0 },
        "team": [
            { "id": "uQpGr93AdrpL4gQ3dUkgD28fMRip", "toRemove": false, "taskRole": "Scrum Master", "company": "TechSolutions", "userSurname": "Kowalska", "createdAt": { "seconds": 1726915717, "nanoseconds": 913844825 }, "userName": "Anna", "fullName": "Anna Kowalska", "phoneNumber": "830241943", "email": "anna.kowalska@example.com", "complete": false, "role": "User", "isCompany": false },
            { "id": "0ll5HsSaBxtx1vBAnSlx1isQJlsj", "toRemove": false, "taskRole": "Tester", "company": "TechSolutions", "userSurname": "Szymański", "createdAt": { "seconds": 1734171418, "nanoseconds": 810702315 }, "userName": "Michał", "fullName": "Michał Szymański", "phoneNumber": "562559455", "email": "michal.szymanski@example.com", "complete": false, "role": "Admin", "isCompany": true },
            { "id": "VDxmWQAD3RB4xKFbEowNwoLrHCDM", "toRemove": false, "taskRole": "Projektant", "company": "TechSolutions", "userSurname": "Szymański", "createdAt": { "seconds": 1726637145, "nanoseconds": 544092735 }, "userName": "Paweł", "fullName": "Paweł Szymański", "phoneNumber": "943640880", "email": "pawel.szymanski@example.com", "complete": true, "role": "Admin", "isCompany": false },
            { "id": "QOzodUa1Jlqru2pIq8W0UhV3Zp84", "toRemove": true, "taskRole": "Projektant", "company": "InnoDev", "userSurname": "Zielińska", "createdAt": { "seconds": 1729110329, "nanoseconds": 10043839 }, "userName": "Magdalena", "fullName": "Magdalena Zielińska", "phoneNumber": "549680762", "email": "magdalena.zielinska@example.com", "complete": true, "role": "User", "isCompany": false }
        ]
    }
];


export default function TaskList() {
    const [user] = useOutletContext();
    const toast = useRef(null);
    const [isAdmin, setIsAdmin] = useState(false);
    const [isProjectMenager, setIsProjectMenager] = useState(false);
    const [slide, setSlide] = useState(0);
    const [animation, setAnimation] = useState('right');
    const [taskCardLimit, setTaskCardLimit] = useState(3);

    const [sampleTasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user?.role === 'Admin') {
            setIsAdmin(true);
        }
        if (user?.role === 'Project Menager') {
            setIsProjectMenager(true);
        }

        // --- Logika przypisywania dynamicznych dat na potrzeby DEMO ---
        const nowInSeconds = Math.floor(Date.now() / 1000);
        
        // Tablica offsetów w sekundach (np. -2 dni, na dzisiaj, +1 dzień, +3 dni)
        const offsets = [
            -172800, // ZAD 1: 2 dni po terminie (czerwone/ostrzeżenie)
            3600,    // ZAD 2: Za 1 godzinę (na styk)
            86400,   // ZAD 3: Za 1 dzień
            259200,  // ZAD 4: Za 3 dni
            604800,  // ZAD 5: Za tydzień
        ];

        const demoTasksWithDynamicDates = DEMO_TASKS_LIST.map((task, index) => {
            const offset = offsets[index % offsets.length]; 
            const timestampInSeconds = nowInSeconds + offset;

            return {
                ...task,
                // Tutaj musi być surowy obiekt bez ŻADNYCH FUKCJI, aby link działał:
                deadline: {
                    seconds: timestampInSeconds,
                    nanoseconds: 0
                }
            };
        });

        // Wczytanie zaktualizowanych zadań z wyłączonym loaderem po opóźnieniu
        setTimeout(() => {
            setTasks(demoTasksWithDynamicDates);
            setLoading(false);
        }, 600);
        
    }, [user?.role]);

    useLayoutEffect(() => {
        function updateSize() {
            if (window.innerWidth >= 1900) {
                setTaskCardLimit(4);
            } else if (window.innerWidth >= 1200) {
                setTaskCardLimit(3);
            } else if (window.innerWidth >= 950) {
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

    const accept = (taskHeaders) => {
        console.log("DEMO: Próba zatwierdzenia/odrzucenia:", taskHeaders);
        toast.current.show({ severity: 'info', summary: 'Zatwierdzono (Demo)', detail: taskHeaders[0], life: 1500 });
        
        setLoading(true);
        setTimeout(() => setLoading(false), 500);
    };

    if (loading) {
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
                            <i className="pi pi-check" style={{ color: 'rgb(255, 255, 255)' }}></i>
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
            <Button className="button button-next" onClick={prevSlide} icon="pi pi-angle-left" rounded text raised severity="info" aria-label="Next Task" />
            <div className='taskList-cointainer'>
                {sampleTasks.map((task, index) => {
                    const isStartOfNewGroup = index % taskCardLimit === 0;
                    return (
                        isStartOfNewGroup ? (
                            <ul className={
                                slide === (Math.floor(index / taskCardLimit)) ? `taskGroup taskGroup-visible-${animation}` : `taskGroup taskGroup-hidden-${animation}`
                            } key={`group-${index}`}>
                                {sampleTasks.slice(index, index + taskCardLimit).map((groupedTask, groupIndex) => (
                                    <TaskCard
                                        key={`task-${index + groupIndex}`}
                                        task={groupedTask}
                                        isAdmin={isAdmin || isProjectMenager}
                                        company={user?.company || "OrganizationTOOL-Company"} // Zabezpieczenie na puste user.company w demo
                                    />
                                ))}
                            </ul >
                        ) : null
                    );
                })}
            </div>
            <Button className="button button-next" onClick={nextSlide} icon="pi pi-angle-right" rounded text raised severity="info" aria-label="Prev Task" />
        </div>
    );

}