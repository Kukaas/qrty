import * as THREE from 'three';
import { SeasonTheme } from '@/types';

export interface FigureAnimData {
  type: 'ronin' | 'cyber' | 'ember' | 'stealth';
  rings: THREE.Mesh[];
  cubes: THREE.Mesh[];
  shards: THREE.Mesh[];
  beacon: THREE.Mesh | null;
  gyro: THREE.Mesh | null;
  foliageGroup?: THREE.Group;
}

/**
 * 1. Ronin Pine: Authentic Japanese Kuromatsu (Black Pine Bonsai)
 * Features an S-curved weathered trunk, horizontal cloud-pad needle shelves, and a stone Toro lantern
 */
export function buildRoninPine(
  group: THREE.Group,
  season: SeasonTheme,
  customFoliageColors?: string[]
): FigureAnimData {
  const trunkMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color(season.palette.trunk || '#3E2723'),
    roughness: 0.88,
    metalness: 0.05,
  });

  // Authentic Japanese S-curve trunk
  const trunkCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0, 0, 0),
    new THREE.Vector3(0.3, 1.2, 0.1),
    new THREE.Vector3(-0.35, 2.5, -0.2),
    new THREE.Vector3(0.2, 3.8, 0.2),
    new THREE.Vector3(0.0, 5.0, 0.0),
  ]);
  const trunkGeo = new THREE.TubeGeometry(trunkCurve, 24, 0.38, 8, false);
  const trunkMesh = new THREE.Mesh(trunkGeo, trunkMat);
  trunkMesh.castShadow = true;
  trunkMesh.receiveShadow = true;
  group.add(trunkMesh);

  // 4 tiered horizontal branches
  const branches = [
    { start: new THREE.Vector3(-0.3, 2.5, -0.1), end: new THREE.Vector3(-2.0, 3.2, -0.8), radius: 0.18 },
    { start: new THREE.Vector3(0.2, 3.2, 0.2), end: new THREE.Vector3(2.1, 3.9, 0.9), radius: 0.18 },
    { start: new THREE.Vector3(-0.1, 3.8, 0.1), end: new THREE.Vector3(-1.6, 4.6, 1.4), radius: 0.15 },
    { start: new THREE.Vector3(0.1, 4.2, -0.1), end: new THREE.Vector3(1.6, 4.9, -1.3), radius: 0.15 },
  ];

  branches.forEach((b) => {
    const mid = new THREE.Vector3()
      .addVectors(b.start, b.end)
      .multiplyScalar(0.5)
      .add(new THREE.Vector3((Math.random() - 0.5) * 0.3, 0.3, (Math.random() - 0.5) * 0.3));
    const bCurve = new THREE.CatmullRomCurve3([b.start, mid, b.end]);
    const bGeo = new THREE.TubeGeometry(bCurve, 12, b.radius, 6, false);
    const bMesh = new THREE.Mesh(bGeo, trunkMat);
    bMesh.castShadow = true;
    group.add(bMesh);
  });

  // Layered horizontal pine cloud pads (squashed dense shelves)
  const foliageGroup = new THREE.Group();
  group.add(foliageGroup);

  const foliageColors = customFoliageColors || season.palette.foliage;
  const padConfigs = [
    { pos: new THREE.Vector3(0, 5.2, 0), rx: 1.8, ry: 0.45, rz: 1.6 },
    { pos: new THREE.Vector3(0.3, 5.7, 0.2), rx: 1.4, ry: 0.4, rz: 1.3 },
    { pos: new THREE.Vector3(-2.0, 3.3, -0.8), rx: 1.5, ry: 0.4, rz: 1.3 },
    { pos: new THREE.Vector3(2.1, 4.0, 0.9), rx: 1.5, ry: 0.4, rz: 1.3 },
    { pos: new THREE.Vector3(-1.6, 4.7, 1.4), rx: 1.3, ry: 0.35, rz: 1.2 },
    { pos: new THREE.Vector3(1.6, 5.0, -1.3), rx: 1.3, ry: 0.35, rz: 1.2 },
  ];

  padConfigs.forEach((pad, i) => {
    const geo = new THREE.CylinderGeometry(pad.rx * 0.85, pad.rx, pad.ry, 8);
    const mat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(foliageColors[i % foliageColors.length]),
      roughness: 0.8,
      flatShading: true,
    });
    const mesh = new THREE.Mesh(geo, mat);
    mesh.position.copy(pad.pos);
    mesh.scale.set(1.0, 1.0, pad.rz / pad.rx);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    foliageGroup.add(mesh);
  });

  // Miniature Japanese stone lantern (Toro) at base
  const stoneMat = new THREE.MeshStandardMaterial({ color: 0x94A3B8, roughness: 0.9 });
  const lanternBase = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.24, 0.45, 6), stoneMat);
  lanternBase.position.set(1.3, 0.22, 1.3);
  lanternBase.castShadow = true;
  group.add(lanternBase);

  const lanternRoof = new THREE.Mesh(new THREE.ConeGeometry(0.36, 0.22, 6), stoneMat);
  lanternRoof.position.set(1.3, 0.55, 1.3);
  lanternRoof.castShadow = true;
  group.add(lanternRoof);

  return { type: 'ronin', rings: [], cubes: [], shards: [], beacon: null, gyro: null, foliageGroup };
}

