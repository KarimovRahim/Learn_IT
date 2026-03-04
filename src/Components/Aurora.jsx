'use client';

import { useEffect, useRef } from 'react';
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
uniform vec3 uColorStops[3];
uniform vec2 uResolution;
uniform float uBlend;
uniform float uOpacity;

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

#define COLOR_RAMP(colors, factor, finalColor) {              \
  int index = 0;                                            \
  for (int i = 0; i < 2; i++) {                               \
     ColorStop currentColor = colors[i];                    \
     bool isInBetween = currentColor.position <= factor;    \
     index = int(mix(float(index), float(i), float(isInBetween))); \
  }                                                         \
  ColorStop currentColor = colors[index];                   \
  ColorStop nextColor = colors[index + 1];                  \
  float range = nextColor.position - currentColor.position; \
  float lerpFactor = (factor - currentColor.position) / range; \
  finalColor = mix(currentColor.color, nextColor.color, lerpFactor); \
}

void main() {
  vec2 uv = gl_FragCoord.xy / uResolution;
  
  ColorStop colors[3];
  colors[0] = ColorStop(uColorStops[0], 0.0);
  colors[1] = ColorStop(uColorStops[1], 0.5);
  colors[2] = ColorStop(uColorStops[2], 1.0);
  
  vec3 rampColor;
  COLOR_RAMP(colors, uv.x, rampColor);
  
  // Увеличиваем скорость движения в 2 раза
  float height = snoise(vec2(uv.x * 2.0 + uTime * 0.2, uTime * 0.5)) * 0.5 * uAmplitude;
  height = exp(height);
  height = (uv.y * 2.0 - height + 0.2);
  float intensity = 0.6 * height;
  
  float midPoint = 0.20;
  float auroraAlpha = smoothstep(midPoint - uBlend * 0.5, midPoint + uBlend * 0.5, intensity);
  
  vec3 auroraColor = intensity * rampColor;
  
  // Применяем общую прозрачность
  float finalAlpha = auroraAlpha * uOpacity;
  
  fragColor = vec4(auroraColor * finalAlpha, finalAlpha);
}
`;

const Aurora = ({
  colorStops = ['#5227FF', '#7cff67', '#5227FF'],
  amplitude = 1.0,
  blend = 0.5,
  speed = 1.0,
  time = 0,
  className = '',
  style = {},
  opacity = 1.0,
  theme = 'dark' // 'dark' или 'light'
}) => {
  const ctnDom = useRef(null);
  const propsRef = useRef({ colorStops, amplitude, blend, speed, time, opacity, theme });
  
  useEffect(() => {
    propsRef.current = { colorStops, amplitude, blend, speed, time, opacity, theme };
  }, [colorStops, amplitude, blend, speed, time, opacity, theme]);

  useEffect(() => {
    const ctn = ctnDom.current;
    if (!ctn) return;

    const renderer = new Renderer({
      alpha: true,
      premultipliedAlpha: true,
      antialias: true
    });
    
    const gl = renderer.gl;
    gl.clearColor(0, 0, 0, 0);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
    gl.canvas.style.backgroundColor = 'transparent';

    let program;

    function resize() {
      if (!ctn) return;
      const width = ctn.offsetWidth;
      const height = ctn.offsetHeight;
      renderer.setSize(width, height);
      if (program) {
        program.uniforms.uResolution.value = [width, height];
      }
    }
    
    window.addEventListener('resize', resize);

    const geometry = new Triangle(gl);
    if (geometry.attributes.uv) {
      delete geometry.attributes.uv;
    }

    const colorStopsArray = colorStops.map(hex => {
      const c = new Color(hex);
      return [c.r, c.g, c.b];
    });

    program = new Program(gl, {
      vertex: VERT,
      fragment: FRAG,
      uniforms: {
        uTime: { value: 0 },
        uAmplitude: { value: amplitude },
        uColorStops: { value: colorStopsArray },
        uResolution: { value: [ctn.offsetWidth, ctn.offsetHeight] },
        uBlend: { value: blend },
        uOpacity: { value: opacity }
      }
    });

    const mesh = new Mesh(gl, { geometry, program });
    ctn.appendChild(gl.canvas);

    let animateId = 0;
    const startTime = performance.now();

    const update = () => {
      animateId = requestAnimationFrame(update);
      
      const currentProps = propsRef.current;
      const elapsed = (performance.now() - startTime) * 0.001; // в секундах
      
      // Увеличиваем скорость в 2 раза (speed * 0.2 вместо speed * 0.1)
      program.uniforms.uTime.value = (currentProps.time + elapsed) * currentProps.speed * 0.2;
      program.uniforms.uAmplitude.value = currentProps.amplitude;
      program.uniforms.uBlend.value = currentProps.blend;
      program.uniforms.uOpacity.value = currentProps.opacity;
      
      const stops = currentProps.colorStops;
      program.uniforms.uColorStops.value = stops.map(hex => {
        const c = new Color(hex);
        return [c.r, c.g, c.b];
      });
      
      renderer.render({ scene: mesh });
    };
    
    animateId = requestAnimationFrame(update);
    resize();

    return () => {
      cancelAnimationFrame(animateId);
      window.removeEventListener('resize', resize);
      if (ctn && gl.canvas.parentNode === ctn) {
        ctn.removeChild(gl.canvas);
      }
      gl.getExtension('WEBGL_lose_context')?.loseContext();
    };
  }, []); // Пустой массив зависимостей

  return (
    <div 
      ref={ctnDom} 
      className={`w-full h-full absolute inset-0 pointer-events-none ${className}`} 
      style={{ 
        ...style,
        background: 'transparent',
        zIndex: 0
      }} 
    />
  );
};

// Компонент для фона с поддержкой темы
export const AuroraBackground = ({ theme = 'dark' }) => {
  const isDark = theme === 'dark';
  
  // Цвета для разных тем
  const colorSchemes = {
    dark: {
      primary: ['#4a1d5c', '#2d1b3c', '#1a142b'], // Фиолетовое сияние
      secondary: ['#1a1a2e', '#16213e', '#0f3460'], // Синее сияние
      accent: ['#ef4444', '#b91c1c', '#7f1d1d'] // Красное сияние
    },
    light: {
      primary: ['#9f7aea', '#805ad5', '#6b46c1'], // Светло-фиолетовое
      secondary: ['#63b3ed', '#4299e1', '#3182ce'], // Светло-синее
      accent: ['#fc8181', '#f56565', '#e53e3e'] // Светло-красное
    }
  };

  const colors = colorSchemes[theme];

  return (
    <div className="fixed inset-0 w-full h-full -z-10">
      <Aurora
        colorStops={colors.primary}
        amplitude={isDark ? 1.2 : 1.0}
        blend={isDark ? 0.6 : 0.5}
        speed={1.0} // Скорость уже увеличена в шейдере в 2 раза
        opacity={isDark ? 1.0 : 0.8}
        theme={theme}
        className={isDark ? "opacity-80" : "opacity-60"}
      />
      {/* Второй слой для большей глубины */}
      <Aurora
        colorStops={colors.secondary}
        amplitude={isDark ? 0.8 : 0.6}
        blend={isDark ? 0.4 : 0.3}
        speed={0.6} // Скорость уже увеличена в шейдере в 2 раза
        opacity={isDark ? 0.8 : 0.6}
        theme={theme}
        className={isDark ? "opacity-60" : "opacity-40"}
      />
    </div>
  );
};

export default Aurora;