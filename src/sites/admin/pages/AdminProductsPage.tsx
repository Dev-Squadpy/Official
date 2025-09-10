import React, { useState, useEffect } from 'react';
import { getProducts, createProduct, updateProduct, deleteProduct } from '../../../utils/storage';
import { Product } from '../../../types';
import { Edit, Trash2, Plus, X, Search } from 'lucide-react';
import { motion } from 'framer-motion';

const AdminProductsPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState<Omit<Product, 'id'>>({
    name: '',
    description: '',
    price: 0,
    imageUrl: '',
    imageUrl2: '',
    category: '',
    inStock: true
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    const fetchProducts = async () => {
      const fetchedProducts = await getProducts();
      setProducts(fetchedProducts);
      setLoading(false);
    };

    fetchProducts();
  }, []);

  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      price: 0,
      imageUrl: '',
      imageUrl2: '',
      category: '',
      inStock: true
    });
    setFormErrors({});
    setEditingProduct(null);
  };

  const openModal = (product: Product | null = null) => {
    if (product) {
      setEditingProduct(product);
      setFormData({
        name: product.name,
        description: product.description,
        price: product.price,
        imageUrl: product.imageUrl,
        imageUrl2: product.imageUrl2 || '',
        category: product.category,
        inStock: product.inStock
      });
    } else {
      resetForm();
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    resetForm();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({
        ...prev,
        [name]: checked
      }));
    } else if (type === 'number') {
      setFormData(prev => ({
        ...prev,
        [name]: parseFloat(value)
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }

    // Clear error when field is edited
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      errors.name = 'El nombre es obligatorio';
    }
    
    if (!formData.description.trim()) {
      errors.description = 'La descripción es obligatoria';
    }
    
    if (formData.price <= 0) {
      errors.price = 'El precio debe ser mayor que 0';
    }
    
    if (!formData.imageUrl.trim()) {
      errors.imageUrl = 'La URL de la imagen es obligatoria';
    }
    
    if (!formData.category.trim()) {
      errors.category = 'La categoría es obligatoria';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      try {
        if (editingProduct) {
          // Update existing product
          const updatedProduct = await updateProduct(editingProduct.id, {
            id: editingProduct.id,
            ...formData
          });
          
          setProducts(prev => prev.map(p => 
            p.id === editingProduct.id ? updatedProduct : p
          ));
        } else {
          // Create new product
          const newProduct = await createProduct({
            id: Date.now().toString(),
            ...formData
          });
          
          setProducts(prev => [...prev, newProduct]);
        }
        
        closeModal();
      } catch (error) {
        console.error('Error saving product:', error);
      }
    }
  };

  const handleDeleteProduct = async (id: string) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este producto?')) {
      try {
        await deleteProduct(id);
        setProducts(prev => prev.filter(p => p.id !== id));
      } catch (error) {
        console.error('Error deleting product:', error);
      }
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="w-16 h-16 border-4 border-primary-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-heading font-bold text-white">Gestión de Productos</h1>
        <button
          onClick={() => openModal()}
          className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-md flex items-center"
        >
          <Plus size={18} className="mr-1" />
          Añadir Producto
        </button>
      </div>

      <div className="bg-dark-surface rounded-lg p-6 mb-8">
        <div className="flex flex-col md:flex-row justify-between md:items-center mb-6">
          <h2 className="text-lg font-heading font-semibold text-white mb-4 md:mb-0">
            Lista de Productos ({products.length})
          </h2>
          
          <div className="relative">
            <input
              type="text"
              placeholder="Buscar productos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full md:w-64 bg-dark-card border border-gray-700 rounded px-3 py-2 pl-10 text-white focus:outline-none focus:border-primary-500"
            />
            <Search size={18} className="absolute left-3 top-2.5 text-gray-400" />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-white">
            <thead>
              <tr className="border-b border-gray-800">
                <th className="px-4 py-3 text-left">Imagen</th>
                <th className="px-4 py-3 text-left">Nombre</th>
                <th className="px-4 py-3 text-left">Categoría</th>
                <th className="px-4 py-3 text-left">Precio</th>
                <th className="px-4 py-3 text-left">Stock</th>
                <th className="px-4 py-3 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <tr key={product.id} className="border-b border-gray-800">
                    <td className="px-4 py-3">
                      <div className="w-12 h-12 bg-dark-card rounded overflow-hidden">
                        <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover" />
                      </div>
                    </td>
                    <td className="px-4 py-3">{product.name}</td>
                    <td className="px-4 py-3">
                      <span className="bg-dark-card px-2 py-1 rounded text-xs">{product.category}</span>
                    </td>
                    <td className="px-4 py-3 text-primary-400 font-bold">${product.price.toFixed(2)}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded text-xs ${
                        product.inStock 
                          ? 'bg-green-500/20 text-green-500' 
                          : 'bg-red-500/20 text-red-500'
                      }`}>
                        {product.inStock ? 'En Stock' : 'Agotado'}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex justify-end space-x-2">
                        <button
                          onClick={() => openModal(product)}
                          className="p-1 bg-dark hover:bg-primary-600/20 text-gray-400 hover:text-primary-400 rounded"
                          title="Editar"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          onClick={() => handleDeleteProduct(product.id)}
                          className="p-1 bg-dark hover:bg-red-600/20 text-gray-400 hover:text-red-500 rounded"
                          title="Eliminar"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-4 py-6 text-center text-gray-400">
                    No se encontraron productos que coincidan con la búsqueda.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Product Form Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="bg-dark-surface rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto"
          >
            <div className="p-6 border-b border-gray-800 flex justify-between items-center">
              <h3 className="text-xl font-heading font-semibold text-white">
                {editingProduct ? 'Editar Producto' : 'Añadir Producto'}
              </h3>
              <button
                onClick={closeModal}
                className="p-1 bg-dark-card hover:bg-red-600/20 text-gray-400 hover:text-red-500 rounded"
              >
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="name" className="block text-gray-300 mb-1">
                    Nombre <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={`w-full bg-dark-card border ${
                      formErrors.name ? 'border-red-500' : 'border-gray-700'
                    } rounded px-3 py-2 text-white focus:outline-none focus:border-primary-500`}
                  />
                  {formErrors.name && (
                    <p className="text-red-500 text-sm mt-1">{formErrors.name}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="category" className="block text-gray-300 mb-1">
                    Categoría <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className={`w-full bg-dark-card border ${
                      formErrors.category ? 'border-red-500' : 'border-gray-700'
                    } rounded px-3 py-2 text-white focus:outline-none focus:border-primary-500`}
                  >
                    <option value="">Seleccionar categoría</option>
                    <option value="Plushies">Plushies</option>
                    <option value="Clothing">Clothing</option>
                    <option value="Collectibles">Collectibles</option>
                    <option value="Accessories">Accessories</option>
                  </select>
                  {formErrors.category && (
                    <p className="text-red-500 text-sm mt-1">{formErrors.category}</p>
                  )}
                </div>
              </div>
              
              <div className="mb-4">
                <label htmlFor="description" className="block text-gray-300 mb-1">
                  Descripción <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="description"
                  name="description"
                  rows={3}
                  value={formData.description}
                  onChange={handleInputChange}
                  className={`w-full bg-dark-card border ${
                    formErrors.description ? 'border-red-500' : 'border-gray-700'
                  } rounded px-3 py-2 text-white focus:outline-none focus:border-primary-500`}
                ></textarea>
                {formErrors.description && (
                  <p className="text-red-500 text-sm mt-1">{formErrors.description}</p>
                )}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="price" className="block text-gray-300 mb-1">
                    Precio <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    id="price"
                    name="price"
                    step="0.01"
                    min="0"
                    value={formData.price}
                    onChange={handleInputChange}
                    className={`w-full bg-dark-card border ${
                      formErrors.price ? 'border-red-500' : 'border-gray-700'
                    } rounded px-3 py-2 text-white focus:outline-none focus:border-primary-500`}
                  />
                  {formErrors.price && (
                    <p className="text-red-500 text-sm mt-1">{formErrors.price}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="inStock" className="block text-gray-300 mb-1">
                    Estado de Stock
                  </label>
                  <div className="flex items-center h-10">
                    <input
                      type="checkbox"
                      id="inStock"
                      name="inStock"
                      checked={formData.inStock}
                      onChange={(e) => setFormData(prev => ({ ...prev, inStock: e.target.checked }))}
                      className="mr-2 accent-primary-500 w-4 h-4"
                    />
                    <label htmlFor="inStock" className="text-white">
                      En Stock
                    </label>
                  </div>
                </div>
              </div>
              
              <div className="mb-4">
                <label htmlFor="imageUrl" className="block text-gray-300 mb-1">
                  URL de Imagen Principal <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="imageUrl"
                  name="imageUrl"
                  value={formData.imageUrl}
                  onChange={handleInputChange}
                  className={`w-full bg-dark-card border ${
                    formErrors.imageUrl ? 'border-red-500' : 'border-gray-700'
                  } rounded px-3 py-2 text-white focus:outline-none focus:border-primary-500`}
                />
                {formErrors.imageUrl && (
                  <p className="text-red-500 text-sm mt-1">{formErrors.imageUrl}</p>
                )}
              </div>
              
              <div className="mb-6">
                <label htmlFor="imageUrl2" className="block text-gray-300 mb-1">
                  URL de Imagen Secundaria (opcional)
                </label>
                <input
                  type="text"
                  id="imageUrl2"
                  name="imageUrl2"
                  value={formData.imageUrl2}
                  onChange={handleInputChange}
                  className="w-full bg-dark-card border border-gray-700 rounded px-3 py-2 text-white focus:outline-none focus:border-primary-500"
                />
              </div>
              
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 border border-gray-700 text-gray-300 rounded hover:bg-dark-card transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded transition-colors"
                >
                  {editingProduct ? 'Actualizar' : 'Guardar'}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default AdminProductsPage;