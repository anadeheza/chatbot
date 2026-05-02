"use client";
import { useState } from "react";
import { useChat } from "./ChatContext";

export default function Hero() {
  const { setOpen, setPendingMessage } = useChat();
  const [showFridge, setShowFridge] = useState(false);
  const [ingredients, setIngredients] = useState("");

  function handleFridgeSubmit() {
    if (!ingredients.trim()) return;
    setPendingMessage(`I have these ingredients: ${ingredients}. What can I make?`);
    setOpen(true);
    setShowFridge(false);
    setIngredients("");
  }

  return (
    <section className="hero-section">
      <div className="hero-overlay" />

      <div className="hero-content">
        <span className="hero-eyebrow">From Our Kitchen to Yours</span>
        
        <h1 className="hero-title">
          <span className="hero-title-line">Easy</span>
          <span className="hero-title-line accent">Recipes</span>
          <span className="hero-title-line">Happier life</span>
        </h1>
        
        <p className="hero-subtitle">
          Explore some cool recipe ideas for all levels! - with an AI chef to ask for suggestions, solutions and tips, you can cook with what you already have in your kitchen.
        </p>

        <div className="hero-actions">
          <a href="#recipes" className="btn-primary">Browse Recipes</a>
          <button onClick={() => setShowFridge(true)} className="btn-ghost">
            What&apos;s in my fridge? →
          </button>
        </div>
      </div>
      <div className="hero-scroll-hint">
        <span>Scroll</span>
        <div className="scroll-line" />
      </div>

      {showFridge && (
        <div className="fridge-overlay" onClick={() => setShowFridge(false)}>
          <div className="fridge-modal" onClick={(e) => e.stopPropagation()}>
            <h3 className="fridge-title">Choose your ingredients!📜</h3>
            <p className="fridge-sub">List your ingredients and Chefsito will suggest a recipe.</p>
            <textarea
              className="fridge-textarea"
              placeholder="e.g. chicken, garlic, lemon, spinach..."
              value={ingredients}
              onChange={(e) => setIngredients(e.target.value)}
              rows={3}
              autoFocus
            />
            <div className="fridge-actions">
              <button onClick={() => setShowFridge(false)} className="fridge-cancel">Cancel</button>
              <button onClick={handleFridgeSubmit} className="fridge-submit">Ask Chefsito →</button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}