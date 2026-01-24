'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { RegistrationData } from '@/app/types/registration';
import StartScreen from './registration/StartScreen';
import GenderSelection from './registration/GenderSelection';
import PersonalInfo from './registration/PersonalInfo';
import AcademicInfo from './registration/AcademicInfo';
import SkillsSelection from './registration/SkillsSelection';
import InventorySelection from './registration/InventorySelection';
import CharacterShowcase from './registration/CharacterShowcase';
import ReviewSubmit from './registration/ReviewSubmit';
import SuccessScreen from './registration/SuccessScreen';
import EquipmentIcons from './ui/EquipmentIcons';
import AudioController from './ui/AudioController';

const STORAGE_KEY = 'iubpc-reg-data-v1';

const INITIAL_DATA: RegistrationData = {
  gender: '',
  studentId: '',
  name: '',
  email: '',
  phone: '',
  facebook: '',
  major: '',
  semester: '',
  skills: [],
  equipment: [],
  portion: '',
  specialItem: '',
  timestamp: ''
};

const RegistrationForm = () => {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState<RegistrationData>(INITIAL_DATA);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from local storage
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Merge with INITIAL_DATA to ensure new fields (like equipment, portion) exist
        setFormData({ ...INITIAL_DATA, ...parsed });
      } catch (e) {
        console.error('Failed to parse saved data');
      }
    }
    setIsLoaded(true);
  }, []);

  // Save to local storage
  useEffect(() => {
    if (isLoaded && step > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
    }
  }, [formData, isLoaded, step]);

  const updateFormData = (data: Partial<RegistrationData>) => {
    setFormData(prev => ({ ...prev, ...data }));
  };

  const nextStep = () => {
    if (step === 6) { // Review is now step 6
      submitForm();
    } else {
      setStep(prev => prev + 1);
      window.scrollTo(0, 0);
    }
  };

  const prevStep = () => {
    setStep(prev => prev - 1);
    window.scrollTo(0, 0);
  };

  const resetForm = () => {
    setFormData(INITIAL_DATA);
    setStep(0);
    localStorage.removeItem(STORAGE_KEY);
  };

  const submitForm = async () => {
    setIsSubmitting(true);
    try {
      // Exclude local-only fields (portion, specialItem) from API payload if needed
      // The API route validation will filter them out automatically via safeParse
      const response = await fetch('/api/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          timestamp: new Date().toLocaleString('en-US', {
            timeZone: 'Asia/Dhaka',
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: true
          })
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Submission failed');
      }

      setStep(7); // Go to Character Showcase instead of Success
      localStorage.removeItem(STORAGE_KEY);
    } catch (error: any) {
      alert(error.message || 'Failed to submit registration. Please try again.');
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isLoaded) return null; // Prevent hydration mismatch

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-4 md:p-8 relative">

      {/* Persistent Logo for steps > 0 */}
      {step > 0 && step < 8 && (
        <div className="absolute top-4 left-4 z-20 flex items-center gap-2">
          <div className="relative w-10 h-10 md:w-12 md:h-12">
            <Image
              src="/iubpc.png"
              alt="IUBPC Logo"
              fill
              className="object-contain"
            />
          </div>
          <span className="text-white text-[10px] md:text-xs hidden sm:block">
            IUBPC
          </span>
        </div>
      )}

      {/* Audio Controller */}
      <AudioController gameStarted={step > 0} />

      {/* Equipment Display - HIDDEN on Showcase (Step 7) */}
      {step > 0 && step < 7 && (
        <div className="absolute top-4 right-4 z-20">
          <EquipmentIcons 
            equipment={formData.equipment} 
            gender={formData.gender}
          />
        </div>
      )}

      {/* Content Area */}
      <div className="w-full max-w-5xl z-10 flex flex-col items-center">
        <div className="bg-transparent p-6 md:p-10 w-full max-w-2xl relative">

          <div className="relative z-10">
            {step === 0 && <StartScreen onStart={() => setStep(1)} />}

            {step === 1 && (
              <GenderSelection
                formData={formData}
                updateFormData={updateFormData}
                nextStep={nextStep}
                prevStep={prevStep}
              />
            )}

            {step === 2 && (
              <PersonalInfo
                formData={formData}
                updateFormData={updateFormData}
                nextStep={nextStep}
                prevStep={prevStep}
              />
            )}

            {step === 3 && (
              <AcademicInfo
                formData={formData}
                updateFormData={updateFormData}
                nextStep={nextStep}
                prevStep={prevStep}
              />
            )}

            {step === 4 && (
              <SkillsSelection
                formData={formData}
                updateFormData={updateFormData}
                nextStep={nextStep}
                prevStep={prevStep}
              />
            )}

            {step === 5 && (
              <InventorySelection
                formData={formData}
                updateFormData={updateFormData}
                nextStep={nextStep}
                prevStep={prevStep}
              />
            )}

            {step === 6 && (
              <ReviewSubmit
                formData={formData}
                updateFormData={updateFormData}
                nextStep={nextStep}
                prevStep={prevStep}
                isSubmitting={isSubmitting}
              />
            )}

            {step === 7 && (
              <CharacterShowcase
                formData={formData}
                nextStep={() => setStep(8)}
              />
            )}

            {step === 8 && (
              <SuccessScreen onReset={resetForm} />
            )}
          </div>
        </div>
      </div>

    </div>
  );
};

export default RegistrationForm;

