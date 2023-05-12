import type { FeedEntry } from "https://deno.land/x/rss@0.5.8/src/types/feed.ts";
import { dateFormatter } from "./formatter.ts";

export const linkedTemplate = (entry: FeedEntry) =>
  `- [${entry.title?.value}](${entry.attachments![0].url})
  <sub><sup>– [${dateFormatter.format(entry.published!)}](${
    entry.links[0].href
  })</sup></sub>`;

export const postTemplate = (entry: FeedEntry) =>
  `- [${entry.title?.value}](${entry.links[0].href})
  <sub><sup>– ${dateFormatter.format(entry.published!)}</sup></sub>`;
