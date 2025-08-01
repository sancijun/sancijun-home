"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { type GraphNode as Node } from "@/lib/graph";
import Link from "next/link";
import { ArrowRight, Focus } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useRouter } from "next/navigation";

interface GraphNode extends Node, d3.SimulationNodeDatum {}

interface GraphLink extends d3.SimulationLinkDatum<GraphNode> {
  source: string | GraphNode;
  target: string | GraphNode;
}

interface KnowledgeGraphProps {
  graphData: {
    nodes: GraphNode[];
    links: GraphLink[];
  };
  className?: string;
  latestPostId?: string;
}

const drag = (simulation: d3.Simulation<GraphNode, undefined>) => {
  function dragstarted(event: d3.D3DragEvent<SVGGElement, GraphNode, GraphNode>, d: GraphNode) {
    if (!event.active) simulation.alphaTarget(0.3).restart();
    d.fx = d.x;
    d.fy = d.y;
  }
  function dragged(event: d3.D3DragEvent<SVGGElement, GraphNode, GraphNode>, d: GraphNode) {
    d.fx = event.x;
    d.fy = event.y;
  }
  function dragended(event: d3.D3DragEvent<SVGGElement, GraphNode, GraphNode>, d: GraphNode) {
    if (!event.active) simulation.alphaTarget(0);
    d.fx = null;
    d.fy = null;
  }
  return d3.drag<SVGGElement, GraphNode>()
    .on("start", dragstarted)
    .on("drag", dragged)
    .on("end", dragended);
};

