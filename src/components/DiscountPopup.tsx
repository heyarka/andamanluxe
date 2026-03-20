import { useEffect, useMemo, useState } from "react";
import { ArrowRight, Phone } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

const DiscountPopup = () => {
  const [open, setOpen] = useState(false);
  const [phone, setPhone] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setOpen(true);
    }, 500);

    return () => window.clearTimeout(timer);
  }, []);

  const digitsOnly = useMemo(() => phone.replace(/\D/g, ""), [phone]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (digitsOnly.length < 8) {
      toast({
        title: "Enter a valid phone number",
        description: "Please use at least 8 digits so our team can contact you.",
      });
      return;
    }

    toast({
      title: "10% offer unlocked",
      description: "Our travel team will contact you shortly.",
    });

    setOpen(false);
    navigate("/book", { state: { discountCode: "WELCOME10", phone: digitsOnly } });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="w-[96vw] max-w-md overflow-hidden rounded-[2rem] border border-cyan-200/60 bg-[#d9f2ef] p-0 shadow-[0_28px_70px_-25px_rgba(14,116,144,0.6)] [&>button]:right-4 [&>button]:top-4 [&>button]:h-11 [&>button]:w-11 [&>button]:rounded-full [&>button]:border [&>button]:border-cyan-200/70 [&>button]:bg-teal-100/80 [&>button]:text-slate-500 [&>button]:opacity-100 [&>button]:backdrop-blur">
        <div className="relative">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url(/dspp.png)" }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-cyan-50/92 via-teal-100/85 to-cyan-100/92" />
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-amber-100/80 to-transparent" />

          <span className="pointer-events-none absolute left-4 top-16 text-3xl opacity-80">🥥</span>
          <span className="pointer-events-none absolute right-5 top-24 text-3xl opacity-85">🍇</span>
          <span className="pointer-events-none absolute bottom-14 left-6 text-3xl opacity-75">🌴</span>
          <span className="pointer-events-none absolute bottom-12 right-8 text-3xl opacity-75">🏖️</span>

          <div className="relative p-6 sm:p-7">
            <div className="mb-4 inline-flex items-center rounded-full border border-cyan-300/80 bg-cyan-100/80 px-3 py-1 text-xs font-semibold tracking-wide text-cyan-900 backdrop-blur-md">
              10% OFF WELCOME OFFER
            </div>

            <DialogHeader className="space-y-2 text-left">
              <DialogTitle className="font-display text-5xl leading-[0.9] font-bold text-slate-800 drop-shadow-sm">
                Special Offer
              </DialogTitle>
              <DialogDescription className="text-sm text-slate-700">
                Unlock exclusive deals for your Andaman trip.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="mt-5 rounded-3xl border border-white/60 bg-[#edf7f6]/85 p-4 shadow-[0_16px_32px_-20px_rgba(15,23,42,0.7)] backdrop-blur-xl">
              <label htmlFor="discount-phone" className="sr-only">
                Phone number
              </label>
              <div className="relative">
                <Phone className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                <Input
                  id="discount-phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Enter Phone Number"
                  className="h-14 rounded-2xl border-slate-200 bg-white/95 pl-10 text-[1.05rem] text-slate-700 placeholder:text-slate-400"
                  maxLength={20}
                  inputMode="numeric"
                  autoComplete="tel"
                />
              </div>

              <button
                type="submit"
                className="mt-5 inline-flex h-14 w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-600 px-4 text-[1.05rem] font-bold text-white shadow-[0_16px_28px_-16px_rgba(249,115,22,0.95)] transition-transform hover:scale-[1.01] hover:from-amber-600 hover:to-orange-600"
              >
                Get 10% Offer
                <ArrowRight className="h-4 w-4" />
              </button>

              <p className="mt-4 text-center text-xs text-slate-500">
                By submitting, you agree to receive trip updates and offer details.
              </p>
            </form>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DiscountPopup;
