import request from 'supertest';
import express from 'express';
import { webhookIdempotency } from '../middleware/webhookIdempotency';
import { AppDataSource, initDataSource } from '../db/dataSource';
import { IdempotencyKey } from '../db/entities/IdempotencyKey';

describe('Webhook Idempotency Middleware', () => {
  let app: express.Express;

  beforeAll(async () => {
    await initDataSource();
  });

  afterAll(async () => {
    if (AppDataSource.isInitialized) {
      await AppDataSource.destroy();
    }
  });

  beforeEach(async () => {
    app = express();
    app.use(express.json());
    app.post('/webhook', webhookIdempotency(), (req, res) => {
      res.status(200).json({ success: true, processed: true });
    });
    await AppDataSource.getRepository(IdempotencyKey).clear();
  });

  it('processes new webhook event successfully on first delivery', async () => {
    const response = await request(app)
      .post('/webhook')
      .set('stripe-signature', 'sig_unique_123')
      .send({ id: 'evt_unique_123', type: 'payment_intent.succeeded' });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ success: true, processed: true });
  });

  it('detects duplicate webhook event and returns cached idempotent response', async () => {
    const payload = { id: 'evt_dup_456', type: 'payment_intent.succeeded' };

    const firstResponse = await request(app)
      .post('/webhook')
      .set('stripe-signature', 'sig_dup_456')
      .send(payload);

    expect(firstResponse.status).toBe(200);
    expect(firstResponse.body.processed).toBe(true);

    const secondResponse = await request(app)
      .post('/webhook')
      .set('stripe-signature', 'sig_dup_456')
      .send(payload);

    expect(secondResponse.status).toBe(200);
    expect(secondResponse.body).toEqual({
      success: true,
      duplicate: true,
      message: 'Webhook event already processed idempotently',
    });
  });

  it('fails with 400 when event ID and signature header are both missing', async () => {
    const response = await request(app)
      .post('/webhook')
      .send({ type: 'payment_intent.succeeded' });

    expect(response.status).toBe(400);
    expect(response.body.error.code).toBe('WEBHOOK_IDEMPOTENCY_MISSING');
  });
});
