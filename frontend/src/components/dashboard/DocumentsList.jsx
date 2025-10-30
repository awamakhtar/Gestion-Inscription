import { FileText, Download, Eye, Upload } from 'lucide-react';

const DocumentsList = ({ documents, onView, onDownload }) => {
  if (!documents || documents.length === 0) {
    return (
      <div className="card text-center py-8">
        <FileText className="w-12 h-12 text-gray-300 mx-auto mb-3" />
        <p className="text-gray-500">Aucun document disponible</p>
      </div>
    );
  }

  return (
    <div className="card">
      <h3 className="text-xl font-bold text-gray-900 mb-4">
        Mes documents
      </h3>
      <div className="space-y-3">
        {documents.map((doc) => (
          <div key={doc.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
            <div className="flex items-center space-x-3">
              <FileText className="w-6 h-6 text-primary-600" />
              <div>
                <p className="font-semibold text-gray-900">{doc.name}</p>
                <p className="text-xs text-gray-500">
                  Ajouté le {new Date(doc.uploaded_at).toLocaleDateString('fr-FR')}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button 
                onClick={() => onView(doc)}
                className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                title="Voir"
              >
                <Eye className="w-5 h-5" />
              </button>
              <button 
                onClick={() => onDownload(doc)}
                className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition"
                title="Télécharger"
              >
                <Download className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DocumentsList;