'use client';

import { useEffect, useRef, useState, useMemo, useCallback } from 'react';
import { Renderer, Program, Mesh, Color, Triangle } from 'ogl';

const VERT = `#version 300 es
in vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const FRAG = `#version 300 es
precision highp float;

uniform float uTime;
uniform float uAmplitude;
uniform float uSpeed;
uniform float uFrequency;
uniform vec3 uColorStops[3];
uniform vec2 uResolution;
uniform float uBlend;
uniform float uBrightness;
uniform float uContrast;
uniform float uOffset;

out vec4 fragColor;

vec3 permute(vec3 x) {
  return mod(((x * 34.0) + 1.0) * x, 289.0);
}

float snoise(vec2 v){
  const vec4 C = vec4(
      0.211324865405187, 0.366025403784439,
      -0.577350269189626, 0.024390243902439
  );
  vec2 i  = floor(v + dot(v, C.yy));
  vec2 x0 = v - i + dot(i, C.xx);
  vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod(i, 289.0);

  vec3 p = permute(
      permute(i.y + vec3(0.0, i1.y, 1.0))
    + i.x + vec3(0.0, i1.x, 1.0)
  );

  vec3 m = max(
      0.5 - vec3(
          dot(x0, x0),
          dot(x12.xy, x12.xy),
          dot(x12.zw, x12.zw)
      ), 
      0.0
  );
  m = m * m;
  m = m * m;

  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);

  vec3 g;
  g.x  = a0.x  * x0.x  + h.x  * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

struct ColorStop {
  vec3 color;
  float position;
};

vec3 colorRamp(ColorStop colors[3], float factor) {
  int index = 0;
  for (int i = 0; i < 2; i++) {
    if (colors[i].position <= factor) {
      index = i;
    }
  }
  
  ColorStop currentColor = colors[index];
  ColorStop nextColor = colors[index + 1];
  float range = nextColor.position - currentColor.position;
  float lerpFactor = range > 0.0 ? (factor - currentColor.position) / range : 0.0;
  
  return mix(currentColor.color, nextColor.color, lerpFactor);
}

