import * as THREE from 'three';
import { SeasonTheme } from '@/types';

export interface FigureAnimData {
  type: 'ronin' | 'cyber' | 'ember' | 'stealth';
  wheels?: THREE.Mesh[];
  body?: THREE.Group;
  beacon?: THREE.Mesh | null;
  glowParts?: THREE.Mesh[];
}

/**
 * 1. 🏎️ Hypercar (Preset: cyber / speed)
 * Low-poly concept supercar with glowing neon light bars, sleek cockpit, rear spoiler, and spinning magnetic wheels
 */
export function buildHypercar(
  group: THREE.Group,
  season: SeasonTheme,
  customColorHex?: string
): FigureAnimData {
  const accentHex = customColorHex || season.palette.accent || '#0284C7';
  const carGroup = new THREE.Group();
  carGroup.position.set(0, 0.45, 0);
  group.add(carGroup);

  const bodyMat = new THREE.MeshStandardMaterial({
    color: 0x18181B,
    metalness: 0.85,
    roughness: 0.25,
    flatShading: true,
  });

  const accentMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color(accentHex),
    metalness: 0.7,
    roughness: 0.3,
  });

  const glassMat = new THREE.MeshStandardMaterial({
    color: 0x0F172A,
    metalness: 0.9,
    roughness: 0.1,
  });

  const neonHeadlightMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color(accentHex),
    emissive: new THREE.Color(accentHex),
    emissiveIntensity: 2.8,
    roughness: 0.1,
  });

  const neonTaillightMat = new THREE.MeshStandardMaterial({
    color: 0xEF4444,
    emissive: 0xEF4444,
    emissiveIntensity: 2.5,
    roughness: 0.1,
  });

  // 1. Lower chassis wedge
  const lowerChassis = new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.45, 4.4), bodyMat);
  lowerChassis.position.y = 0.22;
  lowerChassis.castShadow = true;
  lowerChassis.receiveShadow = true;
  carGroup.add(lowerChassis);

  // 2. Cockpit cabin
  const cabin = new THREE.Mesh(new THREE.BoxGeometry(1.65, 0.55, 2.2), glassMat);
  cabin.position.set(0, 0.65, -0.2);
  cabin.castShadow = true;
  carGroup.add(cabin);

  // 3. Roof panel
  const roof = new THREE.Mesh(new THREE.BoxGeometry(1.5, 0.08, 1.8), bodyMat);
  roof.position.set(0, 0.94, -0.2);
  roof.castShadow = true;
  carGroup.add(roof);

  // 4. Aerodynamic Front Hood & Splitter
  const hood = new THREE.Mesh(new THREE.BoxGeometry(2.2, 0.2, 1.4), accentMat);
  hood.position.set(0, 0.32, 1.5);
  hood.rotation.x = 0.08;
  hood.castShadow = true;
  carGroup.add(hood);

  // Front splitter
  const splitter = new THREE.Mesh(new THREE.BoxGeometry(2.5, 0.08, 0.5), bodyMat);
  splitter.position.set(0, 0.06, 2.25);
  splitter.castShadow = true;
  carGroup.add(splitter);

  // 5. Rear Wing / Spoiler
  const wingBlade = new THREE.Mesh(new THREE.BoxGeometry(2.5, 0.08, 0.6), accentMat);
  wingBlade.position.set(0, 0.85, -2.1);
  wingBlade.castShadow = true;
  carGroup.add(wingBlade);

  // Wing uprights
  const pylonL = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.4, 0.3), bodyMat);
  pylonL.position.set(-0.8, 0.6, -2.05);
  carGroup.add(pylonL);
  const pylonR = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.4, 0.3), bodyMat);
  pylonR.position.set(0.8, 0.6, -2.05);
  carGroup.add(pylonR);

  // 6. Neon Cyber Light Bars
  // Front Headlight Strip
  const frontLight = new THREE.Mesh(new THREE.BoxGeometry(2.1, 0.1, 0.08), neonHeadlightMat);
  frontLight.position.set(0, 0.35, 2.22);
  carGroup.add(frontLight);

  // Rear Full-Width Taillight Strip
  const rearLight = new THREE.Mesh(new THREE.BoxGeometry(2.2, 0.1, 0.08), neonTaillightMat);
  rearLight.position.set(0, 0.35, -2.22);
  carGroup.add(rearLight);

  // 7. Four Magnetic Low-Poly Wheels
  const wheelMat = new THREE.MeshStandardMaterial({ color: 0x111827, roughness: 0.5 });
  const rimMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color(accentHex),
    emissive: new THREE.Color(accentHex),
    emissiveIntensity: 1.2,
  });

  const wheels: THREE.Mesh[] = [];
  const wheelPositions = [
    { x: -1.25, y: 0.2, z: 1.3 },
    { x: 1.25, y: 0.2, z: 1.3 },
    { x: -1.25, y: 0.22, z: -1.3 },
    { x: 1.25, y: 0.22, z: -1.3 },
  ];

  wheelPositions.forEach((wp) => {
    const wGroup = new THREE.Group();
    wGroup.position.set(wp.x, wp.y, wp.z);

    const tire = new THREE.Mesh(new THREE.CylinderGeometry(0.38, 0.38, 0.28, 14), wheelMat);
    tire.rotation.z = Math.PI / 2;
    tire.castShadow = true;
    wGroup.add(tire);

    const rim = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.22, 0.3, 8), rimMat);
    rim.rotation.z = Math.PI / 2;
    wGroup.add(rim);

    carGroup.add(wGroup);
    wheels.push(tire);
  });

  return { type: 'cyber', wheels, body: carGroup, glowParts: [frontLight, rearLight] };
}

