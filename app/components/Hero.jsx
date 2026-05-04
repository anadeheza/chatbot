"use client";
import { useState } from "react";

const RECIPES = [
  {
    id: 1,
    title: "Mushroom Risotto",
    tag: "Italian",
    time: "35 min",
    difficulty: "Medium",
    image: "https://plus.unsplash.com/premium_photo-1695240028448-9a8bf3e164f5?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cmlzb3R0b3xlbnwwfHwwfHx8MA%3D%3D",
    desc: "Creamy arborio rice with wild mushrooms, parmesan & fresh thyme.",
    color: "#c3c86e",
    keywords: ["mushroom", "rice", "arborio", "parmesan", "thyme", "butter", "onion", "wine", "broth"],
    steps: [
      "Warm 1 litre of vegetable broth in a saucepan over low heat and keep it simmering throughout.",
      "In a large wide pan, melt 2 tbsp butter with 1 tbsp olive oil over medium heat. Add 1 finely diced onion and cook for 5 minutes until soft and translucent.",
      "Add 300g sliced wild mushrooms and cook for 5–6 minutes until golden. Season with salt and pepper, then set aside half for topping.",
      "Add 300g arborio rice to the pan and toast for 2 minutes, stirring constantly, until the edges look slightly translucent.",
      "Pour in 120ml dry white wine and stir until fully absorbed.",
      "Add the warm broth one ladle at a time, stirring frequently. Wait until each ladle is absorbed before adding the next. This will take about 18–20 minutes.",
      "When the rice is creamy and al dente, remove from heat. Stir in 60g grated parmesan and 1 tbsp butter. Adjust seasoning.",
      "Serve immediately topped with the reserved mushrooms and a few fresh thyme leaves.",
    ],
  },
  {
    id: 2,
    title: "Moussaka",
    tag: "Greek",
    time: "2h 30min",
    difficulty: "Medium",
    image: "https://images.unsplash.com/photo-1632229095740-8c75082087c5?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8bGFzYSVDMyVCMWElMjBkZSUyMGJlcmVuamVuYXxlbnwwfHwwfHx8MA%3D%3D",
    desc: "Traditional lasagna with eggplant and beef layers, with a creamy bechamel sauce",
    color: "#c8806e",
    keywords: ["eggplant", "beef", "ground beef", "tomato", "onion", "garlic", "milk", "butter", "flour", "parmesan", "egg", "cinnamon"],
    steps: [
      "Slice 2 large eggplants into 1cm rounds. Sprinkle with salt and let sit 20 minutes to draw out moisture, then pat dry.",
      "Brush eggplant slices with olive oil and roast at 200°C (400°F) for 20 minutes, flipping halfway, until golden. Set aside.",
      "In a skillet, cook 1 diced onion and 3 garlic cloves in olive oil until soft. Add 500g ground beef and brown well.",
      "Stir in 400g crushed tomatoes, 1 tsp cinnamon, 1 tsp allspice, salt, and pepper. Simmer uncovered for 20 minutes until thick.",
      "Make the béchamel: melt 60g butter, whisk in 60g flour, then gradually add 600ml warm milk, stirring constantly until thick. Season with nutmeg, salt, and pepper. Remove from heat and mix in 2 egg yolks.",
      "Layer the moussaka in a greased baking dish: half the eggplant, all the meat sauce, remaining eggplant, then pour the béchamel evenly on top.",
      "Sprinkle with 50g grated parmesan and bake at 180°C (350°F) for 45 minutes until golden and bubbling.",
      "Let rest for 15 minutes before slicing and serving.",
    ],
  },
  {
    id: 3,
    title: "Sourdough Bread",
    tag: "Baked",
    time: "40min",
    difficulty: "Hard",
    image: "https://images.unsplash.com/photo-1597604391235-a7429b4b350c?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c291cmRvdWdoJTIwYnJlYWR8ZW58MHx8MHx8fDA%3D",
    desc: "Naturally leavened bread with a thick, crispy crust and airy crumb",
    color: "#b07242",
    keywords: ["flour", "bread flour", "sourdough", "starter", "salt", "water", "yeast"],
    steps: [
      "Mix 100g active sourdough starter with 375ml lukewarm water in a large bowl until dissolved.",
      "Add 500g bread flour and 10g salt. Mix until no dry flour remains. Cover and rest for 30 minutes (autolyse).",
      "Perform 4 sets of stretch-and-folds over 2 hours, one set every 30 minutes. Cover and let bulk ferment at room temperature for 4–6 hours until doubled.",
      "Turn dough onto a lightly floured surface. Shape into a tight round by folding the edges toward the center, then flip seam-side down.",
      "Place seam-side up in a floured banneton (or a bowl lined with a floured cloth). Cover and refrigerate overnight (8–12 hours).",
      "Preheat oven to 250°C (480°F) with a Dutch oven inside for at least 45 minutes.",
      "Tip the cold dough onto parchment paper. Score the top with a sharp blade at a 45° angle.",
      "Bake covered in the Dutch oven for 20 minutes, then remove the lid and bake another 20–25 minutes until deep golden brown. Cool on a wire rack for at least 1 hour before slicing.",
    ],
  },
  {
    id: 4,
    title: "Blueberry Muffins",
    tag: "Dessert",
    time: "40 min",
    difficulty: "Medium",
    image: "https://images.unsplash.com/photo-1607958996333-41aef7caefaa?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bXVmZmluJTIwYXIlQzMlQTFuZGFub3xlbnwwfHwwfHx8MA%3D%3D",
    desc: "A combination of the perfect amount of sweetness and softness",
    color: "#a87ff8cb",
    keywords: ["blueberry", "blueberries", "flour", "sugar", "egg", "milk", "butter", "vanilla", "baking powder"],
    steps: [
      "Preheat oven to 190°C (375°F). Line a 12-cup muffin tin with paper liners.",
      "In a large bowl, whisk together 280g all-purpose flour, 150g sugar, 2 tsp baking powder, and ½ tsp salt.",
      "In another bowl, whisk 2 eggs, 120ml vegetable oil, 120ml milk, and 1 tsp vanilla extract.",
      "Pour the wet ingredients into the dry ingredients and fold gently until just combined — do not overmix, lumps are fine.",
      "Toss 200g fresh blueberries with 1 tbsp flour (this prevents them from sinking), then fold into the batter.",
      "Divide the batter evenly among the muffin cups, filling each about ¾ full. Sprinkle the tops with a pinch of sugar.",
      "Bake for 20–25 minutes until a toothpick inserted in the center comes out clean and tops are golden.",
      "Cool in the tin for 5 minutes, then transfer to a wire rack. Best eaten the same day.",
    ],
  },
  {
    id: 5,
    title: "Shakshuka",
    tag: "Middle Eastern",
    time: "55min",
    difficulty: "Easy",
    image: "https://images.unsplash.com/photo-1634213672726-ce9c6acb91c2?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fFNoYWtzaHVrYXxlbnwwfHwwfHx8MA%3D%3D",
    desc: "Poached eggs in a spiced tomato and pepper sauce. One pan wonder.",
    color: "#c0503a",
    keywords: ["egg", "eggs", "tomato", "tomatoes", "pepper", "onion", "garlic", "cumin", "paprika", "feta", "olive oil"],
    steps: [
      "Heat 3 tbsp olive oil in a large, deep skillet over medium heat. Add 1 diced onion and 1 diced red bell pepper. Cook for 7 minutes until softened.",
      "Add 4 minced garlic cloves, 1 tsp cumin, 1 tsp paprika, ½ tsp chili flakes (optional), and ½ tsp sugar. Stir and cook for 1 minute until fragrant.",
      "Pour in 2 cans (800g) of crushed tomatoes. Season with salt and pepper. Simmer uncovered for 15–20 minutes until the sauce thickens and the flavors meld.",
      "Taste and adjust seasoning. The sauce should be rich and slightly sweet.",
      "Using a spoon, make 4–6 wells in the sauce. Crack one egg into each well.",
      "Cover the pan and cook over medium-low heat for 5–8 minutes, until the whites are set but the yolks are still runny.",
      "Remove from heat. Crumble feta cheese on top, sprinkle with fresh parsley or cilantro, and drizzle with olive oil.",
      "Serve straight from the pan with warm crusty bread for dipping.",
    ],
  },
  {
    id: 6,
    title: "Sushi Rolls",
    tag: "Japanese",
    time: "45min",
    difficulty: "Easy",
    image: "https://images.unsplash.com/photo-1563612116625-3012372fccce?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHN1c2hpfGVufDB8fDB8fHww",
    desc: "Simple, delicious rolls made of soft rice and salmon",
    color: "#e67797",
    keywords: ["salmon", "rice", "sushi rice", "nori", "cucumber", "avocado", "vinegar", "soy sauce", "ginger", "wasabi", "fish"],
    steps: [
      "Rinse 300g sushi rice until the water runs clear. Cook according to package instructions.",
      "Mix 3 tbsp rice vinegar, 1 tbsp sugar, and 1 tsp salt. Fold this into the hot rice gently, then fan it to cool to room temperature.",
      "Slice 200g fresh sashimi-grade salmon into thin strips. Julienne ½ a cucumber and ½ an avocado.",
      "Place a nori sheet shiny-side down on a bamboo rolling mat. Wet your hands, then spread a thin, even layer of rice over the nori, leaving a 2cm border at the top.",
      "Arrange a line of salmon, cucumber, and avocado along the bottom edge of the rice.",
      "Lift the mat and roll tightly away from you, pressing gently as you go. Seal the edge with a little water.",
      "Using a very sharp wet knife, cut each roll into 6–8 pieces with a single confident slice (don't saw back and forth).",
      "Serve with soy sauce, pickled ginger, and wasabi on the side.",
    ],
  },
];

