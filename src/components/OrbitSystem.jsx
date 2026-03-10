import { useRef, useEffect, useState, useCallback } from "react";

// --- Configuration ---
const ORBIT_CONFIGS = [
  { rotation: 0, radiusX: 192, radiusY: 80, speed: 0.8 },    // orbit 0: 0°
  { rotation: 60, radiusX: 192, radiusY: 80, speed: 0.7 },   // orbit 1: 60°
  { rotation: 120, radiusX: 192, radiusY: 80, speed: 0.9 },  // orbit 2: 120°
];

const NODE_COLORS = [
  { bg: "#00d4ff", glow: "rgba(0, 212, 255, 0.6)" },   // electric cyan
  { bg: "#00ff88", glow: "rgba(0, 255, 136, 0.6)" },   // neon green
  { bg: "#7c3aed", glow: "rgba(124, 58, 237, 0.6)" },  // cyber purple
  { bg: "#f59e0b", glow: "rgba(245, 158, 11, 0.6)" },  // amber
  { bg: "#ec4899", glow: "rgba(236, 72, 153, 0.6)" },  // pink
  { bg: "#06b6d4", glow: "rgba(6, 182, 212, 0.6)" },   // teal
];

const COLLISION_DISTANCE = 30;
const WHOLE_SYSTEM_ROTATION_SPEED = 15; // degrees per second for the entire system

// Initial nodes: 2 per orbit = 6 total
const INITIAL_NODES = [
  { orbitIndex: 0, angle: 0, speed: 0.8, size: 14, colorIndex: 0 },
  { orbitIndex: 0, angle: Math.PI, speed: 0.75, size: 10, colorIndex: 1 },
  { orbitIndex: 1, angle: Math.PI * 0.5, speed: 0.7, size: 12, colorIndex: 2 },
  { orbitIndex: 1, angle: Math.PI * 1.5, speed: 0.65, size: 10, colorIndex: 3 },
  { orbitIndex: 2, angle: Math.PI * 0.3, speed: 0.9, size: 14, colorIndex: 4 },
  { orbitIndex: 2, angle: Math.PI * 1.3, speed: 0.85, size: 10, colorIndex: 5 },
];

// --- Utility functions ---

/** Convert degrees to radians */
function degToRad(deg) {
  return (deg * Math.PI) / 180;
}

/** Get the (x, y) position on a rotated ellipse at angle theta */
function getEllipsePosition(theta, orbit) {
  const cosR = Math.cos(degToRad(orbit.rotation));
  const sinR = Math.sin(degToRad(orbit.rotation));
  const ex = orbit.radiusX * Math.cos(theta);
  const ey = orbit.radiusY * Math.sin(theta);
  return {
    x: ex * cosR - ey * sinR,
    y: ex * sinR + ey * cosR,
  };
}

/** Distance between two points */
function distance(x1, y1, x2, y2) {
  const dx = x1 - x2;
  const dy = y1 - y2;
  return Math.sqrt(dx * dx + dy * dy);
}

