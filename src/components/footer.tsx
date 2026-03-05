const IconInstagram = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <circle cx="12" cy="12" r="4"/>
    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
  </svg>
)

const IconThreads = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 192 192" fill="currentColor">
    <path d="M141.537 88.988a66 66 0 0 0-2.518-1.143c-1.482-27.307-16.403-42.94-41.457-43.1h-.34c-14.986 0-27.449 6.396-35.12 18.036l13.779 9.452c5.73-8.695 14.724-10.548 21.348-10.548h.229c8.249.053 14.474 2.452 18.503 7.129 2.932 3.405 4.893 8.111 5.864 14.05-7.314-1.243-15.224-1.626-23.68-1.141-23.82 1.371-39.134 15.264-38.105 34.568.522 9.792 5.4 18.216 13.735 23.719 7.047 4.652 16.124 6.927 25.557 6.412 12.458-.683 22.231-5.436 29.049-14.127 5.178-6.6 8.453-15.153 9.899-25.93 5.937 3.583 10.337 8.298 12.767 13.966 4.132 9.635 4.373 25.468-8.546 38.376-11.319 11.308-24.925 16.2-45.488 16.351-22.809-.169-40.06-7.484-51.275-21.742C35.236 139.966 29.808 120.682 29.605 96c.203-24.682 5.631-43.966 16.133-57.317C57.053 24.425 74.304 17.11 97.113 16.94c22.96.17 40.526 7.52 52.208 21.847 5.73 7.08 10.066 16.068 12.928 26.57l16.175-4.311c-3.499-12.88-9.026-23.945-16.562-33.054C147.333 10.424 125.223 1.217 97.35 1.001h-.238C69.395 1.217 47.562 10.457 32.966 27.501 19.769 42.91 13.028 64.927 12.798 96.004l-.001.996.001.996c.23 31.077 6.971 53.094 20.168 68.503C47.562 181.543 69.395 190.783 97.112 191h.237c24.434-.185 41.624-6.525 55.807-20.697 18.773-18.762 18.216-42.653 12.025-57.139-4.333-10.108-12.556-18.317-23.644-23.176Zm-41.232 22.105c-10.426.583-21.24-4.097-21.795-14.101-.397-7.442 5.296-15.745 22.462-16.735 1.966-.113 3.895-.169 5.79-.169 6.235 0 12.068.606 17.37 1.765-1.977 24.702-13.074 28.658-23.827 29.24Z"/>
  </svg>
)

const IconNote = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
    <path d="M4 4C4 2.895 4.895 2 6 2H14.172C14.702 2 15.211 2.211 15.586 2.586L19.414 6.414C19.789 6.789 20 7.298 20 7.828V20C20 21.105 19.105 22 18 22H6C4.895 22 4 21.105 4 20V4ZM13 3.5V7C13 7.552 13.448 8 14 8H17.5L13 3.5ZM8 11C7.448 11 7 11.448 7 12C7 12.552 7.448 13 8 13H16C16.552 13 17 12.552 17 12C17 11.448 16.552 11 16 11H8ZM8 15C7.448 15 7 15.448 7 16C7 16.552 7.448 17 8 17H13C13.552 17 14 16.552 14 16C14 15.448 13.552 15 13 15H8Z"/>
  </svg>
)

export default function Footer() {
  return (
    <footer className="bg-white py-20 border-t border-gray-100">
      <div className="container mx-auto px-6 text-center">
        <div className="mb-12">
          <h2 className="font-mincho text-3xl font-bold text-charcoal">Fumiko Yamazaki</h2>
          <p className="text-pink-600 font-bold tracking-[0.4em] text-xs mt-3 uppercase">運動指導者育成コーチ</p>
        </div>

        {/* SNS Icons */}
        <div className="flex justify-center gap-6 mb-12">
          <a href="https://www.instagram.com/fumiko.bloom/" target="_blank" rel="noopener noreferrer"
            className="w-11 h-11 flex items-center justify-center rounded-full bg-gray-50 text-gray-400 hover:bg-pink-50 hover:text-pink-500 transition-all duration-300 hover:scale-110">
            <IconInstagram />
          </a>
          <a href="https://www.threads.com/@fumiko.bloom?hl=ja" target="_blank" rel="noopener noreferrer"
            className="w-11 h-11 flex items-center justify-center rounded-full bg-gray-50 text-gray-400 hover:bg-gray-100 hover:text-gray-800 transition-all duration-300 hover:scale-110">
            <IconThreads />
          </a>
          <a href="https://note.com/fumikoara" target="_blank" rel="noopener noreferrer"
            className="w-11 h-11 flex items-center justify-center rounded-full bg-gray-50 text-gray-400 hover:bg-green-50 hover:text-green-600 transition-all duration-300 hover:scale-110">
            <IconNote />
          </a>
        </div>

        <p className="text-sm text-gray-400 font-gothic">
          &copy; {new Date().getFullYear()} Fumiko Yamazaki. All Rights Reserved.
        </p>
      </div>
    </footer>
  )
}
