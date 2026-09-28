import { Router } from 'express';
import { adminAuthRoutes } from './auth';
import { adminFlightRoutes } from './flights';
import { adminUserRoutes } from './users';
import { adminBookingRoutes } from './bookings';
import { adminAnalyticsRoutes } from './analytics';
import { adminRefundRoutes } from './refunds';
import { tenantAnalyticsRoutes } from './tenantAnalytics';
import { analyticsAuditRoutes } from './analyticsAudit';
import { rateLimitDashboardRouter } from './rateLimitDashboard';

export const adminRoutes = Router();

adminRoutes.use('/auth', adminAuthRoutes);
adminRoutes.use('/flights', adminFlightRoutes);
adminRoutes.use('/users', adminUserRoutes);
adminRoutes.use('/bookings', adminBookingRoutes);
adminRoutes.use('/analytics', adminAnalyticsRoutes);
adminRoutes.use('/refunds', adminRefundRoutes);
adminRoutes.use('/tenants', tenantAnalyticsRoutes);
adminRoutes.use('/analytics-audit', analyticsAuditRoutes);
adminRoutes.use('/security/rate-limits', rateLimitDashboardRouter);
