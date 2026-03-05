"use client";
import React, { useState, useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";
import { ChevronDown, Box } from "lucide-react";
import { TabItem } from "./TabItem";
import { initialTabs } from "../tabs/tabs";

export default function TabsManager() {
  const pathname = usePathname();
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);

  const [tabs, setTabs] = useState(initialTabs);
  const [visibleCount, setVisibleCount] = useState(initialTabs.length);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
  );

  useEffect(() => {
    const saved = localStorage.getItem("tabs-order");
    if (saved) setTabs(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("tabs-order", JSON.stringify(tabs));
  }, [tabs]);

  useEffect(() => {
    const updateVisibility = () => {
      if (!containerRef.current) return;

      const containerWidth = containerRef.current.offsetWidth;
      const dropdownWidth = 70;

      const pinnedTabsCount = tabs.filter((t) => t.isPinned).length;

      const PINNED_WIDTH = 60;
      const REGULAR_MIN_WIDTH = 140;

      let usedWidth = pinnedTabsCount * PINNED_WIDTH;
      let count = pinnedTabsCount;

      const remainingWidth = containerWidth - dropdownWidth - usedWidth;

      if (remainingWidth > 0) {
        const extraTabs = Math.floor(remainingWidth / REGULAR_MIN_WIDTH);
        count += extraTabs;
      }

      const finalCount = Math.min(
        Math.max(count, pinnedTabsCount || 1),
        tabs.length,
      );
      setVisibleCount(finalCount);
    };

    const observer = new ResizeObserver(updateVisibility);
    if (containerRef.current) observer.observe(containerRef.current);
    updateVisibility();
    return () => observer.disconnect();
  }, [tabs]);

  const onPin = (id: string) => {
    setTabs((prev) => {
      const updated = prev.map((t) =>
        t.id === id ? { ...t, isPinned: !t.isPinned } : t,
      );

      return [
        ...updated.filter((t) => t.isPinned),
        ...updated.filter((t) => !t.isPinned),
      ];
    });
  };

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      setTabs((items) => {
        const oldIdx = items.findIndex((t) => t.id === active.id);
        const newIdx = items.findIndex((t) => t.id === over.id);
        return arrayMove(items, oldIdx, newIdx);
      });
    }
  };

  const visibleTabs = tabs.slice(0, visibleCount);
  const hiddenTabs = tabs.slice(visibleCount);

  return (
    <div
      ref={containerRef}
      className="flex items-center h-12 bg-white border-b w-full relative"
    >
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={visibleTabs.map((t) => t.id)}
          strategy={horizontalListSortingStrategy}
        >
          <div className="flex h-full items-center overflow-hidden">
            {visibleTabs.map((tab) => (
              <TabItem
                key={tab.id}
                tab={tab}
                isActive={pathname === tab.path}
                onPin={onPin}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>

      {hiddenTabs.length > 0 && (
        <div className="ml-auto h-full flex items-center px-4 bg-blue-600 text-white cursor-pointer relative group/drop z-[50]">
          <ChevronDown
            size={20}
            className="group-hover/drop:rotate-180 transition-transform"
          />
          <div className="absolute top-full right-0 w-64 bg-white shadow-2xl border border-gray-200 rounded-b-xl py-2 opacity-0 invisible group-hover/drop:opacity-100 group-hover/drop:visible transition-all z-[100]">
            <div className="px-4 py-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest border-b mb-1">
              Другие разделы
            </div>
            {hiddenTabs.map((tab) => (
              <div
                key={tab.id}
                onClick={() => router.push(tab.path)}
                className="flex items-center gap-3 px-4 py-3 hover:bg-blue-50 text-gray-700 transition-colors cursor-pointer"
              >
                <Box size={16} className="text-gray-400" />
                <span className="text-sm font-medium">{tab.title}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
