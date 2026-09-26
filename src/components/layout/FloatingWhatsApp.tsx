"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import { DEFAULT_WHATSAPP_MESSAGE, whatsappUrl } from "@/lib/site";
import { WhatsAppIcon } from "@/components/ui/icons";

/** Appears once the visitor scrolls past the hero; hides again near the contact section. */
export function FloatingWhatsApp() {
  const [visible, setVisible] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    const onScroll = () => {
      const contact = document.getElementById("contact");
      const nearContact = contact ? contact.getBoundingClientRect().top < window.innerHeight * 0.8 : false;
      setVisible(window.scrollY > window.innerHeight * 0.7 && !nearContact);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible ? (
        <motion.a
          key="wa"
          href={whatsappUrl(DEFAULT_WHATSAPP_MESSAGE)}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat with Nada on WhatsApp (opens in a new tab)"
          initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.6, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.6, y: 16 }}
          transition={{ type: "spring", stiffness: 320, damping: 24 }}
          className="group fixed right-4 bottom-4 z-40 flex h-14 items-center gap-2 rounded-full bg-[#168a4a] pr-4 pl-4 text-white shadow-[0_12px_32px_-8px_rgba(22,138,74,.6)] transition-colors hover:bg-[#12733d] sm:right-6 sm:bottom-6"
          style={{ marginBottom: "env(safe-area-inset-bottom)" }}
        >
          <WhatsAppIcon size={24} />
          <span className="hidden text-sm font-medium sm:inline">Let&apos;s talk data</span>
        </motion.a>
      ) : null}
    </AnimatePresence>
  );
}
