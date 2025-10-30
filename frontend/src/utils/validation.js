import * as yup from 'yup';

export const studentValidationSchema = yup.object({
  first_name: yup.string().required('Le prénom est requis'),
  last_name: yup.string().required('Le nom est requis'),
  date_of_birth: yup.date().required('La date de naissance est requise'),
  place_of_birth: yup.string().required('Le lieu de naissance est requis'),
  gender: yup.string().required('Le sexe est requis'),
  level: yup.string().required('Le niveau est requis'),
  previous_school: yup.string(),
});

export const parentValidationSchema = yup.object({
  parent_first_name: yup.string().required('Le prénom du parent est requis'),
  parent_last_name: yup.string().required('Le nom du parent est requis'),
  email: yup.string().email('Email invalide').required('L\'email est requis'),
  phone: yup.string().required('Le téléphone est requis'),
  address: yup.string().required('L\'adresse est requise'),
  profession: yup.string(),
});