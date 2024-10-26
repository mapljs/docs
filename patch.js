// I'm deeply sorry for doing this
// Will remove this as soon as UnDocs does not require Nuxt UI Pro
const file = "./node_modules/@nuxt/ui-pro/modules/pro/license.ts";
const content = await Bun.file(file).text();

const startFnName = content.indexOf("function validateLicense");

const startFn = content.indexOf("{", content.indexOf(")", startFnName)) + 1;
let cnt = 1,
  endFn = startFn;
while (cnt > 0) {
  if (content[endFn] == "}") cnt--;
  else if (content[endFn] === "{") cnt++;
  endFn++;
  if (cnt == 0) break;
}

Bun.write(
  file,
  content.substring(0, startFnName) +
    "function validateLicense(){}" +
    content.slice(endFn),
);
