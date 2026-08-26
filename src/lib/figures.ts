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
 * High-visibility Ceramic White & Brushed Titanium concept supercar.
 * High-contrast Gold/Amber front light bar and Laser Red rear light bar.
 * ZERO black and completely distinct from the blue QR floor.
 */
export function buildHypercar(
  group: THREE.Group,
  _season: SeasonTheme,
  _customColorHex?: string
): FigureAnimData {
  const carGroup = new THREE.Group();
  carGroup.position.set(0, 0.48, 0);
  group.add(carGroup);

  // Gleaming Ceramic White body (high visibility against colored ground)
  const whiteBodyMat = new THREE.MeshStandardMaterial({
    color: 0xFFFFFF,
    metalness: 0.35,
    roughness: 0.18,
    flatShading: true,
  });

  // Brushed Platinum Silver for aerodynamic aero elements
  const silverAeroMat = new THREE.MeshStandardMaterial({
    color: 0xE2E8F0,
    metalness: 0.9,
    roughness: 0.15,
  });

  // Ice Crystal Glass Canopy
  const glassMat = new THREE.MeshStandardMaterial({
    color: 0xBAE6FD,
    metalness: 0.9,
    roughness: 0.05,
  });

  // Warm Gold / Amber Neon Headlight (contrasts against blue floor)
  const neonHeadlightMat = new THREE.MeshStandardMaterial({
    color: 0xF59E0B,
    emissive: 0xF59E0B,
    emissiveIntensity: 3.0,
    roughness: 0.1,
  });

  // Laser Red Rear Taillight
  const neonTaillightMat = new THREE.MeshStandardMaterial({
    color: 0xEF4444,
    emissive: 0xEF4444,
    emissiveIntensity: 3.0,
    roughness: 0.1,
  });

  // Silver Chrome Wheel Material (NO black)
  const wheelTireMat = new THREE.MeshStandardMaterial({
    color: 0x94A3B8,
    metalness: 0.8,
    roughness: 0.25,
  });
  const wheelRimMat = new THREE.MeshStandardMaterial({
    color: 0xF8FAFC,
    metalness: 0.95,
    roughness: 0.1,
  });

  // 1. Lower chassis wedge (Pure Ceramic White)
  const lowerChassis = new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.45, 4.4), whiteBodyMat);
  lowerChassis.position.y = 0.22;
  lowerChassis.castShadow = true;
  lowerChassis.receiveShadow = true;
  carGroup.add(lowerChassis);

  // 2. Cockpit cabin (Ice Crystal Glass)
  const cabin = new THREE.Mesh(new THREE.BoxGeometry(1.65, 0.55, 2.2), glassMat);
  cabin.position.set(0, 0.65, -0.2);
  cabin.castShadow = true;
  carGroup.add(cabin);

  // 3. Roof panel (Ceramic White)
  const roof = new THREE.Mesh(new THREE.BoxGeometry(1.5, 0.08, 1.8), whiteBodyMat);
  roof.position.set(0, 0.94, -0.2);
  roof.castShadow = true;
  carGroup.add(roof);

  // 4. Front Hood & Splitter (Silver & White)
  const hood = new THREE.Mesh(new THREE.BoxGeometry(2.2, 0.2, 1.4), silverAeroMat);
  hood.position.set(0, 0.32, 1.5);
  hood.rotation.x = 0.08;
  hood.castShadow = true;
  carGroup.add(hood);

  const splitter = new THREE.Mesh(new THREE.BoxGeometry(2.5, 0.08, 0.5), silverAeroMat);
  splitter.position.set(0, 0.06, 2.25);
  splitter.castShadow = true;
  carGroup.add(splitter);

  // 5. Rear Aerodynamic Wing / Spoiler (Platinum Silver)
  const wingBlade = new THREE.Mesh(new THREE.BoxGeometry(2.5, 0.08, 0.6), silverAeroMat);
  wingBlade.position.set(0, 0.85, -2.1);
  wingBlade.castShadow = true;
  carGroup.add(wingBlade);

  const pylonL = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.4, 0.3), silverAeroMat);
  pylonL.position.set(-0.8, 0.6, -2.05);
  carGroup.add(pylonL);
  const pylonR = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.4, 0.3), silverAeroMat);
  pylonR.position.set(0.8, 0.6, -2.05);
  carGroup.add(pylonR);

  // 6. High-Visibility Neon Light Bars
  const frontLight = new THREE.Mesh(new THREE.BoxGeometry(2.1, 0.12, 0.08), neonHeadlightMat);
  frontLight.position.set(0, 0.35, 2.22);
  carGroup.add(frontLight);

  const rearLight = new THREE.Mesh(new THREE.BoxGeometry(2.2, 0.12, 0.08), neonTaillightMat);
  rearLight.position.set(0, 0.35, -2.22);
  carGroup.add(rearLight);

  // 7. Four Chrome Alloy Wheels (NO black)
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

    const tire = new THREE.Mesh(new THREE.CylinderGeometry(0.38, 0.38, 0.28, 14), wheelTireMat);
    tire.rotation.z = Math.PI / 2;
    tire.castShadow = true;
    wGroup.add(tire);

    const rim = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.24, 0.3, 8), wheelRimMat);
    rim.rotation.z = Math.PI / 2;
    wGroup.add(rim);

    carGroup.add(wGroup);
    wheels.push(tire);
  });

  return { type: 'cyber', wheels, body: carGroup, glowParts: [frontLight, rearLight] };
}

