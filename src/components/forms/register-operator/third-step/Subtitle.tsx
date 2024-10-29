import { Poppins } from "next/font/google";

const poppins = Poppins({ weight: "700", subsets: ["latin"] });

const Subtitle: React.FC<{ text: string; id: string; className?: string }> = ({ text, id, className }) => {
  return (
    <h2 id={id} className={`${className} ${poppins.className} antialiased`}>
      {text}
    </h2>
  );
};

export default Subtitle;
