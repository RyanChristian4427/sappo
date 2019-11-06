import { Response, Request, } from 'express';
import app from '../app';

/**
 * GET /api
 * List of API examples.
 */
export const newMessage = (req: Request, res: Response): void => {
    const io = app.get('io');
    io.emit('new_message', req.body);
};

