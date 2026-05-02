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
      {/* ...keep everything the same until the buttons... */}
      <div className="hero-actions">
        <a href="#recipes" className="btn-primary">Browse Recipes</a>
        <button onClick={() => setShowFridge(true)} className="btn-ghost">
          What's in my fridge? →
        </button>
      </div>

      {/* Fridge Modal */}
      {showFridge && (
        <div className="fridge-overlay" onClick={() => setShowFridge(false)}>
          <div className="fridge-modal" onClick={(e) => e.stopPropagation()}>
            <h3 className="fridge-title">🧊 What's in your fridge?</h3>
            <p className="fridge-sub">List your ingredients and Chef Basil will suggest a recipe.</p>
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
              <button onClick={handleFridgeSubmit} className="fridge-submit">Ask Chef Basil →</button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}