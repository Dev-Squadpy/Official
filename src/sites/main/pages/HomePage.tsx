import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getGames, getBlogPosts, getProducts } from '../../../utils/storage';
import { Game, BlogPost, Product } from '../../../types';
import { ChevronLeft, ChevronRight, Youtube, ShoppingBag } from 'lucide-react';
import { motion } from 'framer-motion';

const HomePage: React.FC = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showElements, setShowElements] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const [fetchedGames, fetchedPosts, fetchedProducts] = await Promise.all([
        getGames(),
        getBlogPosts(),
        getProducts()
      ]);
      setGames(fetchedGames);
      setBlogPosts(fetchedPosts);
      setProducts(fetchedProducts);
    };

    fetchData();

    const timer = setTimeout(() => {
      setShowElements(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const heroSlides = [
    {
      title: 'VYSE',
      subtitle: 'Experience the future of gaming with our revolutionary new title',
      imageUrl: 'https://static.wixstatic.com/media/84ed6a_940a31341adb4f47baa2c3789ee033d3~mv2.png/v1/crop/x_0,y_50,w_2560,h_1340/fill/w_726,h_380,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/DC_YTBanner_V03.png',
      overlayImage: 'https://static.wixstatic.com/media/84ed6a_88b18702f83e4c24b369f4830bc7a8cc~mv2.png/v1/crop/x_0,y_0,w_1068,h_857/fill/w_415,h_333,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/Pommi.png',
      link: '/games/1',
      cta: 'Explore Game'
    },
    {
      title: 'New Collection',
      subtitle: 'Check out our latest merchandise and collectibles',
      imageUrl: 'https://i.shgcdn.com/802954ce-7c48-4add-a38c-261f88439608/',
      overlayImage: '',
      link: '/store',
      cta: 'Shop Now'
    },
    {
      title: 'Latest News',
      subtitle: 'Stay updated with our development progress and announcements',
      imageUrl: 'https://static.wixstatic.com/media/84ed6a_940a31341adb4f47baa2c3789ee033d3~mv2.png/v1/crop/x_0,y_50,w_2560,h_1340/fill/w_1452,h_760,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/DC_YTBanner_V03.png',
      overlayImage: 'https://static.wixstatic.com/media/84ed6a_88b18702f83e4c24b369f4830bc7a8cc~mv2.png/v1/crop/x_0,y_0,w_1068,h_857/fill/w_830,h_666,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/Pommi.png',
      link: '/blog',
      cta: 'Read More'
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === heroSlides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? heroSlides.length - 1 : prev - 1));
  };

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(timer);
  }, [currentSlide]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  return (
    <div className="bg-dark">
      {/* Hero Section */}
      <section className="hero-carousel">
        {heroSlides.map((slide, index) => (
          <div
            key={index}
            className={`hero-slide ${currentSlide === index ? 'active' : ''}`}
            style={{
              backgroundImage: `url(${slide.imageUrl})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          >
            <div className="hero-overlay"></div>
            <div className="hero-image">
              <img
                src={slide.overlayImage}
                alt={slide.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="hero-content">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: currentSlide === index ? 1 : 0, x: currentSlide === index ? 0 : -50 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="max-w-2xl"
              >
                <h1 className="text-5xl md:text-7xl font-heading font-bold text-white mb-4">
                  {slide.title}
                </h1>
                <p className="text-xl text-gray-300 mb-8">{slide.subtitle}</p>
                <Link
                  to={slide.link}
                  className="bg-primary-600 hover:bg-primary-700 text-white font-medium py-3 px-6 rounded-md transition-all hover:shadow-glow"
                >
                  {slide.cta}
                </Link>
              </motion.div>
            </div>
          </div>
        ))}

        <div className="carousel-arrows">
          <button
            onClick={prevSlide}
            className="p-2 rounded-full bg-black/50 text-white hover:bg-primary-600 transition-all"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={nextSlide}
            className="p-2 rounded-full bg-black/50 text-white hover:bg-primary-600 transition-all"
          >
            <ChevronRight size={24} />
          </button>
        </div>

        <div className="carousel-dots">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`carousel-dot ${currentSlide === index ? 'active' : ''}`}
            />
          ))}
        </div>
      </section>

      {/* What We Do Section */}
      <section className="py-20 bg-dark">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            animate={showElements ? "visible" : "hidden"}
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
          >
            <motion.div variants={itemVariants}>
              <h2 className="text-primary-400 text-lg font-semibold mb-2">ABOUT US</h2>
              <h3 className="text-4xl font-heading font-bold text-white mb-6">
                ENTONCES ¿QUÉ HACEMOS?
              </h3>
              <p className="text-gray-300 mb-6">
                Somos una empresa de entretenimiento digital enfocada en crear experiencias únicas. Desarrollamos videojuegos innovadores, producimos contenido multimedia de alta calidad y organizamos eventos que conectan a las comunidades de jugadores.
              </p>
              <p className="text-gray-300 mb-6">
                Nuestro equipo combina años de experiencia en el desarrollo de tecnología de punta, narrativas cautivadoras y diseño visual impresionante para crear productos que redefinan los estándares de la industria.
              </p>
              <p className="text-gray-300 mb-8">
                Desde programas para multiplataforma hasta espectáculos inmersivos, cada proyecto está diseñado para ofrecer experiencias memorables que trascienden los formatos tradicionales.
              </p>
            </motion.div>
            
            <motion.div variants={itemVariants} className="relative">
              <div className="bg-gradient-to-tr from-primary-600/20 to-secondary-600/20 rounded-lg p-1">
                <img
                  src="https://images.pexels.com/photos/7915263/pexels-photo-7915263.jpeg"
                  alt="Our Team"
                  className="rounded-lg w-full h-auto"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-accent-500 rounded-full opacity-30 blur-xl"></div>
              <div className="absolute -top-6 -left-6 w-24 h-24 bg-primary-500 rounded-full opacity-30 blur-xl"></div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* News Section */}
      <section className="py-20 bg-dark-surface">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-heading font-bold text-white mb-4">
              Actualidad
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Las últimas novedades sobre el desarrollo de nuestros juegos, eventos y anuncios importantes
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {blogPosts.length > 0 && (
              <div className="row-span-2">
                <Link to={`/blog/${blogPosts[0].id}`} className="block group">
                  <div className="relative rounded-lg overflow-hidden">
                    <img
                      src={blogPosts[0].imageUrl}
                      alt={blogPosts[0].title}
                      className="w-full h-96 object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 p-6">
                      <span className="text-primary-400 text-sm font-medium">
                        {new Date(blogPosts[0].publishedDate).toLocaleDateString('es-ES', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric'
                        })}
                      </span>
                      <h3 className="text-2xl font-heading font-bold text-white mt-2 mb-4">
                        {blogPosts[0].title}
                      </h3>
                      <p className="text-gray-300 mb-4 line-clamp-2">
                        {blogPosts[0].excerpt}
                      </p>
                      <span className="inline-block text-primary-400 font-medium group-hover:text-primary-300 transition-colors">
                        Ver Más &rarr;
                      </span>
                    </div>
                  </div>
                </Link>
              </div>
            )}

            <div className="space-y-8">
              {blogPosts.slice(1, 3).map((post) => (
                <Link key={post.id} to={`/blog/${post.id}`} className="block group">
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="md:w-1/3 relative rounded-lg overflow-hidden">
                      <img
                        src={post.imageUrl}
                        alt={post.title}
                        className="w-full h-32 object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="md:w-2/3">
                      <span className="text-primary-400 text-sm font-medium">
                        {new Date(post.publishedDate).toLocaleDateString('es-ES', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric'
                        })}
                      </span>
                      <h3 className="text-xl font-heading font-bold text-white mt-1 mb-2">
                        {post.title}
                      </h3>
                      <p className="text-gray-400 text-sm mb-2 line-clamp-2">
                        {post.excerpt}
                      </p>
                      <span className="inline-block text-primary-400 text-sm font-medium group-hover:text-primary-300 transition-colors">
                        Ver Más &rarr;
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Our Games Section */}
      <section className="py-20 bg-dark" id="games">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-heading font-bold text-white mb-4">
              Nuestros Juegos
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Explora nuestra colección de títulos innovadores que están redefiniendo el mundo del gaming
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {games.map((game) => (
              <Link 
                key={game.id} 
                to={`/games/${game.title.toLowerCase().replace(/\s+/g, '-')}`} 
                className="relative overflow-hidden rounded-lg group"
              >
                <div className="aspect-[16/9] relative">
                  <img 
                    src={game.imageUrl} 
                    alt={game.title} 
                    className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-100 group-hover:opacity-90 transition-opacity"></div>
                  <div className="absolute bottom-0 left-0 p-6">
                    <h3 className="text-2xl font-heading font-bold text-white mb-2">{game.title}</h3>
                    <p className="text-gray-300 mb-4 line-clamp-2">{game.description}</p>
                    <span className="inline-block text-primary-400 font-medium group-hover:translate-x-2 transition-transform">
                      Explorar Juego →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Our Products Section */}
      <section className="py-20 bg-dark-surface">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-heading font-bold text-white mb-4">
              Nuestros Productos
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Descubre nuestra colección de merchandising oficial y productos exclusivos
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {products.slice(0, 4).map((product) => (
              <Link
                key={product.id}
                to={`/store/product/${product.id}`}
                className="group"
              >
                <div className="bg-dark-card rounded-lg overflow-hidden">
                  <div className="aspect-square relative overflow-hidden">
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    {!product.inStock && (
                      <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                        Agotado
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="text-white font-medium line-clamp-1">{product.name}</h3>
                    <p className="text-primary-400 font-bold mt-1">${product.price.toFixed(2)}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link
              to="/store"
              className="inline-flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white font-medium py-3 px-6 rounded-md transition-all hover:shadow-glow"
            >
              <ShoppingBag size={20} />
              Ver Todos los Productos
            </Link>
          </div>
        </div>
      </section>

      {/* YouTube Section */}
      <section className="py-20 bg-dark">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-br from-dark-surface to-dark-card rounded-xl overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="p-8 md:p-12 flex flex-col justify-center">
                <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-4">
                  WHERE TO WATCH OUR STUFF?
                </h2>
                <p className="text-gray-300 mb-6">
                  Our content is live on YouTube! We drop regular content with you in-depth tutorials for our games, making announcements, developer insights, and much more!
                </p>
                <p className="text-gray-300 mb-8">
                  Subscribe to our channel to stay updated with the latest news, gameplay, interviews, tips, and behind-the-scenes content.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <a
                    href="#"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-medium py-3 px-6 rounded-md transition-all"
                  >
                    <Youtube size={20} />
                    Visit Our Channel
                  </a>
                  <div className="flex items-center gap-2 text-white">
                    <span className="font-bold text-2xl">2.4M+</span>
                    <span className="text-gray-400">subscribers</span>
                  </div>
                </div>
              </div>
              <div className="relative">
                <img
                  src="https://static.wixstatic.com/media/84ed6a_e3bac825d5c140a4a665ba898b3ff51b~mv2.png/v1/fill/w_751,h_435,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/84ed6a_e3bac825d5c140a4a665ba898b3ff51b~mv2.png"
                  alt="YouTube Channel"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-20 h-20 rounded-full bg-red-600 flex items-center justify-center cursor-pointer hover:bg-red-700 transition-colors">
                    <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[20px] border-l-white border-b-[10px] border-b-transparent ml-1"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="py-20 bg-dark-surface overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-heading font-bold text-white mb-4">
              PARTNERSHIPS
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Orgullosos de colaborar con las mejores marcas de la industria
            </p>
          </div>

          <div className="relative">
            <div className="flex space-x-8 animate-infinite-scroll">
              {[...Array(2)].map((_, setIndex) => (
                <div key={setIndex} className="flex space-x-8 min-w-full">
                  {[
                    "https://glitchproductions.store/cdn/shop/files/NewGlitchLogo_Black_Official_73356ee0-2719-447a-a844-46142e204247.png?v=1702366314",
                    "https://press.asus.com/assets/w_4035,h_3474/4a83deef-f73a-44e9-a9d6-1ae062de6fb9/ROG%20logo_red.png",
                    "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/Koenigsegg-logo-1994-2048x2048.png/1200px-Koenigsegg-logo-1994-2048x2048.png",
                    "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/Coca-Cola_logo.svg/2560px-Coca-Cola_logo.svg.png",
                    "https://registry.npmmirror.com/@lobehub/icons-static-png/1.62.0/files/dark/grok.png",
                    "https://static.vecteezy.com/system/resources/previews/023/986/880/non_2x/discord-logo-discord-logo-transparent-discord-icon-transparent-free-free-png.png",
                    "https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Steam_icon_logo.svg/1200px-Steam_icon_logo.svg.png",
                    "https://cdn.freebiesupply.com/images/large/2x/air-jordan-logo-png-transparent.png",
                  ].map((logo, index) => (
                    <div 
                      key={`${setIndex}-${index}`} 
                      className="w-32 h-32 flex-shrink-0 flex items-center justify-center transition-all duration-300"
                    >
                      <img
                        src={logo}
                        alt={`Partner ${index + 1}`}
                        className="max-w-full max-h-full"
                      />
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;