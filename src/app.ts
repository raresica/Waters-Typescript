import * as express from "express";
import { env } from "./env";
import { discoveryClientRouter } from "../routes/discovery-client.route";
import { aJsonRouter } from "../routes/a-json.route";
import { IExpressError } from "../interfaces/IExpressError";
export { makeApp };

let app: express.Application;


function makeApp() {

	if (app) return app;

	app = express();

	// routes
	app.use(env.DISCOVERY_CLIENT_ROUTE, discoveryClientRouter);
	app.use(env.A_JSON_ROUTE, aJsonRouter);

	// 404
	app.use((_req, _res, next) => {
		const err = new Error("Not Found") as IExpressError;
		// could have created a full ExpressError class with a constructor to extend Error instead of the interface
		err.status = 404;
		next(err);
	});

	// 500
	app.use((err: IExpressError, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
		res.status(err.status || 500).send(env.NODE_ENV === "development" ? err : {});
	});

	return app;
}
