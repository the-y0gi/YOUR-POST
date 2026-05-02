import React, { useState, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { authAPI, uploadAPI } from "../../api/apiService";
import { toast } from "react-hot-toast";
import { Eye, EyeOff, Camera, Loader2, RefreshCw } from "lucide-react";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
    phoneNumber: "",
    avatar: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  //Parallel Image Upload Logic
  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Size Validation (3MB)
    if (file.size > 3 * 1024 * 1024) {
      return toast.error("Image size should be less than 3MB");
    }

    //Instant Preview for UX
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);

    // Immediate Background Upload
    try {
      setUploadingImage(true);
      const uploadData = new FormData();
      uploadData.append("image", file);

      const uploadRes = await uploadAPI.uploadAvatar(uploadData);
      const uploadedUrl = uploadRes.data.avatar;

      // Update formData with the actual URL from Cloudinary
      setFormData((prev) => ({ ...prev, avatar: uploadedUrl }));
      toast.success("Profile picture uploaded!");
    } catch (err) {
      console.error("Upload failed:", err);
      toast.error("Image upload failed. Try again.");
      setImagePreview(null);
    } finally {
      setUploadingImage(false);
    }
  };

  //Signup Logic
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if image is still in transit
    if (uploadingImage) {
      return toast.error("Please wait, image is still uploading...");
    }

    setLoading(true);
    try {
      // Direct call with formData because avatar URL is already inside it
      await authAPI.signup(formData);

      toast.success("OTP sent to your email!");
      navigate("/verify-otp", { state: { email: formData.email } });
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-darkBg px-4 py-8 md:py-12">
      <div className="glass-card p-6 md:p-8 w-full max-w-xl transition-all border border-white/5 shadow-2xl">
        <div className="text-center mb-6">
          <h2 className="text-2xl md:text-3xl font-space font-bold text-white mb-1">
            Join{" "}
            <span className="font-black tracking-tighter text-white ">
              YOUR
              <span className="bg-gradient-to-r from-primary to-pink-500 bg-clip-text text-transparent pl-3">
                POST
              </span>
            </span>
          </h2>
          <p className="text-text-muted uppercase tracking-[0.2em] text-[10px] md:text-xs">
            Create your premium account
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Avatar Upload Section */}
          <div className="flex flex-col items-center group">
            <div
              className={`relative w-24 h-24 rounded-full border-2 border-dashed flex items-center justify-center bg-secondary/30 overflow-hidden cursor-pointer transition-all shadow-lg 
                ${uploadingImage ? "border-primary animate-pulse" : "border-primary/50 hover:border-primary"}`}
              onClick={() => !uploadingImage && fileInputRef.current.click()}
            >
              {imagePreview ? (
                <div className="relative w-full h-full">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className={`w-full h-full object-cover ${uploadingImage ? "opacity-40" : "opacity-100"}`}
                  />
                  {uploadingImage && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <RefreshCw className="w-6 h-6 text-primary animate-spin" />
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center p-2">
                  <Camera className="w-6 h-6 text-text-muted group-hover:text-primary transition-colors mx-auto mb-1" />
                  <span className="text-[9px] text-text-muted uppercase font-bold">
                    Upload Photo
                  </span>
                </div>
              )}

              {!uploadingImage && (
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <p className="text-[10px] text-white font-bold uppercase tracking-wider">
                    Change
                  </p>
                </div>
              )}
            </div>
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              accept="image/*"
              onChange={handleImageChange}
              disabled={uploadingImage}
            />
          </div>

          {/* Form Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2 space-y-1.5">
              <label className="text-[10px] font-bold text-text-muted uppercase tracking-widest ml-1">
                Full Name
              </label>
              <input
                type="text"
                placeholder="Ex. John Doe"
                className="neon-input w-full"
                required
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-text-muted uppercase tracking-widest ml-1">
                Email Address
              </label>
              <input
                type="email"
                placeholder="name@company.com"
                className="neon-input w-full"
                required
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-text-muted uppercase tracking-widest ml-1">
                Phone Number
              </label>
              <input
                type="tel"
                placeholder="+91 00000 00000"
                className="neon-input w-full"
                value={formData.phoneNumber}
                onChange={(e) =>
                  setFormData({ ...formData, phoneNumber: e.target.value })
                }
              />
            </div>

            <div className="md:col-span-2 space-y-1.5">
              <label className="text-[10px] font-bold text-text-muted uppercase tracking-widest ml-1">
                Residential Address
              </label>
              <input
                type="text"
                placeholder="City, State, Country"
                className="neon-input w-full"
                value={formData.address}
                onChange={(e) =>
                  setFormData({ ...formData, address: e.target.value })
                }
              />
            </div>

            <div className="md:col-span-2 space-y-1.5">
              <label className="text-[10px] font-bold text-text-muted uppercase tracking-widest ml-1">
                Security Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="neon-input w-full pr-12"
                  required
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-primary transition-colors p-1"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading || uploadingImage}
            className="btn-neon w-full py-4 mt-2 uppercase tracking-[0.3em] font-bold text-xs flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Processing...
              </>
            ) : uploadingImage ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                Uploading Avatar...
              </>
            ) : (
              "Create Account"
            )}
          </button>
        </form>

        <p className="mt-6 text-center text-text-muted text-[10px] tracking-[0.2em]">
          ALREADY A MEMBER?{" "}
          <Link
            to="/login"
            className="text-pink-300 hover:text-primary font-bold"
          >
            LOGIN
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
