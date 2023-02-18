import {unified} from 'unified'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import rehypeSanitize from 'rehype-sanitize'
import rehypeStringify from 'rehype-stringify'
import remarkFrontmatter from 'remark-frontmatter'
import remarkParseFrontmatter from 'remark-parse-frontmatter'

async function parseMarkdown(
  content: string
) {
  // const frontmatter = await unified()
  //   .use(remarkParse)
  //   .use(remarkFrontmatter, ['yaml'])
  //   .use(remarkRehype)
  //   // .use(rehypeSanitize)
  //   .use(rehypeStringify)
  //   .process(content)

  const file = await unified()
    .use(remarkParse)
    .use(remarkFrontmatter, ['yaml'])
    .use(remarkParseFrontmatter)
    .use(remarkRehype)
    .use(rehypeSanitize)
    .use(rehypeStringify)
    .process(content)
    
  // console.log(String(file))
  return file
}

export default parseMarkdown;