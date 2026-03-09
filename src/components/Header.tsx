const Header = () => {
  return (
    <header className="bg-primary px-4 py-3 flex items-center justify-between">
      <img
        src="/images/beaver-logo.png"
        alt="Beaver Logo"
        className="h-10 w-10 object-contain"
      />
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
