import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Camera, MapPin, FileText, Tag, ChevronRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { motion, AnimatePresence } from "framer-motion";
import Header from "@/components/Header";

const CATEGORIAS = [
  "Reformas e Reparos", "Limpeza", "Encanamento", "Eletricista",
  "Pintura", "Jardinagem", "Mudanças", "Design de Interiores",
  "Aulas Particulares", "Tecnologia", "Beleza e Estética", "Outros",
];

const ESTADOS = [
  "AC","AL","AP","AM","BA","CE","DF","ES","GO","MA","MT","MS","MG",
  "PA","PB","PR","PE","PI","RJ","RN","RS","RO","RR","SC","SP","SE","TO",
];

const Onboarding = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [photo, setPhoto] = useState<string | null>(null);
  const [bio, setBio] = useState("");
  const [categoria, setCategoria] = useState("");
  const [cidade, setCidade] = useState("");
  const [estado, setEstado] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handlePhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setErrors(prev => ({ ...prev, photo: "Imagem deve ter no máximo 5MB" }));
        return;
      }
      const reader = new FileReader();
      reader.onload = (ev) => {
        setPhoto(ev.target?.result as string);
        setErrors(prev => { const n = { ...prev }; delete n.photo; return n; });
      };
      reader.readAsDataURL(file);
    }
  };

  const validateStep = () => {
    const e: Record<string, string> = {};
    if (step === 0 && !photo) e.photo = "Envie uma foto de perfil";
    if (step === 1 && bio.trim().length < 20) e.bio = "A bio deve ter pelo menos 20 caracteres";
    if (step === 2 && !categoria) e.categoria = "Selecione uma categoria";
    if (step === 3) {
      if (!cidade.trim()) e.cidade = "Informe sua cidade";
      if (!estado) e.estado = "Selecione o estado";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const next = () => {
    if (!validateStep()) return;
    if (step < 3) setStep(step + 1);
    else navigate("/portfolio");
  };

  const steps = [
    { label: "Foto", icon: Camera },
    { label: "Bio", icon: FileText },
    { label: "Categoria", icon: Tag },
    { label: "Localização", icon: MapPin },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-primary/5 via-background to-accent/10">
      <Header />
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-lg">
          <div className="bg-card rounded-3xl shadow-xl border border-border p-8">
            <h1 className="text-2xl font-extrabold font-[Nunito] text-center mb-2">Complete seu perfil</h1>
            <p className="text-muted-foreground text-sm text-center mb-8">Essas informações ajudam contratantes a te encontrar</p>

            {/* Stepper */}
            <div className="flex items-center justify-between mb-8 px-4">
              {steps.map((s, i) => (
                <div key={i} className="flex items-center gap-1">
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${i < step ? "bg-primary text-primary-foreground" : i === step ? "bg-primary text-primary-foreground shadow-lg" : "bg-muted text-muted-foreground"}`}>
                    {i < step ? <CheckCircle2 size={18} /> : <s.icon size={16} />}
                  </div>
                  {i < steps.length - 1 && <div className={`w-8 sm:w-12 h-0.5 ${i < step ? "bg-primary" : "bg-border"}`} />}
                </div>
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div key={step} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.2 }}>
                {step === 0 && (
                  <div className="text-center space-y-4">
                    <label className="cursor-pointer inline-block">
                      <div className={`w-32 h-32 rounded-full mx-auto border-4 ${errors.photo ? "border-destructive" : "border-primary/30"} overflow-hidden bg-muted flex items-center justify-center hover:border-primary transition-colors`}>
                        {photo ? (
                          <img src={photo} alt="Preview" className="w-full h-full object-cover" />
                        ) : (
                          <Camera size={36} className="text-muted-foreground" />
                        )}
                      </div>
                      <input type="file" accept="image/*" className="hidden" onChange={handlePhoto} />
                    </label>
                    <p className="text-sm text-muted-foreground">Clique para enviar sua foto</p>
                    {errors.photo && <p className="text-destructive text-xs">{errors.photo}</p>}
                  </div>
                )}

                {step === 1 && (
                  <div className="space-y-3">
                    <label className="text-sm font-semibold block">Sobre você</label>
                    <Textarea
                      placeholder="Conte sobre sua experiência, especialidades e o que te diferencia..."
                      className={`rounded-xl min-h-[120px] ${errors.bio ? "border-destructive ring-destructive/30 ring-2" : ""}`}
                      value={bio}
                      onChange={e => { setBio(e.target.value); setErrors(prev => { const n = { ...prev }; delete n.bio; return n; }); }}
                      maxLength={500}
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>{bio.length}/500 caracteres</span>
                      {errors.bio && <span className="text-destructive">{errors.bio}</span>}
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div className="space-y-3">
                    <label className="text-sm font-semibold block">Categoria principal</label>
                    <div className="grid grid-cols-2 gap-2">
                      {CATEGORIAS.map(cat => (
                        <button
                          key={cat}
                          type="button"
                          onClick={() => { setCategoria(cat); setErrors(prev => { const n = { ...prev }; delete n.categoria; return n; }); }}
                          className={`p-3 rounded-xl text-sm font-medium border-2 transition-all text-left ${categoria === cat ? "border-primary bg-primary/5 text-primary" : "border-border hover:border-primary/40 text-foreground"}`}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>
                    {errors.categoria && <p className="text-destructive text-xs mt-1">{errors.categoria}</p>}
                  </div>
                )}

                {step === 3 && (
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-semibold block mb-1">Cidade</label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
                        <Input
                          placeholder="Sua cidade"
                          className={`pl-10 rounded-xl h-11 ${errors.cidade ? "border-destructive ring-destructive/30 ring-2" : ""}`}
                          value={cidade}
                          onChange={e => { setCidade(e.target.value); setErrors(prev => { const n = { ...prev }; delete n.cidade; return n; }); }}
                        />
                      </div>
                      {errors.cidade && <p className="text-destructive text-xs mt-1">{errors.cidade}</p>}
                    </div>
                    <div>
                      <label className="text-sm font-semibold block mb-1">Estado</label>
                      <Select value={estado} onValueChange={v => { setEstado(v); setErrors(prev => { const n = { ...prev }; delete n.estado; return n; }); }}>
                        <SelectTrigger className={`rounded-xl h-11 ${errors.estado ? "border-destructive ring-destructive/30 ring-2" : ""}`}>
                          <SelectValue placeholder="Selecione o estado" />
                        </SelectTrigger>
                        <SelectContent>
                          {ESTADOS.map(uf => (
                            <SelectItem key={uf} value={uf}>{uf}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.estado && <p className="text-destructive text-xs mt-1">{errors.estado}</p>}
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            <div className="flex gap-3 mt-8">
              {step > 0 && (
                <Button variant="outline" className="flex-1 h-11 rounded-xl font-bold" onClick={() => setStep(step - 1)}>
                  Voltar
                </Button>
              )}
              <Button className="flex-1 h-11 rounded-xl font-bold gap-2" onClick={next}>
                {step < 3 ? <>Próximo <ChevronRight size={16} /></> : "Finalizar"}
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Onboarding;
