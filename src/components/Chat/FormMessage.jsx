import React, { useState, useContext, useEffect } from "react";
import firebase from "firebase/app";
import "firebase/firestore";
import AuthContext from "../../contexts/auth-context";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import ClothingListPopup from "./ClothingListPopup";
import useHttp from "../../hooks/use-http";
import InputEmoji from "react-input-emoji";
const FormMessage = (props) => {
	const ctx = useContext(AuthContext);
	const { onSubmit, receiverUserId } = props;
	const [message, setMessage] = useState("");
	const { isLoading, error, sendRequest } = useHttp();

	const sendMessage = async (e) => {
		e.preventDefault();
		const { userId, photoURL } = ctx.user;
		const msg = {
			text: message,
			createdAt: firebase.firestore.FieldValue.serverTimestamp(),
			senderUserId: userId,
			receiverUserId: receiverUserId,
			photoURL,
			roomOwnersArray: [receiverUserId, userId],
			roomOwnersString: receiverUserId < userId ? receiverUserId + userId : userId + receiverUserId,
			isAttachment: false,
			attachmentUrl: "",
		};
		onSubmit(msg);
		setMessage("");
	};

	const attachImage = async (imageUrl) => {
		console.log("attach image jalan");
		console.log(imageUrl);
		const { userId, photoURL } = ctx.user;
		const msg = {
			text: "",
			createdAt: firebase.firestore.FieldValue.serverTimestamp(),
			senderUserId: userId,
			receiverUserId: receiverUserId,
			photoURL,
			roomOwnersArray: [receiverUserId, userId],
			roomOwnersString: receiverUserId < userId ? receiverUserId + userId : userId + receiverUserId,
			isAttachment: true,
			attachmentUrl: imageUrl,
		};
		onSubmit(msg);
		setMessage("");
	};

	const clickSendAttachmentHandler = (e) => {
		e.preventDefault();
		const userId = ctx.user.userId;
		sendRequest({ url: `clothing/${userId}` }, (returnData) => {
			confirmAlert({
				customUI: ({ onClose }) => {
					return (
						<div className='alert flex flex-col items-center px-8 py-2 space-y-4 border-2  rounded-lg border-red-500 bg-white'>
							<h1 className='alert__title'>Choose the clothing you want to send</h1>
							{/* <p className='alert__body'>You want to delete this clothing?</p> */}
							<div className='flex flex-col justify-between space-x-4'>
								<ClothingListPopup
									userId={userId}
									clothingList={returnData}
									onSelect={async (imageUrl) => {
										await attachImage(imageUrl);
										onClose();
									}}></ClothingListPopup>
								<button onClick={onClose} className='bg-red-500 text-white py-2 px-4 rounded hover:bg-red-300'>
									Cancel
								</button>
							</div>
						</div>
					);
				},
			});
		});
	};

	const submitForm = (e) => {
		document.getElementById("btnSubmit").click();
	};

	return (
		<div>
			<form onSubmit={sendMessage} className='flex space-x-2 rounded-3xl  bg-white pt-4 pb-2 pl-6 pr-2 items-center' id='formMessage'>
				{/* <input
					value={message}
					onChange={(e) => setMessage(e.target.value)}
					placeholder="What's on your mind"
					className='w-full border-0 outline-none border-b'
				/> */}
				<InputEmoji
					value={message}
					onChange={setMessage}
					className='w-full border-0 outline-none border-b'
					cleanOnEnter
					onEnter={submitForm}
					placeholder='Type a message'
				/>

				<button type='button' className='w-10' onClick={clickSendAttachmentHandler}>
					<svg xmlns='http://www.w3.org/2000/svg' className='h-6 w-6' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
						<path
							strokeLinecap='round'
							strokeLinejoin='round'
							strokeWidth={2}
							d='M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z'
						/>
					</svg>
				</button>
				<button type='submit' disabled={!message} className='w-10 pr-2' id='btnSubmit'>
					<svg xmlns='http://www.w3.org/2000/svg' className='h-6 w-6' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
						<path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6' />
					</svg>
				</button>
			</form>
		</div>
	);
};

export default FormMessage;
