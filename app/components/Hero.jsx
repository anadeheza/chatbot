import Link from "next/link";

export default function Hero() {
    return (
        <section className="hero-section">
      <div className="hero-overlay" />
      <div className="hero-content">
        <span className="hero-eyebrow">From Our Kitchen to Yours</span>
        <h1 className="hero-title">
          <span className="hero-title-line">Discover</span>
          <span className="hero-title-line accent">Recipes</span>
          <span className="hero-title-line">You'll Love</span>
        </h1>
        <p className="hero-subtitle">
          Explore hundreds of hand-crafted recipes — then chat with our AI chef
          for substitutions, tips, and custom ideas.
        </p>
        <div className="hero-actions">
          <Link href="#recipes" className="btn-primary">Browse Recipes</Link>
          <Link href="#recipes" className="btn-ghost">What's in my fridge? →</Link>
        </div>
      </div>
      <div className="hero-scroll-hint">
        <span>Scroll</span>
        <div className="scroll-line" />
      </div>
    </section>
  );
}