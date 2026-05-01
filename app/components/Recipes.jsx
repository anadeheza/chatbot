const RECIPES = [
    {
        id: 1,
        title: "Mushroom Risotto",
        tag: "Italian",
        time: "35 min",
        difficulty: "Medium",
        emoji: "🍚",
        desc: "Creamy arborio rice with wild mushrooms, parmesan & fresh thyme.",
        color: "#c8a96e",
    },
    {
        id: 2,
        title: "Moussaka",
        tag: "Greek",
        time: "180 min",
        difficulty: "medium",
        emoji: "🍝",
        desc: "Traditional lasagna with eggplant and beef layers, with a creamy bechamel sauce",
        color: "#c8806e",
    },
    {
        id: 3,
        title: "Sourdough Bread",
        tag: "Baked",
        time: "180 min",
        difficulty: "Hard",
        emoji: "🍞",
        desc: "Naturaally leavened bread with a thick, crispy crust and airy crumb",
        color: "#b07242",
    },
    {
        id: 4,
        title: "Blueberry Muffins",
        tag: "Dessert",
        time: "30 min",
        difficulty: "Easy/Medium",
        emoji: "🧁",
        desc: "A combination of the perfect amount of sweetness and softness",
        color: "#a87ff8cb",
    },
    {
        id: 5,
        title: "Shakshuka",
        tag: "Middle Eastern",
        time: "25 min",
        difficulty: "Easy",
        emoji: "🍳",
        desc: "Poached eggs in a spiced tomato and pepper sauce. One pan wonder.",
        color: "#c0503a",
    },
    {
        id: 6,
        title: "Sushi Rolls",
        tag: "Japanesse",
        time: "45 min",
        difficulty: "Easy",
        emoji: "🍣",
        desc: "Simple, delicious rolls made of soft rice and salmon",
        color: "#e67797",
    },
];

export default function Recipes() {
    return (
        <section id="recipes" className="recipes-section">
            <div className="recipes-header">
                <span className="section-eyebrow">Hand-Picked</span>
                <h2 className="section-title">Featured Recipes</h2>
                <p className="section-sub">
                Not sure where to start? Ask our AI chef below — or browse the collection.
                </p>
            </div>
            <div className="recipes-grid">
                {RECIPES.map((r) => (
                <div key={r.id} className="recipe-card" style={{ "--card-accent": r.color }}>
                    <div className="recipe-emoji-wrap">
                    <span className="recipe-emoji">{r.emoji}</span>
                    </div>
                    <div className="recipe-body">
                    <div className="recipe-meta-row">
                        <span className="recipe-tag">{r.tag}</span>
                        <span className="recipe-time">⏱ {r.time}</span>
                    </div>
                    <h3 className="recipe-title">{r.title}</h3>
                    <p className="recipe-desc">{r.desc}</p>
                    <div className="recipe-footer">
                        <span className={`recipe-diff diff-${r.difficulty.toLowerCase()}`}>{r.difficulty}</span>
                        <button className="recipe-btn">View Recipe →</button>
                    </div>
                    </div>
                </div>
                ))}
            </div>
         </section>
    );
}