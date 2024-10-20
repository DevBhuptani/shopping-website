import { registerAPI } from '@/services/auth/registerAPI';
import { STATUS_CODE } from '@/utils/constants/StatusCode';
import { handleFormikTrim } from '@/utils/functions/commonFunctions';
import { useFormik } from 'formik';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import toast from 'react-hot-toast';
import * as Yup from 'yup';

const RegisterPage = () => {
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Name is required'),
      email: Yup.string()
        .email('Email is invalid')
        .required('Email is required'),
      password: Yup.string().required('Password is required'),
    }),
    onSubmit: async (values) => {
      registerAPI(values)
        .then((response) => {
          if (response.status === STATUS_CODE.created) {
            router.push('/login');
            toast.success(response?.message);
          }
        })
        .catch((error) => {
          toast.error(error?.data?.message);
        });
    },
  });

  const { handleSubmit, setFieldValue, handleBlur, values, touched, errors } =
    formik;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-4 text-center">Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Name</label>
            <input
              type="name"
              name="name"
              id="name"
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                touched.name && errors.name ? 'border-red-500' : ''
              }`}
              placeholder="Enter your name"
              onChange={(e) =>
                handleFormikTrim(e.target.name, e.target.value, setFieldValue)
              }
              onBlur={handleBlur}
              value={values.name.trim()}
            />
            {touched.name && errors.name && (
              <div className="text-red-500 text-sm">{errors.name}</div>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                touched.email && errors.email ? 'border-red-500' : ''
              }`}
              placeholder="Enter your email"
              onChange={(e) =>
                handleFormikTrim(e.target.name, e.target.value, setFieldValue)
              }
              onBlur={handleBlur}
              value={values.email.toLowerCase().trim()}
            />
            {touched.email && errors.email && (
              <div className="text-red-500 text-sm">{errors.email}</div>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input
              name="password"
              id="password"
              type="password"
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                touched.password && errors.password ? 'border-red-500' : ''
              }`}
              placeholder="Enter your password"
              onChange={(e) =>
                handleFormikTrim(e.target.name, e.target.value, setFieldValue)
              }
              onBlur={handleBlur}
              value={values.password.trim()}
            />
            {touched.password && errors.password && (
              <div className="text-red-500 text-sm">{errors.password}</div>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-500 text-white py-2 px-4 rounded-lg hover:bg-indigo-600 transition duration-300"
          >
            Register
          </button>
        </form>

        <div className="mt-4 text-center">
          <p className="text-gray-600">
            Already have an account?
            <Link href="/login" className="text-indigo-500">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
