const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-1 pb-3">
          <h2 className="text-lg font-semibold">Our history</h2>
          <p className="text-justify">PAOTScan® is a French IoT – BioTech StartUp specialized in antioxidants technology and applications, for a better health.</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Produit</h3>
            <ul className="text-sm">
              <li>Fonctionnalités</li>
              <li>Tarification</li>
              <li>Nouveautés</li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Entreprise</h3>
            <ul className="text-sm">
              <li>À propos</li>
              <li>Carrières</li>
              <li>Contact</li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Ressources</h3>
            <ul className="text-sm">
              <li>Blog</li>
              <li>Documentation</li>
              <li>FAQ</li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Suivez-nous</h3>
            <ul className="flex space-x-4 text-lg">
              <li>🔵</li>
              <li>🟣</li>
              <li>🟡</li>
            </ul>
          </div>
        </div>
        <div className="mt-8 text-center">
          <p className="text-sm">© 2023 MyPaotScan. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
