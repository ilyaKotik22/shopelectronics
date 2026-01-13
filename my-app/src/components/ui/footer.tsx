const Footer = () => {
    const mas1 = [    'О Компании',
    'Новости',
    'Партнерам (аренда, сотрудничество)',
    'Вакансии',
    'Политика конфиденциальности',
    'Персональные данные',
    'Правила продаж',
    'Правила пользования сайта',
    'Сервисные центры']
    const mas2 = [
        'Как оформить заказ',
        'Способы оплаты',
        'Кредиты',
        "Доставка",
        'Статус заказа',
        'Обмен, возврат, гарантия',
        'Проверка статуса ремонта',
    ]
    const mas3 = [
        'Юридическим лицам',
        'Проверка счета',
        'Корпоративные отделы',
        'Подарочные карты',
        'Бонусная программа',
        'Помощь',
        'Обратная связь'
    ]
    return ( 
    <footer className="px-[5vw] py-10 grid grid-cols-3 mt-[120px] bg-neutral-800 text-white text-[14px]">
        <ul className="col-span-1">
            {mas1.map(el=> <li className="pb-3" key={el}>{el}</li>)}
        </ul>
         <ul className="col-span-1">
            {mas2.map(el=> <li  className="pb-3" key={el}>{el}</li>)}
        </ul>
         <ul className="col-span-1">
            {mas3.map(el=> <li  className="pb-3" key={el}>{el}</li>)}
        </ul>
    </footer> );
}
 
export default Footer;