'use client';

import React, { useEffect, useRef, useCallback } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { QRMatrixData, SeasonTheme, ViewMode } from '@/types';
import { sound } from '@/lib/audio';
import { buildFigure, FigureAnimData } from '@/lib/figures';

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
  const figureAnimRef = useRef<FigureAnimData | null>(null);

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
      // In QR mode, display the preset's vibrant signature color on pure white for 100% camera readability
      const darkColorHex = customColorHex || season.palette.groundDark;
      const finderDarkHex = customColorHex || season.palette.hedges[0] || season.palette.groundDark;

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

      // Animate active figure components
      const fig = figureAnimRef.current;
      if (treeGroupRef.current && treeScaleRef.current > 0.1 && fig) {
        if (fig.type === 'cyber') {
          // Hypercar: spin wheels & subtle magnetic suspension bounce
          if (fig.wheels) {
            fig.wheels.forEach((w) => {
              w.rotation.x += 0.05;
            });
          }
          if (fig.body) {
            fig.body.position.y = 0.48 + Math.sin(elapsedTime * 3) * 0.015;
          }
        } else if (fig.type === 'ronin') {
          // Mecha Ronin: heroic warrior torso breathing
          if (fig.body) {
            fig.body.position.y = 1.8 + Math.sin(elapsedTime * 2) * 0.02;
          }
        } else if (fig.type === 'ember') {
          // Starship: hovering rocket vibration & thruster flame pulse
          if (fig.body) {
            fig.body.position.y = 0.4 + Math.sin(elapsedTime * 2.5) * 0.02;
          }
          if (fig.beacon) {
            fig.beacon.scale.y = 1.0 + Math.sin(elapsedTime * 10) * 0.12;
          }
        } else if (fig.type === 'stealth') {
          // Stealth Jet: aerodynamic banking & hovering flight sway
          if (fig.body) {
            fig.body.rotation.z = Math.sin(elapsedTime * 1.5) * 0.04;
            fig.body.rotation.x = Math.cos(elapsedTime * 1.2) * 0.025;
            fig.body.position.y = 1.6 + Math.sin(elapsedTime * 2) * 0.03;
          }
        } else if (fig.type === 'tank' || fig.type === 'tron') {
          // Cyber Tank: traversing turret scanning perimeter & subtle engine idle rumble
          if (fig.turret) {
            fig.turret.rotation.y = Math.sin(elapsedTime * 0.8) * 0.45;
          }
          if (fig.body) {
            fig.body.position.y = 0.45 + Math.sin(elapsedTime * 5) * 0.008;
          }
        } else if (fig.type === 'ufo') {
          // Mothership: rotate plasma ring & hovering wobble
          if (fig.rings && fig.rings[0]) {
            fig.rings[0].rotation.z += 0.025;
          }
          if (fig.body) {
            fig.body.position.y = 2.2 + Math.sin(elapsedTime * 2) * 0.04;
            fig.body.rotation.y += 0.008;
          }
        } else if (fig.type === 'chopper') {
          // Gunship: spin main and tail rotors
          if (fig.rotors && fig.rotors[0]) {
            fig.rotors[0].rotation.y += 0.35;
          }
          if (fig.rotors && fig.rotors[1]) {
            fig.rotors[1].rotation.x += 0.45;
          }
          if (fig.body) {
            fig.body.position.y = 1.7 + Math.sin(elapsedTime * 3) * 0.025;
          }
        } else if (fig.type === 'blade') {
          // Cyber Katana: rotate concentric energy rings
          if (fig.rings) {
            if (fig.rings[0]) fig.rings[0].rotation.z += 0.02;
            if (fig.rings[1]) fig.rings[1].rotation.z -= 0.025;
          }
        }
      }

      // Update falling or rising particles in 3D mode
      if (particlesMeshRef.current && viewMode === '3d' && particleDataRef.current.pos.length > 0) {
        const dummy = new THREE.Object3D();
        const pData = particleDataRef.current;
        const count = pData.pos.length;
        const isUpward = fig?.type === 'cyber' || fig?.type === 'ember';

        for (let i = 0; i < count; i++) {
          const pos = pData.pos[i];
          const rot = pData.rot[i];
          const rSpeed = pData.rotSpeed[i];
          const vel = pData.vel[i];

          if (isUpward) {
            // Cyber pulses / volcano embers rise upward
            pos.y += vel.y * 1.3;
            pos.x += Math.sin(elapsedTime * 1.5 + i) * 0.015 + vel.x;
            pos.z += Math.cos(elapsedTime * 1.5 + i) * 0.015 + vel.z;
            if (pos.y > 8.0 || Math.abs(pos.x) > 8 || Math.abs(pos.z) > 8) {
              pos.set((Math.random() - 0.5) * 5, 0.3 + Math.random() * 0.4, (Math.random() - 0.5) * 5);
            }
          } else {
            // Ronin pine needles / titanium flakes drift downward
            pos.y -= vel.y;
            pos.x += Math.sin(elapsedTime * 1.2 + i) * 0.015 + vel.x;
            pos.z += Math.cos(elapsedTime * 1.2 + i) * 0.015 + vel.z;
            if (pos.y < 0.1 || Math.abs(pos.x) > 10 || Math.abs(pos.z) > 10) {
              pos.set((Math.random() - 0.5) * 6, 5.5 + Math.random() * 3, (Math.random() - 0.5) * 6);
            }
          }

          rot.x += rSpeed.x;
          rot.y += rSpeed.y;
          rot.z += rSpeed.z;

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

    // 4. Distinct 3D Center Figure based on Preset (Ronin Bonsai, Cyber Monolith, Obsidian Ember, Stealth Titanium)
    const treeGroup = new THREE.Group();
    treeGroup.position.set(0, 0, 0);
    treeGroupRef.current = treeGroup;

    const animData = buildFigure(treeGroup, season, customColorHex);
    figureAnimRef.current = animData;

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
