import { useState } from 'react';
import axios from '../api/axios';
import { toast } from 'react-hot-toast';

export const useRegistration = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const submitRegistration = async (formData) => {
    setLoading(true);
    setError(null);

    try {
      const data = new FormData();
      
      // Ajouter les données de l'élève
      Object.keys(formData.student).forEach(key => {
        data.append(`student[${key}]`, formData.student[key]);
      });

      // Ajouter les données du parent
      Object.keys(formData.parent).forEach(key => {
        data.append(`parent[${key}]`, formData.parent[key]);
      });

      // Ajouter les documents
      Object.keys(formData.documents).forEach(key => {
        data.append(`documents[${key}]`, formData.documents[key]);
      });

      const response = await axios.post('/registrations', data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      toast.success('Inscription soumise avec succès !');
      return response.data;
    } catch (err) {
      const message = err.response?.data?.message || 'Erreur lors de la soumission';
      setError(message);
      toast.error(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const trackRegistration = async (registrationNumber, email) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post('/registrations/track', {
        registration_number: registrationNumber,
        email: email
      });

      return response.data;
    } catch (err) {
      const message = err.response?.status === 404 
        ? 'Aucune inscription trouvée' 
        : 'Erreur lors de la recherche';
      setError(message);
      toast.error(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    submitRegistration,
    trackRegistration
  };
};