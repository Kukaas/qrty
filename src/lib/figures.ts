import * as THREE from 'three';
import { SeasonTheme } from '@/types';

export interface FigureAnimData {
  type: string;
  wheels?: THREE.Mesh[];
  rotors?: THREE.Mesh[];
  rings?: THREE.Mesh[];
  turret?: THREE.Group;
  body?: THREE.Group;
  beacon?: THREE.Mesh | null;
  glowParts?: THREE.Mesh[];
}

/**
 * 1. 🏎️ Hypercar (Preset: cyber)
 * High-visibility Ceramic White & Brushed Titanium concept supercar.
 * High-contrast Gold/Amber front light bar and Laser Red rear light bar.
 * ZERO black and completely distinct from the blue QR floor.
 */
export function buildHypercar(
  group: THREE.Group,
  _season: SeasonTheme,
  _customColorHex?: string
): FigureAnimData {
  const activeAccent = _customColorHex || _season.palette.accent;
  const carGroup = new THREE.Group();
  carGroup.position.set(0, 0.48, 0);
  group.add(carGroup);

  const whiteBodyMat = new THREE.MeshStandardMaterial({
    color: 0xFFFFFF,
    metalness: 0.35,
    roughness: 0.18,
    flatShading: true,
  });

  const silverAeroMat = new THREE.MeshStandardMaterial({
    color: 0xE2E8F0,
    metalness: 0.9,
    roughness: 0.15,
  });

  const glassMat = new THREE.MeshStandardMaterial({
    color: 0xBAE6FD,
    metalness: 0.9,
    roughness: 0.05,
  });

  const neonHeadlightMat = new THREE.MeshStandardMaterial({
    color: activeAccent,
    emissive: activeAccent,
    emissiveIntensity: 3.0,
    roughness: 0.1,
  });

  const neonTaillightMat = new THREE.MeshStandardMaterial({
    color: activeAccent,
    emissive: activeAccent,
    emissiveIntensity: 3.0,
    roughness: 0.1,
  });

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

  // Lower chassis wedge
  const lowerChassis = new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.45, 4.4), whiteBodyMat);
  lowerChassis.position.y = 0.22;
  lowerChassis.castShadow = true;
  lowerChassis.receiveShadow = true;
  carGroup.add(lowerChassis);

  // Cockpit cabin
  const cabin = new THREE.Mesh(new THREE.BoxGeometry(1.65, 0.55, 2.2), glassMat);
  cabin.position.set(0, 0.65, -0.2);
  cabin.castShadow = true;
  carGroup.add(cabin);

  // Roof panel
  const roof = new THREE.Mesh(new THREE.BoxGeometry(1.5, 0.08, 1.8), whiteBodyMat);
  roof.position.set(0, 0.94, -0.2);
  roof.castShadow = true;
  carGroup.add(roof);

  // Front Hood & Splitter
  const hood = new THREE.Mesh(new THREE.BoxGeometry(2.2, 0.2, 1.4), silverAeroMat);
  hood.position.set(0, 0.32, 1.5);
  hood.rotation.x = 0.08;
  hood.castShadow = true;
  carGroup.add(hood);

  const splitter = new THREE.Mesh(new THREE.BoxGeometry(2.5, 0.08, 0.5), silverAeroMat);
  splitter.position.set(0, 0.06, 2.25);
  splitter.castShadow = true;
  carGroup.add(splitter);

  // Rear Aerodynamic Wing / Spoiler
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

  // Neon Light Bars
  const frontLight = new THREE.Mesh(new THREE.BoxGeometry(2.1, 0.12, 0.08), neonHeadlightMat);
  frontLight.position.set(0, 0.35, 2.22);
  carGroup.add(frontLight);

  const rearLight = new THREE.Mesh(new THREE.BoxGeometry(2.2, 0.12, 0.08), neonTaillightMat);
  rearLight.position.set(0, 0.35, -2.22);
  carGroup.add(rearLight);

  // 4 Chrome Alloy Wheels
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
 * 2. 🤖 Cyber Samurai Mecha (Preset: ronin)
 * Pristine Arctic White & Polished Silver Armor plates.
 * Electric Cobalt Blue core and Radiant Sun-Gold energy katanas.
 */
