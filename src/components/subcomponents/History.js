import React, { useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { FilterMatchMode, FilterService } from "primereact/api";
import 'primeicons/primeicons.css';
import '../../css/History.css';
import { InputText } from "primereact/inputtext";

FilterService.register("custom_team", (value, filters) => {
  const filterString = filters?.toLowerCase() ?? "";
  if (!filterString) return true;
  console.log(value);
  return value.some(
    (member) =>
      member.userName.toLowerCase().includes(filterString) ||
      member.userSurname.toLowerCase().includes(filterString) ||
      member.role.toLowerCase().includes(filterString)
  );
});


export default function History() {
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
      deadline: "2024-12-30T00:00:00Z",
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

  const [tasks, setTasks] = useState(sampleTasks);
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

  const deadlineBodyTemplate = (rowData) => 
    new Date(rowData.deadline).toLocaleDateString();

  const teamRowFilterTemplate = (options) => (
    <InputText
      value={options.value || ""}
      onChange={(e) => options.filterApplyCallback(e.target.value)}
      className="w-full"
      placeholder="Wyszukaj w zespole"
    />
  );

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
        </DataTable>
      </div>
    </div>
  );
}