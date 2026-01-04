import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, Heart, User, LayoutDashboard, ChevronRight, Sparkles, Truck, Shield, RotateCcw, Star, ArrowRight, Headphones } from 'lucide-react';
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
        const { data: categoriesData } = await supabase
          .from('categories')
          .select('*')
          .order('sort_order', { ascending: true });
        
        if (categoriesData) setCategories(categoriesData);

        const { data: featuredData } = await supabase
          .from('products')
          .select('*')
          .eq('is_featured', true)
          .eq('is_active', true)
          .limit(8);
        
        if (featuredData) setFeaturedProducts(featuredData);

        const { data: newData } = await supabase
          .from('products')
          .select('*')
          .eq('is_new', true)
          .eq('is_active', true)
          .limit(4);
        
        if (newData) setNewArrivals(newData);

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
    return `৳${price.toLocaleString('bn-BD')}`;
  };

  const features = [
    { icon: Truck, title: 'দ্রুত ডেলিভারি', desc: 'সারাদেশে ফ্রি ডেলিভারি' },
    { icon: RotateCcw, title: 'ইজি রিটার্ন', desc: '৭ দিনের রিটার্ন পলিসি' },
    { icon: Shield, title: 'নিরাপদ পেমেন্ট', desc: '১০০% সিকিউর চেকআউট' },
    { icon: Headphones, title: '২৪/৭ সাপোর্ট', desc: 'যেকোনো সময় যোগাযোগ' },
  ];

  const placeholderProducts = [
    { id: '1', name: 'ফ্লোরাল প্রিন্ট টু পিস', price: 2450, original_price: 3200, badge: 'নতুন' },
    { id: '2', name: 'এমব্রয়ডারি থ্রি পিস', price: 3850, original_price: 4500, badge: 'বেস্ট সেলার' },
    { id: '3', name: 'কটন টু পিস সেট', price: 1950, original_price: 2400, badge: 'ট্রেন্ডিং' },
    { id: '4', name: 'সিল্ক থ্রি পিস', price: 4250, original_price: 5000, badge: 'প্রিমিয়াম' },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
        <div className="container-custom py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">
                এলিগ্যান্স
              </span>
            </Link>
            
            <nav className="hidden md:flex items-center gap-8">
              <Link to="/" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
                হোম
              </Link>
              <Link to="/category/two-pcs" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
                টু পিস
              </Link>
              <Link to="/category/three-pcs" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
                থ্রি পিস
              </Link>
              <Link to="/products" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
                সব প্রোডাক্ট
              </Link>
            </nav>

            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="rounded-full hover:bg-primary/10">
                <Heart className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full hover:bg-primary/10 relative">
                <ShoppingBag className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-primary-foreground text-xs rounded-full flex items-center justify-center">০</span>
              </Button>
              <Link to={user ? (isAdmin ? '/admin' : '/my-account') : '/auth'}>
                <Button variant="ghost" size="icon" className="rounded-full hover:bg-primary/10">
                  {user && isAdmin ? <LayoutDashboard className="h-5 w-5" /> : <User className="h-5 w-5" />}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section - Full Width at Top */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/10">
          <div className="absolute inset-0">
            <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/15 rounded-full blur-3xl animate-pulse delay-1000" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-secondary/30 rounded-full blur-3xl" />
          </div>
          {/* Decorative Pattern */}
          <div className="absolute inset-0 opacity-5" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }} />
        </div>

        {/* Floating Decorative Elements */}
        <motion.div 
          className="absolute top-20 right-20 text-primary/20"
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          <Sparkles className="w-16 h-16" />
        </motion.div>
        <motion.div 
          className="absolute bottom-32 left-20 text-accent/25"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <Heart className="w-12 h-12" />
        </motion.div>

        <div className="container-custom relative z-10 py-12">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center lg:text-left space-y-8"
            >
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary/10 rounded-full border border-primary/20"
              >
                <Sparkles className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-primary">নতুন কালেকশন ২০২৬</span>
              </motion.div>
              
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
                <span className="text-foreground">আপনার</span>
                <br />
                <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent bg-[length:200%_auto] animate-shimmer">
                  স্টাইল স্টেটমেন্ট
                </span>
              </h1>
              
              <p className="text-lg md:text-xl text-muted-foreground max-w-lg mx-auto lg:mx-0 leading-relaxed">
                এক্সক্লুসিভ টু পিস ও থ্রি পিস কালেকশন। প্রিমিয়াম কোয়ালিটি, ট্রেন্ডি ডিজাইন, সাশ্রয়ী মূল্যে।
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button 
                  size="lg" 
                  onClick={() => navigate('/products')}
                  className="group bg-gradient-to-r from-primary to-accent hover:opacity-90 text-primary-foreground px-8 py-6 text-lg rounded-full shadow-cta"
                >
                  শপিং শুরু করুন
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  className="px-8 py-6 text-lg rounded-full border-2 hover:bg-primary/5 hover:border-primary/50"
                >
                  কালেকশন দেখুন
                </Button>
              </div>

              {/* Stats */}
              <div className="flex gap-8 justify-center lg:justify-start pt-6">
                <div className="text-center">
                  <p className="text-3xl font-bold text-primary">৫০০+</p>
                  <p className="text-sm text-muted-foreground">ডিজাইন</p>
                </div>
                <div className="h-12 w-px bg-border" />
                <div className="text-center">
                  <p className="text-3xl font-bold text-primary">১০K+</p>
                  <p className="text-sm text-muted-foreground">সন্তুষ্ট গ্রাহক</p>
                </div>
                <div className="h-12 w-px bg-border" />
                <div className="text-center">
                  <p className="text-3xl font-bold text-primary flex items-center justify-center gap-1">
                    ৪.৯ <Star className="w-5 h-5 fill-primary" />
                  </p>
                  <p className="text-sm text-muted-foreground">রেটিং</p>
                </div>
              </div>
            </motion.div>

            {/* Hero Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative hidden lg:block"
            >
              <div className="relative aspect-[4/5] max-w-lg mx-auto">
                {/* Background Shape */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-[3rem] rotate-3 shadow-2xl" />
                
                {/* Main Image */}
                <img
                  src="https://images.unsplash.com/photo-1617922001439-4a2e6562f328?w=600&q=80"
                  alt="ফ্যাশন মডেল"
                  className="relative z-10 w-full h-full object-cover rounded-[3rem] shadow-glow"
                />
                
                {/* Floating Cards */}
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 }}
                  className="absolute -left-8 top-1/4 bg-card/95 backdrop-blur-md p-4 rounded-2xl shadow-lg border border-border"
                >
                  <p className="text-sm font-semibold flex items-center gap-2">🔥 ৩০% ছাড়</p>
                  <p className="text-xs text-muted-foreground">সীমিত সময়ের জন্য</p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1 }}
                  className="absolute -right-4 bottom-1/4 bg-card/95 backdrop-blur-md p-4 rounded-2xl shadow-lg border border-border"
                >
                  <p className="text-sm font-semibold flex items-center gap-2">✨ ফ্রি ডেলিভারি</p>
                  <p className="text-xs text-muted-foreground">৳২০০০+ অর্ডারে</p>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom Wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V120Z" fill="hsl(var(--secondary))"/>
          </svg>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-secondary/50">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-primary font-medium text-sm tracking-wider uppercase">আমাদের ক্যাটাগরি</span>
            <h2 className="text-4xl md:text-5xl font-bold mt-3 mb-4">
              জনপ্রিয় <span className="text-primary">কালেকশন</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              আপনার পছন্দের ক্যাটাগরি বেছে নিন এবং সেরা ডিজাইন খুঁজে নিন
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Two Pcs Category */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="group cursor-pointer"
              onClick={() => navigate('/category/two-pcs')}
            >
              <div className="relative overflow-hidden rounded-3xl aspect-[4/3]">
                <img
                  src="https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&q=80"
                  alt="টু পিস কালেকশন"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <span className="inline-block px-4 py-1.5 bg-primary text-primary-foreground text-sm rounded-full mb-3">
                    ১২০+ ডিজাইন
                  </span>
                  <h3 className="text-3xl font-bold text-white mb-2">টু পিস</h3>
                  <p className="text-white/80 mb-4">এলিগ্যান্ট টু পিস কালেকশন</p>
                  <div className="flex items-center gap-2 text-white group-hover:gap-4 transition-all">
                    <span className="font-medium">কালেকশন দেখুন</span>
                    <ArrowRight className="w-5 h-5" />
                  </div>
                </div>

                <div className="absolute inset-0 border-4 border-primary/0 group-hover:border-primary/50 rounded-3xl transition-all duration-300" />
              </div>
            </motion.div>

            {/* Three Pcs Category */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="group cursor-pointer"
              onClick={() => navigate('/category/three-pcs')}
            >
              <div className="relative overflow-hidden rounded-3xl aspect-[4/3]">
                <img
                  src="https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=600&q=80"
                  alt="থ্রি পিস কালেকশন"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <span className="inline-block px-4 py-1.5 bg-primary text-primary-foreground text-sm rounded-full mb-3">
                    ৮৫+ ডিজাইন
                  </span>
                  <h3 className="text-3xl font-bold text-white mb-2">থ্রি পিস</h3>
                  <p className="text-white/80 mb-4">প্রিমিয়াম থ্রি পিস সেট</p>
                  <div className="flex items-center gap-2 text-white group-hover:gap-4 transition-all">
                    <span className="font-medium">কালেকশন দেখুন</span>
                    <ArrowRight className="w-5 h-5" />
                  </div>
                </div>

                <div className="absolute inset-0 border-4 border-primary/0 group-hover:border-primary/50 rounded-3xl transition-all duration-300" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* New Arrivals Section */}
      <section className="py-20 bg-background">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row justify-between items-center mb-12"
          >
            <div>
              <span className="text-primary font-medium text-sm tracking-wider uppercase">নতুন সংযোজন</span>
              <h2 className="text-4xl md:text-5xl font-bold mt-2">
                নিউ <span className="text-primary">অ্যারাইভালস</span>
              </h2>
            </div>
            <Button variant="outline" className="mt-4 md:mt-0 rounded-full px-6" onClick={() => navigate('/products')}>
              সব দেখুন <ChevronRight className="ml-2 w-4 h-4" />
            </Button>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {(featuredProducts.length > 0 ? featuredProducts.slice(0, 4) : placeholderProducts).map((product: any, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group cursor-pointer"
                onClick={() => product.slug && navigate(`/product/${product.slug}`)}
              >
                <div className="relative overflow-hidden rounded-2xl bg-card mb-4">
                  <div className="aspect-[3/4] overflow-hidden">
                    <img
                      src={product.images?.[0] || `https://images.unsplash.com/photo-${1596783074918 + index * 1000}-c84cb06531ca?w=400&q=80`}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  
                  {/* Badge */}
                  <span className="absolute top-3 left-3 px-3 py-1 bg-primary text-primary-foreground text-xs font-medium rounded-full">
                    {product.badge || 'নতুন'}
                  </span>

                  {/* Wishlist */}
                  <Button
                    size="icon"
                    variant="secondary"
                    className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity rounded-full bg-white/90 hover:bg-white"
                    onClick={(e) => { e.stopPropagation(); }}
                  >
                    <Heart className="h-4 w-4" />
                  </Button>

                  {/* Quick Add */}
                  <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button 
                      className="w-full rounded-full bg-card/95 backdrop-blur-md text-foreground hover:bg-primary hover:text-primary-foreground"
                      onClick={(e) => { e.stopPropagation(); }}
                    >
                      কার্টে যোগ করুন
                    </Button>
                  </div>
                </div>

                <h3 className="font-medium text-foreground mb-1 line-clamp-1">{product.name}</h3>
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold text-primary">{formatPrice(product.price)}</span>
                  {product.original_price && product.original_price > product.price && (
                    <span className="text-sm text-muted-foreground line-through">{formatPrice(product.original_price)}</span>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-secondary/30">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center p-6 rounded-2xl bg-card border border-border hover:border-primary/50 hover:shadow-lg transition-all duration-300"
              >
                <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                  <feature.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-20 bg-background">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-primary to-accent p-8 md:p-16 text-center"
          >
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 left-0 w-40 h-40 bg-white rounded-full blur-3xl" />
              <div className="absolute bottom-0 right-0 w-60 h-60 bg-white rounded-full blur-3xl" />
            </div>

            <div className="relative z-10">
              <h2 className="text-3xl md:text-5xl font-bold text-primary-foreground mb-4">
                ৩০% ছাড় পান প্রথম অর্ডারে!
              </h2>
              <p className="text-lg text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
                আজই সাইন আপ করুন এবং এক্সক্লুসিভ অফার, নতুন কালেকশন আপডেট এবং স্পেশাল ডিসকাউন্ট পান।
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
                <input
                  type="text"
                  placeholder="আপনার ফোন নম্বর"
                  className="flex-1 px-6 py-4 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-primary-foreground placeholder:text-primary-foreground/60 focus:outline-none focus:ring-2 focus:ring-white/50"
                />
                <Button 
                  size="lg"
                  className="bg-white text-primary hover:bg-white/90 rounded-full px-8"
                >
                  সাবস্ক্রাইব
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-background py-16">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-primary-foreground" />
                </div>
                <span className="text-2xl font-bold">এলিগ্যান্স</span>
              </div>
              <p className="text-background/70 text-sm">
                প্রিমিয়াম কোয়ালিটি টু পিস ও থ্রি পিস কালেকশন। আপনার স্টাইল, আপনার পছন্দ।
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">কুইক লিংক</h4>
              <ul className="space-y-2 text-sm text-background/70">
                <li><Link to="/products" className="hover:text-primary transition-colors">সব প্রোডাক্ট</Link></li>
                <li><Link to="/category/two-pcs" className="hover:text-primary transition-colors">টু পিস</Link></li>
                <li><Link to="/category/three-pcs" className="hover:text-primary transition-colors">থ্রি পিস</Link></li>
                <li><Link to="/about" className="hover:text-primary transition-colors">আমাদের সম্পর্কে</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">সাহায্য</h4>
              <ul className="space-y-2 text-sm text-background/70">
                <li><Link to="/contact" className="hover:text-primary transition-colors">যোগাযোগ</Link></li>
                <li><Link to="#" className="hover:text-primary transition-colors">শিপিং পলিসি</Link></li>
                <li><Link to="#" className="hover:text-primary transition-colors">রিটার্ন পলিসি</Link></li>
                <li><Link to="#" className="hover:text-primary transition-colors">FAQ</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">যোগাযোগ</h4>
              <ul className="space-y-2 text-sm text-background/70">
                <li>📞 ০১৭XX-XXXXXX</li>
                <li>✉️ info@elegance.com</li>
                <li>📍 ঢাকা, বাংলাদেশ</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-background/20 pt-8 text-center text-sm text-background/60">
            <p>© ২০২৬ এলিগ্যান্স। সর্বস্বত্ব সংরক্ষিত।</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