export function buildCyberMecha(
  group: THREE.Group,
  _season: SeasonTheme,
  _customColorHex?: string
): FigureAnimData {
  const activeAccent = _customColorHex || _season.palette.accent;
  const mechaGroup = new THREE.Group();
  mechaGroup.position.set(0, 0, 0);
  mechaGroup.scale.set(0.72, 0.72, 0.72);
  group.add(mechaGroup);

  const whiteArmorMat = new THREE.MeshStandardMaterial({
    color: 0xFFFFFF,
    metalness: 0.3,
    roughness: 0.2,
    flatShading: true,
  });

  const silverMat = new THREE.MeshStandardMaterial({
    color: 0xCBD5E1,
    metalness: 0.85,
    roughness: 0.2,
    flatShading: true,
  });

  const blueCoreMat = new THREE.MeshStandardMaterial({
    color: activeAccent,
    emissive: activeAccent,
    emissiveIntensity: 3.0,
    roughness: 0.1,
  });

  const katanaMat = new THREE.MeshStandardMaterial({
    color: activeAccent,
    emissive: activeAccent,
    emissiveIntensity: 2.8,
    roughness: 0.1,
  });

  // Sturdy White & Silver Legs
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

  // Torso & Chest Armor
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

  const chestPlate = new THREE.Mesh(new THREE.ConeGeometry(0.7, 0.8, 4), silverMat);
  chestPlate.position.set(0, 1.0, 0.62);
  chestPlate.rotation.z = Math.PI;
  torsoGroup.add(chestPlate);

  const reactor = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.22, 0.15, 8), blueCoreMat);
  reactor.position.set(0, 1.0, 0.7);
  reactor.rotation.x = Math.PI / 2;
  torsoGroup.add(reactor);

  // Helmet & Crest
  const head = new THREE.Mesh(new THREE.BoxGeometry(0.75, 0.65, 0.75), whiteArmorMat);
  head.position.set(0, 1.9, 0);
  head.castShadow = true;
  torsoGroup.add(head);

  const crest = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.14, 0.2), katanaMat);
  crest.position.set(0, 2.3, 0.15);
  torsoGroup.add(crest);

  const visor = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.1, 0.08), blueCoreMat);
  visor.position.set(0, 1.92, 0.4);
  torsoGroup.add(visor);

  // Shoulder Pauldrons
  [-1.25, 1.25].forEach((px) => {
    const pauldron = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.5, 0.8), silverMat);
    pauldron.position.set(px, 1.4, 0);
    pauldron.rotation.z = px > 0 ? -0.2 : 0.2;
    pauldron.castShadow = true;
    torsoGroup.add(pauldron);
  });

  // Dual Energy Katanas
  const swordGeo = new THREE.BoxGeometry(0.06, 3.2, 0.12);
  const hiltGeo = new THREE.BoxGeometry(0.12, 0.7, 0.18);

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
 * 3. 🚀 Starship (Preset: ember)
 * Gleaming Aerospace Gloss White & Polished Stainless Steel.
 * Electric Cyan telemetry stripes and intense fiery rocket plume.
 */
