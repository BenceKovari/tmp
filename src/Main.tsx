
import "./Main.less"
import { LeftPane } from "./LeftPane";
import { RightPane } from "./RightPane";
import { useEffect, useState } from "preact/hooks";
import { chatService, ConversationDto } from "./ClientService";

export function Main()
{
	    let [ selected, setSelected ] = useState<ConversationDto>();

    return <div class="Main">
        <LeftPane selected={ selected } onSelect={ setSelected } />
        <RightPane conversation={ selected } />
    </div>

}
