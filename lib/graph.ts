import type { Post } from "contentlayer/generated";

export interface GraphNode {
  id: string; // slug for posts, tag name for tags, category name for categories
  name: string; // title for posts, tag name for tags, category name for categories
  type: "post" | "tag" | "category";
  val: number; // size
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
  const tagCountMap: { [key: string]: number } = {};
  const categoryCountMap: { [key: string]: number } = {};

  posts.forEach(post => {
    // Count tags
    if (post.tags) {
      post.tags.forEach(tag => {
        tagCountMap[tag] = (tagCountMap[tag] || 0) + 1;
      });
    }
    // Count categories
    if (post.category) {
      categoryCountMap[post.category] = (categoryCountMap[post.category] || 0) + 1;
    }
  });

  const sharedTags = new Set<string>();
  for (const tag in tagCountMap) {
    if (tagCountMap[tag] > 1) {
      sharedTags.add(tag);
    }
  }

  const postNodes: GraphNode[] = posts.map((post) => ({
    id: post.slugAsParams,
    name: post.title,
    type: "post",
    val: 2.5,
  }));
  
  const tagNodes: GraphNode[] = Array.from(sharedTags).map(tag => ({
    id: tag,
    name: `#${tag}`,
    type: "tag",
    val: 1 + (tagCountMap[tag] * 0.25)
  }));
  
  const categoryNodes: GraphNode[] = Object.keys(categoryCountMap).map(category => ({
    id: category,
    name: category,
    type: "category",
    val: 2 + (categoryCountMap[category] * 0.5) // Categories are more important, so bigger base size
  }));

  const links: GraphLink[] = [];
  posts.forEach((post) => {
    // Links to tags
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
    // Link to category
    if (post.category) {
      links.push({
        source: post.slugAsParams,
        target: post.category,
      });
    }
  });

  const finalNodes = [...postNodes, ...tagNodes, ...categoryNodes];

  return { nodes: finalNodes, links };
}; 