// --- OrbitSystem Component ---
export default function OrbitSystem() {
  const nodesRef = useRef(
    INITIAL_NODES.map((n) => ({
      ...n,
      baseSpeed: n.speed,
      totalRevolutions: 0,
      x: 0,
      y: 0,
    }))
  );

  const systemAngleRef = useRef(0);
  const lastTimeRef = useRef(null);
  const animRef = useRef(null);
  const [renderTick, setRenderTick] = useState(0);

  const animate = useCallback((timestamp) => {
    if (!lastTimeRef.current) {
      lastTimeRef.current = timestamp;
    }
    const dt = (timestamp - lastTimeRef.current) / 1000; // seconds
    lastTimeRef.current = timestamp;

    const nodes = nodesRef.current;

    // Rotate the entire system slowly
    systemAngleRef.current += WHOLE_SYSTEM_ROTATION_SPEED * dt;

    // --- Update each node ---
    for (let i = 0; i < nodes.length; i++) {
      const node = nodes[i];

      // Advance angle
      node.angle += node.speed * dt;

      // Track full revolutions
      if (node.angle >= Math.PI * 2) {
        node.angle -= Math.PI * 2;
        node.totalRevolutions++;
      }

      // Check if node is hidden behind photo (near the minor axis of ellipse, cos(theta) ~ 0)
      // When hidden AND has completed a revolution, instantly switch orbits to avoid visible jumping
      if (node.totalRevolutions >= 1 && Math.abs(Math.cos(node.angle)) < 0.1) {
        const nextOrbit1 = (node.orbitIndex + 1) % ORBIT_CONFIGS.length;
        const nextOrbit2 = (node.orbitIndex + 2) % ORBIT_CONFIGS.length;
        
        const count1 = nodes.filter(n => n.orbitIndex === nextOrbit1).length;
        const count2 = nodes.filter(n => n.orbitIndex === nextOrbit2).length;

        if (count1 < 2) {
          node.orbitIndex = nextOrbit1;
          node.baseSpeed = ORBIT_CONFIGS[node.orbitIndex].speed * (0.9 + Math.random() * 0.2);
        } else if (count2 < 2) {
          node.orbitIndex = nextOrbit2;
          node.baseSpeed = ORBIT_CONFIGS[node.orbitIndex].speed * (0.9 + Math.random() * 0.2);
        }
        
        node.totalRevolutions = 0;
      }

      const orbit = ORBIT_CONFIGS[node.orbitIndex];
      const pos = getEllipsePosition(node.angle, orbit);
      node.x = pos.x;
      node.y = pos.y;
    }

    // --- Collision avoidance ---
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const d = distance(nodes[i].x, nodes[i].y, nodes[j].x, nodes[j].y);
        if (d < COLLISION_DISTANCE && d > 0) {
          // Speed up the faster one, slow down the slower one
          const faster = nodes[i].speed >= nodes[j].speed ? nodes[i] : nodes[j];
          const slower = nodes[i].speed >= nodes[j].speed ? nodes[j] : nodes[i];
          faster.speed = faster.baseSpeed * 1.3;
          slower.speed = slower.baseSpeed * 0.7;
        } else {
          // Gradually restore to base speed
          nodes[i].speed += (nodes[i].baseSpeed - nodes[i].speed) * 0.02;
          nodes[j].speed += (nodes[j].baseSpeed - nodes[j].speed) * 0.02;
        }
      }
    }

    // Trigger re-render
    setRenderTick((t) => t + 1);
    animRef.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    animRef.current = requestAnimationFrame(animate);
    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [animate]);

  const nodes = nodesRef.current;
  const systemRotation = systemAngleRef.current;

  return (
    <div
      className="absolute inset-0 pointer-events-none"
      style={{
        transform: `rotate(${systemRotation}deg)`,
      }}
    >
      {/* SVG orbit paths and animated nodes */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="-250 -250 500 500"
        style={{ overflow: "visible" }}
      >
        {ORBIT_CONFIGS.map((orbit, i) => (
          <ellipse
            key={`orbit-${i}`}
            cx={0}
            cy={0}
            rx={orbit.radiusX}
            ry={orbit.radiusY}
            fill="none"
            stroke="currentColor"
            strokeWidth={1}
            transform={`rotate(${orbit.rotation})`}
          />
        ))}

        {nodes.map((node, i) => {
          const color = NODE_COLORS[node.colorIndex];

          return (
            <circle
              key={`node-${i}`}
              cx={node.x}
              cy={node.y}
              r={node.size / 2}
              fill={color.bg}
              style={{
                filter: `drop-shadow(0px 0px ${node.size}px ${color.glow}) drop-shadow(0px 0px ${node.size * 2}px ${color.glow})`,
                willChange: "transform",
              }}
            />
          );
        })}
      </svg>
    </div>
  );
}
