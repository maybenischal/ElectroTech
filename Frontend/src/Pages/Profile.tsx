import { useAuth } from "../hooks/useAuth";
import { User, Mail, Shield, Edit3, Settings, LogOut } from "lucide-react";

const Profile = () => {
  const { user, logout } = useAuth();

  const handleEditProfile = () => {
    // TODO: Implement edit profile functionality
    console.log("Edit profile clicked");
  };

  const handleSettings = () => {
    // TODO: Implement settings functionality
    console.log("Settings clicked");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">My Profile</h1>
          <p className="text-gray-600">Manage your account information and preferences</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-8 text-center">
              <div className="relative inline-block mb-6">
                <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-3xl font-bold">
                  {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                </div>
                <div className="absolute -bottom-2 -right-2 bg-green-500 w-6 h-6 rounded-full border-2 border-white"></div>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">{user?.name}</h2>
              <p className="text-gray-600 mb-6">{user?.email}</p>
              
              {/* Action Buttons */}
              <div className="space-y-3">
                <button
                  onClick={handleEditProfile}
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 transform hover:scale-105"
                >
                  <Edit3 size={16} />
                  Edit Profile
                </button>
                <button
                  onClick={handleSettings}
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-all duration-200"
                >
                  <Settings size={16} />
                  Settings
                </button>
              </div>
            </div>
          </div>

          {/* Details Section */}
          <div className="lg:col-span-2 space-y-6">
            {/* Personal Information */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <User className="text-blue-600" size={20} />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">Personal Information</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="group">
                  <label className="block text-sm font-medium text-gray-500 mb-2">Full Name</label>
                  <div className="p-4 bg-gray-50 rounded-lg border group-hover:bg-gray-100 transition-colors">
                    <p className="text-lg text-gray-900 font-medium">{user?.name || 'Not provided'}</p>
                  </div>
                </div>
                
                <div className="group">
                  <label className="block text-sm font-medium text-gray-500 mb-2">Email Address</label>
                  <div className="p-4 bg-gray-50 rounded-lg border group-hover:bg-gray-100 transition-colors flex items-center gap-2">
                    <Mail size={16} className="text-gray-400" />
                    <p className="text-lg text-gray-900">{user?.email || 'Not provided'}</p>
                  </div>
                </div>
                
                <div className="group">
                  <label className="block text-sm font-medium text-gray-500 mb-2">User ID</label>
                  <div className="p-4 bg-gray-50 rounded-lg border group-hover:bg-gray-100 transition-colors flex items-center gap-2">
                    <Shield size={16} className="text-gray-400" />
                    <p className="text-sm text-gray-600 font-mono">{user?.id || 'Not available'}</p>
                  </div>
                </div>
                
                <div className="group">
                  <label className="block text-sm font-medium text-gray-500 mb-2">Account Status</label>
                  <div className="p-4 bg-gray-50 rounded-lg border group-hover:bg-gray-100 transition-colors">
                    <p className="text-lg text-green-600 font-medium">Active</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Account Statistics */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Account Statistics</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-6 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg">
                  <div className="text-3xl font-bold text-blue-600 mb-2">0</div>
                  <p className="text-gray-600">Orders Placed</p>
                </div>
                <div className="text-center p-6 bg-gradient-to-r from-green-50 to-green-100 rounded-lg">
                  <div className="text-3xl font-bold text-green-600 mb-2">0</div>
                  <p className="text-gray-600">Wishlist Items</p>
                </div>
                <div className="text-center p-6 bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg">
                  <div className="text-3xl font-bold text-purple-600 mb-2">0</div>
                  <p className="text-gray-600">Reviews Written</p>
                </div>
              </div>
            </div>

            {/* Account Actions */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Account Actions</h3>
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={logout}
                  className="flex items-center justify-center gap-2 py-3 px-6 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all duration-200 transform hover:scale-105"
                >
                  <LogOut size={16} />
                  Logout
                </button>
                <button className="flex items-center justify-center gap-2 py-3 px-6 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors">
                  Delete Account
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