export function buildStarship(
  group: THREE.Group,
  _season: SeasonTheme,
  _customColorHex?: string
): FigureAnimData {
  const activeAccent = _customColorHex || _season.palette.accent;
  const rocketGroup = new THREE.Group();
  rocketGroup.position.set(0, 0.3, 0);
  rocketGroup.scale.set(0.58, 0.58, 0.58);
  group.add(rocketGroup);

  const whiteHullMat = new THREE.MeshStandardMaterial({
    color: 0xFFFFFF,
    metalness: 0.3,
    roughness: 0.15,
    flatShading: true,
  });

  const steelMat = new THREE.MeshStandardMaterial({
    color: 0xE2E8F0,
    metalness: 0.92,
    roughness: 0.12,
    flatShading: true,
  });

  const cyanStripeMat = new THREE.MeshStandardMaterial({
    color: activeAccent,
    emissive: activeAccent,
    emissiveIntensity: 2.2,
    roughness: 0.2,
  });

  const engineFlameMat = new THREE.MeshStandardMaterial({
    color: activeAccent,
    emissive: activeAccent,
    emissiveIntensity: 3.2,
    roughness: 0.1,
  });

  // Fuselage
  const fuselage = new THREE.Mesh(new THREE.CylinderGeometry(0.85, 0.95, 4.8, 12), whiteHullMat);
  fuselage.position.y = 2.4;
  fuselage.castShadow = true;
  fuselage.receiveShadow = true;
  rocketGroup.add(fuselage);

  const steelBand = new THREE.Mesh(new THREE.CylinderGeometry(0.86, 0.86, 0.4, 12), steelMat);
  steelBand.position.y = 3.6;
  steelBand.castShadow = true;
  rocketGroup.add(steelBand);

  const cyanRing = new THREE.Mesh(new THREE.CylinderGeometry(0.865, 0.865, 0.15, 12), cyanStripeMat);
  cyanRing.position.y = 4.2;
  rocketGroup.add(cyanRing);

  // Nose Cone
  const noseCone = new THREE.Mesh(new THREE.ConeGeometry(0.85, 1.8, 12), whiteHullMat);
  noseCone.position.y = 5.7;
  noseCone.castShadow = true;
  rocketGroup.add(noseCone);

  // Grid Fins
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

  // Landing Struts
  for (let i = 0; i < 4; i++) {
    const angle = (i * Math.PI) / 2 + Math.PI / 4;
    const strut = new THREE.Mesh(new THREE.BoxGeometry(0.14, 1.6, 0.2), steelMat);
    strut.position.set(Math.cos(angle) * 1.1, 0.6, Math.sin(angle) * 1.1);
    strut.rotation.x = Math.sin(angle) * 0.35;
    strut.rotation.z = -Math.cos(angle) * 0.35;
    strut.castShadow = true;
    rocketGroup.add(strut);
  }

  // Engine Bell & Flame Plume
  const engineBell = new THREE.Mesh(new THREE.CylinderGeometry(0.65, 0.4, 0.6, 12), steelMat);
  engineBell.position.y = -0.15;
  rocketGroup.add(engineBell);

  const flamePlume = new THREE.Mesh(new THREE.ConeGeometry(0.48, 1.3, 10), engineFlameMat);
  flamePlume.position.y = -0.9;
  flamePlume.rotation.x = Math.PI;
  rocketGroup.add(flamePlume);

  return { type: 'ember', body: rocketGroup, beacon: flamePlume, glowParts: [flamePlume, cyanRing] };
}

/**
 * 4. ✈️ Stealth Jet (Preset: stealth)
 * Arctic Snow Camo White & Polished Titanium skin.
 * Gold Iridium reflector canopy and radiant Cobalt afterburners.
 */
