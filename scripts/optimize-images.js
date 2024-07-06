const fs = require("fs");
const path = require("path");
const sharp = require("sharp");
const heic = require("heic-convert");
const readline = require("readline");
const { promisify } = require("util");

// Customizable constants
const INPUT_DIR = path.join(__dirname, "..", "temp");
const OUTPUT_DIR = path.join(__dirname, "..", "public", "art");
const ARTWORKS_JSON = path.join(__dirname, "..", "model", "artworks.json");
const MAX_FILE_SIZE_KB = 500;
const MAX_IMAGE_DIMENSION = 2000;
const INITIAL_QUALITY = 80;
const QUALITY_DECREMENT = 5;
const MIN_QUALITY = 10;

const readdir = promisify(fs.readdir);
const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);
const unlink = promisify(fs.unlink);
const rename = promisify(fs.rename);

// Go through all the files in temp folder and optimize then export to /public/art
async function optimizeImages() {
  try {
    const files = await readdir(INPUT_DIR);

    for (const file of files) {
      const filePath = path.join(INPUT_DIR, file);
      const fileExt = path.extname(file).toLowerCase();

      if (fileExt === ".heic") {
        // Convert HEIC to JPEG
        const inputBuffer = await readFile(filePath);
        const jpegBuffer = await heic({ buffer: inputBuffer, format: "JPEG" });
        const jpegPath = path.join(
          OUTPUT_DIR,
          `${path.basename(file, ".HEIC")}.jpg`
        );

        await writeFile(jpegPath, jpegBuffer);
        console.log(`Converted ${file} to JPEG`);

        // Optimize the converted JPEG
        await optimizeImage(jpegPath, jpegPath);
      } else if ([".jpg", ".jpeg", ".png"].includes(fileExt)) {
        // Optimize existing JPEG or PNG
        const outputPath = path.join(OUTPUT_DIR, path.basename(filePath));
        await optimizeImage(filePath, outputPath);
      }
    }

    console.log("Image optimization complete");
    await updateArtworksJson();
  } catch (error) {
    console.error("Error during image optimization:", error);
  }
}

// Goes through the given file and optimize it until file size is 500 kb or less
async function optimizeImage(inputPath, outputPath) {
  const tempOutputPath = `${outputPath}.temp`;
  let quality = INITIAL_QUALITY;

  try {
    while (true) {
      await sharp(inputPath)
        .resize(MAX_IMAGE_DIMENSION, MAX_IMAGE_DIMENSION, {
          fit: "inside",
          withoutEnlargement: true,
        })
        .jpeg({ quality })
        .toFile(tempOutputPath);

      const stats = await fs.promises.stat(tempOutputPath);
      const fileSizeInKb = stats.size / 1024;

      if (fileSizeInKb <= MAX_FILE_SIZE_KB || quality <= MIN_QUALITY) {
        console.log(
          `Optimized ${path.basename(inputPath)} to ${fileSizeInKb.toFixed(
            2
          )}KB`
        );

        // Replace the original file with the optimized version
        if (fs.existsSync(outputPath)) {
          await unlink(outputPath);
        }
        console.log(
          `Renaming ${path.basename(tempOutputPath)} to ${path.basename(
            outputPath
          )}`
        );
        await rename(tempOutputPath, outputPath);

        console.log(`Finished with ${path.basename(inputPath)}\n`);
        break;
      }

      quality -= QUALITY_DECREMENT;
      await unlink(tempOutputPath); // Delete the temp file if we need to try again
    }
  } catch (error) {
    console.error(`Error optimizing ${inputPath}:`, error);
    // Clean up the temp file if it exists
    if (fs.existsSync(tempOutputPath)) {
      await unlink(tempOutputPath);
    }
  }
}

function prompt(rl, question) {
  return new Promise((resolve) => {
    rl.question(question, resolve);
  });
}

// Go to the artworks.json and add each of the newly optimized files
// from temp folder into the correct category with custom names
async function updateArtworksJson() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  try {
    const artworksData = JSON.parse(await readFile(ARTWORKS_JSON, "utf8"));
    const combinedArtworks = [
      ...Object.values(artworksData[0]),
      ...Object.values(artworksData[1]),
      ...Object.values(artworksData[2]),
      ...Object.values(artworksData[3]),
      ...Object.values(artworksData[4]),
    ];
    const categoryMap = {
      "digital": 0,
      "painting": 1,
      "pixel": 2,
      "drawing": 3,
      "generative": 4
    }

    // Ensure the JSON has the correct structure
    if (!Array.isArray(artworksData) || artworksData.length === 0) {
      artworksData = [
        { digital: [], painting: [], pixel: [], drawing: [], generative: [] },
      ];
    }

    const allFiles = await readdir(OUTPUT_DIR);

    const imageFiles = allFiles.filter((file) => {
      const ext = path.extname(file).toLowerCase();
      return [".jpeg", ".jpg", ".png"].includes(ext);
    });

    for (const file of imageFiles) {
      const defaultName = path.basename(file, path.extname(file));
      // Check if already in the JSON file
      if (
        !Object.values(combinedArtworks)
          .flat()
          .some((artwork) => artwork.link && artwork.link.endsWith(file))
      ) {
        console.log(`\nProcessing new artwork: ${file}`);

        const name = await prompt(
          rl,
          `Enter name for the artwork (default: ${defaultName}): `
        );
        const category = await prompt(
          rl,
          "Enter category (digital, painting, pixel, drawing, generative) [default: drawing]: "
        );

        const artworkName = name.trim() || defaultName;
        const artworkCategory = [
          "digital",
          "painting",
          "pixel",
          "drawing",
          "generative",
        ].includes(category.trim().toLowerCase())
          ? category.trim().toLowerCase()
          : "drawing";

        // Move the file to the appropriate category folder
        const sourceFilePath = path.join(OUTPUT_DIR, file);
        const categoryDir = path.join(OUTPUT_DIR, artworkCategory);
        const destinationFilePath = path.join(categoryDir, file);

        try {
          // Move the file
          await rename(sourceFilePath, destinationFilePath);
          console.log(`Moved ${file} to ${artworkCategory} folder`);
        } catch (moveError) {
          console.error(
            `Error moving file ${file} to ${artworkCategory} folder:`,
            moveError
          );
        }

        const newArtwork = {
          name: artworkName,
          description: "",
          link: `/art/${artworkCategory}/${file}`,
          descriptionLink: "",
        };

        // add the newArtwork to the category in the JSON
        artworksData[categoryMap[artworkCategory]][artworkCategory].push(newArtwork);

        console.log(`Added: ${artworkName} (${artworkCategory})`);
      }
    }

    await writeFile(ARTWORKS_JSON, JSON.stringify(artworksData, null, 2));
    console.log("\nartworks.json updated");
  } catch (error) {
    console.error("Error updating artworks.json:", error);
  } finally {
    rl.close();
  }
}

optimizeImages();
