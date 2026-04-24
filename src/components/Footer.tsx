import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import logo from "@/assets/logo.png";

const Footer = () => (
  <footer className="bg-secondary text-secondary-foreground py-12">
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <img src={logo} alt="HelpHome" className="h-8 w-auto" />
            <span className="text-lg font-extrabold font-[Nunito]">HelpHome</span>
          </div>
          <p className="text-sm opacity-70">Conectando você aos melhores profissionais da sua região.</p>
        </div>
        <div>
          <h4 className="font-bold mb-3 font-[Nunito]">Plataforma</h4>
          <ul className="space-y-2 text-sm opacity-70">
            <li><Link to="/" className="hover:opacity-100 transition-opacity">Como Funciona</Link></li>
            <li><Link to="/" className="hover:opacity-100 transition-opacity">Categorias</Link></li>
            <li><Link to="/" className="hover:opacity-100 transition-opacity">Para Profissionais</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-3 font-[Nunito]">Suporte</h4>
          <ul className="space-y-2 text-sm opacity-70">
            <li><Link to="/" className="hover:opacity-100 transition-opacity">Central de Ajuda</Link></li>
            <li><Link to="/" className="hover:opacity-100 transition-opacity">Termos de Uso</Link></li>
            <li><Link to="/" className="hover:opacity-100 transition-opacity">Privacidade</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-3 font-[Nunito]">Contato</h4>
          <ul className="space-y-2 text-sm opacity-70">
            <li>contato@helphome.com.br</li>
            <li>(11) 99999-0000</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-secondary-foreground/20 mt-8 pt-6 text-center text-sm opacity-60 flex items-center justify-center gap-1">
        Feito com <Heart size={14} className="text-primary fill-primary" /> HelpHome © 2026
      </div>
    </div>
  </footer>
);

export default Footer;