export function buildStealthJet(
  group: THREE.Group,
  _season: SeasonTheme,
  _customColorHex?: string
): FigureAnimData {
  const activeAccent = _customColorHex || _season.palette.accent;
  const jetGroup = new THREE.Group();
  jetGroup.position.set(0, 1.3, 0);
  jetGroup.scale.set(0.78, 0.78, 0.78);
  group.add(jetGroup);

  const whiteJetMat = new THREE.MeshStandardMaterial({
    color: 0xFFFFFF,
    metalness: 0.4,
    roughness: 0.2,
    flatShading: true,
  });

  const titaniumMat = new THREE.MeshStandardMaterial({
    color: 0xCBD5E1,
    metalness: 0.9,
    roughness: 0.15,
  });

  const goldCanopyMat = new THREE.MeshStandardMaterial({
    color: 0xFBBF24,
    emissive: 0xD97706,
    emissiveIntensity: 0.8,
    metalness: 0.95,
    roughness: 0.05,
  });

  const afterburnerMat = new THREE.MeshStandardMaterial({
    color: activeAccent,
    emissive: activeAccent,
    emissiveIntensity: 3.0,
    roughness: 0.1,
  });

  // Fuselage & Nose
  const fuselage = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.42, 4.8), whiteJetMat);
  fuselage.castShadow = true;
  fuselage.receiveShadow = true;
  jetGroup.add(fuselage);

  const nose = new THREE.Mesh(new THREE.ConeGeometry(0.6, 1.6, 4), titaniumMat);
  nose.position.set(0, 0, 3.1);
  nose.rotation.x = Math.PI / 2;
  nose.rotation.y = Math.PI / 4;
  nose.castShadow = true;
  jetGroup.add(nose);

  // Canopy
  const canopy = new THREE.Mesh(new THREE.BoxGeometry(0.65, 0.38, 1.5), goldCanopyMat);
  canopy.position.set(0, 0.32, 0.9);
  canopy.castShadow = true;
  jetGroup.add(canopy);

  // Swept Wings
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

  // Canted V-Tails
  const tailL = new THREE.Mesh(new THREE.BoxGeometry(0.08, 1.1, 0.9), titaniumMat);
  tailL.position.set(-0.55, 0.65, -1.8);
  tailL.rotation.z = 0.32;
  tailL.castShadow = true;
  jetGroup.add(tailL);

  const tailR = new THREE.Mesh(new THREE.BoxGeometry(0.08, 1.1, 0.9), titaniumMat);
  tailR.position.set(0.55, 0.65, -1.8);
  tailR.rotation.z = -0.32;
  tailR.castShadow = true;
  jetGroup.add(tailR);

  // Twin Afterburners
  const nozzleGeo = new THREE.BoxGeometry(0.35, 0.22, 0.15);
  [-0.32, 0.32].forEach((nx) => {
    const flame = new THREE.Mesh(nozzleGeo, afterburnerMat);
    flame.position.set(nx, 0, -2.48);
    jetGroup.add(flame);
  });

  const pylon = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.12, 1.6, 8), titaniumMat);
  pylon.position.set(0, -0.8, 0);
  pylon.castShadow = true;
  jetGroup.add(pylon);

  return { type: 'stealth', body: jetGroup };
}

/**
 * 5. 🛡️ Cyber Tank (Preset: tank / tron)
 * Heavy futuristic stealth railgun tank with continuous all-terrain treads,
 * traversing 360-degree turret, and dual high-energy plasma railgun cannons.
 * Pure Ceramic White & Titanium Silver with glowing cyan accelerator coils.
 */
