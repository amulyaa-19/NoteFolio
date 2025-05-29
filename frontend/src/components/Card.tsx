import { useEffect, useRef } from "react";
import { BookOpen } from "../icons/BookOpen";
import { DeleteIcon } from "../icons/DeleteIcon";
import { ArrowIcon } from "../icons/ArrowIcon";

interface CardProps {
  title: string;
  link: string;
  type: "twitter" | "youtube";
  onDelete: () => void;
}

// TwitterEmbed component to load and render Twitter widgets dynamically
function TwitterEmbed({ url }: { url: string }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Load Twitter widget script only once
    if (!window.twttr) {
      const script = document.createElement("script");
      script.src = "https://platform.twitter.com/widgets.js";
      script.async = true;
      document.body.appendChild(script);
      script.onload = () => {
        window.twttr?.widgets.load(containerRef.current);
      };
    } else {
      window.twttr?.widgets.load(containerRef.current);
    }
  }, [url]);

  return (
    <div ref={containerRef}>
      <blockquote className="twitter-tweet">
        <a href={url.replace("x.com", "twitter.com")}></a>
      </blockquote>
    </div>
  );
}

export function Card({ title, link, type, onDelete }: CardProps) {
  return (
    <div>
      <div className="p-4 bg-white rounded-md border-gray max-w-72 border min-h-42 min-w-72">
        <div className="flex justify-center">
          <div className="flex items-center text-md">
            <div className="text-gray-500 pr-2">
              <BookOpen />
            </div>
            {title}
          </div>
          <div className="flex items-center">
            <div className="pr-2 pl-4 text-gray-500">
              <a href={link} target="_blank" rel="noreferrer">
                <ArrowIcon />
              </a>
            </div>
            <div className="text-gray-500 pl-4 cursor-pointer" onClick={onDelete}>
              <DeleteIcon />
            </div>
          </div>
        </div>
        <div className="pt-4">
          {type === "youtube" && (
            <iframe
              className="w-full"
              src={link.replace("watch", "embed").replace("?v=", "/")}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          )}

          {type === "twitter" && <TwitterEmbed url={link} />}
        </div>
      </div>
    </div>
  );
}
