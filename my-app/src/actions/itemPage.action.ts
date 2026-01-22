import { Prisma } from '@prisma/client'; // или "@/generated/prisma/browser"

type PageItemApiResult = {
  where: Prisma.ProductWhereInput;
  include: Prisma.ProductInclude;
  orderBy: Prisma.ProductOrderByWithRelationInput;
  take: number;
};

export const itemPageAction = (params: { id: string; categorySlug: string }): PageItemApiResult => {
  const result: PageItemApiResult = {
    where: {
      id: params.id,
      available: true,
    },
    include: {
      brand: true,
      // category: true, // если нужно
    },
    orderBy: {
      price: 'asc',
    },
    take: 1,
  };

  // Безопасное добавление нужной спецификации
  const categoryToSpec: Record<string, keyof Prisma.ProductInclude> = {
    laptops: 'laptopSpec',
    smartphones: 'smartphoneSpec',
    tvs: 'tvSpec',
    // tablets: 'tabletSpec',
    // etc...
  };

  const specKey = categoryToSpec[params.categorySlug];

  if (specKey) {
    result.include[specKey] = true;
  }

  return result;
};