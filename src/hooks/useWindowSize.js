import { useState, useEffect } from 'react';

export default function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    // Pencere yeniden boyutlandırıldığında state'i güncelleyen fonksiyon
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    // Event listener'ı ekle
    window.addEventListener('resize', handleResize);

    // Component unmount edildiğinde (kaldırıldığında) event listener'ı temizle
    // Bu, memory leak (bellek sızıntısı) olmasını önler.
    return () => window.removeEventListener('resize', handleResize);
  }, []); // Boş dependency array, bu effect'in sadece mount/unmount'ta çalışmasını sağlar

  return windowSize;
}