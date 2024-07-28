import useGetConversations from "../../hooks/useGetConversations";
import { getRandomEmoji } from "../../utils/emojis";
import Conversation from "./Conversation";

const Conversations = () => {
     
	const {loading,conversations} = useGetConversations();  //we create a hook to fetch these conversations from the db

	return (
		<div className='py-2 flex flex-col overflow-auto'>

			{conversations.map((conversation,idx) => (
				<Conversation 
				key={conversation._id}
				conversation={conversation}
				emoji={getRandomEmoji()}
			    lastIdx={idx === conversations.length-1}//for the last index we are not gonna show the divider
				/>
			))}
			{loading ? <span className='loading loading-spinner mx-auto'></span> : null}
		</div>
	);
};
export default Conversations;


//earlier
// import Conversation from "./Conversation";

// const Conversations = () => {
// 	return (
// 		<div className='py-2 flex flex-col overflow-auto'>
// 			<Conversation />
// 			<Conversation />
// 			<Conversation />
// 			<Conversation />
// 			<Conversation />
// 			<Conversation />
// 		</div>
// 	);
// };
// export default Conversations;