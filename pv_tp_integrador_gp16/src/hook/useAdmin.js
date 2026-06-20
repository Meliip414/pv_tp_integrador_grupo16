import { useContext } from "react";
import { AdminContext } from "../context/AdminContex";

export const useAdmin = () => useContext(AdminContext);