/**
 * 2. 🤖 Cyber Samurai Mecha (Preset: ronin / tactical warrior)
 * Minimalist low-poly robotic warrior with angular armor plates, glowing chest core, and dual energy katanas
 */
export function buildCyberMecha(
  group: THREE.Group,
  season: SeasonTheme,
  customColorHex?: string
): FigureAnimData {
  const accentHex = customColorHex || season.palette.accent || '#15803D';
  const mechaGroup = new THREE.Group();
  mechaGroup.position.set(0, 0, 0);
  group.add(mechaGroup);

  const armorMat = new THREE.MeshStandardMaterial({
    color: 0x1C1917,
    metalness: 0.8,
    roughness: 0.3,
    flatShading: true,
  });

  const accentArmorMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color(accentHex),
    metalness: 0.7,
    roughness: 0.25,
    flatShading: true,
  });

  const neonMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color(accentHex),
    emissive: new THREE.Color(accentHex),
    emissiveIntensity: 2.5,
    roughness: 0.1,
  });

  // 1. Sturdy Angular Legs & Feet
  const legGeo = new THREE.BoxGeometry(0.42, 1.8, 0.55);
  const footGeo = new THREE.BoxGeometry(0.5, 0.25, 0.85);

  [-0.65, 0.65].forEach((lx) => {
    const leg = new THREE.Mesh(legGeo, armorMat);
    leg.position.set(lx, 0.9, 0);
    leg.castShadow = true;
    mechaGroup.add(leg);

    const foot = new THREE.Mesh(footGeo, accentArmorMat);
    foot.position.set(lx, 0.12, 0.15);
    foot.castShadow = true;
    mechaGroup.add(foot);
  });

  // 2. Torso & V-Shaped Chest Armor
  const torsoGroup = new THREE.Group();
  torsoGroup.position.set(0, 1.8, 0);
  mechaGroup.add(torsoGroup);

  const pelvis = new THREE.Mesh(new THREE.BoxGeometry(1.5, 0.4, 0.8), armorMat);
  pelvis.position.y = 0.2;
  pelvis.castShadow = true;
  torsoGroup.add(pelvis);

  const chest = new THREE.Mesh(new THREE.BoxGeometry(1.8, 1.3, 1.1), armorMat);
  chest.position.y = 1.0;
  chest.castShadow = true;
  torsoGroup.add(chest);

  // Chest V-Armor Plate
  const chestPlate = new THREE.Mesh(new THREE.ConeGeometry(0.7, 0.8, 4), accentArmorMat);
  chestPlate.position.set(0, 1.0, 0.62);
  chestPlate.rotation.z = Math.PI;
  torsoGroup.add(chestPlate);

  // Glowing Plasma Reactor Core
  const reactor = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.2, 0.15, 8), neonMat);
  reactor.position.set(0, 1.0, 0.7);
  reactor.rotation.x = Math.PI / 2;
  torsoGroup.add(reactor);

  // 3. Robotic Samurai Helmet & Glowing Visor
  const head = new THREE.Mesh(new THREE.BoxGeometry(0.75, 0.65, 0.75), armorMat);
  head.position.set(0, 1.9, 0);
  head.castShadow = true;
  torsoGroup.add(head);

  // Helmet Kabuto Crest
  const crest = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.12, 0.2), accentArmorMat);
  crest.position.set(0, 2.3, 0.15);
  torsoGroup.add(crest);

  // Visor Slit (Glowing Line)
  const visor = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.1, 0.08), neonMat);
  visor.position.set(0, 1.92, 0.4);
  torsoGroup.add(visor);

  // 4. Broad Angular Shoulder Pauldrons
  [-1.25, 1.25].forEach((px) => {
    const pauldron = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.5, 0.8), accentArmorMat);
    pauldron.position.set(px, 1.4, 0);
    pauldron.rotation.z = px > 0 ? -0.2 : 0.2;
    pauldron.castShadow = true;
    torsoGroup.add(pauldron);
  });

  // 5. Dual Glowing Energy Katanas
  const swordGeo = new THREE.BoxGeometry(0.06, 3.2, 0.12);
  const hiltGeo = new THREE.BoxGeometry(0.12, 0.7, 0.18);

  // Left Katana
  const swordL = new THREE.Mesh(swordGeo, neonMat);
  swordL.position.set(-1.4, 0.8, 0.3);
  swordL.rotation.z = 0.45;
  swordL.rotation.y = 0.2;
  swordL.castShadow = true;
  torsoGroup.add(swordL);

  const hiltL = new THREE.Mesh(hiltGeo, armorMat);
  hiltL.position.set(-1.4, 2.2, 0.3);
  hiltL.rotation.z = 0.45;
  torsoGroup.add(hiltL);

  // Right Katana
  const swordR = new THREE.Mesh(swordGeo, neonMat);
  swordR.position.set(1.4, 0.8, 0.3);
  swordR.rotation.z = -0.45;
  swordR.rotation.y = -0.2;
  swordR.castShadow = true;
  torsoGroup.add(swordR);

  const hiltR = new THREE.Mesh(hiltGeo, armorMat);
  hiltR.position.set(1.4, 2.2, 0.3);
  hiltR.rotation.z = -0.45;
  torsoGroup.add(hiltR);

  return { type: 'ronin', body: torsoGroup, glowParts: [reactor, visor, swordL, swordR] };
}

