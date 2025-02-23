import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UserCircle } from 'lucide-react';

interface ProfileRegistrationProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface UserProfile {
  name: string;
  age: number;
  height: number;
  weight: number;
}

const ProfileRegistration = ({ isOpen, onClose }: ProfileRegistrationProps) => {
  const [profile, setProfile] = useState<UserProfile>({
    name: '',
    age: 0,
    height: 0,
    weight: 0
  });

  const handleSubmit = () => {
    // Save to localStorage for now
    localStorage.setItem('userProfile', JSON.stringify(profile));
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] bg-gradient-to-br from-white to-blue-50 dark:from-gray-900 dark:to-gray-800 mt-8 rounded-2xl shadow-2xl border-0 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,transparent,black)] dark:bg-grid-slate-700/25 opacity-20"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(var(--primary-rgb),0.1),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(var(--primary-rgb),0.1),transparent_50%)]"></div>
        
        <DialogHeader className="space-y-4 relative">
          <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl mx-auto shadow-xl transform hover:scale-110 transition-transform duration-300 group">
            <UserCircle className="h-8 w-8 text-white group-hover:animate-pulse" />
          </div>
          <DialogTitle className="text-3xl font-bold text-center bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent dark:from-blue-400 dark:to-indigo-400">
            Complete Your Profile
          </DialogTitle>
          <DialogDescription className="text-center text-base text-gray-600 dark:text-gray-300 max-w-sm mx-auto">
            Let's personalize your experience with some basic information about you
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-6 relative">
          <div className="space-y-6">
            <div className="grid gap-3">
              <Label htmlFor="name" className="text-lg font-semibold text-gray-800 dark:text-white flex items-center gap-2 group">
                <span className="w-2 h-2 bg-blue-500 rounded-full group-hover:animate-ping"></span>
                Name
              </Label>
              <div className="relative">
                <Input
                  id="name"
                  value={profile.name}
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  placeholder="Enter your name"
                  className="text-lg bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 border-gray-200 dark:border-gray-700 focus:border-blue-500 dark:focus:border-blue-400 rounded-xl py-6 pl-12 transition-all duration-300 hover:bg-white/80 dark:hover:bg-gray-900/80"
                />
                <UserCircle className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-3">
                <Label htmlFor="age" className="text-lg font-semibold text-gray-800 dark:text-white flex items-center gap-2 group">
                  <span className="w-2 h-2 bg-blue-500 rounded-full group-hover:animate-ping"></span>
                  Age
                </Label>
                <div className="relative group">
                  <Input
                    id="age"
                    type="number"
                    value={profile.age || ''}
                    onChange={(e) => setProfile({ ...profile, age: Number(e.target.value) })}
                    placeholder="Years"
                    className="text-lg bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 border-gray-200 dark:border-gray-700 focus:border-blue-500 dark:focus:border-blue-400 rounded-xl transition-all duration-300 hover:bg-white/80 dark:hover:bg-gray-900/80 pr-12"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500 dark:text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    years
                  </span>
                </div>
              </div>
              
              <div className="space-y-3">
                <Label htmlFor="height" className="text-lg font-semibold text-gray-800 dark:text-white flex items-center gap-2 group">
                  <span className="w-2 h-2 bg-blue-500 rounded-full group-hover:animate-ping"></span>
                  Height
                </Label>
                <div className="relative group">
                  <Input
                    id="height"
                    type="number"
                    step="0.01"
                    value={profile.height || ''}
                    onChange={(e) => setProfile({ ...profile, height: Number(e.target.value) })}
                    placeholder="0.00"
                    className="text-lg bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 border-gray-200 dark:border-gray-700 focus:border-blue-500 dark:focus:border-blue-400 rounded-xl transition-all duration-300 hover:bg-white/80 dark:hover:bg-gray-900/80 pr-12"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500 dark:text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    m
                  </span>
                </div>
              </div>
              
              <div className="space-y-3">
                <Label htmlFor="weight" className="text-lg font-semibold text-gray-800 dark:text-white flex items-center gap-2 group">
                  <span className="w-2 h-2 bg-blue-500 rounded-full group-hover:animate-ping"></span>
                  Weight
                </Label>
                <div className="relative group">
                  <Input
                    id="weight"
                    type="number"
                    step="0.1"
                    value={profile.weight || ''}
                    onChange={(e) => setProfile({ ...profile, weight: Number(e.target.value) })}
                    placeholder="0.0"
                    className="text-lg bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 border-gray-200 dark:border-gray-700 focus:border-blue-500 dark:focus:border-blue-400 rounded-xl transition-all duration-300 hover:bg-white/80 dark:hover:bg-gray-900/80 pr-12"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500 dark:text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    kg
                  </span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex justify-end mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
            <Button
              onClick={handleSubmit}
              className="relative bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-lg font-medium px-8 py-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 group overflow-hidden"
            >
              <span className="relative z-10">Save Profile</span>
              <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,rgba(255,255,255,0.1)_10px,rgba(255,255,255,0.1)_20px)] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-indigo-600/20 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-300"></div>
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProfileRegistration; 