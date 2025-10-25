import React, { useState } from "react";

import ImgSillon from "../assets/images/category/Sillon.png";
import ImgEstanteria from "../assets/images/category/Estanteria.png";
import ImgMesaEnLaPicina from "../assets/images/category/Mesaenlapicina.png";
import ImgBuro from "../assets/images/category/Buro.png";

const BG = "#F1EBDF";
const BTN_LEFT_BG = "#BA9C76";  // beige
const BTN_RIGHT_BG = "#3a3f1e"; // verde oliva
const BTN_TEXT = "#F1EBDF";
const PRICE_COLOR = "#261900";
const NAME_COLOR = "#666666";

type ProductStatus = "SOLD OUT" | "COMING SOON" | "AVAILABLE";
export interface DetailProduct {
  id: string;
  name: string;
  price: number;
  currency: string;
  status: ProductStatus;
  img: string;
}

interface RecProduct {
  id: string;
  name: string;
  price: number;
  currency: string;
  status: ProductStatus;
  img: string;
}

function formatPriceES(value: number) {
  return value.toLocaleString("es-ES", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

/* mock recomendaciones */
const recProducts: RecProduct[] = [
  {
    id: "r1",
    name: "Rusim Glass Side B",
    price: 55350,
    currency: "MXN",
    status: "SOLD OUT",
    img: ImgEstanteria,
  },
  {
    id: "r2",
    name: "Rusim Bed Queen",
    price: 64400,
    currency: "MXN",
    status: "SOLD OUT",
    img: ImgMesaEnLaPicina,
  },
  {
    id: "r3",
    name: "Rusim Buro",
    price: 11900,
    currency: "MXN",
    status: "SOLD OUT",
    img: ImgBuro,
  },
];

/* card recomendada igual que en tu mock “TE PODRÍA INTERESAR…” */
const RecoCard: React.FC<{ product: RecProduct }> = ({ product }) => {
  return (
    <div
      className="
        flex flex-col bg-transparent
        w-full
        max-w-[40rem]
        lg:max-w-[36rem]
        2xl:max-w-[40rem]
      "
      style={{ backgroundColor: BG }}
    >
      <div
        className="relative w-full"
        style={{ aspectRatio: "593 / 697" }}
      >
        <img
          src={product.img}
          alt={product.name}
          className="h-full w-full object-cover"
        />

        {/* overlay SOLD OUT */}
        <div
          className="
            absolute inset-0
            bg-[rgba(0,0,0,0.45)]
            flex items-start justify-center
            pt-[20rem]
            text-center
          "
        >
          <span
            className="
              uppercase
              font-semibold
              text-[1.6rem] leading-[1.6rem]
              md:text-[2rem] md:leading-[2rem]
            "
            style={{
              color: BG,
              fontFamily: "'Montserrat', sans-serif",
              letterSpacing: "0",
            }}
          >
            {product.status}
          </span>
        </div>

        {/* botones fijos abajo */}
        <div
          className="
            absolute left-0 right-0 bottom-0
            flex
            uppercase
            tracking-[0]
          "
          style={{ fontFamily: "'Montserrat', sans-serif" }}
        >
          <button
            className="
              w-1/2
              h-[5.8rem]
              flex items-center justify-center
              text-center
              font-bold
              text-[1.4rem] leading-[1.4rem]
            "
            style={{
              backgroundColor: BTN_LEFT_BG,
              color: BTN_TEXT,
              letterSpacing: "0",
            }}
          >
            VER MÁS
          </button>
          <button
            className="
              w-1/2
              h-[5.8rem]
              flex items-center justify-center
              text-center
              font-bold
              text-[1.4rem] leading-[1.4rem]
            "
            style={{
              backgroundColor: BTN_RIGHT_BG,
              color: BTN_TEXT,
              letterSpacing: "0",
            }}
          >
            AÑADIR AL CARRO
          </button>
        </div>
      </div>

      {/* nombre + precio */}
      <div
        className="
          flex flex-wrap items-baseline justify-between
          px-[1.6rem] py-[1.6rem]
        "
        style={{ backgroundColor: BG }}
      >
        <span
          className="
            font-medium
            text-[1.8rem] leading-[1.8rem]
            md:text-[2rem] md:leading-[2rem]
          "
          style={{
            color: NAME_COLOR,
            fontFamily: "'Montserrat', sans-serif",
            letterSpacing: "0",
          }}
        >
          {product.name}
        </span>

        <span
          className="flex flex-wrap items-baseline gap-[0.4rem] text-right"
          style={{
            fontFamily: "'Montserrat', sans-serif",
            color: PRICE_COLOR,
          }}
        >
          <span
            className="
              font-semibold
              text-[1.8rem] leading-[1.8rem]
              md:text-[2rem] md:leading-[2rem]
            "
            style={{ letterSpacing: "0" }}
          >
            ${formatPriceES(product.price)}
          </span>
          <span
            className="
              font-semibold uppercase
              text-[1rem] leading-[1.2rem]
              md:text-[1.1rem] md:leading-[1.3rem]
            "
            style={{ letterSpacing: "0" }}
          >
            {product.currency}
          </span>
        </span>
      </div>
    </div>
  );
};

const ProductDetail: React.FC<{
  product: DetailProduct;
  onBack: () => void;
}> = ({ product, onBack }) => {
  // índice de imagen (por si luego haces slider real)
  const [currentImageIndex] = useState(0);

  return (
    <section
      className="w-full flex justify-center overflow-x-hidden"
      style={{ backgroundColor: BG }}
    >
      <div
        className="
          w-full
          max-w-[185.1rem]
          px-[2rem]
          md:px-[3.5rem]
          pt-[2rem]
          pb-[6rem]
        "
        style={{ backgroundColor: BG }}
      >
        {/* link Volver */}
        <button
          onClick={onBack}
          className="
            text-left
            text-[1.2rem] leading-[1.6rem]
            underline-offset-4
          "
          style={{
            fontFamily: "'Montserrat', sans-serif",
            color: "#000000",
            textDecoration: "none",
          }}
        >
          {/* “volver” arriba a la izquierda en tu screenshot */}
          • Volver
        </button>

        {/* BLOQUE SUPERIOR: imagen + info */}
        <div
          className="
            mt-[1.6rem]
            flex flex-col
            lg:flex-row
            border-[0.1rem] border-[#00000020]
            bg-[rgba(0,0,0,0)]
          "
          style={{ backgroundColor: BG }}
        >
          {/* IZQ imagen grande */}
          <div
            className="
              w-full
              lg:w-1/2
              border-b-[0.1rem] lg:border-b-0
              border-[#00000020]
            "
            style={{ backgroundColor: BG }}
          >
            <div
              className="w-full"
              style={{
                aspectRatio: "593 / 697",
              }}
            >
              <img
                src={product.img || ImgSillon}
                alt={product.name}
                className="h-full w-full object-cover"
              />
            </div>

            {/* dots carrusel */}
            <div className="flex justify-center items-center py-[1rem]">
              <div className="flex gap-[0.6rem]">
                {[0,1,2,3].map(i=>(
                  <span
                    key={i}
                    className="
                      w-[0.6rem] h-[0.6rem] rounded-full border border-white
                    "
                    style={{
                      backgroundColor:
                        currentImageIndex === i ? "white" : "transparent",
                    }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* DER info */}
          <div
            className="
              w-full
              lg:w-1/2
              flex flex-col
              border-l-0 lg:border-l-[0.1rem]
              border-[#00000020]
              p-[2rem]
              md:p-[3rem]
              xl:p-[4rem]
              gap-[2rem]
            "
            style={{ backgroundColor: BG }}
          >
            {/* título + precio */}
            <div
              className="
                flex flex-col
                md:flex-row
                md:items-start
                md:justify-between
                gap-[1.6rem]
              "
            >
              <h1
                className="
                  font-medium
                  text-[2.8rem] leading-[2.8rem]
                  md:text-[3rem] md:leading-[3rem]
                "
                style={{
                  color: "#000000",
                  fontFamily: "'Montserrat', sans-serif",
                  letterSpacing: "0",
                }}
              >
                {product.name}
              </h1>

              <div
                className="flex flex-wrap items-baseline gap-[0.4rem]"
                style={{
                  fontFamily: "'Montserrat', sans-serif",
                  color: PRICE_COLOR,
                }}
              >
                <span
                  className="
                    font-semibold
                    text-[2.4rem] leading-[2.4rem]
                  "
                  style={{ letterSpacing: "0" }}
                >
                  ${formatPriceES(product.price)}
                </span>
                <span
                  className="
                    font-semibold uppercase
                    text-[1.1rem] leading-[1.3rem]
                  "
                  style={{ letterSpacing: "0" }}
                >
                  {product.currency}
                </span>
              </div>
            </div>

            {/* specs / descripción */}
            <div
              className="
                grid
                grid-cols-1
                md:grid-cols-2
                gap-[2rem]
                text-[1.2rem] leading-[1.6rem]
                md:text-[1.4rem] md:leading-[1.8rem]
              "
              style={{
                fontFamily: "'Montserrat', sans-serif",
                color: "#000000",
              }}
            >
              <div className="flex flex-col gap-[1rem]">
                <div>
                  <div
                    className="
                      uppercase font-semibold
                      text-[1.2rem] leading-[1.4rem]
                    "
                    style={{ color: "#000000", letterSpacing: "0" }}
                  >
                    ESTILO
                  </div>
                  <div
                    className="
                      mt-[0.6rem] font-medium
                      text-[1.2rem] leading-[1.6rem]
                    "
                    style={{
                      color: "#000000",
                      fontWeight: 500,
                      letterSpacing: "0",
                    }}
                  >
                    ESCANDINAVO/MINIMALISTA
                  </div>
                </div>

                <div className="mt-[1rem]">
                  <div
                    className="
                      uppercase font-semibold
                      text-[1.2rem] leading-[1.4rem]
                    "
                    style={{ color: "#000000", letterSpacing: "0" }}
                  >
                    DESCRIPCIÓN
                  </div>
                  <div
                    className="
                      mt-[0.6rem] font-medium
                      text-[1.2rem] leading-[1.6rem]
                    "
                    style={{
                      color: "#000000",
                      fontWeight: 500,
                      letterSpacing: "0",
                    }}
                  >
                    Acero al carbón forjado tallado y en acabado pavonado, asiento
                    y respaldo recubierto en espuma de poliuretano de alta
                    densidad tapizado
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-[1rem]">
                <div>
                  <div
                    className="
                      uppercase font-semibold
                      text-[1.2rem] leading-[1.4rem]
                    "
                    style={{ color: "#000000", letterSpacing: "0" }}
                  >
                    DIMENSIONES
                  </div>
                  <div
                    className="
                      mt-[0.6rem] font-medium
                      text-[1.2rem] leading-[1.6rem]
                    "
                    style={{
                      color: "#000000",
                      fontWeight: 500,
                      letterSpacing: "0",
                    }}
                  >
                    80 CM (alto) X 50 CM (ancho) X 55 CM (fondo)
                  </div>
                </div>
              </div>
            </div>

            {/* botones comprar / añadir */}
            <div
              className="
                flex flex-col
                sm:flex-row
                gap-[1.6rem]
                pt-[1rem]
                pb-[2rem]
              "
            >
              <button
                className="
                  flex-1
                  h-[5.8rem]
                  flex items-center justify-center text-center
                  font-bold
                  text-[1.4rem] leading-[1.4rem]
                  tracking-[0]
                  uppercase
                "
                style={{
                  backgroundColor: BTN_LEFT_BG,
                  color: BTN_TEXT,
                  fontFamily: "'Montserrat', sans-serif",
                  letterSpacing: "0",
                }}
              >
                COMPRAR
              </button>

              <button
                className="
                  flex-1
                  h-[5.8rem]
                  flex items-center justify-center text-center
                  font-bold
                  text-[1.4rem] leading-[1.4rem]
                  tracking-[0]
                  uppercase
                "
                style={{
                  backgroundColor: BTN_RIGHT_BG,
                  color: BTN_TEXT,
                  fontFamily: "'Montserrat', sans-serif",
                  letterSpacing: "0",
                }}
              >
                AÑADIR AL CARRO
              </button>
            </div>
          </div>
        </div>

        {/* separador */}
        <div
          className="w-full border-t-[0.1rem] border-[#000000] mt-[2rem] mb-[2rem]"
          style={{ opacity: 0.3 }}
        />

        {/* RECOMENDADOS */}
        <div className="flex flex-col" style={{ backgroundColor: BG }}>
          <h2
            className="
              font-semibold
              uppercase
              text-[2rem] leading-[2rem]
              md:text-[2.4rem] md:leading-[2.8rem]
              tracking-[0]
              mb-[3rem]
            "
            style={{
              color: "#000000",
              fontFamily: "'Montserrat', sans-serif",
              letterSpacing: "0",
            }}
          >
            TE PODRÍA INTERESAR…
          </h2>

          <div
            className="
              grid
              grid-cols-1
              md:grid-cols-2
              lg:grid-cols-3
              gap-x-[3.5rem]
              gap-y-[6rem]
            "
          >
            {recProducts.map((rp) => (
              <RecoCard key={rp.id} product={rp} />
            ))}
          </div>
        </div>

        {/* spacing bottom */}
        <div className="h-[6rem]" />
      </div>
    </section>
  );
};

export default ProductDetail;
