
import React from 'react';

interface Message {
  id: number;
  sender: string;
  subject: string;
  preview: string;
  time: string;
  read: boolean;
  folder: string;
}

interface MessageDetailProps {
  message: Message;
  onClose: () => void;
}

const MessageDetail: React.FC<MessageDetailProps> = ({ message, onClose }) => {
  return (
    <div className="flex-1 flex flex-col">
      <header className="h-16 border-b border-gray-200 bg-white flex items-center justify-between px-6">
        <div className="flex items-center gap-4">
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded">
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
          <h1 className="text-xl font-bold text-gray-800 truncate">{message.subject}</h1>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-1 hover:bg-gray-100 rounded"><span className="material-symbols-outlined">archive</span></button>
          <button className="p-1 hover:bg-gray-100 rounded"><span className="material-symbols-outlined">delete</span></button>
        </div>
      </header>
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        <div className="flex items-center gap-4">
          <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center font-bold text-gray-600">
            {message.sender.charAt(0)}
          </div>
          <div className="flex-1">
            <p className="font-bold text-gray-900">{message.sender}</p>
            <p className="text-sm text-gray-500">To: You</p>
          </div>
          <p className="text-sm text-gray-500">{message.time}</p>
        </div>
        <div className="prose max-w-none">
          <p>{message.preview}</p>
          {/* In a real application, this would be the full message body */}
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, 
            adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam. Maecenas ligula massa, varius a, semper congue, 
            eget, tellus.
          </p>
        </div>
      </div>
       <footer className="p-6 border-t border-gray-200 bg-white">
          <div className="flex gap-2">
            <button className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-100 text-sm font-medium">
              <span className="material-symbols-outlined">reply</span>
              Reply
            </button>
            <button className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-100 text-sm font-medium">
              <span className="material-symbols-outlined">forward</span>
              Forward
            </button>
          </div>
        </footer>
    </div>
  );
};

export default MessageDetail;
