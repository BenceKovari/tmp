import "./RightPane.less"
import { useState } from "preact/hooks";
import { TextInputAndButton } from "./TextInputAndButton";
import { chatService, ConversationDto } from "./ClientService";
import { MessageCard } from "./MessageCard";

export function RightPane( { conversation }: { conversation?: ConversationDto } )
{
	let [ message, setMessage ] = useState( "" );

	return <div class="RightPane">
		{ !!conversation && <>
			<div class="conversation-header">
				<p>{ conversation.name }</p>
			</div>
			<div class="messages">
				{ conversation.lastMessages.map( x =>
					<MessageCard key={ x.timeStamp } message={ x } own={ x.senderId === chatService.inbox.user.id } /> ) }
			</div>
			<TextInputAndButton value={ message } onChange={ setMessage }
				buttonContent="Send" placeholder="Write a message..." onClick={ () =>
				{
					chatService.send( { type: "message", channelId: conversation.channelId, referenceTo: 0, contentType: 0, content: message } );
					setMessage( "" );
				} }
/>
		</> }
	</div>
}
