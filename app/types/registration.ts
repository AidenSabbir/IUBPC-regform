export type RegistrationStep = 
  | 'START'
  | 'GENDER'
  | 'PERSONAL'
  | 'ACADEMIC'
  | 'SKILLS'
  | 'REVIEW'
  | 'SUCCESS';

export interface RegistrationData {
  gender: 'male' | 'female' | '';
  studentId: string;
  name: string;
  email: string;
  phone: string;
  facebook: string;
  major: string;
  year: string;
  semester: string;
  skills: string[];
  timestamp: string;
}

export type Skill = 'cp' | 'decor' | 'game_dev' | 'media' | 'pr' | 'web_dev' | 'None';

export const ALL_SKILLS: Skill[] = ['cp', 'decor', 'game_dev', 'media', 'pr', 'web_dev', 'None'];

export interface FormStepProps {
  formData: RegistrationData;
  updateFormData: (data: Partial<RegistrationData>) => void;
  nextStep: () => void;
  prevStep: () => void;
  gotoStep?: (step: number) => void;
  isSubmitting?: boolean;
}
