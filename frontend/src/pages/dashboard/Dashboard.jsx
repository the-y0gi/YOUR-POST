import React, { useEffect, useState, useCallback } from "react";
import Navbar from "../../components/layout/Navbar";
import api from "../../api/axios";
import { toast } from "react-hot-toast";
import { MessageSquare, Heart, Share2 } from "lucide-react";
import CreatePostModal from "../../components/posts/CreatePostModal";
import profileImg from "../../assets/profile.png"
const Dashboard = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchFeed = useCallback(async () => {
    try {
      const res = await api.get("/post/feed");
      if (res.data.success) {
        setPosts(res.data.posts);
      }
    } catch (err) {
      toast.error("Failed to load feed");
    } finally {
      setLoading(false);
    }
  }, []);

  //useEffect only function call
  useEffect(() => {
    fetchFeed();
  }, [fetchFeed]);

  return (
    <div className="min-h-screen bg-black pt-20 pb-10">
      <Navbar openCreateModal={() => setIsModalOpen(true)} />

      <main className="max-w-2xl mx-auto px-4">
        {loading ? (
          <div className="flex flex-col gap-6">
            {[1, 2].map((i) => (
              <div key={i} className="glass-card h-80 animate-pulse"></div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col gap-8">
            {posts.length > 0 ? (
              posts.map((post) => (
                <div
                  key={post._id}
                  className="glass-card overflow-hidden group transition-all duration-300 hover:border-primary/30"
                >
                  {/* Post Header */}
                  <div className="p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="relative p-[2px] rounded-full bg-gradient-to-tr from-primary to-tertiary">
                        <img
                          src={post.user?.avatar || profileImg}
                          alt={post.user?.name}
                          className="w-10 h-10 rounded-full bg-secondary object-cover border-2 border-black"
                        />
                      </div>
                      <div>
                        <h4 className="font-space font-bold text-sm text-white">
                          {post.user?.name}
                        </h4>
                        <p className="text-[10px] text-text-muted uppercase tracking-widest">
                          {new Date(post.createdAt).toLocaleDateString(
                            undefined,
                            { month: "short", day: "numeric" },
                          )}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Post Text */}
                  <div className="px-5 pb-3">
                    <p className="text-gray-200 text-sm leading-relaxed font-inter">
                      {post.text}
                    </p>
                  </div>

                  {/* Post Image */}
                  {post.image && (
                    <div className="relative w-full max-h-[500px] overflow-hidden bg-zinc-900/50">
                      <img
                        src={post.image}
                        alt="post content"
                        className="w-full h-full object-contain group-hover:scale-[1.02] transition-transform duration-700"
                      />
                    </div>
                  )}

                  {/* Post Actions */}
                  <div className="p-4 flex items-center gap-6 border-t border-white/5">
                    <button className="flex items-center gap-2 text-text-muted hover:text-primary transition-colors">
                      <Heart size={20} /> <span className="text-xs">Like</span>
                    </button>
                    <button className="flex items-center gap-2 text-text-muted hover:text-tertiary transition-colors">
                      <MessageSquare size={20} />{" "}
                      <span className="text-xs">Comment</span>
                    </button>
                    <button className="ml-auto text-text-muted hover:text-white transition-colors">
                      <Share2 size={20} />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-20 glass-card">
                <p className="text-text-muted font-space italic">
                  No posts yet.
                </p>
              </div>
            )}
          </div>
        )}
      </main>

      <CreatePostModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onPostCreated={fetchFeed}
      />
    </div>
  );
};

export default Dashboard;
