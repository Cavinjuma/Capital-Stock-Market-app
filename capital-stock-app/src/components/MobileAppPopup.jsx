// src/components/MobileAppPopup.jsx
import { useState, useEffect } from 'react';

const MobileAppPopup = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Check if user has dismissed the popup before
    const hasSeenPopup = localStorage.getItem('mobileAppPopupSeen');
    if (!hasSeenPopup) {
      // Optional: only show on mobile devices
      const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
      if (isMobile) {
        setIsOpen(true);
      } else {
        // If you want to show on desktop as well, remove the isMobile check
        setIsOpen(true);
      }
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    localStorage.setItem('mobileAppPopupSeen', 'true');
  };

  const handleDownload = () => {
    // Replace with your actual app store links
    // For iOS: https://apps.apple.com/your-app-id
    // For Android: https://play.google.com/store/apps/your-app
    const userAgent = navigator.userAgent;
    if (/iPhone|iPad|iPod/.test(userAgent)) {
      window.location.href = 'https://apps.apple.com/your-app-id';
    } else if (/Android/.test(userAgent)) {
      window.location.href = 'https://play.google.com/store/apps/your-app';
    } else {
      // Fallback for desktop – show a message or link to a download page
      window.open('https://your-website.com/download', '_blank');
    }
    handleClose(); // close popup after click (optional)
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6 relative animate-fadeIn">
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition"
          aria-label="Close"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Icon (optional) */}
        <div className="flex justify-center mb-4">
          <div className="bg-blue-100 rounded-full p-3">
            <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
          </div>
        </div>

        <h2 className="text-xl font-bold text-center text-gray-800 mb-2">
          Get Our Mobile App
        </h2>
        <p className="text-gray-600 text-center mb-6">
          Enjoy faster access, real‑time notifications, and a seamless trading experience on your phone.
        </p>

        <div className="flex flex-col gap-3">
          <button
            onClick={handleDownload}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-lg transition flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M9 16h6v-6h4l-7-7-7 7h4v6zm-4 2h14v2H5v-2z"/>
            </svg>
            Download Now
          </button>
          <button
            onClick={handleClose}
            className="w-full text-gray-500 hover:text-gray-700 text-sm py-2"
          >
            No thanks
          </button>
        </div>

        <p className="text-xs text-center text-gray-400 mt-4">
          Available on iOS and Android
        </p>
      </div>
    </div>
  );
};

export default MobileAppPopup;