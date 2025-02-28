

const Footer: React.FC = () => {
  return (
    <div className='border-t border-zinc-400'>
        <footer className="text-gray-600 px-4 py-8 md:py-12">
            <div className="max-w-6xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

                <div className="space-y-4">
                    <div className="flex gap-2">
                        <svg
                            xmlns="http://www.w3.org/2000/svg" width="24" height="24" 
                            viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" 
                            strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-palette text-sky-500 size-8">
                            <circle cx="13.5" cy="6.5" r=".5" fill="currentColor"/>
                            <circle cx="17.5" cy="10.5" r=".5" fill="currentColor"/>
                            <circle cx="8.5" cy="7.5" r=".5" fill="currentColor"/>
                            <circle cx="6.5" cy="12.5" r=".5" fill="currentColor"/>
                            <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/>
                        </svg>                
                        <h1 className="font-bold text-white text-2xl">DrawTogether</h1>
                    </div> 
                    <p className="text-sm leading-6">
                    Create, collaborate, and bring your ideas to life with the world's most powerful collaborative drawing platform.
                    </p>
                </div>

                <div className="space-y-2">
                    <h3 className="text-lg font-semibold text-white">Product</h3>
                    <ul className="space-y-2">
                    {['Features', 'Pricing', 'Use Cases', 'Security'].map((item) => (
                        <li key={item}>
                        <a href="#" className="text-sm hover:text-white transition-colors">
                            {item}
                        </a>
                        </li>
                    ))}
                    </ul>
                </div>

                <div className="space-y-2">
                    <h3 className="text-lg font-semibold text-white">Company</h3>
                    <ul className="space-y-2">
                    {['About', 'Blog', 'Careers', 'Contact'].map((item) => (
                        <li key={item}>
                        <a href="#" className="text-sm hover:text-white transition-colors">
                            {item}
                        </a>
                        </li>
                    ))}
                    </ul>
                </div>

                <div className="space-y-2">
                    <h3 className="text-lg font-semibold text-white">Legal</h3>
                    <ul className="space-y-2">
                    {['Privacy', 'Terms', 'Security', 'Cookies'].map((item) => (
                        <li key={item}>
                        <a href="#" className="text-sm hover:text-white transition-colors">
                            {item}
                        </a>
                        </li>
                    ))}
                    </ul>
                </div>
                </div>
            </div>
        </footer>
    </div>
  );
};

export default Footer;