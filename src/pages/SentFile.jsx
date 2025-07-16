import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { postSentFile } from '../redux/sentFileSlice';


const SentFile = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector(state => state.sentFile);

  const [formData, setFormData] = useState({
    file_number: '',
    file_subject: '',
    file_description: '',
    sent_on: '',
    sent_to: '',
    remarks: '',
    reference_number: '',
    category: '',
    attachments: [],
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData(prev => ({ ...prev, [name]: files }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
      if (key === 'attachments') {
        for (let i = 0; i < value.length; i++) {
          data.append('attachments', value[i]);
        }
      } else {
        data.append(key, value);
      }
    });

    const resultAction = await dispatch(postSentFile(data));

    if (postSentFile.fulfilled.match(resultAction)) {
      alert('Sent file saved successfully!');
      setFormData({
        file_number: '',
        file_subject: '',
        file_description: '',
        sent_on: '',
        sent_to: '',
        remarks: '',
        reference_number: '',
        category: '',
        attachments: [],
      });
    } else {
      alert(resultAction.payload || 'Failed to save file.');
    }
  };


  return (
    <main className="p-6 pt-[20px]">
      <h1 className="text-3xl font-semibold mb-4">Sent File</h1>
      <p className="text-gray-700 mb-6">
        This page logs all sent files for tracking and auditing.
      </p>

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl shadow p-6 space-y-6"
        encType="multipart/form-data"
      >
        {/* File Number & Subject */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block font-medium text-gray-700 mb-1">File Number</label>
            <input
              type="text"
              name="file_number"
              value={formData.file_number}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block font-medium text-gray-700 mb-1">File Subject</label>
            <input
              type="text"
              name="file_subject"
              value={formData.file_subject}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* File Description */}
        <div>
          <label className="block font-medium text-gray-700 mb-1">File Description</label>
          <textarea
            name="file_description"
            value={formData.file_description}
            onChange={handleChange}
            rows="4"
            className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Sent On, To, and Category */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block font-medium text-gray-700 mb-1">Sent on Date</label>
            <input
              type="date"
              name="sent_on"
              value={formData.sent_on}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block font-medium text-gray-700 mb-1">Sent To</label>
            <select
              name="sent_to"
              value={formData.sent_to}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">-- Select Section --</option>
              <option>Admin Section</option>
              <option>Accounts Section</option>
              <option>Training Section</option>
              <option>Private Sector</option>
              <option>Public Sector</option>
              <option>I.T Section</option>
              <option>Secretary Office</option>
            </select>
          </div>
          <div>
            <label className="block font-medium text-gray-700 mb-1">Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">-- Select Category --</option>
              <option value="documents">Summary</option>
              <option value="images">Notification</option>
              <option value="videos">Order</option>
              <option value="reports">Budget Document</option>
              <option value="progressreport">Progress Report</option>
              <option value="baselinereport">Baseline Report</option>
              <option value="pmr">PMR</option>
              <option value="others">Other</option>
            </select>
          </div>
        </div>

        {/* Remarks */}
        <div>
          <label className="block font-medium text-gray-700 mb-1">Remarks</label>
          <textarea
            name="remarks"
            value={formData.remarks}
            onChange={handleChange}
            rows="2"
            className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Reference Number */}
        <div>
          <label className="block font-medium text-gray-700 mb-1">Reference Number (Optional)</label>
          <input
            type="text"
            name="reference_number"
            value={formData.reference_number}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Attachments */}
        <div>
          <label className="block font-medium text-gray-700 mb-1">Attachments</label>
          <input
            type="file"
            name="attachments"
            multiple
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Submit */}
        <div className="pt-4">
          <button
            type="submit"
            disabled={loading}
            className={`bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {loading ? 'Saving...' : 'Save'}
          </button>
          {error && <p className="text-red-500 mt-2">{error}</p>}
        </div>
      </form>
    </main>
  );
};

export default SentFile;
