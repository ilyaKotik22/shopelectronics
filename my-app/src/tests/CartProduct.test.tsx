import CardProduct from "@/components/ui/cardProduct"
import { render,screen } from '@testing-library/react';

describe("CartProduct", () => {
    const mockProduct = {
        id: '21321',
        brand: 'sadadsa',
        price: 12313,
        year: 2025,
        categorySlug: 'sadasd',
        title: 'sad'
    }
    it("рендерит заголовок, цену", () => {
        render(<CardProduct
                name={mockProduct.title}
                    categorySlug={mockProduct.categorySlug}
                    price={mockProduct.price}
                    id={mockProduct.id}
                    brand={mockProduct.brand }
            />)
            expect(screen.getByText('sad')).toBeInTheDocument();
            expect(screen.getByText('12313 рублей')).toBeInTheDocument();
    })
})