import { Response, Request, NextFunction } from 'express';
import app from '../app';
import {ChatMessage, Message} from '../models/Message';

export const postMessage = (req: Request, res: Response, next: NextFunction): void => {
    const messageData: ChatMessage = req.body;

    const message = new Message({
        username: messageData.username,
        text: messageData.text,
        datetimestamp: messageData.datetimestamp,
        abundance: messageData.abundance,
        coordinates: messageData.coordinates,
        species: messageData.species,
        temperature: messageData.temperature,
        file: messageData.file,
    });

    message.save((err) => {
        if (err) {
            res.sendStatus(500);
            return next(err);
        } else {
            const io = app.get('io');
            // Test breaks otherwise
            if (io !== undefined) {
                io.emit('new_message', req.body);
            }
            res.sendStatus(200);
        }
    });
};

export const getMessages = (req: Request, res: Response): void => {
    Message.find({}, function(err, messages) {
        res.json(messages);
    });
};

