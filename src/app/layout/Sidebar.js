import React, { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startLogout } from '../../actions/auth.actions.js';
import { CurrentUserContext, CurrentSettingContext } from '../../App.js'

import Safe from 'react-safe'
import Dropdown from 'react-bootstrap/Dropdown';
import Figure from 'react-bootstrap/Figure';

import { NavLink, Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTachometerAlt,
  faUsers,
  faPowerOff,
  faKey,
  faCircle,
  faList
} from '@fortawesome/free-solid-svg-icons';

import './sidebar.css'

import * as AuthReducer from '../../reducers/auth.reducer.js'

// import useFeatureChecker from '../shared/FeatureChecker.js'

function Header() {
  // const logoURL = useSelector(AuthReducer.getLogo)
  // const appName = useSelector(AuthReducer.getAppName)
  // const settings = useSelector(AuthReducer.getSettings)
  // const companyName = useSelector(AuthReducer.getCompanyName)

  // document.title = appName

  let logo

  // if (logoURL) {
  //   logo = <Figure.Image width={150} height={160} alt="150x160" src={logoURL} />
  // } else {
    logo = (
      <h5 className="text-white font-weight-bold">icon</h5>
    )
  // }

  return (
    <div className="company-logo">
      <Link to="/">
        <Figure>
          {logo}
          <Figure.Caption>
            <h6 className="py-1">Restaurant XXI</h6>
          </Figure.Caption>
        </Figure>
      </Link>
    </div>
  )
}

export default function Sidebar({ onChange }) {
//   const currentUser = useContext(CurrentUserContext)
//   const currentSettings = useContext(CurrentSettingContext)
  const dispatch = useDispatch()
//   const CheckFeatures = useFeatureChecker()
  // const [s , set ] = useState(window.FlutterChannel ? window.FlutterChannel : null)
  // useEffect(() => {
  //   if (!window.FlutterChannel) {
  //     window.FlutterChannel.onMessageReceived = () => {
  //       console.log(arguments)
  //     }
  //   }
  // }, [])

  const scriptFn = () => {
    if (window.FlutterChannel !== undefined) {
      const data = JSON.stringify({'action': 'logout'})
      
      return window.FlutterChannel.postMessage(data);
    } else {
      return console.log('not running inside a Flutter webview');
    }
  }

  function logout(e) {
    e.preventDefault()

    const device = sessionStorage.getItem('device')

    if (device && device === 'mobile') {
      scriptFn()
    }

    dispatch(startLogout())
  }

  return (
    <div className="sidebar-sticky">
      <div className="">
        <Header />

        <div className="user-info">
          <Dropdown>
            <Dropdown.Toggle block className="btn-logout" id="dropdown-basic">
              {/* {currentUser ? currentUser.name : ''} */} {'Test'}
            </Dropdown.Toggle>

            <Dropdown.Menu className="btn-logout">
              <Dropdown.Item onClick={logout}>
                <FontAwesomeIcon icon={faPowerOff} className="color-icon" />
                <span> Cerrar sesión</span>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>

        <nav>
          <ul className="nav nav-pills flex-column">
            <li className="nav-item">
              <NavLink to="/dashboard" className="nav-link" onClick={() => onChange()}>
                <FontAwesomeIcon icon={faTachometerAlt} />
                <span>Dashboard</span>
              </NavLink>
            </li>

              <li className="nav-item">
                <NavLink  to="/products" className="nav-link" onClick={() => onChange()}>
                  <FontAwesomeIcon icon={faCircle} />
                  <span>Productos</span>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink  to="/supplies" className="nav-link" onClick={() => onChange()}>
                  <FontAwesomeIcon icon={faList} />
                  <span>Suministros</span>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink  to="/users" className="nav-link" onClick={() => onChange()}>
                  <FontAwesomeIcon icon={faUsers} />
                  <span>Usuarios</span>
                </NavLink>
              </li>


            {/* <CheckFeatures some={["LIST_ALL_ACCESS", "LIST_PERSONAL_ACCESS"]}>
              <li className="nav-item">
                <NavLink to="/access" className="nav-link" onClick={() => onChange()}>
                  <FontAwesomeIcon icon={faKey} />
                  <span>Permisos</span>
                </NavLink>
              </li>
            </CheckFeatures>

            <CheckFeatures some={["LIST_ENTRIES", "LIST_ZONES"]}>
              <li className="nav-item">
                <NavLink to="/logs" className="nav-link" onClick={() => onChange()}>
                  <FontAwesomeIcon icon={faUnlockAlt} />
                  <span>Eventos</span>
                </NavLink>
              </li>
            </CheckFeatures>

            <CheckFeatures feature="LIST_ALERTS">
              <li className="nav-item">
                <NavLink to="/alerts" className="nav-link" onClick={() => onChange()}>
                  <FontAwesomeIcon icon={faExclamationTriangle} />
                  <span>Alertas</span>
                </NavLink>
              </li>
            </CheckFeatures>

            <CheckFeatures feature="LIST_ZONES">
              <li className="nav-item">
                <NavLink to="/zones" className="nav-link" onClick={() => onChange()}>
                  <FontAwesomeIcon icon={faVectorSquare} />
                  <span>{currentSettings.menu['departments'].many}</span>
                </NavLink>
              </li>
            </CheckFeatures>

            <CheckFeatures some={["LIST_DOORS", "LIST_PERSONAL_DOORS"]}>
              <li className="nav-item">
                <NavLink to="/doors" className="nav-link" onClick={() => onChange()}>
                  <FontAwesomeIcon icon={faDoorClosed} />
                  <span>{currentSettings.menu['doors'].many}</span>
                </NavLink>
              </li>
            </CheckFeatures>

            <CheckFeatures feature="LIST_SENSORS">
              <li className="nav-item">
                <NavLink to="/sensors" className="nav-link" onClick={() => onChange()}>
                  <FontAwesomeIcon icon={faMicrochip} />
                  <span>Sensores</span>
                </NavLink>
              </li>
            </CheckFeatures>

            <CheckFeatures feature="LIST_SUBCOMPANIES">
              <li className="nav-item">
                <NavLink to="/subcompanies" className="nav-link" onClick={() => onChange()}>
                  <FontAwesomeIcon icon={faHardHat} />
                  <span>{currentSettings.menu['subcompanies'].many}</span>
                </NavLink>
              </li>
            </CheckFeatures>

            <CheckFeatures some={["LIST_USER_REVISIONS", "LIST_ACCESS_REVISIONS"]}>
              <li className="nav-item">
                <NavLink to="/revisions" className="nav-link" onClick={() => onChange()}>
                  <FontAwesomeIcon icon={faClipboardList} />
                  <span>Cambios</span>
                </NavLink>
              </li>
            </CheckFeatures>

            <CheckFeatures feature="LIST_USERS">
              <li className="nav-item">
                <NavLink to="/users" className="nav-link" onClick={() => onChange()}>
                  <FontAwesomeIcon icon={faUsers} />
                  <span>Usuarios</span>
                </NavLink>
              </li>
            </CheckFeatures>

            <CheckFeatures feature="LIST_COMPANIES">
              <li className="nav-item">
                <NavLink to="/companies" className="nav-link" onClick={() => onChange()}>
                  <FontAwesomeIcon icon={faIndustry} />
                  <span>Compañías</span>
                </NavLink>
              </li>
            </CheckFeatures> */}

            <li className="separator py-2"></li>


          </ul>
        </nav>
      </div>
    </div>
  )
}
