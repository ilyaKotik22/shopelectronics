'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { searchAction } from '@/actions/search.action'
import MyInput from '@/components/ui/MyInput'


type Item = {
    brand: {
        id: string;
        name: string;
    } | null;
} & {
    id: string;
    title: string;
    description: string | null;
    price: number;
    rating: number | null;
    available: boolean;
    categorySlug: string;
    brandId: string | null;
    createdAt: Date;
    updatedAt: Date;
}

export default function Search() {
  const [value, setValue] = useState('')
  const [results, setResults] = useState<Item[]>([])
  const formRef = useRef<HTMLFormElement>(null)
  const resultsRef = useRef<HTMLDivElement>(null) // ← ссылка на контейнер результатов
  const router = useRouter()




  // Debounce + поиск
  useEffect(() => {
    const trimmed = value.trim()
    if (trimmed.length < 2) {
      setResults([])
      return
    }

    const timer = setTimeout(() => {
      formRef.current?.requestSubmit()
    }, 350)

    return () => clearTimeout(timer)
  }, [value])

  // Обработка отправки формы
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const formData = new FormData(e.currentTarget as HTMLFormElement)
    const data = await searchAction(formData)
    setResults(data ?? [])
  }

  // Клик вне результатов → очистка
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Если клик произошёл НЕ внутри контейнера результатов
      if (resultsRef.current && !resultsRef.current.contains(event.target as Node)) {
        setResults([])
      }
    }

    // Добавляем слушатель на весь документ
    document.addEventListener('mousedown', handleClickOutside)

    // Очистка при размонтировании
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, []) // зависимости пустые — подписываемся один раз

  return (
    <div className="relative">
      <form ref={formRef} onSubmit={handleSubmit}>
        <MyInput
          name="q"
          value={value}
          onChange={(e) => setValue(e)} // ← исправлено
          placeholder="Поиск..."
          className="w-[50vw]"
        />
        <button type="submit" className="hidden" />
      </form>

      {results.length > 0 && (
        <div
          ref={resultsRef}                     
          className="fixed left-0 w-screen mt-1 bg-neutral-900 border border-neutral-700 rounded shadow-xl max-h-96 overflow-auto z-50"
        >
          <ul>
            {results.map((item) => (
              <li
                key={item.id}
                onClick={() => {
                  router.push(`/item?id=${item.id}&categorySlug=${item.categorySlug}`)
                  setResults([]) 
                }}
                className="px-4 py-3 hover:bg-neutral-800 cursor-pointer text-white"
              >
                {item.title}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}