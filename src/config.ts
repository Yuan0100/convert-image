import sharp, { AvailableFormatInfo } from "sharp";

// Configuration object with image size, scale, and format options
const config: Config = {
  sizes: [1280], // array of image widths to resize to
  scales: [1, 0.5, 0.25], // array of scales to resize the image by
  formats: [
    sharp.format.png,
    sharp.format.jpeg,
    sharp.format.webp
  ] // array of image formats to save the resized images as
};

type Config = {
  sizes: number[]
  scales: number[]
  formats: AvailableFormatInfo[]
}

export default config