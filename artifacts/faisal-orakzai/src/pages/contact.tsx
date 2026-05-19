import { PageTransition, FadeIn } from "@/components/PageTransition";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { FaWhatsapp } from "react-icons/fa";

const contactSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email is required"),
  subject: z.string().min(2, "Subject is required"),
  message: z.string().min(20, "Message must be at least 20 characters"),
});

export default function Contact() {
  const { toast } = useToast();
  
  const form = useForm<z.infer<typeof contactSchema>>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = (data: z.infer<typeof contactSchema>) => {
    console.log("Contact submission:", data);
    toast({
      title: "Message Sent",
      description: "We have received your message. You will be contacted shortly.",
    });
    form.reset();
  };

  return (
    <PageTransition>
      <div className="min-h-screen pt-32 pb-32 px-6 md:px-12 max-w-5xl mx-auto flex flex-col lg:flex-row gap-16 lg:gap-24">
        
        <div className="flex-1">
          <FadeIn>
            <div className="text-primary text-[10px] tracking-[0.3em] uppercase mb-6 font-bold">
              CONTACT
            </div>
            
            <h1 className="text-4xl md:text-[52px] text-white font-bold leading-tight mb-8">
              Collaboration requires clarity and alignment.
            </h1>
            
            <p className="text-xl md:text-[20px] text-white/60 mb-16">
              Start a Conversation
            </p>
            
            <div className="space-y-8 mt-12">
              <div>
                <div className="text-xs uppercase tracking-widest text-white/40 mb-2">Direct</div>
                <a href="mailto:imorakzai1122@gmail.com" className="text-primary text-lg md:text-xl tracking-wide hover:underline underline-offset-8 transition-all">
                  imorakzai1122@gmail.com
                </a>
              </div>
              
              <div>
                <div className="text-xs uppercase tracking-widest text-white/40 mb-2">Priority</div>
                <a href="https://wa.me/" target="_blank" rel="noreferrer" className="inline-flex items-center gap-3 text-white text-lg md:text-xl tracking-wide hover:text-primary transition-colors">
                  <FaWhatsapp className="text-primary w-6 h-6" /> WhatsApp Contact
                </a>
              </div>
            </div>
          </FadeIn>
        </div>

        <div className="flex-1 lg:max-w-md">
          <FadeIn delay={0.2}>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs uppercase tracking-widest text-white/70 font-normal">Name</FormLabel>
                      <FormControl>
                        <input 
                          {...field} 
                          className="w-full bg-transparent border-b border-white/20 pb-3 text-white focus:outline-none focus:border-primary transition-colors rounded-none placeholder:text-transparent"
                          placeholder="Your name"
                        />
                      </FormControl>
                      <FormMessage className="text-destructive text-xs mt-1" />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs uppercase tracking-widest text-white/70 font-normal">Email</FormLabel>
                      <FormControl>
                        <input 
                          {...field} 
                          type="email"
                          className="w-full bg-transparent border-b border-white/20 pb-3 text-white focus:outline-none focus:border-primary transition-colors rounded-none placeholder:text-transparent"
                          placeholder="Your email"
                        />
                      </FormControl>
                      <FormMessage className="text-destructive text-xs mt-1" />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="subject"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs uppercase tracking-widest text-white/70 font-normal">Subject</FormLabel>
                      <FormControl>
                        <input 
                          {...field} 
                          className="w-full bg-transparent border-b border-white/20 pb-3 text-white focus:outline-none focus:border-primary transition-colors rounded-none placeholder:text-transparent"
                          placeholder="Subject"
                        />
                      </FormControl>
                      <FormMessage className="text-destructive text-xs mt-1" />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs uppercase tracking-widest text-white/70 font-normal">Message</FormLabel>
                      <FormControl>
                        <textarea 
                          {...field} 
                          rows={4}
                          className="w-full bg-transparent border-b border-white/20 pb-3 text-white focus:outline-none focus:border-primary transition-colors rounded-none resize-none placeholder:text-transparent"
                          placeholder="Your message"
                        />
                      </FormControl>
                      <FormMessage className="text-destructive text-xs mt-1" />
                    </FormItem>
                  )}
                />
                
                <button 
                  type="submit"
                  className="w-full border border-primary text-primary py-4 uppercase tracking-[0.15em] text-sm transition-all duration-300 hover:bg-primary hover:text-black hover:scale-[1.02] mt-8"
                  data-testid="button-submit-contact"
                >
                  Send Message
                </button>
              </form>
            </Form>
          </FadeIn>
        </div>
        
      </div>
    </PageTransition>
  );
}
