"use client";
import { WorkerType } from "@/types/workers";
import Image from "next/image";
// Map worker types to their images
const workerTypeImages: Record<string, string> = {
  Painter: "/workers/painter.jpg",
  Carpenter: "/workers/carpenter.jpg",
  Roofer: "/workers/roofer.jpg",
  Gardener: "/workers/gardener.jpg",
  Mason: "/workers/mason.jpg",
  Plumber: "/workers/plumber.jpg",
  Glazier: "/workers/glazier.jpg",
  Mechanic: "/workers/mechanic.jpg",
  Chef: "/workers/chef.jpg",
  HVACTechincian: "/workers/hvactechnician.jpg",
  Welder: "/workers/welder.jpg",
  Electrician: "/workers/electrician.jpg",
};
import { useState, useEffect } from "react";

export default function WorkersPage() {
  const [workersData, setWorkersData] = useState<WorkerType[]>([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");
  const [sort, setSort] = useState("name");
  const [favorites, setFavorites] = useState<number[]>([]);
  const jobTypes = [
    "Painter", "Carpenter", "Roofer", "Gardener", "Mason", "Plumber", "Glazier", "Mechanic", "Chef", "HVACTechincian", "Welder", "Electrician"
  ];

  // Map job type to emoji icon and color
  const jobTypeIcons: Record<string, string> = {
    Painter: "🎨",
    Carpenter: "🪚",
    Roofer: "🏠",
    Gardener: "🌱",
    Mason: "🧱",
    Plumber: "🔧",
    Glazier: "🪟",
    Mechanic: "🔩",
    Chef: "👨‍🍳",
    HVACTechincian: "❄️",
    Welder: "⚡",
    Electrician: "💡",
  };
  const jobTypeColors: Record<string, string> = {
    Roofer: "bg-orange-50 border-orange-200",
    Mason: "bg-green-50 border-green-200",
    Carpenter: "bg-yellow-50 border-yellow-200",
    Painter: "bg-pink-50 border-pink-200",
    Gardener: "bg-lime-50 border-lime-200",
    Plumber: "bg-blue-50 border-blue-200",
    Glazier: "bg-cyan-50 border-cyan-200",
    Mechanic: "bg-gray-50 border-gray-200",
    Chef: "bg-red-50 border-red-200",
    HVACTechincian: "bg-sky-50 border-sky-200",
    Welder: "bg-purple-50 border-purple-200",
    Electrician: "bg-indigo-50 border-indigo-200",
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await import("../../workers.json");
        setWorkersData(response.default);
      } catch (error) {
        console.error("Failed to load workers:", error);
      }
    };
    loadData();
  }, []);

  // Dummy ratings, experience, and availability for demo
  const getRating = (id: number) => 4 + (id % 2 ? 0.5 : 0);
  const getReviews = (id: number) => 10 + (id % 7);
  const getExperience = (id: number) => 2 + (id % 8); // years
  const isAvailable = (id: number) => id % 3 !== 0;

  let filteredWorkers = workersData
    .filter((worker) => worker.pricePerDay > 0)
    .filter((worker) => worker.id !== null)
    .filter((worker) =>
      worker.name.toLowerCase().includes(search.toLowerCase()) &&
      (filter ? worker.service === filter : true)
    );

  if (sort === "name") {
    filteredWorkers = filteredWorkers.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sort === "price-asc") {
    filteredWorkers = filteredWorkers.sort((a, b) => a.pricePerDay - b.pricePerDay);
  } else if (sort === "price-desc") {
    filteredWorkers = filteredWorkers.sort((a, b) => b.pricePerDay - a.pricePerDay);
  } else if (sort === "experience") {
    filteredWorkers = filteredWorkers.sort((a, b) => getExperience(b.id) - getExperience(a.id));
  } else if (sort === "rating") {
    filteredWorkers = filteredWorkers.sort((a, b) => getRating(b.id) - getRating(a.id));
  }

  const toggleFavorite = (id: number) => {
    setFavorites((prev) => prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]);
  };

  return (
    <main className="min-h-screen w-full flex flex-col items-center justify-start px-2 sm:px-8 py-12 bg-gray-50 dark:bg-neutral-900 font-['Poppins','Inter','Roboto',sans-serif]">
      <h1 className="text-3xl sm:text-4xl font-bold text-center mb-8 text-blue-700 dark:text-blue-300 tracking-wide flex items-center justify-center gap-2">
        <span role="img" aria-label="worker">👷</span> My Workers
      </h1>
      {/* Search, Filter, Sort in Card */}
      <div className="w-full max-w-4xl mx-auto mb-10">
        <div className="flex flex-col md:flex-row gap-4 bg-white dark:bg-neutral-800 rounded-2xl shadow-lg p-6 items-center flex-wrap">
          <input
            type="text"
            placeholder="🔍 Search by name..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 bg-white dark:bg-neutral-700 text-lg shadow"
          />
          <div className="flex gap-2 w-full md:w-auto">
            <select
              value={filter}
              onChange={e => setFilter(e.target.value)}
              className="px-4 py-2 rounded-lg border border-blue-200 focus:ring-2 focus:ring-blue-400 bg-white dark:bg-neutral-700 text-lg shadow"
            >
              <option value="">All Types</option>
              {jobTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
            <select
              value={sort}
              onChange={e => setSort(e.target.value)}
              className="px-4 py-2 rounded-lg border border-green-200 focus:ring-2 focus:ring-green-400 bg-white dark:bg-neutral-700 text-lg shadow"
            >
              <option value="name">Sort: Name</option>
              <option value="price-asc">Lowest Price</option>
              <option value="price-desc">Highest Price</option>
              <option value="experience">Most Experienced</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>
        </div>
      </div>
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl">
        {workersData
          .filter((worker) => worker.pricePerDay > 0)
          .filter((worker) => worker.id !== null)
          .sort((a, b) => a.name.localeCompare(b.name))
          .map((worker: WorkerType) => (
            <div
              key={worker.id}
              className={`rounded-2xl shadow-lg p-6 flex flex-col items-center transition group relative cursor-pointer border ${jobTypeColors[worker.service] || 'bg-white border-gray-100 dark:bg-neutral-800 dark:border-neutral-700'} hover:scale-[1.03] hover:shadow-2xl duration-200`}
              style={{ minHeight: '370px' }}
            >
              {/* Favorite button */}
              <button
                className={`absolute top-4 right-4 text-2xl transition ${favorites.includes(worker.id) ? 'text-red-500' : 'text-gray-300 dark:text-gray-500'} hover:text-red-400`}
                onClick={() => toggleFavorite(worker.id)}
                aria-label="Save as favorite"
              >
                {favorites.includes(worker.id) ? '❤️' : '🤍'}
              </button>
              <div className="flex flex-col items-center w-full">
                <div className="relative mb-4">
                  <Image
                    src={workerTypeImages[worker.service] || "/default.jpg"}
                    alt={worker.service}
                    width={96}
                    height={96}
                    className="w-24 h-24 rounded-full object-cover border-4 border-blue-100 dark:border-blue-300 shadow"
                  />
                  <span className="absolute -bottom-2 -right-2 text-2xl bg-white dark:bg-neutral-700 rounded-full border border-gray-200 dark:border-neutral-600 shadow px-1">
                    {jobTypeIcons[worker.service] || ""}
                  </span>
                  {/* Availability dot */}
                  <span className={`absolute -top-2 -left-2 w-4 h-4 rounded-full border-2 border-white dark:border-neutral-800 ${isAvailable(worker.id) ? 'bg-green-400' : 'bg-red-400'}`}
                    title={isAvailable(worker.id) ? 'Available today' : 'Unavailable today'}
                  />
                </div>
                <span className="inline-block mb-2 px-3 py-1 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200 text-xs font-semibold tracking-wide shadow">
                  {jobTypeIcons[worker.service] || ''} {worker.service}
                </span>
                <h2 className="text-2xl font-bold mb-1 text-gray-900 dark:text-white group-hover:text-blue-700 transition text-center">
                  {worker.name}
                </h2>
                {/* Skill badges */}
                <div className="flex flex-wrap gap-2 justify-center mb-2">
                  <span className="px-2 py-0.5 rounded bg-green-200 text-green-800 text-xs font-semibold">Certified</span>
                  {getExperience(worker.id) >= 5 && (
                    <span className="px-2 py-0.5 rounded bg-blue-200 text-blue-800 text-xs font-semibold">5+ yrs exp</span>
                  )}
                  {worker.id % 4 === 0 && (
                    <span className="px-2 py-0.5 rounded bg-yellow-200 text-yellow-800 text-xs font-semibold">Top Rated</span>
                  )}
                </div>
                {/* Ratings */}
                <div className="flex items-center gap-1 mb-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span key={i} className={i < Math.floor(getRating(worker.id)) ? 'text-yellow-400' : 'text-gray-300'}>★</span>
                  ))}
                  {getRating(worker.id) % 1 !== 0 && <span className="text-yellow-400">½</span>}
                  <span className="ml-1 text-xs text-gray-500">({getReviews(worker.id)})</span>
                </div>
                <span className="px-4 py-1 text-base rounded-full bg-green-100 text-green-700 font-semibold mb-3 mt-1 shadow-sm">
                  ₹{Math.round(worker.pricePerDay * 1.18)} / day
                </span>
                <div className="flex gap-3 mt-2 w-full justify-center">
                  <button className="flex items-center gap-2 px-5 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-semibold shadow focus:outline-none focus:ring-2 focus:ring-green-400 text-base group-hover:scale-105 group-hover:shadow-xl duration-200">
                    <span>✅</span> Hire Now
                  </button>
                  <button className="flex items-center gap-2 px-5 py-2 border border-blue-400 text-blue-700 rounded-lg hover:bg-blue-50 dark:hover:bg-neutral-700 transition font-semibold text-base group-hover:scale-105 duration-200">
                    <span>�</span> View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
      </div>
    </main>
  );
}
