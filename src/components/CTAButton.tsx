import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

interface Props {
  text: string;
  className?: string;
  variant?: "default" | "dark";
  href?: string;
}

const CTAButton = ({ text, className = "", variant = "default", href = "#oferta" }: Props) => {
  const navigate = useNavigate();
  const isInternal = href.startsWith("/") || href.startsWith("#");
  const isExternal = href.startsWith("http");

  const handleClick = (e: React.MouseEvent) => {
    // Facebook Pixel: track InitiateCheckout when clicking buy buttons
    if (typeof window !== "undefined" && (window as any).fbq) {
      (window as any).fbq("track", "InitiateCheckout");
    }
    if (isInternal && !href.startsWith("#")) {
      e.preventDefault();
      navigate(href);
    }
  };

  return (
    <motion.a
      href={href}
      onClick={handleClick}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      whileHover={{ scale: 1.05, boxShadow: "0 8px 30px hsl(38 85% 55% / 0.4)" }}
      whileTap={{ scale: 0.97 }}
      className={`${variant === "dark" ? "btn-cta-dark" : "btn-cta"} inline-block text-center cursor-pointer animate-pulse-cta ${className}`}
    >
      {text}
    </motion.a>
  );
};

export default CTAButton;
