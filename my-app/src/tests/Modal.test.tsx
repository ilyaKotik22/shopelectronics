// src/components/LogoutPopup.test.tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect,beforeEach } from '@jest/globals';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import LogoutPopup from '@/components/features/auth/logout';


// Мокаем next-auth и next/navigation
jest.mock('next-auth/react', () => ({
  signOut: jest.fn().mockResolvedValue(undefined),
}));

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

describe('LogoutPopup', () => {
  const mockRef = jest.fn();
  const mockRouter = {
    push: jest.fn(),
    refresh: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as any).mockReturnValue(mockRouter);
  });

  // 1. Не рендерится, когда vis = false
  it('не отображается, когда vis = false', () => {
    render(<LogoutPopup vis={false} ref={mockRef} />);

    expect(screen.queryByText('Выйти из профиля?')).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /выйти/i })).not.toBeInTheDocument();
  });

  // 2. Отображается корректно, когда vis = true
  it('отображает модальное окно и кнопки когда vis = true', () => {
    render(<LogoutPopup vis={true} ref={mockRef} />);

  

    // Проверяем контент модалки
    expect(screen.getByText('Выйти из профиля?')).toBeInTheDocument();

    // Кнопки
    expect(screen.getByRole('button', { name: /выйти/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /отмена/i })).toBeInTheDocument();
  });

  // 3. Кнопка "Отмена" вызывает ref()
  it('при клике на "Отмена" вызывает ref и закрывает модалку', () => {
    render(<LogoutPopup vis={true} ref={mockRef} />);

    const cancelButton = screen.getByRole('button', { name: /отмена/i });
    fireEvent.click(cancelButton);

    expect(mockRef).toHaveBeenCalledTimes(1);
  });

  // 4. Кнопка "Выйти" вызывает signOut + редирект
  it('при клике на "Выйти" вызывает signOut, ref и router.push/refresh', async () => {
    render(<LogoutPopup vis={true} ref={mockRef} />);

    const logoutButton = screen.getByRole('button', { name: /выйти/i });
    fireEvent.click(logoutButton);

    await waitFor(() => {
      expect(signOut).toHaveBeenCalledWith({
        redirect: false,
        callbackUrl: '/',
      });
      expect(mockRef).toHaveBeenCalledTimes(1);
      expect(mockRouter.push).toHaveBeenCalledWith('/auth');
      expect(mockRouter.refresh).toHaveBeenCalledTimes(1);
    });
  });

  // 5. Обрабатывает ошибку при signOut
  it('логирует ошибку, если signOut выбросил исключение', async () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

    jest.mocked(signOut).mockRejectedValueOnce(new Error('SignOut failed'));

    render(<LogoutPopup vis={true} ref={mockRef} />);

    fireEvent.click(screen.getByRole('button', { name: /выйти/i }));

    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith(expect.any(Error));
    });

    consoleSpy.mockRestore();
  });

  
});