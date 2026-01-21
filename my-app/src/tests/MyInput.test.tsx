// src/components/MyInput.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect} from '@jest/globals';
import MyInput from '@/components/ui/MyInput';


describe('MyInput', () => {
  // 1. Базовый рендеринг
  it('рендерит инпут с переданным value и применяет дефолтные стили', () => {
    render(<MyInput value="тест" onChange={jest.fn()} />);

    const input = screen.getByDisplayValue('тест');
    expect(input).toBeInTheDocument();
    expect(input).toHaveClass('px-3');
    expect(input).toHaveClass('py-3');
    expect(input).toHaveClass('border-2');
    expect(input).toHaveClass('border-white');
    expect(input).toHaveClass('rounded-md');
  });

  

  // 3. Обработка изменения значения (самое важное!)
  it('при вводе вызывает onChange с новым значением', () => {
    const handleChange = jest.fn();
    render(<MyInput value="" onChange={handleChange} placeholder="Введите текст" />);

    const input = screen.getByPlaceholderText('Введите текст');
    fireEvent.change(input, { target: { value: 'новый текст' } });

    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange).toHaveBeenCalledWith('новый текст');
  });

  // 4. Контролируемое значение (value не меняется внутри компонента)
  it('всегда отображает актуальное value из пропсов', () => {
    const { rerender } = render(<MyInput value="старое" onChange={jest.fn()} />);

    let input = screen.getByDisplayValue('старое');
    expect(input).toBeInTheDocument();

    // Меняем value через rerender
    rerender(<MyInput value="новое" onChange={jest.fn()} />);

    input = screen.getByDisplayValue('новое');
    expect(input).toBeInTheDocument();
  });

  
 
  // 6. Передача дополнительных HTML-атрибутов (type, placeholder, disabled и т.д.)
  it('передаёт дополнительные пропсы в input', () => {
    render(
      <MyInput
        value=""
        onChange={jest.fn()}
        type="password"
        placeholder="Пароль"
        disabled
        maxLength={20}
      />
    );

    const input = screen.getByPlaceholderText('Пароль');
    expect(input).toHaveAttribute('type', 'password');
    expect(input).toBeDisabled();
    expect(input).toHaveAttribute('maxlength', '20');
  });

  // 7. Кастомный className добавляется к дефолтным классам
  it('добавляет кастомный className к дефолтным стилям', () => {
    render(<MyInput value="" onChange={jest.fn()} className="extra-class w-full" />);

    const input = screen.getByDisplayValue('');
    expect(input).toHaveClass('extra-class');
    expect(input).toHaveClass('w-full');
    // дефолтные классы остаются
    expect(input).toHaveClass('px-3');
    expect(input).toHaveClass('border-white');
  });
});