import React from 'react';
import ReactDOM from 'react-dom';
import MessageCard from './index';
import {EmptyChatMessageAfterReturn} from 'models/ChatMessage';

it('renders without crashing', () => {
    const div = document.createElement('div');
    const mockUser = 'mockUser';
    ReactDOM.render(<MessageCard  currentUser={mockUser} message={EmptyChatMessageAfterReturn}/>, div);
    ReactDOM.unmountComponentAtNode(div);
});