export function buildCyberTank(
  group: THREE.Group,
  _season: SeasonTheme,
  _customColorHex?: string
): FigureAnimData {
  const activeAccent = _customColorHex || _season.palette.accent;
  const tankGroup = new THREE.Group();
  tankGroup.position.set(0, 0.45, 0);
  group.add(tankGroup);

  const whiteHullMat = new THREE.MeshStandardMaterial({
    color: 0xFFFFFF,
    metalness: 0.35,
    roughness: 0.2,
    flatShading: true,
  });

  const titaniumMat = new THREE.MeshStandardMaterial({
    color: 0xCBD5E1,
    metalness: 0.9,
    roughness: 0.18,
    flatShading: true,
  });

  const treadMat = new THREE.MeshStandardMaterial({
    color: 0x94A3B8,
    metalness: 0.75,
    roughness: 0.4,
  });

  const railgunGlowMat = new THREE.MeshStandardMaterial({
    color: activeAccent,
    emissive: activeAccent,
    emissiveIntensity: 3.2,
    roughness: 0.1,
  });

  const opticSensorMat = new THREE.MeshStandardMaterial({
    color: activeAccent,
    emissive: activeAccent,
    emissiveIntensity: 2.8,
    roughness: 0.1,
  });

  // 1. Lower Hull Chassis (Sloped stealth glacis plates)
  const chassis = new THREE.Mesh(new THREE.BoxGeometry(2.2, 0.55, 3.4), whiteHullMat);
  chassis.position.y = 0.28;
  chassis.castShadow = true;
  chassis.receiveShadow = true;
  tankGroup.add(chassis);

  // Front Sloped Glacis
  const frontGlacis = new THREE.Mesh(new THREE.BoxGeometry(2.0, 0.35, 1.0), titaniumMat);
  frontGlacis.position.set(0, 0.32, 1.8);
  frontGlacis.rotation.x = -0.35;
  frontGlacis.castShadow = true;
  tankGroup.add(frontGlacis);

  // 2. Four Independent All-Terrain Tread Units
  const treadPositions = [
    { x: -1.35, z: 0 },
    { x: 1.35, z: 0 },
  ];

  treadPositions.forEach((tp) => {
    const tread = new THREE.Mesh(new THREE.BoxGeometry(0.55, 0.65, 3.6), treadMat);
    tread.position.set(tp.x, 0.22, tp.z);
    tread.castShadow = true;
    tankGroup.add(tread);

    const skirt = new THREE.Mesh(new THREE.BoxGeometry(0.65, 0.12, 3.8), whiteHullMat);
    skirt.position.set(tp.x, 0.55, tp.z);
    skirt.castShadow = true;
    tankGroup.add(skirt);
  });

  // 3. Traversing Turret Group
  const turretGroup = new THREE.Group();
  turretGroup.position.set(0, 0.58, -0.2);
  tankGroup.add(turretGroup);

  const turretBody = new THREE.Mesh(new THREE.CylinderGeometry(1.2, 1.4, 0.65, 6), whiteHullMat);
  turretBody.position.y = 0.32;
  turretBody.castShadow = true;
  turretGroup.add(turretBody);

  const cupola = new THREE.Mesh(new THREE.BoxGeometry(0.45, 0.3, 0.45), titaniumMat);
  cupola.position.set(0.5, 0.75, -0.3);
  cupola.castShadow = true;
  turretGroup.add(cupola);

  const opticEye = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.1, 0.08), opticSensorMat);
  opticEye.position.set(0.5, 0.8, -0.06);
  turretGroup.add(opticEye);

  const antenna = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.04, 1.4, 6), titaniumMat);
  antenna.position.set(-0.6, 1.3, -0.6);
  antenna.rotation.x = -0.15;
  turretGroup.add(antenna);

  // 4. Dual Railgun Cannons
  const cannonMantle = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.35, 0.6), titaniumMat);
  cannonMantle.position.set(0, 0.38, 1.1);
  turretGroup.add(cannonMantle);

  const barrelGeo = new THREE.CylinderGeometry(0.1, 0.12, 2.6, 8);
  [-0.32, 0.32].forEach((bx) => {
    const barrel = new THREE.Mesh(barrelGeo, titaniumMat);
    barrel.position.set(bx, 0.38, 2.4);
    barrel.rotation.x = Math.PI / 2;
    barrel.castShadow = true;
    turretGroup.add(barrel);

    const coil = new THREE.Mesh(new THREE.CylinderGeometry(0.13, 0.13, 0.7, 8), railgunGlowMat);
    coil.position.set(bx, 0.38, 2.5);
    coil.rotation.x = Math.PI / 2;
    turretGroup.add(coil);

    const muzzle = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.22, 0.25), titaniumMat);
    muzzle.position.set(bx, 0.38, 3.7);
    turretGroup.add(muzzle);
  });

  return { type: 'tank', turret: turretGroup, body: tankGroup, glowParts: [opticEye] };
}

/**
 * 6. 🛸 Mothership / UFO (Preset: ufo)
 * Multi-tiered futuristic flying saucer with glowing cosmic violet tractor beam.
 */
