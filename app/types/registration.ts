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
  semester: number | null;
  skills: string[];
  equipment: EquipmentItem[];
  portion: PortionItem | '';
  specialItem: SpecialItem | '';
  timestamp: string;
}

export type EquipmentItem = 'armor' | 'mask' | 'sowrd' | 'sheild';
export type PortionItem = 'Pcontrol' | 'Pimmortality' | 'Pinvisibility';
export type SpecialItem = 'Sdragon' | 'Switch_hat' | 'Sspellbook';

export type Skill = 'cp' | 'decor' | 'game_dev' | 'media' | 'pr' | 'web_dev' | 'content' | 'None';

export const ALL_SKILLS: Skill[] = ['cp', 'decor', 'game_dev', 'media', 'pr', 'web_dev', 'content', 'None'];

export interface FormStepProps {
  formData: RegistrationData;
  updateFormData: (data: Partial<RegistrationData>) => void;
  nextStep: () => void;
  prevStep: () => void;
  gotoStep?: (step: number) => void;
  isSubmitting?: boolean;
}
