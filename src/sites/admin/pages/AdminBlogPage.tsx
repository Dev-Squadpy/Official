import React, { useState, useEffect } from 'react';
import { getBlogPosts, createBlogPost, updateBlogPost, deleteBlogPost } from '../../../utils/storage';
import { BlogPost } from '../../../types';
import { Edit, Trash2, Plus, X, Search, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';

const AdminBlogPage: React.FC = () => {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [formData, setFormData] = useState<Omit<BlogPost, 'id' | 'comments'>>({
    title: '',
    content: '',
    excerpt: '',
    imageUrl: '',
    author: '',
    publishedDate: new Date().toISOString().split('T')[0]
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    const fetchPosts = async () => {
      const fetchedPosts = await getBlogPosts();
      setBlogPosts(fetchedPosts);
      setLoading(false);
    };

    fetchPosts();
  }, []);

  const filteredPosts = blogPosts.filter(post => 
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    post.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const resetForm = () => {
    setFormData({
      title: '',
      content: '',
      excerpt: '',
      imageUrl: '',
      author: '',
      publishedDate: new Date().toISOString().split('T')[0]
    });
    setFormErrors({});
    setEditingPost(null);
  };

  const openModal = (post: BlogPost | null = null) => {
    if (post) {
      setEditingPost(post);
      setFormData({
        title: post.title,
        content: post.content,
        excerpt: post.excerpt,
        imageUrl: post.imageUrl,
        author: post.author,
        publishedDate: new Date(post.publishedDate).toISOString().split('T')[0]
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

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
    
    if (!formData.title.trim()) {
      errors.title = 'El título es obligatorio';
    }
    
    if (!formData.content.trim()) {
      errors.content = 'El contenido es obligatorio';
    }
    
    if (!formData.excerpt.trim()) {
      errors.excerpt = 'El extracto es obligatorio';
    }
    
    if (!formData.imageUrl.trim()) {
      errors.imageUrl = 'La URL de la imagen es obligatoria';
    }
    
    if (!formData.author.trim()) {
      errors.author = 'El autor es obligatorio';
    }
    
    if (!formData.publishedDate) {
      errors.publishedDate = 'La fecha de publicación es obligatoria';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      try {
        if (editingPost) {
          // Update existing post
          const updatedPost = await updateBlogPost(editingPost.id, {
            id: editingPost.id,
            ...formData,
            comments: editingPost.comments
          });
          
          setBlogPosts(prev => prev.map(p => 
            p.id === editingPost.id ? updatedPost : p
          ));
        } else {
          // Create new post
          const newPost = await createBlogPost({
            id: Date.now().toString(),
            ...formData,
            comments: []
          });
          
          setBlogPosts(prev => [...prev, newPost]);
        }
        
        closeModal();
      } catch (error) {
        console.error('Error saving blog post:', error);
      }
    }
  };

  const handleDeletePost = async (id: string) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este artículo?')) {
      try {
        await deleteBlogPost(id);
        setBlogPosts(prev => prev.filter(p => p.id !== id));
      } catch (error) {
        console.error('Error deleting blog post:', error);
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
        <h1 className="text-2xl font-heading font-bold text-white">Gestión de Blog</h1>
        <button
          onClick={() => openModal()}
          className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-md flex items-center"
        >
          <Plus size={18} className="mr-1" />
          Nuevo Artículo
        </button>
      </div>

      <div className="bg-dark-surface rounded-lg p-6 mb-8">
        <div className="flex flex-col md:flex-row justify-between md:items-center mb-6">
          <h2 className="text-lg font-heading font-semibold text-white mb-4 md:mb-0">
            Artículos del Blog ({blogPosts.length})
          </h2>
          
          <div className="relative">
            <input
              type="text"
              placeholder="Buscar artículos..."
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
                <th className="px-4 py-3 text-left">Título</th>
                <th className="px-4 py-3 text-left">Autor</th>
                <th className="px-4 py-3 text-left">Fecha</th>
                <th className="px-4 py-3 text-left">Comentarios</th>
                <th className="px-4 py-3 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredPosts.length > 0 ? (
                filteredPosts.map((post) => (
                  <tr key={post.id} className="border-b border-gray-800">
                    <td className="px-4 py-3">
                      <div className="w-12 h-12 bg-dark-card rounded overflow-hidden">
                        <img src={post.imageUrl} alt={post.title} className="w-full h-full object-cover" />
                      </div>
                    </td>
                    <td className="px-4 py-3">{post.title}</td>
                    <td className="px-4 py-3">{post.author}</td>
                    <td className="px-4 py-3 text-gray-400">
                      {new Date(post.publishedDate).toLocaleDateString('es-ES', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric'
                      })}
                    </td>
                    <td className="px-4 py-3">
                      <span className="bg-dark-card px-2 py-1 rounded text-xs">
                        {post.comments.length} comentarios
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex justify-end space-x-2">
                        <button
                          onClick={() => openModal(post)}
                          className="p-1 bg-dark hover:bg-primary-600/20 text-gray-400 hover:text-primary-400 rounded"
                          title="Editar"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          onClick={() => handleDeletePost(post.id)}
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
                    No se encontraron artículos que coincidan con la búsqueda.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Blog Post Form Modal */}
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
                {editingPost ? 'Editar Artículo' : 'Nuevo Artículo'}
              </h3>
              <button
                onClick={closeModal}
                className="p-1 bg-dark-card hover:bg-red-600/20 text-gray-400 hover:text-red-500 rounded"
              >
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6">
              <div className="mb-4">
                <label htmlFor="title" className="block text-gray-300 mb-1">
                  Título <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className={`w-full bg-dark-card border ${
                    formErrors.title ? 'border-red-500' : 'border-gray-700'
                  } rounded px-3 py-2 text-white focus:outline-none focus:border-primary-500`}
                />
                {formErrors.title && (
                  <p className="text-red-500 text-sm mt-1">{formErrors.title}</p>
                )}
              </div>
              
              <div className="mb-4">
                <label htmlFor="excerpt" className="block text-gray-300 mb-1">
                  Extracto <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="excerpt"
                  name="excerpt"
                  value={formData.excerpt}
                  onChange={handleInputChange}
                  className={`w-full bg-dark-card border ${
                    formErrors.excerpt ? 'border-red-500' : 'border-gray-700'
                  } rounded px-3 py-2 text-white focus:outline-none focus:border-primary-500`}
                />
                {formErrors.excerpt && (
                  <p className="text-red-500 text-sm mt-1">{formErrors.excerpt}</p>
                )}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="author" className="block text-gray-300 mb-1">
                    Autor <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="author"
                    name="author"
                    value={formData.author}
                    onChange={handleInputChange}
                    className={`w-full bg-dark-card border ${
                      formErrors.author ? 'border-red-500' : 'border-gray-700'
                    } rounded px-3 py-2 text-white focus:outline-none focus:border-primary-500`}
                  />
                  {formErrors.author && (
                    <p className="text-red-500 text-sm mt-1">{formErrors.author}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="publishedDate" className="block text-gray-300 mb-1">
                    Fecha de Publicación <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      id="publishedDate"
                      name="publishedDate"
                      value={formData.publishedDate}
                      onChange={handleInputChange}
                      className={`w-full bg-dark-card border ${
                        formErrors.publishedDate ? 'border-red-500' : 'border-gray-700'
                      } rounded px-3 py-2 text-white focus:outline-none focus:border-primary-500`}
                    />
                    <Calendar size={18} className="absolute right-3 top-2.5 text-gray-400" />
                  </div>
                  {formErrors.publishedDate && (
                    <p className="text-red-500 text-sm mt-1">{formErrors.publishedDate}</p>
                  )}
                </div>
              </div>
              
              <div className="mb-4">
                <label htmlFor="imageUrl" className="block text-gray-300 mb-1">
                  URL de Imagen <span className="text-red-500">*</span>
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
                <label htmlFor="content" className="block text-gray-300 mb-1">
                  Contenido <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="content"
                  name="content"
                  rows={10}
                  value={formData.content}
                  onChange={handleInputChange}
                  className={`w-full bg-dark-card border ${
                    formErrors.content ? 'border-red-500' : 'border-gray-700'
                  } rounded px-3 py-2 text-white focus:outline-none focus:border-primary-500`}
                ></textarea>
                {formErrors.content && (
                  <p className="text-red-500 text-sm mt-1">{formErrors.content}</p>
                )}
                <p className="text-gray-400 text-xs mt-1">
                  Usa doble salto de línea para separar párrafos.
                </p>
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
                  {editingPost ? 'Actualizar' : 'Publicar'}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default AdminBlogPage;