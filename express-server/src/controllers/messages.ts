import { Response, Request, } from 'express';
import app from '../app';

export const newMessage = (req: Request, res: Response): void => {
    const io = app.get('io');
    io.emit('new_message', req.body);
    res.sendStatus(200);
};

