"use client";

import { useEffect } from "react";
import {
  ReactFlow,
  Node,
  Edge,
  Background,
  useNodesState,
  useEdgesState,
  Panel,
  Handle,
  Position,
  Controls,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import Image from "next/image";
import { NormalizedEPICItem } from "@/lib/types";

interface CelestialDistanceMapProps {
  item: NormalizedEPICItem;
}

type HandleConfig = {
  id: string;
  type: "source" | "target";
  position: Position;
};

interface CelestialNodeData extends Record<string, unknown> {
  image: string;
  label: string;
  handles: HandleConfig[];
}

// Custom node component for celestial bodies
function CelestialNode({ data }: { data: CelestialNodeData }) {
  return (
    <>
      {data.handles?.map((handle) => (
        <Handle
          key={`${handle.id}-${handle.type}`}
          type={handle.type}
          id={handle.id}
          position={handle.position}
          className="!bg-white/70 !border-none h-1 w-1"
        />
      ))}
      <div className="relative w-20 h-20">
        <Image
          src={data.image}
          alt={data.label}
          fill
          className="object-contain"
        />
      </div>
      {/* <span className="text-xs font-semibold bg-white/50 px-2 py-1 rounded-md backdrop-blur-sm">
        {data.label}
      </span> */}
    </>
  );
}

const nodeTypes = {
  celestial: CelestialNode,
};

function formatDistance(km: number): string {
  return `${km.toLocaleString()} KM`;
}

export default function CelestialDistanceMap({
  item,
}: CelestialDistanceMapProps) {
  const [nodes, setNodes, onNodesChange] = useNodesState<Node>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);

  useEffect(() => {
    // Define node positions in a visually appealing layout
    const initialNodes: Node[] = [
      {
        id: "satellite",
        type: "celestial",
        position: { x: -150, y: 0 },
        data: {
          image: "/satellite.png",
          label: "DSCOVR",
          handles: [
            { id: "source-right", type: "source", position: Position.Right },
            { id: "source-bottom", type: "source", position: Position.Bottom },
          ],
        } satisfies CelestialNodeData,
        draggable: true,
      },
      {
        id: "sun",
        type: "celestial",
        position: { x: -230, y: 270 },
        data: {
          image: "/sun.png",
          label: "Sun",
          handles: [
            { id: "target-top", type: "target", position: Position.Top },
            { id: "source-right", type: "source", position: Position.Right },
          ],
        } satisfies CelestialNodeData,
        draggable: true,
      },
      {
        id: "earth",
        type: "celestial",
        position: { x: 150, y: 0 },
        data: {
          image: "/earth.png",
          label: "Earth",
          handles: [
            { id: "target-left", type: "target", position: Position.Left },
            { id: "source-bottom", type: "source", position: Position.Bottom },
          ],
        } satisfies CelestialNodeData,
        draggable: true,
      },
      {
        id: "moon",
        type: "celestial",
        position: { x: 150, y: 150 },
        data: {
          image: "/moon.png",
          label: "Moon",
          handles: [
            { id: "target-top", type: "target", position: Position.Top },
            { id: "target-left", type: "target", position: Position.Left },
          ],
        } satisfies CelestialNodeData,
        draggable: true,
      },
    ];

    // Define edges (connections) with distances
    const initialEdges: Edge[] = [
      {
        id: "sun-earth",
        source: "sun",
        target: "earth",
        sourceHandle: "source-right",
        targetHandle: "target-left",
        label: formatDistance(item.distances.earthToSun),
        type: "straight",
        style: { stroke: "#fff", strokeWidth: 1, strokeDasharray: "5,5" },
        labelStyle: {
          fill: "#fff",
          fontSize: 8,
          fontWeight: 600,
        },
        labelBgStyle: {
          fill: "#000",
          fillOpacity: 1,
        },
        labelBgPadding: [4, 4] as [number, number],
        labelBgBorderRadius: 4,
      },
      {
        id: "earth-moon",
        source: "earth",
        target: "moon",
        sourceHandle: "source-bottom",
        targetHandle: "target-top",
        label: formatDistance(item.distances.earthToMoon),
        type: "straight",
        style: { stroke: "#fff", strokeWidth: 1, strokeDasharray: "5,5" },
        labelStyle: {
          fill: "#fff",
          fontSize: 8,
          fontWeight: 600,
        },
        labelBgStyle: {
          fill: "#000",
          fillOpacity: 1,
        },
        labelBgPadding: [4, 4] as [number, number],
        labelBgBorderRadius: 4,
      },
      {
        id: "satellite-earth",
        source: "satellite",
        target: "earth",
        sourceHandle: "source-right",
        targetHandle: "target-left",
        label: formatDistance(item.distances.satelliteToEarth),
        type: "straight",
        style: { stroke: "#fff", strokeWidth: 1, strokeDasharray: "5,5" },
        labelStyle: {
          fill: "#fff",
          fontSize: 8,
          fontWeight: 600,
        },
        labelBgStyle: {
          fill: "#000",
          fillOpacity: 1,
        },
        labelBgPadding: [4, 4] as [number, number],
        labelBgBorderRadius: 4,
      },
      {
        id: "satellite-sun",
        source: "satellite",
        target: "sun",
        sourceHandle: "source-bottom",
        targetHandle: "target-top",
        label: formatDistance(item.distances.satelliteToSun),
        type: "straight",
        style: { stroke: "#fff", strokeWidth: 1, strokeDasharray: "5,5" },
        labelStyle: {
          fill: "#fff",
          fontSize: 8,
          fontWeight: 600,
        },
        labelBgStyle: {
          fill: "#000",
          fillOpacity: 1,
        },
        labelBgPadding: [4, 4] as [number, number],
        labelBgBorderRadius: 4,
      },
      {
        id: "satellite-moon",
        source: "satellite",
        target: "moon",
        sourceHandle: "source-bottom",
        targetHandle: "target-left",
        label: formatDistance(item.distances.satelliteToMoon),
        type: "straight",
        style: { stroke: "#fff", strokeWidth: 1, strokeDasharray: "5,5" },
        labelStyle: {
          fill: "#fff",
          fontSize: 8,
          fontWeight: 600,
        },
        labelBgStyle: {
          fill: "#000",
          fillOpacity: 1,
        },
        labelBgPadding: [4, 4] as [number, number],
        labelBgBorderRadius: 4,
      },
      {
        id: "sun-moon",
        source: "sun",
        target: "moon",
        sourceHandle: "source-right",
        targetHandle: "target-left",
        label: formatDistance(item.distances.sunToMoon),
        type: "straight",
        style: { stroke: "#fff", strokeWidth: 1, strokeDasharray: "5,5" },
        labelStyle: {
          fill: "#fff",
          fontSize: 8,
          fontWeight: 600,
        },
        labelBgStyle: {
          fill: "#000",
          fillOpacity: 1,
        },
        labelBgPadding: [4, 4] as [number, number],
        labelBgBorderRadius: 4,
      },
    ];

    setNodes(initialNodes);
    setEdges(initialEdges);
  }, [item, setNodes, setEdges]);

  return (
    <div className="w-full h-[500px] lg:h-full rounded-2xl border border-white/10 bg-transparent overflow-hidden">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        fitView
        fitViewOptions={{ padding: 0.2 }}
        proOptions={{ hideAttribution: true }}
        className="bg-transparent"
      >
        <Background style={{ opacity: 0.25 }} gap={16} size={1} />
        <Controls className="!bg-black !rounded-lg [&>button]:!bg-black [&>button]:!border-slate-500/60 [&>button:hover]:!bg-slate-800" />
        <Panel
          position="top-center"
          className="bg-black/50 backdrop-blur-md rounded-lg px-4 py-2"
        >
          <p className="text-white text-center text-xs font-medium">
            Spacial distance map at this moment
          </p>
        </Panel>
      </ReactFlow>
    </div>
  );
}
