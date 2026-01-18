// filtersByCategory.js

import { Filter, FiltersByCategory } from "@/types/filter";

export const filtersByCategory:FiltersByCategory = {
  "smartphones": {
    value: "smartphoneSpec",  // ← латиница для URL/query
    defaultFilter: [
      { id: "brand",          name: "Бренд",               type: "checkbox", choices: ["Apple", "Samsung", "Xiaomi", "Realme", "Huawei", "Google", "Sony", "Oppo", "Vivo", "Другие"] },
      { id: "price",          name: "Цена",                type: "range",   min: 0, max: 500000, step: 5000 },
    ],
    filters: [
      { id: "price",          name: "Цена",                type: "range",   min: 0, max: 300000, step: 1000, currency: "₽" },
      // { id: "year",           name: "Год выпуска",         type: "checkbox", choices: ["2025", "2024", "2023", "2022 и старше"] },
      { id: "screenInch",    name: "Диагональ экрана",    type: "checkbox", choices: ["До 6.3″", "6.5″", "6.8″ и больше"] },
      // { id: "ram",            name: "Оперативная память",  type: "checkbox", choices: ["4–6 ГБ", "8 ГБ", "12 ГБ", "16 ГБ", "18+ ГБ"] },
      // { id: "storage",        name: "Встроенная память",   type: "checkbox", choices: ["64–128 ГБ", "256 ГБ", "512 ГБ", "1 ТБ и больше"] },
      // { id: "screen_type",    name: "Тип экрана",          type: "checkbox", choices: ["AMOLED", "OLED", "IPS", "LTPO"] },
      { id: "refreshHz",   name: "Частота обновления",  type: "checkbox", choices: ["90 Гц", "120 Гц", "144 Гц", "165 Гц"] },
      { id: "cameraMp",      name: "Основная камера",     type: "checkbox", choices: ["50 МП", "64 МП", "108 МП", "200 "] },
      { id: "batteryMah",        name: "Ёмкость аккумулятора",type: "checkbox", choices: ["До 4500 мАч", "5000 мАч", "5100", "6000 мАч"] },
      { id: "waterproof",     name: "Защита от воды",      type: "checkbox", choices: ["IP67", "IP68",] },
      // { id: "color",          name: "Цвет",                type: "checkbox", choices: ["Чёрный", "Белый", "Синий", "Зелёный", "Фиолетовый", "Титановый"] },
      // { id: "availability",   name: "Наличие",             type: "checkbox", choices: ["В наличии", "Под заказ"] },
      // { id: "rating",         name: "Рейтинг",           type: "checkbox", choices: ["4.5+", "4+"] }
    ]
  },
  "tvs": {
    value: "tvSpec",
    defaultFilter: [
      { id: "brand",          name: "Бренд",               type: "checkbox", choices: ["Samsung", "LG",  "TCL", "Hisense", "Xiaomi", "Philips", "JBL", "Sony", "Bose"] },
      { id: "price",          name: "Цена",                type: "range",   min: 0, max: 500000, step: 5000 },
    ],
    filters: [
      
      { id: "screenInch", name: "Диагональ",           type: "checkbox", choices: ["55", "65", "75", "85"] },
      { id: "resolution",     name: "Разрешение",          type: "checkbox", choices: ["Full HD", "4K UHD", "8K UHD"] },
      { id: "refreshHz",   name: "Частота обновления",  type: "checkbox", choices: [ "120 Гц", "144 Гц"] },
      { id: "panelType",     name: "Тип матрицы",         type: "checkbox", choices: ["OLED", "QLED", "Mini-LED", "LED"] },
      // { id: "smart_tv",       name: "Смарт ТВ",            type: "checkbox", choices: ["Есть", "Нет"] },
      // { id: "audio_power",    name: "Мощность звука",      type: "checkbox", choices: ["До 40 Вт", "40–100 Вт", "100+ Вт"] },
      // { id: "console_type",   name: "Тип консоли",         type: "checkbox", choices: ["PlayStation", "Xbox", "Nintendo", "Портативные"] },
      // { id: "availability",   name: "Наличие",             type: "checkbox", choices: ["В наличии", "Под заказ"] }
    ]
  },
  "laptops": {
    value: "laptopSpec",
    defaultFilter: [
      { id: "brand",          name: "Бренд",               type: "checkbox", choices: ["Apple", "ASUS", "Lenovo", "HP", "Dell", "MSI", "Acer", "Huawei"] },
      { id: "price",          name: "Цена",                type: "range",   min: 0, max: 500000, step: 5000 },
    ],
    filters: [
      { id: "price",          name: "Цена",                type: "range",   min: 0, max: 500000 },
      // { id: "type",           name: "Тип",                 type: "checkbox", choices: ["Ноутбук", "Игровой ноутбук", "Ультрабук", "Трансформер", "Моноблок", "Мини-ПК"] },
      // { id: "screen_size",    name: "Диагональ",           type: "checkbox", choices: ["13–14″", "15–15.6″", "16–17.3″"] },
      // { id: "cpu",            name: "Процессор",           type: "checkbox", choices: ["Intel Core i7-13650HX", "AMD Ryzen 7 7840HS", "Apple M3 Max", "AMD Ryzen 7/9", "Apple M1/M2/M3/M4"] },
      { id: "ramGb",            name: "Оперативка",          type: "checkbox", choices: ["8 ГБ", "16 ГБ", "32 ГБ", "64 ГБ+"] },
      { id: "storageGb",        name: "Накопитель",          type: "checkbox", choices: ["512 ГБ", "1024 ГБ", "2048 ГБ"] },
      { id: "gpu",            name: "Видеокарта",          type: "checkbox", choices: ["RTX 4060", "Integrated", "RTX 4070", "RTX 4080"] },
      // { id: "purpose",        name: "Назначение",          type: "checkbox", choices: ["Офис/учёба", "Игровой", "Для видео/монтажа", "Профессиональный"] }
    ]
  },
  "pc-components": {
    value: "pc-componentSpac",
    defaultFilter: [
      { id: "brand",          name: "Бренд",               type: "checkbox", choices: ["Intel", "AMD", "NVIDIA", "ASUS", "MSI", "Gigabyte", "Samsung", "Kingston", "Corsair"] },
      { id: "price",          name: "Цена",                type: "range",   min: 0, max: 500000, step: 5000 },
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
      { id: "price",          name: "Цена",                type: "range",   min: 0, max: 500000, step: 5000 },
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
      { id: "price",          name: "Цена",                type: "range",   min: 0, max: 500000, step: 5000 },
    ],
    filters: [
      { id: "price",          name: "Цена",                type: "range",   min: 0, max: 150000 },
      { id: "type",           name: "Категория",           type: "checkbox", choices: ["Кресло", "Стол", "Подставка", "Умная колонка", "Умная розетка", "Умный свет", "Датчики"] },
      
      { id: "purpose",        name: "Назначение",          type: "checkbox", choices: ["Геймерское кресло", "Офисное кресло", "Стол для ПК", "Умный дом"] }
    ]
  }
} as const;;