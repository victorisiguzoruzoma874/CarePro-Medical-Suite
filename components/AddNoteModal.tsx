
import React, { useState } from 'react';

interface AddNoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  patientName: string;
}

const AddNoteModal: React.FC<AddNoteModalProps> = ({ isOpen, onClose, patientName }) => {
  const [noteContent, setNoteContent] = useState('');

  if (!isOpen) return null;

  const handleSubmit = () => {
    if (noteContent.trim()) {
      console.log(`Note for ${patientName}: ${noteContent}`);
      alert(`Note added for ${patientName}!`);
      setNoteContent('');
      onClose();
    } else {
      alert('Note content cannot be empty.');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-xl transform transition-all">
        <div className="px-6 py-4 bg-gray-50 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-lg font-bold text-gray-900">Add New Note for {patientName}</h2>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-200">
            <span className="material-symbols-outlined text-gray-600">close</span>
          </button>
        </div>
        <div className="p-6 space-y-4">
          <div>
            <label htmlFor="noteContent" className="block text-sm font-medium text-gray-700">Note</label>
            <textarea
              id="noteContent"
              rows={6}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your clinical note here..."
              value={noteContent}
              onChange={(e) => setNoteContent(e.target.value)}
            ></textarea>
          </div>
        </div>
        <div className="px-6 py-3 bg-gray-50 border-t border-gray-200 flex justify-end gap-3">
          <button 
            onClick={onClose}
            className="bg-white border border-gray-300 text-gray-700 font-bold py-2 px-4 rounded-lg hover:bg-gray-50"
          >
            Cancel
          </button>
          <button 
            onClick={handleSubmit}
            className="bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700"
          >
            Add Note
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddNoteModal;