export function buildMothership(
  group: THREE.Group,
  _season: SeasonTheme,
  _customColorHex?: string
): FigureAnimData {
  const activeAccent = _customColorHex || _season.palette.accent;
  const ufoGroup = new THREE.Group();
  ufoGroup.position.set(0, 1.8, 0);
  ufoGroup.scale.set(0.82, 0.82, 0.82);
  group.add(ufoGroup);

  const whiteSaucerMat = new THREE.MeshStandardMaterial({
    color: 0xFFFFFF,
    metalness: 0.4,
    roughness: 0.2,
    flatShading: true,
  });

  const chromeMat = new THREE.MeshStandardMaterial({
    color: 0xE2E8F0,
    metalness: 0.95,
    roughness: 0.1,
  });

  const tractorMat = new THREE.MeshStandardMaterial({
    color: activeAccent,
    emissive: activeAccent,
    emissiveIntensity: 2.8,
    transparent: true,
    opacity: 0.65,
    roughness: 0.1,
  });

  // Lower Saucer Disc
  const lowerDisc = new THREE.Mesh(new THREE.CylinderGeometry(2.4, 0.8, 0.35, 16), whiteSaucerMat);
  lowerDisc.castShadow = true;
  ufoGroup.add(lowerDisc);

  // Upper Dome
  const upperDome = new THREE.Mesh(new THREE.SphereGeometry(1.2, 16, 12, 0, Math.PI * 2, 0, Math.PI / 2), chromeMat);
  upperDome.position.y = 0.15;
  upperDome.castShadow = true;
  ufoGroup.add(upperDome);

  // Outer Plasma Node Ring
  const plasmaRing = new THREE.Mesh(new THREE.TorusGeometry(2.2, 0.08, 8, 36), tractorMat);
  plasmaRing.rotation.x = Math.PI / 2;
  ufoGroup.add(plasmaRing);

  // Glowing Tractor Beam radiating down
  const beam = new THREE.Mesh(new THREE.ConeGeometry(1.5, 2.4, 16, 1, true), tractorMat);
  beam.position.y = -1.35;
  beam.rotation.x = Math.PI;
  ufoGroup.add(beam);

  return { type: 'ufo', rings: [plasmaRing], body: ufoGroup, beacon: beam };
}

/**
 * 7. 🚁 Attack Gunship (Preset: chopper)
 * Minimalist attack helicopter with spinning 4-blade main rotor and tail rotor.
 */
export function buildGunship(
  group: THREE.Group,
  _season: SeasonTheme,
  _customColorHex?: string
): FigureAnimData {
  const activeAccent = _customColorHex || _season.palette.accent;
  const chopperGroup = new THREE.Group();
  chopperGroup.position.set(0, 1.4, 0);
  chopperGroup.scale.set(0.8, 0.8, 0.8);
  group.add(chopperGroup);

  const whiteMat = new THREE.MeshStandardMaterial({
    color: 0xFFFFFF,
    metalness: 0.3,
    roughness: 0.2,
    flatShading: true,
  });

  const steelMat = new THREE.MeshStandardMaterial({
    color: 0xCBD5E1,
    metalness: 0.85,
    roughness: 0.2,
  });

  const amberGlowMat = new THREE.MeshStandardMaterial({
    color: activeAccent,
    emissive: activeAccent,
    emissiveIntensity: 2.5,
    roughness: 0.1,
  });

  // Fuselage
  const fuselage = new THREE.Mesh(new THREE.BoxGeometry(1.1, 1.2, 3.8), whiteMat);
  fuselage.castShadow = true;
  chopperGroup.add(fuselage);

  // Nose Canopy (Amber glass)
  const canopy = new THREE.Mesh(new THREE.BoxGeometry(0.85, 0.6, 1.2), amberGlowMat);
  canopy.position.set(0, 0.2, 1.6);
  chopperGroup.add(canopy);

  // Tail Boom
  const tailBoom = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.3, 2.8, 8), steelMat);
  tailBoom.position.set(0, 0.2, -2.8);
  tailBoom.rotation.x = Math.PI / 2;
  chopperGroup.add(tailBoom);

  // Tail Fin
  const tailFin = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.9, 0.6), whiteMat);
  tailFin.position.set(0, 0.6, -4.0);
  chopperGroup.add(tailFin);

  // Main Rotor Hub & 4 Blades
  const rotorHub = new THREE.Mesh(new THREE.CylinderGeometry(0.15, 0.15, 0.35, 8), steelMat);
  rotorHub.position.y = 0.75;
  chopperGroup.add(rotorHub);

  const mainRotor = new THREE.Mesh(new THREE.BoxGeometry(4.4, 0.04, 0.24), steelMat);
  mainRotor.position.y = 0.92;
  chopperGroup.add(mainRotor);

  // Tail Rotor
  const tailRotor = new THREE.Mesh(new THREE.BoxGeometry(0.03, 1.1, 0.12), amberGlowMat);
  tailRotor.position.set(0.12, 0.6, -4.0);
  chopperGroup.add(tailRotor);

  // Pylon
  const pylon = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.12, 1.7, 8), steelMat);
  pylon.position.set(0, -0.85, 0);
  chopperGroup.add(pylon);

  return { type: 'chopper', rotors: [mainRotor, tailRotor], body: chopperGroup };
}

