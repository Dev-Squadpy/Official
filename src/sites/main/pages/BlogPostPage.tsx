import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getBlogPost, addComment } from '../../../utils/storage';
import { BlogPost } from '../../../types';
import { ChevronLeft, Calendar, Clock, User, MessageSquare } from 'lucide-react';
import { motion } from 'framer-motion';

const BlogPostPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [commentData, setCommentData] = useState({
    author: '',
    content: ''
  });
  const [commentErrors, setCommentErrors] = useState<Record<string, string>>({});
  const [commentSubmitted, setCommentSubmitted] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      if (id) {
        const fetchedPost = await getBlogPost(id);
        setPost(fetchedPost);
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  const handleCommentChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCommentData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when field is edited
    if (commentErrors[name]) {
      setCommentErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateComment = () => {
    const errors: Record<string, string> = {};
    
    if (!commentData.author.trim()) {
      errors.author = 'Nombre es obligatorio';
    }
    
    if (!commentData.content.trim()) {
      errors.content = 'Comentario es obligatorio';
    }
    
    setCommentErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateComment() && id && post) {
      await addComment(id, {
        author: commentData.author,
        content: commentData.content
      });
      
      // Refetch post to get updated comments
      const updatedPost = await getBlogPost(id);
      setPost(updatedPost);
      
      // Reset form
      setCommentData({
        author: '',
        content: ''
      });
      
      setCommentSubmitted(true);
      
      setTimeout(() => {
        setCommentSubmitted(false);
      }, 3000);
    }
  };

  if (loading) {
    return (
      <div className="pt-24 pb-20 bg-dark min-h-screen flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-primary-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="pt-24 pb-20 bg-dark min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-heading font-bold text-white mb-4">Artículo no encontrado</h2>
          <Link
            to="/blog"
            className="inline-block bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-4 rounded transition-colors"
          >
            Volver al Blog
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
            to="/blog"
            className="inline-flex items-center text-primary-400 hover:text-primary-300 transition-colors"
          >
            <ChevronLeft size={20} />
            <span>Volver al Blog</span>
          </Link>
        </div>

        <article className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative h-96 rounded-lg overflow-hidden mb-8">
              <img
                src={post.imageUrl}
                alt={post.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-8">
                <h1 className="text-4xl font-heading font-bold text-white mb-4">
                  {post.title}
                </h1>
                <div className="flex flex-wrap gap-4 text-sm text-gray-300">
                  <div className="flex items-center">
                    <User size={16} className="mr-1" />
                    <span>{post.author}</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar size={16} className="mr-1" />
                    <span>
                      {new Date(post.publishedDate).toLocaleDateString('es-ES', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric'
                      })}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Clock size={16} className="mr-1" />
                    <span>{post.content.length > 3000 ? '10 min' : '5 min'} lectura</span>
                  </div>
                  <div className="flex items-center">
                    <MessageSquare size={16} className="mr-1" />
                    <span>{post.comments.length} comentarios</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-dark-surface rounded-lg p-8 mb-8"
          >
            <div className="prose prose-invert max-w-none">
              {post.content.split('\n\n').map((paragraph, index) => (
                <p key={index} className="text-gray-300 mb-4">
                  {paragraph}
                </p>
              ))}
            </div>
            
            <div className="flex items-center justify-between mt-8 pt-8 border-t border-gray-800">
              <div className="flex items-center space-x-4">
                <span className="text-gray-400">Compartir:</span>
                <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z"/>
                  </svg>
                </a>
              </div>
              
              <div className="flex items-center">
                <button className="text-primary-400 hover:text-primary-300 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
                    <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/>
                  </svg>
                </button>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-dark-surface rounded-lg p-8"
          >
            <h2 className="text-2xl font-heading font-semibold text-white mb-6">
              Comentarios ({post.comments.length})
            </h2>
            
            {post.comments.length > 0 ? (
              <div className="space-y-6 mb-8">
                {post.comments.map((comment) => (
                  <div key={comment.id} className="border-b border-gray-800 pb-6">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-primary-600/30 flex items-center justify-center text-lg font-bold text-primary-400">
                        {comment.author.charAt(0).toUpperCase()}
                      </div>
                      <div className="flex-grow">
                        <div className="flex justify-between items-center mb-2">
                          <h4 className="text-white font-medium">{comment.author}</h4>
                          <span className="text-gray-400 text-sm">
                            {new Date(comment.date).toLocaleDateString('es-ES', {
                              day: 'numeric',
                              month: 'long',
                              year: 'numeric'
                            })}
                          </span>
                        </div>
                        <p className="text-gray-300">{comment.content}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 mb-8">
                <p className="text-gray-400">
                  Aún no hay comentarios. ¡Sé el primero en comentar!
                </p>
              </div>
            )}
            
            <div>
              <h3 className="text-xl font-heading font-semibold text-white mb-4">
                Deja un comentario
              </h3>
              
              {commentSubmitted ? (
                <div className="bg-green-600/20 border border-green-600 text-green-200 px-4 py-3 rounded mb-4">
                  ¡Gracias! Tu comentario ha sido enviado exitosamente.
                </div>
              ) : (
                <form onSubmit={handleSubmitComment}>
                  <div className="mb-4">
                    <label htmlFor="author" className="block text-gray-300 mb-1">
                      Nombre <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="author"
                      name="author"
                      value={commentData.author}
                      onChange={handleCommentChange}
                      className={`w-full bg-dark-card border ${
                        commentErrors.author ? 'border-red-500' : 'border-gray-700'
                      } rounded px-3 py-2 text-white focus:outline-none focus:border-primary-500`}
                    />
                    {commentErrors.author && (
                      <p className="text-red-500 text-sm mt-1">{commentErrors.author}</p>
                    )}
                  </div>
                  
                  <div className="mb-4">
                    <label htmlFor="content" className="block text-gray-300 mb-1">
                      Comentario <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="content"
                      name="content"
                      rows={4}
                      value={commentData.content}
                      onChange={handleCommentChange}
                      className={`w-full bg-dark-card border ${
                        commentErrors.content ? 'border-red-500' : 'border-gray-700'
                      } rounded px-3 py-2 text-white focus:outline-none focus:border-primary-500`}
                    ></textarea>
                    {commentErrors.content && (
                      <p className="text-red-500 text-sm mt-1">{commentErrors.content}</p>
                    )}
                  </div>
                  
                  <button
                    type="submit"
                    className="bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-6 rounded transition-colors"
                  >
                    Enviar Comentario
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </article>
      </div>
    </div>
  );
};

export default BlogPostPage;