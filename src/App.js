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
import DashboardPage from "./app/dashboard/DashboardPage.js";

import NewUserPage from "./app/users/NewUserPage.js";
import UsersListPage from "./app/users/UserListPage.js";
import EditUserPage from "./app/users/EditUserPage.js";

import SuppliesListPage from "./app/supplies/SupplieListPage.js";
import NewSuppliePage from "./app/supplies/NewSuppliePage.js"
import EditSuppliePage from "./app/supplies/EditSuppliePage.js"

import TablesListPage from "./app/tables/TableListPage.js"
import Notification from "./app/shared/Notifications.js";

import ProductListPage from "./app/products/ProductListPage.js";
import NewProductPage from "./app/products/NewProductPage.js";
import EditProductPage from "./app/products/EditProductPage.js";

// import { fetchCurrentUser } from "./actions/users.actions.js";
// import { getSettings } from "./reducers/auth.reducer.js"

export const CurrentRoleContext = React.createContext({})
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

  const currentRole = useSelector(state => state.auth.currentRole)
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
        <Notification></Notification>

        {/* value={currentSettings} */}
        {/* value={currentUser} */}
        <CurrentSettingContext.Provider >
          <CurrentRoleContext.Provider value={currentRole}>
            <Container fluid={true} className="p-0">
              <div className="row m-0">

                <SidebarWrapper isOpen={isOpen} setOpen={setOpen} />

                <Col {...handlers} className="col-md-9 ml-sm-auto col-lg-10 px-md-2" style={{ height: '100vh' }}>
                  <Switch>
                    <Route path="/" exact>
                      <Redirect to="/dashboard" />

                    </Route>
                    <Route path="/users/new" exact component={NewUserPage} />
                    <Route path="/users" exact component={UsersListPage} />
                    <Route path="/users/:UserId/edit" exact component={EditUserPage} />
                    <Route path="/dashboard" exact component={DashboardPage} />
                    <Route path="/supplies" exact component={SuppliesListPage} />
                    <Route path="/supplies/new" exact component={NewSuppliePage} />
                    <Route path="/supplies/:SupplieId/edit" exact component={EditSuppliePage} />
                    <Route path="/tables" exact component={TablesListPage} />

                    <Route path="/products" exact component={ProductListPage} />
                    <Route path="/products/new" exact component={NewProductPage} />
                    <Route path="/products/:ProductId/edit" exact component={EditProductPage} />
                    <Route path="*">
                      <Redirect to="/" />
                    </Route>
                  </Switch>
                </Col>
              </div>
            </Container>
          </CurrentRoleContext.Provider>
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
          {/* <Route path="/users/new" exact component={NewUserPage} /> */}
          <Route path="*">
            <Redirect to="/login" />
          </Route>
        </Switch>
      </Router>
    );
  }
}

export default App;
