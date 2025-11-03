"use client";

import React, { useEffect, useState } from "react";

interface LoginSuccessModalProps {
  message?: string;
  onClose?: () => void;
}

const LoginSuccessModal: React.FC<LoginSuccessModalProps> = ({
  message = "Login Successful!",
  onClose,
}) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      if (onClose) onClose();
    }, 2000); // 2 seconds
    return () => clearTimeout(timer);
  }, [onClose]);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
      <div className="bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg animate-fade-in pointer-events-auto">
        {message}
      </div>

      {/* Optional Tailwind animation */}
      <style>{`
        @keyframes fade-in {
          0% { opacity: 0; transform: translateY(-10px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default LoginSuccessModal;
