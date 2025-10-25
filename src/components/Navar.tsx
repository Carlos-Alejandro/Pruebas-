import React, { useState } from 'react';

const Navbar: React.FC = () => {
    const [activeButton, setActiveButton] = useState<string>('');
    const [showSearchBar, setShowSearchBar] = useState<boolean>(false);
    const [showMobileMenu, setShowMobileMenu] = useState<boolean>(false);

    const handleButtonClick = (buttonName: string) => {
        if (buttonName === 'BUSCAR') {
            setShowSearchBar(!showSearchBar);
            setActiveButton('');
        } else {
            setActiveButton(buttonName);
            setShowSearchBar(false);
        }
    };

    const toggleMobileMenu = () => {
        setShowMobileMenu(!showMobileMenu);
    };

    return (
        <section className="max-w-[192rem] ">
            {/* Desktop/Tablet Navbar */}
            <nav className="hidden lg:flex justify-between items-center px-4 md:px-8 py-4 sticky top-0 z-50 w-full border-b-1 border-[#261900]" 
                 style={{ 
                     backgroundColor: '#F1EBDF',
                     maxWidth: '192rem',
                     height: '11.2rem'
                 }}>
                <div className="flex gap-2 md:gap-4 items-center">
                    <button 
                        className={`px-2 md:px-4 py-2 uppercase tracking-wide transition-all duration-300 hover:bg-gray-100 rounded ${
                            activeButton === 'INICIO' ? 'text-[#261900] font-semibold' : 'text-[#666666] font-medium'
                        }`}
                        style={{ 
                            fontSize: '2rem', 
                            fontFamily: 'Montserrat, sans-serif'
                        }}
                        onClick={() => handleButtonClick('INICIO')}
                    >
                        INICIO
                    </button>
                    <button 
                        className={`px-2 md:px-4 py-2 uppercase tracking-wide transition-all duration-300 hover:bg-gray-100 rounded ${
                            activeButton === 'NOSOTROS' ? 'text-[#261900] font-semibold' : 'text-[#666666] font-medium'
                        }`}
                        style={{ 
                            fontSize: '2rem', 
                            fontFamily: 'Montserrat, sans-serif'
                        }}
                        onClick={() => handleButtonClick('NOSOTROS')}
                    >
                        NOSOTROS
                    </button>
                    <button 
                        className={`px-2 md:px-4 py-2 uppercase tracking-wide transition-all duration-300 hover:bg-gray-100 rounded ${
                            activeButton === 'TIENDA' ? 'text-[#261900] font-semibold' : 'text-[#666666] font-medium'
                        }`}
                        style={{ 
                            fontSize: '2rem', 
                            fontFamily: 'Montserrat, sans-serif'
                        }}
                        onClick={() => handleButtonClick('TIENDA')}
                    >
                        TIENDA
                    </button>
                    <button 
                        className={`px-2 md:px-4 py-2 uppercase tracking-wide transition-all duration-300 hover:bg-gray-100 rounded ${
                            activeButton === 'CONTACTO' ? 'text-[#261900] font-semibold' : 'text-[#666666] font-medium'
                        }`}
                        style={{ 
                            fontSize: '2rem', 
                            fontFamily: 'Montserrat, sans-serif'
                        }}
                        onClick={() => handleButtonClick('CONTACTO')}
                    >
                        CONTACTO
                    </button>
                </div>

                <div className="absolute left-1/2 transform -translate-x-1/2">
                    <h1 className="font-garibaldi text-[#261900] tracking-[2px] font-normal" style={{ fontSize: '4.4rem' }}>NEROLI</h1>
                </div>

                <div className="flex gap-2 md:gap-4 items-center">
                    {showSearchBar ? (
                        <input 
                            type="text" 
                            className="px-3 md:px-4 py-2 border border-gray-300 rounded w-64 md:w-80 outline-none focus:border-[#261900] transition-colors duration-300 font-semibold" 
                            style={{ fontSize: '1.8rem', fontFamily: 'Montserrat, sans-serif' }}
                            placeholder="Buscar productos..."
                            autoFocus
                        />
                    ) : (
                        <button 
                            className="px-2 md:px-4 py-2 font-medium text-[#666666] uppercase tracking-wide transition-all duration-300 hover:bg-gray-100 rounded"
                            style={{ fontSize: '2rem', fontFamily: 'Montserrat, sans-serif' }}
                            onClick={() => handleButtonClick('BUSCAR')}
                        >
                            BUSCAR
                        </button>
                    )}
                    <button 
                        className={`px-2 md:px-4 py-2 uppercase tracking-wide transition-all duration-300 hover:bg-gray-100 rounded ${
                            activeButton === 'CUENTA' ? 'text-[#261900] font-semibold' : 'text-[#666666] font-medium'
                        }`}
                        style={{ 
                            fontSize: '2rem', 
                            fontFamily: 'Montserrat, sans-serif'
                        }}
                        onClick={() => handleButtonClick('CUENTA')}
                    >
                        CUENTA
                    </button>
                    <button 
                        className={`px-2 md:px-4 py-2 uppercase tracking-wide transition-all duration-300 hover:bg-gray-100 rounded ${
                            activeButton === 'CARRITO' ? 'text-[#261900] font-semibold' : 'text-[#666666] font-medium'
                        }`}
                        style={{ 
                            fontSize: '2rem', 
                            fontFamily: 'Montserrat, sans-serif'
                        }}
                        onClick={() => handleButtonClick('CARRITO')}
                    >
                        CARRITO
                    </button>
                </div>
            </nav>

            {/* Mobile Navbar */}
            <nav className="lg:hidden flex justify-between items-center px-4 py-3 sticky top-0 z-50 w-full border-b-2 border-[#261900]"
                 style={{ 
                     backgroundColor: '#F1EBDF',
                     height: '6rem'
                 }}>
                <div>
                    <h1 className="font-garibaldi text-[#261900] tracking-[1px] font-normal text-2xl">NEROLI</h1>
                </div>
                
                <div>
                    <button 
                        className="font-medium text-[#666666] uppercase tracking-wide transition-all duration-300"
                        style={{ fontSize: '1.2rem', fontFamily: 'Montserrat, sans-serif' }}
                        onClick={toggleMobileMenu}
                    >
                        MENU
                    </button>
                </div>
            </nav>

            {/* Mobile Menu Dropdown */}
            {showMobileMenu && (
                <div className="lg:hidden absolute top-24 left-0 w-full z-40 border-b-2 border-[#261900]"
                     style={{ backgroundColor: '#F1EBDF' }}>
                    <div className="flex flex-col px-4 py-4 space-y-3">
                        <button 
                            className={`py-2 text-left uppercase tracking-wide transition-all duration-300 ${
                                activeButton === 'INICIO' ? 'text-[#261900] font-semibold' : 'text-[#666666] font-medium'
                            }`}
                            style={{ fontSize: '1.5rem', fontFamily: 'Montserrat, sans-serif' }}
                            onClick={() => {
                                handleButtonClick('INICIO');
                                setShowMobileMenu(false);
                            }}
                        >
                            INICIO
                        </button>
                        <button 
                            className={`py-2 text-left uppercase tracking-wide transition-all duration-300 ${
                                activeButton === 'NOSOTROS' ? 'text-[#261900] font-semibold' : 'text-[#666666] font-medium'
                            }`}
                            style={{ fontSize: '1.5rem', fontFamily: 'Montserrat, sans-serif' }}
                            onClick={() => {
                                handleButtonClick('NOSOTROS');
                                setShowMobileMenu(false);
                            }}
                        >
                            NOSOTROS
                        </button>
                        <button 
                            className={`py-2 text-left uppercase tracking-wide transition-all duration-300 ${
                                activeButton === 'TIENDA' ? 'text-[#261900] font-semibold' : 'text-[#666666] font-medium'
                            }`}
                            style={{ fontSize: '1.5rem', fontFamily: 'Montserrat, sans-serif' }}
                            onClick={() => {
                                handleButtonClick('TIENDA');
                                setShowMobileMenu(false);
                            }}
                        >
                            TIENDA
                        </button>
                        <button 
                            className={`py-2 text-left uppercase tracking-wide transition-all duration-300 ${
                                activeButton === 'CONTACTO' ? 'text-[#261900] font-semibold' : 'text-[#666666] font-medium'
                            }`}
                            style={{ fontSize: '1.5rem', fontFamily: 'Montserrat, sans-serif' }}
                            onClick={() => {
                                handleButtonClick('CONTACTO');
                                setShowMobileMenu(false);
                            }}
                        >
                            CONTACTO
                        </button>
                        <button 
                            className={`py-2 text-left uppercase tracking-wide transition-all duration-300 ${
                                activeButton === 'CUENTA' ? 'text-[#261900] font-semibold' : 'text-[#666666] font-medium'
                            }`}
                            style={{ fontSize: '1.5rem', fontFamily: 'Montserrat, sans-serif' }}
                            onClick={() => {
                                handleButtonClick('CUENTA');
                                setShowMobileMenu(false);
                            }}
                        >
                            CUENTA
                        </button>
                        <button 
                            className={`py-2 text-left uppercase tracking-wide transition-all duration-300 ${
                                activeButton === 'CARRITO' ? 'text-[#261900] font-semibold' : 'text-[#666666] font-medium'
                            }`}
                            style={{ fontSize: '1.5rem', fontFamily: 'Montserrat, sans-serif' }}
                            onClick={() => {
                                handleButtonClick('CARRITO');
                                setShowMobileMenu(false);
                            }}
                        >
                            CARRITO
                        </button>
                    </div>
                </div>
            )}
        </section>
    );
};

export default Navbar;