/**
 * 3. 🚀 Starship (Preset: ember / exploration rocket)
 * Modern orbital rocket with aerodynamic grid fins, faceted nose cone, and glowing fiery booster engine
 */
export function buildStarship(
  group: THREE.Group,
  season: SeasonTheme,
  customColorHex?: string
): FigureAnimData {
  const flameHex = customColorHex || season.palette.accent || '#DC2626';
  const rocketGroup = new THREE.Group();
  rocketGroup.position.set(0, 0.4, 0);
  group.add(rocketGroup);

  const hullMat = new THREE.MeshStandardMaterial({
    color: 0xF8FAFC,
    metalness: 0.5,
    roughness: 0.3,
    flatShading: true,
  });

  const darkTileMat = new THREE.MeshStandardMaterial({
    color: 0x1E293B,
    metalness: 0.8,
    roughness: 0.4,
    flatShading: true,
  });

  const engineFlameMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color(flameHex),
    emissive: new THREE.Color(flameHex),
    emissiveIntensity: 3.0,
    roughness: 0.1,
  });

  // 1. Rocket Cylindrical Fuselage
  const fuselage = new THREE.Mesh(new THREE.CylinderGeometry(0.85, 0.95, 4.8, 10), hullMat);
  fuselage.position.y = 2.4;
  fuselage.castShadow = true;
  fuselage.receiveShadow = true;
  rocketGroup.add(fuselage);

  // Black Heat Shield Half
  const heatShield = new THREE.Mesh(new THREE.CylinderGeometry(0.86, 0.96, 4.8, 10, 1, false, 0, Math.PI), darkTileMat);
  heatShield.position.y = 2.4;
  heatShield.castShadow = true;
  rocketGroup.add(heatShield);

  // 2. Aerodynamic Nose Cone
  const noseCone = new THREE.Mesh(new THREE.ConeGeometry(0.85, 1.8, 10), hullMat);
  noseCone.position.y = 5.7;
  noseCone.castShadow = true;
  rocketGroup.add(noseCone);

  // 3. Grid Fins (Deployable titanium steering fins near apex)
  const gridFinGeo = new THREE.BoxGeometry(0.45, 0.45, 0.08);
  for (let i = 0; i < 4; i++) {
    const angle = (i * Math.PI) / 2;
    const fin = new THREE.Mesh(gridFinGeo, darkTileMat);
    const r = 1.05;
    fin.position.set(Math.cos(angle) * r, 4.5, Math.sin(angle) * r);
    fin.rotation.y = -angle;
    fin.castShadow = true;
    rocketGroup.add(fin);
  }

  // 4. Landing Struts (Tripod / Quad legs extending to ground)
  const legMat = new THREE.MeshStandardMaterial({ color: 0x334155, metalness: 0.8, roughness: 0.3 });
  for (let i = 0; i < 4; i++) {
    const angle = (i * Math.PI) / 2 + Math.PI / 4;
    const strut = new THREE.Mesh(new THREE.BoxGeometry(0.12, 1.6, 0.2), legMat);
    strut.position.set(Math.cos(angle) * 1.1, 0.6, Math.sin(angle) * 1.1);
    strut.rotation.x = Math.sin(angle) * 0.35;
    strut.rotation.z = -Math.cos(angle) * 0.35;
    strut.castShadow = true;
    rocketGroup.add(strut);
  }

  // 5. Rocket Engine Bell & Fiery Plasma Exhaust
  const engineBell = new THREE.Mesh(new THREE.CylinderGeometry(0.65, 0.4, 0.6, 10), darkTileMat);
  engineBell.position.y = -0.15;
  rocketGroup.add(engineBell);

  const flamePlume = new THREE.Mesh(new THREE.ConeGeometry(0.45, 1.2, 10), engineFlameMat);
  flamePlume.position.y = -0.85;
  flamePlume.rotation.x = Math.PI; // pointing down
  rocketGroup.add(flamePlume);

  return { type: 'ember', body: rocketGroup, beacon: flamePlume, glowParts: [flamePlume] };
}

