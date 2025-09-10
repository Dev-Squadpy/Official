import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, Sword, X } from 'lucide-react';
import 'remixicon/fonts/remixicon.css';

interface Champion {
  id: string;
  name: string;
  title: string;
  type: {
    text: string;
    bgColor: string;
    textColor: string;
  };
  videoUrl: string;
  image: string;
  lore: string;
  abilities: {
    name: string;
    description: string;
  }[];
  difficulty: number;
}

const championData: Record<string, Champion> = {
  aatrox: {
    id: 'aatrox',
    name: "AATROX",
    title: "La Espada Darkin",
    type: {
      text: "LEYENDA",
      bgColor: "bg-red-900",
      textColor: "text-red-300"
    },
    videoUrl: "https://assets.contentstack.io/v3/assets/blt731acb42bb3d1659/blt9037d316cc2f3d81/64e6a4e7bd8372a95fa6eb26/101723_KSante_Prestige_Empyrean_Trailer.mp4",
    image: "https://images.pexels.com/photos/7915527/pexels-photo-7915527.jpeg",
    lore: "Aatrox es uno de los antiguos Darkin, seres que alguna vez fueron nobles guerreros ascendidos de Shurima. Tras siglos de aprisionamiento, Aatrox fue el primero en encontrar la libertad, corrompiendo a mortales y usando su esencia para recrear su forma perdida. Ahora busca una apocalíptica venganza contra los que lo encarcelaron y una batalla que ponga fin a todo.",
    abilities: [
      {
        name: "La Espada Darkin",
        description: "Los ataques de Aatrox causan daño adicional y lo curan basado en el daño infligido."
      },
      {
        name: "Cadenas Infernales",
        description: "Aatrox golpea el suelo, dañando a los enemigos y ralentizándolos si son golpeados en el centro."
      },
      {
        name: "Vuelo Oscuro",
        description: "Aatrox se impulsa hacia adelante, ganando velocidad de ataque y preparando su próximo ataque para derribar enemigos."
      },
      {
        name: "Masacre",
        description: "Aatrox libera su forma demoníaca, ganando movimiento, ataque y regeneración masiva."
      }
    ],
    difficulty: 3
  },
  ahri: {
    id: 'ahri',
    name: "AHRI",
    title: "La Zorra de Nueve Colas",
    type: {
      text: "MAGA",
      bgColor: "bg-purple-900",
      textColor: "text-purple-300"
    },
    videoUrl: "https://assets.contentstack.io/v3/assets/blt731acb42bb3d1659/blt9037d316cc2f3d81/64e6a4e7bd8372a95fa6eb26/101723_KSante_Prestige_Empyrean_Trailer.mp4",
    image: "https://images.pexels.com/photos/7915455/pexels-photo-7915455.jpeg",
    lore: "Ahri es una vastaya conectada de forma innata al poder latente de Runaterra, y es capaz de convertir la magia en orbes de energía pura. Le gusta jugar con su presa manipulando sus emociones antes de devorar su esencia vital. A pesar de su naturaleza depredadora, Ahri conserva cierto sentido de la empatía, ya que recibe fragmentos de memoria de cada alma que consume.",
    abilities: [
      {
        name: "Orbe del Engaño",
        description: "Ahri lanza y recupera su orbe, infligiendo daño mágico en ambas direcciones."
      },
      {
        name: "Fuego Zorruno",
        description: "Ahri libera tres fuegos fatuos que buscan y dañan a los enemigos cercanos."
      },
      {
        name: "Encanto",
        description: "Ahri lanza un beso que daña y encanta a un enemigo, haciéndole caminar indefenso hacia ella."
      },
      {
        name: "Impulso Espiritual",
        description: "Ahri se impulsa en la dirección elegida y dispara esencias a los enemigos cercanos."
      }
    ],
    difficulty: 2
  },
  yasuo: {
    id: 'yasuo',
    name: "YASUO",
    title: "El Imperdonable",
    type: {
      text: "LUCHADOR",
      bgColor: "bg-blue-900",
      textColor: "text-blue-300"
    },
    videoUrl: "https://assets.contentstack.io/v3/assets/blt731acb42bb3d1659/blt9037d316cc2f3d81/64e6a4e7bd8372a95fa6eb26/101723_KSante_Prestige_Empyrean_Trailer.mp4",
    image: "https://images.pexels.com/photos/7915251/pexels-photo-7915251.jpeg",
    lore: "Yasuo, un joven orgulloso de Jonia, es un espadachín ágil que empuña el aire contra sus enemigos. Cuando era un adolescente prometedor, fue acusado injustamente del asesinato de su maestro. Incapaz de probar su inocencia, se vio obligado a matar a su propio hermano en defensa propia. Incluso después de que se revelara al verdadero asesino de su maestro, Yasuo aún no puede perdonarse a sí mismo por todo lo que ha hecho.",
    abilities: [
      {
        name: "Manera del Errante",
        description: "Yasuo genera un escudo cuando se mueve. Sus ataques críticos ganan penetración de armadura adicional."
      },
      {
        name: "Tempestad de Acero",
        description: "Yasuo lanza un tornado que atraviesa a los enemigos, causando daño y levantándolos por los aires."
      },
      {
        name: "Muro de Viento",
        description: "Yasuo crea una pared de viento que bloquea todos los proyectiles enemigos."
      },
      {
        name: "Último Aliento",
        description: "Yasuo se teletransporta a un enemigo en el aire y lo ejecuta con un golpe devastador."
      }
    ],
    difficulty: 4
  }
};

