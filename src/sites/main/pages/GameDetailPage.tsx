import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getGame } from '../../../utils/storage';
import { Game } from '../../../types';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

const GameDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [game, setGame] = useState<Game | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const fetchGame = async () => {
      if (id) {
        const fetchedGame = await getGame(id);
        setGame(fetchedGame);
        setLoading(false);
      }
    };

    fetchGame();
  }, [id]);

  const nextImage = () => {
    if (game?.gallery) {
      setCurrentImageIndex((prev) => (prev === game.gallery!.length - 1 ? 0 : prev + 1));
    }
  };

  const prevImage = () => {
    if (game?.gallery) {
      setCurrentImageIndex((prev) => (prev === 0 ? game.gallery!.length - 1 : prev - 1));
    }
  };

  if (loading) {
    return (
      <div className="pt-24 pb-20 bg-dark min-h-screen flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-primary-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!game) {
    return (
      <div className="pt-24 pb-20 bg-dark min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-heading font-bold text-white mb-4">Juego no encontrado</h2>
          <Link
            to="/games"
            className="inline-block bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-4 rounded transition-colors"
          >
            Volver a Juegos
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-20 bg-dark min-h-screen">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <Link
            to="/games"
            className="inline-flex items-center text-primary-400 hover:text-primary-300 transition-colors"
          >
            <ChevronLeft size={20} />
            <span>Volver a Juegos</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="relative rounded-lg overflow-hidden"
              style={{ height: '400px' }}
            >
              {game.gallery && game.gallery.length > 0 ? (
                <>
                  <img
                    src={game.gallery[currentImageIndex]}
                    alt={game.title}
                    className="w-full h-full object-cover"
                  />
                  {game.gallery.length > 1 && (
                    <div className="absolute bottom-4 right-4 flex space-x-2">
                      <button
                        onClick={prevImage}
                        className="p-2 rounded-full bg-black/50 text-white hover:bg-primary-600 transition-all"
                      >
                        <ChevronLeft size={20} />
                      </button>
                      <button
                        onClick={nextImage}
                        className="p-2 rounded-full bg-black/50 text-white hover:bg-primary-600 transition-all"
                      >
                        <ChevronRight size={20} />
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <img
                  src={game.imageUrl}
                  alt={game.title}
                  className="w-full h-full object-cover"
                />
              )}
            </motion.div>

            {game.gallery && game.gallery.length > 1 && (
              <div className="mt-4 grid grid-cols-4 gap-2">
                {game.gallery.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`block h-20 rounded overflow-hidden ${
                      currentImageIndex === index ? 'ring-2 ring-primary-500' : ''
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${game.title} gallery ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h1 className="text-4xl font-heading font-bold text-white mb-2">{game.title}</h1>
            
            <div className="flex gap-2 my-4">
              {game.platforms.map((platform, index) => (
                <span
                  key={index}
                  className="inline-block bg-primary-600/30 text-primary-300 text-xs font-semibold px-2 py-1 rounded"
                >
                  {platform}
                </span>
              ))}
              {game.releaseDate && (
                <span className="inline-block bg-dark-surface text-gray-300 text-xs font-semibold px-2 py-1 rounded">
                  {new Date(game.releaseDate).toLocaleDateString('es-ES', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </span>
              )}
            </div>

            <div className="mb-8">
              <h2 className="text-xl font-heading font-semibold text-white mb-3">Descripción</h2>
              <p className="text-gray-300">{game.fullDescription || game.description}</p>
            </div>

            {game.characters.length > 0 && (
              <div className="mb-8">
                <h2 className="text-xl font-heading font-semibold text-white mb-4">Personajes</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {game.characters.map((character) => (
                    <div key={character.id} className="bg-dark-surface p-3 rounded-lg text-center hover:bg-dark-card transition-colors">
                      <div className="w-20 h-20 mx-auto rounded-full overflow-hidden mb-3">
                        <img
                          src={character.imageUrl}
                          alt={character.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <h3 className="text-white font-medium mb-1">{character.name}</h3>
                      {character.description && (
                        <p className="text-gray-400 text-sm">{character.description}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex flex-wrap gap-4">
              <a
                href="#"
                className="bg-primary-600 hover:bg-primary-700 text-white font-medium py-3 px-6 rounded-md transition-all hover:shadow-glow"
              >
                Descargar Ahora
              </a>
              <Link
                to="/store"
                className="bg-transparent hover:bg-white/10 text-white border border-white font-medium py-3 px-6 rounded-md transition-all"
              >
                Merchandising
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default GameDetailPage;