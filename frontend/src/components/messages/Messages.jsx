import useGetMessages from "../../hooks/useGetMessages";
import Message from "./Message";
import MessageSkeleton from "../skeletons/MessageSkeleton";
import { useEffect , useRef} from "react";
import useListenMessages from "../../hooks/useListenMessages";

const Messages = () => {
	const {messages,loading} = useGetMessages();
	useListenMessages();  //immediately listen due to socket io
	// console.log("messages:" , messages);
	const lastMessageRef = useRef();

	useEffect(() => {
		setTimeout(() => {
			lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
		}, 100);
	}, [messages]);

	return (
		<div className='px-4 flex-1 overflow-auto'>

   {!loading && messages.length > 0 && messages.map((message) => (
					<div key={message._id} ref={lastMessageRef}>
						<Message message={message} />
					</div>
				))}

		{loading && [...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />)}

		{!loading && messages.length === 0 && (
				<p className='text-center'>Send a message to start the conversation</p>
		)}

		</div>
	);
};
export default Messages;


//earlier
// import Message from "./Message";

// const Messages = () => {
// 	return (
// 		<div className='px-4 flex-1 overflow-auto'>
// 			<Message />
// 			<Message />
// 			<Message />
// 			<Message />
// 			<Message />
// 			<Message />
// 			<Message />
// 			<Message />
// 			<Message />
// 			<Message />
// 			<Message />
// 			<Message />
// 		</div>
// 	);
// };
// export default Messages;