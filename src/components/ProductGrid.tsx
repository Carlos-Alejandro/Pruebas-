import React, { useState } from "react";
import ProductDetail, { type DetailProduct } from "./ProductDetail";

import ImgBuro from "../assets/images/category/Buro.png";
import ImgEstanteria from "../assets/images/category/Estanteria.png";
import ImgMesa from "../assets/images/category/Mesa.png";
import ImgMesaConFiguras from "../assets/images/category/Mesaconfiguras.png";
import ImgMesaConLibro from "../assets/images/category/Mesaconlibro.png";
import ImgMesaEnLaPicina from "../assets/images/category/Mesaenlapicina.png";
import ImgSilla from "../assets/images/category/Silla.png";
import ImgSillon from "../assets/images/category/Sillon.png";

/* ---------- Tipos ---------- */

type ProductStatus = "SOLD OUT" | "COMING SOON" | "AVAILABLE";

interface ProductItem {
  id: string;
  name: string;
  price: number;
  currency: string;
  status: ProductStatus;
  img: string;
}

/* ---------- Constantes de estilo ---------- */

const CTA_LEFT_BG = "#BA9C76";   // VER MÁS
const CTA_RIGHT_BG = "#3a3f1e";  // AÑADIR AL CARRO
const CTA_TEXT = "#F1EBDF";      // texto botones
const SECTION_BG = "#F1EBDF";    // fondo crema

