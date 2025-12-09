import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// lib/utils.js

// 6-digit numeric OTP as a string
export function generateOTP(length = 6) {
  const digits = "0123456789";
  let out = "";
  for (let i = 0; i < length; i++) {
    out += digits[Math.floor(Math.random() * 10)];
  }
  return out;
}

