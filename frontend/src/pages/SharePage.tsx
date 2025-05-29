import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Card } from "../components/Card"; // adjust path based on your project

interface Content {
  _id: string;
  title: string;
  link: string;
  type: "youtube" | "twitter";
}

export function SharePage() {
  const { shareLink } = useParams();
  const [content, setContent] = useState<Content[]>([]);
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSharedData() {
      try {
        const res = await axios.get(`http://localhost:3000/api/v1/brain/${shareLink}`);
        setContent(res.data.content);
        setUsername(res.data.username);
      } catch (err) {
        console.error("Error fetching shared content", err);
      } finally {
        setLoading(false);
      }
    }

    fetchSharedData();
  }, [shareLink]);

  if (loading) return <div className="p-4">Loading shared content...</div>;
  if (!content.length) return <div className="p-4">No shared content available.</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">🧠 {username}'s Brain</h1>
      <div className="flex flex-wrap gap-4">
        {content.map((item) => (
          <Card
            key={item._id}
            title={item.title}
            link={item.link}
            type={item.type}
            onDelete={() => {}}
          />
        ))}
      </div>
    </div>
  );
}
