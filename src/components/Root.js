import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";

import React, { useEffect, useState } from "react";
import '../css/Root.css'
import AddUser from '../css/photo/userAddIcon.png';
import Clock from "./subcomponents/Clock";
import { Dock } from 'primereact/dock';
import { Tooltip } from 'primereact/tooltip';
import 'primeicons/primeicons.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClipboard, faPenToSquare } from '@fortawesome/free-regular-svg-icons'
import { Button } from 'primereact/button';
import {logoutUser, getSignedInUser} from '../backend/UserAction';
import Loading  from './subcomponents/Loading';

export default function Root() {


  const location  = useLocation();
  const [isExpanded, setIsExpanded] = useState(false); 
  const [userRoot, setUserRoot] = useState(null);
  const [loader, setLoader] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchUserData = async () => {
        try {
            const [isSignedIn, userData, uid] = await getSignedInUser();
            if (!isSignedIn) {
                navigate('/login');
                return;
            }
            setUserRoot(prevState => ({ ...prevState, ...userData, uid }));
            setLoader(false);
          } catch (error) {
            console.error("Error fetching user:", error);
        }
    };

    fetchUserData();
}, []);
  const menuItems = [
    {
      label: 'Zadania',
      icon: () => <FontAwesomeIcon icon={faClipboard} style={{color: 'rgb(6,182,212)', fontSize: '38'}}/>,
      command: () => { navigate('/task') },
      tooltip: 'Zadania'
    },
    {
      label: 'Nowe Zadanie',
      icon: () => <FontAwesomeIcon icon={faPenToSquare} style={{color: 'rgb(6,182,212)', fontSize: '38'}} />,
      command: () => { navigate('/taskAdd') },
      tooltip: 'Nowe Zadanie',
      visible: userRoot && (userRoot.role === "Admin" || userRoot.role === "Project Menager")  ? true : false,
    },
    {
      label: 'Historia',
      icon: () => <i className="pi pi-history" style={{color: 'rgb(6,182,212)', fontSize: '38px'}}/>,
      command: () => { navigate('/history') },
      tooltip: 'Historia',
    },
    {
      label: 'Dodaj użytkownia',
      icon: () => <img alt="Dodaj użytkownia" src={AddUser} style={{objectFit: 'cointain', width: '80%', height: '80%'}}/>,
      command: () => { navigate('/userAdd') },
      visible: userRoot && userRoot.role === "Admin" ? true : false,
      tooltip: 'Dodaj użytkownia',
    },
    {
      label: 'Wyloguj',
      icon: () => <i className="pi pi-sign-out" style={{color: 'rgb(6,182,212)', fontSize: '38px'}}/>,
      command: () => { logout() },
      tooltip: 'Wyloguj',
    },
  ];
  function logout(){
    if(logoutUser()) {
      navigate('/login');
    } else {
      alert("error");
    }
  }
  useEffect(() => {
    setIsExpanded(false);
    const timer = setTimeout(() => setIsExpanded(true), 1000); 
    return () => clearTimeout(timer);
  }, [location]); 

  if(loader){
    return (
      <Loading> </Loading>
    )
  }
  return (
    <>
    <div id="rootCointainer">
        <Tooltip target=".dock-window .p-dock-action" my="left center" at="right center" showDelay={150} style={{ marginLeft: '5px' }}/>
        <div className="dock-window">
          <Dock model={menuItems} position="left" />
        </div>
      <div id="detail">
        <div id="detail-body">
          <div className="detail-body-info">
            <div className="detail-body-header"> <Clock /> </div>
            <div className="detail-body-me"> 
              <Button severity="secondary" text raised size="small" >
                <Link to="/me" > {userRoot.userName} {userRoot.userSurname} </Link>
              </Button>
            </div>
          </div>
          <div className={`detail-body-decor ${isExpanded ? 'expanded' : ''}`}></div>
          <Outlet context={[userRoot]} />
        </div>
      </div>
    </div>
    <div id="footer">
      <a href="http://www.freepik.com"> Zdjęcie w tle: Designed by coolvector / Freepik</a>
    </div>
    </>
  );
}