import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from './App';
import Dashboard from './pages/Dashboard';
import EntityPage from './pages/EntityPage';
import { Invoices, POS, Reports, Settings } from './pages/Operations';
import { ERPProvider } from './context/ERPContext';
import { Toast } from './components/UI';
import './styles.css';

if ('serviceWorker' in navigator) window.addEventListener('load', () => navigator.serviceWorker.register('/service-worker.js').catch(() => {}));
createRoot(document.getElementById('root')).render(<StrictMode><ERPProvider><BrowserRouter><Routes><Route element={<App />}><Route path="/" element={<Dashboard />} /><Route path="/pos" element={<POS />} /><Route path="/invoices" element={<Invoices />} /><Route path="/products" element={<EntityPage type="products" />} /><Route path="/customers" element={<EntityPage type="customers" />} /><Route path="/suppliers" element={<EntityPage type="suppliers" />} /><Route path="/expenses" element={<EntityPage type="expenses" />} /><Route path="/reports" element={<Reports />} /><Route path="/settings" element={<Settings />} /><Route path="*" element={<Dashboard />} /></Route></Routes><Toast /></BrowserRouter></ERPProvider></StrictMode>);
