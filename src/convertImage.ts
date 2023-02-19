import fs from "fs";
import path from "path";
import sharp from "sharp";
import config from "./config";

const convertImage = async (
  inputFile: string,
  fileName: string,
  outputFolder: string
) => {
  fs.readFile(inputFile, (err, imgFile) => {
    if (err) {
        // Log the error and return
        console.error(err);
        return;
    }

    // Check if the output folder exists, if not create it
    if (!fs.existsSync(outputFolder)) {
      fs.mkdirSync(outputFolder);
    } else {
      // If the output folder exists, remove it and recreate it
      fs.rmSync(outputFolder, { recursive: true });
      fs.mkdirSync(outputFolder);
    }

    // Use the sharp module to get metadata from the input file
    sharp(inputFile)
      .metadata()
      .then(metadata => {
        // Store the original width of the image
        const originalWidth = metadata.width || 600;

        // Iterate through each format in the config
        config.formats.forEach(format => {
          // Iterate through each size in the config
          config.sizes.forEach(size => {
            // Build the output file path
            const outputFile = path.join(
              outputFolder,
              `${fileName}-${size}.${format.id}`
            );

            // Use the sharp module to resize the image and save it to the output file path
            sharp(inputFile)
              .resize({ width: size })
              .toFormat(format)
              .toFile(outputFile, (error, info) => {
                  if (error) {
                      // Log the error
                      console.error(error);
                  } else {
                      // Log success message
                      console.log(
                          `Successfully converted ${inputFile} to ${outputFile} in ${format.id} format`
                      );
                  }
              });
          })

          // Iterate through each scale in the config
          config.scales.forEach(scale => {
            // Build the output file path
            const outputFile = path.join(
              outputFolder,
              `${fileName}-${scale}x.${format.id}`
            );

            // Use the sharp module to resize the image and save it to the output file path
            sharp(inputFile)
              .resize({ width: Math.round(originalWidth * scale) })
              .toFormat(format)
              .toFile(outputFile, (error, info) => {
                  if (error) {
                      console.error(error);
                  } else {
                      console.log(
                          `Successfully converted ${inputFile} to ${outputFile} in ${format.id} format`
                      );
                  }
              });
          })
        })
      })
      .catch(error => {
        console.error(error);
      });
  })
}

export default convertImage;