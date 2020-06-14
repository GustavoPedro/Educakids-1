import React from 'react';
import PropTypes from 'prop-types';
import { Redirect, Route } from 'react-router-dom';
import {isAuthenticated, getRole} from './auth';

function RouteWrapper({
  redirectTo, homePage, isPrivate, AdmRoute, component: Component, ...rest}) {

  const authenticated = isAuthenticated();
  const admUser = (getRole() === "Adm" || getRole() === "Professor");


  if (authenticated && !isPrivate) return <Redirect to={homePage} />;
  if (!authenticated && isPrivate) return <Redirect to={redirectTo} />;
  if (AdmRoute && !admUser) return <Redirect to={homePage} />;

  return <Route {...rest} render={props => <Component {...props} />} />;
}

RouteWrapper.propTypes = {
  redirectTo: PropTypes.string,
  isPrivate: PropTypes.bool,
  component: PropTypes.oneOfType([PropTypes.element, PropTypes.func])
    .isRequired,
};

RouteWrapper.defaultProps = {
  redirectTo: '/in',
  homePage: '/',
  isPrivate: false,
  AdmRoute: false,
};

export default RouteWrapper;