import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface CarouselProps<T> {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
  itemsPerSlide?: number;
}

const Carousel = <T,>({
  items = [], // Provide default empty array
  renderItem,
  itemsPerSlide = 3,
}: CarouselProps<T>) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Guard clause for empty items
  if (!items?.length) {
    return <div className="text-center p-4">No items to display</div>;
  }

  const totalSlides = Math.ceil(items.length / itemsPerSlide);
  const canGoNext = currentIndex < totalSlides - 1;
  const canGoPrev = currentIndex > 0;

  const nextSlide = () => {
    if (canGoNext) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const prevSlide = () => {
    if (canGoPrev) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  return (
    <div className="relative w-full">
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-300 ease-in-out"
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
          }}
        >
          {items.map((item, idx) => (
            <div
              key={idx}
              className="w-full flex-shrink-0"
              style={{ flex: `0 0 ${100 / itemsPerSlide}%` }}
            >
              {renderItem(item)}
            </div>
          ))}
        </div>
      </div>

      {canGoPrev && (
        <button
          onClick={prevSlide}
          className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-lg hover:bg-white transition-colors"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
      )}

      {canGoNext && (
        <button
          onClick={nextSlide}
          className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-lg hover:bg-white transition-colors"
          aria-label="Next slide"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      )}
    </div>
  );
};

export default Carousel;
