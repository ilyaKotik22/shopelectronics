const Block1Home = () => {
    const mas = [
        {   
            title: 'Каталог',
            img: 'https://i.imgur.com/g9tAMDs.jpeg'
        },
        {
            title: 'Акции',
            img: 'https://i.imgur.com/oIf9uI6.png'
        },
        {
            title: 'Собрать ПК',
            img: 'https://i.imgur.com/8p65KmY.png'
        },{
            title: 'Подарочные карты',
            img: 'https://i.imgur.com/3kAsBoq.png'
        }
        ,{
            title: 'Сервис',
            img: 'https://i.imgur.com/RQ26L4W.jpeg'
        },
        {
            title: 'Помощь',
            img: 'https://i.imgur.com/ctknM1d.jpeg'
        }
    ]
    return ( 
    <section className="w-[92vw] z-0">
        <ul className="flex w-full justify-center gap-5">
            {mas.map((item) => (
            <li style={{ backgroundImage: `url(${item.img})` }} className={"px-3 min-w-[13.6vw] bg-cover relative bg-center bg-no-repeat h-[300px] py-1 text-white rounded-md " } key={item.title}>
                
                <div className="absolute bottom-5 z-40">{item.title}</div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent pointer-events-none rounded-md"></div>
               
            </li>
        ))}
        </ul>
        
    </section> );
}
 
export default Block1Home;