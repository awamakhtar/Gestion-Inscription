import { useState } from 'react';
import { Upload, FileText, X, CheckCircle } from 'lucide-react';
import { DOCUMENT_TYPES } from '../../utils/constants';
import { toast } from 'react-hot-toast';

const DocumentsUpload = ({ onNext, onBack, initialData }) => {
  const [documents, setDocuments] = useState(initialData?.documents || {});

  const handleFileChange = (e, docType) => {
    const file = e.target.files[0];
    
    if (!file) return;

    // Validation de la taille (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Le fichier ne doit pas dépasser 5 MB');
      return;
    }

    // Validation du type
    const validTypes = ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf'];
    if (!validTypes.includes(file.type)) {
      toast.error('Format non supporté. Utilisez JPG, PNG ou PDF');
      return;
    }

    setDocuments({
      ...documents,
      [docType]: file
    });

    toast.success('Fichier ajouté avec succès');
  };

  const removeDocument = (docType) => {
    const newDocs = { ...documents };
    delete newDocs[docType];
    setDocuments(newDocs);
    toast.success('Fichier supprimé');
  };

  const handleSubmit = () => {
    const requiredDocs = ['birth_certificate', 'photo'];
    const missingDocs = requiredDocs.filter(doc => !documents[doc]);

    if (missingDocs.length > 0) {
      toast.error('Veuillez ajouter tous les documents obligatoires');
      return;
    }

    onNext({ documents });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        Documents requis
      </h2>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <p className="text-sm text-blue-800">
          <strong>Important :</strong> Les documents marqués d'une étoile (*) sont obligatoires.
          Formats acceptés : JPG, PNG, PDF (max 5 MB par fichier)
        </p>
      </div>

      <div className="space-y-4">
        {DOCUMENT_TYPES.map((docType) => {
          const isRequired = ['birth_certificate', 'photo'].includes(docType.value);
          const uploadedFile = documents[docType.value];

          return (
            <div key={docType.value} className="card border-2 border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <FileText className="w-6 h-6 text-gray-400" />
                  <div>
                    <p className="font-semibold text-gray-900">
                      {docType.label} {isRequired && <span className="text-red-500">*</span>}
                    </p>
                    {uploadedFile && (
                      <p className="text-sm text-green-600 flex items-center space-x-1">
                        <CheckCircle className="w-4 h-4" />
                        <span>{uploadedFile.name}</span>
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  {uploadedFile ? (
                    <button
                      type="button"
                      onClick={() => removeDocument(docType.value)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  ) : (
                    <label className="btn-primary cursor-pointer flex items-center space-x-2">
                      <Upload className="w-4 h-4" />
                      <span>Télécharger</span>
                      <input
                        type="file"
                        onChange={(e) => handleFileChange(e, docType.value)}
                        accept=".jpg,.jpeg,.png,.pdf"
                        className="hidden"
                      />
                    </label>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Boutons */}
      <div className="flex justify-between">
        <button type="button" onClick={onBack} className="btn-secondary">
          Précédent
        </button>
        <button type="button" onClick={handleSubmit} className="btn-primary">
          Suivant
        </button>
      </div>
    </div>
  );
};

export default DocumentsUpload;