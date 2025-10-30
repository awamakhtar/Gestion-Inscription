import { AlertCircle, CheckCircle, XCircle, Info, X } from 'lucide-react';
import { useState } from 'react';

const Alert = ({ type = 'info', title, message, dismissible = true }) => {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  const config = {
    success: {
      icon: CheckCircle,
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
      iconColor: 'text-green-600',
      textColor: 'text-green-800'
    },
    error: {
      icon: XCircle,
      bgColor: 'bg-red-50',
      borderColor: 'border-red-200',
      iconColor: 'text-red-600',
      textColor: 'text-red-800'
    },
    warning: {
      icon: AlertCircle,
      bgColor: 'bg-yellow-50',
      borderColor: 'border-yellow-200',
      iconColor: 'text-yellow-600',
      textColor: 'text-yellow-800'
    },
    info: {
      icon: Info,
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      iconColor: 'text-blue-600',
      textColor: 'text-blue-800'
    }
  };

  const { icon: Icon, bgColor, borderColor, iconColor, textColor } = config[type];

  return (
    <div className={`${bgColor} border ${borderColor} rounded-lg p-4 mb-4`}>
      <div className="flex items-start">
        <Icon className={`w-5 h-5 ${iconColor} mt-0.5`} />
        <div className="ml-3 flex-1">
          {title && <h3 className={`text-sm font-semibold ${textColor}`}>{title}</h3>}
          <p className={`text-sm ${textColor} ${title ? 'mt-1' : ''}`}>{message}</p>
        </div>
        {dismissible && (
          <button onClick={() => setVisible(false)} className={`ml-3 ${iconColor}`}>
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};

export default Alert;