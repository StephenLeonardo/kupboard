import React, { useContext } from 'react';
import { facebookProvider, googleProvider, twitterProvider } from '../../configs/AuthMethod';

const LoginForm = (props) => {

	return (
		<div className='flex flex-col items-center justify-center space-y-5 flex-1 border-2 px-6 py-12 rounded-md shadow-xl'>
			<button
				className='p-2 border-2 border-gray-200 rounded-lg px-6 w-full bg-blue-700 text-gray-100 font-semibold text-right'
				onClick={() => props.loginHandler(facebookProvider)}
			>
				Log in with Facebook
			</button>
			<button
				className='p-2 border-2 border-gray-200 rounded-lg px-6 w-full bg-gray-100 text-gray-900 font-semibold text-right'
				onClick={() => props.loginHandler(googleProvider)}
			>
				Log in with Google
			</button>
			<button
				className='p-2 border-2 border-gray-200 rounded-lg px-6 w-full bg-blue-400 text-gray-200 font-semibold text-right'
				onClick={() => props.loginHandler(twitterProvider)}
			>
				Log in with Twitter
			</button>
		</div>
	);
};

export default LoginForm;
