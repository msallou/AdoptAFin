"use client";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useState, useRef, useEffect } from "react";
import { UsersAdoptedFish } from "@/lib/types";
// import { createClient } from "@/utils/supabase/client";
import { importFish } from "@/app/dashboard/actions";

// const supabase = createClient();

export function MiniMapComponent() {
  const [fishList, setFishList] = useState<UsersAdoptedFish[]>([]);
  // const [error, setError] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"outdoors-v12" | "satellite-v9">("outdoors-v12");
  const mapNode = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const markersRef = useRef<mapboxgl.Marker[]>([]);

  // Fetch fish data (runs once)
  useEffect(() => {
    const fetchFish = async () => {
      try {
        // const { data: user } = await supabase.auth.getUser();
        // if (!user) {
        //   setError("No user is currently signed in.");
        //   return;
        // }
        const { data, error: fetchError } = await importFish();
        if (fetchError) throw new Error(fetchError);
        setFishList(data || []);
      } catch (err) {
        // setError((err as Error).message);
        console.log(err)
      }
    };
    fetchFish();
  }, []);

  // Initialize map (runs once)
  useEffect(() => {
    if (!mapNode.current || typeof window === "undefined") return;

    const TOKEN = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;
    if (!TOKEN) {
      console.error("Mapbox Access Token is missing!");
      return;
    }

    const map = new mapboxgl.Map({
      container: mapNode.current,
      accessToken: TOKEN,
      style: `mapbox://styles/mapbox/${viewMode}`,
      center: [-100, 40],
      zoom: 1,
      projection: 'globe',
      pitchWithRotate: false,
      dragRotate: false,
    });

    mapRef.current = map;

    return () => {
      markersRef.current.forEach(marker => marker.remove());
      map.remove();
    };
  });

  // Handle view mode changes
  useEffect(() => {
    if (!mapRef.current) return;
    mapRef.current.setStyle(`mapbox://styles/mapbox/${viewMode}`);
  }, [viewMode]);

  // Handle markers
  useEffect(() => {
    if (!mapRef.current || !fishList.length) return;

    // Clear existing markers
    markersRef.current.forEach(marker => marker.remove());
    markersRef.current = [];

    // Add new markers
    fishList.forEach(({ x_cor, y_cor, fish }) => {
      const popupContent = document.createElement("div");
      popupContent.innerHTML = `
        <div class="bg-white rounded-lg shadow-lg p-4 max-w-sm">
          <h2 class="text-sm font-bold text-gray-800 mb-2">${fish}</h2>
        </div>
      `;

      const popup = new mapboxgl.Popup({ offset: 25 }).setDOMContent(popupContent);
      const marker = new mapboxgl.Marker()
        .setLngLat([x_cor, y_cor])
        .setPopup(popup)
        .addTo(mapRef.current!);
      markersRef.current.push(marker);
    });
  }, [fishList, viewMode]);

  return (
    <div className="flex h-[40vh]">
      <div className="flex-1 flex flex-col relative w-[70%]">
        <div ref={mapNode} className="w-full h-full border-2 overflow-hidden" />
        <div className="flex flex-col gap-4 absolute top-4 right-4">
          <button
            className="bg-gray-800 text-white px-4 py-2 rounded-lg"
            onClick={() => setViewMode(viewMode === "outdoors-v12" ? "satellite-v9" : "outdoors-v12")}
          >
            Toggle View ({viewMode === "outdoors-v12" ? <b>streets</b> : "streets"}
            /{viewMode === "satellite-v9" ? <b>satellite</b> : "satellite"})
          </button>
        </div>
      </div>
    </div>
  );
}

export default MiniMapComponent;