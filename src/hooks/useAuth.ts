import { useGetCurrentUserQuery } from "@/redux/features/auth/authApi";
import {
  clearAuth,
  setLoading,
  setUser,
} from "@/redux/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useEffect } from "react";

export function useAuth() {
  const dispatch = useAppDispatch();
  const { user, isAuthenticated, isLoading } = useAppSelector(
    (state) => state.root.auth
  );

  const {
    data,
    error,
    isLoading: queryLoading,
  } = useGetCurrentUserQuery(undefined, {
    skip: false, // Always try to get current user on mount
  });

  useEffect(() => {
    if (data?.user) {
      dispatch(setUser(data.user));
    } else if (error) {
      dispatch(clearAuth());
    }
    dispatch(setLoading(queryLoading));
  }, [data, error, queryLoading, dispatch]);

  return {
    user,
    isAuthenticated,
    isLoading,
  };
}
