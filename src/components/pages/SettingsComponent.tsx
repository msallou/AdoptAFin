"use client";

import React, { useEffect, useState } from 'react';
import { Settings, Lock, X, Save, KeyRound } from 'lucide-react';
import { getCurrentUserEmail } from "@/db-access/fetchUserData";
import { handlePasswordChange, updateUserEmail } from "@/DB-Access/updateUser";
import { useRouter, useSearchParams } from 'next/navigation';

function SettingsComponent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [emailSuccess, setEmailSuccess] = useState("");
  const [passwordSuccess, setPasswordSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [emailChangeRequested, setEmailChangeRequested] = useState(false);
  const [oldEmail, setOldEmail] = useState("");
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // Check for confirmation parameters on component mount
  useEffect(() => {
    const emailConfirmed = searchParams.get('email_confirmed');
    if (emailConfirmed === 'true') {
      setEmailSuccess("Email has been verified and updated successfully!");
      // Force a refresh of the user data to get the new email
      fetchUserEmail();
      // Clear the URL parameter
      router.replace('/settings');
    }
  }, [searchParams, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
  
    try {
      if (formData.email !== await getCurrentUserEmail()) {
        // Email has changed, send verification email
        const emailUpdateRequested = await updateUserEmail(formData.email);
        
        if (emailUpdateRequested) {
          setEmailChangeRequested(true);
          setEmailSuccess("Verification email sent! Please check your new email inbox and click the confirmation link.");
        } else {
          setPasswordError("Error requesting email update");
        }
      } else {
        // No email change, nothing to do
        setEmailSuccess("No changes to save");
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('Error updating email:', error);
        setPasswordError("Error updating email: " + (error.message || "Unknown error"));
      } else {
        console.error('Unknown error:', error);
        setPasswordError("An unexpected error occurred.");
      }
    }
  
    setIsLoading(false);
    
    // Clear success message after delay
    if (!passwordError) {
      setTimeout(() => setEmailSuccess(""), 5000);
    }
  };
  
  // Function to fetch user email - extracted for reuse
  const fetchUserEmail = async () => {
    const email = await getCurrentUserEmail();
    if (email) {
      setFormData((prev) => ({ ...prev, email }));
      setOldEmail(email);
    }
  };
    
  // Fetch user email on mount
  useEffect(() => {
    console.log(emailSuccess)
    fetchUserEmail();
  })

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setPasswordError("New passwords do not match!");
      setIsLoading(false);
      return;
    }
    
    try {
      const success = await handlePasswordChange(
        passwordData.currentPassword,
        passwordData.newPassword
      );
      
      if (success) {
        setEmailSuccess("Password updated successfully!");
        setPasswordSuccess("Password changed successfully!");
        setShowPasswordModal(false);
        setPasswordData({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
      } else {
        setPasswordError("Failed to update password. Please check your current password.");
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('Error updating email:', error);
        setPasswordError("Error updating email: " + (error.message || "Unknown error"));
      } else {
        console.error('Unknown error:', error);
        setPasswordError("An unexpected error occurred.");
      }
    }
    
    setIsLoading(false);
    
    if (!passwordError) {
      setTimeout(() => setEmailSuccess(""), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white p-6 flex items-center justify-center">
      <div className="max-w-2xl mx-auto">
        {/* Header */}

        <div className='flex items-center space-x-4 mb-8 '>
            <div className="bg-white/10 p-4 rounded-3xl shadow-lg w-fit border-blue-500/50 border-2">
            <Settings className="w-8 h-8 text-blue-400" />
            </div>
            <div className=''>
            <h1 className="text-3xl font-bold">Settings</h1>
            </div>
        </div>

        {/* Main Settings Form */}
        <div className='flex flex-row gap-5 w-[50vw]'>
            <div className="bg-gray-800/50 backdrop-blur-lg rounded-xl p-6 shadow-xl border border-gray-700 w-full">
            {emailChangeRequested && (
                <div className="mb-6 p-4 bg-blue-500/20 border border-blue-500 rounded-lg">
                <p className="text-blue-300">
                    <strong>Email verification pending:</strong> Please check both &quot;{oldEmail}&quot; and &quot;{formData.email}&quot; for the verification links.
                </p>
                </div>
            )}            
            <form onSubmit={handleSubmit} className="space-y-12">
                <div className="space-y-12">
                <h1 className='text-white text-2xl font-bold'>Email Settings</h1>
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                        Email Address
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 text-white"
                        required
                    />
                </div>
                </div>
                <div className="flex justify-end">
                    <button
                        type="submit"
                        className="flex items-center px-6 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg transition duration-200"
                        disabled={isLoading}
                    >
                        <Save className="w-4 h-4 mr-2" />
                        {isLoading ? 'Saving...' : 'Save Changes'}
                    </button>
                </div>

            </form>
            </div>
            <div className="bg-gray-800/50 backdrop-blur-lg rounded-xl p-6 shadow-xl border border-gray-700 w-full">
                {passwordSuccess && (
                    <div className="mb-6 p-4 bg-green-500/20 border border-green-500 rounded-lg">
                    <p className="text-green-300">
                        <strong>Password Changed:</strong> {passwordSuccess}
                    </p>
                    </div>
                )}
                <div className="flex items-center justify-between pt-4">
                <div className="space-y-10">
                <h1 className='text-white text-2xl font-bold'>Password Settings</h1>
                <p className='p-2'>Secure your account with a strong password that you don&apos;t use for other accounts</p>
                <button
                    type="button"
                    onClick={() => setShowPasswordModal(true)}
                    className="flex items-center px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition duration-200"
                >
                    <Lock className="w-4 h-4 mr-2" />
                    Change Password
                </button>
                </div>
                </div>
            </div>
        </div>

        {/* Password Modal */}
        {showPasswordModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in">
            <div className="bg-gray-800 rounded-xl p-6 w-full max-w-md m-4 shadow-2xl border border-gray-700 animate-scale-up">
                {passwordError && (
                    <div className="mb-6 p-4 bg-red-500/20 border border-red-500 rounded-lg">
                    <p className="text-red-300">
                        <strong>Password Change Error:</strong> {passwordError}
                    </p>
                    </div>
                )}
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center space-x-3">
                  <KeyRound className="w-6 h-6 text-blue-400" />
                  <h2 className="text-xl font-semibold">Change Password</h2>
                </div>
                <button
                  onClick={() => setShowPasswordModal(false)}
                  className="text-gray-400 hover:text-white transition duration-200"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handlePasswordSubmit} className="space-y-4">
                {['currentPassword', 'newPassword', 'confirmPassword'].map((field) => (
                  <div key={field} className="space-y-2">
                    <label className="block text-sm font-medium text-gray-300">
                      {field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1')}
                    </label>
                    <input
                      type="password"
                      value={passwordData[field as keyof typeof passwordData]}
                      onChange={(e) =>
                        setPasswordData((prev) => ({
                          ...prev,
                          [field]: e.target.value,
                        }))
                      }
                      className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 text-white"
                      required
                    />
                  </div>
                ))}

                <div className="flex justify-end space-x-3 pt-4">
                <button
                    type="button"
                    onClick={() => {
                        setShowPasswordModal(false);
                        setPasswordData({
                        currentPassword: "",
                        newPassword: "",
                        confirmPassword: "",
                        });
                        setPasswordError("");
                    }}
                    className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition duration-200"
                    >
                    Cancel
                    </button>

                  <button
                    type="submit"
                    className="px-6 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg transition duration-200"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Updating...' : 'Update Password'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default SettingsComponent;