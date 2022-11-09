import React, { useEffect } from "react";
import PropTypes from 'prop-types';

import { Switch, BrowserRouter as Router } from "react-router-dom";
import { connect, useSelector, useDispatch } from "react-redux";


// Import Routes all
import { userRoutes, authRoutes } from "./routes/allRoutes";

// Import all middleware
import Authmiddleware from "./routes/middleware/Authmiddleware";

// layouts Format
import VerticalLayout from "./components/VerticalLayout/";
import HorizontalLayout from "./components/HorizontalLayout/";
import NonAuthLayout from "./components/NonAuthLayout";

// Import scss
import "./assets/scss/theme.scss";
import "./assets/scss/preloader.scss";

// Import Firebase Configuration file
// import { initFirebaseBackend } from "./helpers/firebase_helper"

import fakeBackend from "./helpers/AuthType/fakeBackend";
import { getPermission } from "store/actions";


// Activating fake backend
fakeBackend();

const App = props => {

  const { user } = useSelector(state => state?.Login)
  const dispatch = useDispatch();


  useEffect(() => {
    if (user?.user) {
      const params = {
        slug: user?.user?.roleId
      }
      dispatch(getPermission({ ...params }))
    }
    else {
      localStorage.getItem('roleId') && dispatch(getPermission({ slug: localStorage.getItem('roleId') }))
    }
  }, [user?.user?.roleId])


  function getLayout() {
    let layoutCls = VerticalLayout
    switch (props.layout.layoutType) {
      case "horizontal":
        layoutCls = HorizontalLayout
        break
      default:
        layoutCls = VerticalLayout
        break
    }
    return layoutCls
  }

  const Layout = getLayout()
  return (
    <React.Fragment>
      <Router>
        <Switch>
          {authRoutes.map((route, idx) => (
            <Authmiddleware
              path={route.path}
              layout={NonAuthLayout}
              component={route.component}
              key={idx}
              isAuthProtected={false}
              exact
            />
          ))}

          {userRoutes.map((route, idx) => (
            <Authmiddleware
              path={route.path}
              layout={Layout}
              component={route.component}
              key={idx}
              isAuthProtected={true}
              exact
            />
          ))}
        </Switch>
      </Router>
    </React.Fragment>
  )
}

App.propTypes = {
  layout: PropTypes.any
}

const mapStateToProps = state => {
  return {
    layout: state.Layout,
  }
}

export default connect(mapStateToProps, null)(App)