import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainSite from './sites/main/MainSite';
import AdminSite from './sites/admin/AdminSite';

interface AppProps {
  isAdmin?: boolean;
}

function App({ isAdmin = false }: AppProps) {
  if (isAdmin) {
    return <AdminSite />;
  }

  return <MainSite />;
}

export default App;