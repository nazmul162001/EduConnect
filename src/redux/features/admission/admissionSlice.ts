import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Admission {
  id: string;
  studentName: string;
  email: string;
  phone: string;
  course: string;
  status: "pending" | "approved" | "rejected";
  applicationDate: string;
}

interface AdmissionState {
  admissions: Admission[];
  loading: boolean;
  error: string | null;
}

const initialState: AdmissionState = {
  admissions: [],
  loading: false,
  error: null,
};

const admissionSlice = createSlice({
  name: "admission",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setAdmissions: (state, action: PayloadAction<Admission[]>) => {
      state.admissions = action.payload;
    },
    addAdmission: (state, action: PayloadAction<Admission>) => {
      state.admissions.push(action.payload);
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
  },
});

export const {
  setLoading,
  setError,
  setAdmissions,
  addAdmission,
  updateAdmission,
  removeAdmission,
} = admissionSlice.actions;

export default admissionSlice.reducer;
