import parseMarkdown from "src/parseMarkdown"


parseMarkdown(`---
title: test
---
# Hello!
`
  ).then((value) => {
    console.log(value);
    
  })

