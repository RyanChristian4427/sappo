import React from 'react';
import ReactDOM from 'react-dom';
import DetailsModal from './DetailsModal';

it('renders without crashing', () => {
    const div = document.createElement('div');
    const mockHandleDetailsChange = (): void => {};
    ReactDOM.render(<DetailsModal handleDetailsChange={mockHandleDetailsChange}/>, div);
    ReactDOM.unmountComponentAtNode(div);
});
