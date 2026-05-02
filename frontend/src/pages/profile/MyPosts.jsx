import React, { useEffect, useState, useCallback } from "react";
import Navbar from "../../components/layout/Navbar";
import api from "../../api/axios";
import { toast } from "react-hot-toast";
import { Pencil, Trash2, Plus } from "lucide-react";
import CreatePostModal from "../../components/posts/CreatePostModal";

const MyPosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);

  const fetchMyPosts = useCallback(async () => {
    try {
      const res = await api.get("/post/my-posts");
      if (res.data.success) setPosts(res.data.posts);
    } catch (err) {
      toast.error("Failed to load your posts");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMyPosts();
  }, [fetchMyPosts]);

  const handleDelete = async (postId) => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;
    try {
      await api.delete(`/post/${postId}`);
      toast.success("Post deleted successfully!");
      setPosts(posts.filter((p) => p._id !== postId));
    } catch (err) {
      toast.error("Failed to delete post!");
    }
  };

  const handleEditClick = (post) => {
    setSelectedPost(post);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-black pt-24 pb-32 px-4 md:px-8">
      <Navbar
        openCreateModal={() => {
          setSelectedPost(null);
          setIsModalOpen(true);
        }}
      />

      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-10">
          <h1 className="text-3xl font-space font-bold text-white tracking-tight">
            My <span className="text-primary">Studio</span>
          </h1>
          <div className="text-text-muted text-sm font-medium bg-white/5 px-4 py-2 rounded-full border border-white/10">
            {posts.length} Posts
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="glass-card h-80 animate-pulse"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 items-start">
            {posts.map((post) => (
              <div
                key={post._id}
                className="glass-card group flex flex-col h-full border-white/5 hover:border-primary/30 transition-all duration-300"
              >
                {/* Image Section*/}
                <div className="aspect-square w-full overflow-hidden rounded-t-2xl bg-zinc-900">
                  {post.image ? (
                    <img
                      src={post.image}
                      alt="post"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-zinc-700 font-space italic">
                      No Image
                    </div>
                  )}
                </div>

                {/* Content Section*/}
                <div className="p-5 flex flex-col flex-grow">
                  <p className="text-sm text-gray-300 mb-6 flex-grow leading-relaxed italic">
                    "{post.text}"
                  </p>

                  {/* Footer Actions */}
                  <div className="flex justify-between items-center pt-4 border-t border-white/5">
                    <span className="text-[10px] text-text-muted uppercase tracking-widest font-bold">
                      {new Date(post.createdAt).toLocaleDateString(undefined, {
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                    <div className="flex gap-4">
                      <button
                        onClick={() => handleEditClick(post)}
                        className="text-text-muted hover:text-tertiary transition-colors"
                        title="Edit"
                      >
                        <Pencil size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(post._id)}
                        className="text-text-muted hover:text-red-500 transition-colors"
                        title="Delete"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && posts.length === 0 && (
          <div className="text-center py-20 glass-card border-dashed">
            <p className="text-text-muted">
              Your studio is empty, make your first post...
            </p>
          </div>
        )}
      </div>

      <CreatePostModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedPost(null);
        }}
        onPostCreated={fetchMyPosts}
        editData={selectedPost}
      />
    </div>
  );
};

export default MyPosts;
