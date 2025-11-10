const TABS = ["EMAIL", "OFICINAS", "REDES", "LEGAL"];

export default function Footer() {
  return (
    <footer className="mt-auto w-full pb-[6px]">
      <div className="mx-auto max-w-[1440px] px-4">
        <div className="pt-2 pb-2 md:pt-3 md:pb-3">
          {/* un poco más de separación y ancho */}
          <div className="mx-auto max-w-full md:max-w-[700px] px-0 md:px-6">
            <div
              className="
                flex flex-col md:flex-row items-center
                justify-center md:justify-center
                flex-wrap
                gap-x-6 md:gap-x-8  /* ← un poco más separados */
                gap-y-1
              "
            >
              {TABS.map((label) => (
                <div
                  key={label}
                  className="inline-flex items-center gap-1.5 select-none"
                >
                  <span className="uppercase font-medium text-[13px] md:text-[14px] text-[#A6A6A6] tracking-[0.01em] leading-none">
                    {label}
                  </span>
                  <span className="text-[#A6A6A6] text-[13px] md:text-[14px] leading-none">+</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
