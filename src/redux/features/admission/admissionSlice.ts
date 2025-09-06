import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface College {
  id: string;
  name: string;
  description: string;
  image: string;
  location: string;
  rating: number;
  website?: string;
  email?: string;
  phone?: string;
}

export interface Admission {
  id: string;
  studentName: string;
  email: string;
  phone: string;
  course: string;
  dateOfBirth?: string;
  profileImage?: string;
  address?: string;
  status: "PENDING" | "APPROVED" | "REJECTED" | "WAITLISTED";
  applicationDate: string;
  collegeId: string;
  college?: College;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateAdmissionRequest {
  collegeId: string;
  studentName: string;
  course: string;
  email: string;
  phone: string;
  dateOfBirth?: string;
  profileImage?: string;
  address?: string;
}

export interface AdmissionResponse {
  success: boolean;
  message: string;
  admission: Admission;
}

export interface GetAdmissionsResponse {
  success: boolean;
  admissions: Admission[];
}

interface AdmissionState {
  admissions: Admission[];
  isLoading: boolean;
  error: string | null;
}

const initialState: AdmissionState = {
  admissions: [],
  isLoading: false,
  error: null,
};

const admissionSlice = createSlice({
  name: "admission",
  initialState,
  reducers: {
    setAdmissions: (state, action: PayloadAction<Admission[]>) => {
      state.admissions = action.payload;
    },
    addAdmission: (state, action: PayloadAction<Admission>) => {
      state.admissions.unshift(action.payload);
    },
    updateAdmission: (state, action: PayloadAction<Admission>) => {
      const index = state.admissions.findIndex(
        (admission) => admission.id === action.payload.id
      );
      if (index !== -1) {
        state.admissions[index] = action.payload;
      }
    },
    removeAdmission: (state, action: PayloadAction<string>) => {
      state.admissions = state.admissions.filter(
        (admission) => admission.id !== action.payload
      );
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const {
  setAdmissions,
  addAdmission,
  updateAdmission,
  removeAdmission,
  setLoading,
  setError,
  clearError,
} = admissionSlice.actions;

export default admissionSlice.reducer;
