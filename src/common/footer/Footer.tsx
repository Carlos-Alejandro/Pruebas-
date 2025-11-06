// src/common/footer/Footer.tsx
const TABS = ["EMAIL", "OFICINAS", "REDES", "LEGAL"];

export default function Footer() {
  return (
    <footer>
      <div className="container mx-auto max-w-[1440px] px-61">
        <div className="py-14">
          {/* Banda central más angosta */}
          <div className="mx-auto max-w-[820px] px-16">
            <div className="flex items-center justify-between flex-wrap gap-x-8 gap-y-4">
              {TABS.map((label) => (
                <div key={label} className="inline-flex items-center gap-2 select-none">
                  <span className="uppercase font-medium text-[17px] text-[#A6A6A6] tracking-[0.02em]">
                    {label}
                  </span>
                  <span className="text-[#A6A6A6] text-[17px] leading-none">+</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
