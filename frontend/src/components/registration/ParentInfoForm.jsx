import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { parentValidationSchema } from '../../utils/validation';

const ParentInfoForm = ({ onNext, onBack, initialData }) => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(parentValidationSchema),
    defaultValues: initialData || {}
  });

  const onSubmit = (data) => {
    onNext(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        Informations du parent/tuteur
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Prénom du parent */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Prénom du parent <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            {...register('parent_first_name')}
            className="input-field"
          />
          {errors.parent_first_name && (
            <p className="text-red-500 text-sm mt-1">{errors.parent_first_name.message}</p>
          )}
        </div>

        {/* Nom du parent */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Nom du parent <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            {...register('parent_last_name')}
            className="input-field"
          />
          {errors.parent_last_name && (
            <p className="text-red-500 text-sm mt-1">{errors.parent_last_name.message}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            {...register('email')}
            className="input-field"
            placeholder="exemple@email.com"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* Téléphone */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Téléphone <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            {...register('phone')}
            className="input-field"
            placeholder="+221 XX XXX XX XX"
          />
          {errors.phone && (
            <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
          )}
        </div>

        {/* Profession */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Profession
          </label>
          <input
            type="text"
            {...register('profession')}
            className="input-field"
          />
        </div>
      </div>

      {/* Adresse complète */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Adresse complète <span className="text-red-500">*</span>
        </label>
        <textarea
          {...register('address')}
          className="input-field"
          rows="3"
          placeholder="Numéro, rue, quartier, ville"
        />
        {errors.address && (
          <p className="text-red-500 text-sm mt-1">{errors.address.message}</p>
        )}
      </div>

      {/* Boutons */}
      <div className="flex justify-between">
        <button type="button" onClick={onBack} className="btn-secondary">
          Précédent
        </button>
        <button type="submit" className="btn-primary">
          Suivant
        </button>
      </div>
    </form>
  );
};

export default ParentInfoForm;