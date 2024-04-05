import React, { useEffect, useRef, useState } from 'react';
// import gsap from 'gsap';
import { useAuth } from '../../Providers/AuthContext';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Button from '../../Composants/Reusable/Button';

const Login = (props) => {
  const formRef = useRef(null);
  const navigate = useNavigate();
  // useEffect(() => {
  //   const tl = gsap.timeline();
  //   tl.from(formRef.current, { duration: 1, y: 100, opacity: 0, ease: "power3.out" });
  // }, []);
  const { login } = useAuth();
  const { register, control, handleSubmit, watch, formState: { errors } } = useForm({ criteriaMode: "all" });
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div ref={formRef} className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Se connecter
          </h2>
        </div>
        <div className="mt-8 space-y-6">
          <input type="hidden" name="remember" value="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">
                Adresse e-mail
              </label>
              {errors.email && <p className="text-red-500 text-xs italic">{errors.email.message}</p>}
              <input
                id="email-address"
                name="email"
                type="text"
                autoComplete="email"
                className={`appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-gray-500 focus:border-gray-500 focus:z-10 sm:text-sm ${errors.email && '!border-2 !border-red-500'} `}
                placeholder="Adresse e-mail"
                {...register('email', {
                  required: 'Email is required',
                  validate: {
                    noSpace: value => /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])*$/.test(value) !== false || 'Invalid Email',
                  }
                })}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Mot de passe
              </label>
              {errors.password && <p className="text-red-500 text-xs italic">{errors.password.message}</p>}
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className={`appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-gray-500 focus:border-gray-500 focus:z-10 sm:text-sm  ${errors.email && '!border-2 !border-red-500'} `}
                placeholder="Mot de passe"
                {...register('password', {
                  required: 'Password must be specified',
                  validate: {
                    // hasCaps: value => /[A-Z]+/.test(value) || 'Password must contain uppercase',
                    // hasMin: value => /[a-z]+/.test(value) || 'Password must contain lowercase',
                    // hasNumber: value => /[0-9]+/.test(value) || 'Password must contain number',
                    // noSpace: value => /[\s]+/.test(value) === false || 'Password must not contain space',
                    // sameAsPassword: value => value === watch('password') || "Password doesn\'t match"
                  },
                  maxLength: { value: 20, message: 'Password must be between 8 and 20 characters' },
                  minLength: { value: 1, message: 'Password must be between 8 and 20 characters' }
                })}
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                style={{ accentColor: "red" }}
                id="remember_me"
                name="remember_me"
                type="checkbox"
                className="h-4 w-4 text-indigo-600 focus:ring-gray-500 border-gray-300 rounded"
              />
              <label htmlFor="remember_me" className="ml-2 block text-sm text-gray-900">
                Se souvenir de moi
              </label>
            </div>

            <div className="text-sm">
              <a href="#" style={{ color: "red" }} className="font-medium hover:text-indigo-500">
                Mot de passe oublié ?
              </a>
            </div>
          </div>

          <div className='w-full'>
            <Button text='Se connecter' color={"red"} mode='contained' onClick={handleSubmit(async (data) => {
              let { email, password } = data;
              await login({ email, password }).then(() => navigate('/')).catch(err => console.error(err));
            })} />
            {/* <button
              onClick={handleSubmit(async (data) => {
                let { email, password } = data;
                await login({ email, password }).then(() => navigate('/')).catch(err => console.error(err));
              })}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Se connecter
            </button> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
