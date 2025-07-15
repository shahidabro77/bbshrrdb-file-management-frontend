// src/api/dashboardApi.js
import axios from '../api';

export const fetchDashboardStats = () => axios.get('/dashboard').then(res => res.data);
export const fetchRecentFiles = () => axios.get('/dashboard/files').then(res => res.data);
export const fetchChartData = () => axios.get('/dashboard/charts').then(res => res.data);
