"use client";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Box, Pin } from "lucide-react";
import { useRouter } from "next/navigation";

export const TabItem = ({ tab, isActive, onPin }: any) => {
  const router = useRouter();
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: tab.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 100 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      onClick={() => router.push(tab.path)}
      onDoubleClick={(e) => {
        e.preventDefault();
        onPin(tab.id);
      }}
      className={`tab-item-measure group relative flex items-center h-12 border-r border-gray-100 cursor-pointer select-none transition-all duration-300
        ${isActive ? "bg-gray-100" : "bg-white hover:bg-gray-50"}
        ${tab.isPinned ? "w-[60px] justify-center px-0" : "min-w-[140px] px-4"}`}
      title="Double click to pin/unpin"
    >
      {(tab.isPinned || isActive) && (
        <div className="absolute top-0 left-0 w-full h-[3px] bg-blue-500" />
      )}

      <div className="flex items-center gap-2 pointer-events-none">
        <Box
          size={18}
          className={isActive ? "text-blue-600" : "text-gray-400"}
        />
        {!tab.isPinned && (
          <span className="text-sm font-medium text-gray-700 truncate">
            {tab.title}
          </span>
        )}
        {tab.isPinned && (
          <Pin
            size={10}
            className="absolute bottom-1 right-1 text-blue-500 fill-blue-500 shadow-sm"
          />
        )}
      </div>
    </div>
  );
};
