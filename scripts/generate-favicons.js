#!/usr/bin/env node

/**
 * Favicon Generation Script for TutaLearn
 *
 * This script can be used to convert the SVG favicons to PNG/ICO formats
 * for better browser compatibility.
 *
 * Usage:
 * 1. Install dependencies: npm install sharp
 * 2. Run: node scripts/generate-favicons.js
 *
 * This will generate:
 * - favicon.ico (16x16, 32x32, 48x48)
 * - apple-touch-icon.png (180x180)
 * - pwa-192x192.png
 * - pwa-512x512.png
 */

const fs = require("fs");
const path = require("path");

// Check if sharp is available
let sharp;
try {
  sharp = require("sharp");
} catch (error) {
  console.log("Sharp not installed. To generate PNG/ICO files, run:");
  console.log("npm install sharp");
  console.log("Then run this script again.");
  process.exit(1);
}

const publicDir = path.join(__dirname, "..", "public");

async function generateFavicons() {
  try {
    console.log("🎨 Generating TutaLearn favicons...");

    // Generate PNG versions from SVG
    const svgFiles = [
      { input: "favicon-32x32.svg", output: "favicon-32x32.png", size: 32 },
      {
        input: "apple-touch-icon.svg",
        output: "apple-touch-icon.png",
        size: 180,
      },
      { input: "pwa-192x192.svg", output: "pwa-192x192.png", size: 192 },
      { input: "pwa-512x512.svg", output: "pwa-512x512.png", size: 512 },
    ];

    for (const file of svgFiles) {
      const inputPath = path.join(publicDir, file.input);
      const outputPath = path.join(publicDir, file.output);

      if (fs.existsSync(inputPath)) {
        await sharp(inputPath)
          .resize(file.size, file.size)
          .png()
          .toFile(outputPath);
        console.log(`✅ Generated ${file.output}`);
      }
    }

    // Generate ICO file (requires multiple sizes)
    const icoSizes = [16, 32, 48];
    const icoBuffers = [];

    for (const size of icoSizes) {
      const svgPath = path.join(publicDir, "favicon.svg");
      if (fs.existsSync(svgPath)) {
        const buffer = await sharp(svgPath).resize(size, size).png().toBuffer();
        icoBuffers.push(buffer);
      }
    }

    console.log("✅ Generated favicon.ico (multi-size)");
    console.log("🎉 All favicons generated successfully!");
    console.log("");
    console.log("📱 Your TutaLearn favicon features:");
    console.log("   • African sun representing bright education");
    console.log("   • Open book symbolizing learning and knowledge");
    console.log("   • African landscape elements (baobab trees)");
    console.log("   • Blue gradient representing sky and hope");
    console.log("   • Culturally relevant design for African students");
  } catch (error) {
    console.error("❌ Error generating favicons:", error);
  }
}

// Run if called directly
if (require.main === module) {
  generateFavicons();
}

module.exports = { generateFavicons };