/**
 * 2. Cyber Grid: Holographic Quantum Server Monolith & Data Rings
 * Features a hexagonal titanium pillar, neon circuit channels, rotating data rings, and orbiting quantum cubes
 */
export function buildCyberMonolith(
  group: THREE.Group,
  season: SeasonTheme,
  customColorHex?: string
): FigureAnimData {
  const accentHex = customColorHex || season.palette.accent || '#0284C7';
  const towerMat = new THREE.MeshStandardMaterial({
    color: 0x0F172A,
    metalness: 0.85,
    roughness: 0.2,
  });

  const neonMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color(accentHex),
    emissive: new THREE.Color(accentHex),
    emissiveIntensity: 2.2,
    roughness: 0.1,
  });

  // 1. Central Hexagonal Cyber Tower
  const towerGeo = new THREE.CylinderGeometry(0.7, 1.1, 5.4, 6);
  const towerMesh = new THREE.Mesh(towerGeo, towerMat);
  towerMesh.position.y = 2.7;
  towerMesh.castShadow = true;
  towerMesh.receiveShadow = true;
  group.add(towerMesh);

  // 2. Vertical Glowing Circuit Strips on 6 corners
  for (let i = 0; i < 6; i++) {
    const angle = (i * Math.PI * 2) / 6;
    const stripGeo = new THREE.BoxGeometry(0.06, 4.8, 0.08);
    const stripMesh = new THREE.Mesh(stripGeo, neonMat);
    const r = 0.88;
    stripMesh.position.set(Math.cos(angle) * r, 2.7, Math.sin(angle) * r);
    stripMesh.rotation.y = -angle;
    group.add(stripMesh);
  }

  // 3. Holographic Data Rings
  const ring1 = new THREE.Mesh(new THREE.TorusGeometry(1.6, 0.05, 8, 36), neonMat);
  ring1.position.y = 2.8;
  ring1.rotation.x = Math.PI / 3;
  group.add(ring1);

  const ring2 = new THREE.Mesh(new THREE.TorusGeometry(1.9, 0.04, 8, 36), neonMat);
  ring2.position.y = 3.6;
  ring2.rotation.x = -Math.PI / 4;
  group.add(ring2);

  // 4. Floating Quantum Data Cubes
  const cubeGeo = new THREE.BoxGeometry(0.35, 0.35, 0.35);
  const cubes: THREE.Mesh[] = [];
  const cubeOffsets = [
    { x: 1.6, y: 1.8, z: 0.8 },
    { x: -1.7, y: 3.2, z: -0.6 },
    { x: 0.9, y: 4.4, z: -1.5 },
    { x: -1.2, y: 4.8, z: 1.3 },
  ];

  cubeOffsets.forEach((pos) => {
    const cube = new THREE.Mesh(cubeGeo, neonMat);
    cube.position.set(pos.x, pos.y, pos.z);
    cube.castShadow = true;
    group.add(cube);
    cubes.push(cube);
  });

  // 5. Pulsating Apex Beacon
  const beaconGeo = new THREE.OctahedronGeometry(0.45, 0);
  const beacon = new THREE.Mesh(beaconGeo, neonMat);
  beacon.position.y = 5.8;
  beacon.castShadow = true;
  group.add(beacon);

  return { type: 'cyber', rings: [ring1, ring2], cubes, shards: [], beacon, gyro: null };
}

/**
 * 3. Obsidian Ember: Volcanic Magma Obelisk & Forge Crystals
 * Features a cluster of jagged basalt pillars, inner glowing lava core, and levitating magma shards
 */
