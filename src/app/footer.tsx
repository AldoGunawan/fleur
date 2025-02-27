"use client";

import { useEffect, useState } from "react";

import Image from "next/image";
import Link from "next/link";

interface Post {
  id: number;
  title: string;
  content: string;
  imageUrl?: string;
  createdAt: string;
}

const truncateText = (text: string, maxLength: number) => {
  return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
};

const Footer = () => {
  const [latestPosts, setLatestPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchLatestPosts = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/post`);
        const json = await res.json();
        setLatestPosts(json.posts.slice(0, 2));
      } catch (error) {
        console.error("Error fetching latest posts:", error);
      }
    };

    fetchLatestPosts();
  }, []);

  return (
    <div>
      {/* Berita Terbaru */}
      <div className="max-w-7xl mx-auto my-16 px-5">
        <h2 className="text-2xl font-bold text-center mb-6">Berita Terbaru</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {latestPosts.length > 0 ? (
            latestPosts.map((post) => (
              <Link key={post.id} href={`/event/${post.id}`} className="block">
                <div className="border rounded-lg shadow-lg bg-white overflow-hidden hover:scale-105 transition-transform">
                  {post.imageUrl && (
                    <div className="relative w-full h-40 bg-gray-200">
                      <Image
                        src={post.imageUrl}
                        alt="Event Image"
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div className="p-4">
                    <h3 className="font-bold line-clamp-2">
                      {truncateText(post.title, 50)}
                    </h3>
                    <p className="text-gray-500 text-sm">
                      {new Intl.DateTimeFormat("id-ID", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                      }).format(new Date(post.createdAt))}
                    </p>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <p className="text-center text-gray-500">Memuat berita...</p>
          )}
        </div>

        <div className="text-right mt-4">
          <Link href="/event" className="text-blue-500 font-semibold hover:underline">
            Lihat lebih banyak →
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-10">
        <div className="max-w-7xl mx-auto px-5 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-bold">Use Cases</h3>
            <ul className="mt-2 space-y-2 text-gray-400">
              <li className="hover:text-white cursor-pointer">UI Design</li>
              <li className="hover:text-white cursor-pointer">UX Design</li>
              <li className="hover:text-white cursor-pointer">Wireframing</li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold">Explore</h3>
            <ul className="mt-2 space-y-2 text-gray-400">
              <li className="hover:text-white cursor-pointer">Design</li>
              <li className="hover:text-white cursor-pointer">Prototyping</li>
              <li className="hover:text-white cursor-pointer">Development Features</li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold">Resources</h3>
            <ul className="mt-2 space-y-2 text-gray-400">
              <li className="hover:text-white cursor-pointer">Blog</li>
              <li className="hover:text-white cursor-pointer">Best Practices</li>
              <li className="hover:text-white cursor-pointer">Colors</li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
