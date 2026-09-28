import { Router } from 'express';
import { adminAuthRoutes } from './auth';
import { adminFlightRoutes } from './flights';
import { adminUserRoutes } from './users';
import { adminBookingRoutes } from './bookings';
import { adminAnalyticsRoutes } from './analytics';
import { adminRefundRoutes } from './refunds';
import { tenantAnalyticsRoutes } from './tenantAnalytics';
import { analyticsAuditRoutes } from './analyticsAudit';
import { rateMetricsRoutes } from './rateMetrics';

const router = Router();

router.use('/auth', adminAuthRoutes);
router.use('/flights', adminFlightRoutes);
router.use('/users', adminUserRoutes);
router.use('/bookings', adminBookingRoutes);
router.use('/analytics', adminAnalyticsRoutes);
router.use('/refunds', adminRefundRoutes);
router.use('/tenant-analytics', tenantAnalyticsRoutes);
router.use('/analytics-audit', analyticsAuditRoutes);
router.use('/rate-metrics', rateMetricsRoutes);

export { router as adminRoutes };
