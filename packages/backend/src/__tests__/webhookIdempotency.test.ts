import { Request, Response, NextFunction } from 'express';
import { webhookIdempotencyMiddleware } from '../middleware/webhookIdempotency';
import { AppDataSource } from '../db/dataSource';
import { IdempotencyKey } from '../db/entities/IdempotencyKey';

jest.mock('../db/dataSource', () => ({
  AppDataSource: {
    getRepository: jest.fn(),
  },
}));

describe('webhookIdempotencyMiddleware', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: NextFunction;
  let mockRepo: any;

  beforeEach(() => {
    jest.clearAllMocks();
    req = {
      body: { id: 'evt_123', type: 'payment_intent.succeeded' },
      headers: {},
      path: '/webhook',
      method: 'POST',
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    next = jest.fn();

    mockRepo = {
      findOne: jest.fn(),
      create: jest.fn().mockImplementation((val) => val),
      save: jest.fn().mockResolvedValue({}),
    };
    (AppDataSource.getRepository as jest.Mock).mockReturnValue(mockRepo);
  });

  it('should process a novel webhook event successfully (happy path)', async () => {
    mockRepo.findOne.mockResolvedValue(null);

    await webhookIdempotencyMiddleware(req as Request, res as Response, next);

    expect(mockRepo.findOne).toHaveBeenCalledWith({ where: { key: 'webhook:evt_123' } });
    expect(mockRepo.save).toHaveBeenCalled();
    expect(next).toHaveBeenCalled();
    expect(res.status).not.toHaveBeenCalled();
  });

  it('should skip processing and return duplicate response on duplicate event (failure/idempotency mode)', async () => {
    mockRepo.findOne.mockResolvedValue({ key: 'webhook:evt_123' });

    await webhookIdempotencyMiddleware(req as Request, res as Response, next);

    expect(mockRepo.findOne).toHaveBeenCalledWith({ where: { key: 'webhook:evt_123' } });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ duplicate: true }));
    expect(next).not.toHaveBeenCalled();
  });

  it('should return 400 when event ID is missing', async () => {
    req.body = {};

    await webhookIdempotencyMiddleware(req as Request, res as Response, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
      success: false,
      error: expect.objectContaining({ code: 'WEBHOOK_EVENT_ID_MISSING' }),
    }));
    expect(next).not.toHaveBeenCalled();
  });
});
