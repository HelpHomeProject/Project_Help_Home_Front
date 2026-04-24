import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Trash2, Image, X, Camera } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { motion, AnimatePresence } from "framer-motion";
import Header from "@/components/Header";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface Work {
  id: string;
  title: string;
  description: string;
  image: string;
}

const Portfolio = () => {
  const navigate = useNavigate();
  const [works, setWorks] = useState<Work[]>([
    { id: "1", title: "Reforma de cozinha completa", description: "Projeto de reforma incluindo troca de piso, bancada e armários planejados.", image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop" },
    { id: "2", title: "Pintura residencial", description: "Pintura completa de apartamento de 80m² com acabamento premium.", image: "https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=400&h=300&fit=crop" },
  ]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [newWork, setNewWork] = useState({ title: "", description: "", image: "" });
  const [newPhoto, setNewPhoto] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => setNewPhoto(ev.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const addWork = () => {
    const e: Record<string, string> = {};
    if (!newWork.title.trim()) e.title = "Título obrigatório";
    if (!newWork.description.trim()) e.description = "Descrição obrigatória";
    if (!newPhoto) e.photo = "Envie uma foto do trabalho";
    setErrors(e);
    if (Object.keys(e).length > 0) return;

    setWorks(prev => [...prev, {
      id: Date.now().toString(),
      title: newWork.title,
      description: newWork.description,
      image: newPhoto!,
    }]);
    setNewWork({ title: "", description: "", image: "" });
    setNewPhoto(null);
    setDialogOpen(false);
  };

  const removeWork = (id: string) => {
    setWorks(prev => prev.filter(w => w.id !== id));
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-primary/5 via-background to-accent/10">
      <Header />
      <div className="flex-1 px-4 py-12 max-w-4xl mx-auto w-full">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-extrabold font-[Nunito]">Meu Portfólio</h1>
              <p className="text-muted-foreground text-sm mt-1">Mostre seus melhores trabalhos para atrair contratantes</p>
            </div>
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogTrigger asChild>
                <Button className="rounded-xl font-bold gap-2">
                  <Plus size={16} /> Adicionar
                </Button>
              </DialogTrigger>
              <DialogContent className="rounded-2xl">
                <DialogHeader>
                  <DialogTitle className="font-[Nunito] font-extrabold">Novo trabalho</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 mt-2">
                  <label className="cursor-pointer block">
                    <div className={`w-full h-40 rounded-xl border-2 border-dashed ${errors.photo ? "border-destructive" : "border-border"} bg-muted/50 flex flex-col items-center justify-center hover:border-primary transition-colors overflow-hidden`}>
                      {newPhoto ? (
                        <img src={newPhoto} alt="Preview" className="w-full h-full object-cover" />
                      ) : (
                        <>
                          <Camera size={32} className="text-muted-foreground mb-2" />
                          <span className="text-sm text-muted-foreground">Clique para enviar foto</span>
                        </>
                      )}
                    </div>
                    <input type="file" accept="image/*" className="hidden" onChange={handlePhotoUpload} />
                  </label>
                  {errors.photo && <p className="text-destructive text-xs">{errors.photo}</p>}

                  <div>
                    <Input
                      placeholder="Título do trabalho"
                      className={`rounded-xl h-11 ${errors.title ? "border-destructive ring-destructive/30 ring-2" : ""}`}
                      value={newWork.title}
                      onChange={e => { setNewWork(p => ({ ...p, title: e.target.value })); setErrors(prev => { const n = { ...prev }; delete n.title; return n; }); }}
                    />
                    {errors.title && <p className="text-destructive text-xs mt-1">{errors.title}</p>}
                  </div>
                  <div>
                    <Textarea
                      placeholder="Descreva o que foi feito..."
                      className={`rounded-xl min-h-[80px] ${errors.description ? "border-destructive ring-destructive/30 ring-2" : ""}`}
                      value={newWork.description}
                      onChange={e => { setNewWork(p => ({ ...p, description: e.target.value })); setErrors(prev => { const n = { ...prev }; delete n.description; return n; }); }}
                    />
                    {errors.description && <p className="text-destructive text-xs mt-1">{errors.description}</p>}
                  </div>
                  <Button className="w-full h-11 rounded-xl font-bold" onClick={addWork}>
                    Adicionar trabalho
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {works.length === 0 ? (
            <div className="text-center py-20">
              <Image size={48} className="mx-auto text-muted-foreground mb-4" />
              <h3 className="font-bold text-lg">Nenhum trabalho ainda</h3>
              <p className="text-muted-foreground text-sm mt-1">Adicione fotos dos seus trabalhos para montar seu portfólio</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <AnimatePresence>
                {works.map(w => (
                  <motion.div
                    key={w.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="bg-card rounded-2xl shadow-md border border-border overflow-hidden group"
                  >
                    <div className="relative h-48">
                      <img src={w.image} alt={w.title} className="w-full h-full object-cover" />
                      <button
                        onClick={() => removeWork(w.id)}
                        className="absolute top-3 right-3 bg-destructive text-destructive-foreground p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg hover:scale-110"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-sm">{w.title}</h3>
                      <p className="text-muted-foreground text-xs mt-1 line-clamp-2">{w.description}</p>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}

          <div className="flex gap-3 mt-8 justify-center">
            <Button variant="outline" className="rounded-xl font-bold px-8" onClick={() => navigate("/onboarding")}>
              Voltar
            </Button>
            <Button className="rounded-xl font-bold px-8" onClick={() => navigate("/profissional/1")}>
              Ver meu perfil
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Portfolio;
