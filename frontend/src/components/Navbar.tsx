import {Link, NavLink } from 'react-router-dom'
import {assets} from '../assets/assets.ts'
import { useState } from 'react';

const Navbar: React.FC = () => {
    const [displaySidebar, setDisplaySidebar] = useState<boolean>(false);
    const [displayProfileMenu, setDisplayProfileMenu] = useState<boolean>(false);

  return (
    <div className='flex justify-between items-center py-5 border-b border-gray-200'>
        <Link to='/'>
        <img className='w-42'  />
        </Link>
        <ul className='hidden md:flex text-gray-700 gap-5 text-sm font-medium'>
            <NavLink to ='/' className='flex flex-col items-center gap-1'>
                <p>HOME</p>
                <hr className='w-2/4 bg-gray-700 hidden h-[1.5px]'/>
            </NavLink>
            <NavLink to='collection' className='flex flex-col items-center gap-1'>
                <p>REPORT</p>
                 <hr className='w-2/4 bg-gray-700 hidden h-[1.5px]'/>
            </NavLink>
            <NavLink to='about' className='flex flex-col items-center gap-1'>
                <p>ISSUES</p>
                <hr className='w-2/4 bg-gray-700 hidden h-[1.5px]'/>
            </NavLink>
            <NavLink to='contact'className='flex flex-col items-center gap-1'>
                <p>CONTACT  </p>
                <hr className='w-2/4 bg-gray-700 hidden h-[1.5px]'/>
            </NavLink>
            <NavLink to='home' className={'border-2 border-slate-100 rounded-3xl hover:bg-slate-300 p-2'}>
                <p className='text-sm '>Admin Panel</p>
            </NavLink>
        </ul>
        <div className='flex gap-6 items-center '>
            <Link to='/collection'><img src={assets.search_icon} className='cursor-pointer w-5'/></Link>
            <div className='group relative'> 
                <img src={assets.profile_icon} className='cursor-pointer w-5' onClick={()=>{setDisplayProfileMenu(!displayProfileMenu)}}/>
                <div className={`absolute right-0 pt-4 text-gray-600 ${displayProfileMenu? 'group-hover:block':'hidden'}`}>
                    <div className='flex flex-col items-center gap-2 bg-slate-300 w-36 rounded-xl py-4'>
                        <p className='hover:text-black cursor-pointer'>Profile</p>
                        {/* <p className='hover:text-black cursor-pointer'>Orders</p> */}
                        <p className='hover:text-black cursor-pointer'>Logout</p>
                    </div>
                </div>
            </div>
            {/* <Link to='/cart' className='relative'> */}
                {/* <img className='cursor-pointer w-5'/> */}
                {/* <p className='absolute right-[-5px] bottom-[-7px] text-center bg-black text-white rounded-full leading-4 text-[8px] w-4'>{getCartCount()}</p> */}
            {/* </Link> */}
            <img onClick={()=>{setDisplaySidebar(true)}} src={assets.menu_icon} className={`size-7 md:hidden ${displaySidebar ? 'hidden' : ''}`} />
        </div>
        {/* sidebar menu */}
        <div className={`fixed top-0 right-0 h-screen w-64 bg-slate-200 backdrop-blur-md text-gray-700
            z-50 transform transition-transform duration-300 ${displaySidebar ? "translate-x-0" : "translate-x-full"}
            flex flex-col gap-5 p-4`}>
            <button onClick={() => setDisplaySidebar(false)} type="button" className="cursor-pointer flex items-center gap-2.5 border border-gray-500/30 px-4 py-2 text-sm text-gray-800 rounded bg-white hover:text-pink-500/70 hover:bg-pink-500/10 hover:border-pink-500/30 active:scale-95 transition">
                <svg width="16" height="13" viewBox="0 0 16 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15 6.5H1M6.5 12 1 6.5 6.5 1" stroke="#FDA4AF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Back
            </button>
            <nav className="flex flex-col space-y-2">                
                <NavLink onClick={()=>{setDisplaySidebar(false)}} to='' className="cursor-pointer hover:text-black  px-2 py-1 rounded text-base border-b-2 border-gray-400 h-11">HOME</NavLink>
                <NavLink onClick={()=>{setDisplaySidebar(false)}} to='collection' className="cursor-pointer hover:text-black px-2 py-1 rounded text-base border-b-2 border-gray-400 h-11">COLLECTION</NavLink>
                <NavLink onClick={()=>{setDisplaySidebar(false)}} to='about'className="cursor-pointer hover:text-black px-2 py-1 rounded text-base border-b-2 border-gray-400 h-11">ABOUT</NavLink>
                <NavLink onClick={()=>{setDisplaySidebar(false)}} to='contact' className="cursor-pointer hover:text-black px-2 py-1 rounded text-base border-b-2 border-gray-400 h-11">CONTACT</NavLink>
                <NavLink to=' 'className="cursor-pointer hover:text-black px-2 py-1 rounded text-base border-b-2  border-gray-400 h-11">ADMIN PANEL</NavLink>
            </nav>
        </div> 
    </div>
  )
}

export default Navbar