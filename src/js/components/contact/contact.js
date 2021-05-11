import {ContactForm} from "../forms/forms";
import { MarkdownContent } from "../markdown-components/markdown-rendering";

export default function Contact({ ...rest }) {
  const info = require("./data/contact-info.json");

  return (
    <div className="contact-root">
      <MarkdownContent>{info.intro}</MarkdownContent>
      <ContactForm />
    </div>
  );
}
