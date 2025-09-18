import { useEffect, useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import ProductCard from "../../components/ProductCard/ProductCard";
import styles from "./Home.module.css";

const banners = [
  "https://img.freepik.com/vetores-gratis/modelo-de-banner-de-venda-horizontal-plano-com-foto_23-2149000923.jpg",
  "https://img.freepik.com/vetores-gratis/modelo-de-banner-horizontal-plano-para-venda-na-sexta-feira-negra_23-2150852978.jpg",
  "https://img.freepik.com/psd-premium/venda-de-black-friday-nas-midias-sociais-no-instagram-no-banner-da-web-ou-no-modelo-de-capa-do-facebook_220443-1071.jpg"
];

const categories = [
  { id: 1, name: "Moda", img: "https://audaces.com/wp-content/uploads/2023/08/7-estilos-de-moda-universais-1024x683.jpg" },
  { id: 2, name: "Eletrônicos", img: "https://files.tecnoblog.net/wp-content/uploads/2025/06/Capa-TBR-Eletronicos-de-Consumo-1060x596.png" },
  { id: 3, name: "Beleza", img: "https://influency.me/wp-content/uploads/2021/03/Design-sem-nome-21-1.png" },
  { id: 4, name: "Casa", img: "https://quakerdecor.com.br/wp-content/uploads/2020/06/Dicas-praticas-de-decoracao-para-deixar-a-sua-casa-mais-confortavel-3.jpg" },
];

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [currentBanner, setCurrentBanner] = useState(0);
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    setFadeIn(true); // ativa fade-in ao montar
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("https://fakestoreapi.com/products?limit=8");
        const data = await res.json();
        setFeaturedProducts(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % banners.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const prevBanner = () => setCurrentBanner((prev) => (prev - 1 + banners.length) % banners.length);
  const nextBanner = () => setCurrentBanner((prev) => (prev + 1) % banners.length);

  return (
    <div className={`${styles.home} ${fadeIn ? styles.fadeIn : ""}`}>
      {/* Banner */}
      <section className={styles.banner}>
        <img src={banners[currentBanner]} alt={`Banner ShopCart ${currentBanner + 1}`} />
        <button className={`${styles.arrow} ${styles.left}`} onClick={prevBanner}><FaArrowLeft /></button>
        <button className={`${styles.arrow} ${styles.right}`} onClick={nextBanner}><FaArrowRight /></button>
      </section>

      {/* Categorias */}
      <section className={styles.categories}>
        <h2>Categorias</h2>
        <div className={styles.categoryGrid}>
          {categories.map(cat => (
            <div key={cat.id} className={styles.categoryCard}>
              <img src={cat.img} alt={cat.name} />
              <span>{cat.name}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Produtos em destaque */}
      <section className={styles.products}>
        <h2>Destaques</h2>
        <div className={styles.grid}>
          {featuredProducts.length > 0
            ? featuredProducts.map(product => <ProductCard key={product.id} product={product} />)
            : Array(8).fill(0).map((_, idx) => <div key={idx} className={styles.skeletonCard}></div>)
          }
        </div>
      </section>

      {/* Novidades */}
      <section className={styles.promotions}>
        <h2>Novidades</h2>
        <div className={styles.grid}>
          {featuredProducts.length > 0
            ? featuredProducts.slice(0,4).map(product => <ProductCard key={product.id} product={product} />)
            : Array(4).fill(0).map((_, idx) => <div key={idx} className={styles.skeletonCard}></div>)
          }
        </div>
      </section>
    </div>
  );
};

export default Home;
