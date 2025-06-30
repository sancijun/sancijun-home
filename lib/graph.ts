import type { Post } from "contentlayer/generated";

export interface GraphNode {
  id: string; // slug for posts, tag name for tags
  name: string; // title for posts, tag name for tags
  type: "post" | "tag";
  val: number; // size
  category?: string; // only for posts
}

export interface GraphLink {
  source: string;
  target: string;
}

interface GraphData {
  nodes: GraphNode[];
  links: GraphLink[];
}

export const generateGraphData = (posts: Post[]): GraphData => {
  // Step 1: Count tag occurrences to find tags used more than once
  const tagCountMap: { [key: string]: number } = {};
  posts.forEach(post => {
    if (post.tags) {
      post.tags.forEach(tag => {
        tagCountMap[tag] = (tagCountMap[tag] || 0) + 1;
      });
    }
  });

  const sharedTags = new Set<string>();
  for (const tag in tagCountMap) {
    if (tagCountMap[tag] > 1) {
      sharedTags.add(tag);
    }
  }

  // Step 2: Create nodes for all posts
  const postNodes: GraphNode[] = posts.map((post) => ({
    id: post.slugAsParams,
    name: post.title,
    type: "post",
    val: 2.5, // Base size for post nodes
    category: post.category,
  }));
  
  // Step 3: Create nodes for shared tags only
  const tagNodes: GraphNode[] = Array.from(sharedTags).map(tag => ({
    id: tag,
    name: `#${tag}`,
    type: "tag",
    // Make popular tags bigger. Base size 1 + 0.25 per connection.
    val: 1 + (tagCountMap[tag] * 0.25)
  }));

  // Step 4: Create links between posts and their shared tags
  const links: GraphLink[] = [];
  posts.forEach((post) => {
    if (post.tags) {
      post.tags.forEach((tag) => {
        if (sharedTags.has(tag)) {
          links.push({
            source: post.slugAsParams,
            target: tag,
          });
        }
      });
    }
  });

  const finalNodes = [...postNodes, ...tagNodes];

  return { nodes: finalNodes, links };
}; 