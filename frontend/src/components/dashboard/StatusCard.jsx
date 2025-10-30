import { 
  Clock, 
  CheckCircle, 
  XCircle, 
  AlertCircle,
  Calendar,
  User,
  BookOpen 
} from 'lucide-react';

function StatusCard({ registration }) {
  const statusConfig = {
    pending: {
      label: 'En attente',
      icon: Clock,
      bgColor: 'bg-yellow-50',
      borderColor: 'border-yellow-200',
      iconColor: 'text-yellow-600',
      textColor: 'text-yellow-800',
      description: 'Votre dossier est en cours de traitement par l\'administration.'
    },
    approved: {
      label: 'Approuvé',
      icon: CheckCircle,
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
      iconColor: 'text-green-600',
      textColor: 'text-green-800',
      description: 'Félicitations ! Votre inscription a été approuvée.'
    },
    rejected: {
      label: 'Rejeté',
      icon: XCircle,
      bgColor: 'bg-red-50',
      borderColor: 'border-red-200',
      iconColor: 'text-red-600',
      textColor: 'text-red-800',
      description: 'Votre demande n\'a pas été acceptée.'
    },
    incomplete: {
      label: 'Incomplet',
      icon: AlertCircle,
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-200',
      iconColor: 'text-orange-600',
      textColor: 'text-orange-800',
      description: 'Des documents supplémentaires sont requis.'
    }
  };

  const currentStatus = statusConfig[registration?.status] || statusConfig.pending;
  const StatusIcon = currentStatus.icon;

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (!registration) {
    return (
      <div className="card">
        <p className="text-gray-500">Aucune information disponible</p>
      </div>
    );
  }

  return (
    <div className={`card border-l-4 ${currentStatus.borderColor} ${currentStatus.bgColor}`}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className={`p-3 rounded-full ${currentStatus.bgColor}`}>
            <StatusIcon className={`w-6 h-6 ${currentStatus.iconColor}`} />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900">
              {registration.student_name || 'Élève'}
            </h3>
            <span className={`inline-block mt-1 px-3 py-1 rounded-full text-sm font-semibold ${currentStatus.textColor}`}>
              {currentStatus.label}
            </span>
          </div>
        </div>
        <div className="text-right">
          <p className="text-xs text-gray-500">Dossier N°</p>
          <p className="text-lg font-mono font-bold text-gray-900">
            {registration.registration_number || 'N/A'}
          </p>
        </div>
      </div>

      <div className={`mb-4 p-3 rounded-lg ${currentStatus.bgColor} border ${currentStatus.borderColor}`}>
        <p className={`text-sm ${currentStatus.textColor}`}>
          {currentStatus.description}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div className="flex items-center space-x-2">
          <BookOpen className="w-5 h-5 text-gray-400" />
          <div>
            <p className="text-xs text-gray-500">Niveau</p>
            <p className="font-semibold text-gray-900">{registration.level || 'N/A'}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Calendar className="w-5 h-5 text-gray-400" />
          <div>
            <p className="text-xs text-gray-500">Soumis le</p>
            <p className="font-semibold text-gray-900">{formatDate(registration.submitted_at)}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <User className="w-5 h-5 text-gray-400" />
          <div>
            <p className="text-xs text-gray-500">ID</p>
            <p className="font-semibold text-gray-900">#{registration.id || 'N/A'}</p>
          </div>
        </div>
      </div>

      {registration.message && (
        <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-xs font-semibold text-blue-800 mb-1">Message :</p>
          <p className="text-sm text-blue-900">{registration.message}</p>
        </div>
      )}

      <div className="mt-6 flex flex-wrap gap-3">
        <button className="btn-secondary">Voir les détails</button>
      </div>
    </div>
  );
}

export default StatusCard;