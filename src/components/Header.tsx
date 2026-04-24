import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.png";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-card/90 backdrop-blur-md border-b border-border shadow-sm">
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="HelpHome" className="h-10 w-auto" />
          <span className="text-xl font-extrabold text-foreground font-[Nunito]">HelpHome</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          <Link to="/" className="text-sm font-semibold text-muted-foreground hover:text-primary transition-colors">Início</Link>
          <a href="#como-funciona" className="text-sm font-semibold text-muted-foreground hover:text-primary transition-colors">Como Funciona</a>
          <a href="#categorias" className="text-sm font-semibold text-muted-foreground hover:text-primary transition-colors">Categorias</a>
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <Button variant="ghost" asChild><Link to="/login">Entrar</Link></Button>
          <Button asChild><Link to="/cadastro">Cadastre-se</Link></Button>
        </div>

        <button className="md:hidden p-2" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-card border-t border-border px-4 pb-4 space-y-3">
          <Link to="/" onClick={() => setMenuOpen(false)} className="block py-2 font-semibold text-muted-foreground">Início</Link>
          <a href="#como-funciona" onClick={() => setMenuOpen(false)} className="block py-2 font-semibold text-muted-foreground">Como Funciona</a>
          <a href="#categorias" onClick={() => setMenuOpen(false)} className="block py-2 font-semibold text-muted-foreground">Categorias</a>
          <div className="flex gap-3 pt-2">
            <Button variant="ghost" asChild className="flex-1"><Link to="/login">Entrar</Link></Button>
            <Button asChild className="flex-1"><Link to="/cadastro">Cadastre-se</Link></Button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
