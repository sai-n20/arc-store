import { Router, Request, Response, NextFunction } from 'express';
import helmet from 'helmet';
import { RateLimiterMemory, RateLimiterRes } from 'rate-limiter-flexible';
import { TOO_MANY_REQUESTS } from 'http-status-codes';

import { APIError } from '../../error-handler/definition';

const router = Router();

const rateLimiter = new RateLimiterMemory({
  keyPrefix: 'middleware',
  points: Number(process.env['RATELIMITER_MAXREQ'] || '1000'),
  duration: Number(process.env['RATELIMITER_TIME'] || '1')
});

router.use(helmet());

router.use((req: Request, res: Response, next: NextFunction) => {
  rateLimiter.consume(req.ip)
    .then(() => { next(); })
    .catch((result: RateLimiterRes) => {
      next(new APIError(TOO_MANY_REQUESTS, undefined, undefined, 'Too many requests!'));
    });
});

export default router;