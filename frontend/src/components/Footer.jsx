const Footer = () => {
  return (
    <footer className="bg-surface shadow-md border border-gray-200 p-6 mt-8">
      <div className="container mx-auto text-center text-text-muted">
        <p>&copy; {new Date().getFullYear()} BookMyShow Clone. All rights reserved.</p>
        <p className="mt-2 text-sm">Built with React, Node.js, and MongoDB.</p>
      </div>
    </footer>
  );
};

export default Footer;
