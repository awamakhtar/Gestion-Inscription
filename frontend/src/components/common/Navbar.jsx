import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, GraduationCap, LogIn, LogOut, User, Home } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo et nom */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <GraduationCap className="w-8 h-8 text-primary-600" />
              <span className="text-xl font-bold text-gray-900">
               Mirador
              </span>
            </Link>
          </div>

          {/* Menu Desktop */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/" className="flex items-center space-x-1 text-gray-700 hover:text-primary-600 transition">
              <Home className="w-4 h-4" />
              <span>Accueil</span>
            </Link>
            <Link to="/inscription" className="flex items-center space-x-1 text-gray-700 hover:text-primary-600 transition">
              <span>Nouvelle inscription</span>
            </Link>
            <Link to="/suivre" className="text-gray-700 hover:text-primary-600 transition">
              Suivre mon dossier
            </Link>

            {user ? (
              <>
                <Link to="/tableau-de-bord" className="flex items-center space-x-1 text-gray-700 hover:text-primary-600 transition">
                  <User className="w-4 h-4" />
                  <span>{user.name}</span>
                </Link>
                <button onClick={handleLogout} className="flex items-center space-x-1 btn-secondary">
                  <LogOut className="w-4 h-4" />
                  <span>Déconnexion</span>
                </button>
              </>
            ) : (
              <Link to="/login" className="flex items-center space-x-1 btn-primary">
                <LogIn className="w-4 h-4" />
                <span>Connexion</span>
              </Link>
            )}
          </div>

          {/* Bouton Menu Mobile */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-700">
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Menu Mobile */}
      {isOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-4 pt-2 pb-4 space-y-2">
            <Link to="/" className="block py-2 text-gray-700 hover:text-primary-600">
              Accueil
            </Link>
            <Link to="/inscription" className="block py-2 text-gray-700 hover:text-primary-600">
              Nouvelle inscription
            </Link>
            <Link to="/suivre" className="block py-2 text-gray-700 hover:text-primary-600">
              Suivre mon dossier
            </Link>
            {user ? (
              <>
                <Link to="/tableau-de-bord" className="block py-2 text-gray-700 hover:text-primary-600">
                  Tableau de bord
                </Link>
                <button onClick={handleLogout} className="block w-full text-left py-2 text-gray-700 hover:text-primary-600">
                  Déconnexion
                </button>
              </>
            ) : (
              <Link to="/login" className="block py-2 text-primary-600 font-semibold">
                Connexion
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;