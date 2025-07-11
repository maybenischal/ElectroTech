
import { Mail, Phone, MapPin, User, Calendar, Droplets, Phone as PhoneIcon } from 'lucide-react';

const UserProfile = () => {
    return (

        <div className="max-w-4xl mx-auto p-6 bg-gray-50 min-h-screen">
            {/* Header Section */}
            <div className="bg-blue-600 text-white p-6 rounded-t-lg">
                <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                        <User className="w-8 h-8 text-white" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold">Nischal Dhakal</h1>
                        <div className="flex items-center gap-4 mt-2 text-blue-100">
                            <div className="flex items-center gap-1">
                                <Mail className="w-4 h-4" />
                                <span className="text-sm">nischaldhakal@gmail.com</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <Phone className="w-4 h-4" />
                                <span className="text-sm">+977-9876543210</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Information Cards */}
            <div className="grid md:grid-cols-2 gap-6 mt-6">
                {/* Personal Information */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center gap-2 mb-4">
                        <User className="w-5 h-5 text-blue-600" />
                        <h2 className="text-lg font-semibold text-gray-800">Personal Information</h2>
                    </div>

                    <div className="space-y-4">
                        <div className="flex justify-between items-center">
                            <span className="text-gray-600">Gender</span>
                            <span className="text-gray-800 font-medium">Male</span>
                        </div>

                        <div className="flex justify-between items-center">
                            <span className="text-gray-600">Date of Birth</span>
                            <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4 text-gray-500" />
                                <span className="text-gray-800 font-medium">Jan 01, 1990</span>
                            </div>
                        </div>

                        <div className="flex justify-between items-center">
                            <span className="text-gray-600">Blood Group</span>
                            <div className="flex items-center gap-2">
                                <Droplets className="w-4 h-4 text-red-500" />
                                <span className="text-gray-800 font-medium">O+</span>
                            </div>
                        </div>

                        <div className="flex justify-between items-center">
                            <span className="text-gray-600">Phone</span>
                            <div className="flex items-center gap-2">
                                <PhoneIcon className="w-4 h-4 text-gray-500" />
                                <span className="text-gray-800 font-medium">+977-9876543210</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Contact Information */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center gap-2 mb-4">
                        <MapPin className="w-5 h-5 text-blue-600" />
                        <h2 className="text-lg font-semibold text-gray-800">Contact Information</h2>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <span className="text-gray-600 block mb-2">Address</span>
                            <div className="text-gray-800 font-medium">
                                <p>Kathmandu, Nepal</p>
                                <p className="text-sm text-gray-600 mt-1">Bagmati Province</p>
                            </div>
                        </div>

                        <div className="pt-4 border-t border-gray-100">
                            <div className="flex items-center gap-2 mb-2">
                                <Mail className="w-4 h-4 text-gray-500" />
                                <span className="text-gray-600">Email</span>
                            </div>
                            <span className="text-gray-800 font-medium">nischaldhakal@gmail.com</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer Section */}
            <div className="mt-8 text-center">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    Figure 6.9: Use My Profile Page
                </h3>
                <p className="text-gray-600">Professional Profile Management System</p>
            </div>
        </div>
    );
}

export default UserProfile