import { PageTransition, FadeIn } from "@/components/PageTransition";

export default function Journal() {
  const entries = [
    {
      date: "May 2026",
      title: "System Architecture in the Age of AI",
      excerpt: "When the marginal cost of intelligence trends toward zero, the value shifts entirely to the architecture that directs it. We are no longer building apps; we are building autonomous systems that operate with defined parameters. The founder of the future is not a programmer, but a system architect who understands how to string intelligence together to produce compounding leverage."
    },
    {
      date: "April 2026",
      title: "The Future Belongs to Builders",
      excerpt: "Ideas are a commodity, distributed freely across the internet. Execution is a rare asset. The delta between a concept and a functional system is bridged by extreme discipline and an unwillingness to compromise on the structure. If you cannot build the machine that executes the idea, the idea is worthless."
    },
    {
      date: "March 2026",
      title: "Why Real Assets Still Win",
      excerpt: "In an era of digital abstraction, physical infrastructure remains the ultimate anchor of wealth. The optimal portfolio pairs the high velocity and scalability of digital systems with the enduring, unshakeable foundation of real assets. You build wealth in the cloud, but you preserve it in the dirt."
    }
  ];

  return (
    <PageTransition>
      <div className="min-h-screen pt-32 pb-32 px-6 md:px-12 max-w-4xl mx-auto bg-black">
        <FadeIn className="mb-24">
          <div className="text-primary text-[10px] tracking-[0.3em] uppercase mb-6 font-bold">
            JOURNAL
          </div>
          <h1 className="text-4xl md:text-5xl text-white font-bold tracking-tight">
            Editorial
          </h1>
        </FadeIn>
        
        <div className="space-y-16">
          {entries.map((entry, i) => (
            <FadeIn key={i} delay={i * 0.15}>
              <article className="border-t border-primary/30 pt-8 group cursor-pointer">
                <div className="text-primary text-xs tracking-widest font-mono mb-6 uppercase">
                  {entry.date}
                </div>
                <h2 className="text-2xl md:text-[36px] text-white font-medium mb-6 leading-tight transition-colors group-hover:text-primary">
                  {entry.title}
                </h2>
                <p className="text-white/60 text-base md:text-lg leading-[1.8] max-w-3xl">
                  {entry.excerpt}
                </p>
                <div className="mt-8 flex items-center text-primary text-sm uppercase tracking-widest opacity-0 transform translate-x-[-10px] transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0">
                  Read more <span className="ml-2">→</span>
                </div>
              </article>
            </FadeIn>
          ))}
        </div>
      </div>
    </PageTransition>
  );
}
