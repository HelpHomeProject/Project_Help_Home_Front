import { useParams, useNavigate } from "react-router-dom";
import { Star, MapPin, Tag, Phone, MessageCircle, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const MOCK_PROFESSIONAL = {
  id: "1",
  name: "Carlos Silva",
  photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face",
  bio: "Profissional com mais de 10 anos de experiência em reformas residenciais. Especializado em cozinhas e banheiros, com foco em acabamento de alta qualidade e cumprimento de prazos.",
  categoria: "Reformas e Reparos",
  cidade: "São Paulo",
  estado: "SP",
  rating: 4.8,
  totalReviews: 47,
  portfolio: [
    { id: "1", title: "Reforma de cozinha completa", image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop" },
    { id: "2", title: "Pintura residencial", image: "https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=400&h=300&fit=crop" },
    { id: "3", title: "Banheiro planejado", image: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=400&h=300&fit=crop" },
    { id: "4", title: "Sala de estar moderna", image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop" },
  ],
  reviews: [
    { id: "1", author: "Maria Oliveira", rating: 5, text: "Excelente profissional! Fez a reforma da minha cozinha impecável.", date: "2 semanas atrás" },
    { id: "2", author: "João Santos", rating: 5, text: "Muito pontual e caprichoso. Recomendo!", date: "1 mês atrás" },
    { id: "3", author: "Ana Costa", rating: 4, text: "Bom trabalho, apenas um pequeno atraso no prazo.", date: "2 meses atrás" },
  ],
};

const PerfilProfissional = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const pro = MOCK_PROFESSIONAL;

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-primary/5 via-background to-accent/10">
      <Header />
      <div className="flex-1 px-4 py-8 max-w-4xl mx-auto w-full">
        <button onClick={() => navigate(-1)} className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors">
          <ArrowLeft size={16} /> Voltar
        </button>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          {/* Profile Card */}
          <div className="bg-card rounded-3xl shadow-xl border border-border p-6 sm:p-8 mb-6">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
              <img src={pro.photo} alt={pro.name} className="w-28 h-28 rounded-full object-cover border-4 border-primary/20 shadow-lg" />
              <div className="flex-1 text-center sm:text-left">
                <h1 className="text-2xl font-extrabold font-[Nunito]">{pro.name}</h1>
                <div className="flex items-center justify-center sm:justify-start gap-2 mt-2 flex-wrap">
                  <span className="inline-flex items-center gap-1 bg-primary/10 text-primary text-xs font-bold px-3 py-1 rounded-full">
                    <Tag size={12} /> {pro.categoria}
                  </span>
                  <span className="inline-flex items-center gap-1 text-muted-foreground text-xs">
                    <MapPin size={12} /> {pro.cidade}, {pro.estado}
                  </span>
                </div>
                <div className="flex items-center justify-center sm:justify-start gap-1 mt-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} className={i < Math.round(pro.rating) ? "fill-yellow-400 text-yellow-400" : "text-border"} />
                  ))}
                  <span className="text-sm font-bold ml-1">{pro.rating}</span>
                  <span className="text-xs text-muted-foreground">({pro.totalReviews} avaliações)</span>
                </div>
                <p className="text-sm text-muted-foreground mt-4 leading-relaxed">{pro.bio}</p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 mt-6">
              <Button className="flex-1 h-11 rounded-xl font-bold gap-2" onClick={() => navigate("/busca")}>
                <MessageCircle size={16} /> Contratar
              </Button>
              <Button variant="outline" className="flex-1 h-11 rounded-xl font-bold gap-2">
                <Phone size={16} /> Ligar
              </Button>
            </div>
          </div>

          {/* Portfolio */}
          <div className="mb-6">
            <h2 className="text-lg font-extrabold font-[Nunito] mb-4">Portfólio</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {pro.portfolio.map(p => (
                <div key={p.id} className="rounded-2xl overflow-hidden shadow-md group cursor-pointer">
                  <div className="relative h-32 sm:h-40">
                    <img src={p.image} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                      <span className="text-white text-xs font-bold">{p.title}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Reviews */}
          <div>
            <h2 className="text-lg font-extrabold font-[Nunito] mb-4">Avaliações</h2>
            <div className="space-y-3">
              {pro.reviews.map(r => (
                <div key={r.id} className="bg-card rounded-2xl border border-border p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-sm">{r.author}</span>
                    <span className="text-xs text-muted-foreground">{r.date}</span>
                  </div>
                  <div className="flex items-center gap-0.5 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={12} className={i < r.rating ? "fill-yellow-400 text-yellow-400" : "text-border"} />
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground">{r.text}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
      <Footer />
    </div>
  );
};

export default PerfilProfissional;
