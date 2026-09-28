import request from 'supertest';
import express from 'express';
import { AppDataSource, initDataSource } from '../db/dataSource';
import { webhookIdempotencyMiddleware } from '../middleware/webhookIdempotency';
import { WebhookService, WebhookEventContract } from '../services/webhookService';

const app = express();
app.use(express.json());
app.post('/webhook', webhookIdempotencyMiddleware, (_req, res) => {
  res.status(200).json({ success: true, processed: true });
});

describe('Webhook Idempotency & Contract', () => {
  beforeAll(async () => {
    if (!AppDataSource.isInitialized) {
      await initDataSource();
    }
  });

  afterAll(async () => {
    if (AppDataSource.isInitialized) {
      await AppDataSource.destroy();
    }
  });

  it('happy path: processes a novel webhook event successfully and records idempotency', async () => {
    const eventId = 'evt_test_happy_' + Date.now();
    const res = await request(app)
      .post('/webhook')
      .send({ id: eventId, type: 'payment_intent.succeeded', data: { amount: 1000 } });

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.processed).toBe(true);
  });

  it('failure mode (duplicate event): rejects or skips duplicate webhook event idempotently', async () => {
    const eventId = 'evt_test_dup_' + Date.now();
    
    // First delivery
    const res1 = await request(app)
      .post('/webhook')
      .send({ id: eventId, type: 'payment_intent.succeeded' });
    expect(res1.status).toBe(200);

    // Second delivery (duplicate)
    const res2 = await request(app)
      .post('/webhook')
      .send({ id: eventId, type: 'payment_intent.succeeded' });

    expect(res2.status).toBe(200);
    expect(res2.body.duplicate).toBe(true);
    expect(res2.body.message).toContain('already processed');
  });

  it('failure mode (missing event id): returns 400 bad request when event ID is absent', async () => {
    const res = await request(app)
      .post('/webhook')
      .send({ type: 'payment_intent.succeeded' });

    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
    expect(res.body.error.code).toBe('WEBHOOK_EVENT_ID_MISSING');
  });

  it('WebhookService contract processes structured events correctly', async () => {
    const event: WebhookEventContract = {
      id: 'evt_service_' + Date.now(),
      type: 'charge.succeeded',
      data: { id: 'ch_123' },
    };
    const result = await WebhookService.processWebhookEvent(event);
    expect(result.success).toBe(true);
    expect(result.processedAt).toBeDefined();
  });
});
