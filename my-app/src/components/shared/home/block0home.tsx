import Image from 'next/image';
import img1 from '../../../../public/laptopback.png'
const Block0Home = () => {
    const qualityItems = [
        '✓ Официальная гарантия',
        '✓ Качество',
        '✓ Лучшая цена',
        '✓ Оригинальная техника',
        '✓ Лёгкий возврат',
        '✓ Быстрая доставка'
    ]
    return ( 
        <section className="text-white dark:text-black ">
            <section className=" lg:flex">
                <section className="lg:w-[40%]">
                    <div  className="block justify-center py-20 lg:justify-start ">
                        <h1 className="text-center lg:text-start text-[24px] lg:text-[42px]">Техника и электроника</h1>
                        <div className="text-center lg:text-start">доставка по всей России</div>
                    </div>
                    
                    <ul className="flex flex-wrap gap-3 py-5">
                        {qualityItems.map(item=> <li className="bg-neutral-500 dark:bg-neutral-200 dark:text-black rounded-md w-max px-2 py-1 text-[10px] lg:text-[14px] text-white" key={item}>
                            {item}</li>)}
                    </ul>
                </section>
                <section className='hidden h-[500px] lg:flex justify-end w-[59vw]'>
                    <Image
                        src={img1}
                        alt='laptop'
                        height={500}
                        
                    />
                </section>
                
            </section>
        </section> 
        );
}

export default Block0Home;