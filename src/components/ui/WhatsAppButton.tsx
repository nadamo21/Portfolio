import { DEFAULT_WHATSAPP_MESSAGE, whatsappUrl } from "@/lib/site";
import { ButtonLink } from "./Button";
import { WhatsAppIcon } from "./icons";

type Props = {
  label?: string;
  /** Pre-filled message for the WhatsApp chat. */
  message?: string;
  size?: "md" | "lg";
  magnetic?: boolean;
  className?: string;
};

/** Reusable WhatsApp CTA — every WhatsApp button on the site goes through this. */
export function WhatsAppButton({
  label = "Let's work together",
  message = DEFAULT_WHATSAPP_MESSAGE,
  size = "md",
  magnetic,
  className,
}: Props) {
  return (
    <ButtonLink
      href={whatsappUrl(message)}
      external
      variant="whatsapp"
      size={size}
      magnetic={magnetic}
      className={className}
      aria-label={`${label} — chat on WhatsApp (opens in a new tab)`}
    >
      <WhatsAppIcon size={18} />
      {label}
    </ButtonLink>
  );
}
