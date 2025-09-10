import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getGames, getBlogPosts } from '../../../utils/storage';
import { Game, BlogPost, Character } from '../../../types';
import { ChevronLeft, ChevronRight, Play, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const GamesPage: React.FC = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [currentCharacter, setCurrentCharacter] = useState<Character | null>(null);
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const [fetchedGames, fetchedPosts] = await Promise.all([
        getGames(),
        getBlogPosts()
      ]);
      setGames(fetchedGames);
      setBlogPosts(fetchedPosts);
      if (fetchedGames.length > 0) {
        setSelectedGame(fetchedGames[0]);
        if (fetchedGames[0].characters.length > 0) {
          setCurrentCharacter(fetchedGames[0].characters[0]);
        }
      }
    };

    fetchData();
  }, []);

  const handleGameChange = (game: Game) => {
    setSelectedGame(game);
    if (game.characters.length > 0) {
      setCurrentCharacter(game.characters[0]);
    }
  };

  const nextCharacter = () => {
    if (!selectedGame) return;
    const currentIndex = selectedGame.characters.findIndex(char => char.id === currentCharacter?.id);
    const nextIndex = currentIndex === selectedGame.characters.length - 1 ? 0 : currentIndex + 1;
    setCurrentCharacter(selectedGame.characters[nextIndex]);
  };

  const prevCharacter = () => {
    if (!selectedGame) return;
    const currentIndex = selectedGame.characters.findIndex(char => char.id === currentCharacter?.id);
    const prevIndex = currentIndex === 0 ? selectedGame.characters.length - 1 : currentIndex - 1;
    setCurrentCharacter(selectedGame.characters[prevIndex]);
  };

  const roles = [
    { id: 'assassin', name: 'ASESINOS', icon: '🗡️' },
    { id: 'fighter', name: 'LUCHADORES', icon: '⚔️' },
    { id: 'mage', name: 'MAGOS', icon: '🔮' },
    { id: 'marksman', name: 'TIRADORES', icon: '🏹' },
    { id: 'support', name: 'SOPORTES', icon: '🛡️' },
    { id: 'tank', name: 'TANQUES', icon: '🛡️' }
  ];

  if (!selectedGame) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-dark">
        <div className="w-16 h-16 border-4 border-primary-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="bg-dark">
      {/* Hero Video Section */}
      <section className="relative h-screen">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/50 to-transparent">
          <div className="container mx-auto px-4 h-full flex items-center">
            <motion.div
              key={selectedGame.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-2xl"
            >
              <h1 className="text-6xl font-heading font-bold text-white mb-6">
                {selectedGame.title}
              </h1>
              <p className="text-xl text-gray-300 mb-8">
                {selectedGame.fullDescription || selectedGame.description}
              </p>
              <div className="flex gap-4">
                <button className="bg-primary-600 hover:bg-primary-700 text-white font-medium py-3 px-8 rounded-md transition-all hover:shadow-glow flex items-center gap-2">
                  <Play size={20} />
                  Ver Cinemática
                </button>
                <Link
                  to={`/games/${selectedGame.id}`}
                  className="bg-white/10 hover:bg-white/20 text-white font-medium py-3 px-8 rounded-md transition-colors"
                >
                  Más Información
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Game Selector */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-dark-surface border-t border-gray-800">
        <div className="container mx-auto px-4 py-4">
          <div className="flex gap-4 overflow-x-auto pb-2">
            {games.map((game) => (
              <button
                key={game.id}
                onClick={() => handleGameChange(game)}
                className={`px-6 py-3 rounded-md transition-colors whitespace-nowrap ${
                  selectedGame.id === game.id
                    ? 'bg-primary-600 text-white'
                    : 'bg-dark-card hover:bg-primary-600/20 text-gray-300 hover:text-white'
                }`}
              >
                {game.title}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* News Section */}
      <section className="py-20 bg-dark">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-heading font-bold text-white mb-12"
          >
            NOTICIAS DESTACADAS
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {blogPosts.slice(0, 3).map((post) => (
              <Link
                key={post.id}
                to={`/blog/${post.id}`}
                className="group"
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="relative overflow-hidden rounded-lg"
                >
                  <div className="aspect-video">
                    <img
                      src={post.imageUrl}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-dark to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="absolute bottom-0 left-0 p-6">
                      <h3 className="text-xl font-heading font-bold text-white mb-2">
                        {post.title}
                      </h3>
                      <p className="text-gray-300 line-clamp-2">
                        {post.excerpt}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Character Section */}
      {selectedGame.characters.length > 0 && (
        <section className="py-20 bg-dark relative overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-4xl font-heading font-bold text-white mb-4">
                  ELIGE TU {selectedGame.title === 'League of Legends' ? 'CAMPEÓN' : 'PERSONAJE'}
                </h2>
                <p className="text-gray-300 max-w-2xl mx-auto">
                  Ya sea que prefieras lanzarte directo a la batalla, apoyar a tus compañeros de equipo, o algo intermedio, hay un lugar para ti.
                </p>
              </motion.div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="grid grid-cols-3 gap-4 mb-8">
                  {roles.map((role) => (
                    <button
                      key={role.id}
                      className="flex flex-col items-center gap-2 p-4 rounded-lg bg-dark-surface hover:bg-primary-600/20 transition-colors"
                    >
                      <span className="text-2xl">{role.icon}</span>
                      <span className="text-white text-sm font-medium">{role.name}</span>
                    </button>
                  ))}
                </div>

                <div className="flex gap-4 mb-8">
                  <Link
                    to="/champions"
                    className="bg-[#C89B3C] hover:bg-[#A17A2D] text-white font-medium py-3 px-6 rounded transition-colors"
                  >
                    DESCUBRIR MÁS {selectedGame.title === 'League of Legends' ? 'CAMPEONES' : 'PERSONAJES'}
                  </Link>
                  <button
                    className="bg-[#0AC8B9] hover:bg-[#0B8F84] text-white font-medium py-3 px-6 rounded transition-colors"
                  >
                    JUEGA AHORA
                  </button>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="relative"
              >
                {currentCharacter && (
                  <div className="relative">
                    <div className="absolute -inset-4 bg-gradient-to-r from-primary-500/20 to-accent-500/20 rounded-full blur-xl"></div>
                    <motion.div
                      key={currentCharacter.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.5 }}
                      className="relative"
                    >
                      <img
                        src={currentCharacter.imageUrl}
                        alt={currentCharacter.name}
                        className="w-full h-auto mix-blend-luminosity"
                      />
                      <div className="absolute bottom-0 left-0 right-0 text-center">
                        <h3 className="text-3xl font-heading font-bold text-white mb-2">
                          {currentCharacter.name}
                        </h3>
                        <p className="text-gray-300">{currentCharacter.description}</p>
                      </div>
                    </motion.div>
                  </div>
                )}

                <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 flex justify-between px-4">
                  <button
                    onClick={prevCharacter}
                    className="p-2 rounded-full bg-dark/50 text-white hover:bg-primary-600 transition-colors"
                  >
                    <ChevronLeft size={24} />
                  </button>
                  <button
                    onClick={nextCharacter}
                    className="p-2 rounded-full bg-dark/50 text-white hover:bg-primary-600 transition-colors"
                  >
                    <ChevronRight size={24} />
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      )}

      {/* Game Style Section */}
      <section className="py-20 bg-dark relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl font-heading font-bold text-white mb-4">
                DOMINA CON ESTILO
              </h2>
              <p className="text-gray-300 mb-6">
                Domina tu estilo en {selectedGame.title}. Descubre una jugabilidad fluida con gráficos y personajes únicos.
              </p>
              <Link
                to="/store"
                className="inline-flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white font-medium py-3 px-6 rounded-md transition-all hover:shadow-glow"
              >
                <span>Ver Tienda</span>
                <ArrowRight size={20} />
              </Link>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <div className="aspect-video rounded-lg overflow-hidden">
                <img
                  src={selectedGame.gallery?.[0] || selectedGame.imageUrl}
                  alt="Game Style"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary-500 rounded-full opacity-30 blur-xl"></div>
              <div className="absolute -top-6 -left-6 w-24 h-24 bg-accent-500 rounded-full opacity-30 blur-xl"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Game Map Section */}
      <section className="py-20 bg-dark-surface">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <div className="rounded-full overflow-hidden border-4 border-primary-600/30">
                <img
                  src={selectedGame.gallery?.[1] || selectedGame.imageUrl}
                  alt="Game Map"
                  className="w-full aspect-square object-cover"
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl font-heading font-bold text-white mb-4">
                MÚLTIPLES MANERAS DE JUGAR
              </h2>
              <p className="text-gray-300 mb-6">
                Explora diferentes roles y estrategias en {selectedGame.title}.
              </p>
              <div className="grid grid-cols-3 gap-4">
                {selectedGame.characters.slice(0, 3).map((character) => (
                  <div
                    key={character.id}
                    className="bg-dark rounded-lg p-4 text-center hover:bg-primary-600/20 transition-colors"
                  >
                    <img
                      src={character.imageUrl}
                      alt={character.name}
                      className="w-12 h-12 mx-auto rounded-full mb-2"
                    />
                    <span className="text-white font-medium">{character.name}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Download Section */}
      <section
        className="py-20 bg-dark relative"
        style={{
          backgroundImage: `url(${selectedGame.gallery?.[2] || selectedGame.imageUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="absolute inset-0 bg-dark/80"></div>
        <div className="container mx-auto px-4 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h2 className="text-4xl font-heading font-bold text-white mb-6">
              COMIENZA TU LEYENDA
            </h2>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              Descarga {selectedGame.title} gratuitamente y únete a millones de jugadores.
            </p>
            <button className="bg-primary-600 hover:bg-primary-700 text-white font-medium py-4 px-8 rounded-md transition-all hover:shadow-glow">
              Descargar Ahora
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default GamesPage;