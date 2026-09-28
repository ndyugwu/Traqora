import { Router } from 'express';
import { rateLimitAbuseRoutes } from './admin/rateLimitAbuse';

const router = Router();

router.use('/admin/security/rate-limits', rateLimitAbuseRoutes);

export { router as apiRoutes };
