import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Form } from 'react-final-form';

import { TextField } from './Fields';
import ErrorAlert from './ErrorAlert';

import { loginUser } from '../redux/actions/user.actions';

export default function LoginForm() {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);

  async function onSubmit(values) {
    dispatch(loginUser(values.email, values.password));
  }

  if (user.loggedIn) {
    return <Redirect to="/home" />
  }

  return (
    <div className="px-4 py-8 bg-white shadow sm:rounded-lg sm:px-10">
      <Form
        onSubmit={onSubmit}
        initialValues={{ email: '', password: '' }}
        validate={values => {
          const errors = {}
          if (!values.email) {
            errors.email = 'Required'
          }
          if (!values.password) {
            errors.password = 'Required'
          }
          return errors
        }}
        render={({ handleSubmit, submitting, pristine }) => (
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 leading-5">
                Email address
              </label>
              <TextField name="email" type="email" />
            </div>
            <div className="mt-6">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 leading-5">
                Password
              </label>
              <TextField name="password" type="password" />
            </div>
            <div className="items-center justify-between mt-6">
              {user.error && <ErrorAlert title="There was an error" error={user.error} />}
            </div>
            <div className="mt-6">
              <span className="block w-full rounded-md shadow-sm">
                <button
                  type="submit"
                  disabled={submitting || pristine}
                  className="flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-orange-600 border border-transparent transition duration-150 ease-in-out rounded-md hover:bg-orange-500 focus:outline-none focus:border-orange-700 focus:shadow-outline-orange active:bg-orange-700">
                  Sign in
                </button>
              </span>
            </div>
          </form>
        )}
      />
    </div>
  )
}