﻿import * as express from "express";
import * as aJsonService from "../services/a-json.service";

const aJsonRouter = express.Router();

export { aJsonRouter };

aJsonRouter.get("/", getAJson);

function getAJson(_req: express.Request, res: express.Response, next: express.NextFunction) {
	try {
		const jsonData = aJsonService.getAJson();
		return res.json(jsonData);
	} catch (ex) {
		return next(ex);
	}
}
