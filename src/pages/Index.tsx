import { useState, useCallback, useRef } from "react";
import confetti from "canvas-confetti";
import FloatingHearts from "@/components/FloatingHearts";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

const Index = () => {
  const [accepted, setAccepted] = useState(false);
  const noBtnRef = useRef<HTMLButtonElement>(null);

  const moveNoButton = useCallback(() => {
    if (!noBtnRef.current) return;
    const maxX = window.innerWidth - 120;
    const maxY = window.innerHeight - 60;
    const x = Math.random() * maxX;
    const y = Math.random() * maxY;
    noBtnRef.current.style.position = "fixed";
    noBtnRef.current.style.left = `${x}px`;
    noBtnRef.current.style.top = `${y}px`;
    noBtnRef.current.style.zIndex = "50";
  }, []);

  const handleYes = () => {
    setAccepted(true);
    // Fire confetti bursts
    const fire = (opts: confetti.Options) =>
      confetti({ ...opts, disableForReducedMotion: true });

    fire({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
    setTimeout(() => fire({ particleCount: 60, spread: 100, origin: { x: 0.2, y: 0.5 } }), 200);
    setTimeout(() => fire({ particleCount: 60, spread: 100, origin: { x: 0.8, y: 0.5 } }), 400);
    setTimeout(() => {
      fire({ particleCount: 150, spread: 160, origin: { y: 0.4 }, colors: ["#ff6b8a", "#ff4d6d", "#ff85a1", "#ff3366"] });
    }, 600);
  };

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-background px-4">
      <FloatingHearts />

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center gap-8 text-center">
        <span className="bounce-gentle inline-block text-7xl md:text-8xl">💝</span>

        <h1 className="text-4xl font-black tracking-tight text-foreground md:text-6xl lg:text-7xl">
          Will you be my
          <br />
          <span className="text-primary">Valentine?</span>
        </h1>

        <p className="max-w-md text-lg font-medium text-muted-foreground">
          I've been meaning to ask you something special…
        </p>

        <div className="mt-4 flex items-center gap-6">
          <button
            onClick={handleYes}
            className="btn-glow rounded-full bg-primary px-10 py-4 text-lg font-bold text-primary-foreground transition-transform duration-200 hover:scale-110 active:scale-95"
          >
            Yes! 💕
          </button>

          <button
            ref={noBtnRef}
            onMouseEnter={moveNoButton}
            onTouchStart={moveNoButton}
            className="rounded-full border-2 border-border bg-secondary px-10 py-4 text-lg font-bold text-secondary-foreground transition-all duration-200 hover:scale-105"
          >
            No
          </button>
        </div>
      </div>

      {/* Success Dialog */}
      <Dialog open={accepted} onOpenChange={setAccepted}>
        <DialogContent className="border-primary/30 bg-card text-center sm:max-w-md">
          <DialogHeader className="items-center">
            <span className="mb-2 inline-block text-6xl">🥰</span>
            <DialogTitle className="text-3xl font-black text-primary">
              Good Decision!
            </DialogTitle>
            <DialogDescription className="mt-2 text-base font-medium text-muted-foreground">
              You just made my heart skip a beat! 💓
              <br />
              Happy Valentine's Day! 🌹
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Index;
