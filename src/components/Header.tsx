import { ArrowLeft } from "lucide-react";

interface HeaderProps {
  onBack?: () => void;
}

const Header = ({ onBack }: HeaderProps) => {
  return (
    <header className="bg-primary px-4 py-3 flex items-center justify-between">
      <div className="w-10 h-10 flex items-center justify-start">
        {onBack ? (
          <button onClick={onBack} className="text-primary-foreground p-1" aria-label="Go back">
            <ArrowLeft size={24} />
          </button>
        ) : (
          <img
            src="/images/beaver-logo.png"
            alt="Beaver Logo"
            className="h-[60px] w-[60px] object-contain"
          />
        )}
      </div>
      <h1 className="text-primary-foreground font-bold text-xl tracking-tight">
        Beaver Rooms
      </h1>
      <img
        src="/images/mit-sloan-logo.png"
        alt="MIT Sloan Logo"
        className="h-10 w-auto object-contain"
      />
    </header>
  );
};

export default Header;
