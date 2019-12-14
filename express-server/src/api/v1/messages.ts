import { Response, Request, Router } from 'express';

import {socket} from 'src/app';
import {ChatMessage, Message} from 'src/models/Message';

const router = Router();

router.post('/message', (req: Request, res: Response): void => {
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

    message.save()
        .then(() => {
            socket.alertNewMessage(messageData);
            res.status(204).send();
        })
        .catch((err) => {
            res.status(500).json({
                success: false,
                message: err
            }).send();
        });
});

router.get('/messages', (req: Request, res: Response): void => {
    Message.find({}, function(err, messages) {
        res.json(messages);
    });
});

export default router;
