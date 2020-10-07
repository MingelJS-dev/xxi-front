import React, { useEffect, useState } from "react";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { slide as Menu } from 'react-burger-menu'
import { useSwipeable } from "react-swipeable";

import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";

import history from "./history.js";
import useWindowSize from "./app/shared/WindowSize.js";

import LoginPage from "./app/login/LoginPage.js";
import Sidebar from "./app/layout/Sidebar.js";

import NewUserPage from "./app/users/NewUserPage.js";

// import { fetchCurrentUser } from "./actions/users.actions.js";
// import { getSettings } from "./reducers/auth.reducer.js"

export const CurrentUserContext = React.createContext({})
export const CurrentSettingContext = React.createContext({})

// sessionStorage.setItem('device', 'mobile');

function SidebarWrapper({ isOpen, setOpen }) {
  const winSize = useWindowSize()
  const [isMobile, setIsMobile] = useState(winSize.width <= 768)

  useEffect(() => {
    setIsMobile(winSize.width <= 768)
    setOpen(winSize.width >= 768)
  }, [winSize])


  return (
    <Menu
      className="col-8 col-md-3 col-lg-2 d-md-block p-0 sidebar"
      isOpen={isOpen}
      disableCloseOnEsc
      onClose={() => setOpen(false)}
      noTransition={!isMobile}
      noOverlay={!isMobile}
    >
      <nav>
        <Sidebar onChange={() => {
          if (isMobile) {
            setOpen(false)
          }
        }} />
      </nav>
    </Menu>
  )
}

function App() {
  const [isOpen, setOpen] = useState(window.innerWidth >= 768)
  const dispatch = useDispatch();

  // const currentUser = useSelector(state => state.auth.currentUser)
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
  // const currentSettings = useSelector(getSettings)

  const handlers = useSwipeable({
    delta: 150,
    trackMouse: true,
    onSwipedRight: () => setOpen(true),
  });

  useEffect(() => {
    if (isLoggedIn) {
      // dispatch(fetchCurrentUser());
    }
  }, [isLoggedIn, dispatch]);

  if (isLoggedIn) {
    return (
      <Router history={history}>
        {/* <Notification></Notification> */}

        {/* value={currentSettings} */}
        {/* value={currentUser} */}
        <CurrentSettingContext.Provider >
          <CurrentUserContext.Provider>
            <Container fluid={true} className="p-0">
              <div className="row m-0">

                <SidebarWrapper isOpen={isOpen} setOpen={setOpen} />

                <Col {...handlers} className="col-md-9 ml-sm-auto col-lg-10 px-md-2" style={{ height: '100vh' }}>
                  <Switch>
                    <Route path="/" exact>
                      {/* <Redirect to="/dashboard" /> */}
                    </Route>
                    <Route path="/users/new" exact component={NewUserPage} />
                    {/* <Route path="/dashboard" exact component={DashboardPage} />
                    <Route path="/users" exact component={UsersListPage} />
                    <Route path="/users/new" exact component={NewUserPage} />
                    <Route path="/users/:UserId" exact component={UserDetailPage} />
                    <Route path="/users/:UserId/edit" exact component={EditUserPage} />
                    <Route path="/zones" exact component={ZonesListPage} />
                    <Route path="/zones/new" exact component={NewZonePage} />
                    <Route path="/zones/:ZoneId" exact component={EditZonePage} />
                    <Route path="/logs" exact component={LogsListPage} />
                    <Route path="/logs/:EntryId" exact component={LogDetailPage} />
                    <Route path="/doors" exact component={DoorsListPage} />
                    <Route path="/doors/new" exact component={NewDoorPage} />
                    <Route path="/doors/map" exact component={DoorsMapPage} />
                    <Route path="/doors/:DoorId" exact component={DoorDetailPage} />
                    <Route path="/doors/:DoorId/edit" exact component={EditDoorPage} />
                    <Route path="/doors/:DoorId/notifications" exact component={DoorNotificationsPage} /> */}
                    {/* <Route
                      path="/subcompanies"
                      exact
                      component={SubcompaniesListPage}
                    />
                    <Route
                      path="/subcompanies/new"
                      exact
                      component={NewSubcompanyPage}
                    />
                    <Route
                      path="/subcompanies/:SubcompanyId"
                      exact
                      component={EditSubcompanyPage}
                    />
                    <Route path="/access" exact component={AccessListPage} />
                    <Route path="/access/new" exact component={NewAccessPage} />
                    <Route
                      path="/access/:AccessId"
                      exact
                      component={AccessDetailPage}
                    />
                    <Route
                      path="/access/:AccessId/edit"
                      exact
                      component={EditAccessPage}
                    />
                    <Route path="/revisions" exact component={RevisionsListPage} />
                    <Route path="/sensors" exact component={SensorsListPage} />
                    <Route path="/sensors/new" exact component={NewSensorPage} />
                    <Route path="/sensors/:SensorId" exact component={SensorDetailPage} />
                    <Route path="/sensors/:SensorId/edit" exact component={EditSensorPage} />
                    <Route path="/sensors/:SensorId/charts/new" exact component={NewChartPage} />
                    <Route path="/sensors/:SensorId/charts/:ChartId/edit" exact component={EditChartPage} />
                    <Route path="/companies" exact component={CompaniesListPage} />
                    <Route path="/companies/new" exact component={NewCompanyPage} />
                    <Route path="/companies/:CompanyId" exact component={EditCompanyPage} />

                    <Route path="/alerts" exact component={AlertsListPage} />

                    <Route path="/profile" exact component={ProfilePage} /> */}

                    <Route path="*">
                      <Redirect to="/" />
                    </Route>
                  </Switch>
                </Col>
              </div>
            </Container>
          </CurrentUserContext.Provider>
        </CurrentSettingContext.Provider>
      </Router>
    );
  } else {
    return (
      <Router history={history}>
        <Switch>
          <Route exact path="/">
            <Redirect to="/login" />
          </Route>
          <Route exact path="/login" component={LoginPage} />
          <Route path="/users/new" exact component={NewUserPage} />
          <Route path="*">
            <Redirect to="/login" />
          </Route>
        </Switch>
      </Router>
    );
  }
}

export default App;
