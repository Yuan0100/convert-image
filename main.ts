import convertImage from "src/convertImage"
// import parseMarkdown from "src/parseMarkdown"
import { join, parse } from "path"
import fs from "fs"

const main = async function () {
//   const file = await parseMarkdown(`---
// title: test
// ---
// # Hello!
// `
//   )

  const obsidian_assets_folder = process.argv[2]
  const embed_link = process.argv[3]
  const outputFolder = process.argv[4]

  if (!obsidian_assets_folder || !embed_link || !outputFolder) return
  
  if (!fs.existsSync(join(process.cwd(), 'public', outputFolder))) {
    fs.mkdirSync(join(process.cwd(), 'public', outputFolder), { recursive: true });
  } 

  await convertImage(
    join(process.cwd(), 'src', obsidian_assets_folder, embed_link),
    parse(embed_link).name,
    join(process.cwd(), 'public', outputFolder)
  )

}

// ===
// ===

main()
