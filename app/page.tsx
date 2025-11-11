"use client"

import { useState } from 'react';
import HomePage from '@/components/HomePage';
import Dashboard from '@/components/Dashboard';

export default function DappPayApp() {
  const [currentPage, setCurrentPage] = useState<'home' | 'dashboard'>('home');

  return (
    <div>
      {currentPage === 'home' ? (
        <HomePage onNavigateToDashboard={() => setCurrentPage('dashboard')} />
      ) : (
        <Dashboard onBack={() => setCurrentPage('home')} />
      )}
    </div>
  );
}