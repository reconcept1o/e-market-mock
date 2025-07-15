import { useEffect } from "react";

// Bu hook, ref ile belirtilen elementin dışına tıklandığında bir handler fonksiyonu çalıştırır.
function useOnClickOutside(ref, handler) {
  useEffect(() => {
    const listener = (event) => {
      // Eğer ref'in gösterdiği element yoksa veya tıklanan yer o elementin içindeyse, bir şey yapma
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }
      // Dışına tıklandıysa, handler'ı çalıştır
      handler(event);
    };

    // Event listener'ları ekle
    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);

    // Component kaldırıldığında listener'ları temizle (performans ve bellek sızıntısı için önemli)
    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, handler]); // Sadece ref veya handler değiştiğinde bu effect'i tekrar çalıştır
}

export default useOnClickOutside;
