import { Search, Wrench, ClipboardCheck, Star, ArrowRight, Paintbrush, Sparkles, BookOpen, Home, Laptop, Droplets, Truck, ShieldCheck, ChevronLeft, ChevronRight, Zap, Hammer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const categories = [
  { name: "Reformas", icon: Hammer, color: "bg-primary/10 text-primary" },
  { name: "Limpeza", icon: Sparkles, color: "bg-secondary/10 text-secondary" },
  { name: "Pintura", icon: Paintbrush, color: "bg-primary/10 text-primary" },
  { name: "Elétrica", icon: Zap, color: "bg-secondary/10 text-secondary" },
  { name: "Encanamento", icon: Droplets, color: "bg-primary/10 text-primary" },
  { name: "Mudanças", icon: Truck, color: "bg-secondary/10 text-secondary" },
  { name: "Tecnologia", icon: Laptop, color: "bg-primary/10 text-primary" },
  { name: "Reparos", icon: Wrench, color: "bg-secondary/10 text-secondary" },
];

const testimonials = [
  { name: "Ana Silva", role: "Contratante", rating: 5, text: "Encontrei um eletricista excelente em minutos! O serviço foi impecável e o preço justo.", avatar: "AS" },
  { name: "Carlos Santos", role: "Profissional", rating: 5, text: "A HelpHome me ajudou a conseguir mais clientes na minha região. Recomendo!", avatar: "CS" },
  { name: "Maria Oliveira", role: "Contratante", rating: 4, text: "Super prático! Já contratei pintor, encanador e faxineira por aqui.", avatar: "MO" },
];

const steps = [
  { icon: Search, title: "Busque", desc: "Encontre o profissional ideal para o que você precisa" },
  { icon: ClipboardCheck, title: "Contrate", desc: "Compare perfis, avaliações e peça orçamentos" },
  { icon: Star, title: "Avalie", desc: "Deixe sua avaliação e ajude a comunidade" },
];

const Index = () => {
  const [testimonialIdx, setTestimonialIdx] = useState(0);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-accent/10 py-20 md:py-28">
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-6xl font-extrabold text-foreground leading-tight mb-6 font-[Nunito]"
          >
            Sua casa merece o<br />
            <span className="text-primary">melhor cuidado</span> 🏠
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto"
          >
            Conectamos você a milhares de profissionais qualificados da sua região. Rápido, fácil e seguro.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto"
          >
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
              <Input placeholder="O que você precisa? Ex: Eletricista" className="pl-10 h-12 rounded-xl text-base" />
            </div>
            <Button size="lg" className="h-12 rounded-xl px-8 font-bold text-base">Buscar</Button>
          </motion.div>
          <div className="flex items-center justify-center gap-4 mt-6 text-sm text-muted-foreground flex-wrap">
            <span className="flex items-center gap-1"><ShieldCheck size={16} className="text-primary" /> Profissionais verificados</span>
            <span className="flex items-center gap-1"><Star size={16} className="text-accent-foreground" /> +10 mil avaliações</span>
          </div>
        </div>
        <div className="absolute -top-20 -right-20 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-accent/10 rounded-full blur-3xl" />
      </section>

      {/* Como Funciona */}
      <section id="como-funciona" className="py-20 bg-card">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4 font-[Nunito]">Como Funciona?</h2>
          <p className="text-muted-foreground mb-12 max-w-xl mx-auto">Em 3 passos simples você resolve o que precisa</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, i) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="flex flex-col items-center p-6"
              >
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
                  <step.icon size={28} className="text-primary" />
                </div>
                <div className="text-sm font-bold text-primary mb-1">Passo {i + 1}</div>
                <h3 className="text-xl font-bold mb-2 font-[Nunito]">{step.title}</h3>
                <p className="text-muted-foreground text-sm">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Categorias */}
      <section id="categorias" className="py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4 font-[Nunito]">Categorias Populares</h2>
          <p className="text-muted-foreground mb-12">Encontre profissionais em diversas áreas</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {categories.map((cat, i) => (
              <motion.button
                key={cat.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ scale: 1.05 }}
                className="flex flex-col items-center gap-3 p-6 rounded-2xl border border-border bg-card hover:shadow-lg transition-shadow cursor-pointer"
              >
                <div className={`w-12 h-12 rounded-xl ${cat.color} flex items-center justify-center`}>
                  <cat.icon size={22} />
                </div>
                <span className="font-semibold text-sm">{cat.name}</span>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Depoimentos */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4 font-[Nunito]">O que dizem nossos usuários</h2>
          <p className="text-muted-foreground mb-12">Histórias reais de quem já usou a plataforma</p>
          <div className="max-w-md mx-auto relative">
            <div className="bg-background rounded-2xl p-8 shadow-lg border border-border">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold">
                  {testimonials[testimonialIdx].avatar}
                </div>
                <div className="text-left">
                  <div className="font-bold font-[Nunito]">{testimonials[testimonialIdx].name}</div>
                  <div className="text-xs text-muted-foreground">{testimonials[testimonialIdx].role}</div>
                </div>
                <div className="ml-auto flex gap-0.5">
                  {Array.from({ length: testimonials[testimonialIdx].rating }).map((_, j) => (
                    <Star key={j} size={14} className="text-primary fill-primary" />
                  ))}
                </div>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed">"{testimonials[testimonialIdx].text}"</p>
            </div>
            <div className="flex justify-center gap-3 mt-6">
              <button onClick={() => setTestimonialIdx(i => (i - 1 + testimonials.length) % testimonials.length)} className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-muted transition-colors">
                <ChevronLeft size={18} />
              </button>
              <button onClick={() => setTestimonialIdx(i => (i + 1) % testimonials.length)} className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-muted transition-colors">
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-primary to-secondary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-primary-foreground mb-4 font-[Nunito]">Quer oferecer seus serviços?</h2>
          <p className="text-primary-foreground/80 mb-8 max-w-lg mx-auto">Cadastre-se como profissional e comece a receber pedidos de clientes na sua região hoje mesmo.</p>
          <Button size="lg" variant="outline" className="rounded-xl font-bold text-base px-8 bg-card text-foreground hover:bg-card/90 border-0" asChild>
            <Link to="/cadastro">Começar agora <ArrowRight size={18} className="ml-2" /></Link>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
