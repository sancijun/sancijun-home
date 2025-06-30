"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { type GraphNode as Node } from "@/lib/graph";
import { ForceGraphMethods } from "react-force-graph-2d";
import * as d3 from 'd3-force';

// Dynamically import the graph component to avoid SSR issues and improve performance
const ForceGraph2D = dynamic(() => import("react-force-graph-2d"), {
  ssr: false,
  loading: () => <p className="text-center text-muted-foreground pt-8">内容网络生成中，请稍候...</p>,
});

interface KnowledgeGraphProps {
  graphData: {
    nodes: Node[];
    links: any[];
  };
  latestPostId?: string | null;
}

const KnowledgeGraph = ({ graphData, latestPostId }: KnowledgeGraphProps) => {
  const router = useRouter();
  const fgRef = useRef<ForceGraphMethods>();
  const [initialAnimationDone, setInitialAnimationDone] = useState(false);

  const [highlightNodes, setHighlightNodes] = useState(new Set());
  const [highlightLinks, setHighlightLinks] = useState(new Set());

  useEffect(() => {
    if (fgRef.current) {
      // Deactivate existing forces
      fgRef.current.d3Force('charge', null);
      fgRef.current.d3Force('link', null);

      // Setup new forces
      fgRef.current.d3Force('charge', d3.forceManyBody().strength(-80));
      fgRef.current.d3Force('link', d3.forceLink(graphData.links).distance(50));
      fgRef.current.d3Force('center', d3.forceCenter());
      
      fgRef.current.zoom(1.5, 1000);
    }
  }, [graphData.links]);
  
  const handleEngineStop = useCallback(() => {
    if (!fgRef.current || initialAnimationDone) return;

    if (latestPostId) {
      const targetNode = graphData.nodes.find(
        (node) => node.id === latestPostId && node.type === "post"
      );

      if (targetNode && targetNode.x != null && targetNode.y != null) {
        fgRef.current.centerAt(targetNode.x, targetNode.y, 1000);
        fgRef.current.zoom(2, 500);
      }
    } else {
      fgRef.current.zoom(1.5, 1000);
    }

    setInitialAnimationDone(true);
  }, [initialAnimationDone, latestPostId, graphData.nodes]);
  
  const handleNodeClick = useCallback(
    (node: Node) => {
      if (node.type === "post") {
        router.push(`/explore/${node.id}`);
      }
    },
    [router]
  );
  
  const handleNodeHover = (node: Node | null) => {
    highlightLinks.clear();
    highlightNodes.clear();

    if (node) {
      highlightNodes.add(node);
      // Traverse links to find connected nodes
      graphData.links.forEach((link: any) => {
        if (link.source.id === node.id) {
          highlightLinks.add(link);
          highlightNodes.add(link.target);
        } else if (link.target.id === node.id) {
          highlightLinks.add(link);
          highlightNodes.add(link.source);
        }
      });
    }
    setHighlightLinks(new Set(highlightLinks));
    setHighlightNodes(new Set(highlightNodes));
  };
  
  const paintNode = useCallback(
    (node: any, ctx: CanvasRenderingContext2D, globalScale: number) => {
      const isHighlighted = highlightNodes.has(node);
      const isFaded = highlightNodes.size > 0 && !isHighlighted;

      // Node circle color & style
      if (node.type === "tag") {
        ctx.fillStyle = isFaded ? 'rgba(16, 185, 129, 0.1)' : 'rgb(16, 185, 129)'; // Emerald-500
      } else {
        ctx.fillStyle = isFaded ? 'rgba(113, 113, 122, 0.1)' : 'rgb(113, 113, 122)'; // Zinc-500
      }
      ctx.beginPath();
      ctx.arc(node.x, node.y, node.val, 0, 2 * Math.PI, false);
      ctx.fill();

      // Adaptive label rendering based on zoom level
      // Hide labels when zoomed out
      const labelVisibilityScaleThreshold = 1.5;
      if (globalScale < labelVisibilityScaleThreshold) {
        return;
      }
      
      const label = node.name;
      const fontSize = 12 / globalScale;
      ctx.font = `500 ${fontSize}px Inter, ui-sans-serif, system-ui`;
      
      if (isHighlighted || highlightNodes.size === 0) {
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillStyle = isFaded ? 'rgba(30, 41, 59, 0.2)' : '#1e293b'; // Slate-800
        ctx.fillText(label, node.x, node.y + node.val + 6);
      }
    },
    [highlightNodes]
  );

  return (
    <div className="w-full h-full bg-background overflow-hidden">
      <ForceGraph2D
        ref={fgRef}
        graphData={graphData}
        nodeCanvasObject={paintNode}
        linkColor={(link) => (highlightLinks.has(link) ? 'rgba(249, 115, 22, 0.6)' : 'rgba(113, 113, 122, 0.15)')}
        linkWidth={(link) => (highlightLinks.has(link) ? 1.5 : 0.5)}
        onEngineStop={handleEngineStop}
        onNodeClick={handleNodeClick}
        onNodeHover={handleNodeHover}
        cooldownTicks={100}
        warmupTicks={400} // Increased warmup ticks for better initial layout
      />
    </div>
  );
};

export default KnowledgeGraph; 