function findBestMatch(input) {
  const tokens = input
    .toLowerCase()
    .split(/[\s,]+/)
    .filter((t) => t.length > 2);

  if (tokens.length === 0) return RECIPES[Math.floor(Math.random() * RECIPES.length)];

  const scored = RECIPES.map((r) => {
    const matches = tokens.filter((token) =>
      r.keywords.some((kw) => kw.includes(token) || token.includes(kw))
    );
    return { recipe: r, score: matches.length };
  });

  const best = scored.sort((a, b) => b.score - a.score)[0];
  return best.score > 0 ? best.recipe : RECIPES[Math.floor(Math.random() * RECIPES.length)];
}

export default function Hero() {
  const [showFridge, setShowFridge] = useState(false);
  const [ingredients, setIngredients] = useState("");
  const [matchedRecipe, setMatchedRecipe] = useState(null);

  function handleFridgeSubmit() {
    if (!ingredients.trim()) return;
    const result = findBestMatch(ingredients);
    setMatchedRecipe(result);
    setShowFridge(false);
    setIngredients("");
  }

  function handleKeyDown(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleFridgeSubmit();
    }
  }

  return (
    <>
      <section className="hero-section">
        <div className="hero-overlay" />

        <div className="hero-content">
          <span className="hero-eyebrow">From Our Kitchen to Yours</span>

          <h1 className="hero-title">
            <span className="hero-title-line">Easy</span>
            <span className="hero-title-line accent">Recipes,</span>
            <span className="hero-title-line">Happier life</span>
          </h1>

          <p className="hero-subtitle">
            Explore some cool recipe ideas for all levels!
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

        {/* Fridge input modal */}
        {showFridge && (
          <div className="fridge-overlay" onClick={() => setShowFridge(false)}>
            <div className="fridge-modal" onClick={(e) => e.stopPropagation()}>
              <h3 className="fridge-title">Choose your ingredients! 📜</h3>
              <p className="fridge-sub">List your ingredients and we&apos;ll find the best recipe match for you.</p>
              <textarea
                className="fridge-textarea"
                placeholder="e.g. chicken, garlic, lemon, spinach..."
                value={ingredients}
                onChange={(e) => setIngredients(e.target.value)}
                onKeyDown={handleKeyDown}
                rows={3}
                autoFocus
              />
              <div className="fridge-actions">
                <button onClick={() => setShowFridge(false)} className="fridge-cancel">Cancel</button>
                <button onClick={handleFridgeSubmit} className="fridge-submit">Find a recipe →</button>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Recipe result modal */}
      {matchedRecipe && (
        <div className="fridge-overlay" onClick={() => setMatchedRecipe(null)}>
          <div className="recipe-modal" onClick={(e) => e.stopPropagation()}>
            <div className="recipe-modal-img-wrap">
              <img src={matchedRecipe.image} alt={matchedRecipe.title} className="recipe-modal-img" />
              <div className="recipe-modal-img-overlay" />
              <button
                className="recipe-modal-close"
                onClick={() => setMatchedRecipe(null)}
                aria-label="Close"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
              <div className="recipe-modal-title-block">
                <span className="fridge-match-badge">🎯 Best match for your ingredients</span>
                <span className="recipe-tag" style={{ "--card-accent": matchedRecipe.color }}>{matchedRecipe.tag}</span>
                <h2 className="recipe-modal-title">{matchedRecipe.title}</h2>
                <div className="recipe-modal-meta">
                  <span>⏱ {matchedRecipe.time}</span>
                  <span className={`recipe-diff diff-${matchedRecipe.difficulty.toLowerCase()}`}>{matchedRecipe.difficulty}</span>
                </div>
              </div>
            </div>

            <div className="recipe-modal-body">
              <h3 className="recipe-modal-steps-title">Instructions</h3>
              <ol className="recipe-steps-list">
                {matchedRecipe.steps.map((step, i) => (
                  <li key={i} className="recipe-step-item">
                    <span className="recipe-step-num" style={{ background: matchedRecipe.color }}>{i + 1}</span>
                    <p className="recipe-step-text">{step}</p>
                  </li>
                ))}
              </ol>
              <button
                className="fridge-try-another"
                onClick={() => { setMatchedRecipe(null); setShowFridge(true); }}
              >
                ↩ Try different ingredients
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .recipe-modal {
          background: var(--warm-white);
          border-radius: 1.5rem;
          width: 100%;
          max-width: 520px;
          max-height: 88vh;
          overflow-y: auto;
          box-shadow: 0 24px 80px rgba(44,26,14,0.25);
          scrollbar-width: thin;
          scrollbar-color: #d4b896 transparent;
          animation: slideUp 0.25s cubic-bezier(0.34,1.56,0.64,1);
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(24px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        .recipe-modal::-webkit-scrollbar { width: 4px; }
        .recipe-modal::-webkit-scrollbar-thumb { background: #d4b896; border-radius: 999px; }
        .recipe-modal-img-wrap {
          position: relative;
          height: 220px;
          border-radius: 1.5rem 1.5rem 0 0;
          overflow: hidden;
        }
        .recipe-modal-img { width: 100%; height: 100%; object-fit: cover; }
        .recipe-modal-img-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(to top, rgba(44,26,14,0.7) 0%, rgba(44,26,14,0.1) 60%);
        }
        .recipe-modal-close {
          position: absolute; top: 1rem; right: 1rem;
          width: 32px; height: 32px; border-radius: 50%;
          background: rgba(255,255,255,0.2);
          backdrop-filter: blur(6px);
          border: 1px solid rgba(255,255,255,0.3);
          color: #fff; cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          transition: background 0.15s;
        }
        .recipe-modal-close:hover { background: rgba(255,255,255,0.35); }
        .recipe-modal-title-block {
          position: absolute; bottom: 1.25rem; left: 1.5rem; right: 1.5rem;
          display: flex; flex-direction: column; gap: 0.4rem;
        }
        .fridge-match-badge {
          display: inline-block;
          font-size: 0.7rem; font-weight: 500;
          color: rgba(255,255,255,0.9);
          background: rgba(255,255,255,0.15);
          backdrop-filter: blur(6px);
          border: 1px solid rgba(255,255,255,0.25);
          border-radius: 100px;
          padding: 0.2rem 0.65rem;
          width: fit-content;
          letter-spacing: 0.04em;
        }
        .recipe-modal-title {
          font-family: 'Playfair Display', serif;
          font-size: 1.6rem; font-weight: 900;
          color: #fff; line-height: 1.1;
          text-shadow: 0 1px 6px rgba(44,26,14,0.4);
        }
        .recipe-modal-meta {
          display: flex; align-items: center; gap: 0.65rem;
          font-size: 0.78rem; color: rgba(255,255,255,0.85);
        }
        .recipe-modal-body { padding: 1.75rem 1.75rem 2rem; }
        .recipe-modal-steps-title {
          font-family: 'Playfair Display', serif;
          font-size: 1.05rem; font-weight: 700;
          color: var(--brown-dark);
          margin-bottom: 1.25rem; padding-bottom: 0.75rem;
          border-bottom: 1px solid rgba(44,26,14,0.08);
        }
        .recipe-steps-list { list-style: none; display: flex; flex-direction: column; gap: 1rem; }
        .recipe-step-item { display: flex; gap: 1rem; align-items: flex-start; }
        .recipe-step-num {
          flex-shrink: 0; width: 26px; height: 26px; border-radius: 50%;
          color: #fff; font-size: 0.72rem; font-weight: 700;
          display: flex; align-items: center; justify-content: center;
          margin-top: 1px; opacity: 0.9;
        }
        .recipe-step-text { font-size: 0.88rem; color: #4a3a2e; line-height: 1.65; }
        .fridge-try-another {
          margin-top: 1.5rem; width: 100%;
          font-size: 0.85rem; font-weight: 500;
          color: var(--brown-mid); background: none;
          border: 1px solid rgba(44,26,14,0.15);
          border-radius: 100px; padding: 0.6rem 1.5rem;
          cursor: pointer; font-family: 'DM Sans', sans-serif;
          transition: border-color 0.15s, color 0.15s;
        }
        .fridge-try-another:hover { border-color: var(--amber); color: var(--amber); }
        @media (max-width: 480px) {
          .recipe-modal { max-height: 95vh; border-radius: 1.25rem; }
          .recipe-modal-img-wrap { height: 180px; }
          .recipe-modal-body { padding: 1.25rem 1.25rem 1.5rem; }
        }
      `}</style>
    </>
  );
}