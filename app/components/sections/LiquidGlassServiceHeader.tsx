'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';

interface LiquidGlassServiceHeaderProps {
  title: string;
  index: number;
  totalServices: number;
  isExpanded: boolean;
  onClick: () => void;
  innerRef?: (el: HTMLDivElement | null) => void;
}

export default function LiquidGlassServiceHeader({
  title,
  index,
  totalServices,
  isExpanded,
  onClick,
  innerRef,
}: LiquidGlassServiceHeaderProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const animFrameRef = useRef<number | null>(null);

  // WebGL Context and Uniform references
  const glRefs = useRef<{
    gl: WebGLRenderingContext | null;
    program: WebGLProgram | null;
    resolutionLoc: WebGLUniformLocation | null;
    borderRadiusLoc: WebGLUniformLocation | null;
    timeLoc: WebGLUniformLocation | null;
    isActiveLoc: WebGLUniformLocation | null;
    edgeIntensityLoc: WebGLUniformLocation | null;
    rimIntensityLoc: WebGLUniformLocation | null;
    baseIntensityLoc: WebGLUniformLocation | null;
    edgeDistanceLoc: WebGLUniformLocation | null;
    rimDistanceLoc: WebGLUniformLocation | null;
    baseDistanceLoc: WebGLUniformLocation | null;
    cornerBoostLoc: WebGLUniformLocation | null;
    rippleEffectLoc: WebGLUniformLocation | null;
    tintOpacityLoc: WebGLUniformLocation | null;
  }>({
    gl: null,
    program: null,
    resolutionLoc: null,
    borderRadiusLoc: null,
    timeLoc: null,
    isActiveLoc: null,
    edgeIntensityLoc: null,
    rimIntensityLoc: null,
    baseIntensityLoc: null,
    edgeDistanceLoc: null,
    rimDistanceLoc: null,
    baseDistanceLoc: null,
    cornerBoostLoc: null,
    rippleEffectLoc: null,
    tintOpacityLoc: null,
  });

  const handlePointerEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  const handlePointerLeave = useCallback(() => {
    setIsHovered(false);
  }, []);

  // WebGL Initialization adhering to liquid-glass-js architecture
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    let gl: WebGLRenderingContext | null = null;
    try {
      gl = canvas.getContext('webgl', {
        alpha: true,
        antialias: true,
        premultipliedAlpha: false,
        preserveDrawingBuffer: false,
      });
    } catch {
      // Graceful fallback to CSS glass
      return;
    }

    if (!gl) return;

    // Vertex Shader — Fullscreen Quad
    const vsSource = `
      attribute vec2 a_position;
      attribute vec2 a_texcoord;
      varying vec2 v_texcoord;

      void main() {
        gl_Position = vec4(a_position, 0.0, 1.0);
        v_texcoord = a_texcoord;
      }
    `;

    // Fragment Shader — Clean Liquid Glass Multi-layer Refraction & Dark Obsidian Engine
    // (Free of any cursor glare, white smudges or streaks)
    const fsSource = `
      precision mediump float;
      uniform vec2 u_resolution;
      uniform float u_borderRadius;
      uniform float u_time;
      uniform float u_isActive;
      uniform float u_edgeIntensity;
      uniform float u_rimIntensity;
      uniform float u_baseIntensity;
      uniform float u_edgeDistance;
      uniform float u_rimDistance;
      uniform float u_baseDistance;
      uniform float u_cornerBoost;
      uniform float u_rippleEffect;
      uniform float u_tintOpacity;
      varying vec2 v_texcoord;

      // Exact SDF rounded rectangle distance from liquid-glass-js
      float roundedRectDistance(vec2 coord, vec2 size, float radius) {
        vec2 center = size * 0.5;
        vec2 pixelCoord = coord * size;
        vec2 toCorner = abs(pixelCoord - center) - (center - radius);
        float outsideCorner = length(max(toCorner, 0.0));
        float insideCorner = min(max(toCorner.x, toCorner.y), 0.0);
        return (outsideCorner + insideCorner - radius);
      }

      void main() {
        vec2 coord = v_texcoord;
        vec2 size = u_resolution;
        float radius = u_borderRadius;

        // Compute distance from edge
        float distFromEdgeShape = -roundedRectDistance(coord, size, radius);
        distFromEdgeShape = max(distFromEdgeShape, 0.0);

        float minDim = min(size.x, size.y);
        float distFromEdge = distFromEdgeShape / minDim;

        // Multi-layer glass refraction calculations (liquid-glass-js formula)
        float normalizedDistance = distFromEdge * minDim;
        float edgeIntensity = exp(-normalizedDistance * u_edgeDistance) * u_edgeIntensity;
        float rimIntensity = exp(-normalizedDistance * u_rimDistance) * u_rimIntensity;

        // Dark obsidian / graphite glass body
        // Clean subtle vertical gradient simulating curved glass depth
        vec3 darkGlassTop = vec3(0.075, 0.075, 0.095);
        vec3 darkGlassBottom = vec3(0.025, 0.025, 0.035);
        vec3 glassBody = mix(darkGlassBottom, darkGlassTop, coord.y);

        // Clean, subtle physical rim reflection (strictly uniform along the perimeter, no white spots)
        float topRimFresnel = smoothstep(0.0, 3.5, normalizedDistance) * (1.0 - smoothstep(3.5, 8.0, normalizedDistance));
        vec3 rimSpecular = vec3(0.65, 0.70, 0.80) * (topRimFresnel * 0.15 + rimIntensity * 0.22);

        // Active State Red Refraction (Agency Brand Red: #e50914)
        // Elegant red refractive edge + subtle ambient red caustics (never flat solid red)
        vec3 redRefraction = vec3(0.90, 0.04, 0.08);
        float activeRimIntensity = rimIntensity * 2.4 + edgeIntensity * 1.2;
        float activeInternalGlow = exp(-distFromEdge * 4.5) * 0.35 + (1.0 - coord.y) * 0.15;
        vec3 activeGlassTint = redRefraction * (activeRimIntensity * 0.65 + activeInternalGlow * 0.25);
        
        // Blend inactive vs active glass
        vec3 finalColor = mix(glassBody + rimSpecular, glassBody + rimSpecular * 0.5 + activeGlassTint, u_isActive);

        // Alpha calculation: realistic translucent glass depth
        float baseAlpha = mix(0.72, 0.85, u_isActive);
        float edgeAlpha = (rimIntensity + edgeIntensity * 1.5) * 0.4;
        float totalAlpha = clamp(baseAlpha + edgeAlpha, 0.0, 0.94);

        // Shape mask (anti-aliased rounded rectangle)
        float maskDistance = roundedRectDistance(coord, size, radius);
        float mask = 1.0 - smoothstep(-1.2, 0.8, maskDistance);

        gl_FragColor = vec4(finalColor * mask, totalAlpha * mask);
      }
    `;

    // Compile Helper
    const createShader = (type: number, source: string) => {
      const shader = gl!.createShader(type);
      if (!shader) return null;
      gl!.shaderSource(shader, source);
      gl!.compileShader(shader);
      if (!gl!.getShaderParameter(shader, gl!.COMPILE_STATUS)) {
        gl!.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vertShader = createShader(gl.VERTEX_SHADER, vsSource);
    const fragShader = createShader(gl.FRAGMENT_SHADER, fsSource);
    if (!vertShader || !fragShader) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vertShader);
    gl.attachShader(program, fragShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      gl.deleteProgram(program);
      return;
    }

    gl.useProgram(program);

    // Buffers: Fullscreen Quad
    const posBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, posBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW
    );

    const posLoc = gl.getAttribLocation(program, 'a_position');
    gl.enableVertexAttribArray(posLoc);
    gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

    const texBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, texBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([0, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 1]),
      gl.STATIC_DRAW
    );

    const texLoc = gl.getAttribLocation(program, 'a_texcoord');
    gl.enableVertexAttribArray(texLoc);
    gl.vertexAttribPointer(texLoc, 2, gl.FLOAT, false, 0, 0);

    // Retrieve uniform locations
    glRefs.current = {
      gl,
      program,
      resolutionLoc: gl.getUniformLocation(program, 'u_resolution'),
      borderRadiusLoc: gl.getUniformLocation(program, 'u_borderRadius'),
      timeLoc: gl.getUniformLocation(program, 'u_time'),
      isActiveLoc: gl.getUniformLocation(program, 'u_isActive'),
      edgeIntensityLoc: gl.getUniformLocation(program, 'u_edgeIntensity'),
      rimIntensityLoc: gl.getUniformLocation(program, 'u_rimIntensity'),
      baseIntensityLoc: gl.getUniformLocation(program, 'u_baseIntensity'),
      edgeDistanceLoc: gl.getUniformLocation(program, 'u_edgeDistance'),
      rimDistanceLoc: gl.getUniformLocation(program, 'u_rimDistance'),
      baseDistanceLoc: gl.getUniformLocation(program, 'u_baseDistance'),
      cornerBoostLoc: gl.getUniformLocation(program, 'u_cornerBoost'),
      rippleEffectLoc: gl.getUniformLocation(program, 'u_rippleEffect'),
      tintOpacityLoc: gl.getUniformLocation(program, 'u_tintOpacity'),
    };

    // Set static liquid-glass-js parameters
    gl.uniform1f(glRefs.current.edgeIntensityLoc, 0.045);
    gl.uniform1f(glRefs.current.rimIntensityLoc, 0.12);
    gl.uniform1f(glRefs.current.baseIntensityLoc, 0.03);
    gl.uniform1f(glRefs.current.edgeDistanceLoc, 0.15);
    gl.uniform1f(glRefs.current.rimDistanceLoc, 0.45);
    gl.uniform1f(glRefs.current.baseDistanceLoc, 0.12);
    gl.uniform1f(glRefs.current.cornerBoostLoc, 0.06);
    gl.uniform1f(glRefs.current.rippleEffectLoc, 0.08);
    gl.uniform1f(glRefs.current.tintOpacityLoc, 0.35);

    // Resize Handler
    const updateDimensions = () => {
      if (!container || !canvas || !gl) return;
      const rect = container.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = Math.max(Math.floor(rect.width * dpr), 10);
      const height = Math.max(Math.floor(rect.height * dpr), 10);

      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
        gl.viewport(0, 0, width, height);
      }

      // Responsive border radius (24px desktop, 18px mobile scaled by dpr)
      const radius = (window.innerWidth < 640 ? 18 : 24) * dpr;
      gl.uniform2f(glRefs.current.resolutionLoc, width, height);
      gl.uniform1f(glRefs.current.borderRadiusLoc, radius);
    };

    updateDimensions();

    const resizeObserver = new ResizeObserver(() => {
      updateDimensions();
    });
    resizeObserver.observe(container);

    // Continuous Render Loop for Dynamic Glass Lighting
    let startTime = performance.now();

    const render = (time: number) => {
      if (!gl || !glRefs.current.program) return;

      const elapsed = (time - startTime) * 0.001;
      gl.uniform1f(glRefs.current.timeLoc, elapsed);

      gl.drawArrays(gl.TRIANGLES, 0, 6);

      animFrameRef.current = requestAnimationFrame(render);
    };

    animFrameRef.current = requestAnimationFrame(render);

    // Cleanup on Unmount
    return () => {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
      resizeObserver.disconnect();
      if (gl) {
        gl.deleteBuffer(posBuffer);
        gl.deleteBuffer(texBuffer);
        gl.deleteShader(vertShader);
        gl.deleteShader(fragShader);
        gl.deleteProgram(program);
      }
    };
  }, []);

  // Update dynamic state uniforms (isExpanded)
  useEffect(() => {
    const { gl, isActiveLoc } = glRefs.current;
    if (!gl) return;
    gl.uniform1f(isActiveLoc, isExpanded ? 1.0 : 0.0);
  }, [isExpanded]);

  return (
    <div
      ref={(el) => {
        containerRef.current = el;
        if (innerRef) innerRef(el);
      }}
      onClick={onClick}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      data-service-index={index}
      data-expanded={isExpanded ? 'true' : 'false'}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      }}
      className={`group relative w-full cursor-pointer select-none overflow-hidden rounded-2xl md:rounded-3xl transition-all duration-500 ease-out min-h-[85px] sm:min-h-[96px] md:min-h-[106px] lg:min-h-[118px] flex items-center ${
        isExpanded
          ? 'border border-brand/50 bg-[#0d0d11]/80 shadow-[0_0_35px_rgba(229,9,20,0.22),0_20px_45px_rgba(0,0,0,0.7)]'
          : 'border border-white/10 hover:border-white/20 bg-[#0a0a0e]/65 hover:bg-[#0c0c10]/75 shadow-[0_12px_32px_rgba(0,0,0,0.45)]'
      }`}
      style={{
        backdropFilter: 'blur(24px) saturate(140%)',
        WebkitBackdropFilter: 'blur(24px) saturate(140%)',
      }}
    >
      {/* WebGL Refractive Liquid Glass Canvas */}
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full rounded-2xl md:rounded-3xl"
        style={{ zIndex: 0 }}
      />

      {/* Top Specular Glass Reflection Edge (Physical Refraction Glint - subtle, uniform, no white glare) */}
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-x-0 top-0 h-[1px] transition-all duration-500 ${
          isExpanded
            ? 'bg-gradient-to-r from-transparent via-brand/70 to-transparent'
            : 'bg-gradient-to-r from-transparent via-white/20 to-transparent'
        }`}
        style={{ zIndex: 1 }}
      />

      {/* Subtle Inner Glass Ambient Rim */}
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-0 rounded-2xl md:rounded-3xl transition-all duration-500 ${
          isExpanded
            ? 'ring-1 ring-inset ring-brand/30 shadow-[inset_0_1px_1px_rgba(255,255,255,0.12),inset_0_-1px_1px_rgba(229,9,20,0.2)]'
            : 'ring-1 ring-inset ring-white/[0.06] shadow-[inset_0_1px_1px_rgba(255,255,255,0.08)]'
        }`}
        style={{ zIndex: 1 }}
      />

      {/* Foreground Content (Title, Index, Badge, Arrow) */}
      <div
        className="relative z-10 w-full max-w-[1600px] mx-auto px-6 sm:px-8 md:px-12 py-6 sm:py-7 md:py-8 lg:py-9 flex items-center justify-between"
      >
        <div className="flex items-center gap-3 sm:gap-4 md:gap-6">
          {/* Service Index Number */}
          <span
            className={`font-mono text-xs sm:text-sm font-semibold tracking-widest transition-colors duration-300 ${
              isExpanded ? 'text-brand' : 'text-text-muted group-hover:text-text-secondary'
            }`}
          >
            0{index + 1} //
          </span>

          {/* Service Title */}
          <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-heading font-bold text-white tracking-tight transition-transform duration-300 group-hover:translate-x-1">
            {title}
          </h3>
        </div>

        {/* State Indicators */}
        <div className="flex items-center gap-2.5 sm:gap-4">
          {/* Glass Status Pill */}
          <div
            className={`transition-all duration-300 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full border text-[11px] sm:text-xs uppercase font-mono tracking-wider flex items-center gap-2 ${
              isExpanded
                ? 'border-brand/40 bg-brand/10 text-brand shadow-[0_0_12px_rgba(229,9,20,0.3)]'
                : 'border-white/10 bg-white/[0.03] text-white/60 group-hover:text-white/80 group-hover:border-white/20'
            }`}
          >
            <span
              className={`w-1.5 h-1.5 rounded-full transition-colors duration-300 ${
                isExpanded ? 'bg-brand animate-pulse' : 'bg-white/40 group-hover:bg-white/60'
              }`}
            />
            <span className="hidden sm:inline">
              {isExpanded ? 'Active' : 'Click to View'}
            </span>
            <span className="sm:hidden">{isExpanded ? 'Open' : 'View'}</span>
          </div>

          {/* Glass Refractive Arrow Toggle */}
          <div
            className={`flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-full border transition-all duration-300 ${
              isExpanded
                ? 'border-brand/50 bg-brand/20 text-brand shadow-[0_0_15px_rgba(229,9,20,0.35)]'
                : 'border-white/10 bg-white/[0.04] text-white/70 group-hover:text-white group-hover:border-white/20'
            }`}
          >
            <span
              className="text-base sm:text-lg font-bold inline-block transition-transform duration-300"
              style={{
                transform: isExpanded ? 'rotate(90deg)' : 'rotate(0deg)',
              }}
            >
              ↳
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
