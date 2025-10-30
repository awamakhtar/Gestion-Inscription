import { useState } from 'react';
import { Search, FileSearch, AlertCircle, CheckCircle2, Clock, XCircle } from 'lucide-react';
import { toast } from 'react-hot-toast';
import axios from '../api/axios';
import StatusCard from '../components/dashboard/StatusCard';
import Loader from '../components/common/Loader';

function TrackRegistration() {
  const [formData, setFormData] = useState({
    registration_number: '',
    email: ''
  });
  const [registration, setRegistration] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    
    if (!formData.registration_number || !formData.email) {
      toast.error('Veuillez remplir tous les champs');
      return;
    }

    setLoading(true);
    setSearched(true);

    try {
      const response = await axios.post('/registrations/track', {
        registration_number: formData.registration_number,
        email: formData.email
      });

      setRegistration(response.data);
      toast.success('Inscription trouvée !');
    } catch (error) {
      setRegistration(null);
      if (error.response?.status === 404) {
        toast.error('Aucune inscription trouvée avec ces informations');
      } else {
        toast.error('Une erreur est survenue. Veuillez réessayer.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFormData({ registration_number: '', email: '' });
    setRegistration(null);
    setSearched(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="bg-primary-100 p-4 rounded-full">
              <FileSearch className="w-12 h-12 text-primary-600" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Suivre mon inscription
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Entrez votre numéro de dossier et votre email pour consulter 
            l'état de votre demande d'inscription en temps réel.
          </p>
        </div>

        <div className="card mb-8">
          <form onSubmit={handleSearch} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Numéro de dossier
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="registration_number"
                  value={formData.registration_number}
                  onChange={handleChange}
                  placeholder="Ex: INS2024-0123"
                  className="input-field pl-12 uppercase"
                  disabled={loading}
                />
                <FileSearch className="absolute left-4 top-3 w-5 h-5 text-gray-400" />
              </div>
              <p className="mt-1 text-xs text-gray-500">
                Le numéro de dossier vous a été envoyé par email après votre inscription
              </p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Adresse email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="votre@email.com"
                className="input-field"
                disabled={loading}
              />
            </div>

            <div className="flex gap-3">
              <button
                type="submit"
                disabled={loading}
                className="btn-primary flex-1 flex items-center justify-center space-x-2"
              >
                {loading ? (
                  <>
                    <Loader size="small" />
                    <span>Recherche...</span>
                  </>
                ) : (
                  <>
                    <Search className="w-5 h-5" />
                    <span>Rechercher</span>
                  </>
                )}
              </button>
              
              {searched && (
                <button
                  type="button"
                  onClick={handleReset}
                  className="btn-secondary"
                >
                  Nouvelle recherche
                </button>
              )}
            </div>
          </form>
        </div>

        {loading && (
          <div className="flex justify-center items-center py-12">
            <Loader size="large" text="Recherche en cours..." />
          </div>
        )}

        {!loading && searched && !registration && (
          <div className="card border-2 border-red-200 bg-red-50">
            <div className="flex items-start space-x-3">
              <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-lg font-semibold text-red-900 mb-2">
                  Aucune inscription trouvée
                </h3>
                <p className="text-red-700 mb-4">
                  Vérifiez que votre numéro de dossier et votre email sont corrects.
                </p>
                <div className="bg-white p-4 rounded-lg border border-red-200">
                  <p className="text-sm font-semibold text-gray-900 mb-2">
                    Besoin d'aide ?
                  </p>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Vérifiez votre email de confirmation</li>
                    <li>• Le numéro de dossier est au format: INS2024-XXXX</li>
                    <li>• Contactez-nous au: +221 XX XXX XX XX</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {!loading && registration && (
          <div className="space-y-6">
            <StatusCard registration={registration} />

            {registration.timeline && registration.timeline.length > 0 && (
              <div className="card">
                <h3 className="text-xl font-bold text-gray-900 mb-6">
                  Historique de progression
                </h3>
                <Timeline events={registration.timeline} />
              </div>
            )}

            {registration.status === 'incomplete' && registration.missing_documents?.length > 0 && (
              <div className="card border-2 border-orange-200 bg-orange-50">
                <div className="flex items-start space-x-3 mb-4">
                  <AlertCircle className="w-6 h-6 text-orange-600 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-semibold text-orange-900 mb-2">
                      Documents manquants
                    </h3>
                    <p className="text-orange-700 mb-4">
                      Veuillez fournir les documents suivants pour compléter votre dossier :
                    </p>
                  </div>
                </div>
                <ul className="space-y-2">
                  {registration.missing_documents.map((doc, index) => (
                    <li key={index} className="flex items-center space-x-3 bg-white p-3 rounded-lg">
                      <XCircle className="w-5 h-5 text-orange-500" />
                      <span className="text-gray-900">{doc}</span>
                    </li>
                  ))}
                </ul>
                <button className="mt-4 bg-orange-600 hover:bg-orange-700 text-white font-semibold 
                                 py-2 px-4 rounded-lg transition duration-200 w-full">
                  Télécharger les documents manquants
                </button>
              </div>
            )}

            <div className="card bg-blue-50 border-2 border-blue-200">
              <h3 className="text-lg font-semibold text-blue-900 mb-3">
                Besoin d'assistance ?
              </h3>
              <p className="text-blue-800 mb-4">
                Notre équipe est disponible pour vous aider :
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-lg">
                  <p className="text-sm font-semibold text-gray-700 mb-1">📞 Téléphone</p>
                  <p className="text-gray-900">+221 XX XXX XX XX</p>
                </div>
                <div className="bg-white p-4 rounded-lg">
                  <p className="text-sm font-semibold text-gray-700 mb-1">📧 Email</p>
                  <p className="text-gray-900">inscriptions@ecole.sn</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function Timeline({ events }) {
  const getIcon = (type) => {
    switch (type) {
      case 'submitted':
        return <CheckCircle2 className="w-5 h-5" />;
      case 'pending':
        return <Clock className="w-5 h-5" />;
      case 'approved':
        return <CheckCircle2 className="w-5 h-5" />;
      case 'rejected':
        return <XCircle className="w-5 h-5" />;
      default:
        return <Clock className="w-5 h-5" />;
    }
  };

  const getColor = (type) => {
    switch (type) {
      case 'submitted':
        return 'bg-blue-500';
      case 'pending':
        return 'bg-yellow-500';
      case 'approved':
        return 'bg-green-500';
      case 'rejected':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  if (!events || events.length === 0) {
    return (
      <p className="text-gray-500 text-center py-4">
        Aucun événement à afficher pour le moment
      </p>
    );
  }

  return (
    <div className="space-y-4">
      {events.map((event, index) => (
        <div key={index} className="flex items-start space-x-4">
          <div className="flex flex-col items-center">
            <div className={`${getColor(event.type)} text-white p-2 rounded-full`}>
              {getIcon(event.type)}
            </div>
            {index < events.length - 1 && (
              <div className="w-0.5 h-12 bg-gray-300 my-1"></div>
            )}
          </div>
          <div className="flex-1 pb-8">
            <p className="font-semibold text-gray-900">{event.title}</p>
            <p className="text-sm text-gray-600 mt-1">{event.description}</p>
            <p className="text-xs text-gray-500 mt-2">{event.date}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default TrackRegistration;