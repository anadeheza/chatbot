"use client";
import { useChat } from "./ChatContext"

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
    },
    {
        id: 3,
        title: "Sourdough Bread",
        tag: "Baked",
        time: "40min",
        difficulty: "Hard",
        image: "https://images.unsplash.com/photo-1597604391235-a7429b4b350c?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c291cmRvdWdoJTIwYnJlYWR8ZW58MHx8MHx8fDA%3D",
        desc: "Naturaally leavened bread with a thick, crispy crust and airy crumb",
        color: "#b07242",
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
    },
    {
        id: 6,
        title: "Sushi Rolls",
        tag: "Japanesse",
        time: "45min",
        difficulty: "Easy",
        image: "https://images.unsplash.com/photo-1563612116625-3012372fccce?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHN1c2hpfGVufDB8fDB8fHww",
        desc: "Simple, delicious rolls made of soft rice and salmon",
        color: "#e67797",
    },
];

export default function Recipes() {
    const { setOpen, setPendingMessage } = useChat();
    
    function handleViewRecipe(title) {
        setPendingMessage(`Can you give me the full recipe for ${title}? `)
        setOpen(true);
    }

    return (
        <section id="recipes" className="recipes-section">
            <div className="recipes-header">
                <span className="section-eyebrow">Hand-Picked</span>
                <h2 className="section-title">Featured Recipes</h2>
                <p className="section-sub">
                Not sure where to start? Browse for a recipe that caughts your eye or ask Chefsito for some ideas and tips!.
                </p>
            </div>
            <div className="recipes-grid">
                {RECIPES.map((r) => (
                <div key={r.id} className="recipe-card" style={{ "--card-accent": r.color }}>
                    <div className="recipe-img-wrap">
                        <img src={r.image} alt={r.title} className="recipe-img" />
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
                        <button onClick={() => handleViewRecipe(r.title)} className="recipe-btn">
                            View Recipe →
                        </button>
                    </div>
                    </div>
                </div>
                ))}
            </div>
         </section>
    );
}