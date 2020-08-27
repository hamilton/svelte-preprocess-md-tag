import unified from "unified";
import parse from "remark-parse";
import remarkRehype from "remark-rehype";
import html from "rehype-stringify";

export default function mdMustache(args = {}) {
  const transform = unified().use(parse).use(remarkRehype).use(html);
  const DEFAULTS = { start: "{#md}", end: "{/md}" };
  const { start, end } = { ...DEFAULTS, args };
  return {
    async markup({ content }) {
      let re = new RegExp(`(^\`)*${start}([^]*?)${end}(^\`)*`, "gs");

      const next = content.replace(re, (match) => {
        // remove start
        if (match.slice(0, start.length) === start) {
          match = match.slice(start.length);
        }
        // remove end
        if (match.slice(-end.length) === end) {
          match = match.slice(0, -end.length);
        }
        // remove any # in {#md}
        // get shallowest indentation level;
        const startSequenceInBlock = new RegExp(start, "g");
        match = match.replace(startSequenceInBlock, `{'${start}'}`);
        let parsed = match.split("\n");
        let indentation = Math.min(
          ...parsed.map((line) => {
            let smaller = line.trimLeft();
            if (line.length === 0) return Infinity;
            if (line.trim().length === 0) return Infinity;
            return line.length - smaller.length;
          })
        );
        // remove shallow indentation level
        parsed = parsed
          .map((line) => {
            return line.slice(indentation);
          })
          .join("\n");

        // markdown time, baby
        const out = transform.processSync(parsed).toString();
        return out;
      });
      return { code: next };
    },
  };
}
