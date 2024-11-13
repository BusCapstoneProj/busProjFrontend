function Card({ children }) {
  return (
    <div className="max-w-md mx-auto">
      <div className="bg-white/95 backdrop-blur-lg p-8 rounded-xl shadow-2xl border-t-4 border-t-yellow-400 border-x border-b border-blue-100 transform hover:scale-[1.02] transition-transform duration-300">
        {children}
      </div>
    </div>
  );
}

export default Card;