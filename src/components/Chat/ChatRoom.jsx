import React, {
	Fragment,
	useState,
	useRef,
	useEffect,
	useContext,
} from 'react';
import FormMessage from './FormMessage';
import MessageItem from './MessageItem';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import AuthContext from '../../contexts/auth-context';
import useHttp from '../../hooks/use-http';
import CancelSvg from '../UI/CancelSvg';
const ChatRoom = (props) => {
	const ctx = useContext(AuthContext);
	const { isLoading, error, sendRequest } = useHttp();
	const { userId } = ctx.user;
	const { firestore, receiverUserId, onClose } = props;
	const [photoURL, setPhotoURL] = useState('');
	const [name, setName] = useState('');
	const dummy = useRef();

	const messagesRef = firestore.collection('messages');
	const query = messagesRef.where(
		'roomOwnersString',
		'==',
		receiverUserId < userId
			? receiverUserId + userId
			: userId + receiverUserId
	);
	const [messages] = useCollectionData(query, { idField: 'id' });

	const submitHandler = async (msg) => {
		await messagesRef.add(msg);
		setTimeout(() => {
			dummy.current.scrollIntoView({ behavior: 'smooth' });
		}, 100);
		// dummy.current.scrollIntoView({ behavior: "smooth" });
		// const objDiv = document.getElementById('chat-list-container');
		// objDiv.scrollTop = objDiv.scrollHeight + 500;
	};
	useEffect(() => {
		sendRequest(
			{
				url: `user/name-photo/${receiverUserId}`,
			},
			(result) => {
				setPhotoURL(result.photoURL ?? '');
				setName(result.name ?? '');
			}
		);
	}, []);
	return (
		<Fragment>
			{/* <div className=''>
				<CancelSvg
					onClick={() => {
						onClose();
					}}
				/>
			</div> */}

			<div className='flex flex-col justify-end pb-12 relative'>
				<div className='flex items-center space-x-4  mb-2'>
					<div className='w-10 h-10 rounded-full overflow-hidden'>
						<img src={photoURL} className='' />
					</div>
					<div className='text-semibold'>{name}</div>
				</div>

				<div>
					<hr className='border-gray-200' />
				</div>

				<div
					className='mt-4 overflow-y-scroll mb-6'
					style={{ height: '450px' }}
					id='chat-list-container'
				>
					{messages &&
						messages
							.sort((a, b) => a.createdAt - b.createdAt)
							.map((msg, idx) => (
								<MessageItem
									key={msg.id}
									message={msg}
									nextMessage={messages[idx + 1]}
								/>
							))}
					<span ref={dummy}></span>
				</div>
				<div className='pt-3 absolute bottom-2 right-auto left-auto w-full'>
					{
						<FormMessage
							onSubmit={submitHandler}
							receiverUserId={receiverUserId}
						/>
					}
				</div>
			</div>

			{/* <div>
				percakapan dengan
				<div className='flex mb-10'>
					<br />
					<div>
						<img src={photoURL} className='w-10 h-10' />
					</div>
					<div>{name}</div>
				</div>
				{messages && messages.sort((a, b) => a.createdAt - b.createdAt).map((msg) => <MessageItem key={msg.id} message={msg} />)}
				<span ref={dummy}></span>
				<div className='pt-3 mt-3'>{<FormMessage onSubmit={submitHandler} receiverUserId={receiverUserId} />}</div>
			</div> */}
		</Fragment>
	);
};

export default ChatRoom;
