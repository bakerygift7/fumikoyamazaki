export default function Footer() {
  return (
    <footer className="bg-white py-20 border-t border-gray-100">
      <div className="container mx-auto px-6 text-center">
        <div className="mb-12">
          <h2 className="font-mincho text-3xl font-bold text-charcoal">Fumiko Yamazaki</h2>
          <p className="text-pink-600 font-bold tracking-[0.4em] text-xs mt-3 uppercase">運動指導者育成コーチ</p>
        </div>
        
        {/* SNS Links */}
        <div className="flex justify-center gap-8 mb-12">
          <a href="https://www.instagram.com/fumiko.bloom/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-pink-500 transition-colors font-gothic font-bold tracking-wider text-sm">
            Instagram
          </a>
          <a href="https://www.threads.com/@fumiko.bloom?hl=ja" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-pink-500 transition-colors font-gothic font-bold tracking-wider text-sm">
            Threads
          </a>
          <a href="https://note.com/fumikoara" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-pink-500 transition-colors font-gothic font-bold tracking-wider text-sm">
            Note
          </a>
        </div>

        <p className="text-sm text-gray-400 font-gothic">
          &copy; {new Date().getFullYear()} Fumiko Yamazaki. All Rights Reserved.
        </p>
      </div>
    </footer>
  )
}
