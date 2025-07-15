import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSearchedFiles } from '../redux/searchFileSlice';

const SearchFile = () => {
  const dispatch = useDispatch();
  const { files: results, loading, error } = useSelector(state => state.search);

  const [filters, setFilters] = useState({
    file_number: '',
    subject: '',
    section: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(fetchSearchedFiles(filters));
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return 'bg-yellow-200 text-yellow-800';
      case 'in progress':
        return 'bg-blue-200 text-blue-800';
      case 'completed':
        return 'bg-green-200 text-green-800';
      case 'sent':
        return 'bg-purple-200 text-purple-800';
      case 'received':
        return 'bg-pink-200 text-pink-800';
      default:
        return 'bg-gray-200 text-gray-800';
    }
  };

  const getHeading = () => {
    return filters.section
      ? `${filters.section} Files Tracking`
      : 'Public Sector Files Tracking';
  };

  return (
    <main className="p-6 pt-[20px] bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-semibold mb-6">{getHeading()}</h1>
      <p className="text-gray-700 mb-6">
        This page helps in tracking the movement of files across all sections and departments.
      </p>

      {/* Filters */}
      <div className="bg-white p-4 rounded shadow-md">
        <h2 className="text-xl font-semibold mb-4">Track a File</h2>
        <form className="grid grid-cols-1 md:grid-cols-3 gap-4" onSubmit={handleSearch}>
          <input
            type="text"
            name="file_number"
            placeholder="File Number"
            value={filters.file_number}
            onChange={handleChange}
            className="border rounded p-2 w-full"
          />
          <input
            type="text"
            name="subject"
            placeholder="Subject"
            value={filters.subject}
            onChange={handleChange}
            className="border rounded p-2 w-full"
          />
          <select
            name="section"
            value={filters.section}
            onChange={handleChange}
            className="border rounded p-2 w-full"
          >
            <option value="">Select Section</option>
            <option>Secretary Office</option>
            <option>Admin Section</option>
            <option>Accounts Section</option>
            <option>Training Section</option>
            <option>Private Sector</option>
            <option>Public Sector</option>
            <option>I.T Section</option>
          </select>
          <button
            type="submit"
            className="col-span-1 md:col-span-3 bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded transition"
          >
            {loading ? 'Searching...' : 'Search'}
          </button>
        </form>
      </div>

      {/* Results */}
      <div className="bg-white p-4 rounded shadow-md mt-6 overflow-x-auto">
        <h2 className="text-xl font-semibold mb-4">Files Movement Log</h2>
        {error && (
          <div className="text-red-600 mb-4 text-sm">{error}</div>
        )}
        <table className="min-w-full table-auto border-collapse border border-gray-300 text-sm">
          <thead>
            <tr className="bg-blue-100">
              <th className="border border-gray-300 px-4 py-2 text-center">#</th>
              <th className="border border-gray-300 px-4 py-2 text-center">File Number</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Subject</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Current Section</th>
              <th className="border border-gray-300 px-4 py-2 text-center">Status</th>
              <th className="border border-gray-300 px-4 py-2 text-center">Last Updated</th>
              <th className="border border-gray-300 px-4 py-2 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="7" className="text-center py-4 text-gray-500">
                  Loading...
                </td>
              </tr>
            ) : results.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center py-4 text-gray-500">
                  No results found.
                </td>
              </tr>
            ) : (
              results.map((file, index) => (
                <tr key={file.id || index} className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2 text-center">{index + 1}</td>
                  <td className="border border-gray-300 px-4 py-2 text-center">{file.file_number}</td>
                  <td className="border border-gray-300 px-4 py-2">{file.subject}</td>
                  <td className="border border-gray-300 px-4 py-2">{file.section}</td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(file.status)}`}>
                      {file.status}
                    </span>
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center">{file.updated_at}</td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    <button className="text-blue-600 hover:underline text-sm">View</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </main>
  );
};

export default SearchFile;
