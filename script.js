// Créer un moteur physique Matter.js
var engine = Matter.Engine.create();

// Créer un rendu Matter.js
var render = Matter.Render.create({
    element: document.body,
    engine: engine,
    options: {
        width: window.innerWidth,
        height: window.innerHeight,
        background: '#f4f4f4',
        // wireframes: false
    }
});

// Créer les plateaux de la balance
var leftPlate = Matter.Bodies.rectangle(200, 300, 150, 20, { isStatic: true });
var rightPlate = Matter.Bodies.rectangle(600, 300, 150, 20, { isStatic: true });

// Créer l'objet A
var objectA = Matter.Bodies.rectangle(400, 100, 80, 80, { isStatic: true });

var ground = Matter.Bodies.rectangle(window.innerWidth / 2, 600, window.innerWidth, 50.5, {isStatic: true, render: { fillStyle: '#ff0000', opacity: 1 } });

// Créer les poids disponibles
var weight1 = Matter.Bodies.rectangle(100, 500, 40, 40);
var weight2 = Matter.Bodies.rectangle(200, 500, 50, 50);
var weight5 = Matter.Bodies.rectangle(300, 500, 60, 60);
var weight10 = Matter.Bodies.rectangle(400, 500, 70, 70);

// Ajouter les corps au monde physique
Matter.World.add(engine.world, [ground, leftPlate, rightPlate, objectA, weight1, weight2, weight5, weight10]);

// Ajouter des contraintes pour lier les corps entre eux
var constraint1 = Matter.Constraint.create({
    bodyA: objectA,
    pointA: { x: -30, y: 0 },
    bodyB: leftPlate,
    pointB: { x: -60, y: 0 },
    stiffness: 0.1
});
var constraint2 = Matter.Constraint.create({
    bodyA: objectA,
    pointA: { x: 30, y: 0 },
    bodyB: rightPlate,
    pointB: { x: 60, y: 0 },
    stiffness: 0.1
});
Matter.World.add(engine.world, [constraint1, constraint2]);

// Ajouter des événements pour la souris
var mouseConstraint = Matter.MouseConstraint.create(engine, { element: render.canvas });
Matter.World.add(engine.world, mouseConstraint);

// Démarrer le moteur de physique
Matter.Engine.run(engine);

// Démarrer le rendu Matter.js
Matter.Render.run(render);
