import { Link } from "react-router-dom";
import { Home, SearchX } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";

const NotFound = () => (
  <div className="min-h-screen flex flex-col bg-gradient-to-br from-primary/5 via-background to-accent/10">
    <Header />
    <div className="flex-1 flex items-center justify-center px-4">
      <div className="text-center">
        <div className="w-20 h-20 rounded-3xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
          <SearchX size={40} className="text-primary" />
        </div>
        <h1 className="text-6xl font-extrabold text-primary mb-2 font-[Nunito]">404</h1>
        <h2 className="text-2xl font-bold mb-3 font-[Nunito]">Página não encontrada</h2>
        <p className="text-muted-foreground mb-8 max-w-sm mx-auto">A página que você procura não existe ou foi movida.</p>
        <Button asChild className="rounded-xl font-bold">
          <Link to="/"><Home size={16} className="mr-2" /> Voltar ao início</Link>
        </Button>
      </div>
    </div>
  </div>
);

export default NotFound;
