import facebook from '../assets/Icons/facebook.png'
import call from '../assets/Icons/call.png'
import messenger from '../assets/Icons/messanger.png'
import whatsApp from '../assets/Icons/whatsApp.png'
import { FaHome } from 'react-icons/fa';


const StickyFooter = () => {
    return (
        <div className="py-2 bg-color_2">
            <div className="flex justify-between gap-4 px-4 items-baseline">
                <a href="https://www.facebook.com/ghuri.net" target='_blank' className=''><img src={facebook} className='w-10' alt="" /></a>
                <a href="" className=''><img src={messenger} className='w-10' alt="" /></a>
                <a href="" className=''></a>
                <a href="" className=''></a>
                <a href="/" className='fixed left-1/2 -translate-x-1/2 bottom-0 bg-color_2 rounded-full py-2 px-2'><FaHome className='text-6xl text-color_1' /></a>
                <a href={`tel:+8801729798079`} target='_blank' className=''><img src={call} className='w-10' alt="" /></a>
                <a href="https://wa.me/8801729798079" target='_blank' className=''><img src={whatsApp} className='w-11' alt="" /></a>
            </div>
        </div>
    );
};

export default StickyFooter;