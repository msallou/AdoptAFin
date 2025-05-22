"use client";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useState, useRef, useEffect } from "react";
import { UsersAdoptedFish } from "@/lib/types";
import { createClient } from "@/utils/supabase/client";
import { importFish } from "../actions";
import Image from "next/image";

const supabase = createClient();

export function ViewMyFish() {
  const [fishList, setFishList] = useState<UsersAdoptedFish[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"outdoors-v12" | "satellite-v9">("outdoors-v12");
  const [worldMode, setWorldMode] = useState<"mercator" | "globe">("mercator");
  const mapNode = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const markersRef = useRef<mapboxgl.Marker[]>([]);

  // Fetch fish data (runs once)
  useEffect(() => {
    const fetchFish = async () => {
      try {
        const { data: user } = await supabase.auth.getUser();
        if (!user) {
          setError("No user is currently signed in.");
          setLoading(false);
          return;
        }
        const { data, error: fetchError } = await importFish();
        if (fetchError) throw new Error(fetchError);
        setFishList(data || []);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
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
      zoom: 3,
      projection: worldMode,
      pitchWithRotate: false,
      dragRotate: false,
    });

    mapRef.current = map;

    return () => {
      markersRef.current.forEach(marker => marker.remove());
      map.remove();
    };
  }, []); // Empty dependency array - only run once

  // Handle view mode changes
  useEffect(() => {
    if (!mapRef.current) return;
    mapRef.current.setStyle(`mapbox://styles/mapbox/${viewMode}`);
  }, [viewMode]);

  // Handle world mode changes
  useEffect(() => {
    if (!mapRef.current) return;
    mapRef.current.setProjection(worldMode);
  }, [worldMode]);

  // Handle markers
  useEffect(() => {
    if (!mapRef.current || !fishList.length) return;

    // Clear existing markers
    markersRef.current.forEach(marker => marker.remove());
    markersRef.current = [];

    // Add new markers
    fishList.forEach(({ x_cor, y_cor, fish, price, species }) => {
      const popupContent = document.createElement("div");
      popupContent.innerHTML = `
        <div class="bg-white rounded-lg shadow-lg p-4 max-w-sm">
          <h2 class="text-xl font-bold text-gray-800 mb-2">${fish}</h2>
          <div class="space-y-2">
            <p class="text-gray-600 flex items-center">
              <span class="mr-2 text-green-500">Price:</span>
              <span class="font-medium">$${price.toFixed(2)}</span>
            </p>
            <p class="text-gray-600 flex items-center">
              <span class="mr-2 text-blue-500">Coordinates:</span>
              <span class="font-medium">(${x_cor}, ${y_cor})</span>
            </p>
            <p class="text-gray-600 flex items-center">
              <span class="mr-2 text-purple-500">Species:</span>
              <span class="font-medium">${species}</span>
            </p>
          </div>
        </div>
      `;

      const popup = new mapboxgl.Popup({ offset: 25 }).setDOMContent(popupContent);
      const marker = new mapboxgl.Marker()
        .setLngLat([x_cor, y_cor])
        .setPopup(popup)
        .addTo(mapRef.current!);
      markersRef.current.push(marker);
    });
  }, [fishList]); // Only re-run when fishList changes

  return (
    <div className="flex h-[85vh] mt-[10vh]">
      <div className="w-[30%] p-6 bg-white shadow-lg rounded-lg overflow-auto mr-4">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">My Fish</h1>
        {fishList.length === 0 ? (
          <p className="text-center text-gray-500">No fish found.</p>
        ) : (
          <ul className="space-y-4">
            {fishList.map((fish) => (
              <li
                key={fish.id}
                className="bg-gray-50 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                  <div className="w-40 h-40 flex-shrink-0 flex items-center justify-center">
                    <Image
                      alt={`${fish.fish} image`}
                      src={fish.image}
                      width={200}
                      height={200}
                      className="w-auto h-auto max-w-[95%] object-contain bg-gray-200 rounded-lg shadow-md"
                    />
                  </div>
                  <div className="flex-1">
                    <strong className="block text-xl font-semibold text-blue-700">
                      {fish.fish}
                    </strong>
                    <p className="text-gray-600">Category: {fish.species}</p>
                    <p className="text-gray-600">Price: ${fish.price.toFixed(2)}</p>
                    <p className="text-gray-600">
                      Coordinates: ({fish.x_cor}, {fish.y_cor})
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
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
          <button
            className="bg-gray-800 text-white px-4 py-2 rounded-lg"
            onClick={() => setWorldMode(worldMode === "mercator" ? "globe" : "mercator")}
          >
            Toggle World ({worldMode === "mercator" ? <b>flat</b> : "flat"}
            /{worldMode === "globe" ? <b>globe</b> : "globe"})
          </button>
        </div>
      </div>
    </div>
  );
}

export default ViewMyFish;