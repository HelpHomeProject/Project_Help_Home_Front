import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, User, Phone, Eye, EyeOff, Briefcase, UserCheck, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";
import Header from "@/components/Header";

type AccountType = "contratante" | "profissional" | null;

const Cadastro = () => {
  const navigate = useNavigate();
  const [accountType, setAccountType] = useState<AccountType>(null);
  const [showPass, setShowPass] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "", phone: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);

  const update = (field: string, value: string) => {
    setForm(f => ({ ...f, [field]: value }));
    setErrors(prev => { const n = { ...prev }; delete n[field]; return n; });
  };

  const formatPhone = (val: string) => {
    const digits = val.replace(/\D/g, "").slice(0, 11);
    if (digits.length <= 2) return digits;
    if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
  };

  const validate = () => {
    const e: Record<string, string> = {};
    if (!accountType) e.type = "Selecione o tipo de conta";
    if (!form.name.trim()) e.name = "Nome é obrigatório";
    else if (form.name.trim().split(" ").length < 2) e.name = "Informe nome e sobrenome";
    if (!form.email) e.email = "E-mail é obrigatório";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Formato de e-mail inválido";
    if (!form.password) e.password = "Senha é obrigatória";
    else if (form.password.length < 6) e.password = "Mínimo de 6 caracteres";
    else if (!/(?=.*[A-Z])/.test(form.password)) e.password = "Inclua ao menos uma letra maiúscula";
    const phoneDigits = form.phone.replace(/\D/g, "");
    if (!phoneDigits) e.phone = "Telefone é obrigatório";
    else if (phoneDigits.length < 10) e.phone = "Telefone incompleto";
    if (!agreed) e.agreed = "Aceite os termos para continuar";
    return e;
  };

  const handleSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();
    const newErrors = validate();
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (accountType === "profissional") {
        navigate("/onboarding");
      } else {
        navigate("/busca");
      }
    }, 1200);
  };

  const ErrorMsg = ({ msg }: { msg?: string }) => (
    <AnimatePresence>
      {msg && (
        <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }} className="text-destructive text-xs mt-1 flex items-center gap-1">
          <AlertCircle size={12} /> {msg}
        </motion.p>
      )}
    </AnimatePresence>
  );

  const typeCards: { type: AccountType; icon: typeof UserCheck; title: string; desc: string }[] = [
    { type: "contratante", icon: UserCheck, title: "Contratante", desc: "Quero contratar profissionais" },
    { type: "profissional", icon: Briefcase, title: "Profissional", desc: "Quero oferecer meus serviços" },
  ];

  // Password strength
  const strength = (() => {
    const p = form.password;
    if (!p) return 0;
    let s = 0;
    if (p.length >= 6) s++;
    if (/[A-Z]/.test(p)) s++;
    if (/[0-9]/.test(p)) s++;
    if (/[^A-Za-z0-9]/.test(p)) s++;
    return s;
  })();
  const strengthColor = ["bg-destructive", "bg-destructive", "bg-yellow-500", "bg-accent", "bg-primary"];
  const strengthLabel = ["", "Fraca", "Razoável", "Boa", "Forte"];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-primary/5 via-background to-accent/10">
      <Header />
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
          <div className="bg-card rounded-3xl shadow-xl border border-border p-8">
            <div className="text-center mb-6">
              <h1 className="text-2xl font-extrabold font-[Nunito]">Crie sua conta</h1>
              <p className="text-muted-foreground text-sm mt-1">Comece a usar a plataforma em segundos</p>
            </div>

            {/* Account type */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              {typeCards.map(tc => (
                <button
                  key={tc.type}
                  type="button"
                  onClick={() => { setAccountType(tc.type); setErrors(prev => { const n = { ...prev }; delete n.type; return n; }); }}
                  className={`flex flex-col items-center p-4 rounded-2xl border-2 transition-all ${accountType === tc.type ? "border-primary bg-primary/5 shadow-md" : "border-border hover:border-primary/40"}`}
                >
                  <tc.icon size={24} className={accountType === tc.type ? "text-primary" : "text-muted-foreground"} />
                  <span className="font-bold text-sm mt-2">{tc.title}</span>
                  <span className="text-xs text-muted-foreground mt-0.5">{tc.desc}</span>
                </button>
              ))}
            </div>
            <ErrorMsg msg={errors.type} />

            <form onSubmit={handleSubmit} className="space-y-3 mt-4">
              {/* Name */}
              <div>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
                  <Input placeholder="Nome completo" className={`pl-10 rounded-xl h-11 ${errors.name ? "border-destructive ring-destructive/30 ring-2" : ""}`} value={form.name} onChange={e => update("name", e.target.value)} />
                </div>
                <ErrorMsg msg={errors.name} />
              </div>
              {/* Email */}
              <div>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
                  <Input placeholder="E-mail" className={`pl-10 rounded-xl h-11 ${errors.email ? "border-destructive ring-destructive/30 ring-2" : ""}`} value={form.email} onChange={e => update("email", e.target.value)} />
                </div>
                <ErrorMsg msg={errors.email} />
              </div>
              {/* Phone */}
              <div>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
                  <Input placeholder="(11) 99999-0000" className={`pl-10 rounded-xl h-11 ${errors.phone ? "border-destructive ring-destructive/30 ring-2" : ""}`} value={form.phone} onChange={e => update("phone", formatPhone(e.target.value))} />
                </div>
                <ErrorMsg msg={errors.phone} />
              </div>
              {/* Password */}
              <div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
                  <Input type={showPass ? "text" : "password"} placeholder="Senha (mín. 6 caracteres)" className={`pl-10 pr-10 rounded-xl h-11 ${errors.password ? "border-destructive ring-destructive/30 ring-2" : ""}`} value={form.password} onChange={e => update("password", e.target.value)} />
                  <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors" onClick={() => setShowPass(!showPass)}>
                    {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                <ErrorMsg msg={errors.password} />
                {form.password && (
                  <div className="flex items-center gap-2 mt-2">
                    <div className="flex-1 flex gap-1">
                      {[1, 2, 3, 4].map(i => (
                        <div key={i} className={`h-1 flex-1 rounded-full transition-colors ${i <= strength ? strengthColor[strength] : "bg-border"}`} />
                      ))}
                    </div>
                    <span className="text-xs text-muted-foreground">{strengthLabel[strength]}</span>
                  </div>
                )}
              </div>

              <label className="flex items-start gap-2 cursor-pointer pt-1">
                <input type="checkbox" checked={agreed} onChange={e => { setAgreed(e.target.checked); setErrors(prev => { const n = { ...prev }; delete n.agreed; return n; }); }} className="mt-1 accent-primary" />
                <span className="text-xs text-muted-foreground">
                  Li e aceito os <a href="#" className="text-primary font-semibold hover:underline">Termos de Uso</a> e a <a href="#" className="text-primary font-semibold hover:underline">Política de Privacidade</a>
                </span>
              </label>
              <ErrorMsg msg={errors.agreed} />

              <Button type="submit" className="w-full h-11 rounded-xl font-bold text-base mt-2" disabled={loading}>
                {loading ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                    Criando conta...
                  </span>
                ) : "Criar conta"}
              </Button>
            </form>

            <p className="text-center text-sm text-muted-foreground mt-6">
              Já tem conta? <Link to="/login" className="text-primary font-bold hover:underline">Entrar</Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Cadastro;
