import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';
import { useSelector, useDispatch } from 'react-redux';
import {
  getDashboardStats,
  getRecentFiles,
  getChartData,
} from '../redux/dashboardSlice';

const Dashboard = () => {
  const pieRef = useRef(null);
  const barRef = useRef(null);
  const dispatch = useDispatch();

  const { stats, files, charts, loading, error } = useSelector(
    (state) => state.dashboard
  );

  const [searchTerm, setSearchTerm] = useState('');
  const [pieInstance, setPieInstance] = useState(null);
  const [barInstance, setBarInstance] = useState(null);

  useEffect(() => {
    dispatch(getDashboardStats());
    dispatch(getRecentFiles());
    dispatch(getChartData());
  }, [dispatch]);

  useEffect(() => {
    if (charts?.pie && pieRef.current) {
      if (pieInstance) pieInstance.destroy();
      const newPie = new Chart(pieRef.current, {
        type: 'pie',
        data: {
          labels: Object.keys(charts.pie),
          datasets: [
            {
              data: Object.values(charts.pie),
              backgroundColor: ['#22c55e', '#facc15', '#3b82f6', '#ef4444'],
            },
          ],
        },
      });
      setPieInstance(newPie);
    }

    if (charts?.bar && barRef.current) {
      if (barInstance) barInstance.destroy();
      const newBar = new Chart(barRef.current, {
        type: 'bar',
        data: {
          labels: Object.keys(charts.bar),
          datasets: [
            {
              label: 'Files by Section',
              data: Object.values(charts.bar),
              backgroundColor: '#3b82f6',
            },
          ],
        },
        options: {
          responsive: true,
          scales: {
            y: { beginAtZero: true },
          },
        },
      });
      setBarInstance(newBar);
    }
  }, [charts]);

  const filteredFiles = files.filter((file) =>
    Object.values(file).some((value) =>
      String(value).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const cards = stats
    ? [
        {
          icon: 'fa-folder-open',
          color: 'bg-blue-500',
          title: 'Total Files',
          count: stats.totalFiles,
        },
        {
          icon: 'fa-inbox',
          color: 'bg-green-500',
          title: 'Received',
          count: stats.received,
        },
        {
          icon: 'fa-paper-plane',
          color: 'bg-yellow-500',
          title: 'Sent',
          count: stats.sent,
        },
        {
          icon: 'fa-users',
          color: 'bg-purple-500',
          title: 'Users',
          count: stats.users,
        },
      ]
    : [];

  return (
    <main className="p-6 pt-[20px]">
      <h1 className="text-3xl font-semibold mb-4">Dashboard</h1>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
        {cards.map(({ icon, color, title, count }) => (
          <div
            key={title}
            className={`rounded-2xl shadow p-4 flex items-center space-x-4 text-white ${color}`}
          >
            <i className={`fas ${icon} text-3xl`}></i>
            <div>
              <h4 className="text-lg font-semibold">{title}</h4>
              <p className="text-2xl font-bold">{count}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow p-6 mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
          <h2 className="text-xl font-semibold mb-2 md:mb-0">Recent Files</h2>
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full md:w-1/3"
          />
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 text-sm">
            <thead className="bg-gray-100 text-left text-gray-700 uppercase tracking-wider">
              <tr>
                <th className="px-4 py-2">File #</th>
                <th className="px-4 py-2">Subject</th>
                <th className="px-4 py-2">From</th>
                <th className="px-4 py-2">Received On</th>
                <th className="px-4 py-2">Remarks</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredFiles.length > 0 ? (
                filteredFiles.map((file) => (
                  <tr key={file.file_id}>
                    <td className="px-4 py-2">{file.file_number}</td>
                    <td className="px-4 py-2">{file.file_subject}</td>
                    <td className="px-4 py-2">{file.received_from}</td>
                    <td className="px-4 py-2">{file.received_on}</td>
                    <td className="px-4 py-2">{file.remarks}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="px-4 py-2 text-center" colSpan="5">
                    No matching files found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl shadow p-6">
          <h2 className="text-xl font-semibold mb-4">File Distribution</h2>
          <canvas ref={pieRef} height="200"></canvas>
        </div>
        <div className="bg-white rounded-2xl shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Files by Section</h2>
          <canvas ref={barRef} height="200"></canvas>
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