/**
 * 2. 🤖 Cyber Samurai Mecha (Preset: ronin / tactical warrior)
 * Pristine Arctic White & Polished Silver Armor plates.
 * Electric Cobalt Blue core and Radiant Sun-Gold energy katanas.
 * ZERO black and pops brightly against the green QR floor.
 */
export function buildCyberMecha(
  group: THREE.Group,
  _season: SeasonTheme,
  _customColorHex?: string
): FigureAnimData {
  const mechaGroup = new THREE.Group();
  mechaGroup.position.set(0, 0, 0);
  group.add(mechaGroup);

  // Arctic White Main Armor Plates
  const whiteArmorMat = new THREE.MeshStandardMaterial({
    color: 0xFFFFFF,
    metalness: 0.3,
    roughness: 0.2,
    flatShading: true,
  });

  // Polished Silver Titanium joint/accent plates
  const silverMat = new THREE.MeshStandardMaterial({
    color: 0xCBD5E1,
    metalness: 0.85,
    roughness: 0.2,
    flatShading: true,
  });

  // High-Voltage Cobalt Blue Reactor (contrasts against green floor)
  const blueCoreMat = new THREE.MeshStandardMaterial({
    color: 0x2563EB,
    emissive: 0x2563EB,
    emissiveIntensity: 3.0,
    roughness: 0.1,
  });

  // Sun-Gold Energy Katanas (radiant contrast against green floor)
  const katanaMat = new THREE.MeshStandardMaterial({
    color: 0xFBBF24,
    emissive: 0xF59E0B,
    emissiveIntensity: 2.8,
    roughness: 0.1,
  });

  // 1. Sturdy White & Silver Legs
  const legGeo = new THREE.BoxGeometry(0.42, 1.8, 0.55);
  const footGeo = new THREE.BoxGeometry(0.5, 0.25, 0.85);

  [-0.65, 0.65].forEach((lx) => {
    const leg = new THREE.Mesh(legGeo, whiteArmorMat);
    leg.position.set(lx, 0.9, 0);
    leg.castShadow = true;
    mechaGroup.add(leg);

    const foot = new THREE.Mesh(footGeo, silverMat);
    foot.position.set(lx, 0.12, 0.15);
    foot.castShadow = true;
    mechaGroup.add(foot);
  });

  // 2. Torso & Chest Armor (Arctic White)
  const torsoGroup = new THREE.Group();
  torsoGroup.position.set(0, 1.8, 0);
  mechaGroup.add(torsoGroup);

  const pelvis = new THREE.Mesh(new THREE.BoxGeometry(1.5, 0.4, 0.8), silverMat);
  pelvis.position.y = 0.2;
  pelvis.castShadow = true;
  torsoGroup.add(pelvis);

  const chest = new THREE.Mesh(new THREE.BoxGeometry(1.8, 1.3, 1.1), whiteArmorMat);
  chest.position.y = 1.0;
  chest.castShadow = true;
  torsoGroup.add(chest);

  // Chest V-Plate (Silver)
  const chestPlate = new THREE.Mesh(new THREE.ConeGeometry(0.7, 0.8, 4), silverMat);
  chestPlate.position.set(0, 1.0, 0.62);
  chestPlate.rotation.z = Math.PI;
  torsoGroup.add(chestPlate);

  // Glowing Cobalt Fusion Reactor
  const reactor = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.22, 0.15, 8), blueCoreMat);
  reactor.position.set(0, 1.0, 0.7);
  reactor.rotation.x = Math.PI / 2;
  torsoGroup.add(reactor);

  // 3. Robotic Helmet & Glowing Visor
  const head = new THREE.Mesh(new THREE.BoxGeometry(0.75, 0.65, 0.75), whiteArmorMat);
  head.position.set(0, 1.9, 0);
  head.castShadow = true;
  torsoGroup.add(head);

  // Golden Helmet Crest
  const crest = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.14, 0.2), katanaMat);
  crest.position.set(0, 2.3, 0.15);
  torsoGroup.add(crest);

  // Visor Slit
  const visor = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.1, 0.08), blueCoreMat);
  visor.position.set(0, 1.92, 0.4);
  torsoGroup.add(visor);

  // 4. Broad Silver Shoulder Pauldrons
  [-1.25, 1.25].forEach((px) => {
    const pauldron = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.5, 0.8), silverMat);
    pauldron.position.set(px, 1.4, 0);
    pauldron.rotation.z = px > 0 ? -0.2 : 0.2;
    pauldron.castShadow = true;
    torsoGroup.add(pauldron);
  });

  // 5. Dual Glowing Sun-Gold Energy Katanas
  const swordGeo = new THREE.BoxGeometry(0.06, 3.2, 0.12);
  const hiltGeo = new THREE.BoxGeometry(0.12, 0.7, 0.18);

  // Left Katana
  const swordL = new THREE.Mesh(swordGeo, katanaMat);
  swordL.position.set(-1.4, 0.8, 0.3);
  swordL.rotation.z = 0.45;
  swordL.rotation.y = 0.2;
  swordL.castShadow = true;
  torsoGroup.add(swordL);

  const hiltL = new THREE.Mesh(hiltGeo, silverMat);
  hiltL.position.set(-1.4, 2.2, 0.3);
  hiltL.rotation.z = 0.45;
  torsoGroup.add(hiltL);

  // Right Katana
  const swordR = new THREE.Mesh(swordGeo, katanaMat);
  swordR.position.set(1.4, 0.8, 0.3);
  swordR.rotation.z = -0.45;
  swordR.rotation.y = -0.2;
  swordR.castShadow = true;
  torsoGroup.add(swordR);

  const hiltR = new THREE.Mesh(hiltGeo, silverMat);
  hiltR.position.set(1.4, 2.2, 0.3);
  hiltR.rotation.z = -0.45;
  torsoGroup.add(hiltR);

  return { type: 'ronin', body: torsoGroup, glowParts: [reactor, visor, swordL, swordR] };
}