void main() {
  vec2 uv = gl_FragCoord.xy / uResolution;
  
  // Инвертируем Y для более естественного направления
  uv.y = 1.0 - uv.y;
  
  ColorStop colors[3];
  colors[0] = ColorStop(uColorStops[0], 0.0);
  colors[1] = ColorStop(uColorStops[1], 0.5);
  colors[2] = ColorStop(uColorStops[2], 1.0);
  
  vec3 rampColor = colorRamp(colors, uv.x);
  
  // Основной шум с настраиваемыми параметрами
  float noise1 = snoise(vec2(
    uv.x * uFrequency + uTime * uSpeed * 0.3,
    uTime * uSpeed * 0.5
  ));
  
  float noise2 = snoise(vec2(
    uv.x * uFrequency * 1.5 + uTime * uSpeed * 0.2 + 10.0,
    uTime * uSpeed * 0.3
  ));
  
  float noise3 = snoise(vec2(
    uv.x * uFrequency * 2.0 + uTime * uSpeed * 0.1 + 20.0,
    uTime * uSpeed * 0.4
  ));
  
  // Комбинируем шумы для большей сложности
  float height = (noise1 * 0.5 + noise2 * 0.3 + noise3 * 0.2) * uAmplitude;
  height = exp(height * uContrast);
  height = (uv.y * 2.0 - height + uOffset);
  
  float intensity = 0.6 * height * uBrightness;
  
  float midPoint = 0.20;
  float auroraAlpha = smoothstep(midPoint - uBlend * 0.5, midPoint + uBlend * 0.5, intensity);
  
  vec3 auroraColor = intensity * rampColor;
  
  fragColor = vec4(auroraColor, auroraAlpha);
}
`;

const Aurora = ({
  colorStops = ['#ffb3b3', '#ff8080', '#ff4d4d'],
  amplitude = 1.0,
  blend = 0.5,
  speed = 1.0,
  frequency = 2.0,
  brightness = 1.0,
  contrast = 1.0,
  offset = 0.2,
  time = 0,
  className = '',
  style = {},
  mobileOptimized = true,
  quality = 'auto', // 'low', 'medium', 'high', 'auto'
  fallbackColor = '#ffb3b3'
}) => {
  const ctnDom = useRef(null);
  const canvasRef = useRef(null);
  const [isSupported, setIsSupported] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const animationFrameRef = useRef();
  const propsRef = useRef({ colorStops, amplitude, blend, speed, frequency, brightness, contrast, offset, time });
  const rendererRef = useRef(null);
  const programRef = useRef(null);

  // Мемоизация цветов для производительности
  const memoizedColorStops = useMemo(() => {
    return colorStops.map(hex => {
      const c = new Color(hex);
      return [c.r, c.g, c.b];
    });
  }, [colorStops]);

  useEffect(() => {
    propsRef.current = { colorStops, amplitude, blend, speed, frequency, brightness, contrast, offset, time };
  }, [colorStops, amplitude, blend, speed, frequency, brightness, contrast, offset, time]);

  // Определение мобильного устройства
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768 || 'ontouchstart' in window);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Определение качества рендеринга
  const getQualitySettings = useCallback(() => {
    if (quality !== 'auto') return quality;
    
    if (isMobile && mobileOptimized) {
      return 'low';
    }
    
    // Автоматическое определение на основе производительности
    const pixelRatio = window.devicePixelRatio || 1;
    if (pixelRatio > 2) return 'high';
    if (pixelRatio > 1) return 'medium';
    return 'low';
  }, [isMobile, mobileOptimized, quality]);

  useEffect(() => {
    const ctn = ctnDom.current;
    if (!ctn) return;

    // Проверка поддержки WebGL с улучшенной диагностикой
    const checkWebGLSupport = () => {
      try {
        const canvas = document.createElement('canvas');
        const gl = canvas.getContext('webgl2') || canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
        
        if (!gl) {
          console.warn('WebGL not supported, using fallback gradient');
          setIsSupported(false);
          return false;
        }
        
        // Проверка на поддержку расширений
        const requiredExtensions = ['OES_texture_float'];
        const hasRequiredExtensions = requiredExtensions.every(ext => 
          gl.getExtension(ext) !== null
        );
        
        if (!hasRequiredExtensions && isMobile) {
          console.warn('Some WebGL extensions not available, may affect performance');
        }
        
        return true;
      } catch (e) {
        console.error('WebGL check error:', e);
        setIsSupported(false);
        return false;
      }
    };

    if (!checkWebGLSupport()) {
      return;
    }

    let renderer, gl, program, mesh;
    const qualityLevel = getQualitySettings();

    try {
      // Настройки рендерера в зависимости от качества
      const rendererOptions = {
        alpha: true,
        premultipliedAlpha: true,
        antialias: qualityLevel !== 'low',
        powerPreference: qualityLevel === 'high' ? "high-performance" : "default",
        depth: false,
        stencil: false,
        preserveDrawingBuffer: false
      };

      renderer = new Renderer(rendererOptions);
      rendererRef.current = renderer;
      
      gl = renderer.gl;
      if (!gl) {
        setIsSupported(false);
        return;
      }

      // Оптимизация для мобильных устройств
      if (isMobile && mobileOptimized) {
        const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
        renderer.setPixelRatio(pixelRatio);
      }

      gl.clearColor(0, 0, 0, 0);
      gl.enable(gl.BLEND);
      gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
      
      // Стили canvas
      Object.assign(gl.canvas.style, {
        backgroundColor: 'transparent',
        width: '100%',
        height: '100%',
        position: 'absolute',
        top: '0',
        left: '0',
        pointerEvents: 'none',
        willChange: 'transform' // Подсказка для браузера об оптимизации
      });

      // Оптимизированная функция resize с throttle
      let resizeTimeout;
      const resize = () => {
        if (!ctn || !renderer || !program) return;
        
        if (resizeTimeout) cancelAnimationFrame(resizeTimeout);
        
        resizeTimeout = requestAnimationFrame(() => {
          const width = ctn.offsetWidth;
          const height = ctn.offsetHeight;
          if (width === 0 || height === 0) return;
          
          renderer.setSize(width, height);
          program.uniforms.uResolution.value = [width, height];
        });
      };

      window.addEventListener('resize', resize);

      const geometry = new Triangle(gl);
      if (geometry.attributes.uv) {
        delete geometry.attributes.uv;
      }

      program = new Program(gl, {
        vertex: VERT,
        fragment: FRAG,
        uniforms: {
          uTime: { value: 0 },
          uAmplitude: { value: amplitude },
          uSpeed: { value: speed },
          uFrequency: { value: frequency },
          uColorStops: { value: memoizedColorStops },
          uResolution: { value: [ctn.offsetWidth || 300, ctn.offsetHeight || 300] },
          uBlend: { value: blend },
          uBrightness: { value: brightness },
          uContrast: { value: contrast },
          uOffset: { value: offset }
        }
      });
      
      programRef.current = program;

      mesh = new Mesh(gl, { geometry, program });

      // Безопасное удаление предыдущего canvas
      if (canvasRef.current && canvasRef.current.parentNode === ctn) {
        ctn.removeChild(canvasRef.current);
      }

      ctn.appendChild(gl.canvas);
      canvasRef.current = gl.canvas;

      const startTime = performance.now();
      let lastFrameTime = 0;
      const frameInterval = 1000 / 60; // 60 FPS

      const update = (currentTime) => {
        if (!program || !renderer || !mesh) return;

        // Throttle для экономии батареи на мобильных
        if (isMobile && mobileOptimized && currentTime - lastFrameTime < frameInterval) {
          animationFrameRef.current = requestAnimationFrame(update);
          return;
        }

        lastFrameTime = currentTime;
        animationFrameRef.current = requestAnimationFrame(update);

        const currentProps = propsRef.current;
        const elapsed = (performance.now() - startTime) * 0.001;

        // Обновление uniform'ов
        program.uniforms.uTime.value = (currentProps.time + elapsed) * currentProps.speed * 0.2;
        program.uniforms.uAmplitude.value = currentProps.amplitude;
        program.uniforms.uSpeed.value = currentProps.speed;
        program.uniforms.uFrequency.value = currentProps.frequency;
        program.uniforms.uBlend.value = currentProps.blend;
        program.uniforms.uBrightness.value = currentProps.brightness;
        program.uniforms.uContrast.value = currentProps.contrast;
        program.uniforms.uOffset.value = currentProps.offset;

        // Обновление цветов только при изменении
        const currentStops = currentProps.colorStops;
        if (JSON.stringify(currentStops) !== JSON.stringify(colorStops)) {
          program.uniforms.uColorStops.value = currentStops.map(hex => {
            const c = new Color(hex);
            return [c.r, c.g, c.b];
          });
        }

        try {
          renderer.render({ scene: mesh });
        } catch (e) {
          console.error('Render error:', e);
        }
      };

      animationFrameRef.current = requestAnimationFrame(update);

      // Первоначальный resize
      setTimeout(resize, 100);

      return () => {
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }
        
        window.removeEventListener('resize', resize);
        
        // Очистка ресурсов
        try {
          if (ctn && gl?.canvas?.parentNode === ctn) {
            ctn.removeChild(gl.canvas);
          }
          
          if (gl) {
            gl.getExtension('WEBGL_lose_context')?.loseContext();
          }
          
          if (geometry) geometry.dispose();
          if (program) program.dispose();
          if (mesh) mesh.dispose();
          if (renderer) renderer.dispose();
        } catch (e) {
          // Игнорируем ошибки при очистке
        }
      };
    } catch (error) {
      console.error('WebGL initialization error:', error);
      setIsSupported(false);
      return;
    }
  }, [memoizedColorStops, isMobile, mobileOptimized, getQualitySettings]);

  // Улучшенный статический градиент для fallback
  if (!isSupported) {
    const gradientStyle = {
      background: `radial-gradient(circle at 30% 50%, ${colorStops[0]} 0%, ${colorStops[1]} 50%, ${colorStops[2]} 100%)`,
      opacity: 0.4,
      filter: 'blur(40px)',
      transform: 'translateZ(0)', // Hardware acceleration
      willChange: 'transform, opacity'
    };

    return (
      <div 
        ref={ctnDom} 
        className={`w-full h-full absolute inset-0 pointer-events-none ${className}`}
        style={{
          ...style,
          ...gradientStyle,
          zIndex: 0
        }}
      />
    );
  }

  return (
    <div 
      ref={ctnDom} 
      className={`w-full h-full absolute inset-0 pointer-events-none ${className}`} 
      style={{ 
        ...style,
        background: 'transparent',
        zIndex: 0,
        transform: 'translateZ(0)', // Hardware acceleration
        willChange: 'transform'
      }} 
    />
  );
};

export default Aurora;