const Home = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section id="home" className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="space-y-8">
            {/* Event Title */}
            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-boxing font-bold">
                <span className="text-primary-500">STREAM</span>
                <span className="text-white"> FIGHTERS</span>
                <div className="text-gold-500">4</div>
              </h1>
              <p className="text-xl md:text-2xl text-gray-300">
                El evento de boxeo más esperado de Colombia
              </p>
              <p className="text-lg text-gray-400">
                Organizado por <span className="text-primary-500 font-semibold">Westcol</span>
              </p>
            </div>

            {/* Event Poster Placeholder */}
            <div className="mx-auto w-full max-w-md md:max-w-lg">
              <div className="bg-gray-700 rounded-lg p-8 border-2 border-gray-600">
                <div className="text-6xl mb-4">🥊</div>
                <p className="text-gray-400">Poster del Evento</p>
                <p className="text-sm text-gray-500 mt-2">
                  (Aquí irá la imagen oficial)
                </p>
              </div>
            </div>

            {/* Countdown Timer Placeholder */}
            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 max-w-md mx-auto">
              <h3 className="text-lg font-semibold mb-4 text-gray-300">
                Faltan para el evento:
              </h3>
              <div className="grid grid-cols-4 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-primary-500">12</div>
                  <div className="text-sm text-gray-400">Días</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-primary-500">08</div>
                  <div className="text-sm text-gray-400">Horas</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-primary-500">24</div>
                  <div className="text-sm text-gray-400">Min</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-primary-500">36</div>
                  <div className="text-sm text-gray-400">Seg</div>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button className="bg-gold-500 hover:bg-gold-600 text-black font-bold px-8 py-4 rounded-lg text-lg transition-colors">
                🎫 Comprar Boletas
              </button>
              <button className="bg-primary-600 hover:bg-primary-700 text-white font-semibold px-8 py-4 rounded-lg text-lg transition-colors">
                Ver Peleas
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Fights Section */}
      <section id="fights" className="py-16 bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-boxing font-bold text-white mb-4">
              Peleas Confirmadas
            </h2>
            <p className="text-gray-400 text-lg">
              Vota por tu peleador favorito
            </p>
          </div>

          {/* Fights List Placeholder */}
          <div className="space-y-6">
            {[1, 2, 3].map((fight) => (
              <div key={fight} className="bg-gray-700 rounded-lg p-6 border border-gray-600">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                  {/* Fighter 1 */}
                  <div className="text-center">
                    <div className="w-20 h-20 bg-gray-600 rounded-full mx-auto mb-3"></div>
                    <h3 className="font-semibold text-lg">Peleador {fight}A</h3>
                    <p className="text-gray-400">Record: 10-2</p>
                  </div>

                  {/* VS & Voting */}
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary-500 mb-4">VS</div>
                    <div className="space-y-2">
                      <div className="bg-gray-600 rounded-full h-3">
                        <div className="bg-primary-500 h-3 rounded-full" style={{width: '65%'}}></div>
                      </div>
                      <p className="text-sm text-gray-400">65% - 35%</p>
                      <button className="bg-primary-600 hover:bg-primary-700 px-4 py-2 rounded text-sm transition-colors">
                        Votar
                      </button>
                    </div>
                  </div>

                  {/* Fighter 2 */}
                  <div className="text-center">
                    <div className="w-20 h-20 bg-gray-600 rounded-full mx-auto mb-3"></div>
                    <h3 className="font-semibold text-lg">Peleador {fight}B</h3>
                    <p className="text-gray-400">Record: 8-3</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sponsors Section */}
      <section id="sponsors" className="py-16 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-boxing font-bold text-white mb-4">
              Patrocinadores
            </h2>
            <p className="text-gray-400">
              Gracias a nuestros patrocinadores oficiales
            </p>
          </div>

          {/* Sponsors Placeholder */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((sponsor) => (
              <div key={sponsor} className="bg-gray-800 rounded-lg p-6 flex items-center justify-center h-24 border border-gray-700 hover:bg-gray-700 transition-colors">
                <div className="text-gray-500">
                  Logo {sponsor}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;