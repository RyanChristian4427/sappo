import React from 'react';
import ReactDOM from 'react-dom';
import HeroHeader from './index';

it('renders without crashing', () => {
    const div = document.createElement('div');
    const mockHandleModal = (): void => {};
    ReactDOM.render(<HeroHeader  currentUser="mockUser" handleModal={mockHandleModal}/>, div);
    ReactDOM.unmountComponentAtNode(div);
});
