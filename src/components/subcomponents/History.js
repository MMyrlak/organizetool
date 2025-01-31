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
 const [isAdmin, setIsAdmin] = useState(false);
 const [isProjectMenager,setIsProjectMenager ] = useState(false);
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
           const data = await fetchTasksWithTeam(user.company, !isAdmin ? user.uid : null, true);
           setTasks(data);
       } catch (error) {
           console.error("Błąd podczas ładowania danych:", error);
       } finally {
           setLoading(false);
       }
   };
 
   loadData();
 }, [user.uid, user.role, loading]);
  const [tasks, setTasks] = useState("");
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