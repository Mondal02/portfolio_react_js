import { FiLinkedin, FiMail } from "react-icons/fi";
import { socialLinks } from "../../data/socialLinks";

const iconMap = {
  linkedin: FiLinkedin,
  email: FiMail,
};

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-dark-950 text-dark-500 border-t border-white/5">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs font-mono tracking-wider">
            &copy; {currentYear}{" "}
            <span className="text-primary-500">Moumita Mondal</span> — All
            rights reserved
          </p>

          <div className="flex items-center gap-6">
            <span className="text-xs font-mono tracking-wider">
              Built with <span className="text-primary-500">precision</span> &amp;
              passion
            </span>

            <div className="flex items-center gap-3">
              {socialLinks.map((link) => {
                const Icon = iconMap[link.icon] || FiMail;
                return (
                  <a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 text-dark-500 hover:text-primary-400 transition-colors"
                    aria-label={link.name}
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
