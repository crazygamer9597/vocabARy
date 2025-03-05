import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { Language } from '../types/languages';

interface Detection {
  bbox: [number, number, number, number];
  class: string;
  score: number;
}

interface ARViewProps {
  detections: Detection[];
  selectedLanguage: Language;
}

export function ARView({ detections, selectedLanguage }: ARViewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene>();
  const cameraRef = useRef<THREE.PerspectiveCamera>();
  const rendererRef = useRef<THREE.WebGLRenderer>();

  useEffect(() => {
    if (!containerRef.current) return;

    // Initialize Three.js scene
    sceneRef.current = new THREE.Scene();
    cameraRef.current = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    rendererRef.current = new THREE.WebGLRenderer({ alpha: true });
    rendererRef.current.setSize(window.innerWidth, window.innerHeight);
    containerRef.current.appendChild(rendererRef.current.domElement);

    // Position camera
    cameraRef.current.position.z = 5;

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      if (rendererRef.current && sceneRef.current && cameraRef.current) {
        rendererRef.current.render(sceneRef.current, cameraRef.current);
      }
    };
    animate();

    // Cleanup
    return () => {
      if (rendererRef.current && containerRef.current) {
        containerRef.current.removeChild(rendererRef.current.domElement);
      }
    };
  }, []);

  useEffect(() => {
    if (!sceneRef.current) return;

    // Clear existing labels
    while (sceneRef.current.children.length > 0) {
      sceneRef.current.remove(sceneRef.current.children[0]);
    }

    // Add new labels for each detection
    detections.forEach((detection) => {
      const [x, y, width, height] = detection.bbox;
      
      // Create text sprite
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      if (!context) return;

      context.font = '48px Arial';
      context.fillStyle = 'white';
      context.fillText(detection.class, 0, 48);

      const texture = new THREE.CanvasTexture(canvas);
      const material = new THREE.SpriteMaterial({ map: texture });
      const sprite = new THREE.Sprite(material);

      // Position sprite relative to detection bbox
      sprite.position.set(
        (x / window.innerWidth) * 2 - 1,
        -(y / window.innerHeight) * 2 + 1,
        0
      );
      sceneRef.current?.add(sprite);
    });
  }, [detections, selectedLanguage]);

  return <div ref={containerRef} className="fixed inset-0" />;
}