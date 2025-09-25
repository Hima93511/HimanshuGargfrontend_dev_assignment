import Image from "next/image";
import React from "react";

type Props = {
  title: string;
  description: string;
  imgSrc: string;
};

export default function Card({ title, description, imgSrc }: Props) {
  return (
    <article className="bg-white dark:bg-gray-800 rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative h-48 w-full">
        <Image
          src={imgSrc}
          alt={title}
          layout="fill"
          objectFit="cover"
          placeholder="blur"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">{description}</p>
      </div>
    </article>
  );
}
