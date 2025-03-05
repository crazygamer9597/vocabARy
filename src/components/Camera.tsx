import React, { useRef, useEffect } from 'react';
import * as tf from '@tensorflow/tfjs';
import * as cocoSsd from '@tensorflow-models/coco-ssd';
import { Camera, AlertCircle } from 'lucide-react';

interface CameraProps {
  onDetections: (detections: any[]) => void;
}

export function CameraComponent({ onDetections }: CameraProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [permissionDenied, setPermissionDenied] = React.useState(false);

  const initCamera = async () => {
    if (!videoRef.current) return;

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' }
      });
      
      videoRef.current.srcObject = stream;
      await tf.ready();
      const model = await cocoSsd.load();
      setIsLoading(false);
      setPermissionDenied(false);
      
      const detectFrame = async () => {
        if (!videoRef.current || !model) return;
        
        const predictions = await model.detect(videoRef.current);
        onDetections(predictions);
        requestAnimationFrame(detectFrame);
      };
      
      detectFrame();
    } catch (error: any) {
      console.error('Error initializing camera:', error);
      if (error.name === 'NotAllowedError') {
        setPermissionDenied(true);
      }
      setIsLoading(false);
    }
  };

  useEffect(() => {
    initCamera();

    return () => {
      if (videoRef.current?.srcObject) {
        const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
        tracks.forEach(track => track.stop());
      }
    };
  }, [onDetections]);

  if (permissionDenied) {
    return (
      <div className="relative w-full h-full bg-gray-900 flex items-center justify-center">
        <div className="text-white text-center px-4">
          <AlertCircle className="w-16 h-16 mb-4 mx-auto text-red-500" />
          <h2 className="text-2xl font-bold mb-2">Camera Access Required</h2>
          <p className="text-gray-300 mb-4">
            Please allow camera access to use the AR features.
            You can enable it in your browser settings.
          </p>
          <button
            onClick={initCamera}
            className="px-6 py-3 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full font-semibold hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-300"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="text-white text-center">
            <Camera className="w-12 h-12 mb-2 mx-auto animate-pulse" />
            <p>Initializing camera and AI model...</p>
          </div>
        </div>
      )}
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        className="w-full h-full object-cover"
      />
    </div>
  );
}