const KnowledgeGraph = ({ graphData, className, latestPostId }: KnowledgeGraphProps) => {
  const router = useRouter();
  const svgRef = useRef<SVGSVGElement>(null);
  const zoomRef = useRef<d3.ZoomBehavior<SVGSVGElement, unknown> | null>(null);
  const { nodes, links } = graphData;

  const [colors, setColors] = useState({ primary: '#000', foreground: '#666' });

  useEffect(() => {
    // dynamically get colors from CSS variables
    const style = getComputedStyle(document.body);
    const primaryColor = style.getPropertyValue('--primary').trim();
    const foregroundColor = style.getPropertyValue('--muted-foreground').trim();
    setColors({ primary: `hsl(${primaryColor})`, foreground: `hsl(${foregroundColor})` });
  }, []);

  const handleCenterView = useCallback(() => {
    if (!svgRef.current || !zoomRef.current || !nodes || nodes.length === 0) return;

    const svg = d3.select(svgRef.current);
    const parent = svg.node()?.parentElement;
    if (!parent) return;

    const width = parent.clientWidth;
    const height = parent.clientHeight;

    const xExtent = d3.extent(nodes, d => d.x);
    const yExtent = d3.extent(nodes, d => d.y);

    if (xExtent[0] === undefined || yExtent[0] === undefined || xExtent[1] === undefined || yExtent[1] === undefined) {
      svg.transition().duration(750).call(zoomRef.current.transform, d3.zoomIdentity);
      return;
    }

    const boundsWidth = xExtent[1] - xExtent[0];
    const boundsHeight = yExtent[1] - yExtent[0];
    const midX = (xExtent[0] + xExtent[1]) / 2;
    const midY = (yExtent[0] + yExtent[1]) / 2;

    if (boundsWidth === 0 && boundsHeight === 0) {
      const transform = d3.zoomIdentity.translate(-midX, -midY).scale(1);
      svg.transition().duration(750).call(zoomRef.current.transform, transform);
      return;
    }

    const scaleX = boundsWidth > 0 ? width / boundsWidth : Infinity;
    const scaleY = boundsHeight > 0 ? height / boundsHeight : Infinity;
    const scale = Math.min(scaleX, scaleY) * 0.85; // add 15% padding

    const translateX = -midX * scale;
    const translateY = -midY * scale;

    const transform = d3.zoomIdentity.translate(translateX, translateY).scale(scale);

    svg.transition().duration(750).call(zoomRef.current.transform, transform);
  }, [nodes]);

  useEffect(() => {
    if (!svgRef.current || !nodes || !links) return;

    const svgElement = svgRef.current;
    const width = svgElement.parentElement?.clientWidth || 800;
    const height = svgElement.parentElement?.clientHeight || 600;
    
    const svg = d3.select(svgElement)
        .attr("viewBox", [-width / 2, -height / 2, width, height]);

    // Add a pulsing animation for the latest post
    if (!svg.select("defs").node()) {
      const defs = svg.append("defs");
      defs.append("filter")
        .attr("id", "glow")
        .append("feGaussianBlur")
        .attr("stdDeviation", "2.5")
        .attr("result", "coloredBlur");
      
      const animate = defs.append("animate")
        .attr("id", "pulseAnimation")
        .attr("attributeName", "r")
        .attr("values", "5;8;5")
        .attr("dur", "2s")
        .attr("repeatCount", "indefinite");
    }

    zoomRef.current = d3.zoom<SVGSVGElement, unknown>().on("zoom", (event) => {
      g.attr("transform", event.transform);
    });
    
    svg.call(zoomRef.current);

    svg.selectAll("*").remove();
    const g = svg.append("g");

    const simulation = d3.forceSimulation<GraphNode>(nodes)
      .force("link", d3.forceLink<GraphNode, GraphLink>(links).id((d: any) => d.id).distance(d => {
        const isCategoryLink = (typeof d.source === 'object' && d.source.type === 'category') || (typeof d.target === 'object' && d.target.type === 'category');
        return isCategoryLink ? 120 : 80;
      }))
      .force("charge", d3.forceManyBody().strength(-150))
      .force("center", d3.forceCenter(0, 0))
      .on("end", handleCenterView);

    const link = g.append("g")
      .attr("class", "links")
      .selectAll("line")
      .data(links)
      .join("line")
      .attr("stroke", "#9ca3af") // gray-400
      .attr("stroke-opacity", 0.3)
      .attr("stroke-width", 1.5);

    const nodeGroup = g.append("g")
      .attr("class", "nodes")
      .selectAll("g")
      .data(nodes)
      .join("g")
      .call(drag(simulation) as any);

    nodeGroup.on("click", (event, d) => {
      if (d.type === 'post') {
        router.push(`/explore/${d.id}`);
      }
    });

    const nodeCircles = nodeGroup.append("circle")
      .attr("r", d => d.val * 2.5)
      .attr("fill", d => {
        if (d.id === latestPostId) return "#ef4444"; // red-500 for latest post
        if (d.type === 'category') return colors.primary;
        if (d.type === 'tag') return colors.foreground;
        return "#6b7280"; // gray-500 for posts
      })
      .attr("stroke", d => d.id === latestPostId ? "#fee2e2" : "#f9fafb") // red-100 for latest post, gray-50 for others
      .attr("stroke-width", d => d.id === latestPostId ? 3 : 2)
      .attr("filter", d => d.id === latestPostId ? "url(#glow)" : null);

    // Add pulsing animation to latest post node
    if (latestPostId) {
      nodeCircles.each(function(d) {
        if (d.id === latestPostId) {
          const circle = d3.select(this);
          circle.append("animate")
            .attr("attributeName", "r")
            .attr("values", `${d.val * 2.5};${d.val * 3};${d.val * 2.5}`)
            .attr("dur", "2s")
            .attr("repeatCount", "indefinite");
        }
      });
    }

    const nodeLabels = nodeGroup.append("text")
      .text(d => d.name)
      .attr("x", d => d.val * 2.5 + 5)
      .attr("y", "0.31em")
      .attr("font-size", "14px")
      .attr("font-weight", "600")
      .attr("fill", "#111827") // gray-900
      .attr("paint-order", "stroke")
      .attr("stroke", "white")
      .attr("stroke-width", 4)
      .style("pointer-events", "none")
      .style("opacity", d => (d.type === 'tag' || d.type === 'category' || d.id === latestPostId) ? 1 : 0)
      .style("transition", "opacity 0.2s ease-in-out");

    nodeGroup
      .on("mouseover", function (event, d) {
        const connectedNodes = new Set([d.id]);
        links.forEach(l => {
          const sourceId = typeof l.source === 'string' ? l.source : (l.source as GraphNode).id;
          const targetId = typeof l.target === 'string' ? l.target : (l.target as GraphNode).id;
          if (sourceId === d.id) connectedNodes.add(targetId);
          if (targetId === d.id) connectedNodes.add(sourceId);
        });

        nodeGroup.style("opacity", n => connectedNodes.has(n.id) ? 1 : 0.15);
        nodeLabels.style("opacity", n => (connectedNodes.has(n.id) || n.type === 'category' || n.type === 'tag') ? 1 : 0);
        
        link
          .style('stroke', l => isLinkConnected(l, d) ? colors.primary : '#e5e7eb') // blue-500, gray-200
          .style('stroke-opacity', l => isLinkConnected(l, d) ? 0.8 : 0.2);
      })
      .on("mouseout", function () {
        nodeGroup.style("opacity", 1);
        nodeLabels.style("opacity", d => (d.type === 'tag' || d.type === 'category' || d.id === latestPostId) ? 1 : 0);
        link.style('stroke', '#9ca3af').style('stroke-opacity', 0.3); // gray-400
      });

    function isLinkConnected(l: GraphLink, n: GraphNode) {
      const sourceId = typeof l.source === 'string' ? l.source : l.source.id;
      const targetId = typeof l.target === 'string' ? l.target : l.target.id;
      return sourceId === n.id || targetId === n.id;
    }
    
    simulation.on("tick", () => {
      link
        .attr("x1", d => (d.source as GraphNode).x!)
        .attr("y1", d => (d.source as GraphNode).y!)
        .attr("x2", d => (d.target as GraphNode).x!)
        .attr("y2", d => (d.target as GraphNode).y!);
      nodeGroup.attr("transform", d => `translate(${d.x!},${d.y!})`);
    });

    return () => {
      simulation.stop();
    };
  }, [nodes, links, router, handleCenterView, colors, latestPostId]);

  return (
    <TooltipProvider>
      <div className={cn("w-full h-full bg-background overflow-hidden relative", className)}>
        <svg ref={svgRef} className="w-full h-full cursor-grab active:cursor-grabbing"></svg>
        <div className="absolute bottom-6 left-6 z-10">
          <Link
            href="/explore"
            className={cn(
              buttonVariants({ variant: "outline" }),
              "bg-background/60 backdrop-blur-sm border-border/30 hover:bg-accent/80 transition-all group animate-fadeIn"
            )}
            style={{ animationDelay: "800ms" }}
          >
            浏览全部内容
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
        <div className="absolute bottom-6 right-6 z-10">
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                onClick={handleCenterView}
                className={cn(
                  buttonVariants({ variant: "outline", size: "icon" }),
                  "bg-background/60 backdrop-blur-sm border-border/30 hover:bg-accent/80 transition-all animate-fadeIn"
                )}
                style={{ animationDelay: "900ms" }}
                aria-label="Center graph"
              >
                <Focus className="h-4 w-4" />
              </button>
            </TooltipTrigger>
            <TooltipContent>
              <p>聚焦全景</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </div>
    </TooltipProvider>
  );
};

export default KnowledgeGraph; 