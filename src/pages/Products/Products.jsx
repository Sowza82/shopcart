import { useEffect, useState } from "react";
import ProductCard from "../../components/ProductCard/ProductCard";
import styles from "./Products.module.css";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [sort, setSort] = useState("default");
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("https://fakestoreapi.com/products");
        const data = await res.json();
        setProducts(data);
        setFilteredProducts(data);

        const catRes = await fetch("https://fakestoreapi.com/products/categories");
        const catData = await catRes.json();
        setCategories(["all", ...catData]);
      } catch (err) {
        console.error("Erro ao carregar produtos:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Filtros e busca
  useEffect(() => {
    let temp = [...products];

    // Categoria
    if (categoryFilter !== "all") {
      temp = temp.filter(p => p.category === categoryFilter);
    }

    // Busca
    if (search.trim() !== "") {
      temp = temp.filter(p =>
        p.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Ordenação
    if (sort === "price-asc") temp.sort((a, b) => a.price - b.price);
    else if (sort === "price-desc") temp.sort((a, b) => b.price - a.price);

    setFilteredProducts(temp);
    setCurrentPage(1); // resetar página ao filtrar
  }, [search, categoryFilter, sort, products]);

  // Paginação
  const indexOfLast = currentPage * productsPerPage;
  const indexOfFirst = indexOfLast - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  if (loading) return <div className={styles.loading}>Carregando produtos...</div>;

  return (
    <div className={styles.productsPage}>
      <h1>Produtos ShopCart</h1>

      {/* Filtros */}
      <div className={styles.filters}>
        <input
          type="text"
          placeholder="Buscar produto..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
        <select value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="default">Ordenar</option>
          <option value="price-asc">Preço: Menor para Maior</option>
          <option value="price-desc">Preço: Maior para Menor</option>
        </select>
      </div>

      {/* Grid de produtos */}
      <div className={styles.grid}>
        {currentProducts.length === 0 ? (
          <p>Nenhum produto encontrado.</p>
        ) : (
          currentProducts.map(prod => <ProductCard key={prod.id} product={prod} />)
        )}
      </div>

      {/* Paginação */}
      {totalPages > 1 && (
        <div className={styles.pagination}>
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(prev => prev - 1)}
          >
            Anterior
          </button>
          <span>{currentPage} / {totalPages}</span>
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(prev => prev + 1)}
          >
            Próximo
          </button>
        </div>
      )}
    </div>
  );
};

export default Products;