const ChampionsPage: React.FC = () => {
  const [selectedChampion, setSelectedChampion] = useState<Champion | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (champion: Champion) => {
    setSelectedChampion(champion);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    const videoElement = document.querySelector('#championVideo video') as HTMLVideoElement;
    if (videoElement) {
      videoElement.pause();
      videoElement.currentTime = 0;
    }
    setIsModalOpen(false);
  };

  return (
    <div className="pt-24 pb-20 bg-dark min-h-screen">
      <div className="container mx-auto px-4">
        <header className="text-center mb-12">
          <p className="text-sm text-gray-400 uppercase tracking-wider mb-1">ELIGE TU</p>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">CAMPEÓN</h1>
          <p className="text-gray-300 max-w-3xl mx-auto">
            Con más de 150 campeones, encontrarás el que se adapte perfectamente a tu estilo de juego. 
            Domina a uno o domínalos a todos.
          </p>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Object.values(championData).map((champion) => (
            <motion.div
              key={champion.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="card rounded-xl h-96 relative"
              style={{
                backgroundImage: `url(${champion.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"></div>
              <div className="absolute top-3 left-3 flex space-x-2">
                <div className={`w-8 h-8 flex items-center justify-center ${champion.type.bgColor} bg-opacity-70 rounded-full`}>
                  <i className="ri-sword-fill text-lg"></i>
                </div>
                <div className={`w-8 h-8 flex items-center justify-center ${champion.type.bgColor} bg-opacity-70 rounded-full`}>
                  <i className="ri-shield-fill text-lg"></i>
                </div>
              </div>
              <div className="absolute bottom-0 left-0 w-full p-4">
                <div className="flex items-center mb-1">
                  <span className={`text-xs ${champion.type.bgColor} bg-opacity-70 ${champion.type.textColor} px-2 py-0.5 rounded mr-2`}>
                    {champion.type.text}
                  </span>
                  <h3 className="text-xl font-bold text-white">{champion.name}</h3>
                </div>
                <h4 className="text-yellow-500 text-sm mb-2">{champion.title}</h4>
                <p className="text-sm text-gray-300 mb-3">{champion.lore.slice(0, 100)}...</p>
                <button
                  onClick={() => openModal(champion)}
                  className={`${champion.type.bgColor} hover:bg-opacity-90 text-white px-4 py-2 text-sm rounded transition-colors`}
                >
                  Ver Detalles
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Champion Modal */}
      {isModalOpen && selectedChampion && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="bg-dark-surface rounded-2xl max-w-6xl w-full mx-auto overflow-hidden max-h-[90vh] flex flex-col relative"
          >
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-400 hover:text-white z-10 transition-all duration-200 hover:scale-110"
            >
              <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-800/50 hover:bg-gray-700/80">
                <X size={24} />
              </div>
            </button>

            <div className="flex-1 overflow-y-auto">
              <div className="w-full relative h-[480px]">
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${selectedChampion.image})` }}
                ></div>
                <div className="absolute inset-0 bg-gradient-to-t from-dark-surface via-transparent to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-8 w-full">
                  <div className="flex items-center gap-4 mb-2">
                    <span className={`text-sm px-3 py-1 rounded uppercase tracking-wider ${selectedChampion.type.bgColor} ${selectedChampion.type.textColor}`}>
                      {selectedChampion.type.text}
                    </span>
                    <h2 className="text-4xl font-bold text-white">{selectedChampion.name}</h2>
                  </div>
                  <h3 className="text-2xl text-yellow-500">{selectedChampion.title}</h3>
                </div>
              </div>

              <div className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-xl font-semibold mb-4 uppercase text-yellow-500">Historia</h4>
                    <p className="text-gray-300 leading-relaxed">{selectedChampion.lore}</p>
                  </div>

                  <div>
                    <h4 className="text-xl font-semibold mb-4 uppercase text-yellow-500">Habilidades</h4>
                    <div className="space-y-4">
                      {selectedChampion.abilities.map((ability, index) => (
                        <div key={index} className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded bg-gray-800/50 flex items-center justify-center">
                            <Sword className="text-yellow-500" size={24} />
                          </div>
                          <div>
                            <h5 className="font-semibold text-white mb-1">{ability.name}</h5>
                            <p className="text-sm text-gray-400">{ability.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-8">
                      <h4 className="text-xl font-semibold mb-4 uppercase text-yellow-500">Dificultad</h4>
                      <div className="flex items-center gap-2">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={24}
                            className={i < selectedChampion.difficulty ? 'text-yellow-400' : 'text-gray-600'}
                            fill={i < selectedChampion.difficulty ? 'currentColor' : 'none'}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8">
                  <h4 className="text-xl font-semibold mb-4 uppercase text-yellow-500">Video de Habilidades</h4>
                  <div id="championVideo" className="w-full aspect-video rounded-xl overflow-hidden bg-gray-900/50">
                    {selectedChampion.videoUrl ? (
                      <video className="w-full h-full object-cover" controls autoPlay loop>
                        <source src={selectedChampion.videoUrl} type="video/webm" />
                        Tu navegador no soporta el elemento de video.
                      </video>
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-500">
                        <i className="ri-video-line text-4xl"></i>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default ChampionsPage;