/**
 * 8. ⚔️ Cyber Katana (Preset: blade)
 * Legendary glowing crimson plasma katana plunged into an ancient white monument plinth.
 */
export function buildCyberKatana(
  group: THREE.Group,
  _season: SeasonTheme,
  _customColorHex?: string
): FigureAnimData {
  const activeAccent = _customColorHex || _season.palette.accent;
  const bladeGroup = new THREE.Group();
  bladeGroup.position.set(0, 0, 0);
  bladeGroup.scale.set(0.65, 0.65, 0.65);
  group.add(bladeGroup);

  const stonePlinthMat = new THREE.MeshStandardMaterial({
    color: 0xFFFFFF,
    roughness: 0.85,
    metalness: 0.05,
    flatShading: true,
  });

  const steelMat = new THREE.MeshStandardMaterial({
    color: 0xCBD5E1,
    metalness: 0.92,
    roughness: 0.15,
  });

  const crimsonPlasmaMat = new THREE.MeshStandardMaterial({
    color: activeAccent,
    emissive: activeAccent,
    emissiveIntensity: 3.2,
    roughness: 0.1,
  });

  // Ancient Monument Plinth
  const plinth = new THREE.Mesh(new THREE.CylinderGeometry(0.85, 1.2, 1.4, 6), stonePlinthMat);
  plinth.position.y = 0.7;
  plinth.castShadow = true;
  plinth.receiveShadow = true;
  bladeGroup.add(plinth);

  // Plinth Cap
  const plinthCap = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.2, 1.6), steelMat);
  plinthCap.position.y = 1.45;
  plinthCap.castShadow = true;
  bladeGroup.add(plinthCap);

  // High-Energy Plasma Katana Blade (plunged in stone)
  const katanaBlade = new THREE.Mesh(new THREE.BoxGeometry(0.08, 3.8, 0.22), crimsonPlasmaMat);
  katanaBlade.position.set(0, 2.9, 0);
  katanaBlade.castShadow = true;
  bladeGroup.add(katanaBlade);

  // Katana Tsuba (Guard) & Tsuka (Hilt)
  const tsuba = new THREE.Mesh(new THREE.BoxGeometry(0.65, 0.08, 0.45), steelMat);
  tsuba.position.set(0, 4.6, 0);
  bladeGroup.add(tsuba);

  const hilt = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.09, 1.3, 8), stonePlinthMat);
  hilt.position.set(0, 5.25, 0);
  bladeGroup.add(hilt);

  // Concentric Energy Rings
  const ring1 = new THREE.Mesh(new THREE.TorusGeometry(1.2, 0.04, 8, 36), crimsonPlasmaMat);
  ring1.position.y = 2.8;
  ring1.rotation.x = Math.PI / 3;
  bladeGroup.add(ring1);

  const ring2 = new THREE.Mesh(new THREE.TorusGeometry(1.5, 0.03, 8, 36), crimsonPlasmaMat);
  ring2.position.y = 3.6;
  ring2.rotation.x = -Math.PI / 4;
  bladeGroup.add(ring2);

  return { type: 'blade', rings: [ring1, ring2], beacon: katanaBlade };
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
  if (id === 'stealth' || id === 'winter') {
    return buildStealthJet(group, season, customColorHex);
  }
  if (id === 'tank' || id === 'tron') {
    return buildCyberTank(group, season, customColorHex);
  }
  if (id === 'ufo') {
    return buildMothership(group, season, customColorHex);
  }
  if (id === 'chopper') {
    return buildGunship(group, season, customColorHex);
  }
  if (id === 'blade') {
    return buildCyberKatana(group, season, customColorHex);
  }
  return buildHypercar(group, season, customColorHex);
}
