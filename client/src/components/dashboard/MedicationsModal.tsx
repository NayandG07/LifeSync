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
import { Plus, Pill } from 'lucide-react';

interface MedicationsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (med: any, taken: boolean) => void;
  medications: {
    date: string;
    taken: any[];
    scheduled: any[];
  };
}

interface Medication {
  id: number;
  name: string;
  frequency: string;
}

const MedicationsModal = ({ isOpen, onClose, onUpdate }: MedicationsModalProps) => {
  const [newMed, setNewMed] = useState<Omit<Medication, 'id'>>({
    name: '',
    frequency: ''
  });

  const addMedication = () => {
    if (newMed.name && newMed.frequency) {
      const medication = {
        ...newMed,
        id: Date.now(),
      };
      onUpdate(medication, false);
      setNewMed({ name: '', frequency: '' });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] bg-white dark:bg-gray-800 mt-8 max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold flex items-center gap-2">
            <Pill className="h-6 w-6 text-indigo-600" />
            Manage Medications
          </DialogTitle>
          <DialogDescription>
            Keep track of your medications and frequency
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          {/* Add New Medication Form */}
          <div className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/30 dark:to-purple-900/30 p-6 rounded-xl mb-6 border border-indigo-100 dark:border-indigo-800">
            <h3 className="font-semibold mb-4 text-lg">Add New Medication</h3>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="name" className="text-sm font-medium">
                  Medication Name
                </Label>
                <Input
                  id="name"
                  value={newMed.name}
                  onChange={(e) => setNewMed({ ...newMed, name: e.target.value })}
                  placeholder="Enter medication name"
                  className="bg-white dark:bg-gray-700"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="frequency" className="text-sm font-medium">
                  Frequency
                </Label>
                <Input
                  id="frequency"
                  value={newMed.frequency}
                  onChange={(e) => setNewMed({ ...newMed, frequency: e.target.value })}
                  placeholder="e.g., Once daily"
                  className="bg-white dark:bg-gray-700"
                />
              </div>
              <Button 
                onClick={addMedication}
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-200"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Medication
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MedicationsModal; 