/* Formato de precio tipo $65.300,00 */
function formatPriceES(value: number) {
  return value.toLocaleString("es-ES", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

/* ---------- Mock data ---------- */

const productsMock: ProductItem[] = [
  {
    id: "1",
    name: "Rusim Sófa",
    price: 65300,
    currency: "MXN",
    status: "SOLD OUT",
    img: ImgSillon,
  },
  {
    id: "2",
    name: "Rusim Coffee T",
    price: 33700,
    currency: "MXN",
    status: "SOLD OUT",
    img: ImgMesaConFiguras,
  },
  {
    id: "3",
    name: "Rusim Glass Side B",
    price: 55350,
    currency: "MXN",
    status: "SOLD OUT",
    img: ImgEstanteria,
  },
  {
    id: "4",
    name: "Rusim Bed Queen",
    price: 64400,
    currency: "MXN",
    status: "SOLD OUT",
    img: ImgMesaEnLaPicina,
  },
  {
    id: "5",
    name: "Rusim Buro",
    price: 11900,
    currency: "MXN",
    status: "SOLD OUT",
    img: ImgBuro,
  },
  {
    id: "6",
    name: "Forjo Desk",
    price: 49300,
    currency: "MXN",
    status: "SOLD OUT",
    img: ImgMesaConLibro,
  },
  {
    id: "7",
    name: "Forjo Shelving",
    price: 89300,
    currency: "MXN",
    status: "SOLD OUT",
    img: ImgEstanteria,
  },
  {
    id: "8",
    name: "Forjo Chair",
    price: 39000,
    currency: "MXN",
    status: "SOLD OUT",
    img: ImgSilla,
  },
  {
    id: "9",
    name: "Próximamente…",
    price: 0,
    currency: "MXN",
    status: "COMING SOON",
    img: ImgMesa,
  },
];

/* ---------- Tarjeta individual ---------- */

const ProductCard: React.FC<{
  product: ProductItem;
  onViewMore: (p: ProductItem) => void;
}> = ({ product, onViewMore }) => {
  const [showBtns, setShowBtns] = useState(false);

  return (
    <div
      className="
        flex flex-col bg-transparent
        w-full
        max-w-full

        md:w-[36rem] md:max-w-[36rem] md:flex-shrink-0
        xl:w-[40rem] xl:max-w-[40rem] xl:flex-shrink-0
        2xl:w-[45rem] 2xl:max-w-[45rem] 2xl:flex-shrink-0
        min-[1900px]:w-[59.3rem] min-[1900px]:max-w-[59.3rem] min-[1900px]:flex-shrink-0

        mt-[8rem]
      "
      style={{ backgroundColor: SECTION_BG }}
    >
      {/* IMAGEN: mantiene ratio 593x697, escala con el width de la card */}
      <div
        className="relative w-full cursor-pointer"
        style={{ aspectRatio: "593 / 697" }}
        onClick={() => setShowBtns((v) => !v)}
      >
        <img
          src={product.img}
          alt={product.name}
          className="h-full w-full object-cover"
        />

        {/* Overlay SOLD OUT / COMING SOON */}
        <div
          className="
            absolute inset-0
            bg-[rgba(0,0,0,0.45)]
            flex items-center justify-center text-center
          "
        >
          <span
            className="
              uppercase
              font-semibold
              text-[1.6rem] leading-[1.6rem]
              md:text-[2rem] md:leading-[2rem]
              xl:text-[2.4rem] xl:leading-[2.4rem]
            "
            style={{
              color: "#F1EBDF",
              fontFamily: "'Montserrat', sans-serif",
              letterSpacing: "0",
            }}
          >
            {product.status === "COMING SOON"
              ? "COMING SOON"
              : product.status}
          </span>
        </div>

        {/* Botones sobre la imagen, abajo */}
        {showBtns && (
          <div
            className="
              absolute left-0 right-0 bottom-0
              flex
              uppercase
              tracking-[0]
            "
            style={{
              fontFamily: "'Montserrat', sans-serif",
            }}
          >
            {/* VER MÁS */}
            <button
              className="
                w-1/2
                h-[5rem]
                xl:h-[5.8rem]
                flex items-center justify-center
                text-center
                font-bold
                text-[1.2rem] leading-[1.2rem]
                md:text-[1.3rem] md:leading-[1.3rem]
                xl:text-[1.4rem] xl:leading-[1.4rem]
              "
              style={{
                backgroundColor: CTA_LEFT_BG,
                color: CTA_TEXT,
                letterSpacing: "0",
              }}
              onClick={(e) => {
                e.stopPropagation(); // no vuelvas a togglear showBtns
                onViewMore(product); // avisamos al grid que abra detalle
              }}
            >
              VER MÁS
            </button>

            {/* AÑADIR AL CARRO */}
            <button
              className="
                w-1/2
                h-[5rem]
                xl:h-[5.8rem]
                flex items-center justify-center
                text-center
                font-bold
                text-[1.2rem] leading-[1.2rem]
                md:text-[1.3rem] md:leading-[1.3rem]
                xl:text-[1.4rem] xl:leading-[1.4rem]
              "
              style={{
                backgroundColor: CTA_RIGHT_BG,
                color: CTA_TEXT,
                letterSpacing: "0",
              }}
              onClick={(e) => {
                e.stopPropagation();
                // lógica carrito aquí si quieres
              }}
            >
              AÑADIR AL CARRO
            </button>
          </div>
        )}
      </div>

      {/* Nombre producto + Precio */}
      <div
        className="
          flex flex-wrap items-baseline justify-between
          px-[1.6rem] py-[1.6rem]
        "
        style={{ backgroundColor: SECTION_BG }}
      >
        {/* Nombre */}
        <span
          className="
            font-medium
            text-[1.8rem] leading-[1.8rem]
            md:text-[2.2rem] md:leading-[2.2rem]
            xl:text-[2.8rem] xl:leading-[2.8rem]
          "
          style={{
            color: "#666666",
            fontFamily: "'Montserrat', sans-serif",
            letterSpacing: "0",
          }}
        >
          {product.name}
        </span>

        {/* Precio + MXN */}
        {product.price > 0 ? (
          <span
            className="
              flex flex-wrap items-baseline gap-[0.4rem] text-right
            "
            style={{
              fontFamily: "'Montserrat', sans-serif",
              color: "#261900",
            }}
          >
            <span
              className="
                font-semibold
                text-[1.8rem] leading-[1.8rem]
                md:text-[2rem] md:leading-[2rem]
                xl:text-[2.4rem] xl:leading-[2.4rem]
              "
              style={{
                letterSpacing: "0",
              }}
            >
              ${formatPriceES(product.price)}
            </span>

            <span
              className="
                font-semibold
                uppercase
                text-[1rem] leading-[1.2rem]
                md:text-[1.1rem] md:leading-[1.3rem]
                xl:text-[1.2rem] xl:leading-[1.2rem]
              "
              style={{
                letterSpacing: "0",
              }}
            >
              {product.currency}
            </span>
          </span>
        ) : (
          // cuando no hay precio (Próximamente…)
          <span
            className="
              font-semibold
              text-[1.8rem] leading-[1.8rem]
              md:text-[2rem] md:leading-[2rem]
              xl:text-[2.4rem] xl:leading-[2.4rem]
            "
            style={{
              fontFamily: "'Montserrat', sans-serif",
              color: "#261900",
              letterSpacing: "0",
            }}
          />
        )}
      </div>
    </div>
  );
};

/* ---------- Grid principal ---------- */

const ProductGrid: React.FC = () => {
  // esto controla si estamos en la vista normal o en el detalle
  const [selectedProduct, setSelectedProduct] = useState<DetailProduct | null>(
    null
  );

  // 1. Si hay producto seleccionado → mostramos SOLO el detalle
  if (selectedProduct) {
    return (
      <ProductDetail
        product={selectedProduct}
        onBack={() => setSelectedProduct(null)}
      />
    );
  }

  // 2. Si NO hay producto seleccionado → mostramos el grid y la paginación
  return (
    <section
      className="w-full flex justify-center overflow-x-hidden"
      style={{ backgroundColor: SECTION_BG }}
    >
      <div className="w-full px-[0rem] py-[3.2rem]">
        {/* GRID DE PRODUCTOS */}
        <div
          className="
            grid
            grid-cols-1           /* mobile: 1 tarjeta */
            sm:grid-cols-2        /* tablet / mediana: 2 tarjetas */
            lg:grid-cols-3        /* pantallas grandes+: 3 tarjetas */
            gap-x-[3.5rem]
            gap-y-[9rem]
            justify-items-center
          "
        >
          {productsMock.map((p) => (
            <ProductCard
              key={p.id}
              product={p}
              onViewMore={(prod) => setSelectedProduct(prod)}
            />
          ))}
        </div>

        {/* PAGINACIÓN ABAJO */}
        <div
          className="
            w-full
            flex
            flex-col
            items-center
            mt-[10.7rem]  /* separación de 10.7rem que pediste */
          "
        >
          {/* contenedor de los 2 botones lado a lado */}
          <div
            className="
              flex
              w-full
              max-w-[185.1rem]           /* ancho máx ~1851px */
              border-black
              border-[0.1rem]            /* 1px = 0.1rem */
            "
            style={{
              backgroundColor: SECTION_BG,
            }}
          >
            {/* BOTÓN: PÁGINA ANTERIOR
                - fondo crema (igual que bg)
                - texto café #261900
                - NO tiene fondo oscuro */}
            <button
              className="
                flex-1
                flex items-center justify-center text-center
                h-[12.1rem]            /* 121px => 12.1rem */
                uppercase
                font-medium
                text-[2rem] leading-[2rem]
                md:text-[2.4rem] md:leading-[2.4rem]
                xl:text-[2.8rem] xl:leading-[2.8rem]
                tracking-[0]
              "
              style={{
                backgroundColor: "#F1EBDF",
                color: "#261900",
                fontFamily: "'Montserrat', sans-serif",
                letterSpacing: "0",
              }}
            >
              PÁGINA ANTERIOR
            </button>

            {/* BOTÓN: PÁGINA SIGUIENTE
                - fondo oscuro #261900
                - texto crema #F1EBDF */}
            <button
              className="
                flex-1
                flex items-center justify-center text-center
                h-[12.1rem]
                uppercase
                font-medium
                text-[2rem] leading-[2rem]
                md:text-[2.4rem] md:leading-[2.4rem]
                xl:text-[2.8rem] xl:leading-[2.8rem]
                tracking-[0]
                text-[#F1EBDF]
              "
              style={{
                backgroundColor: "#261900",
                fontFamily: "'Montserrat', sans-serif",
                letterSpacing: "0",
              }}
            >
              PÁGINA SIGUIENTE
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductGrid;
