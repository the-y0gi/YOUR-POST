import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Image as ImageIcon, XCircle, Send, Sparkles } from "lucide-react";
import { toast } from "react-hot-toast";
import api from "../../api/axios";

const CreatePostModal = ({ isOpen, onClose, onPostCreated, editData }) => {
  const [text, setText] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (editData && isOpen) {
      setText(editData.text || "");
      setPreview(editData.image || null);
      setImage(null);
    } else if (!editData && isOpen) {
      setText("");
      setPreview(null);
      setImage(null);
    }
  }, [editData, isOpen]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handlePostSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim() && !image && !preview) {
      return toast.error("Please write your post first!");
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("text", text);
      if (image) formData.append("image", image);

      let res;
      if (editData) {
        // Update Logic: /api/post/:postId
        res = await api.put(`/post/${editData._id}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        // Create Logic: /api/post/create
        res = await api.post("/post/create", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      if (res.data.success) {
        toast.success(editData ? "Post updated!" : "Post shared!");
        onPostCreated();
        onClose();
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Operation failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/90 backdrop-blur-md z-[100]"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 30 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg z-[101] px-4"
          >
            <div className="glass-card overflow-hidden border-white/10 shadow-[0_0_50px_rgba(255,0,122,0.15)] bg-[#0A0A0A]/80">
              {/* Header */}
              <div className="p-5 border-b border-white/5 flex items-center justify-between bg-white/5">
                <div className="flex items-center gap-2">
                  <Sparkles size={18} className="text-primary animate-pulse" />
                  <h3 className="font-space font-bold text-lg text-white">
                    {editData ? "Update Post" : "Create New Post"}
                  </h3>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-white/10 rounded-full transition-all text-text-muted hover:text-white"
                >
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handlePostSubmit}>
                {/* Content Area */}
                <div className="p-6 space-y-6">
                  {/* Image Picker */}
                  <div
                    onClick={() => !preview && fileInputRef.current.click()}
                    className={`relative min-h-[180px] rounded-2xl border-2 border-dashed transition-all duration-500 flex flex-col items-center justify-center cursor-pointer overflow-hidden
                      ${preview ? "border-transparent" : "border-white/10 hover:border-primary/40 bg-white/[0.02]"}`}
                  >
                    {preview ? (
                      <div className="relative w-full group">
                        <img
                          src={preview}
                          alt="preview"
                          className="w-full h-auto max-h-[300px] object-cover rounded-xl shadow-2xl"
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setPreview(null);
                              setImage(null);
                            }}
                            className="bg-red-500 p-2 rounded-full text-white shadow-xl hover:scale-110 transition-transform"
                          >
                            <XCircle size={24} />
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center group">
                        <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                          <ImageIcon className="text-primary" size={28} />
                        </div>
                        <p className="text-sm font-medium text-white/80">
                          Visualise your thoughts
                        </p>
                        <p className="text-[10px] text-text-muted uppercase tracking-[0.2em] mt-1">
                          PNG, JPG or WEBP
                        </p>
                      </div>
                    )}
                  </div>
                  <input
                    type="file"
                    ref={fileInputRef}
                    hidden
                    accept="image/*"
                    onChange={handleImageChange}
                  />

                  {/* Text Input */}
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-text-muted uppercase tracking-[0.3em] ml-1">
                      Your Story
                    </label>
                    <textarea
                      placeholder="What's happening in your noir world?"
                      className="w-full bg-white/[0.03] border border-white/10 rounded-2xl p-5 text-sm text-white outline-none focus:border-primary/50 focus:bg-white/[0.05] transition-all resize-none min-h-[140px] leading-relaxed"
                      value={text}
                      onChange={(e) => setText(e.target.value)}
                    />
                    <div className="flex justify-between items-center px-1">
                      <p className="text-[10px] text-text-muted italic">
                        Markdown supported (mostly)
                      </p>
                      <span
                        className={`text-[10px] font-bold px-2 py-1 rounded bg-black/50 ${text.length > 250 ? "text-primary" : "text-text-muted"}`}
                      >
                        {text.length} / 280
                      </span>
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div className="p-5 border-t border-white/5 flex items-center justify-end gap-4 bg-white/5">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-6 py-2.5 text-[10px] font-bold text-text-muted uppercase tracking-widest hover:text-white transition-colors"
                  >
                    Discard
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-neon !px-8 !py-3 flex items-center gap-3 text-[10px] uppercase tracking-[0.2em] disabled:opacity-50"
                  >
                    {loading ? (
                      "Syncing..."
                    ) : (
                      <>
                        {editData ? "Update Post" : "Broadcast"}{" "}
                        <Send size={14} />
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CreatePostModal;
