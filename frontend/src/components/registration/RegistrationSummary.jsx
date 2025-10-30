import { CheckCircle, Edit } from 'lucide-react';
import { useState } from 'react';
import axios from '../../api/axios';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import Loader from '../common/Loader';

const RegistrationSummary = ({ data, onBack, onEdit }) => {
  const [loading, setLoading] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!agreed) {
      toast.error('Veuillez accepter les termes et conditions');
      return;
    }

    setLoading(true);

    try {
      // Créer FormData pour envoyer les fichiers
      const formData = new FormData();

      // Ajouter les données de l'élève
      Object.keys(data.student).forEach(key => {
        formData.append(`student[${key}]`, data.student[key]);
      });

      // Ajouter les données du parent
      Object.keys(data.parent).forEach(key => {
        formData.append(`parent[${key}]`, data.parent[key]);
      });

      // Ajouter les documents
      Object.keys(data.documents).forEach(key => {
        formData.append(`documents[${key}]`, data.documents[key]);
      });

      const response = await axios.post('/registrations', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      toast.success('Inscription soumise avec succès !');
      
      // Rediriger vers la page de suivi avec le numéro de dossier
      navigate('/suivre', { 
        state: { 
          registrationNumber: response.data.registration_number,
          email: data.parent.email 
        } 
      });

    } catch (error) {
      console.error('Erreur lors de la soumission:', error);
      toast.error(error.response?.data?.message || 'Erreur lors de la soumission');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        Récapitulatif de l'inscription
      </h2>

      {/* Informations de l'élève */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">
            Informations de l'élève
          </h3>
          <button 
            onClick={() => onEdit('student')}
            className="text-primary-600 hover:text-primary-700 flex items-center space-x-1"
          >
            <Edit className="w-4 h-4" />
            <span>Modifier</span>
          </button>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500">Prénom</p>
            <p className="font-semibold">{data.student.first_name}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Nom</p>
            <p className="font-semibold">{data.student.last_name}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Date de naissance</p>
            <p className="font-semibold">
              {new Date(data.student.date_of_birth).toLocaleDateString('fr-FR')}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Lieu de naissance</p>
            <p className="font-semibold">{data.student.place_of_birth}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Sexe</p>
            <p className="font-semibold">
              {data.student.gender === 'M' ? 'Masculin' : 'Féminin'}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Niveau demandé</p>
            <p className="font-semibold">{data.student.level}</p>
          </div>
        </div>
      </div>

      {/* Informations du parent */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">
            Informations du parent/tuteur
          </h3>
          <button 
            onClick={() => onEdit('parent')}
            className="text-primary-600 hover:text-primary-700 flex items-center space-x-1"
          >
            <Edit className="w-4 h-4" />
            <span>Modifier</span>
          </button>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500">Nom complet</p>
            <p className="font-semibold">
              {data.parent.parent_first_name} {data.parent.parent_last_name}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Email</p>
            <p className="font-semibold">{data.parent.email}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Téléphone</p>
            <p className="font-semibold">{data.parent.phone}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Profession</p>
            <p className="font-semibold">{data.parent.profession || 'Non renseignée'}</p>
          </div>
          <div className="col-span-2">
            <p className="text-sm text-gray-500">Adresse</p>
            <p className="font-semibold">{data.parent.address}</p>
          </div>
        </div>
      </div>

      {/* Documents */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">
            Documents téléchargés
          </h3>
          <button 
            onClick={() => onEdit('documents')}
            className="text-primary-600 hover:text-primary-700 flex items-center space-x-1"
          >
            <Edit className="w-4 h-4" />
            <span>Modifier</span>
          </button>
        </div>
        <div className="space-y-2">
          {Object.keys(data.documents).map((key) => (
            <div key={key} className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span className="text-gray-700">{data.documents[key].name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Termes et conditions */}
      <div className="card bg-gray-50">
        <label className="flex items-start space-x-3 cursor-pointer">
          <input
            type="checkbox"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
            className="w-5 h-5 text-primary-600 mt-1"
          />
          <span className="text-sm text-gray-700">
            J'atteste que toutes les informations fournies sont exactes et je comprends 
            que toute fausse déclaration pourrait entraîner le rejet de cette demande 
            d'inscription. J'accepte les{' '}
            <a href="#" className="text-primary-600 hover:underline">
              termes et conditions
            </a>{' '}
            de l'école.
          </span>
        </label>
      </div>

      {/* Boutons */}
      <div className="flex justify-between">
        <button type="button" onClick={onBack} className="btn-secondary" disabled={loading}>
          Précédent
        </button>
        <button 
          type="button" 
          onClick={handleSubmit} 
          className="btn-primary flex items-center space-x-2"
          disabled={loading || !agreed}
        >
          {loading ? (
            <>
              <Loader size="small" />
              <span>Envoi en cours...</span>
            </>
          ) : (
            <>
              <CheckCircle className="w-5 h-5" />
              <span>Soumettre l'inscription</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default RegistrationSummary;