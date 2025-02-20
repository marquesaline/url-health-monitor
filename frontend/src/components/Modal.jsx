export default function Modal({ isOpen, onClose, children }) {
    if (!isOpen) return null;
  
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white p-6 rounded-lg shadow-lg w-96">
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800 float-right">
            ✖
          </button>
          {children}
        </div>
      </div>
    );
}
  