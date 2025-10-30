import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { studentValidationSchema } from '../../utils/validation';
import { LEVELS } from '../../utils/constants';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const StudentInfoForm = ({ onNext, initialData }) => {
  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm({
    resolver: yupResolver(studentValidationSchema),
    defaultValues: initialData || {}
  });

  const dateOfBirth = watch('date_of_birth');

  const onSubmit = (data) => {
    onNext(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        Informations sur l'élève
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Prénom */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Prénom <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            {...register('first_name')}
            className="input-field"
            placeholder="Ex: Amadou"
          />
          {errors.first_name && (
            <p className="text-red-500 text-sm mt-1">{errors.first_name.message}</p>
          )}
        </div>

        {/* Nom */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Nom <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            {...register('last_name')}
            className="input-field"
            placeholder="Ex: Diallo"
          />
          {errors.last_name && (
            <p className="text-red-500 text-sm mt-1">{errors.last_name.message}</p>
          )}
        </div>

        {/* Date de naissance */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Date de naissance <span className="text-red-500">*</span>
          </label>
          <DatePicker
            selected={dateOfBirth}
            onChange={(date) => setValue('date_of_birth', date)}
            dateFormat="dd/MM/yyyy"
            showYearDropdown
            scrollableYearDropdown
            yearDropdownItemNumber={50}
            maxDate={new Date()}
            className="input-field"
            placeholderText="JJ/MM/AAAA"
          />
          {errors.date_of_birth && (
            <p className="text-red-500 text-sm mt-1">{errors.date_of_birth.message}</p>
          )}
        </div>

        {/* Lieu de naissance */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Lieu de naissance <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            {...register('place_of_birth')}
            className="input-field"
            placeholder="Ex: Dakar"
          />
          {errors.place_of_birth && (
            <p className="text-red-500 text-sm mt-1">{errors.place_of_birth.message}</p>
          )}
        </div>

        {/* Sexe */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Sexe <span className="text-red-500">*</span>
          </label>
          <select {...register('gender')} className="input-field">
            <option value="">Sélectionner...</option>
            <option value="M">Masculin</option>
            <option value="F">Féminin</option>
          </select>
          {errors.gender && (
            <p className="text-red-500 text-sm mt-1">{errors.gender.message}</p>
          )}
        </div>

        {/* Niveau demandé */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Niveau demandé <span className="text-red-500">*</span>
          </label>
          <select {...register('level')} className="input-field">
            <option value="">Sélectionner...</option>
            {LEVELS.map((level) => (
              <option key={level.value} value={level.value}>
                {level.label}
              </option>
            ))}
          </select>
          {errors.level && (
            <p className="text-red-500 text-sm mt-1">{errors.level.message}</p>
          )}
        </div>
      </div>

      {/* École précédente */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          École précédente (optionnel)
        </label>
        <input
          type="text"
          {...register('previous_school')}
          className="input-field"
          placeholder="Nom de l'établissement précédent"
        />
      </div>

      {/* Bouton suivant */}
      <div className="flex justify-end">
        <button type="submit" className="btn-primary">
          Suivant
        </button>
      </div>
    </form>
  );
};

export default StudentInfoForm;