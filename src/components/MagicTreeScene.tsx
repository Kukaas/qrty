'use client';

import React, { useEffect, useRef, useCallback } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { QRMatrixData, SeasonTheme, ViewMode } from '@/types';
import { sound } from '@/lib/audio';

interface MagicTreeSceneProps {
  qrData: QRMatrixData;
  season: SeasonTheme;
  customColorHex?: string;
  customFoliageColors?: string[];
  viewMode: ViewMode;
  onToggleViewMode: () => void;
  onRegisterCapture: (captureFn: () => string) => void;
}

export default function MagicTreeScene({
  qrData,
  season,
  customColorHex,
  customFoliageColors,
  viewMode,
  onToggleViewMode,
  onRegisterCapture,
}: MagicTreeSceneProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);

  // Group & Object references
  const dioramaGroupRef = useRef<THREE.Group | null>(null);
  const treeGroupRef = useRef<THREE.Group | null>(null);
  const foliageGroupRef = useRef<THREE.Group | null>(null);
  const particlesMeshRef = useRef<THREE.InstancedMesh | null>(null);
  const tilesMeshRef = useRef<THREE.InstancedMesh | null>(null);
  const sunLightRef = useRef<THREE.DirectionalLight | null>(null);
  const ambientLightRef = useRef<THREE.AmbientLight | null>(null);

  // Particle data
  const particleDataRef = useRef<{
    pos: THREE.Vector3[];
    rot: THREE.Euler[];
    rotSpeed: THREE.Vector3[];
    vel: THREE.Vector3[];
  }>({ pos: [], rot: [], rotSpeed: [], vel: [] });

  // Camera animation state
  const isAnimatingRef = useRef(false);
  const animStartTimeRef = useRef(0);
  const animDuration = 900; // ms
  const startCamPosRef = useRef(new THREE.Vector3());
  const targetCamPosRef = useRef(new THREE.Vector3());
  const startCamLookRef = useRef(new THREE.Vector3());
  const targetCamLookRef = useRef(new THREE.Vector3());
  const startCamUpRef = useRef(new THREE.Vector3());
  const targetCamUpRef = useRef(new THREE.Vector3());
  const startCamFovRef = useRef(40);
  const targetCamFovRef = useRef(40);

  // Tree bloom state (1 in 3D mode, 0 in QR mode)
  const treeScaleRef = useRef(viewMode === '3d' ? 1.0 : 0.001);
  const targetTreeScaleRef = useRef(viewMode === '3d' ? 1.0 : 0.001);

  // Raycasting for clicking tree or canvas
  const raycasterRef = useRef(new THREE.Raycaster());
  const mouseRef = useRef(new THREE.Vector2());
  const pointerDownPosRef = useRef({ x: 0, y: 0 });

  // Fallback screenshot function
  const captureCanvas = useCallback((): string => {
    if (!rendererRef.current || !sceneRef.current || !cameraRef.current) return '';
    rendererRef.current.render(sceneRef.current, cameraRef.current);
    return rendererRef.current.domElement.toDataURL('image/png');
  }, []);

  useEffect(() => {
    onRegisterCapture(captureCanvas);
  }, [captureCanvas, onRegisterCapture]);

  /**
   * Updates tile positions, heights, and colors based on viewMode.
   * In QR mode: perfectly flat, zero shadow obstruction, high-contrast.
   * In 3D mode: raised topiary hedges and stylized stone modules.
   */
  const updateTileLayout = useCallback(
    (isQR: boolean) => {
      const tilesMesh = tilesMeshRef.current;
      if (!tilesMesh) return;

      const { size, modules, isFinder } = qrData;
      const cellSize = 0.52;
      const offset = ((size - 1) * cellSize) / 2;
      const dummy = new THREE.Object3D();
      const color = new THREE.Color();

      const lightColorHex = isQR ? '#FFFFFF' : season.palette.groundLight;
      // In QR mode, ensure high contrast for effortless phone scanning
      const darkColorHex = isQR
        ? customColorHex || '#18181B'
        : customColorHex || season.palette.groundDark;
      const finderDarkHex = isQR
        ? '#14532D' // Dark forest green with strong contrast against white
        : season.palette.hedges[0] || '#4B7B34';

      let tileIndex = 0;
      for (let r = 0; r < size; r++) {
        for (let c = 0; c < size; c++) {
          const isDark = modules[r][c];
          const isF = isFinder[r][c];
          const x = c * cellSize - offset;
          const z = r * cellSize - offset;

          if (isQR) {
            // Flat, crisp 2D alignment for 100% phone camera scanning
            dummy.position.set(x, 0.04, z);
            if (isF && isDark) {
              // Seamless finder patterns (no gaps) for instant phone camera lock-on
              dummy.scale.set(1.01, 0.4, 1.01);
              color.set(finderDarkHex);
            } else if (isDark) {
              dummy.scale.set(0.96, 0.4, 0.96);
              color.set(darkColorHex);
            } else {
              dummy.scale.set(1.01, 0.3, 1.01);
              color.set(lightColorHex);
            }
          } else {
            // 3D Isometric diorama styling
            dummy.position.set(x, 0.06, z);
            if (isF && isDark) {
              dummy.scale.set(1.0, 3.2, 1.0);
              dummy.position.y = 0.19;
              const hc = season.palette.hedges[(r + c) % season.palette.hedges.length];
              color.set(hc);
            } else if (isDark) {
              dummy.scale.set(0.96, 1.3, 0.96);
              dummy.position.y = 0.08;
              color.set(darkColorHex);
            } else {
              dummy.scale.set(0.96, 0.8, 0.96);
              dummy.position.y = 0.04;
              color.set(lightColorHex);
            }
          }

          dummy.updateMatrix();
          tilesMesh.setMatrixAt(tileIndex, dummy.matrix);
          tilesMesh.setColorAt(tileIndex, color);
          tileIndex++;
        }
      }

      tilesMesh.instanceMatrix.needsUpdate = true;
      if (tilesMesh.instanceColor) tilesMesh.instanceColor.needsUpdate = true;
    },
    [qrData, season, customColorHex]
  );

  // Set up Three.js scene
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 1. Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(season.palette.background);
    sceneRef.current = scene;

    // 2. Camera dimensions with responsive zoom framing
    const width = container.clientWidth || window.innerWidth || 800;
    const height = container.clientHeight || window.innerHeight || 600;
    const aspect = height > 0 ? width / height : 1.5;
    const initialFov =
      viewMode === '3d'
        ? aspect < 1 ? Math.min(56, 38 / aspect) : 38
        : aspect < 1 ? Math.min(54, 34 / aspect) : 34;
    const camera = new THREE.PerspectiveCamera(initialFov, aspect, 0.1, 1000);

    if (viewMode === '3d') {
      camera.position.set(24, 28, 24);
      camera.up.set(0, 1, 0);
    } else {
      camera.position.set(0, 46, 0.0001);
      camera.up.set(0, 0, -1);
    }
    camera.lookAt(0, 0, 0);
    cameraRef.current = camera;

    // 3. Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      powerPreference: 'high-performance',
      preserveDrawingBuffer: true,
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;

    // Clear previous canvas
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // 4. OrbitControls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.06;
    controls.maxPolarAngle = Math.PI / 2.08;
    controls.minDistance = 10;
    controls.maxDistance = 65;
    controls.target.set(0, 0, 0);
    controls.enabled = viewMode === '3d';
    controlsRef.current = controls;

    // 5. Lighting
    const ambientLight = new THREE.AmbientLight(0xfff8f0, viewMode === '3d' ? 1.2 : 2.4);
    scene.add(ambientLight);
    ambientLightRef.current = ambientLight;

    const hemiLight = new THREE.HemisphereLight(0xfffdf7, 0xe8e0d5, 0.6);
    scene.add(hemiLight);

    const sunLight = new THREE.DirectionalLight(0xfff6ea, viewMode === '3d' ? 1.8 : 0.4);
    sunLight.position.set(20, 32, 18);
    sunLight.castShadow = viewMode === '3d';
    sunLight.shadow.mapSize.width = 2048;
    sunLight.shadow.mapSize.height = 2048;
    sunLight.shadow.camera.near = 5;
    sunLight.shadow.camera.far = 70;
    const shadowDist = 18;
    sunLight.shadow.camera.left = -shadowDist;
    sunLight.shadow.camera.right = shadowDist;
    sunLight.shadow.camera.top = shadowDist;
    sunLight.shadow.camera.bottom = -shadowDist;
    sunLight.shadow.bias = -0.0005;
    scene.add(sunLight);
    sunLightRef.current = sunLight;

    const fillLight = new THREE.DirectionalLight(0xe0f2fe, 0.5);
    fillLight.position.set(-18, 15, -18);
    scene.add(fillLight);

    // Root diorama group
    const dioramaGroup = new THREE.Group();
    scene.add(dioramaGroup);
    dioramaGroupRef.current = dioramaGroup;

    // 6. Floating soft shadow beneath the island
    const shadowGeo = new THREE.PlaneGeometry(28, 28);
    const shadowMat = new THREE.MeshBasicMaterial({
      color: 0x221a12,
      transparent: true,
      opacity: 0.08,
      depthWrite: false,
    });
    const shadowPlane = new THREE.Mesh(shadowGeo, shadowMat);
    shadowPlane.rotation.x = -Math.PI / 2;
    shadowPlane.position.y = -1.6;
    dioramaGroup.add(shadowPlane);

    // 7. Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Camera animation
      if (isAnimatingRef.current) {
        const now = performance.now();
        const progress = Math.min((now - animStartTimeRef.current) / animDuration, 1.0);
        const ease =
          progress < 0.5
            ? 4 * progress * progress * progress
            : 1 - Math.pow(-2 * progress + 2, 3) / 2;

        camera.position.lerpVectors(startCamPosRef.current, targetCamPosRef.current, ease);
        camera.up.lerpVectors(startCamUpRef.current, targetCamUpRef.current, ease).normalize();

        const currentFov = THREE.MathUtils.lerp(startCamFovRef.current, targetCamFovRef.current, ease);
        if (camera.fov !== currentFov) {
          camera.fov = currentFov;
          camera.updateProjectionMatrix();
        }

        const currentLook = new THREE.Vector3().lerpVectors(
          startCamLookRef.current,
          targetCamLookRef.current,
          ease
        );
        camera.lookAt(currentLook);
        controls.target.copy(currentLook);

        if (progress >= 1.0) {
          isAnimatingRef.current = false;
          controls.enabled = viewMode === '3d';
        }
      } else if (controls.enabled) {
        controls.update();
      }

      // Smooth tree scale transition
      const treeScaleSpeed = 0.09;
      treeScaleRef.current += (targetTreeScaleRef.current - treeScaleRef.current) * treeScaleSpeed;
      if (treeGroupRef.current) {
        const s = Math.max(0.0001, treeScaleRef.current);
        treeGroupRef.current.scale.set(s, s, s);
        treeGroupRef.current.visible = s > 0.02 && viewMode === '3d';
      }

      // Gentle swaying of foliage and branches
      if (foliageGroupRef.current && treeScaleRef.current > 0.1) {
        const sway = Math.sin(elapsedTime * 1.5) * 0.025;
        foliageGroupRef.current.rotation.y = Math.sin(elapsedTime * 0.8) * 0.02;
        foliageGroupRef.current.position.x = sway;
      }

      // Update falling petals / particles in 3D mode
      if (particlesMeshRef.current && viewMode === '3d' && particleDataRef.current.pos.length > 0) {
        const dummy = new THREE.Object3D();
        const pData = particleDataRef.current;
        const count = pData.pos.length;

        for (let i = 0; i < count; i++) {
          const pos = pData.pos[i];
          const rot = pData.rot[i];
          const rSpeed = pData.rotSpeed[i];
          const vel = pData.vel[i];

          pos.y -= vel.y;
          pos.x += Math.sin(elapsedTime * 1.2 + i) * 0.015 + vel.x;
          pos.z += Math.cos(elapsedTime * 1.2 + i) * 0.015 + vel.z;

          rot.x += rSpeed.x;
          rot.y += rSpeed.y;
          rot.z += rSpeed.z;

          if (pos.y < 0.1 || Math.abs(pos.x) > 10 || Math.abs(pos.z) > 10) {
            pos.set((Math.random() - 0.5) * 6, 5.5 + Math.random() * 3, (Math.random() - 0.5) * 6);
          }

          dummy.position.copy(pos);
          dummy.rotation.copy(rot);
          const pScale = treeScaleRef.current * 0.16;
          dummy.scale.set(pScale, pScale, pScale);
          dummy.updateMatrix();

          particlesMeshRef.current.setMatrixAt(i, dummy.matrix);
        }
        particlesMeshRef.current.instanceMatrix.needsUpdate = true;
      }

      renderer.render(scene, camera);
    };

    animate();

    // Resize handler
    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      const w = container.clientWidth || window.innerWidth || 800;
      const h = container.clientHeight || window.innerHeight || 600;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);
    const ro = new ResizeObserver(() => handleResize());
    ro.observe(container);

    return () => {
      window.removeEventListener('resize', handleResize);
      ro.disconnect();
      cancelAnimationFrame(animationFrameId);
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  // Update Scene Background on Season change
  useEffect(() => {
    if (sceneRef.current) {
      sceneRef.current.background = new THREE.Color(season.palette.background);
    }
  }, [season]);

  // Build / Rebuild Diorama Island, QR Grid, and 3D Tree
  useEffect(() => {
    const scene = sceneRef.current;
    const dioramaGroup = dioramaGroupRef.current;
    if (!scene || !dioramaGroup) return;

    // Clean up previous children except shadow plane
    const childrenToRemove = dioramaGroup.children.filter(
      (child) => child.type !== 'Mesh' || child.position.y > -1.5
    );
    childrenToRemove.forEach((child) => dioramaGroup.remove(child));

    const { size } = qrData;
    const cellSize = 0.52;
    const islandPadding = 1.4;
    const islandWidth = size * cellSize + islandPadding * 2;

    // 1. Floating Island Base Slab
    const baseMat = new THREE.MeshStandardMaterial({
      color: 0xeee7dc,
      roughness: 0.85,
      metalness: 0.05,
    });
    const earthMat = new THREE.MeshStandardMaterial({
      color: 0x8d6e63,
      roughness: 0.95,
      metalness: 0.0,
    });

    const topSlabGeo = new THREE.BoxGeometry(islandWidth, 0.45, islandWidth);
    const topSlab = new THREE.Mesh(topSlabGeo, baseMat);
    topSlab.position.y = -0.225;
    topSlab.receiveShadow = true;
    topSlab.castShadow = true;
    dioramaGroup.add(topSlab);

    const bottomSlabGeo = new THREE.BoxGeometry(islandWidth - 0.6, 0.55, islandWidth - 0.6);
    const bottomSlab = new THREE.Mesh(bottomSlabGeo, earthMat);
    bottomSlab.position.y = -0.725;
    bottomSlab.receiveShadow = true;
    bottomSlab.castShadow = true;
    dioramaGroup.add(bottomSlab);

    // 2. Instanced QR Code Ground Tiles
    const totalTiles = size * size;
    const tileGeo = new THREE.BoxGeometry(cellSize * 0.94, 0.12, cellSize * 0.94);
    const tileMat = new THREE.MeshStandardMaterial({
      roughness: 0.7,
      metalness: 0.05,
    });

    const tilesMesh = new THREE.InstancedMesh(tileGeo, tileMat, totalTiles);
    tilesMesh.receiveShadow = true;
    tilesMesh.castShadow = true;
    tilesMeshRef.current = tilesMesh;
    dioramaGroup.add(tilesMesh);

    // Apply current layout (3D or QR)
    updateTileLayout(viewMode === 'qr');

    // 3. Perimeter Garden Edge Grass Tufts
    const grassGeo = new THREE.ConeGeometry(0.12, 0.35, 4);
    const grassMat = new THREE.MeshStandardMaterial({
      color: 0x6ca34d,
      roughness: 0.9,
    });
    const grassGroup = new THREE.Group();
    const perimeterCount = Math.floor(size * 1.5);
    const halfIsland = islandWidth / 2 - 0.2;

    for (let i = 0; i < perimeterCount; i++) {
      const side = Math.floor(Math.random() * 4);
      let gx = 0,
        gz = 0;
      const t = (Math.random() - 0.5) * islandWidth * 0.92;
      if (side === 0) {
        gx = t;
        gz = -halfIsland;
      } else if (side === 1) {
        gx = t;
        gz = halfIsland;
      } else if (side === 2) {
        gx = -halfIsland;
        gz = t;
      } else {
        gx = halfIsland;
        gz = t;
      }

      const grass = new THREE.Mesh(grassGeo, grassMat);
      grass.position.set(gx, 0.16, gz);
      grass.rotation.y = Math.random() * Math.PI;
      grass.rotation.z = (Math.random() - 0.5) * 0.2;
      grass.scale.setScalar(0.7 + Math.random() * 0.6);
      grassGroup.add(grass);
    }
    dioramaGroup.add(grassGroup);

    // 4. Procedural 3D Magic Tree
    const treeGroup = new THREE.Group();
    treeGroup.position.set(0, 0, 0);
    treeGroupRef.current = treeGroup;

    const trunkMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(season.palette.trunk),
      roughness: 0.85,
      metalness: 0.05,
    });

    const trunkCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(0.2, 1.2, 0.1),
      new THREE.Vector3(-0.3, 2.4, -0.2),
      new THREE.Vector3(0.1, 3.8, 0.2),
      new THREE.Vector3(0.0, 5.0, 0.0),
    ]);
    const trunkGeo = new THREE.TubeGeometry(trunkCurve, 24, 0.38, 8, false);
    const trunkMesh = new THREE.Mesh(trunkGeo, trunkMat);
    trunkMesh.castShadow = true;
    trunkMesh.receiveShadow = true;
    treeGroup.add(trunkMesh);

    const branches = [
      { start: new THREE.Vector3(-0.2, 2.6, -0.1), end: new THREE.Vector3(-1.8, 3.8, -1.2), radius: 0.18 },
      { start: new THREE.Vector3(0.1, 3.1, 0.2), end: new THREE.Vector3(1.9, 4.2, 1.1), radius: 0.18 },
      { start: new THREE.Vector3(-0.1, 3.7, 0.1), end: new THREE.Vector3(-1.4, 4.8, 1.5), radius: 0.15 },
      { start: new THREE.Vector3(0.1, 4.0, -0.1), end: new THREE.Vector3(1.5, 5.0, -1.4), radius: 0.15 },
      { start: new THREE.Vector3(0.0, 4.6, 0.0), end: new THREE.Vector3(0.2, 6.2, 0.3), radius: 0.14 },
    ];

    branches.forEach((b) => {
      const mid = new THREE.Vector3()
        .addVectors(b.start, b.end)
        .multiplyScalar(0.5)
        .add(new THREE.Vector3((Math.random() - 0.5) * 0.4, 0.4, (Math.random() - 0.5) * 0.4));
      const bCurve = new THREE.CatmullRomCurve3([b.start, mid, b.end]);
      const bGeo = new THREE.TubeGeometry(bCurve, 12, b.radius, 6, false);
      const bMesh = new THREE.Mesh(bGeo, trunkMat);
      bMesh.castShadow = true;
      treeGroup.add(bMesh);
    });

    const foliageGroup = new THREE.Group();
    foliageGroupRef.current = foliageGroup;
    treeGroup.add(foliageGroup);

    const foliageColors = customFoliageColors || season.palette.foliage;
    const foliageMatArray = foliageColors.map(
      (hex) =>
        new THREE.MeshStandardMaterial({
          color: new THREE.Color(hex),
          roughness: 0.75,
          metalness: 0.05,
          flatShading: true,
        })
    );

    const foliageClusters = [
      { pos: new THREE.Vector3(0, 5.8, 0), radius: 1.8 },
      { pos: new THREE.Vector3(0.4, 6.4, 0.3), radius: 1.5 },
      { pos: new THREE.Vector3(-0.5, 6.2, -0.4), radius: 1.4 },
      { pos: new THREE.Vector3(-1.9, 4.2, -1.3), radius: 1.6 },
      { pos: new THREE.Vector3(-2.4, 4.6, -1.0), radius: 1.2 },
      { pos: new THREE.Vector3(-1.5, 3.8, -1.8), radius: 1.1 },
      { pos: new THREE.Vector3(2.1, 4.5, 1.2), radius: 1.6 },
      { pos: new THREE.Vector3(2.5, 4.9, 0.8), radius: 1.3 },
      { pos: new THREE.Vector3(1.7, 4.2, 1.8), radius: 1.2 },
      { pos: new THREE.Vector3(-1.6, 5.1, 1.7), radius: 1.4 },
      { pos: new THREE.Vector3(-1.2, 5.5, 1.4), radius: 1.2 },
      { pos: new THREE.Vector3(1.7, 5.3, -1.5), radius: 1.5 },
      { pos: new THREE.Vector3(1.2, 5.7, -1.8), radius: 1.2 },
      { pos: new THREE.Vector3(0.8, 4.8, 0.2), radius: 1.3 },
      { pos: new THREE.Vector3(-0.7, 4.6, 0.3), radius: 1.3 },
      { pos: new THREE.Vector3(0.2, 4.4, -0.8), radius: 1.2 },
      { pos: new THREE.Vector3(-0.3, 4.3, 0.9), radius: 1.2 },
    ];

    foliageClusters.forEach((cluster, i) => {
      const geo = new THREE.IcosahedronGeometry(cluster.radius, 1);
      const posAttr = geo.attributes.position;
      for (let j = 0; j < posAttr.count; j++) {
        const vx = posAttr.getX(j);
        const vy = posAttr.getY(j);
        const vz = posAttr.getZ(j);
        const noise = 1.0 + (Math.random() - 0.5) * 0.22;
        posAttr.setXYZ(j, vx * noise, vy * noise, vz * noise);
      }
      geo.computeVertexNormals();

      const mat = foliageMatArray[i % foliageMatArray.length];
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.copy(cluster.pos);
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      foliageGroup.add(mesh);
    });

    dioramaGroup.add(treeGroup);

    const initScale = viewMode === '3d' ? 1.0 : 0.0001;
    treeScaleRef.current = initScale;
    targetTreeScaleRef.current = initScale;
    treeGroup.scale.set(initScale, initScale, initScale);
    treeGroup.visible = viewMode === '3d';

    // 5. Falling Petals System
    const particleCount = 140;
    const petalGeo = new THREE.PlaneGeometry(0.24, 0.32);
    const petalColors = season.palette.petals.map((hex) => new THREE.Color(hex));
    const petalMat = new THREE.MeshBasicMaterial({
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.9,
    });

    const particlesMesh = new THREE.InstancedMesh(petalGeo, petalMat, particleCount);
    particlesMeshRef.current = particlesMesh;

    const pPositions: THREE.Vector3[] = [];
    const pRotations: THREE.Euler[] = [];
    const pRotSpeeds: THREE.Vector3[] = [];
    const pVelocities: THREE.Vector3[] = [];

    const dummyPetal = new THREE.Object3D();
    for (let i = 0; i < particleCount; i++) {
      const pos = new THREE.Vector3(
        (Math.random() - 0.5) * 8,
        Math.random() * 6 + 1.0,
        (Math.random() - 0.5) * 8
      );
      const rot = new THREE.Euler(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      );
      const rotSpeed = new THREE.Vector3(
        (Math.random() - 0.5) * 0.04,
        (Math.random() - 0.5) * 0.05,
        (Math.random() - 0.5) * 0.04
      );
      const vel = new THREE.Vector3(
        (Math.random() - 0.5) * 0.015,
        0.015 + Math.random() * 0.02,
        (Math.random() - 0.5) * 0.015
      );

      pPositions.push(pos);
      pRotations.push(rot);
      pRotSpeeds.push(rotSpeed);
      pVelocities.push(vel);

      dummyPetal.position.copy(pos);
      dummyPetal.rotation.copy(rot);
      dummyPetal.scale.setScalar(initScale * 0.16);
      dummyPetal.updateMatrix();
      particlesMesh.setMatrixAt(i, dummyPetal.matrix);

      const pColor = petalColors[i % petalColors.length];
      particlesMesh.setColorAt(i, pColor);
    }

    particlesMesh.instanceMatrix.needsUpdate = true;
    if (particlesMesh.instanceColor) particlesMesh.instanceColor.needsUpdate = true;
    particlesMesh.visible = viewMode === '3d';
    dioramaGroup.add(particlesMesh);

    particleDataRef.current = {
      pos: pPositions,
      rot: pRotations,
      rotSpeed: pRotSpeeds,
      vel: pVelocities,
    };
  }, [qrData, season, customColorHex, customFoliageColors, updateTileLayout, viewMode]);

  // Handle ViewMode Switch
  useEffect(() => {
    const camera = cameraRef.current;
    const controls = controlsRef.current;
    const sunLight = sunLightRef.current;
    const ambientLight = ambientLightRef.current;
    if (!camera || !controls) return;

    sound.playTransitionSwoosh(viewMode === '3d');

    startCamPosRef.current.copy(camera.position);
    startCamLookRef.current.copy(controls.target);
    startCamUpRef.current.copy(camera.up);
    startCamFovRef.current = camera.fov;

    // Apply tile layout immediately
    updateTileLayout(viewMode === 'qr');

    const aspect = camera.aspect || 1.5;

    if (viewMode === '3d') {
      // Transition to 3D Isometric View (balanced framing with breathing room)
      targetCamPosRef.current.set(24, 28, 24);
      targetCamLookRef.current.set(0, 0, 0);
      targetCamUpRef.current.set(0, 1, 0);
      targetCamFovRef.current = aspect < 1 ? Math.min(56, 38 / aspect) : 38;
      targetTreeScaleRef.current = 1.0;
      controls.enabled = false;

      if (sunLight) {
        sunLight.castShadow = true;
        sunLight.intensity = 1.8;
      }
      if (ambientLight) {
        ambientLight.intensity = 1.2;
      }
      if (particlesMeshRef.current) {
        particlesMeshRef.current.visible = true;
      }
    } else {
      // Transition to Flat Scannable QR Code View (centered, comfortable margin)
      targetCamPosRef.current.set(0, 46, 0.0001);
      targetCamLookRef.current.set(0, 0, 0);
      targetCamUpRef.current.set(0, 0, -1);
      targetCamFovRef.current = aspect < 1 ? Math.min(54, 34 / aspect) : 34;
      targetTreeScaleRef.current = 0.0001;
      controls.enabled = false;

      if (sunLight) {
        sunLight.castShadow = false; // eliminate shadow distortion on QR modules
        sunLight.intensity = 0.4;
      }
      if (ambientLight) {
        ambientLight.intensity = 2.4; // flat high-contrast illumination
      }
      if (particlesMeshRef.current) {
        particlesMeshRef.current.visible = false;
      }
      if (treeGroupRef.current) {
        treeGroupRef.current.visible = false;
      }
    }

    animStartTimeRef.current = performance.now();
    isAnimatingRef.current = true;
  }, [viewMode, updateTileLayout]);

  const handlePointerDown = (e: React.PointerEvent) => {
    pointerDownPosRef.current = { x: e.clientX, y: e.clientY };
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    const dx = Math.abs(e.clientX - pointerDownPosRef.current.x);
    const dy = Math.abs(e.clientY - pointerDownPosRef.current.y);

    if (dx > 6 || dy > 6) return;

    const container = containerRef.current;
    const camera = cameraRef.current;
    const scene = sceneRef.current;
    if (!container || !camera || !scene) return;

    const rect = container.getBoundingClientRect();
    mouseRef.current.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    mouseRef.current.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

    raycasterRef.current.setFromCamera(mouseRef.current, camera);
    const intersects = raycasterRef.current.intersectObjects(scene.children, true);

    if (intersects.length > 0) {
      onToggleViewMode();
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full cursor-grab active:cursor-grabbing select-none"
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
    />
  );
}
