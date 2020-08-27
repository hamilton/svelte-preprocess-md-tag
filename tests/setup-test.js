import fs from "fs";
import preprocess from "../preprocess-mdtag";

export function setupTest(dirname) {
  const transform = preprocess().markup;

  const before = fs.readFileSync(dirname + "/before.svelte").toString();
  const after = fs.readFileSync(dirname + "/after.svelte").toString();

  // basic test

  it("before = after", async () => {
    return transform({ content: before }).then((t) => {
      expect(t.code).toEqual(after);
    });
  });
  return { before, after, transform };
}