/**
 * 4. ✈️ Stealth Jet Fighter (Preset: stealth / supersonic aircraft)
 * Low-poly supersonic stealth fighter with faceted delta wings, twin canted vertical tails, and afterburners
 */
export function buildStealthJet(
  group: THREE.Group,
  season: SeasonTheme,
  customColorHex?: string
): FigureAnimData {
  const afterburnerHex = customColorHex || '#8B5CF6';
  const jetGroup = new THREE.Group();
  jetGroup.position.set(0, 1.6, 0); // elevated in hovering flight pose
  group.add(jetGroup);

  const stealthMat = new THREE.MeshStandardMaterial({
    color: 0x1E293B,
    metalness: 0.85,
    roughness: 0.25,
    flatShading: true,
  });

  const canopyMat = new THREE.MeshStandardMaterial({
    color: 0x0F172A,
    metalness: 0.95,
    roughness: 0.05,
  });

  const afterburnerMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color(afterburnerHex),
    emissive: new THREE.Color(afterburnerHex),
    emissiveIntensity: 2.8,
    roughness: 0.1,
  });

  // 1. Chined Fuselage (Sharp stealth angles)
  const fuselage = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.42, 4.8), stealthMat);
  fuselage.castShadow = true;
  fuselage.receiveShadow = true;
  jetGroup.add(fuselage);

  // Sharp Nose Cone
  const nose = new THREE.Mesh(new THREE.ConeGeometry(0.6, 1.6, 4), stealthMat);
  nose.position.set(0, 0, 3.1);
  nose.rotation.x = Math.PI / 2;
  nose.rotation.y = Math.PI / 4;
  nose.castShadow = true;
  jetGroup.add(nose);

  // 2. Cockpit Canopy
  const canopy = new THREE.Mesh(new THREE.BoxGeometry(0.65, 0.38, 1.5), canopyMat);
  canopy.position.set(0, 0.32, 0.9);
  canopy.castShadow = true;
  jetGroup.add(canopy);

  // 3. Swept Delta Wings
  const wingL = new THREE.Mesh(new THREE.BoxGeometry(1.8, 0.06, 2.2), stealthMat);
  wingL.position.set(-1.4, 0, -0.4);
  wingL.rotation.y = -0.3;
  wingL.castShadow = true;
  jetGroup.add(wingL);

  const wingR = new THREE.Mesh(new THREE.BoxGeometry(1.8, 0.06, 2.2), stealthMat);
  wingR.position.set(1.4, 0, -0.4);
  wingR.rotation.y = 0.3;
  wingR.castShadow = true;
  jetGroup.add(wingR);

  // 4. Twin Canted Vertical Stabilizers (V-Tails)
  const tailL = new THREE.Mesh(new THREE.BoxGeometry(0.08, 1.1, 0.9), stealthMat);
  tailL.position.set(-0.55, 0.65, -1.8);
  tailL.rotation.z = 0.32; // canted outward
  tailL.castShadow = true;
  jetGroup.add(tailL);

  const tailR = new THREE.Mesh(new THREE.BoxGeometry(0.08, 1.1, 0.9), stealthMat);
  tailR.position.set(0.55, 0.65, -1.8);
  tailR.rotation.z = -0.32; // canted outward
  tailR.castShadow = true;
  jetGroup.add(tailR);

  // 5. Twin Thrust-Vectoring Afterburners
  const nozzleGeo = new THREE.BoxGeometry(0.35, 0.22, 0.15);
  [-0.32, 0.32].forEach((nx) => {
    const flame = new THREE.Mesh(nozzleGeo, afterburnerMat);
    flame.position.set(nx, 0, -2.48);
    jetGroup.add(flame);
  });

  // Minimalist titanium support pylon
  const pylonMat = new THREE.MeshStandardMaterial({ color: 0x94A3B8, metalness: 0.9, roughness: 0.2 });
  const pylon = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.12, 1.6, 8), pylonMat);
  pylon.position.set(0, -0.8, 0);
  pylon.castShadow = true;
  jetGroup.add(pylon);

  return { type: 'stealth', body: jetGroup };
}

/**
 * Dispatcher to build the appropriate catchy masculine figure
 */
export function buildFigure(
  group: THREE.Group,
  season: SeasonTheme,
  customColorHex?: string
): FigureAnimData {
  const id = season.id;
  if (id === 'cyber' || id === 'summer') {
    return buildHypercar(group, season, customColorHex);
  }
  if (id === 'ronin' || id === 'spring') {
    return buildCyberMecha(group, season, customColorHex);
  }
  if (id === 'ember' || id === 'autumn') {
    return buildStarship(group, season, customColorHex);
  }
  return buildStealthJet(group, season, customColorHex);
}
