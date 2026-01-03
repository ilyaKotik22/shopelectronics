// filtersByCategory.js

import { Filter, FiltersByCategory } from "@/types/filter";

export const filtersByCategory:FiltersByCategory = {
  "smartphones": {
    value: "smartphoneSpec",  // ← латиница для URL/query
    defaultFilter: [
      { id: "brand",          name: "Бренд",               type: "checkbox", choices: ["Apple", "Samsung", "Xiaomi", "Realme", "Huawei", "Google", "Sony", "Oppo", "Vivo", "Другие"] },
    ],
    filters: [
      { id: "price",          name: "Цена",                type: "range",   min: 0, max: 300000, step: 1000, currency: "₽" },
      { id: "brand",          name: "Бренд",               type: "checkbox", choices: ["Apple", "Samsung", "Xiaomi", "Realme", "Huawei", "Google", "Sony", "Oppo", "Vivo", "Другие"] },
      { id: "year",           name: "Год выпуска",         type: "checkbox", choices: ["2025", "2024", "2023", "2022 и старше"] },
      { id: "screen_size",    name: "Диагональ экрана",    type: "checkbox", choices: ["До 6.3″", "6.4–6.7″", "6.8″ и больше"] },
      { id: "ram",            name: "Оперативная память",  type: "checkbox", choices: ["4–6 ГБ", "8 ГБ", "12 ГБ", "16 ГБ", "18+ ГБ"] },
      { id: "storage",        name: "Встроенная память",   type: "checkbox", choices: ["64–128 ГБ", "256 ГБ", "512 ГБ", "1 ТБ и больше"] },
      { id: "screen_type",    name: "Тип экрана",          type: "checkbox", choices: ["AMOLED", "OLED", "IPS", "LTPO"] },
      { id: "refresh_rate",   name: "Частота обновления",  type: "checkbox", choices: ["60 Гц", "90 Гц", "120 Гц", "144+ Гц"] },
      { id: "camera_mp",      name: "Основная камера",     type: "checkbox", choices: ["До 48 МП", "50–64 МП", "108 МП", "200 МП+"] },
      { id: "battery",        name: "Ёмкость аккумулятора",type: "checkbox", choices: ["До 4500 мАч", "4500–5000 мАч", "5000–6000 мАч", "6000+ мАч"] },
      { id: "waterproof",     name: "Защита от воды",      type: "checkbox", choices: ["IP54–IP67", "IP68", "Нет"] },
      { id: "color",          name: "Цвет",                type: "checkbox", choices: ["Чёрный", "Белый", "Синий", "Зелёный", "Фиолетовый", "Титановый"] },
      { id: "availability",   name: "Наличие",             type: "checkbox", choices: ["В наличии", "Под заказ"] },
      { id: "rating",         name: "Рейтинг",           type: "checkbox", choices: ["4.5+", "4+"] }
    ]
  },
  "tvs": {
    value: "tvSpec",
    defaultFilter: [
      { id: "brand",          name: "Бренд",               type: "checkbox", choices: ["Samsung", "LG", "Sony", "TCL", "Hisense", "Xiaomi", "Philips", "JBL", "Sony", "Bose"] },
    ],
    filters: [
      { id: "price",          name: "Цена",                type: "range",   min: 0, max: 500000, step: 5000 },
      { id: "screen_size_tv", name: "Диагональ",           type: "checkbox", choices: ["32–43″", "50–55″", "65″", "75–85″", "98–100″+"] },
      { id: "resolution",     name: "Разрешение",          type: "checkbox", choices: ["Full HD", "4K UHD", "8K"] },
      { id: "refresh_rate",   name: "Частота обновления",  type: "checkbox", choices: ["60 Гц", "120 Гц", "144 Гц"] },
      { id: "panel_type",     name: "Тип матрицы",         type: "checkbox", choices: ["OLED", "QLED", "Mini-LED", "LED"] },
      { id: "smart_tv",       name: "Смарт ТВ",            type: "checkbox", choices: ["Есть", "Нет"] },
      { id: "audio_power",    name: "Мощность звука",      type: "checkbox", choices: ["До 40 Вт", "40–100 Вт", "100+ Вт"] },
      { id: "console_type",   name: "Тип консоли",         type: "checkbox", choices: ["PlayStation", "Xbox", "Nintendo", "Портативные"] },
      { id: "availability",   name: "Наличие",             type: "checkbox", choices: ["В наличии", "Под заказ"] }
    ]
  },
  "laptops": {
    value: "laptopSpec",
    defaultFilter: [
      { id: "brand",          name: "Бренд",               type: "checkbox", choices: ["Apple", "ASUS", "Lenovo", "HP", "Dell", "MSI", "Acer", "Huawei"] },
    ],
    filters: [
      { id: "price",          name: "Цена",                type: "range",   min: 0, max: 500000 },
      { id: "type",           name: "Тип",                 type: "checkbox", choices: ["Ноутбук", "Игровой ноутбук", "Ультрабук", "Трансформер", "Моноблок", "Мини-ПК"] },
      { id: "screen_size",    name: "Диагональ",           type: "checkbox", choices: ["13–14″", "15–15.6″", "16–17.3″"] },
      { id: "cpu",            name: "Процессор",           type: "checkbox", choices: ["Intel Core i3/i5", "Intel Core i7/i9", "AMD Ryzen 5", "AMD Ryzen 7/9", "Apple M1/M2/M3/M4"] },
      { id: "ram",            name: "Оперативка",          type: "checkbox", choices: ["8 ГБ", "16 ГБ", "32 ГБ", "64 ГБ+"] },
      { id: "storage",        name: "Накопитель",          type: "checkbox", choices: ["256–512 ГБ", "1 ТБ", "2 ТБ+"] },
      { id: "gpu",            name: "Видеокарта",          type: "checkbox", choices: ["Встроенная", "RTX 3050–3060", "RTX 4060–4070", "RTX 4080–4090"] },
      { id: "purpose",        name: "Назначение",          type: "checkbox", choices: ["Офис/учёба", "Игровой", "Для видео/монтажа", "Профессиональный"] }
    ]
  },
  "pc-components": {
    value: "pc-componentSpac",
    defaultFilter: [
      { id: "brand",          name: "Бренд",               type: "checkbox", choices: ["Intel", "AMD", "NVIDIA", "ASUS", "MSI", "Gigabyte", "Samsung", "Kingston", "Corsair"] },
    ],
    filters: [
      { id: "price",          name: "Цена",                type: "range",   min: 0, max: 300000 },
      { id: "category",       name: "Категория",           type: "checkbox", choices: ["Процессор", "Видеокарта", "Материнская плата", "Оперативная память", "SSD", "HDD", "Блок питания", "Корпус", "Охлаждение"] },
      { id: "socket",         name: "Сокет (для CPU)",     type: "checkbox", choices: ["AM5", "LGA 1700", "LGA 1851"] },
      { id: "ram_type",       name: "Тип памяти",          type: "checkbox", choices: ["DDR4", "DDR5"] },
      { id: "capacity",       name: "Объём",               type: "checkbox", choices: ["До 500 ГБ", "512–1024 ГБ", "2 ТБ+", "4 ТБ+"] }
    ]
  },
  "peripherals": {
    value: "peripheralSpec",
    defaultFilter: [
      { id: "brand",          name: "Бренд",               type: "checkbox", choices: ["Logitech", "Razer", "SteelSeries", "HyperX", "ASUS", "Samsung", "Dell", "Xiaomi"] },
    ],
    filters: [
      { id: "price",          name: "Цена",                type: "range",   min: 0, max: 100000 },
      { id: "type",           name: "Тип",                 type: "checkbox", choices: ["Монитор", "Клавиатура", "Мышь", "Коврик", "Гарнитура", "Веб-камера", "Колонки", "Джойстик/геймпад"] },
      { id: "monitor_size",   name: "Диагональ монитора", type: "checkbox", choices: ["24–27″", "27–32″", "34–49″ (ультраширокие)"] },
      { id: "monitor_type",   name: "Тип монитора",        type: "checkbox", choices: ["IPS", "VA", "OLED", "TN"] }
    ]
  },
  "network": {
    value: "networkSpec",
    defaultFilter: [
      
    ],
    filters: [
      { id: "price",          name: "Цена",                type: "range",   min: 0, max: 80000 },
      { id: "type",           name: "Тип",                 type: "checkbox", choices: ["Wi-Fi роутер", "Mesh-система", "Репитер", "Коммутатор", "4G/5G роутер", "NAS"] },
      { id: "wifi_standard",  name: "Стандарт Wi-Fi",      type: "checkbox", choices: ["Wi-Fi 5", "Wi-Fi 6", "Wi-Fi 6E", "Wi-Fi 7"] },
      { id: "speed",          name: "Скорость",            type: "checkbox", choices: ["До 1000 Мбит/с", "2500–5000 Мбит/с", "10000+ Мбит/с"] },
      { id: "ports",          name: "Кол-во портов LAN",   type: "checkbox", choices: ["1–4", "5–8", "8+"] }
    ]
  },
  "office": {
    value: "officeSpac",
    defaultFilter: [
      { id: "brand",          name: "Бренд",               type: "checkbox", choices: ["Xiaomi", "Yandex", "Aqara", "Tuya", "IKEA", "DXRacer", "Cougar"] },
    ],
    filters: [
      { id: "price",          name: "Цена",                type: "range",   min: 0, max: 150000 },
      { id: "type",           name: "Категория",           type: "checkbox", choices: ["Кресло", "Стол", "Подставка", "Умная колонка", "Умная розетка", "Умный свет", "Датчики"] },
      
      { id: "purpose",        name: "Назначение",          type: "checkbox", choices: ["Геймерское кресло", "Офисное кресло", "Стол для ПК", "Умный дом"] }
    ]
  }
} as const;;