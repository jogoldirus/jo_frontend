import React, { useState, createContext, useContext, useEffect } from "react";
import { useMutation, useQuery, useQueryClient, QueryClientProvider } from '@tanstack/react-query';
import LoadingScreen from "../Composants/Reusable/LoadingScreen";
import { fetchWithAuth } from "../Functions";
const AuthContext = createContext();
const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const [isLogged, setIsLogged] = useState(false);
  const [userPayload, setUserPayload] = useState({});
  const queryClient = useQueryClient();

  // Login Mutation
  const loginMutation = useMutation({
    mutationFn: async ({ email, password }) => {
      const response = await fetch("/apiV2/auth/login", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (!data.token) throw new Error('No token in response, login failed');
      localStorage.setItem('token', data.token);
      setUserPayload(data.payload);
      setIsLogged(true);
      return data;
    }
  });

  // Signup Mutation
  const signupMutation = useMutation({
    mutationFn: async ({ email, password, confirmpassword }) => {
      const response = await fetch(`/apiV2/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password, confirmPassword: confirmpassword }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error('Signup request failed');
      setIsLogged(true);
      setUserPayload(data.payload);
      return response.json();
    }
  });

  // Verify Token Query
  const { isLoading } = useQuery({
    queryKey: ['verifyToken'],
    queryFn: async () => {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('No token in localStorage');

      if (isLogged) return Promise.resolve({});

      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };

      return await fetchWithAuth("/apiV2/auth/verifyToken", { config, method: 'POST' })
        .then(async result => {
          setIsLogged(true);
          setUserPayload(result.result);
          return Promise.resolve({})
        })
        .catch(async error => {
          // console.log(error);
          return Promise.reject(error)
        });
    },
    onError: (error) => {
      console.error(error);
      setIsLogged(false);
      localStorage.removeItem('token');
    },
    onSettled: () => {
      queryClient.invalidateQueries(['verifyToken']);
    },
    retry: false, // Dépend de vos préférences
    enabled: !!localStorage.getItem('token') // Exécute la requête uniquement si le token existe
  });


  const logout = () => {
    localStorage.removeItem('token');
    setIsLogged(false);
    setUserPayload({});
    queryClient.invalidateQueries(['verifyToken']);
  };
  if (isLoading) return <LoadingScreen />;

  return (
    <AuthContext.Provider value={{ userPayload, isLogged, login: loginMutation.mutateAsync, signup: signupMutation.mutateAsync, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, useAuth };
