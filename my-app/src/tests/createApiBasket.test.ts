// src/tests/createApiBasket.test.ts
import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { createApiBasket } from '@/lib/createApiBasket';
import * as auth from '@/auth';
import { prisma } from '@/lib/prisma';

// Мокаем модули (Jest-синтаксис)
jest.mock('@/auth');
jest.mock('@/lib/prisma', () => ({
  prisma: {
    product: {
      findUnique: jest.fn(),
    },
    basket: {
      findUnique: jest.fn(),
    },
    basketItem: {
      findFirst: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
    },
    $transaction: jest.fn((cb) => cb({})),
  },
}));

describe('createApiBasket', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Тест 1: не авторизован
  it('возвращает ошибку если пользователь не авторизован', async () => {
    (auth.auth as jest.Mock).mockResolvedValue(null);

    const formData = new FormData();
    formData.append('productId', 'prod1');

    const result = await createApiBasket(formData);

    expect(result).toEqual({ error: 'необходимо войти в аккаунт' });
    expect(prisma.product.findUnique).not.toHaveBeenCalled();
  });

  // Тест 2: товар не найден
  it('возвращает ошибку если товар не найден', async () => {
    (auth.auth as jest.Mock).mockResolvedValue({ user: { id: 'user1' } });
    (prisma.product.findUnique as jest.Mock).mockResolvedValue(null);

    const formData = new FormData();
    formData.append('productId', 'prod1');

    const result = await createApiBasket(formData);

    expect(result).toEqual({ error: 'Товар не найден' });
  });

  // Тест 3: товар недоступен
  it('возвращает ошибку если товар недоступен', async () => {
    (auth.auth as jest.Mock).mockResolvedValue({ user: { id: 'user1' } });
    (prisma.product.findUnique as jest.Mock).mockResolvedValue({
      id: 'prod1',
      price: 1000,
      currency: 'RUB',
      available: false,
      title: 'Телефон',
    });

    const formData = new FormData();
    formData.append('productId', 'prod1');

    const result = await createApiBasket(formData);

    expect(result).toEqual({ error: 'товар не доступен' });
  });

  // Тест 4: успешное добавление нового товара (quantity = 1)
  it('добавляет новый товар в корзину и возвращает успех', async () => {
    (auth.auth as jest.Mock).mockResolvedValue({ user: { id: 'user1' } });
    (prisma.product.findUnique as jest.Mock).mockResolvedValue({
      id: 'prod1',
      price: 1500,
      currency: 'RUB',
      available: true,
      title: 'Ноутбук',
    });
    (prisma.basketItem.findFirst as jest.Mock).mockResolvedValue(null);
    (prisma.basket.findUnique as jest.Mock).mockResolvedValue({ id: 'basket1' });

    const formData = new FormData();
    formData.append('productId', 'prod1');

    const result = await createApiBasket(formData, 1);

    expect(result).toEqual({
      success: true,
      message: 'Добавленно 1 шт Ноутбук в корзину',
    });

    expect(prisma.$transaction).toHaveBeenCalled();
    expect(prisma.basketItem.create).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({
          basketId: 'basket1',
          productId: 'prod1',
          quantity: 1,
          priceAtAdd: 1500,
        }),
      })
    );
  });

  // Тест 5: увеличение количества существующего товара
  it('увеличивает количество если товар уже в корзине', async () => {
    (auth.auth as jest.Mock).mockResolvedValue({ user: { id: 'user1' } });
    (prisma.product.findUnique as jest.Mock).mockResolvedValue({
      id: 'prod1',
      price: 1500,
      currency: 'RUB',
      available: true,
      title: 'Ноутбук',
    });
    (prisma.basketItem.findFirst as jest.Mock).mockResolvedValue({
      id: 'item1',
      quantity: 3,
    });

    const formData = new FormData();
    formData.append('productId', 'prod1');

    const result = await createApiBasket(formData, 2);

    expect(result.success).toBe(true);
    expect(prisma.basketItem.update).toHaveBeenCalledWith(
      expect.objectContaining({
        data: {
          quantity: { increment: 2 },
          priceAtAdd: 1500,
        },
      })
    );
  });

  // Тест 6: отрицательное количество → устанавливаем 1
  it('устанавливает минимальное количество 1 если передали < 1', async () => {
    (auth.auth as jest.Mock).mockResolvedValue({ user: { id: 'user1' } });
    (prisma.product.findUnique as jest.Mock).mockResolvedValue({
      id: 'prod1',
      price: 1000,
      currency: 'RUB',
      available: true,
      title: 'Мышь',
    });
    (prisma.basketItem.findFirst as jest.Mock).mockResolvedValue(null);

    const formData = new FormData();
    formData.append('productId', 'prod1');

    await createApiBasket(formData, -5);

    expect(prisma.basketItem.create).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({
          quantity: 1,
        }),
      })
    );
  });

  // Тест 7: ошибка в транзакции
  it('возвращает ошибку при исключении в транзакции', async () => {
    (auth.auth as jest.Mock).mockResolvedValue({ user: { id: 'user1' } });
    (prisma.product.findUnique as jest.Mock).mockResolvedValue({
      id: 'prod1',
      price: 1000,
      currency: 'RUB',
      available: true,
      title: 'Клавиатура',
    });
    (prisma.$transaction as jest.Mock).mockRejectedValue(new Error('DB error'));

    const formData = new FormData();
    formData.append('productId', 'prod1');

    const result = await createApiBasket(formData);

    expect(result).toHaveProperty('error');
    expect(console.log).toHaveBeenCalled();
  });
});