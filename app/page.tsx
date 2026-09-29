import CssImageStacking from "@/components/ui/css-image-stacking";
import ContactWithGlobe from "@/components/ui/contact-globe";

export const metadata = {
  title: "Inspire Nigeria Child Project",
  description: "Empowering children in the Niger Delta through quality education and impactful learning experiences",
};

export default function Home() {
  return (
    <div>
      <CssImageStacking />
      <ContactWithGlobe id="contact" />
    </div>
  );
}
