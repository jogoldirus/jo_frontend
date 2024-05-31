import React, { useEffect, useRef, useState } from 'react';
// import gsap from 'gsap';
import { useAuth } from '../../Providers/AuthContext';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Button from '../../Composants/Reusable/Button';

const Register = (props) => {
  const formRef = useRef(null);
  const navigate = useNavigate();
  // useEffect(() => {
  //   const tl = gsap.timeline();
  //   tl.from(formRef.current, { duration: 1, y: 100, opacity: 0, ease: "power3.out" });
  // }, []);
  const { signup } = useAuth();
  const { register, control, handleSubmit, watch, formState: { errors } } = useForm({ criteriaMode: "all" });
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div ref={formRef} className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Inscription
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
                  required: "L'email est requis",
                  validate: {
                    noSpace: value => /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])*$/.test(value) !== false || 'Invalid Email',
                  }
                })}
              />
            </div>

            <div className='flex flex-row grow w-full '>
              <div className='grow'>
                <label htmlFor="name" className="sr-only">
                  Nom
                </label>
                {errors.name && <p className="text-red-500 text-xs italic">{errors.name.message}</p>}
                <input
                  id="name"
                  name="nom"
                  type="text"
                  autoComplete="name"
                  className={`appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-gray-500 focus:border-gray-500 focus:z-10 sm:text-sm ${errors.email && '!border-2 !border-red-500'} `}
                  placeholder="Nom"
                  {...register('name', {
                    required: 'Le nom est requis',
                  })}
                />
              </div>
              <div className='grow'>
                <label htmlFor="email-address" className="sr-only">
                  Prénom
                </label>
                {errors.forename && <p className="text-red-500 text-xs italic">{errors.forename.message}</p>}
                <input
                  id="forename"
                  name="forename"
                  type="text"
                  autoComplete="forename"
                  className={`appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-gray-500 focus:border-gray-500 focus:z-10 sm:text-sm ${errors.email && '!border-2 !border-red-500'} `}
                  placeholder="Prénom"
                  {...register('forename', {
                    required: 'Le prénom est requis',
                  })}
                />
              </div>

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
                className={`appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-gray-500 focus:border-gray-500 focus:z-10 sm:text-sm  ${errors.email && '!border-2 !border-red-500'} `}
                placeholder="Mot de passe"
                {...register('password', {
                  required: 'Le mot de passe doit être spécifié',
                  validate: {
                    hasCaps: value => /[A-Z]+/.test(value) || 'Minimum 1 majuscule',
                    hasNumber: value => /[0-9]+/.test(value) || 'Minimum 1 chiffre',
                    noSpace: value => /[\s]+/.test(value) === false || 'Pas d\'espace dans le mot de passe',
                    sameAsPassword: value => value === watch('password') || "Les mots de passe ne correspondent pas"
                  },
                  maxLength: { value: 20, message: 'Doit faire entre 8 et 20 charactères' },
                  minLength: { value: 1, message: 'Doit faire entre 8 et 20 charactères' }
                })}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Confirmation de mot de passe
              </label>
              {errors.cpassword && <p className="text-red-500 text-xs italic">{errors.cpassword.message}</p>}
              <input
                id="cpassword"
                name="cpassword"
                type="password"
                autoComplete="current-password"
                required
                className={`appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-gray-500 focus:border-gray-500 focus:z-10 sm:text-sm  ${errors.email && '!border-2 !border-red-500'} `}
                placeholder="Confirmation de mot de passe"
                {...register('cpassword', {
                  required: 'Le mot de passe de confirmation doit être spécifié',
                  validate: {
                    hasCaps: value => /[A-Z]+/.test(value) || 'Minimum 1 majuscule',
                    hasNumber: value => /[0-9]+/.test(value) || 'Minimum 1 chiffre',
                    noSpace: value => /[\s]+/.test(value) === false || 'Pas d\'espace dans le mot de passe',
                    sameAsPassword: value => value === watch('password') || "Les mots de passe ne correspondent pas"
                  },
                  maxLength: { value: 20, message: 'Doit faire entre 8 et 20 charactères' },
                  minLength: { value: 1, message: 'Doit faire entre 8 et 20 charactères' }
                })}
              />
            </div>

          </div>


          <div className='w-full'>
            <Button text="S'inscrire" color={"red"} mode='contained' onClick={handleSubmit(async (data) => {
              let { email, password, cpassword, name, forename } = data;
              await signup({ email, password, confirmpassword: cpassword, name, forename }).then(() => navigate('/')).catch(err => console.error(err));
            })} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
