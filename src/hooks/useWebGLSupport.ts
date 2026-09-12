import { useState, useEffect } from 'react';

export function useWebGLSupport(): { hasWebGL: boolean; isChecking: boolean } {
  const [hasWebGL, setHasWebGL] = useState<boolean>(true);
  const [isChecking, setIsChecking] = useState<boolean>(true);

  useEffect(() => {
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl2') || canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      setHasWebGL(Boolean(gl));
    } catch {
      setHasWebGL(false);
    } finally {
      setIsChecking(false);
    }
  }, []);

  return { hasWebGL, isChecking };
}
