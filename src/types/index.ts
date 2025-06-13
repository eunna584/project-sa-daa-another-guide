export interface Student {
  id: string;
  fullName: string;
  applicationId: string;
  address: string;
  schoolAttended: string;
  grades: number;
  entranceExamScore: number;
  householdIncome: number;
  proximityToSchool: number;
  parentGuardianNames: string;
  submissionDate: string;
  status: 'pending' | 'approved' | 'waitlisted' | 'rejected';
  profileImage?: string;
}

export interface SlotData {
  totalSlots: number;
  filledSlots: number;
  availableSlots: number;
  studentsApproved: number;
  pendingApplications: number;
  waitlistedApplications: number;
  rejectedApplications: number;
}