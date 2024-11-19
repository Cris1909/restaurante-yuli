import { getProducts } from "@/actions";
import "@/css/external/main.css";
import { getImage } from "@/helpers";
import { Recargo } from "@/interfaces";
import Image from "next/image";

const NAVIGATE = [
  { name: "Inicio", href: "#" },
  { name: "Sobre Nosotros", href: "#about" },
  { name: "Menú", href: "#menu" },
  { name: "Contacto", href: "#contact" },
];

const RESTAURANT_INFO = [
  {
    icon: "i-mdi-location-radius-outline",
    title: "Nuestra Ubicación",
    description:
      "Somos un restaurante en la central de transporte en funcionamiento desde el año 2023 en la ciudad de Cúcuta, Norte de Santander.",
  },
  {
    icon: "i-ion-restaurant-outline",
    title: "¿Qué Ofrecemos?",
    description:
      "Estamos dedicados a la preparación de alimentos como desayunos y almuerzos, buscando siempre deleitar el paladar de nuestros clientes.",
  },
  {
    icon: "i-mdi-star-outline",
    title: "Calidad Garantizada",
    description:
      "Utilizamos ingredientes de primera calidad en nuestros platos corrientes y especiales del día.",
  },
  {
    icon: "i-mdi-handshake-outline",
    title: "Nuestro Compromiso",
    description:
      "Ofrecemos un excelente servicio al cliente, enfocado en conductores y pasajeros que se encuentran dentro de la central de transporte.",
  },
  {
    icon: "i-mdi-hand-heart-outline",
    title: "Te Esperamos",
    description:
      "¡No pierdas la oportunidad! ¿Qué esperas para probar nuestros platos?",
  },
];

const CONTACT_INFO = [
  { icon: "i-mdi-phone-outline", text: "+57 315 2861376" },
  { icon: "i-mdi-email-outline", text: "yuli@contacto.com" },
  { icon: "i-mdi-location-outline", text: "Central de transportes, Cúcuta" },
];

export default async function Home() {
  const products = await getProducts();

  const getPasajeroRecargo = (recargos: Recargo[]) => {
    return recargos.find((r) => r.fkcod_tc_rec === 2)?.recargo_cliente || 0;
  };

  return (
    <>
      {/* Header y menú */}
      <header className="p-section">
        <img src="/images/yuli-logo.png" alt="Logo de yuli" />
        <nav>
          <ul>
            {NAVIGATE.map((n) => (
              <li key={n.href}>
                <a href={n.href}>{n.name}</a>
              </li>
            ))}
          </ul>
        </nav>
        <button className="btn btn-primary">
          <a href="#reservation">Iniciar sesión</a>
        </button>
      </header>
      {/* Inicio */}
      <section id="start">
        <div className="p-section">
          <div className="title-container">
            <h1>
              Bienvenidos a <br />
              Restaurante Yuli
            </h1>
            <p>
              Un rincón para disfrutar comida de calidad en la terminal de
              transportes de Cúcuta
            </p>
            <div>
              <button className="btn btn-primary">Explora nuestro menú</button>
            </div>
          </div>
          <div className="separator-container">
            <i className="i-fluent-food-grains-20-regular"></i>
            <i className="i-ion-restaurant-outline"></i>
            <i className="i-fluent-food-grains-20-regular"></i>
          </div>
          {/* <div>
            <div className="dish-container">
              <div>
                <div className="dish-name">
                  <h4>Bandeja Paisa</h4>
                  <span>$ 18.000</span>
                </div>
                <div className="img-container">
                  <img src="/images/bandeja-paisa.webp" alt="" />
                  <div className="day-dish">
                    <div>Plato del día</div>
                  </div>
                </div>
              </div>
            </div>
          </div> */}
        </div>
      </section>
      {/* Sobre nosotros */}
      <section id="about" className="p-section">
        <h2 className="title">Sobre nosotros</h2>
        <div>
          <div className="img-container">
            <img src="/images/yuli-logo.png" alt="Logo de yuli" />
            <p>
              Restaurante Yuli es un lugar donde podrás disfrutar de una
              deliciosa comida casera y platos especiales del día.
            </p>
          </div>
          <ul>
            {RESTAURANT_INFO.map((r) => (
              <li key={r.icon}>
                <div className="icon-container">
                  <i className={r.icon}></i>
                </div>
                <div className="info-container">
                  <h3>{r.title}</h3>
                  <p>{r.description}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
      {/* Menú */}
      <section id="menu" className="p-section">
        <h2 className="title">Nuestro menú</h2>
        <div className="dish-grid mt-8">
          {products.map((p) => (
            <div key={p.cod_prod} className="dish-card">
              <Image
                width={300}
                height={200}
                src={getImage(p.img_prod)}
                alt="Bandeja Paisa"
              />
              <div className="dish-info">
                <h3>{p.nom_prod}</h3>
                <p>{p.dprod}</p>
                <span>
                  ${" "}
                  {(
                    p.precio_base + getPasajeroRecargo(p.recargos)
                  ).toLocaleString()}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contacto */}
      <section id="contact" className="p-section">
        <h2 className="title">Contacto</h2>
        <div className="contact-info">
          {CONTACT_INFO.map((c) => (
            <div key={c.icon} className="contact-item">
              <div className="icon-container">
                <i className={c.icon}></i>
              </div>
              <p className="paragraph">{c.text}</p>
            </div>
          ))}
        </div>
        <div className="contact-form">
          <form action="#" method="post">
            <label htmlFor="name">Nombre</label>
            <input type="text" id="name" placeholder="Pepito Perez" required />

            <label htmlFor="email">Correo electrónico</label>
            <input
              type="email"
              id="email"
              placeholder="example@email.com"
              required
            />

            <label htmlFor="message">Mensaje</label>
            <textarea
              id="message"
              placeholder="Escriba aquí su mensaje..."
              required
            ></textarea>

            <button className="btn btn-black" type="submit">
              Enviar
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="p-section">
        <div className="footer-container">
          <div className="logo">
            <img src="/images/yuli-logo.png" alt="Logo de Restaurante Yuli" />
            <p className="paragraph">
              Somos un restaurante en la central de transporte, que se encuentra
              en funcionamiento desde el año 2023 en la ciudad de Cúcuta, Norte
              de Santander.
            </p>
          </div>
          <div className="footer-info">
            <div className="footer-sections">
              <h3 className="subtitle">Secciones</h3>
              <ul>
                {NAVIGATE.map((n) => (
                  <li key={n.href}>
                    <a href={n.href}>{n.name}</a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="footer-contact">
              <h3 className="subtitle">Contáctanos</h3>
              {CONTACT_INFO.map((c) => (
                <p key={c.icon} className="paragraph">
                  <i className={c.icon}></i>
                  <span> {c.text} </span>
                </p>
              ))}
            </div>
          </div>
        </div>
      </footer>
      <div className="copyright">
        <div className="p-section">
          <p>Copyright © 2024 - Todos los derechos reservados.</p>
          <span>Hecho con amor por: Cris Stormblessed</span>
        </div>
      </div>
    </>
  );
}
