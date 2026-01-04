import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, Heart, User, LayoutDashboard, ChevronRight, Sparkles, Truck, Shield, RotateCcw } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';

interface Product {
  id: string;
  name: string;
  price: number;
  original_price: number | null;
  images: string[];
  slug: string;
  category_id: string | null;
}

interface Category {
  id: string;
  name: string;
  slug: string;
  image_url: string | null;
  description: string | null;
}

export default function FashionHomePage() {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [newArrivals, setNewArrivals] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch categories
        const { data: categoriesData } = await supabase
          .from('categories')
          .select('*')
          .order('sort_order', { ascending: true });
        
        if (categoriesData) setCategories(categoriesData);

        // Fetch featured products
        const { data: featuredData } = await supabase
          .from('products')
          .select('*')
          .eq('is_featured', true)
          .eq('is_active', true)
          .limit(8);
        
        if (featuredData) setFeaturedProducts(featuredData);

        // Fetch new arrivals
        const { data: newData } = await supabase
          .from('products')
          .select('*')
          .eq('is_new', true)
          .eq('is_active', true)
          .limit(4);
        
        if (newData) setNewArrivals(newData);

        // Check auth
        const { data: { user: currentUser } } = await supabase.auth.getUser();
        setUser(currentUser);
        
        if (currentUser) {
          const { data: roleData } = await supabase
            .from('user_roles')
            .select('role')
            .eq('user_id', currentUser.id)
            .eq('role', 'admin')
            .maybeSingle();
          setIsAdmin(!!roleData);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-BD', {
      style: 'currency',
      currency: 'BDT',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b border-border">
        <div className="container-custom py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2">
              <span className="font-display text-2xl md:text-3xl font-bold tracking-tight text-foreground">
                ELEGANCE
              </span>
            </Link>
            
            <nav className="hidden md:flex items-center gap-8">
              <Link to="/" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                Home
              </Link>
              {categories.slice(0, 3).map((cat) => (
                <Link 
                  key={cat.id}
                  to={`/category/${cat.slug}`} 
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  {cat.name}
                </Link>
              ))}
              <Link to="/products" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                All Products
              </Link>
            </nav>

            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" className="rounded-full">
                <Heart className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full">
                <ShoppingBag className="h-5 w-5" />
              </Button>
              <Link to={user ? (isAdmin ? '/admin' : '/my-account') : '/auth'}>
                <Button variant="ghost" size="icon" className="rounded-full">
                  {user && isAdmin ? <LayoutDashboard className="h-5 w-5" /> : <User className="h-5 w-5" />}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden gradient-elegant">
        <div className="container-custom py-16 md:py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center lg:text-left"
            >
              <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium tracking-wide mb-6">
                New Collection 2025
              </span>
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
                Discover Your
                <span className="block text-primary">Perfect Style</span>
              </h1>
              <p className="text-muted-foreground text-lg mb-8 max-w-md mx-auto lg:mx-0">
                Explore our exclusive collection of Two Pcs & Three Pcs sets designed for the modern woman who loves elegance.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-cta">
                  Shop Now
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
                <Button size="lg" variant="outline" className="border-foreground/20">
                  View Lookbook
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="aspect-[4/5] bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&q=80"
                  alt="Fashion Collection"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-card p-4 rounded-xl shadow-lg border border-border">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Sparkles className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">Premium Quality</p>
                    <p className="text-xs text-muted-foreground">Handpicked fabrics</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 md:py-24">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Shop by Category
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Find your perfect outfit from our carefully curated collections
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Two Pcs Category */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="group relative overflow-hidden rounded-2xl aspect-[4/5] cursor-pointer"
              onClick={() => navigate('/category/two-pcs')}
            >
              <img
                src="https://images.unsplash.com/photo-1485231183945-fffde7f30347?w=800&q=80"
                alt="Two Pcs Collection"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <h3 className="font-display text-3xl font-bold text-white mb-2">Two Pcs</h3>
                <p className="text-white/80 mb-4">Elegant matching sets</p>
                <Button variant="secondary" className="bg-white/90 hover:bg-white text-foreground">
                  Shop Collection
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </motion.div>

            {/* Three Pcs Category */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="group relative overflow-hidden rounded-2xl aspect-[4/5] cursor-pointer"
              onClick={() => navigate('/category/three-pcs')}
            >
              <img
                src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80"
                alt="Three Pcs Collection"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <h3 className="font-display text-3xl font-bold text-white mb-2">Three Pcs</h3>
                <p className="text-white/80 mb-4">Complete outfit solutions</p>
                <Button variant="secondary" className="bg-white/90 hover:bg-white text-foreground">
                  Shop Collection
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row md:items-end md:justify-between mb-12"
          >
            <div>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
                Featured Products
              </h2>
              <p className="text-muted-foreground max-w-xl">
                Our most loved pieces, handpicked for you
              </p>
            </div>
            <Button variant="outline" className="mt-4 md:mt-0">
              View All
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {featuredProducts.length > 0 ? (
              featuredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group cursor-pointer"
                  onClick={() => navigate(`/product/${product.slug}`)}
                >
                  <div className="relative aspect-[3/4] rounded-xl overflow-hidden bg-muted mb-4">
                    <img
                      src={product.images?.[0] || 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&q=80'}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                    <Button
                      size="icon"
                      variant="secondary"
                      className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity rounded-full bg-white/90 hover:bg-white"
                    >
                      <Heart className="h-4 w-4" />
                    </Button>
                  </div>
                  <h3 className="font-medium text-foreground mb-1 line-clamp-1">{product.name}</h3>
                  <div className="flex items-center gap-2">
                    <span className="text-primary font-semibold">{formatPrice(product.price)}</span>
                    {product.original_price && product.original_price > product.price && (
                      <span className="text-sm text-muted-foreground line-through">
                        {formatPrice(product.original_price)}
                      </span>
                    )}
                  </div>
                </motion.div>
              ))
            ) : (
              // Placeholder products
              [1, 2, 3, 4].map((i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="group cursor-pointer"
                >
                  <div className="relative aspect-[3/4] rounded-xl overflow-hidden bg-muted mb-4">
                    <img
                      src={`https://images.unsplash.com/photo-${1515886657613 + i}-9f3515b0c78f?w=400&q=80`}
                      alt="Product"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <Button
                      size="icon"
                      variant="secondary"
                      className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity rounded-full bg-white/90 hover:bg-white"
                    >
                      <Heart className="h-4 w-4" />
                    </Button>
                  </div>
                  <h3 className="font-medium text-foreground mb-1">Elegant Set {i}</h3>
                  <span className="text-primary font-semibold">৳2,500</span>
                </motion.div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* New Arrivals Banner */}
      <section className="py-16 md:py-24">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative rounded-3xl overflow-hidden"
          >
            <img
              src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1200&q=80"
              alt="New Arrivals"
              className="w-full h-[400px] md:h-[500px] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
            <div className="absolute inset-0 flex items-center">
              <div className="container-custom">
                <div className="max-w-lg">
                  <span className="inline-block px-4 py-1.5 rounded-full bg-white/20 text-white text-sm font-medium mb-4">
                    Just Arrived
                  </span>
                  <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
                    New Season Collection
                  </h2>
                  <p className="text-white/80 text-lg mb-6">
                    Discover the latest trends in women's fashion. Fresh styles for the new season.
                  </p>
                  <Button size="lg" className="bg-white hover:bg-white/90 text-foreground">
                    Explore Now
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 border-t border-border">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: Truck, title: 'Free Shipping', desc: 'On orders over ৳2000' },
              { icon: RotateCcw, title: 'Easy Returns', desc: '7 days return policy' },
              { icon: Shield, title: 'Secure Payment', desc: '100% secure checkout' },
              { icon: Sparkles, title: 'Premium Quality', desc: 'Handpicked fabrics' },
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                  <feature.icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-medium text-foreground mb-1">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 md:py-24 bg-foreground">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-2xl mx-auto"
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold text-background mb-4">
              Join Our Style Circle
            </h2>
            <p className="text-background/70 mb-8">
              Subscribe to get exclusive offers, style tips, and early access to new arrivals
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg bg-background/10 border border-background/20 text-background placeholder:text-background/50 focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                Subscribe
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-muted/50 border-t border-border">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div className="col-span-2 md:col-span-1">
              <span className="font-display text-2xl font-bold text-foreground">ELEGANCE</span>
              <p className="mt-4 text-sm text-muted-foreground">
                Your destination for elegant women's fashion. Quality fabrics, timeless designs.
              </p>
            </div>
            <div>
              <h4 className="font-medium text-foreground mb-4">Shop</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link to="/category/two-pcs" className="hover:text-foreground transition-colors">Two Pcs</Link></li>
                <li><Link to="/category/three-pcs" className="hover:text-foreground transition-colors">Three Pcs</Link></li>
                <li><Link to="/products" className="hover:text-foreground transition-colors">All Products</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-foreground mb-4">Help</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">Shipping</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Returns</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Contact Us</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-foreground mb-4">Follow Us</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">Instagram</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Facebook</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Pinterest</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-border text-center text-sm text-muted-foreground">
            <p>© 2025 Elegance. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