/**
 * 3. 🚀 Starship (Preset: ember / exploration rocket)
 * Gleaming Aerospace Gloss White & Polished Stainless Steel.
 * Electric Cyan telemetry stripes and intense fiery rocket plume.
 * ZERO black and shines radiantly against the crimson magma QR floor.
 */
export function buildStarship(
  group: THREE.Group,
  _season: SeasonTheme,
  _customColorHex?: string
): FigureAnimData {
  const rocketGroup = new THREE.Group();
  rocketGroup.position.set(0, 0.4, 0);
  group.add(rocketGroup);

  // Gloss Aerospace White Fuselage
  const whiteHullMat = new THREE.MeshStandardMaterial({
    color: 0xFFFFFF,
    metalness: 0.3,
    roughness: 0.15,
    flatShading: true,
  });

  // Polished Stainless Steel / Titanium Accents
  const steelMat = new THREE.MeshStandardMaterial({
    color: 0xE2E8F0,
    metalness: 0.92,
    roughness: 0.12,
    flatShading: true,
  });

  // Electric Cyan Telemetry Stripe (contrasts against red floor)
  const cyanStripeMat = new THREE.MeshStandardMaterial({
    color: 0x06B6D4,
    emissive: 0x06B6D4,
    emissiveIntensity: 2.2,
    roughness: 0.2,
  });

  // Rocket Engine Fiery Plasma Exhaust
  const engineFlameMat = new THREE.MeshStandardMaterial({
    color: 0xF97316,
    emissive: 0xEA580C,
    emissiveIntensity: 3.2,
    roughness: 0.1,
  });

  // 1. Rocket Cylindrical Fuselage (Pure Gloss White)
  const fuselage = new THREE.Mesh(new THREE.CylinderGeometry(0.85, 0.95, 4.8, 12), whiteHullMat);
  fuselage.position.y = 2.4;
  fuselage.castShadow = true;
  fuselage.receiveShadow = true;
  rocketGroup.add(fuselage);

  // Stainless Steel Band
  const steelBand = new THREE.Mesh(new THREE.CylinderGeometry(0.86, 0.86, 0.4, 12), steelMat);
  steelBand.position.y = 3.6;
  steelBand.castShadow = true;
  rocketGroup.add(steelBand);

  // Cyan Telemetry Ring
  const cyanRing = new THREE.Mesh(new THREE.CylinderGeometry(0.865, 0.865, 0.15, 12), cyanStripeMat);
  cyanRing.position.y = 4.2;
  rocketGroup.add(cyanRing);

  // 2. Aerodynamic Nose Cone (Gloss White)
  const noseCone = new THREE.Mesh(new THREE.ConeGeometry(0.85, 1.8, 12), whiteHullMat);
  noseCone.position.y = 5.7;
  noseCone.castShadow = true;
  rocketGroup.add(noseCone);

  // 3. Grid Fins (Polished Stainless Steel - 4 fins)
  const gridFinGeo = new THREE.BoxGeometry(0.45, 0.45, 0.08);
  for (let i = 0; i < 4; i++) {
    const angle = (i * Math.PI) / 2;
    const fin = new THREE.Mesh(gridFinGeo, steelMat);
    const r = 1.05;
    fin.position.set(Math.cos(angle) * r, 4.5, Math.sin(angle) * r);
    fin.rotation.y = -angle;
    fin.castShadow = true;
    rocketGroup.add(fin);
  }

  // 4. Landing Struts (Brushed Silver Legs extending to ground)
  for (let i = 0; i < 4; i++) {
    const angle = (i * Math.PI) / 2 + Math.PI / 4;
    const strut = new THREE.Mesh(new THREE.BoxGeometry(0.14, 1.6, 0.2), steelMat);
    strut.position.set(Math.cos(angle) * 1.1, 0.6, Math.sin(angle) * 1.1);
    strut.rotation.x = Math.sin(angle) * 0.35;
    strut.rotation.z = -Math.cos(angle) * 0.35;
    strut.castShadow = true;
    rocketGroup.add(strut);
  }

  // 5. Rocket Engine Bell & Fiery Plasma Exhaust
  const engineBell = new THREE.Mesh(new THREE.CylinderGeometry(0.65, 0.4, 0.6, 12), steelMat);
  engineBell.position.y = -0.15;
  rocketGroup.add(engineBell);

  const flamePlume = new THREE.Mesh(new THREE.ConeGeometry(0.48, 1.3, 10), engineFlameMat);
  flamePlume.position.y = -0.9;
  flamePlume.rotation.x = Math.PI; // pointing down
  rocketGroup.add(flamePlume);

  return { type: 'ember', body: rocketGroup, beacon: flamePlume, glowParts: [flamePlume, cyanRing] };
}

