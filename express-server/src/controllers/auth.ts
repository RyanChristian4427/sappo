import { Response, Request, } from "express";

/**
 * GET /api
 * List of API examples.
 */
export const login = (req: Request, res: Response) => {
    console.log(req.body);
    res.json(req.body);
};

