import React from 'react';
const userContext = React.createContext({
  user: {},
  loginUser: () => {},
  loginOAuth: () => {},
  logoutUser: () => {},
  toggleMenu: () => {}
}); // Create a context object

export {
  userContext // Export it so it can be used by other Components
};