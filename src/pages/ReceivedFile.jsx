import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addReceivedFile } from '../redux/receivedFileSlice';

const ReceivedFile = () => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    file_number: '',
    file_subject: '',
    file_description: '',
    received_on: '',
    received_from: '',
    category: '',
    remarks: '',
    attachments: [],
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData((prev) => ({ ...prev, [name]: files }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
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

    try {
      const resultAction = await dispatch(addReceivedFile(data));

      if (addReceivedFile.fulfilled.match(resultAction)) {
        alert('Received file saved successfully!');
        setFormData({
          file_number: '',
          file_subject: '',
          file_description: '',
          received_on: '',
          received_from: '',
          category: '',
          remarks: '',
          attachments: [],
        });
      } else {
        alert('Error: ' + resultAction.payload || 'Submission failed');
      }
    } catch (error) {
      console.error(error);
      alert('Something went wrong.');
    }
  };

  return (
    <div>
      <main className="p-6 pt-[20px]">
        <h1 className="text-3xl font-semibold mb-4">Received File</h1>
        <p className="text-gray-700 mb-6">
          This page lists all received files for review and processing.
        </p>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-xl shadow-md p-6 space-y-4"
          encType="multipart/form-data"
        >
          {/* File Number & Subject */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold mb-1">File Number</label>
              <input
                type="text"
                name="file_number"
                value={formData.file_number}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded px-4 py-2"
              />
            </div>
            <div>
              <label className="block font-semibold mb-1">File Subject</label>
              <input
                type="text"
                name="file_subject"
                value={formData.file_subject}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded px-4 py-2"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block font-semibold mb-1">File Description</label>
            <textarea
              name="file_description"
              value={formData.file_description}
              onChange={handleChange}
              rows="4"
              className="w-full border border-gray-300 rounded px-4 py-2"
            />
          </div>

          {/* Received / Sent Dates and From / To */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold mb-1">Received On</label>
              <input
                type="date"
                name="received_on"
                value={formData.received_on}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded px-4 py-2"
              />
            </div>
            <div>
              <label className="block font-semibold mb-1">Received From</label>
              <select
                name="received_from"
                value={formData.received_from}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded px-4 py-2"
              >
                <option value="">-- Select Section --</option>
                <option>Admin Section</option>
                <option>Accounts Section</option>
                <option>Training Section</option>
                <option>Private Sector</option>
                <option>Public Sector</option>
                <option>I.T Section</option>
              </select>
            </div>
          </div>

          {/* Category */}
          <div>
            <label className="block font-semibold mb-1">Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded px-4 py-2"
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

          {/* Remarks */}
          <div>
            <label className="block font-semibold mb-1">Remarks</label>
            <textarea
              name="remarks"
              value={formData.remarks}
              onChange={handleChange}
              rows="2"
              className="w-full border border-gray-300 rounded px-4 py-2"
            />
          </div>

          {/* Attachments */}
          <div>
            <label className="block font-semibold mb-1">Attachments</label>
            <input
              type="file"
              name="attachments"
              multiple
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-4 py-2"
            />
          </div>

          {/* Submit */}
          <div className="pt-4">
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
            >
              Save
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default ReceivedFile;
