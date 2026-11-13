"use client";

import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const slides = [
  {
    image:
      "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?q=80&w=1600&auto=format&fit=crop",
    title: "Your neighborhood library, open day and night",
    text: "Browse the shelves from your sofa. Borrow a book in two clicks and pick your next great read tonight.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1524578271613-d550eacf6090?q=80&w=1600&auto=format&fit=crop",
    title: "Share the books you love",
    text: "Finished a book? Add it to BookNook so a neighbor can discover it next. Good books deserve a second reader.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=1600&auto=format&fit=crop",
    title: "Borrow, read, return — that simple",
    text: "Every book is yours for 14 days. No fines, no fuss — just return it when you are done so the shelf stays full.",
  },
];

export default function HeroSlider() {
  return (
    <section aria-label="Featured" className="overflow-hidden rounded-3xl">
      <Swiper
        modules={[Autoplay, Navigation, Pagination]}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        navigation
        loop
        className="h-[420px] sm:h-[480px]"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.title}>
            <div className="relative h-full w-full">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={slide.image}
                alt=""
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-forest-950/85 via-forest-950/55 to-transparent" />
              <div className="relative flex h-full max-w-xl flex-col justify-center gap-4 px-6 sm:px-12">
                <h1 className="font-display text-3xl leading-tight font-bold text-white sm:text-5xl">
                  {slide.title}
                </h1>
                <p className="text-sm leading-relaxed text-cream-100/90 sm:text-base">
                  {slide.text}
                </p>
                <div>
                  <Link
                    href="/books"
                    className="inline-block rounded-full bg-amber-500 px-6 py-3 text-sm font-semibold text-forest-950 transition hover:bg-amber-400"
                  >
                    Browse Books
                  </Link>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
