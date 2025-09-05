import { useGetCurrentUserQuery } from "@/redux/features/auth/authApi";
import {
  clearAuth,
  setLoading,
  setUser,
} from "@/redux/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useEffect, useRef } from "react";

export function useAuth() {
  const dispatch = useAppDispatch();
  const { user, isAuthenticated, isLoading } = useAppSelector(
    (state) => state.root.auth
  );
  const hasInitialized = useRef(false);

  const {
    data,
    error,
    isLoading: queryLoading,
  } = useGetCurrentUserQuery(undefined, {
    skip: false, // Always try to get current user
  });

  useEffect(() => {
    if (data?.user) {
      dispatch(setUser(data.user));
      hasInitialized.current = true;
    } else if (error) {
      dispatch(clearAuth());
      hasInitialized.current = true;
    }
    dispatch(setLoading(queryLoading));
  }, [data, error, queryLoading, dispatch]);

  return {
    user,
    isAuthenticated,
    isLoading,
  };
}
