import { useEffect, useState } from 'react';
import NeroliBuilding from '../assets/images/Neroli.png';

export default function FooterBase() {
  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsTablet(width >= 641 && width <= 1024);
    };

    handleResize(); // ejecuta al cargar
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <footer
      className="
        w-[192rem] max-w-[100vw]
        h-[116rem]
        max-[1600px]:w-[160rem] max-[1600px]:h-[100rem]
        max-[1400px]:w-[140rem] max-[1400px]:h-[86rem]
        max-[1280px]:w-[120rem] max-[1280px]:h-[78rem]
        max-[900px]:w-[90rem] max-[900px]:h-auto
        bg-[#F1EBDF] text-[#261900] flex flex-col overflow-hidden
      "
    >
      {/* 🔹 Contenedor interno */}
      <div className="w-full mx-auto flex flex-col h-full">
        {/* Imagen superior */}
        <div
          className="flex-1 flex items-start justify-center"
          style={{ paddingBottom: isTablet ? '4rem' : '0' }}
        >
          <img
            src={NeroliBuilding}
            alt="Neroli building"
            className="
              object-contain
              w-[49.4rem] h-[46.6rem]
              max-[1600px]:w-[43rem] max-[1600px]:h-[40rem]
              max-[1400px]:w-[31rem] max-[1400px]:h-[22rem]
              max-[1280px]:w-[30rem] max-[1280px]:h-[28rem]
              max-[1024px]:w-[36rem] max-[1024px]:h-[32rem]
              max-[900px]:w-[32rem] max-[900px]:h-[28rem]
              max-[768px]:w-[27rem] max-[768px]:h-[25rem]
              max-[640px]:w-[21.3rem] max-[640px]:h-[20.2rem]
              max-[440px]:w-[21.37rem] max-[440px]:h-auto max-[440px]:mx-auto max-[440px]:mb-[8.33rem]
            "
          />
        </div>

        {/* Contenido inferior con línea exacta */}
        <div className="flex-1 border-t-[1px] border-[#261900]  m-0 p-0">
          {/* 💻 Desktop + Tablet */}
          <div
            className="
              flex items-stretch justify-between
              w-[159.5rem] h-[57rem] ml-[3.5rem] mr-[29rem]
              max-[1600px]:w-[130rem] max-[1600px]:mx-auto
              max-[1400px]:w-[110rem] max-[1400px]:mx-auto

              /* 🔹 Tablet ajustada */
              max-[1024px]:flex-col max-[1024px]:items-center 
              max-[1024px]:justify-start max-[1024px]:w-full 
              max-[1024px]:h-auto max-[1024px]:px-[3rem] max-[1024px]:py-[3rem] max-[1024px]:gap-[3rem]
              max-[640px]:hidden
            "
          >
            {/* Columna izquierda */}
            <div
              className="
                flex flex-col justify-between font-montserrat w-[42.6rem] h-full items-start text-left
                pb-[6.4rem] max-[1024px]:pb-[2rem]
                max-[1600px]:w-[38rem] max-[1400px]:w-[30rem]
                max-[1024px]:items-center max-[1024px]:text-center max-[1024px]:w-full
              "
            >
              {/* Newsletter */}
              <div className="mt-[8.4rem] max-[1024px]:mt-[2rem]">
                <h3
                  className="
                    font-semibold text-[clamp(1.8rem,2vw,2.4rem)] text-[#000000]
                    mb-[1rem]
                  "
                >
                  Newsletter
                </h3>

                <div className="relative w-[42.6rem] h-[4.3rem] max-[1024px]:w-[80%]">
                  <input
                    type="text"
                    placeholder="Email Address"
                    className="
                      w-full h-full bg-transparent border-0 border-b border-[#000000]
                      text-[1.6rem] font-medium text-[#666666]
                      outline-none appearance-none p-0
                    "
                  />
                  <span className="absolute right-[0rem] top-1/2 -translate-y-1/2">
                    <svg
                      width="15"
                      height="14"
                      viewBox="0 0 15 14"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-[1.7rem] h-[1.7rem]"
                    >
                      <path
                        d="M10.4925 0.671999L14.9405 7.232L10.4925 13.856H7.7085L11.9005 7.232L7.7085 0.671999H10.4925ZM12.5405 6.08V8.416H0.9565V6.08H12.5405Z"
                        fill="#261900"
                      />
                    </svg>
                  </span>
                </div>
              </div>

              {/* Texto inferior izquierda */}
              <p
                className="
                  font-montserrat font-semibold text-[#261900]
                  leading-[100%] tracking-[0.08em]
                  text-[clamp(1.6rem,1.2vw,2rem)]
                  w-[clamp(14rem,9vw,17.5rem)]
                  h-[clamp(2rem,1.5vw,2.4rem)]
                  mt-auto
                  max-[1024px]:mt-[3rem]
                "
                style={{
                  letterSpacing: '0.08em',
                  lineHeight: '100%',
                }}
              >
                www.neroli.mx
              </p>
            </div>

            {/* Columna derecha */}
            <div
              className="
                border-l border-[#261900]
                flex flex-col justify-between font-montserrat w-[62.8rem] h-full pl-[4rem] 
                pb-[6.4rem] max-[1024px]:pb-[2rem]
                max-[1600px]:w-[55rem] max-[1400px]:w-[45rem]
                max-[1024px]:border-none max-[1024px]:pl-0 max-[1024px]:w-full max-[1024px]:mt-[2rem]
              "
            >
              {/* NAV */}
              <div
                className="
                  pt-[8.4rem] flex gap-[clamp(4rem,5vw,8rem)]
                  text-[#261900] font-montserrat justify-start items-start
                  max-[1024px]:pt-[2rem]
                  max-[1024px]:justify-center max-[1024px]:flex-wrap max-[1024px]:gap-[4rem]
                "
              >
                {/* NEROLI */}
                <div className="w-[clamp(8rem,6vw,9.3rem)] text-left">
                  <h4
                    className="
                      font-semibold text-[clamp(1.6rem,1.2vw,2rem)]
                      mb-[clamp(1rem,1vw,1.4rem)] 
                    "
                  >
                    NEROLI
                  </h4>
                  <ul
                    className="
                      text-[#666666] font-medium list-none
                      text-[clamp(1.6rem,1.2vw,2rem)] 
                      leading-[clamp(2.6rem,1.8vw,3rem)]
                      space-y-[clamp(0.4rem,0.5vw,0.6rem)]
                    "
                  >
                    <li>Shop</li>
                    <li>Nosotros</li>
                    <li>Blog</li>
                    <li>Contacto</li>
                  </ul>
                </div>

                {/* CUENTA */}
                <div className="w-[clamp(20rem,12vw,22.9rem)] text-left">
                  <h4
                    className="
                      font-semibold text-[clamp(1.6rem,1.2vw,2rem)]
                      mb-[clamp(1rem,1vw,1.4rem)]
                    "
                  >
                    CUENTA
                  </h4>
                  <ul
                    className="
                      text-[#666666] font-medium list-none
                      text-[clamp(1.6rem,1.2vw,2rem)]
                      leading-[clamp(2.6rem,1.8vw,3rem)]
                      space-y-[clamp(0.4rem,0.5vw,0.6rem)]
                    "
                  >
                    <li>Iniciar sesión</li>
                    <li>Registrarse</li>
                    <li>Políticas de privacidad</li>
                    <li>FAQ’s</li>
                  </ul>
                </div>

                {/* REDES */}
                <div className="w-[clamp(10rem,8vw,10.5rem)] text-left">
                  <h4
                    className="
                      font-semibold text-[clamp(1.6rem,1.2vw,2rem)]
                      mb-[clamp(1rem,1vw,1.4rem)]
                    "
                  >
                    REDES
                  </h4>
                  <ul
                    className="
                      text-[#666666] font-medium list-none
                      text-[clamp(1.6rem,1.2vw,2rem)]
                      leading-[clamp(2.6rem,1.8vw,3rem)]
                      space-y-[clamp(0.4rem,0.5vw,0.6rem)]
                    "
                  >
                    <li>Instagram</li>
                    <li>Facebook</li>
                  </ul>
                </div>
              </div>

              {/* © alineado */}
              <p className="font-montserrat font-medium text-[#666666] text-[2rem] leading-[3rem] text-center max-[1024px]:mt-[3rem]">
                © Neroli Store 2022
              </p>
            </div>
          </div>

          {/* 📱 Mobile */}
          <div
            className="
              hidden max-[640px]:flex flex-col
              w-[38rem] mx-auto pt-[5.9rem]
              text-[#261900] font-montserrat
            "
          >
            {/* Newsletter */}
            <div>
              <h3
                className="
                  font-semibold text-[clamp(1.8rem,2vw,2.4rem)]
                  text-[#000000] mb-[1rem]
                "
              >
                Newsletter
              </h3>

              <div className="relative w-full h-[3.8rem]">
                <input
                  type="text"
                  placeholder="Email Address"
                  className="w-full h-full bg-transparent border-0 border-b border-[#000000] text-[1.6rem] font-medium text-[#666666] outline-none appearance-none p-0"
                />
                <span className="absolute right-[0rem] top-1/2 -translate-y-1/2">
                  <svg
                    width="15"
                    height="14"
                    viewBox="0 0 15 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-[1.7rem] h-[1.7rem]"
                  >
                    <path
                      d="M10.4925 0.671999L14.9405 7.232L10.4925 13.856H7.7085L11.9005 7.232L7.7085 0.671999H10.4925ZM12.5405 6.08V8.416H0.9565V6.08H12.5405Z"
                      fill="#261900"
                    />
                  </svg>
                </span>
              </div>
            </div>

            {/* 🔹 Línea divisoria */}
            <div className="h-px bg-[#261900] w-screen ml-[calc(50%-50vw)] mt-[9.1rem]" />

            {/* 🔹 Navegación móvil */}
            <div
              className="
                flex flex-col 
                w-[28.9rem] h-[33.5rem] mt-[3.1rem]
                text-[#261900] font-montserrat
              "
            >
              {/* NEROLI y REDES */}
              <div className="flex justify-between items-start">
                <div className="w-[7.5rem] h-[14.8rem]">
                  <h4
                    className="font-semibold text-[1.6rem] leading-[2rem] text-[#261900] mb-[1.4rem]"
                  >
                    NEROLI
                  </h4>
                  <ul className="font-medium text-[1.6rem] leading-[2.8rem] text-[#666666] space-y-[0.2rem] list-none">
                    <li>Shop</li>
                    <li>Nosotros</li>
                    <li>Blog</li>
                    <li>Contacto</li>
                  </ul>
                </div>

                <div className="w-[8.4rem] h-[9.2rem]">
                  <h4 className="font-semibold text-[1.6rem] leading-[2rem] text-[#261900] mb-[1.4rem]">
                    REDES
                  </h4>
                  <ul className="font-medium text-[1.6rem] leading-[2.8rem] text-[#666666] space-y-[0.2rem] list-none">
                    <li>Instagram</li>
                    <li>Facebook</li>
                  </ul>
                </div>
              </div>

              {/* CUENTA */}
              <div className="w-[18.3rem] h-[14.8rem] mt-[3.1rem]">
                <h4 className="font-semibold text-[1.6rem] leading-[2rem] text-[#261900] mb-[1.4rem]">
                  CUENTA
                </h4>
                <ul className="font-medium text-[1.6rem] leading-[2.8rem] text-[#666666] space-y-[0.2rem] list-none">
                  <li>Iniciar sesión</li>
                  <li>Registrarse</li>
                  <li>Políticas de privacidad</li>
                  <li>FAQ’s</li>
                </ul>
              </div>
            </div>

            {/* 📍 Copyright */}
            <div className="mt-[14.8rem] pt-0">
              <p className="font-montserrat font-medium text-[#666666] text-[1.6rem] text-center leading-[3rem]">
                © Neroli Store 2022
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