export function buildObsidianEmber(
  group: THREE.Group,
  season: SeasonTheme,
  customColorHex?: string
): FigureAnimData {
  const magmaColor = customColorHex || season.palette.accent || '#DC2626';
  const rockMat = new THREE.MeshStandardMaterial({
    color: 0x1C1917,
    roughness: 0.9,
    metalness: 0.15,
  });

  const magmaMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color(magmaColor),
    emissive: new THREE.Color(magmaColor),
    emissiveIntensity: 2.2,
    roughness: 0.2,
  });

  // Central jagged basalt spire cluster
  const spireGeo = new THREE.CylinderGeometry(0.2, 1.0, 5.6, 5);
  const spire = new THREE.Mesh(spireGeo, rockMat);
  spire.position.y = 2.8;
  spire.castShadow = true;
  group.add(spire);

  // Surrounding angled crystal pillars
  const angles = [0.4, 1.6, 2.8, 4.2, 5.3];
  angles.forEach((ang, idx) => {
    const h = 2.6 + (idx % 3) * 0.8;
    const pGeo = new THREE.CylinderGeometry(0.1, 0.45, h, 4);
    const pMesh = new THREE.Mesh(pGeo, rockMat);
    const dist = 0.95;
    pMesh.position.set(Math.cos(ang) * dist, h / 2, Math.sin(ang) * dist);
    pMesh.rotation.x = (Math.random() - 0.5) * 0.25;
    pMesh.rotation.z = (Math.random() - 0.5) * 0.25;
    pMesh.castShadow = true;
    group.add(pMesh);
  });

  // Glowing Magma Fissures inside
  const coreGlow = new THREE.Mesh(new THREE.CylinderGeometry(0.4, 0.5, 3.2, 6), magmaMat);
  coreGlow.position.y = 2.4;
  group.add(coreGlow);

  // Levitating Magma Shards
  const shardGeo = new THREE.OctahedronGeometry(0.3, 0);
  const shards: THREE.Mesh[] = [];
  const shardCoords = [
    { x: 1.4, y: 3.5, z: 0.5 },
    { x: -1.5, y: 2.8, z: -0.8 },
    { x: 0.6, y: 4.6, z: -1.4 },
  ];

  shardCoords.forEach((coord) => {
    const shard = new THREE.Mesh(shardGeo, magmaMat);
    shard.position.set(coord.x, coord.y, coord.z);
    shard.castShadow = true;
    group.add(shard);
    shards.push(shard);
  });

  // Glowing Top Crystal
  const topCrystal = new THREE.Mesh(new THREE.ConeGeometry(0.35, 1.2, 5), magmaMat);
  topCrystal.position.y = 5.9;
  topCrystal.castShadow = true;
  group.add(topCrystal);

  return { type: 'ember', rings: [], cubes: [], shards, beacon: topCrystal, gyro: null };
}

/**
 * 4. Stealth Titanium: Supersonic Aerospace Monolith
 * Features a diamond-faceted stealth spire, swept wing fins, rotating gyroscope gimbal ring, and pitot tube
 */
export function buildStealthTitanium(
  group: THREE.Group,
  season: SeasonTheme,
  customColorHex?: string
): FigureAnimData {
  const metalMat = new THREE.MeshStandardMaterial({
    color: 0x27272A,
    metalness: 0.9,
    roughness: 0.25,
  });

  const accentMat = new THREE.MeshStandardMaterial({
    color: 0x71717A,
    metalness: 0.95,
    roughness: 0.15,
  });

  // Central faceted diamond spire (rotated 45deg for sharp radar-deflecting knife edges)
  const spireGeo = new THREE.CylinderGeometry(0.08, 1.1, 5.6, 4);
  const spire = new THREE.Mesh(spireGeo, metalMat);
  spire.position.y = 2.8;
  spire.rotation.y = Math.PI / 4;
  spire.castShadow = true;
  group.add(spire);

  // Aerodynamic swept wing plates
  const wingGeo = new THREE.BoxGeometry(3.6, 0.08, 1.2);
  const wingMesh = new THREE.Mesh(wingGeo, metalMat);
  wingMesh.position.set(0, 2.6, 0);
  wingMesh.rotation.x = Math.PI / 8;
  wingMesh.castShadow = true;
  group.add(wingMesh);

  // Precision aerospace gyroscope gimbal ring
  const gyro = new THREE.Mesh(new THREE.TorusGeometry(1.5, 0.06, 6, 32), accentMat);
  gyro.position.y = 3.6;
  gyro.rotation.x = Math.PI / 4;
  group.add(gyro);

  // Apex Pitot Sensor Spire
  const pitotGeo = new THREE.CylinderGeometry(0.03, 0.08, 1.4, 8);
  const pitot = new THREE.Mesh(pitotGeo, accentMat);
  pitot.position.y = 6.0;
  pitot.castShadow = true;
  group.add(pitot);

  return { type: 'stealth', rings: [], cubes: [], shards: [], beacon: pitot, gyro };
}

/**
 * Dispatches to build the appropriate center figure based on season profile
 */
export function buildFigure(
  group: THREE.Group,
  season: SeasonTheme,
  customColorHex?: string,
  customFoliageColors?: string[]
): FigureAnimData {
  const id = season.id;
  if (id === 'cyber' || id === 'summer') {
    return buildCyberMonolith(group, season, customColorHex);
  }
  if (id === 'ember' || id === 'autumn') {
    return buildObsidianEmber(group, season, customColorHex);
  }
  if (id === 'stealth' || id === 'winter') {
    return buildStealthTitanium(group, season, customColorHex);
  }
  return buildRoninPine(group, season, customFoliageColors);
}