/**
 * 4. ✈️ Stealth Jet Fighter (Preset: stealth / supersonic aircraft)
 * Arctic Snow Camo White & Polished Titanium skin.
 * Gold Iridium reflector canopy and radiant Cobalt afterburners.
 * ZERO black and stands out dramatically above the dark graphite QR floor.
 */
export function buildStealthJet(
  group: THREE.Group,
  _season: SeasonTheme,
  _customColorHex?: string
): FigureAnimData {
  const jetGroup = new THREE.Group();
  jetGroup.position.set(0, 1.6, 0); // elevated in hovering flight pose
  group.add(jetGroup);

  // Arctic Snow Camo White Aircraft Skin
  const whiteJetMat = new THREE.MeshStandardMaterial({
    color: 0xFFFFFF,
    metalness: 0.4,
    roughness: 0.2,
    flatShading: true,
  });

  // Titanium Leading Edges
  const titaniumMat = new THREE.MeshStandardMaterial({
    color: 0xCBD5E1,
    metalness: 0.9,
    roughness: 0.15,
  });

  // Gold Iridium Reflective Canopy Glass
  const goldCanopyMat = new THREE.MeshStandardMaterial({
    color: 0xFBBF24,
    emissive: 0xD97706,
    emissiveIntensity: 0.8,
    metalness: 0.95,
    roughness: 0.05,
  });

  // Radiant Cobalt/Cyan Afterburners
  const afterburnerMat = new THREE.MeshStandardMaterial({
    color: 0x06B6D4,
    emissive: 0x0284C7,
    emissiveIntensity: 3.0,
    roughness: 0.1,
  });

  // 1. Chined Fuselage (Arctic White)
  const fuselage = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.42, 4.8), whiteJetMat);
  fuselage.castShadow = true;
  fuselage.receiveShadow = true;
  jetGroup.add(fuselage);

  // Sharp Titanium Nose Cone
  const nose = new THREE.Mesh(new THREE.ConeGeometry(0.6, 1.6, 4), titaniumMat);
  nose.position.set(0, 0, 3.1);
  nose.rotation.x = Math.PI / 2;
  nose.rotation.y = Math.PI / 4;
  nose.castShadow = true;
  jetGroup.add(nose);

  // 2. Cockpit Canopy (Gold Iridium Glass)
  const canopy = new THREE.Mesh(new THREE.BoxGeometry(0.65, 0.38, 1.5), goldCanopyMat);
  canopy.position.set(0, 0.32, 0.9);
  canopy.castShadow = true;
  jetGroup.add(canopy);

  // 3. Swept Delta Wings (Arctic White with Titanium Edges)
  const wingL = new THREE.Mesh(new THREE.BoxGeometry(1.8, 0.06, 2.2), whiteJetMat);
  wingL.position.set(-1.4, 0, -0.4);
  wingL.rotation.y = -0.3;
  wingL.castShadow = true;
  jetGroup.add(wingL);

  const wingR = new THREE.Mesh(new THREE.BoxGeometry(1.8, 0.06, 2.2), whiteJetMat);
  wingR.position.set(1.4, 0, -0.4);
  wingR.rotation.y = 0.3;
  wingR.castShadow = true;
  jetGroup.add(wingR);

  // 4. Twin Canted Vertical Stabilizers (V-Tails)
  const tailL = new THREE.Mesh(new THREE.BoxGeometry(0.08, 1.1, 0.9), titaniumMat);
  tailL.position.set(-0.55, 0.65, -1.8);
  tailL.rotation.z = 0.32; // canted outward
  tailL.castShadow = true;
  jetGroup.add(tailL);

  const tailR = new THREE.Mesh(new THREE.BoxGeometry(0.08, 1.1, 0.9), titaniumMat);
  tailR.position.set(0.55, 0.65, -1.8);
  tailR.rotation.z = -0.32; // canted outward
  tailR.castShadow = true;
  jetGroup.add(tailR);

  // 5. Twin Thrust-Vectoring Afterburners (Radiant Cyan Glow)
  const nozzleGeo = new THREE.BoxGeometry(0.35, 0.22, 0.15);
  [-0.32, 0.32].forEach((nx) => {
    const flame = new THREE.Mesh(nozzleGeo, afterburnerMat);
    flame.position.set(nx, 0, -2.48);
    jetGroup.add(flame);
  });

  // Minimalist silver support pylon
  const pylon = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.12, 1.6, 8), titaniumMat);
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
