import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";
import Header from "@/components/Header";
import logo from "@/assets/logo.png";

const Login = () => {
  const navigate = useNavigate();
  const [showPass, setShowPass] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string; general?: string }>({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const newErrors: typeof errors = {};
    if (!email.trim()) newErrors.email = "E-mail é obrigatório";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) newErrors.email = "Formato de e-mail inválido";
    if (!password) newErrors.password = "Senha é obrigatória";
    else if (password.length < 6) newErrors.password = "Mínimo de 6 caracteres";
    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = validate();
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    setLoading(true);
    // Simula login
    setTimeout(() => {
      setLoading(false);
      // Mock: redireciona ao buscar
      navigate("/busca");
    }, 1200);
  };

  const ErrorMsg = ({ msg }: { msg?: string }) => (
    <AnimatePresence>
      {msg && (
        <motion.p
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          className="text-destructive text-xs mt-1 flex items-center gap-1"
        >
          <AlertCircle size={12} /> {msg}
        </motion.p>
      )}
    </AnimatePresence>
  );

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-primary/5 via-background to-accent/10">
      <Header />
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
          <div className="bg-card rounded-3xl shadow-xl border border-border p-8">
            <div className="text-center mb-8">
              <img src={logo} alt="HelpHome" className="h-16 w-auto mx-auto mb-4" />
              <h1 className="text-2xl font-extrabold font-[Nunito]">Bem-vindo de volta!</h1>
              <p className="text-muted-foreground text-sm mt-1">Entre na sua conta para continuar</p>
            </div>

            {errors.general && (
              <div className="bg-destructive/10 border border-destructive/30 rounded-xl p-3 mb-4 flex items-center gap-2 text-destructive text-sm">
                <AlertCircle size={16} /> {errors.general}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-sm font-semibold mb-1 block">E-mail</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
                  <Input
                    placeholder="seu@email.com"
                    className={`pl-10 rounded-xl h-11 ${errors.email ? "border-destructive ring-destructive/30 ring-2" : ""}`}
                    value={email}
                    onChange={e => { setEmail(e.target.value); setErrors(prev => ({ ...prev, email: undefined })); }}
                  />
                </div>
                <ErrorMsg msg={errors.email} />
              </div>
              <div>
                <label className="text-sm font-semibold mb-1 block">Senha</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
                  <Input
                    type={showPass ? "text" : "password"}
                    placeholder="••••••"
                    className={`pl-10 pr-10 rounded-xl h-11 ${errors.password ? "border-destructive ring-destructive/30 ring-2" : ""}`}
                    value={password}
                    onChange={e => { setPassword(e.target.value); setErrors(prev => ({ ...prev, password: undefined })); }}
                  />
                  <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors" onClick={() => setShowPass(!showPass)}>
                    {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                <ErrorMsg msg={errors.password} />
              </div>
              <div className="text-right">
                <Link to="/" className="text-xs text-primary font-semibold hover:underline">Esqueceu a senha?</Link>
              </div>
              <Button type="submit" className="w-full h-11 rounded-xl font-bold text-base" disabled={loading}>
                {loading ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                    Entrando...
                  </span>
                ) : "Entrar"}
              </Button>
            </form>

            <div className="flex items-center gap-3 my-6">
              <div className="flex-1 h-px bg-border" />
              <span className="text-xs text-muted-foreground">ou</span>
              <div className="flex-1 h-px bg-border" />
            </div>

            <Button variant="outline" className="w-full h-11 rounded-xl font-semibold gap-2">
              <svg width="18" height="18" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
              Entrar com Google
            </Button>

            <p className="text-center text-sm text-muted-foreground mt-6">
              Não tem conta? <Link to="/cadastro" className="text-primary font-bold hover:underline">Cadastre-se</Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
