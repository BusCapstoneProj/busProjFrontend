

import React, { createContext, useState, useEffect } from 'react';

export const RoleContext = createContext();

export const RoleProvider = ({ children }) => {

 const [role, setRole] = useState(null);

 useEffect(() => {

  // Fetch role from session storage on load

  const storedRole = sessionStorage.getItem('role');

  if (storedRole) setRole(storedRole);

 }, []);

 const updateRole = (newRole) => {

  setRole(newRole);

 };

 const logout = () => {

  sessionStorage.clear();

  setRole(null);

 };

 return (

  <RoleContext.Provider value={{ role, updateRole, logout }}>

   {children}

  </RoleContext.Provider>

 );

};