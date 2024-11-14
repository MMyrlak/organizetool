import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";

import React, { useEffect, useState } from "react";
import '../css/Root.css'
import Clock from "./subcomponents/Clock";
import { Dock } from 'primereact/dock';
import { Tooltip } from 'primereact/tooltip';
import 'primeicons/primeicons.css';
export default function Root() {
  const location  = useLocation();
  const [isExpanded, setIsExpanded] = useState(false); 
  const navigate = useNavigate();
  const user = [
    {
      role: "admin",
    }
  ];
  const menuItems = [
    {
      label: 'Zadania',
      icon: () => <i className="pi pi-folder-open" style={{color: 'rgb(6,182,212)', fontSize: '2rem'}}/>,
      command: () => { navigate('/task') },
      tooltip: 'Zadania'
    },
    {
      label: 'Nowe Zadanie',
      icon: () => <i className="pi pi-folder-plus" style={{color: 'rgb(6,182,212)', fontSize: '2rem'}}/>,
      command: () => { navigate('/taskAdd') },
      tooltip: 'Nowe Zadanie',
      visible: user[0].role === "admin" ? true : false,
    },
    {
      label: 'Historia',
      icon: () => <i className="pi pi-history" style={{color: 'rgb(6,182,212)', fontSize: '2rem'}}/>,
      command: () => { navigate('/menu') }
    },
    {
      label: 'Wyloguj',
      icon: () => <i className="pi pi-sign-out" style={{color: 'rgb(6,182,212)', fontSize: '2rem'}}/>,
      command: () => { navigate('/login') }
    },
  ]
  useEffect(() => {
    setIsExpanded(false);
    const timer = setTimeout(() => setIsExpanded(true), 1000); 
    return () => clearTimeout(timer);
  }, [location]); 

  return (
    <>
    <div id="rootCointainer">
        <Tooltip target=".dock-window .p-dock-action" my="left center" at="right center" showDelay={250} style={{ marginLeft: '5px' }}/>
        <div className="dock-window">
          <Dock model={menuItems} position="left" />
        </div>
      <div id="detail">
        <div id="detail-body">
          <div className="detail-body-header"> <Clock /> </div>
          <div className={`detail-body-decor ${isExpanded ? 'expanded' : ''}`}></div>
          <Outlet />
        </div>
      </div>
    </div>
    <div id="footer">
      <a href="http://www.freepik.com"> Zdjęcie w tle: Designed by coolvector / Freepik</a>
    </div>
    </>
  );
}