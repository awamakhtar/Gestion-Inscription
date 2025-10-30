import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, Users, BookOpen, Award, Clock } from 'lucide-react';

const Home = () => {
  const features = [
    {
      icon: Clock,
      title: 'Inscription rapide',
      description: 'Processus simplifié en quelques étapes'
    },
    {
      icon: Users,
      title: 'Suivi en temps réel',
      description: 'Consultez l\'état de votre dossier à tout moment'
    },
    {
      icon: BookOpen,
      title: 'Excellence académique',
      description: 'Programme éducatif de qualité'
    },
    {
      icon: Award,
      title: 'Équipe qualifiée',
      description: 'Enseignants expérimentés et dévoués'
    }
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Bienvenue à l'École Excellence
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-primary-100">
              Inscrivez votre enfant en ligne en quelques minutes
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/inscription" 
                className="bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition flex items-center justify-center space-x-2"
              >
                <span>Nouvelle inscription</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link 
                to="/suivre" 
                className="bg-primary-700 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-800 transition border-2 border-white"
              >
                Suivre mon dossier
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Pourquoi nous choisir ?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-8 h-8 text-primary-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Comment ça marche ?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: '1',
                title: 'Remplissez le formulaire',
                description: 'Fournissez les informations de l\'élève et du parent'
              },
              {
                step: '2',
                title: 'Téléchargez les documents',
                description: 'Ajoutez les pièces justificatives requises'
              },
              {
                step: '3',
                title: 'Validation',
                description: 'Recevez une confirmation et suivez votre dossier'
              }
            ].map((item, index) => (
              <div key={index} className="card text-center">
                <div className="bg-primary-600 text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Prêt à inscrire votre enfant ?
          </h2>
          <p className="text-xl mb-8 text-primary-100">
            Rejoignez notre communauté éducative dès aujourd'hui
          </p>
          <Link 
            to="/inscription" 
            className="inline-flex items-center space-x-2 bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
          >
            <span>Commencer l'inscription</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;