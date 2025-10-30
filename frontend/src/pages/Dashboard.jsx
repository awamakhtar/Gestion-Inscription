import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from '../api/axios';
import StatusCard from '../components/dashboard/StatusCard';
import DocumentsList from '../components/dashboard/DocumentsList';
import Loader from '../components/common/Loader';
import { FileText, User, Calendar } from 'lucide-react';

const Dashboard = () => {
  const { user } = useAuth();
  const [registrations, setRegistrations] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [regsResponse, docsResponse] = await Promise.all([
        axios.get('/registrations'),
        axios.get('/documents')
      ]);
      
      setRegistrations(regsResponse.data);
      setDocuments(docsResponse.data);
    } catch (error) {
      console.error('Erreur lors du chargement:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader size="large" text="Chargement de vos données..." />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* En-tête */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Tableau de bord
          </h1>
          <p className="text-gray-600 mt-2">
            Bienvenue {user?.name} !
          </p>
        </div>

        {/* Statistiques */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="card">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-100 p-3 rounded-full">
                <FileText className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total inscriptions</p>
                <p className="text-2xl font-bold text-gray-900">
                  {registrations.length}
                </p>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center space-x-3">
              <div className="bg-green-100 p-3 rounded-full">
                <User className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Enfants inscrits</p>
                <p className="text-2xl font-bold text-gray-900">
                  {registrations.filter(r => r.status === 'approved').length}
                </p>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center space-x-3">
              <div className="bg-purple-100 p-3 rounded-full">
                <Calendar className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">En attente</p>
                <p className="text-2xl font-bold text-gray-900">
                  {registrations.filter(r => r.status === 'pending').length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Inscriptions */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Mes inscriptions
          </h2>
          {registrations.length > 0 ? (
            <div className="space-y-6">
              {registrations.map((registration) => (
                <StatusCard key={registration.id} registration={registration} />
              ))}
            </div>
          ) : (
            <div className="card text-center py-12">
              <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-600 mb-4">Aucune inscription pour le moment</p>
              <a href="/inscription" className="btn-primary inline-block">
                Nouvelle inscription
              </a>
            </div>
          )}
        </div>

        {/* Documents */}
        <DocumentsList 
          documents={documents}
          onView={(doc) => console.log('Voir:', doc)}
          onDownload={(doc) => console.log('Télécharger:', doc)}
        />
      </div>
    </div>
  );
};

export default Dashboard;