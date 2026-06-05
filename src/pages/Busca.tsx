import { useState, useMemo, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Search, MapPin, Tag, SlidersHorizontal, Star, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabase";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const CATEGORIAS = [
  "Todas", "Reformas e Reparos", "Limpeza", "Encanamento", "Eletricista",
  "Pintura", "Jardinagem", "Mudanças", "Design de Interiores",
  "Aulas Particulares", "Tecnologia", "Beleza e Estética",
];

const CIDADES = ["Todas", "São Paulo", "Rio de Janeiro", "Belo Horizonte", "Curitiba", "Salvador", "Fortaleza", "Brasília", "Recife"];

const MOCK_PROFESSIONALS = [
  { id: "1", name: "Carlos Silva", photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face", categoria: "Reformas e Reparos", cidade: "São Paulo", estado: "SP", rating: 4.8, totalReviews: 47, bio: "Especialista em reformas residenciais com 10+ anos de experiência." },
  { id: "2", name: "Ana Rodrigues", photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face", categoria: "Limpeza", cidade: "São Paulo", estado: "SP", rating: 4.9, totalReviews: 82, bio: "Serviço de limpeza profissional residencial e comercial." },
  { id: "3", name: "Pedro Santos", photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face", categoria: "Encanamento", cidade: "Rio de Janeiro", estado: "RJ", rating: 4.5, totalReviews: 31, bio: "Encanador com experiência em instalações e manutenção." },
  { id: "4", name: "Juliana Costa", photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face", categoria: "Design de Interiores", cidade: "Belo Horizonte", estado: "MG", rating: 5.0, totalReviews: 23, bio: "Designer de interiores com projetos premiados." },
  { id: "5", name: "Ricardo Lima", photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=face", categoria: "Eletricista", cidade: "Curitiba", estado: "PR", rating: 4.7, totalReviews: 56, bio: "Eletricista certificado para serviços residenciais e comerciais." },
  { id: "6", name: "Fernanda Alves", photo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop&crop=face", categoria: "Beleza e Estética", cidade: "Salvador", estado: "BA", rating: 4.6, totalReviews: 38, bio: "Profissional de beleza e estética a domicílio." },
  { id: "7", name: "Lucas Mendes", photo: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&h=200&fit=crop&crop=face", categoria: "Pintura", cidade: "São Paulo", estado: "SP", rating: 4.4, totalReviews: 29, bio: "Pintor profissional com acabamento impecável." },
  { id: "8", name: "Camila Ferreira", photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop&crop=face", categoria: "Aulas Particulares", cidade: "Rio de Janeiro", estado: "RJ", rating: 4.9, totalReviews: 64, bio: "Professora particular de matemática e física." },
  { id: "9", name: "Bruno Oliveira", photo: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&h=200&fit=crop&crop=face", categoria: "Tecnologia", cidade: "Brasília", estado: "DF", rating: 4.8, totalReviews: 41, bio: "Técnico em informática, redes e suporte." },
  { id: "10", name: "Mariana Souza", photo: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&h=200&fit=crop&crop=face", categoria: "Jardinagem", cidade: "Curitiba", estado: "PR", rating: 4.3, totalReviews: 19, bio: "Paisagismo e manutenção de jardins residenciais." },
  { id: "11", name: "Thiago Barbosa", photo: "https://images.unsplash.com/photo-1504257432389-52343af06ae3?w=200&h=200&fit=crop&crop=face", categoria: "Mudanças", cidade: "Fortaleza", estado: "CE", rating: 4.6, totalReviews: 33, bio: "Serviço de mudanças com cuidado e pontualidade." },
  { id: "12", name: "Patrícia Dias", photo: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=200&h=200&fit=crop&crop=face", categoria: "Limpeza", cidade: "Recife", estado: "PE", rating: 4.7, totalReviews: 51, bio: "Limpeza pós-obra e manutenção predial." },
];

type SortOption = "rating" | "reviews" | "name";

const [professionals, setProfessionals] = useState(MOCK_PROFESSIONALS);

const { data } = await supabase
  .from("professionals")
  .select("*");

  data.map(pro => ({
  id: pro.id,
  name: "Profissional",
  categoria: pro.category,
  cidade: pro.city,
  estado: pro.state,
  rating: pro.average_rating,
  bio: pro.bio
}))

const Busca = () => {
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const [categoria, setCategoria] = useState("Todas");
  const [cidade, setCidade] = useState("Todas");
  const [sortBy, setSortBy] = useState<SortOption>("rating");
  const [showFilters, setShowFilters] = useState(false);
  const [visibleCount, setVisibleCount] = useState(6);

  const [realProfessionals, setRealProfessionals] = useState([]);

  const filtered = useMemo(() => {
    let list = MOCK_PROFESSIONALS;
    if (categoria !== "Todas") list = list.filter(p => p.categoria === categoria);
    if (cidade !== "Todas") list = list.filter(p => p.cidade === cidade);
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      list = list.filter(p => p.name.toLowerCase().includes(term) || p.categoria.toLowerCase().includes(term) || p.bio.toLowerCase().includes(term));
    }
    list = [...list].sort((a, b) => {
      if (sortBy === "rating") return b.rating - a.rating;
      if (sortBy === "reviews") return b.totalReviews - a.totalReviews;
      return a.name.localeCompare(b.name);
    });
    return list;
  }, [searchTerm, categoria, cidade, sortBy]);

  const visible = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-primary/5 via-background to-accent/10">
      <Header />
      <div className="flex-1 px-4 py-8 max-w-5xl mx-auto w-full">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-2xl font-extrabold font-[Nunito] mb-2">Encontre profissionais</h1>
          <p className="text-muted-foreground text-sm mb-6">Milhares de profissionais qualificados perto de você</p>

          {/* Search bar */}
          <div className="flex gap-2 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
              <Input
                placeholder="Buscar por nome, serviço..."
                className="pl-10 rounded-xl h-12 text-base"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
              />
            </div>
            <Button
              variant="outline"
              className="h-12 rounded-xl px-4 gap-2 font-semibold"
              onClick={() => setShowFilters(!showFilters)}
            >
              <SlidersHorizontal size={16} /> Filtros
            </Button>
          </div>

          {/* Filters */}
          {showFilters && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="bg-card rounded-2xl border border-border p-4 mb-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="text-xs font-semibold mb-1 block text-muted-foreground">Categoria</label>
                  <Select value={categoria} onValueChange={v => { setCategoria(v); setVisibleCount(6); }}>
                    <SelectTrigger className="rounded-xl h-10"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {CATEGORIAS.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-xs font-semibold mb-1 block text-muted-foreground">Cidade</label>
                  <Select value={cidade} onValueChange={v => { setCidade(v); setVisibleCount(6); }}>
                    <SelectTrigger className="rounded-xl h-10"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {CIDADES.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-xs font-semibold mb-1 block text-muted-foreground">Ordenar por</label>
                  <Select value={sortBy} onValueChange={v => setSortBy(v as SortOption)}>
                    <SelectTrigger className="rounded-xl h-10"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="rating">Melhor avaliação</SelectItem>
                      <SelectItem value="reviews">Mais avaliados</SelectItem>
                      <SelectItem value="name">Nome (A-Z)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </motion.div>
          )}

          {/* Results count */}
          <p className="text-sm text-muted-foreground mb-4">{filtered.length} profissional(is) encontrado(s)</p>

          {/* Professionals list */}
          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <Search size={48} className="mx-auto text-muted-foreground mb-4" />
              <h3 className="font-bold text-lg">Nenhum profissional encontrado</h3>
              <p className="text-muted-foreground text-sm mt-1">Tente ajustar os filtros ou termos de busca</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {visible.map((pro, idx) => (
                <motion.div
                  key={pro.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  onClick={() => navigate(`/profissional/${pro.id}`)}
                  className="bg-card rounded-2xl border border-border p-5 shadow-sm hover:shadow-lg hover:border-primary/30 transition-all cursor-pointer group"
                >
                  <div className="flex items-center gap-4 mb-3">
                    <img src={pro.photo} alt={pro.name} className="w-14 h-14 rounded-full object-cover border-2 border-primary/20 group-hover:border-primary transition-colors" />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-sm truncate">{pro.name}</h3>
                      <div className="flex items-center gap-1 mt-0.5">
                        <Star size={12} className="fill-yellow-400 text-yellow-400" />
                        <span className="text-xs font-bold">{pro.rating}</span>
                        <span className="text-xs text-muted-foreground">({pro.totalReviews})</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    <span className="inline-flex items-center gap-1 bg-primary/10 text-primary text-xs font-bold px-2 py-0.5 rounded-full">
                      <Tag size={10} /> {pro.categoria}
                    </span>
                    <span className="inline-flex items-center gap-1 text-muted-foreground text-xs">
                      <MapPin size={10} /> {pro.cidade}, {pro.estado}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground line-clamp-2">{pro.bio}</p>
                </motion.div>
              ))}
            </div>
          )}

          {/* Load more (infinite scroll sim) */}
          {hasMore && (
            <div className="text-center mt-8">
              <Button variant="outline" className="rounded-xl font-bold gap-2 px-8" onClick={() => setVisibleCount(prev => prev + 6)}>
                <ChevronDown size={16} /> Carregar mais
              </Button>
            </div>
          )}
        </motion.div>
      </div>
      <Footer />
    </div>
  );
};

export default Busca;
