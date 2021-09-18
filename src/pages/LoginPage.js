import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getUser } from '../redux/actions/user.actions';

import LoginForm from '../components/LoginForm';
import crediblyLogo from '../assets/images/credibly-logo.png';
import FullPageLoading from '../components/FullPageLoading';

export default function LoginPage() {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);

  useEffect(() => {
    dispatch(getUser());
  }, []);

  if (user.loading) {
    return <FullPageLoading />
  }

  return (
    <div className="flex flex-col justify-center min-h-screen py-12 bg-gray-100 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <img className="w-auto h-12 mx-auto" src={crediblyLogo} alt="Credibly" />
        <h2 className="mt-6 text-3xl font-extrabold text-center text-gray-900 leading-9">
          Sign in to your account
        </h2>
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <LoginForm />
      </div>
    </div>
  )
}