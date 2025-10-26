import Navbar from "@/components/Navbar";
import ProductList from "@/components/ProductList";
import Cart from "@/components/Cart";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="flex flex-col md:flex-row md:justify-between">
        <ProductList />
        <Cart />
      </div>
    </main>
  );
}
