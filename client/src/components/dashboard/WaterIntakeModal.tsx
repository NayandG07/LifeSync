import React, { useState, useEffect } from 'react';
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
import { Droplet, Plus, Minus } from 'lucide-react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { format } from 'date-fns';

interface WaterIntakeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (amount: number, log: any) => void;
  currentIntake: number;
  intakeLogs: any[];
  userWeight?: number;
}

const WaterIntakeModal = ({ isOpen, onClose, onUpdate, currentIntake, intakeLogs, userWeight }: WaterIntakeModalProps) => {
  const [customAmount, setCustomAmount] = useState<string>('');
  
  // Calculate recommended daily intake based on weight (30ml per kg of body weight)
  const calculateDailyGoal = () => {
    if (userWeight) {
      return Math.round(userWeight * 30); // WHO recommendation: 30ml per kg of body weight
    }
    return 2000; // Default recommendation if weight is not available
  };
  
  const dailyGoal = calculateDailyGoal();
  const quickAddOptions = [100, 200, 300, 500, 1000];

  const handleQuickAdd = (amount: number, isAdd: boolean) => {
    if (isAdd) {
      const log = {
        time: new Date().toISOString(),
        amount: amount,
        type: 'add'
      };
      onUpdate(amount, log);
    } else {
      if (currentIntake >= amount) {
        const log = {
          time: new Date().toISOString(),
          amount: -amount,
          type: 'subtract'
        };
        onUpdate(-amount, log);
      }
    }
    setCustomAmount('');
  };

  const handleCustomAmountSubmit = (type: 'add' | 'subtract') => {
    const amount = parseInt(customAmount);
    if (!isNaN(amount) && amount > 0) {
      if (type === 'subtract' && amount > currentIntake) {
        return; // Can't subtract more than current intake
      }
      handleQuickAdd(amount, type === 'add');
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] max-h-[80vh] overflow-y-auto bg-white dark:bg-gray-800">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold flex items-center gap-2">
            <Droplet className="h-6 w-6 text-blue-500" />
            Water Intake Tracker
          </DialogTitle>
          <DialogDescription>Track your daily water consumption</DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          {/* Current Intake Display */}
          <div className="flex items-center justify-between gap-4 p-6 bg-blue-50 dark:bg-blue-900/30 rounded-lg border border-blue-100 dark:border-blue-800">
            <div className="text-center flex-1">
              <p className="text-base font-semibold text-gray-800 dark:text-white">Current Intake</p>
              <p className="text-4xl font-bold text-blue-600 dark:text-blue-200">{currentIntake}ml</p>
            </div>
            <div className="h-8 w-px bg-blue-200 dark:bg-blue-700" />
            <div className="text-center flex-1">
              <p className="text-base font-semibold text-gray-800 dark:text-white">Daily Goal</p>
              <p className="text-4xl font-bold text-emerald-600 dark:text-emerald-200">{dailyGoal}ml</p>
              {userWeight && (
                <p className="text-sm font-medium text-gray-700 dark:text-gray-100 mt-1">
                  Based on your weight ({userWeight}kg)
                </p>
              )}
            </div>
          </div>

          {/* WHO Recommendation Info */}
          <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg border border-blue-100 dark:border-blue-800">
            <p className="text-base font-semibold text-blue-800 dark:text-white">WHO Recommendation</p>
            <p className="text-sm text-gray-700 dark:text-gray-100 mt-2 leading-relaxed">
              The World Health Organization recommends drinking 30ml of water per kilogram of body weight daily.
              {userWeight ? (
                <span className="block mt-1 font-medium text-blue-700 dark:text-blue-200">
                  Based on your weight of {userWeight}kg, your recommended intake is {dailyGoal}ml.
                </span>
              ) : (
                " Update your weight in Personal Details for a personalized recommendation."
              )}
            </p>
          </div>

          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm font-medium">
              <span className="text-gray-800 dark:text-gray-100">Progress</span>
              <span className="text-gray-800 dark:text-gray-100">{Math.round((currentIntake / dailyGoal) * 100)}%</span>
            </div>
            <div className="h-2 bg-blue-100 dark:bg-blue-900/50 rounded-full overflow-hidden border border-blue-200 dark:border-blue-800">
              <div 
                className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full transition-all duration-300"
                style={{ width: `${Math.min((currentIntake / dailyGoal) * 100, 100)}%` }}
              />
            </div>
          </div>

          {/* Reset Button and functionality update */}
          <div className="flex justify-end">
            <Button
              variant="outline"
              onClick={() => {
                // Add a final point showing zero intake
                const resetLog = {
                  time: new Date().toISOString(),
                  amount: -currentIntake,
                  type: 'reset'
                };
                onUpdate(-currentIntake, resetLog);
              }}
              className="text-red-600 dark:text-red-400 border-red-200 dark:border-red-800 hover:bg-red-50 dark:hover:bg-red-900/30"
            >
              Reset Today's Intake
            </Button>
          </div>

          {/* Quick Add Buttons */}
          <div className="space-y-2">
            <Label className="text-base font-semibold text-gray-800 dark:text-white">Quick Add/Remove</Label>
            <div className="grid grid-cols-2 gap-2">
              {quickAddOptions.map((amount) => (
                <div key={amount} className="flex gap-2">
                  <Button
                    variant="outline"
                    onClick={() => handleQuickAdd(amount, true)}
                    className="flex-1 bg-blue-50 hover:bg-blue-100 dark:bg-blue-900/30 dark:hover:bg-blue-900/50 border-blue-200 dark:border-blue-700 text-gray-800 dark:text-white"
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    {amount >= 1000 ? `${amount/1000}L` : `${amount}ml`}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => handleQuickAdd(amount, false)}
                    className="flex-1 bg-red-50 hover:bg-red-100 dark:bg-red-900/30 dark:hover:bg-red-900/50 border-red-200 dark:border-red-700 text-gray-800 dark:text-white"
                    disabled={currentIntake < amount}
                  >
                    <Minus className="h-4 w-4 mr-1" />
                    {amount >= 1000 ? `${amount/1000}L` : `${amount}ml`}
                  </Button>
                </div>
              ))}
            </div>
          </div>

          {/* Custom Input */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700 dark:text-gray-200">Custom Amount</Label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Input
                  type="number"
                  placeholder="Enter amount"
                  value={customAmount}
                  onChange={(e) => setCustomAmount(e.target.value)}
                  className="pr-12 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder:text-gray-500 dark:placeholder:text-gray-400 border-gray-200 dark:border-gray-700"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500 dark:text-gray-400">ml</span>
              </div>
              <Button 
                onClick={() => handleCustomAmountSubmit('add')}
                disabled={!customAmount}
                className="bg-blue-600 hover:bg-blue-700 text-white dark:text-white"
              >
                <Plus className="h-4 w-4 mr-1" />
                Add
              </Button>
              <Button 
                onClick={() => handleCustomAmountSubmit('subtract')}
                disabled={!customAmount || parseInt(customAmount) > currentIntake}
                className="bg-red-600 hover:bg-red-700 text-white dark:text-white"
              >
                <Minus className="h-4 w-4 mr-1" />
                Remove
              </Button>
            </div>
          </div>

          {/* Intake History Chart */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700 dark:text-gray-200">Today's Intake History</Label>
            <div className="h-[200px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart 
                  data={intakeLogs.reduce((acc: any[], log: any) => {
                    // Skip if there's a matching add/remove pair
                    const matchingOpposite = intakeLogs.find(
                      (l: any) => 
                        Math.abs(l.amount) === Math.abs(log.amount) && 
                        l.type !== log.type &&
                        Math.abs(new Date(l.time).getTime() - new Date(log.time).getTime()) < 60000 // Within 1 minute
                    );
                    if (matchingOpposite && log.type === 'add') return acc;

                    // Calculate cumulative intake
                    const lastTotal = acc.length > 0 ? acc[acc.length - 1].total : 0;
                    let newTotal = lastTotal;

                    // Handle reset
                    if (log.type === 'reset') {
                      newTotal = 0;
                    } else {
                      newTotal = lastTotal + log.amount;
                    }

                    return [...acc, {
                      time: log.time,
                      total: newTotal,
                      amount: log.amount,
                      type: log.type
                    }];
                  }, [])
                  } 
                  margin={{ top: 10, right: 10, left: 10, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.1} />
                  <XAxis 
                    dataKey="time" 
                    tick={{ fontSize: 12, fill: "#6B7280" }}
                    tickFormatter={(time) => format(new Date(time), 'HH:mm')}
                    stroke="#6B7280"
                  />
                  <YAxis 
                    tick={{ fontSize: 12, fill: "#6B7280" }}
                    tickFormatter={(value) => `${value}ml`}
                    stroke="#6B7280"
                  />
                  <Tooltip
                    contentStyle={{ 
                      backgroundColor: 'rgba(255, 255, 255, 0.95)',
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                      fontSize: '12px',
                      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                    }}
                    labelFormatter={(time) => format(new Date(time), 'HH:mm')}
                    formatter={(value: any, name: string, props: any) => [
                      `${value}ml`,
                      props.payload.type === 'reset' ? 'Reset' : (name === 'total' ? 'Total Intake' : (value > 0 ? 'Added' : 'Removed'))
                    ]}
                  />
                  <Line 
                    type="stepAfter"
                    dataKey="total"
                    stroke="#38bdf8"
                    strokeWidth={2}
                    dot={{ fill: '#38bdf8', r: 4 }}
                    activeDot={{ r: 6, fill: '#0284c7' }}
                    name="total"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default WaterIntakeModal; 