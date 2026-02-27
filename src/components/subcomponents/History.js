import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { FilterMatchMode, FilterService } from "primereact/api";
import 'primeicons/primeicons.css';
import '../../css/History.css';
import { useOutletContext } from "react-router-dom";
import { InputText } from "primereact/inputtext";
import { fetchTasksWithTeam } from "../../backend/TaskGet";
import Loading  from './Loading';
import { Button } from 'primereact/button';
import { returnFullTask } from "../../backend/TaskAction";

FilterService.register("custom_team", (value, filters) => {
  const filterString = filters?.toLowerCase() ?? "";
  if (!filterString) return true;
  return value.some(
    (member) =>
      member.userName.toLowerCase().includes(filterString) ||
      member.userSurname.toLowerCase().includes(filterString) ||
      member.role.toLowerCase().includes(filterString)
  );
});


export default function History() {
 
 const [user] = useOutletContext();
 const [loading, setLoading] = useState(true);
 setTimeout(() => {setLoading(false)}, 1000);
 const [isAdmin, setIsAdmin] = useState(true);
 const [isProjectMenager,setIsProjectMenager ] = useState(false);
//  useEffect(() => {
//    if(user.role === 'Admin') {
//      setIsAdmin(true);
//    }
//    if(user.role==='Project Menager') {
//      setIsProjectMenager(true);
//    }
//    const loadData = async () => {
//        if (!user.company) {
//            return; // Poczekaj na załadowanie user.company
//        }
//        try {
//            const data = await fetchTasksWithTeam(user.company, !isAdmin ? user.uid : null, true);
//            setTasks(data);
//            console.log(tasks);
//        } catch (error) {
//            console.error("Błąd podczas ładowania danych:", error);
//        } finally {
//            setLoading(false);
//        }
//    };
 
//    loadData();
//  }, [user.uid, user.role, loading]);
  const [tasks, setTasks] = useState([
    {
        "id": "mh2s3w5FmiKZtIAY7JUP",
        "name": "Dodanie obsługi błędów",
        "description": "Zbadaj, zaplanuj i zaimplementuj wymagania dla: Dodanie obsługi błędów.",
        "complete": true,
        "deadline": {
            "seconds": 1739374051,
            "nanoseconds": 0
        },
        "team": [
            {
                "id": "Dx07mUfrOpuAhg6yhFe5NCnsd43E",
                "toRemove": true,
                "taskRole": "Tester",
                "company": "PartnerCorp-IT",
                "userSurname": "Kowalski",
                "createdAt": {
                    "seconds": 1734682229,
                    "nanoseconds": 482130128
                },
                "userName": "Marcin",
                "fullName": "Marcin Kowalski",
                "phoneNumber": "291258727",
                "email": "marcin.kowalski@example.com",
                "complete": false,
                "role": "User",
                "isCompany": false
            },
            {
                "id": "QVUTLhKZI7MhG9ieWiGezEjmFGCc",
                "toRemove": true,
                "taskRole": "Tester",
                "company": "InnoDev",
                "userSurname": "Wójcik",
                "createdAt": {
                    "seconds": 1735796407,
                    "nanoseconds": 636382530
                },
                "userName": "Piotr",
                "fullName": "Piotr Wójcik",
                "phoneNumber": "563191965",
                "email": "piotr.wojcik@example.com",
                "complete": false,
                "role": "Manager",
                "isCompany": true
            },
            {
                "id": "wwgDGYgpfkm2w2CwsL5ZMkKBkqx8",
                "toRemove": false,
                "taskRole": "Analityk",
                "company": "TechSolutions",
                "userSurname": "Lewandowska",
                "createdAt": {
                    "seconds": 1733059288,
                    "nanoseconds": 6848672
                },
                "userName": "Agnieszka",
                "fullName": "Agnieszka Lewandowska",
                "phoneNumber": "583350664",
                "email": "agnieszka.lewandowska@example.com",
                "complete": false,
                "role": "Pracownik",
                "isCompany": false
            },
            {
                "id": "3wV0esbacK0DEQrbnx7CKDArtX42",
                "toRemove": false,
                "taskRole": "Programista",
                "company": "TechSolutions",
                "userSurname": "Kowalski",
                "createdAt": {
                    "seconds": 1733542774,
                    "nanoseconds": 868428095
                },
                "userName": "Krzysztof",
                "fullName": "Krzysztof Kowalski",
                "phoneNumber": "354146362",
                "email": "krzysztof.kowalski@example.com",
                "complete": false,
                "role": "Project Menager",
                "isCompany": true
            }
        ]
    },
    {
        "id": "nKok28ACN8zL7ps40n0d",
        "name": "Tworzenie dokumentacji technicznej",
        "description": "Zbadaj, zaplanuj i zaimplementuj wymagania dla: Tworzenie dokumentacji technicznej.",
        "complete": true,
        "deadline": {
            "seconds": 1738244887,
            "nanoseconds": 0
        },
        "team": [
            {
                "id": "dh8KqGt9GX8V5oCqKLdKGEQi7Fmz",
                "toRemove": true,
                "taskRole": "Scrum Master",
                "company": "TechSolutions",
                "userSurname": "Kaczmarek",
                "createdAt": {
                    "seconds": 1729639509,
                    "nanoseconds": 569887169
                },
                "userName": "Paweł",
                "fullName": "Paweł Kaczmarek",
                "phoneNumber": "661796908",
                "email": "pawel.kaczmarek@example.com",
                "complete": false,
                "role": "User",
                "isCompany": true
            },
            {
                "id": "0m3JELy8mFTNkMMKYEvWcoqy0sEP",
                "toRemove": false,
                "taskRole": "Programista",
                "company": "OrganizationTOOL-Company",
                "userSurname": "Nowak",
                "createdAt": {
                    "seconds": 1730605775,
                    "nanoseconds": 939690800
                },
                "userName": "Paweł",
                "fullName": "Paweł Nowak",
                "phoneNumber": "564798614",
                "email": "pawel.nowak@example.com",
                "complete": true,
                "role": "Manager",
                "isCompany": false
            },
            {
                "id": "xawjvXivqFoWNPHrHC4AO5eMF1aj",
                "toRemove": false,
                "taskRole": "Scrum Master",
                "company": "PartnerCorp-IT",
                "userSurname": "Woźniak",
                "createdAt": {
                    "seconds": 1731309366,
                    "nanoseconds": 642966502
                },
                "userName": "Piotr",
                "fullName": "Piotr Woźniak",
                "phoneNumber": "559152369",
                "email": "piotr.wozniak@example.com",
                "complete": true,
                "role": "Project Menager",
                "isCompany": false
            },
            {
                "id": "4RMOA7PCnSCRPeT1jTXa2E3mUuuZ",
                "toRemove": false,
                "taskRole": "Projektant",
                "company": "PartnerCorp-IT",
                "userSurname": "Wójcik",
                "createdAt": {
                    "seconds": 1734152178,
                    "nanoseconds": 618263445
                },
                "userName": "Joanna",
                "fullName": "Joanna Wójcik",
                "phoneNumber": "915358216",
                "email": "joanna.wojcik@example.com",
                "complete": false,
                "role": "Manager",
                "isCompany": true
            }
        ]
    },
    {
        "id": "GUytHxCashSInC9rvHrq",
        "name": "Audyt bezpieczeństwa",
        "description": "Zbadaj, zaplanuj i zaimplementuj wymagania dla: Audyt bezpieczeństwa.",
        "complete": false,
        "deadline": {
            "seconds": 1740640332,
            "nanoseconds": 0
        },
        "team": [
            {
                "id": "8ccId9zDFduR7HV0MDdiirD8vuto",
                "toRemove": false,
                "taskRole": "Analityk",
                "company": "OrganizationTOOL-Company",
                "userSurname": "Kamińska",
                "createdAt": {
                    "seconds": 1726937392,
                    "nanoseconds": 879737369
                },
                "userName": "Katarzyna",
                "fullName": "Katarzyna Kamińska",
                "phoneNumber": "469736622",
                "email": "katarzyna.kaminska@example.com",
                "complete": true,
                "role": "Manager",
                "isCompany": true
            },
            {
                "id": "aygc5GGZNzgZDFwMMzb9yje7Hd8g",
                "toRemove": true,
                "taskRole": "Projektant",
                "company": "TechSolutions",
                "userSurname": "Woźniak",
                "createdAt": {
                    "seconds": 1727844184,
                    "nanoseconds": 75137464
                },
                "userName": "Katarzyna",
                "fullName": "Katarzyna Woźniak",
                "phoneNumber": "241163701",
                "email": "katarzyna.wozniak@example.com",
                "complete": true,
                "role": "User",
                "isCompany": true
            },
            {
                "id": "SH3PGv6S3jxeIDtvQPBeggeMYBoA",
                "toRemove": false,
                "taskRole": "DevOps",
                "company": "OrganizationTOOL-Company",
                "userSurname": "Szymańska",
                "createdAt": {
                    "seconds": 1735355599,
                    "nanoseconds": 274197154
                },
                "userName": "Magdalena",
                "fullName": "Magdalena Szymańska",
                "phoneNumber": "408993580",
                "email": "magdalena.szymanska@example.com",
                "complete": true,
                "role": "Manager",
                "isCompany": true
            }
        ]
    },
    {
        "id": "tlGIP143YGh1qfZbTPOd",
        "name": "Analiza logów serwera",
        "description": "Zbadaj, zaplanuj i zaimplementuj wymagania dla: Analiza logów serwera.",
        "complete": true,
        "deadline": {
            "seconds": 1739679586,
            "nanoseconds": 0
        },
        "team": [
            {
                "id": "KMp7BeUiLHfN52yp5vvtWdN3TToO",
                "toRemove": false,
                "taskRole": "DevOps",
                "company": "TechSolutions",
                "userSurname": "Wójcik",
                "createdAt": {
                    "seconds": 1734873833,
                    "nanoseconds": 610920437
                },
                "userName": "Krzysztof",
                "fullName": "Krzysztof Wójcik",
                "phoneNumber": "254259988",
                "email": "krzysztof.wojcik@example.com",
                "complete": true,
                "role": "Admin",
                "isCompany": false
            },
            {
                "id": "dqWO1tbIY1sq4NeX84qH8HdMkk8t",
                "toRemove": false,
                "taskRole": "Scrum Master",
                "company": "PartnerCorp-IT",
                "userSurname": "Wójcik",
                "createdAt": {
                    "seconds": 1733688691,
                    "nanoseconds": 310761798
                },
                "userName": "Maciej",
                "fullName": "Maciej Wójcik",
                "phoneNumber": "625292971",
                "email": "maciej.wojcik@example.com",
                "complete": false,
                "role": "Pracownik",
                "isCompany": false
            },
            {
                "id": "fwn0u7VyAMDhh75bHZKlGECq8nCm",
                "toRemove": false,
                "taskRole": "Analityk",
                "company": "OrganizationTOOL-Company",
                "userSurname": "Szymańska",
                "createdAt": {
                    "seconds": 1728220634,
                    "nanoseconds": 392823016
                },
                "userName": "Magdalena",
                "fullName": "Magdalena Szymańska",
                "phoneNumber": "384386207",
                "email": "magdalena.szymanska@example.com",
                "complete": false,
                "role": "Project Menager",
                "isCompany": true
            }
        ]
    },
    {
        "id": "yUqlxcxIkl67uU08SIIG",
        "name": "Aktualizacja bibliotek",
        "description": "Zbadaj, zaplanuj i zaimplementuj wymagania dla: Aktualizacja bibliotek.",
        "complete": true,
        "deadline": {
            "seconds": 1738913247,
            "nanoseconds": 0
        },
        "team": [
            {
                "id": "uQpGr93AdrpL4gQ3dUkgD28fMRip",
                "toRemove": false,
                "taskRole": "Scrum Master",
                "company": "TechSolutions",
                "userSurname": "Kowalska",
                "createdAt": {
                    "seconds": 1726915717,
                    "nanoseconds": 913844825
                },
                "userName": "Anna",
                "fullName": "Anna Kowalska",
                "phoneNumber": "830241943",
                "email": "anna.kowalska@example.com",
                "complete": false,
                "role": "User",
                "isCompany": false
            },
            {
                "id": "0ll5HsSaBxtx1vBAnSlx1isQJlsj",
                "toRemove": false,
                "taskRole": "Tester",
                "company": "TechSolutions",
                "userSurname": "Szymański",
                "createdAt": {
                    "seconds": 1734171418,
                    "nanoseconds": 810702315
                },
                "userName": "Michał",
                "fullName": "Michał Szymański",
                "phoneNumber": "562559455",
                "email": "michal.szymanski@example.com",
                "complete": false,
                "role": "Admin",
                "isCompany": true
            },
            {
                "id": "VDxmWQAD3RB4xKFbEowNwoLrHCDM",
                "toRemove": false,
                "taskRole": "Projektant",
                "company": "TechSolutions",
                "userSurname": "Szymański",
                "createdAt": {
                    "seconds": 1726637145,
                    "nanoseconds": 544092735
                },
                "userName": "Paweł",
                "fullName": "Paweł Szymański",
                "phoneNumber": "943640880",
                "email": "pawel.szymanski@example.com",
                "complete": true,
                "role": "Admin",
                "isCompany": false
            },
            {
                "id": "QOzodUa1Jlqru2pIq8W0UhV3Zp84",
                "toRemove": true,
                "taskRole": "Projektant",
                "company": "InnoDev",
                "userSurname": "Zielińska",
                "createdAt": {
                    "seconds": 1729110329,
                    "nanoseconds": 10043839
                },
                "userName": "Magdalena",
                "fullName": "Magdalena Zielińska",
                "phoneNumber": "549680762",
                "email": "magdalena.zielinska@example.com",
                "complete": true,
                "role": "User",
                "isCompany": false
            }
        ]
    },
    {
        "id": "nM7TEHaZEAZ4cjJ5Cfag",
        "name": "Optymalizacja zapytań SQL",
        "description": "Zbadaj, zaplanuj i zaimplementuj wymagania dla: Optymalizacja zapytań SQL.",
        "complete": true,
        "deadline": {
            "seconds": 1737628398,
            "nanoseconds": 0
        },
        "team": [
            {
                "id": "Bl3MJ9PZC6TMcjkkp2cFrYHSrhUE",
                "toRemove": false,
                "taskRole": "Projektant",
                "company": "PartnerCorp-IT",
                "userSurname": "Kowalski",
                "createdAt": {
                    "seconds": 1728094747,
                    "nanoseconds": 307967061
                },
                "userName": "Marcin",
                "fullName": "Marcin Kowalski",
                "phoneNumber": "331790787",
                "email": "marcin.kowalski@example.com",
                "complete": true,
                "role": "User",
                "isCompany": true
            },
            {
                "id": "uGRObRRNcl3mDmoPjcWjpLU9CoyD",
                "toRemove": false,
                "taskRole": "Programista",
                "company": "InnoDev",
                "userSurname": "Woźniak",
                "createdAt": {
                    "seconds": 1733100954,
                    "nanoseconds": 852004398
                },
                "userName": "Anna",
                "fullName": "Anna Woźniak",
                "phoneNumber": "580315393",
                "email": "anna.wozniak@example.com",
                "complete": false,
                "role": "Manager",
                "isCompany": false
            },
            {
                "id": "cDB7OM9urNFICcgkeBB0kcNOvjyA",
                "toRemove": false,
                "taskRole": "Programista",
                "company": "OrganizationTOOL-Company",
                "userSurname": "Szymańska",
                "createdAt": {
                    "seconds": 1728086928,
                    "nanoseconds": 510361550
                },
                "userName": "Karolina",
                "fullName": "Karolina Szymańska",
                "phoneNumber": "912936972",
                "email": "karolina.szymanska@example.com",
                "complete": true,
                "role": "Project Menager",
                "isCompany": false
            }
        ]
    },
    {
        "id": "LrIbZSQXSQHiAaMq1j0u",
        "name": "Poprawki błędów UI/UX",
        "description": "Zbadaj, zaplanuj i zaimplementuj wymagania dla: Poprawki błędów UI/UX.",
        "complete": false,
        "deadline": {
            "seconds": 1739076860,
            "nanoseconds": 0
        },
        "team": [
            {
                "id": "OiqH3Kffv6bwAHFcoOBYfbVaPFBV",
                "toRemove": true,
                "taskRole": "DevOps",
                "company": "PartnerCorp-IT",
                "userSurname": "Wiśniewska",
                "createdAt": {
                    "seconds": 1733210070,
                    "nanoseconds": 505575690
                },
                "userName": "Joanna",
                "fullName": "Joanna Wiśniewska",
                "phoneNumber": "650889832",
                "email": "joanna.wisniewska@example.com",
                "complete": false,
                "role": "Project Menager",
                "isCompany": true
            },
            {
                "id": "UVkURHUnlMW6AyhVYO4Y2MXisTW9",
                "toRemove": true,
                "taskRole": "DevOps",
                "company": "PartnerCorp-IT",
                "userSurname": "Kaczmarek",
                "createdAt": {
                    "seconds": 1735928716,
                    "nanoseconds": 64369126
                },
                "userName": "Karolina",
                "fullName": "Karolina Kaczmarek",
                "phoneNumber": "423996124",
                "email": "karolina.kaczmarek@example.com",
                "complete": false,
                "role": "Project Menager",
                "isCompany": false
            },
            {
                "id": "IcPGWr1ffnCoRynWWbPkeCwUf9ea",
                "toRemove": false,
                "taskRole": "DevOps",
                "company": "InnoDev",
                "userSurname": "Woźniak",
                "createdAt": {
                    "seconds": 1726782165,
                    "nanoseconds": 248663921
                },
                "userName": "Marcin",
                "fullName": "Marcin Woźniak",
                "phoneNumber": "699464772",
                "email": "marcin.wozniak@example.com",
                "complete": true,
                "role": "Project Menager",
                "isCompany": false
            },
            {
                "id": "ZoxqwYkFqVuxAU932bEza4FVZLET",
                "toRemove": false,
                "taskRole": "Analityk",
                "company": "PartnerCorp-IT",
                "userSurname": "Szymański",
                "createdAt": {
                    "seconds": 1729508974,
                    "nanoseconds": 756609692
                },
                "userName": "Jan",
                "fullName": "Jan Szymański",
                "phoneNumber": "384942922",
                "email": "jan.szymanski@example.com",
                "complete": false,
                "role": "User",
                "isCompany": false
            }
        ]
    },
    {
        "id": "cmcPa4YKyhzl8nLVfqSc",
        "name": "Integracja z zewnętrznym API",
        "description": "Zbadaj, zaplanuj i zaimplementuj wymagania dla: Integracja z zewnętrznym API.",
        "complete": false,
        "deadline": {
            "seconds": 1740683544,
            "nanoseconds": 0
        },
        "team": [
            {
                "id": "44xYPAk6gAT2ThasiLzXNhDEG9y2",
                "toRemove": false,
                "taskRole": "DevOps",
                "company": "OrganizationTOOL-Company",
                "userSurname": "Kowalski",
                "createdAt": {
                    "seconds": 1731452001,
                    "nanoseconds": 304078837
                },
                "userName": "Marcin",
                "fullName": "Marcin Kowalski",
                "phoneNumber": "378874379",
                "email": "marcin.kowalski@example.com",
                "complete": false,
                "role": "User",
                "isCompany": false
            },
            {
                "id": "gLew4ifHu4Yucr93jMdzVPDEZAcf",
                "toRemove": false,
                "taskRole": "Tester",
                "company": "InnoDev",
                "userSurname": "Lewandowski",
                "createdAt": {
                    "seconds": 1729629701,
                    "nanoseconds": 137111097
                },
                "userName": "Krzysztof",
                "fullName": "Krzysztof Lewandowski",
                "phoneNumber": "710479799",
                "email": "krzysztof.lewandowski@example.com",
                "complete": false,
                "role": "Manager",
                "isCompany": false
            },
            {
                "id": "22EDLaukhfRZQi0515ohdiccS6nX",
                "toRemove": false,
                "taskRole": "Projektant",
                "company": "TechSolutions",
                "userSurname": "Kowalczyk",
                "createdAt": {
                    "seconds": 1731511833,
                    "nanoseconds": 606082868
                },
                "userName": "Magdalena",
                "fullName": "Magdalena Kowalczyk",
                "phoneNumber": "535280395",
                "email": "magdalena.kowalczyk@example.com",
                "complete": true,
                "role": "User",
                "isCompany": true
            }
        ]
    },
    {
        "id": "LWxjF8J1wFskp1sypq8f",
        "name": "Migracja bazy danych",
        "description": "Zbadaj, zaplanuj i zaimplementuj wymagania dla: Migracja bazy danych.",
        "complete": false,
        "deadline": {
            "seconds": 1738926541,
            "nanoseconds": 0
        },
        "team": [
            {
                "id": "hkhrXWZeeABf0pEeSvvZ6WyRS3TF",
                "toRemove": false,
                "taskRole": "Analityk",
                "company": "TechSolutions",
                "userSurname": "Wiśniewski",
                "createdAt": {
                    "seconds": 1728338244,
                    "nanoseconds": 282364443
                },
                "userName": "Marcin",
                "fullName": "Marcin Wiśniewski",
                "phoneNumber": "579565761",
                "email": "marcin.wisniewski@example.com",
                "complete": false,
                "role": "Manager",
                "isCompany": true
            },
            {
                "id": "eXcNCjG1XdhCoZk2s6ugnaWQGVmK",
                "toRemove": false,
                "taskRole": "Projektant",
                "company": "InnoDev",
                "userSurname": "Lewandowski",
                "createdAt": {
                    "seconds": 1730429612,
                    "nanoseconds": 869260129
                },
                "userName": "Maciej",
                "fullName": "Maciej Lewandowski",
                "phoneNumber": "612616694",
                "email": "maciej.lewandowski@example.com",
                "complete": true,
                "role": "Pracownik",
                "isCompany": false
            },
            {
                "id": "x4bwVD8oJu6FOW08YqEashS5XPeK",
                "toRemove": true,
                "taskRole": "DevOps",
                "company": "PartnerCorp-IT",
                "userSurname": "Górska",
                "createdAt": {
                    "seconds": 1736052218,
                    "nanoseconds": 560960112
                },
                "userName": "Katarzyna",
                "fullName": "Katarzyna Górska",
                "phoneNumber": "579753959",
                "email": "katarzyna.gorska@example.com",
                "complete": false,
                "role": "Admin",
                "isCompany": false
            }
        ]
    },
    {
        "id": "mE9B4pB6L7Pz76E9wM8d",
        "name": "Implementacja modułu logowania",
        "description": "Zbadaj, zaplanuj i zaimplementuj wymagania dla: Implementacja modułu logowania.",
        "complete": false,
        "deadline": {
            "seconds": 1738561730,
            "nanoseconds": 0
        },
        "team": [
            {
                "id": "m1b1s2A8vYvR0CjK5wP4g3Iu4t1x",
                "toRemove": false,
                "taskRole": "Programista",
                "company": "OrganizationTOOL-Company",
                "userSurname": "Zieliński",
                "createdAt": {
                    "seconds": 1729112239,
                    "nanoseconds": 10043839
                },
                "userName": "Piotr",
                "fullName": "Piotr Zieliński",
                "phoneNumber": "549680888",
                "email": "piotr.zielinski@example.com",
                "complete": true,
                "role": "User",
                "isCompany": false
            },
            {
                "id": "z2x2c3V4bN5m6L7k8J9h0G1f2D3s",
                "toRemove": false,
                "taskRole": "Tester",
                "company": "TechSolutions",
                "userSurname": "Nowak",
                "createdAt": {
                    "seconds": 1734171222,
                    "nanoseconds": 810702315
                },
                "userName": "Anna",
                "fullName": "Anna Nowak",
                "phoneNumber": "562559411",
                "email": "anna.nowak@example.com",
                "complete": false,
                "role": "Admin",
                "isCompany": true
            },
            {
                "id": "q1w2e3R4tY5u6I7o8P9a0S1d2F3g",
                "toRemove": true,
                "taskRole": "Projektant",
                "company": "InnoDev",
                "userSurname": "Mazur",
                "createdAt": {
                    "seconds": 1726637333,
                    "nanoseconds": 544092735
                },
                "userName": "Paweł",
                "fullName": "Paweł Mazur",
                "phoneNumber": "943640222",
                "email": "pawel.mazur@example.com",
                "complete": false,
                "role": "Admin",
                "isCompany": false
            }
        ]
    },
    {
        "id": "x9Lp4mT2kW8jRn6bHq7D",
        "name": "Analiza wymagań ról użytkowników",
        "description": "Zbadaj, zaplanuj i zaimplementuj wymagania dla: Analiza wymagań ról użytkowników.",
        "complete": false,
        "deadline": {
            "seconds": 1740980111,
            "nanoseconds": 0
        },
        "team": [
            {
                "id": "uGRObRRNcl3mDmoPjcWjpLU9CoyD",
                "toRemove": false,
                "taskRole": "Analityk",
                "company": "InnoDev",
                "userSurname": "Woźniak",
                "createdAt": {
                    "seconds": 1733100954,
                    "nanoseconds": 852004398
                },
                "userName": "Joanna",
                "fullName": "Joanna Woźniak",
                "phoneNumber": "580315393",
                "email": "joanna.wozniak@example.com",
                "complete": false,
                "role": "Manager",
                "isCompany": false
            },
            {
                "id": "cDB7OM9urNFICcgkeBB0kcNOvjyA",
                "toRemove": true,
                "taskRole": "Analityk",
                "company": "OrganizationTOOL-Company",
                "userSurname": "Szymańska",
                "createdAt": {
                    "seconds": 1728086928,
                    "nanoseconds": 510361550
                },
                "userName": "Magdalena",
                "fullName": "Magdalena Szymańska",
                "phoneNumber": "912936972",
                "email": "magdalena.szymanska@example.com",
                "complete": true,
                "role": "Project Menager",
                "isCompany": false
            },
            {
                "id": "Bl3MJ9PZC6TMcjkkp2cFrYHSrhUE",
                "toRemove": false,
                "taskRole": "Projektant",
                "company": "PartnerCorp-IT",
                "userSurname": "Kowalski",
                "createdAt": {
                    "seconds": 1728094747,
                    "nanoseconds": 307967061
                },
                "userName": "Marcin",
                "fullName": "Marcin Kowalski",
                "phoneNumber": "331790787",
                "email": "marcin.kowalski@example.com",
                "complete": true,
                "role": "User",
                "isCompany": true
            },
            {
                "id": "q1w2e3R4tY5u6I7o8P9a0S1d2F3g",
                "toRemove": false,
                "taskRole": "Scrum Master",
                "company": "InnoDev",
                "userSurname": "Mazur",
                "createdAt": {
                    "seconds": 1726637333,
                    "nanoseconds": 544092735
                },
                "userName": "Krzysztof",
                "fullName": "Krzysztof Mazur",
                "phoneNumber": "943640222",
                "email": "krzysztof.mazur@example.com",
                "complete": false,
                "role": "Admin",
                "isCompany": false
            }
        ]
    },
    {
        "id": "b3Nf8vC1mX5kZ7lP9jRq",
        "name": "Projektowanie bazy danych",
        "description": "Zbadaj, zaplanuj i zaimplementuj wymagania dla: Projektowanie bazy danych.",
        "complete": true,
        "deadline": {
            "seconds": 1738902100,
            "nanoseconds": 0
        },
        "team": [
            {
                "id": "44xYPAk6gAT2ThasiLzXNhDEG9y2",
                "toRemove": false,
                "taskRole": "DevOps",
                "company": "OrganizationTOOL-Company",
                "userSurname": "Kowalski",
                "createdAt": {
                    "seconds": 1731452001,
                    "nanoseconds": 304078837
                },
                "userName": "Tomasz",
                "fullName": "Tomasz Kowalski",
                "phoneNumber": "378874379",
                "email": "tomasz.kowalski@example.com",
                "complete": false,
                "role": "User",
                "isCompany": false
            },
            {
                "id": "gLew4ifHu4Yucr93jMdzVPDEZAcf",
                "toRemove": false,
                "taskRole": "Tester",
                "company": "InnoDev",
                "userSurname": "Lewandowski",
                "createdAt": {
                    "seconds": 1729629701,
                    "nanoseconds": 137111097
                },
                "userName": "Krzysztof",
                "fullName": "Krzysztof Lewandowski",
                "phoneNumber": "710479799",
                "email": "krzysztof.lewandowski@example.com",
                "complete": false,
                "role": "Manager",
                "isCompany": false
            },
            {
                "id": "22EDLaukhfRZQi0515ohdiccS6nX",
                "toRemove": false,
                "taskRole": "Projektant",
                "company": "TechSolutions",
                "userSurname": "Kowalczyk",
                "createdAt": {
                    "seconds": 1731511833,
                    "nanoseconds": 606082868
                },
                "userName": "Magdalena",
                "fullName": "Magdalena Kowalczyk",
                "phoneNumber": "535280395",
                "email": "magdalena.kowalczyk@example.com",
                "complete": true,
                "role": "User",
                "isCompany": true
            }
        ]
    },
    {
        "id": "h7Gj5kL9qW2eR4tY6uI8",
        "name": "Konfiguracja serwerów testowych",
        "description": "Zbadaj, zaplanuj i zaimplementuj wymagania dla: Konfiguracja serwerów testowych.",
        "complete": false,
        "deadline": {
            "seconds": 1739999100,
            "nanoseconds": 0
        },
        "team": [
            {
                "id": "OiqH3Kffv6bwAHFcoOBYfbVaPFBV",
                "toRemove": true,
                "taskRole": "DevOps",
                "company": "PartnerCorp-IT",
                "userSurname": "Wiśniewska",
                "createdAt": {
                    "seconds": 1733210070,
                    "nanoseconds": 505575690
                },
                "userName": "Joanna",
                "fullName": "Joanna Wiśniewska",
                "phoneNumber": "650889832",
                "email": "joanna.wisniewska@example.com",
                "complete": false,
                "role": "Project Menager",
                "isCompany": true
            },
            {
                "id": "UVkURHUnlMW6AyhVYO4Y2MXisTW9",
                "toRemove": false,
                "taskRole": "DevOps",
                "company": "PartnerCorp-IT",
                "userSurname": "Kaczmarek",
                "createdAt": {
                    "seconds": 1735928716,
                    "nanoseconds": 64369126
                },
                "userName": "Maciej",
                "fullName": "Maciej Kaczmarek",
                "phoneNumber": "423996124",
                "email": "maciej.kaczmarek@example.com",
                "complete": false,
                "role": "Project Menager",
                "isCompany": false
            },
            {
                "id": "ZoxqwYkFqVuxAU932bEza4FVZLET",
                "toRemove": false,
                "taskRole": "Analityk",
                "company": "PartnerCorp-IT",
                "userSurname": "Szymański",
                "createdAt": {
                    "seconds": 1729508974,
                    "nanoseconds": 756609692
                },
                "userName": "Jan",
                "fullName": "Jan Szymański",
                "phoneNumber": "384942922",
                "email": "jan.szymanski@example.com",
                "complete": false,
                "role": "User",
                "isCompany": false
            }
        ]
    },
    {
        "id": "uQpGr93AdrpL4gQ3dUkg",
        "name": "Testy wydajnościowe aplikacji",
        "description": "Zbadaj, zaplanuj i zaimplementuj wymagania dla: Testy wydajnościowe aplikacji.",
        "complete": false,
        "deadline": {
            "seconds": 1740982247,
            "nanoseconds": 0
        },
        "team": [
            {
                "id": "8ccId9zDFduR7HV0MDdiirD8vuto",
                "toRemove": false,
                "taskRole": "Analityk",
                "company": "OrganizationTOOL-Company",
                "userSurname": "Kamińska",
                "createdAt": {
                    "seconds": 1726937392,
                    "nanoseconds": 879737369
                },
                "userName": "Katarzyna",
                "fullName": "Katarzyna Kamińska",
                "phoneNumber": "469736622",
                "email": "katarzyna.kaminska@example.com",
                "complete": true,
                "role": "Manager",
                "isCompany": true
            },
            {
                "id": "aygc5GGZNzgZDFwMMzb9yje7Hd8g",
                "toRemove": false,
                "taskRole": "Tester",
                "company": "TechSolutions",
                "userSurname": "Woźniak",
                "createdAt": {
                    "seconds": 1727844184,
                    "nanoseconds": 75137464
                },
                "userName": "Piotr",
                "fullName": "Piotr Woźniak",
                "phoneNumber": "241163701",
                "email": "piotr.wozniak@example.com",
                "complete": true,
                "role": "User",
                "isCompany": true
            },
            {
                "id": "SH3PGv6S3jxeIDtvQPBeggeMYBoA",
                "toRemove": true,
                "taskRole": "DevOps",
                "company": "OrganizationTOOL-Company",
                "userSurname": "Szymańska",
                "createdAt": {
                    "seconds": 1735355599,
                    "nanoseconds": 274197154
                },
                "userName": "Ewa",
                "fullName": "Ewa Szymańska",
                "phoneNumber": "408993580",
                "email": "ewa.szymanska@example.com",
                "complete": true,
                "role": "Manager",
                "isCompany": true
            }
        ]
    },
    {
        "id": "m1b1s2A8vYvR0CjK5wP4",
        "name": "Przygotowanie mocków ekranów",
        "description": "Zbadaj, zaplanuj i zaimplementuj wymagania dla: Przygotowanie mocków ekranów.",
        "complete": true,
        "deadline": {
            "seconds": 1738561111,
            "nanoseconds": 0
        },
        "team": [
            {
                "id": "KMp7BeUiLHfN52yp5vvtWdN3TToO",
                "toRemove": false,
                "taskRole": "Projektant",
                "company": "TechSolutions",
                "userSurname": "Wójcik",
                "createdAt": {
                    "seconds": 1734873833,
                    "nanoseconds": 610920437
                },
                "userName": "Krzysztof",
                "fullName": "Krzysztof Wójcik",
                "phoneNumber": "254259988",
                "email": "krzysztof.wojcik@example.com",
                "complete": true,
                "role": "Admin",
                "isCompany": false
            },
            {
                "id": "dqWO1tbIY1sq4NeX84qH8HdMkk8t",
                "toRemove": false,
                "taskRole": "Scrum Master",
                "company": "PartnerCorp-IT",
                "userSurname": "Wójcik",
                "createdAt": {
                    "seconds": 1733688691,
                    "nanoseconds": 310761798
                },
                "userName": "Maciej",
                "fullName": "Maciej Wójcik",
                "phoneNumber": "625292971",
                "email": "maciej.wojcik@example.com",
                "complete": false,
                "role": "Pracownik",
                "isCompany": false
            },
            {
                "id": "fwn0u7VyAMDhh75bHZKlGECq8nCm",
                "toRemove": true,
                "taskRole": "Analityk",
                "company": "OrganizationTOOL-Company",
                "userSurname": "Szymańska",
                "createdAt": {
                    "seconds": 1728220634,
                    "nanoseconds": 392823016
                },
                "userName": "Magdalena",
                "fullName": "Magdalena Szymańska",
                "phoneNumber": "384386207",
                "email": "magdalena.szymanska@example.com",
                "complete": false,
                "role": "Project Menager",
                "isCompany": true
            },
            {
                "id": "q1w2e3R4tY5u6I7o8P9a0S1d2F3g",
                "toRemove": false,
                "taskRole": "Projektant",
                "company": "InnoDev",
                "userSurname": "Mazur",
                "createdAt": {
                    "seconds": 1726637333,
                    "nanoseconds": 544092735
                },
                "userName": "Paweł",
                "fullName": "Paweł Mazur",
                "phoneNumber": "943640222",
                "email": "pawel.mazur@example.com",
                "complete": false,
                "role": "Admin",
                "isCompany": false
            }
        ]
    }
]);
  const [filters, setFilters] = useState({
    global: { value: "", matchMode: FilterMatchMode.CONTAINS },
    name: { value: "", matchMode: FilterMatchMode.CONTAINS },
    deadline: { value: "", matchMode: FilterMatchMode.CONTAINS },
    team: { value: "", matchMode: FilterMatchMode.CUSTOM }
  });

  const teamBodyTemplate = (rowData) => {
    return rowData.team.map((member, index) => (
      <div key={index}>
        {member.userName} {member.userSurname} - {member.role}
      </div>
    ));
  };
  const deadlineBodyTemplate = (rowData) => {
    const timestamp = rowData.deadline.seconds; // Jeśli `createdAt` jest obiektem timestamp z Firestore, weź `seconds`

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

  const teamRowFilterTemplate = (options) => (
    <InputText
      value={options.value || ""}
      onChange={(e) => options.filterApplyCallback(e.target.value)}
      className="w-full"
      placeholder="Wyszukaj w zespole"
    />
  );
  const optionBodyTempalet = (rowData) => {
          return (
              <div className='itemTemplate-createdAt'>
                  <Button icon="pi pi-times" rounded text raised severity="danger" aria-label="Usuń użytkownika" onClick={(event) => {returnTask(rowData.id);}}/>
              </div>
          )
      }
    const returnTask = (id) => {
      if(returnFullTask(user.company, id)) {setLoading(!loading)};
    }
  if(loading) {
    return (
      <div>
        <Loading />
      </div>
    );
  }
  return (
    <div className="history-cointainer">
      <div className="history-cointainer-body">
        <DataTable
          value={tasks}
          paginator
          rows={3}
          dataKey="id"
          filters={filters}
          filterDisplay="row"
          emptyMessage="Brak wyników."
          rowHover
          removableSort
        >
          <Column
            field="name"
            header="Nazwa zadania"
            filter
            filterPlaceholder="Wyszukaj nazwę"
            showFilterMenu={false}
            style={{ width: "15rem" }}
          />
          <Column
            field="deadline"
            header="Termin"
            filter
            sortable
            filterPlaceholder="Dedline"
            showFilterMenu={false}
            body={deadlineBodyTemplate}
            style={{ width: "10rem" }}
          />
          <Column
            field="description"
            header="Opis"
            style={{ width: "20rem" }}
          />
          <Column 
            field="team"
            header="Zespół"
            filter
            filterPlaceholder="Wyszukaj członka zespołu"
            filterElement={teamRowFilterTemplate}
            showFilterMenu={false}
            body={teamBodyTemplate}
            style={{ minWidth: "20rem" }}       
          />
          {isAdmin || isProjectMenager ? <Column 
            header="Opcje"
            body={optionBodyTempalet}
            style={{ width: "0.25rem" }}
          /> : null}
          
        </DataTable>
      </div>
    </div>
  );
}