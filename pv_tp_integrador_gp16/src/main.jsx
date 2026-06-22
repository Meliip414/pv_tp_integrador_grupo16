import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/css/trabajo.css';

import { RouterProvider } from 'react-router-dom';
import routes from './routes/routes.jsx';

import { AdminProvider } from './context/AdminContext';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AdminProvider>
      <RouterProvider router={routes} />
    </AdminProvider>
  </StrictMode>
);