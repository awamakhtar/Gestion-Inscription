
export const LEVELS = [
  { value: 'CI', label: 'Cours d\'Initiation (CI)' },
  { value: 'CP', label: 'Cours Préparatoire (CP)' },
  { value: 'CE1', label: 'Cours Élémentaire 1 (CE1)' },
  { value: 'CE2', label: 'Cours Élémentaire 2 (CE2)' },
  { value: 'CM1', label: 'Cours Moyen 1 (CM1)' },
  { value: 'CM2', label: 'Cours Moyen 2 (CM2)' },
  { value: '6eme', label: '6ème' },
  { value: '5eme', label: '5ème' },
  { value: '4eme', label: '4ème' },
  { value: '3eme', label: '3ème' },
  { value: '2nde', label: '2nde' },
  { value: '1ere', label: '1ère' },
  { value: 'Tle', label: 'Terminale' },
];

export const DOCUMENT_TYPES = [
  { value: 'birth_certificate', label: 'Acte de naissance' },
  { value: 'photo', label: 'Photo d\'identité' },
  { value: 'previous_report', label: 'Bulletin de l\'année précédente' },
  { value: 'health_certificate', label: 'Certificat médical' },
  { value: 'parent_id', label: 'Pièce d\'identité du parent' },
];

export const REGISTRATION_STATUS = {
  PENDING: 'pending',
  APPROVED: 'approved',
  REJECTED: 'rejected',
  INCOMPLETE: 'incomplete',
};