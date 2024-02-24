import { parseFeed } from "https://deno.land/x/rss@1.0.0/mod.ts";
import { partition } from "https://deno.land/std@0.217.0/collections/partition.ts";
import { linkedTemplate, postTemplate } from "./template.ts";

const response = await fetch("https://appjeniksaan.nl/feed.xml");

const xml = await response.text();
const feed = await parseFeed(xml);

const [linked, posts] = partition(
  feed.entries,
  ({ attachments }) => !!attachments,
);

const linkedContent = linked.slice(0, 3).map(linkedTemplate).join("\n");
const postsContent = posts.slice(0, 3).map(postTemplate).join("\n");

const template = await Deno.readTextFile("./template.md");

await Deno.writeTextFile(
  "./README.md",
  template.replace("<posts>", postsContent).replace("<linked>", linkedContent),
);
