import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getProducts, addToCart } from '../../../utils/storage';
import { Product } from '../../../types';
import { ShoppingCart, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

const StorePage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [addedToCart, setAddedToCart] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      const fetchedProducts = await getProducts();
      setProducts(fetchedProducts);
    };

    fetchProducts();
  }, []);

  const heroSlides = [
    {
      title: "Murder Drones",
      image: "https://i.shgcdn.com/938f54a6-def0-499a-859a-470d21f6e943/-/format/auto/-/quality/normal/-/resize/1920x/",
      description: "Encuentra la mercancía de tu programa favorito",
      link: "/store/category/murder-drones"
    },
    {
      title: "Digital Circus",
      image: "https://i.shgcdn.com/1de5d3ee-c835-4c85-aba5-7c7a15b662a2/-/format/auto/-/quality/normal/-/resize/1920x/",
      description: "Colección exclusiva de Digital Circus",
      link: "/store/category/digital-circus"
    },
    {
      title: "Meta Runner",
      image: "https://i.shgcdn.com/0f3f20a6-1440-4f26-8594-39fc5e026c4d/-/resize/1920x/",
      description: "Descubre los productos de Meta Runner",
      link: "/store/category/meta-runner"
    }
  ];

  const categories = [
    { name: "Plushes", image: "https://i.shgcdn.com/2f489760-a464-40e5-b145-a70e8909837b/-/format/auto/-/preview/3000x3000/-/quality/lighter/" },
    { name: "Animatez", image: "https://i.shgcdn.com/49fd2830-8b4d-4323-b05d-364cd6ec4256/-/format/auto/-/preview/3000x3000/-/quality/lighter/" },
    { name: "Pins", image: "https://i.shgcdn.com/f3c34270-8c9c-417c-b1c7-a4e4ae0e861d/-/format/auto/-/preview/3000x3000/-/quality/lighter/" },
    { name: "Accessories", image: "https://i.shgcdn.com/8f5531fa-9f56-47be-9fa0-6a3b2f499e8f/-/format/auto/-/preview/3000x3000/-/quality/lighter/" },
    { name: "Apparel", image: "https://i.shgcdn.com/78cde4b0-139c-48c5-b755-fc8e4413d46a/-/format/auto/-/preview/3000x3000/-/quality/lighter/" },
    { name: "Posters", image: "https://i.shgcdn.com/c7b2ea4f-4ba7-4801-a472-786778d0a758/-/format/auto/-/preview/3000x3000/-/quality/lighter/" }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === heroSlides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? heroSlides.length - 1 : prev - 1));
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, []);

  const handleAddToCart = async (product: Product) => {
    await addToCart(product, 1);
    setAddedToCart(product.id);
    setTimeout(() => setAddedToCart(null), 2000);
  };

  return (
    <div className="min-h-screen bg-dark">
      {/* Hero Carousel */}
      <section className="hero-carousel">
        {heroSlides.map((slide, index) => (
          <div
            key={index}
            className={`hero-slide ${currentSlide === index ? 'active' : ''}`}
            style={{
              backgroundImage: `url(${slide.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          >
            <div className="hero-overlay"></div>
            <div className="hero-content">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: currentSlide === index ? 1 : 0, x: currentSlide === index ? 0 : -50 }}
                transition={{ duration: 0.5 }}
                className="max-w-2xl"
              >
                <h1 className="text-5xl font-heading font-bold text-white mb-4">
                  {slide.title}
                </h1>
                <p className="text-xl text-gray-300 mb-8">{slide.description}</p>
                <Link
                  to={slide.link}
                  className="btn-primary"
                >
                  Ver Colección
                </Link>
              </motion.div>
            </div>
          </div>
        ))}

        <div className="carousel-arrows">
          <button onClick={prevSlide} className="p-2 rounded-full bg-black/50 text-white hover:bg-primary-600 transition-all">
            <ChevronLeft size={24} />
          </button>
          <button onClick={nextSlide} className="p-2 rounded-full bg-black/50 text-white hover:bg-primary-600 transition-all">
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

      {/* Featured Products */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-heading font-bold text-white text-center mb-12"
          >
            Nuevos y destacados
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {products.slice(0, 4).map((product) => (
              <div key={product.id} className="product-card group">
                <Link to={`/store/product/${product.id}`}>
                  <div className="product-image">
                    <img src={product.imageUrl} alt={product.name} />
                  </div>
                  <div className="product-details">
                    <h3 className="text-lg font-medium text-white mb-2">{product.name}</h3>
                    <p className="product-price">${product.price.toFixed(2)}</p>
                  </div>
                </Link>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 px-4 bg-dark-surface">
        <div className="container mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-heading font-bold text-white text-center mb-12"
          >
            Comprar por categoría
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-3 gap-6"
          >
            {categories.map((category, index) => (
              <Link
                key={index}
                to={`/store/category/${category.name.toLowerCase()}`}
                className="relative overflow-hidden rounded-lg group"
              >
                <div className="aspect-[16/9]">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 p-6">
                    <h3 className="text-2xl font-heading font-bold text-white">{category.name}</h3>
                  </div>
                </div>
              </Link>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Featured Collections */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-dark-surface rounded-lg overflow-hidden"
            >
              <img
                src="https://i.shgcdn.com/0e31bed3-8833-4e24-becc-c100d02221b3/"
                alt="Animatez Collection"
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <h3 className="text-2xl font-heading font-bold text-white mb-4">Animatez</h3>
                <p className="text-gray-300 mb-6">¡Hemos transformado todos tus personajes favoritos en figuras comercializables!</p>
                <Link to="/store/collection/animatez" className="btn-primary">
                  Ver Colección
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-dark-surface rounded-lg overflow-hidden"
            >
              <img
                src="https://i.shgcdn.com/c7f26755-b78a-4320-b82a-5c0f042eedbf/-/format/auto/-/quality/normal/-/resize/1920x/"
                alt="Limited Edition"
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <h3 className="text-2xl font-heading font-bold text-white mb-4">Edición Limitada</h3>
                <p className="text-gray-300 mb-6">Descubre nuestra colección exclusiva de productos en edición limitada.</p>
                <Link to="/store/collection/limited-edition" className="btn-primary">
                  Ver Colección
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default StorePage;