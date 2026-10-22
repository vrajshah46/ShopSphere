import HeroSection from "../components/HeroSection";
import ServiceFeatures from "../components/ServiceFeatures";
import CategorySection from "../components/CategorySection";
import FeaturedProducts from "../components/FeaturedProducts";
import WhyShopWithUs from "../components/WhyShopWithUs";

const Home = ({ wishlist, addToCart, toggleWishlist }) => {
    return (
        <section>
            <HeroSection />
            <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                <ServiceFeatures />
                <CategorySection />
                <FeaturedProducts
                    wishlist={wishlist}
                    addToCart={addToCart}
                    toggleWishlist={toggleWishlist}
                />

                <WhyShopWithUs />
            </main>
        </section>

    );
};

export default Home;