import React from 'react';
import MessageList from '../containers/MessageList';
import UserAside from './UserAside';

export const MessageTimeline = props => {
    return (
        <div className='row'>
            <UserAside 
                profileImageUrl={props.profileImageUrl}
                username={props.username}
            />
            <MessageList />
        </div>
    )
}

export default MessageTimeline;