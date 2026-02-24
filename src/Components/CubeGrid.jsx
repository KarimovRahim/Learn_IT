'use client';

import { useRef, useEffect, useCallback, useMemo } from 'react';
import { gsap } from 'gsap';
import { InertiaPlugin } from 'gsap/InertiaPlugin';

gsap.registerPlugin(InertiaPlugin);

const throttle = (func, limit) => {
  let lastCall = 0;
  return function (...args) {
    const now = performance.now();
    if (now - lastCall >= limit) {
      lastCall = now;
      func.apply(this, args);
    }
  };
};

function hexToRgb(hex) {
  const m = hex.match(/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i);
  if (!m) return { r: 0, g: 0, b: 0 };
  return {
    r: parseInt(m[1], 16),
    g: parseInt(m[2], 16),
    b: parseInt(m[3], 16)
  };
}

const CubeGrid = ({
  cubeSize = 6,
  gap = 28,
  proximity = 150,
  speedTrigger = 40,
  shockRadius = 200,
  shockStrength = 3,
  maxSpeed = 4000,
  resistance = 500,
  returnDuration = 1.0,
  className = '',
  style,
}) => {
  const wrapperRef = useRef(null);
  const canvasRef = useRef(null);
  const cubesRef = useRef([]);
  const pointerRef = useRef({
    x: 0,
    y: 0,
    vx: 0,
    vy: 0,
    speed: 0,
    lastTime: 0,
    lastX: 0,
    lastY: 0
  });

  // ТОЛЬКО ТЕМНАЯ ТЕМА - без вариантов
  const themeColors = {
    base: '#27272A',     // Базовый серый
    active: '#EF4444',    // Красный для активности
    outline: '#52525B',   // Обводка
    highlight: '#F87171'  // Подсветка
  };

  const baseRgb = useMemo(() => hexToRgb(themeColors.base), []);
  const activeRgb = useMemo(() => hexToRgb(themeColors.active), []);
  const outlineRgb = useMemo(() => hexToRgb(themeColors.outline), []);
  const highlightRgb = useMemo(() => hexToRgb(themeColors.highlight), []);

  const buildGrid = useCallback(() => {
    const wrap = wrapperRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;

    const { width, height } = wrap.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    const ctx = canvas.getContext('2d');
    if (ctx) ctx.scale(dpr, dpr);

    const cols = Math.floor((width + gap) / (cubeSize + gap));
    const rows = Math.floor((height + gap) / (cubeSize + gap));
    const cell = cubeSize + gap;

    const gridW = cell * cols - gap;
    const gridH = cell * rows - gap;

    const extraX = width - gridW;
    const extraY = height - gridH;

    const startX = extraX / 2 + cubeSize / 2;
    const startY = extraY / 2 + cubeSize / 2;

    const cubes = [];
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        const cx = startX + x * cell;
        const cy = startY + y * cell;
        cubes.push({ 
          cx, 
          cy, 
          xOffset: 0, 
          yOffset: 0, 
          rotation: Math.random() * Math.PI / 4,
          scale: 1,
          opacity: 1,
          _inertiaApplied: false 
        });
      }
    }
    cubesRef.current = cubes;
  }, [cubeSize, gap]);

  const drawCube = (ctx, x, y, size, color, outlineColor, rotation = 0, scale = 1, opacity = 1) => {
    const half = (size * scale) / 2;
    const scaledSize = size * scale;
    
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rotation);
    ctx.globalAlpha = opacity;
    
    // Основная грань куба
    ctx.fillStyle = color;
    ctx.fillRect(-half, -half, scaledSize, scaledSize);
    
    // Тонкая обводка
    ctx.strokeStyle = outlineColor;
    ctx.lineWidth = 0.6;
    ctx.strokeRect(-half, -half, scaledSize, scaledSize);
    
    // Грани для объема
    ctx.fillStyle = `rgba(${outlineRgb.r}, ${outlineRgb.g}, ${outlineRgb.b}, 0.15)`;
    ctx.beginPath();
    ctx.moveTo(half, -half);
    ctx.lineTo(half + half * 0.15, -half - half * 0.1);
    ctx.lineTo(half + half * 0.15, half - half * 0.1);
    ctx.lineTo(half, half);
    ctx.closePath();
    ctx.fill();
    
    ctx.fillStyle = `rgba(${outlineRgb.r}, ${outlineRgb.g}, ${outlineRgb.b}, 0.1)`;
    ctx.beginPath();
    ctx.moveTo(-half, -half);
    ctx.lineTo(-half - half * 0.1, -half - half * 0.15);
    ctx.lineTo(half - half * 0.1, -half - half * 0.15);
    ctx.lineTo(half, -half);
    ctx.closePath();
    ctx.fill();
    
    ctx.restore();
  };

  useEffect(() => {
    if (typeof window === 'undefined') return;

    let rafId;
    const proxSq = proximity * proximity;

    const draw = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const { x: px, y: py } = pointerRef.current;

      for (const cube of cubesRef.current) {
        const ox = cube.cx + cube.xOffset;
        const oy = cube.cy + cube.yOffset;
        const dx = cube.cx - px;
        const dy = cube.cy - py;
        const dsq = dx * dx + dy * dy;
        const dist = Math.sqrt(dsq);

        let fillColor = themeColors.base;
        let outlineColor = themeColors.outline;
        let scale = cube.scale || 1;
        let opacity = cube.opacity || 1;
        
        if (dsq <= proxSq) {
          const t = 1 - dist / proximity;
          
          // Плавный переход к активному цвету
          const r = Math.round(baseRgb.r + (activeRgb.r - baseRgb.r) * Math.pow(t, 1.5));
          const g = Math.round(baseRgb.g + (activeRgb.g - baseRgb.g) * Math.pow(t, 1.5));
          const b = Math.round(baseRgb.b + (activeRgb.b - baseRgb.b) * Math.pow(t, 1.5));
          fillColor = `rgb(${r},${g},${b})`;
          opacity = 1;
          
          // Подсветка обводки
          const outlineR = Math.round(outlineRgb.r + (highlightRgb.r - outlineRgb.r) * t);
          const outlineG = Math.round(outlineRgb.g + (highlightRgb.g - outlineRgb.g) * t * 0.7);
          const outlineB = Math.round(outlineRgb.b + (highlightRgb.b - outlineRgb.b) * t * 0.5);
          outlineColor = `rgb(${outlineR},${outlineG},${outlineB})`;
          
          // Увеличение при близком приближении
          if (dist < proximity * 0.3) {
            scale = 1 + (1 - dist / (proximity * 0.3)) * 0.15;
          }
        }

        drawCube(ctx, ox, oy, cubeSize, fillColor, outlineColor, cube.rotation, scale, opacity);
      }

      rafId = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(rafId);
  }, [proximity, themeColors, baseRgb, activeRgb, outlineRgb, highlightRgb, cubeSize]);

  useEffect(() => {
    buildGrid();
    let ro = null;
    if ('ResizeObserver' in window) {
      ro = new ResizeObserver(buildGrid);
      wrapperRef.current && ro.observe(wrapperRef.current);
    } else {
      window.addEventListener('resize', buildGrid);
    }
    return () => {
      if (ro) ro.disconnect();
      else window.removeEventListener('resize', buildGrid);
    };
  }, [buildGrid]);

  useEffect(() => {
    const onMove = e => {
      const now = performance.now();
      const pr = pointerRef.current;
      const dt = pr.lastTime ? now - pr.lastTime : 16;
      const dx = e.clientX - pr.lastX;
      const dy = e.clientY - pr.lastY;
      let vx = (dx / dt) * 1000;
      let vy = (dy / dt) * 1000;
      let speed = Math.hypot(vx, vy);
      if (speed > maxSpeed) {
        const scale = maxSpeed / speed;
        vx *= scale;
        vy *= scale;
        speed = maxSpeed;
      }
      pr.lastTime = now;
      pr.lastX = e.clientX;
      pr.lastY = e.clientY;
      pr.vx = vx;
      pr.vy = vy;
      pr.speed = speed;

      const rect = canvasRef.current.getBoundingClientRect();
      pr.x = e.clientX - rect.left;
      pr.y = e.clientY - rect.top;

      for (const cube of cubesRef.current) {
        const dist = Math.hypot(cube.cx - pr.x, cube.cy - pr.y);
        
        // Масштабирование при приближении
        if (dist < proximity * 0.4) {
          const scaleFactor = 1 + (1 - dist / (proximity * 0.4)) * 0.2;
          gsap.to(cube, {
            scale: scaleFactor,
            duration: 0.3,
            ease: 'power2.out'
          });
        } else if (cube.scale > 1) {
          gsap.to(cube, {
            scale: 1,
            duration: 0.5,
            ease: 'power2.out'
          });
        }
        
        // Движение при быстром движении мыши
        if (speed > speedTrigger && dist < proximity * 1.2 && !cube._inertiaApplied) {
          cube._inertiaApplied = true;
          gsap.killTweensOf(cube);
          
          const pushX = (cube.cx - pr.x) * 0.15 + vx * 0.003;
          const pushY = (cube.cy - pr.y) * 0.15 + vy * 0.003;
          
          const rotAmount = (Math.random() - 0.5) * 0.8 * (speed / maxSpeed);
          
          gsap.to(cube, {
            inertia: { 
              xOffset: pushX, 
              yOffset: pushY, 
              resistance: resistance * 0.8
            },
            rotation: cube.rotation + rotAmount,
            duration: 0.8,
            ease: 'power2.out',
            onComplete: () => {
              gsap.to(cube, {
                xOffset: 0,
                yOffset: 0,
                rotation: cube.rotation,
                scale: 1,
                opacity: 1,
                duration: returnDuration * 0.8,
                ease: 'elastic.out(1,0.4)',
                onComplete: () => {
                  cube._inertiaApplied = false;
                }
              });
            }
          });
        }
      }
    };

    const onClick = e => {
      const rect = canvasRef.current.getBoundingClientRect();
      const cx = e.clientX - rect.left;
      const cy = e.clientY - rect.top;
      
      for (const cube of cubesRef.current) {
        const dist = Math.hypot(cube.cx - cx, cube.cy - cy);
        if (dist < shockRadius && !cube._inertiaApplied) {
          cube._inertiaApplied = true;
          gsap.killTweensOf(cube);
          
          const falloff = Math.max(0, 1 - dist / shockRadius);
          const pushX = (cube.cx - cx) * shockStrength * 1.2 * falloff;
          const pushY = (cube.cy - cy) * shockStrength * 1.2 * falloff;
          
          const scaleBoost = 1 + falloff * 0.3;
          
          gsap.to(cube, {
            inertia: { xOffset: pushX, yOffset: pushY, resistance: resistance * 0.7 },
            rotation: cube.rotation + (Math.random() - 0.5) * 2 * falloff,
            scale: scaleBoost,
            opacity: 1,
            duration: 0.6,
            ease: 'power2.out',
            onComplete: () => {
              gsap.to(cube, {
                xOffset: 0,
                yOffset: 0,
                rotation: cube.rotation,
                scale: 1,
                opacity: 1,
                duration: returnDuration * 0.9,
                ease: 'elastic.out(1,0.5)',
                onComplete: () => {
                  cube._inertiaApplied = false;
                }
              });
            }
          });
        }
      }
    };

    const throttledMove = throttle(onMove, 30);
    window.addEventListener('mousemove', throttledMove, { passive: true });
    window.addEventListener('click', onClick);

    return () => {
      window.removeEventListener('mousemove', throttledMove);
      window.removeEventListener('click', onClick);
    };
  }, [maxSpeed, speedTrigger, proximity, resistance, returnDuration, shockRadius, shockStrength]);

  return (
    <div ref={wrapperRef} className={`w-full h-full relative ${className}`} style={style}>
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />
    </div>
  );
};

export default CubeGrid;