import React, { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startLogout } from '../../actions/auth.actions.js';
import { CurrentRoleContext } from '../../App.js'

import Safe from 'react-safe'
import Dropdown from 'react-bootstrap/Dropdown';
import Figure from 'react-bootstrap/Figure';

import { NavLink, Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as Permission from '../shared/utils.js'
import {
  faTachometerAlt,
  faUsers,
  faPowerOff,
  faKey,
  faSpinner,
  faList,
  faUtensils,
  faChessBoard
} from '@fortawesome/free-solid-svg-icons';

import './sidebar.css'

import * as AuthReducer from '../../reducers/auth.reducer.js'
import xxi from "../../assets/images/xxi.png"
// import useFeatureChecker from '../shared/FeatureChecker.js'

function Header() {
  // const logoURL = useSelector(AuthReducer.getLogo)
  // const appName = useSelector(AuthReducer.getAppName)
  // const settings = useSelector(AuthReducer.getSettings)
  // const companyName = useSelector(AuthReducer.getCompanyName)

  // document.title = appName

  let logo

  // if (logoURL) {
  logo = <Figure.Image width={100} height={100} alt="100x100" src={xxi} />
  // } else {
  // logo = (
  //   <h5 className="text-white font-weight-bold">icon</h5>
  // )
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
  const currentRole = useContext(CurrentRoleContext)
  const dispatch = useDispatch()
  //   const CheckFeatures = useFeatureChecker()

  const scriptFn = () => {
    if (window.FlutterChannel !== undefined) {
      const data = JSON.stringify({ 'action': 'logout' })

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
                <span>Dashboard (50%)</span>
              </NavLink>
            </li>
            {
              Permission.tableView(currentRole) ?
                <li className="nav-item">
                  <NavLink to="/tables" className="nav-link" onClick={() => onChange()}>
                    <FontAwesomeIcon icon={faChessBoard} />
                    <span>Mesas (30%)</span>
                  </NavLink>
                </li>
                : ''
            }
            {
              Permission.productView(currentRole) ?
                <li className="nav-item">
                  <NavLink to="/products" className="nav-link" onClick={() => onChange()}>
                    <FontAwesomeIcon icon={faUtensils} />
                    <span>Productos (70%)</span>
                  </NavLink>
                </li>
                :
                ''
            }

            {
              Permission.supplieView(currentRole) ?
                <li className="nav-item">
                  <NavLink to="/supplies" className="nav-link" onClick={() => onChange()}>
                    <FontAwesomeIcon icon={faList} />
                    <span>Suministros</span>
                  </NavLink>
                </li>
                :
                ''
            }
            {
              Permission.userView(currentRole) ?
                <li className="nav-item">
                  <NavLink to="/users" className="nav-link" onClick={() => onChange()}>
                    <FontAwesomeIcon icon={faUsers} />
                    <span>Usuarios</span>
                  </NavLink>
                </li>
                :
                ''
            }

            <li className="nav-item">
              <NavLink to="/dev" className="nav-link" onClick={() => onChange()}>
                <FontAwesomeIcon icon={faSpinner} />
                <span>Reservas (En desarrollo)</span>
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink to="/dev1" className="nav-link" onClick={() => onChange()}>
                <FontAwesomeIcon icon={faSpinner} />
                <span>Ordenes (En desarrollo)</span>
              </NavLink>
            </li>

            <li className="separator py-2"></li>


          </ul>
        </nav>
      </div>
    </div>
  )
}
