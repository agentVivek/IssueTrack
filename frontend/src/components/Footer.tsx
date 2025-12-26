// import { assets } from '../assets/assets.ts'

const Footer = () => {
  return (
    <div>
    <footer className="bg-white text-gray-700 py-12">
  <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">

    <div className="flex flex-col items-center md:items-start">
      <img  className='w-32'/>
      <p className="text-sm">
        Building awesome things, one line of code at a time.
      </p>
    </div>
    <div className="flex justify-center">
      <ul className="space-y-2 text-center">
        <li><a href="" className="hover:text-blue-600 transition">Home</a></li>
        <li><a href="#" className="hover:text-blue-600 transition">About</a></li>
        <li><a href="#" className="hover:text-blue-600 transition">Services</a></li>
        <li><a href="#" className="hover:text-blue-600 transition">Contact</a></li>
      </ul>
    </div>


    <div className="flex flex-col items-center md:items-end space-y-4 text-gray-700">
  <div className="flex space-x-4">
    <a href="#" aria-label="Twitter" className="hover:text-blue-600 transition">
      <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
        <path d="M22.46 6c-.77.35-1.6.58-2.46.69a4.3 4.3 0 001.88-2.37 8.59 8.59 0 01-2.72 1.04 4.28 4.28 0 00-7.3 3.9A12.14 12.14 0 013 4.6a4.28 4.28 0 001.33 5.72 4.25 4.25 0 01-1.94-.54v.05a4.28 4.28 0 003.43 4.2 4.3 4.3 0 01-1.93.07 4.28 4.28 0 004 2.98 8.6 8.6 0 01-6.35 1.78 12.15 12.15 0 006.58 1.93c7.9 0 12.22-6.55 12.22-12.23 0-.19-.01-.37-.02-.56A8.72 8.72 0 0024 4.56a8.51 8.51 0 01-2.54.7z"/>
      </svg>
    </a>

    <a href="#" aria-label="Facebook" className="hover:text-blue-600 transition">
      <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
        <path d="M22 12a10 10 0 10-11.5 9.86v-6.98h-2.1v-2.88h2.1V9.5c0-2.07 1.23-3.22 3.1-3.22.9 0 1.84.16 1.84.16v2.02h-1.04c-1.03 0-1.35.64-1.35 1.3v1.56h2.3l-.37 2.88h-1.93v6.98A10 10 0 0022 12z"/>
      </svg>
    </a>


    <a href="#" aria-label="Instagram" className="hover:text-blue-600 transition">
      <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
        <path d="M7 2C4.24 2 2 4.24 2 7v10c0 2.76 2.24 5 5 5h10c2.76 0 5-2.24 5-5V7c0-2.76-2.24-5-5-5H7zm10 2c1.65 0 3 1.35 3 3v10c0 1.65-1.35 3-3 3H7c-1.65 0-3-1.35-3-3V7c0-1.65 1.35-3 3-3h10zm-5 3a5 5 0 100 10 5 5 0 000-10zm0 2a3 3 0 110 6 3 3 0 010-6zm4.5-.5a1 1 0 100 2 1 1 0 000-2z"/>
      </svg>
    </a>
  </div>
  <p className="text-sm">support@forever.com</p>
</div>
  </div>

  <div className="border-t border-gray-200 mt-8 pt-6 text-center text-xs">
    © 2025 Forever. All rights reserved.
  </div>
</footer>
    </div>
  )
}

export default Footer