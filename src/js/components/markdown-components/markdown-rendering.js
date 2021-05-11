import { IconButton, Paper } from "@material-ui/core";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";

import { markDown } from "./markdown-sample";

import "../../../css/markdown-styles.scss";
import "../../../css/blog.scss";
import { FileCopy } from "@material-ui/icons";

export function CopyButton({ data }) {
  const copy = () => {
    navigator.clipboard.writeText(data);
  };
  return (
    <IconButton className={"copy-btn"} onClick={copy}>
      <FileCopy />
    </IconButton>
  );
}

export function MarkdownContent({ children, ...rest }) {
  const components = {
    code({ node, inline, className, children, ...props }) {
      const match = /language-(\w+)/.exec(className || "");
      return !inline && match ? (
        <div style={{ position: "relative" }}>
          <CopyButton data={children} />
          <SyntaxHighlighter language={match[1]} PreTag="div" {...props}>
            {String(children).replace(/\n$/, "")}
          </SyntaxHighlighter>
        </div>
      ) : (
        <code className={className} {...props} />
      );
    },
  };
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeRaw]}
      className="markdown"
      components={components}
      {...rest}
    >
      {children}
    </ReactMarkdown>
  );
}

export function MarkdownSample() {
  return (
    <Paper className="post sample">
      <MarkdownContent>{markDown}</MarkdownContent>
    </Paper>
  );
}
