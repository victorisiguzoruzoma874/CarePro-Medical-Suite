
import React, { useState } from 'react';
import ComposeModal from '../components/ComposeModal';
import MessageDetail from '../components/MessageDetail';

const Messages: React.FC = () => {
  const [activeFolder, setActiveFolder] = useState('Inbox');

  const [isComposeOpen, setIsComposeOpen] = useState(false);

  const [messages, setMessages] = useState([
    { id: 1, sender: 'Dr. Sarah Chen', subject: 'Consult for Patient Doe', preview: 'Can you please review the EKG for patient in room 304B?', time: '10:30 AM', read: false, folder: 'Inbox' },
    { id: 2, sender: 'Lab Results', subject: 'Critical Value Alert: Troponin', preview: 'High sensitivity troponin I result for Patient MRN-4523523 is elevated.', time: '09:15 AM', read: true, folder: 'Inbox' },
    { id: 3, sender: 'Pharmacy', subject: 'Medication Clarification', preview: 'Regarding the order for Lisinopril, please confirm dosage frequency.', time: 'Yesterday', read: true, folder: 'Inbox' },
    { id: 4, sender: 'Admin', subject: 'Staff Meeting Reminder', preview: 'Department meeting scheduled for Friday at 2 PM in Conference Room B.', time: 'Yesterday', read: true, folder: 'Inbox' },
    { id: 5, sender: 'Dr. John Doe', subject: 'Patient Handover', preview: 'Handover notes for patient in room 201A.', time: '2 days ago', read: true, folder: 'Sent' },
  ]);

  const [selectedMessage, setSelectedMessage] = useState(null);

  const handleMessageClick = (message) => {
    setSelectedMessage(message);
    const newMessages = messages.map(msg => 
      msg.id === message.id ? { ...msg, read: true } : msg
    );
    setMessages(newMessages);
  };

  const filteredMessages = messages.filter(msg => msg.folder === activeFolder);

  return (
    <>
      <div className="flex h-screen bg-gray-50">
        {/* Messages Sidebar */}
        <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
          <div className="p-4">
            <button
              onClick={() => setIsComposeOpen(true)}
              className="w-full bg-blue-600 text-white font-bold py-2.5 px-4 rounded-lg hover:bg-blue-700 transition-colors shadow-sm flex items-center justify-center gap-2">
              <span className="material-symbols-outlined text-xl">edit_square</span>
              Compose
            </button>
          </div>
          <nav className="flex-1 px-2 space-y-1">
            {['Inbox', 'Sent', 'Drafts', 'Archived', 'Trash'].map((folder) => (
              <div
                key={folder}
                onClick={() => {
                  setActiveFolder(folder);
                  setSelectedMessage(null); // Go back to list view when changing folder
                }}
                className={`flex items-center justify-between px-3 py-2 rounded-lg cursor-pointer text-sm font-medium ${
                  activeFolder === folder ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-xl">
                      {folder === 'Inbox' ? 'inbox' : folder === 'Sent' ? 'send' : folder === 'Drafts' ? 'draft' : folder === 'Archived' ? 'inventory_2' : 'delete'}
                  </span>
                  {folder}
                </div>
                {folder === 'Inbox' && <span className="bg-blue-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">2</span>}
              </div>
            ))}
          </nav>
        </div>

        {/* Main Content */}
        {selectedMessage ? (
          <MessageDetail message={selectedMessage} onClose={() => setSelectedMessage(null)} />
        ) : (
          <div className="flex-1 flex flex-col">
            <header className="h-16 border-b border-gray-200 bg-white flex items-center justify-between px-6">
              <h1 className="text-xl font-bold text-gray-800">{activeFolder}</h1>
              <div className="flex items-center gap-2 text-gray-500">
                <span className="text-sm">1-{filteredMessages.length} of {filteredMessages.length}</span>
                <button className="p-1 hover:bg-gray-100 rounded"><span className="material-symbols-outlined">chevron_left</span></button>
                <button className="p-1 hover:bg-gray-100 rounded"><span className="material-symbols-outlined">chevron_right</span></button>
              </div>
            </header>

            <div className="flex-1 overflow-y-auto">
                {filteredMessages.map((msg) => (
                    <div 
                      key={msg.id} 
                      onClick={() => handleMessageClick(msg)}
                      className={`flex items-start gap-4 p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${!msg.read ? 'bg-blue-50/40' : 'bg-white'}`}
                    >
                      <div className={`mt-1 h-3 w-3 rounded-full ${!msg.read ? 'bg-blue-600' : 'bg-transparent'}`}></div>
                      <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-baseline mb-1">
                              <h3 className={`text-sm truncate ${!msg.read ? 'font-bold text-gray-900' : 'font-medium text-gray-700'}`}>{msg.sender}</h3>
                              <span className="text-xs text-gray-500 whitespace-nowrap">{msg.time}</span>
                          </div>
                          <p className={`text-sm mb-1 ${!msg.read ? 'font-semibold text-gray-900' : 'text-gray-900'}`}>{msg.subject}</p>
                          <p className="text-sm text-gray-500 truncate">{msg.preview}</p>
                      </div>
                    </div>
                ))}
            </div>
          </div>
        )}
      </div>
      <ComposeModal isOpen={isComposeOpen} onClose={() => setIsComposeOpen(false)} />
    </>
  );
};

export default Messages;
