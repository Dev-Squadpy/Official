import React, { useState, useEffect } from 'react';
import { getBlogPosts, updateBlogPost } from '../../../utils/storage';
import { BlogPost, Comment } from '../../../types';
import { Trash2, Search, Check, X, MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const AdminCommentsPage: React.FC = () => {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [commentToDelete, setCommentToDelete] = useState<{postId: string, commentId: string} | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      const fetchedPosts = await getBlogPosts();
      setBlogPosts(fetchedPosts);
      setLoading(false);
    };

    fetchPosts();
  }, []);

  // Extract all comments from all blog posts
  const allComments = blogPosts.flatMap(post => 
    post.comments.map(comment => ({
      ...comment,
      postTitle: post.title
    }))
  );

  const filteredComments = allComments.filter(comment => 
    comment.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
    comment.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
    comment.postTitle.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDeleteComment = async (postId: string, commentId: string) => {
    setCommentToDelete({ postId, commentId });
  };

  const confirmDeleteComment = async () => {
    if (!commentToDelete) return;
    
    try {
      const post = blogPosts.find(p => p.id === commentToDelete.postId);
      
      if (post) {
        const updatedComments = post.comments.filter(c => c.id !== commentToDelete.commentId);
        const updatedPost = { ...post, comments: updatedComments };
        
        await updateBlogPost(post.id, updatedPost);
        setBlogPosts(prev => prev.map(p => p.id === post.id ? updatedPost : p));
      }
      
      setCommentToDelete(null);
    } catch (error) {
      console.error('Error deleting comment:', error);
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
        <h1 className="text-2xl font-heading font-bold text-white">Gestión de Comentarios</h1>
        <div className="text-gray-400 text-sm">
          {allComments.length} comentarios en total
        </div>
      </div>

      <div className="bg-dark-surface rounded-lg p-6 mb-8">
        <div className="flex flex-col md:flex-row justify-between md:items-center mb-6">
          <h2 className="text-lg font-heading font-semibold text-white mb-4 md:mb-0">
            Todos los Comentarios
          </h2>
          
          <div className="relative">
            <input
              type="text"
              placeholder="Buscar comentarios..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full md:w-64 bg-dark-card border border-gray-700 rounded px-3 py-2 pl-10 text-white focus:outline-none focus:border-primary-500"
            />
            <Search size={18} className="absolute left-3 top-2.5 text-gray-400" />
          </div>
        </div>

        {filteredComments.length === 0 ? (
          <div className="bg-dark-card rounded-lg p-8 text-center">
            <MessageCircle size={48} className="text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-heading font-semibold text-white mb-2">
              No hay comentarios
            </h3>
            <p className="text-gray-400">
              {searchTerm ? 'No se encontraron comentarios que coincidan con la búsqueda.' : 'Aún no hay comentarios en ningún artículo del blog.'}
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredComments.map((comment) => (
              <motion.div
                key={comment.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="bg-dark-card rounded-lg p-4"
              >
                <div className="flex justify-between mb-3">
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-primary-600/30 flex items-center justify-center text-primary-400 mr-3">
                      {comment.author.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <h3 className="text-white font-medium">{comment.author}</h3>
                      <span className="text-gray-400 text-xs">
                        {new Date(comment.date).toLocaleDateString('es-ES', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </span>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => handleDeleteComment(comment.postId, comment.id)}
                    className="p-1 bg-dark hover:bg-red-600/20 text-gray-400 hover:text-red-500 rounded"
                    title="Eliminar"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
                
                <div className="mb-3 px-3 py-2 bg-dark rounded">
                  <p className="text-gray-300">{comment.content}</p>
                </div>
                
                <div className="text-gray-500 text-xs">
                  En el artículo: <span className="text-primary-400">{comment.postTitle}</span>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {commentToDelete && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="bg-dark-surface rounded-lg w-full max-w-md"
          >
            <div className="p-6">
              <h3 className="text-xl font-heading font-semibold text-white mb-4">
                Confirmar Eliminación
              </h3>
              <p className="text-gray-300 mb-6">
                ¿Estás seguro de que quieres eliminar este comentario? Esta acción no se puede deshacer.
              </p>
              
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setCommentToDelete(null)}
                  className="px-4 py-2 border border-gray-700 text-gray-300 rounded hover:bg-dark-card transition-colors flex items-center"
                >
                  <X size={16} className="mr-1" />
                  Cancelar
                </button>
                <button
                  onClick={confirmDeleteComment}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded transition-colors flex items-center"
                >
                  <Check size={16} className="mr-1" />
                  Eliminar
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default AdminCommentsPage;