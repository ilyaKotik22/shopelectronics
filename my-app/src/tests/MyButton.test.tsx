// src/components/MyButton.test.tsx
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, it, expect } from '@jest/globals';
import { MyButton } from '@/components/ui/MyButton';


describe('MyButton', () => {
  it('по умолчанию рендерится как <button> и отображает children', () => {
    render(<MyButton>Нажми меня</MyButton>);

    const button = screen.getByRole('button', { name: /нажми меня/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent('Нажми меня');
    expect(button.tagName).toBe('BUTTON');
  });

  it('принимает и применяет дополнительные пропсы (className, disabled и т.д.)', () => {
    render(
      <MyButton disabled className="extra-class" type="submit">
        Отправить
      </MyButton>
    );

    const button = screen.getByRole('button', { name: /отправить/i });
    expect(button).toBeDisabled();
    expect(button).toHaveAttribute('type', 'submit');
    expect(button).toHaveClass('extra-class');
  });

  it('применяет свои дефолтные стили', () => {
    render(<MyButton>Стили</MyButton>);

    const button = screen.getByRole('button');
    expect(button).toHaveClass('bg-white');
    expect(button).toHaveClass('text-neutral-800');
    expect(button).toHaveClass('hover:bg-neutral-400');
    expect(button).toHaveClass('transition-all');
  });
  it('передаёт onClick и другие обработчики событий', () => {
  const handleClick = jest.fn();
  render(<MyButton onClick={handleClick}>Кликни</MyButton>);

  fireEvent.click(screen.getByText('Кликни'));
  expect(handleClick).toHaveBeenCalledTimes(1);
});

    it('не вызывает onClick, если кнопка disabled', () => {
    const handleClick = jest.fn();
    render(
        <MyButton disabled onClick={handleClick}>
        Заблокирована
        </MyButton>
    );

    fireEvent.click(screen.getByText('Заблокирована'));
    expect(handleClick).not.toHaveBeenCalled();
    });
});