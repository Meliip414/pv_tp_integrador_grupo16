import { createContext, useState, useEffect } from "react";
export const AdminContext = createContext(null);

export const AdminProvider = ({ children }) => {

  const [adminActivo, setAdminActivo] = useState(() => {
    const adminGuardado = localStorage.getItem("adminActivo");

  if (adminGuardado) {
    return JSON.parse(adminGuardado);
  }

  return null;
});

useEffect(() => {
  localStorage.setItem(
    "adminActivo",
    JSON.stringify(adminActivo)
  );
}, [adminActivo]);

  const guardarSesion = (admin) => {
    setAdminActivo(admin);
  };

  const cerrarSesion = () => {
    setAdminActivo(null);
  };

  return (
    <AdminContext.Provider
      value={{
        adminActivo,
        guardarSesion,
        cerrarSesion
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};