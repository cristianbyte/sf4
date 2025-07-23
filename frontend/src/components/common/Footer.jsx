import { MapPin, Calendar, Clock, Phone, Mail, Instagram, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 border-t border-gray-700 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Event Info */}
          <div>
            <h3 className="text-lg font-boxing font-semibold mb-4 text-primary-500">
              Información del Evento
            </h3>
            <div className="space-y-3 text-sm text-gray-300">
              <div className="flex items-center space-x-2">
                <Calendar size={16} />
                <span>15 de Agosto, 2025</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock size={16} />
                <span>7:00 PM COL</span>
              </div>
              <div className="flex items-start space-x-2">
                <MapPin size={16} className="mt-0.5" />
                <div>
                  <p>Coliseo El Campín</p>
                  <p className="text-gray-400">Bogotá, Colombia</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-boxing font-semibold mb-4 text-primary-500">
              Contacto
            </h3>
            <div className="space-y-3 text-sm text-gray-300">
              <div className="flex items-center space-x-2">
                <Phone size={16} />
                <span>+57 1 234 5678</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail size={16} />
                <span>info@sf4.com</span>
              </div>
              <div className="pt-2">
                <p className="text-gray-400 text-xs">
                  Soporte técnico disponible 24/7
                </p>
              </div>
            </div>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="text-lg font-boxing font-semibold mb-4 text-primary-500">
              Legal
            </h3>
            <div className="space-y-2 text-sm">
              <a href="#terms" className="block text-gray-300 hover:text-white transition-colors">
                Términos y Condiciones
              </a>
              <a href="#privacy" className="block text-gray-300 hover:text-white transition-colors">
                Política de Privacidad
              </a>
              <a href="#faq" className="block text-gray-300 hover:text-white transition-colors">
                Preguntas Frecuentes
              </a>
              <p className="text-gray-400 text-xs pt-2">
                Mayores de 18 años para votar
              </p>
            </div>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-lg font-boxing font-semibold mb-4 text-primary-500">
              Síguenos
            </h3>
            <div className="space-y-3">
              <div className="flex space-x-4">
                <a 
                  href="#" 
                  className="bg-gray-700 hover:bg-gray-600 p-2 rounded-lg transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram size={20} />
                </a>
                <a 
                  href="#" 
                  className="bg-gray-700 hover:bg-gray-600 p-2 rounded-lg transition-colors"
                  aria-label="Twitter"
                >
                  <Twitter size={20} />
                </a>
              </div>
              <div className="text-sm text-gray-300">
                <p className="font-medium">@westcol</p>
                <p className="text-gray-400">#SF4 #StreamFighters4</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-8 pt-6">
          <div className="flex flex-col sm:flex-row justify-between items-center text-sm text-gray-400">
            <p>
              © 2025 SF4 - Stream Fighters 4. Todos los derechos reservados.
            </p>
            <p className="mt-2 sm:mt-0">
              Organizado por <span className="text-primary-500 font-semibold">Westcol</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;