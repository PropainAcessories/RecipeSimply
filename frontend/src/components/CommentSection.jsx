import { useEffect, useState, useCallback } from "react";
import axios from "../utils/axios";

export default function CommentSection({ recipeId }) {
  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");

  const loadComments = useCallback(() => {
    axios.get(`/recipes/${recipeId}/comments/`).then((res) => {
      setComments(res.data);
    });
  }, [recipeId]);

  useEffect(() => {
    loadComments();
  }, [loadComments]);

  const submitComment = (e) => {
    e.preventDefault();
    axios.post(`/recipes/${recipeId}/comments/`, { text }).then(() => {
      setText("");
      loadComments();
    });
  };

  return (
    <div className="mt-10">
      <h2 className="text-xl font-semibold mb-3">Comments</h2>

      <form onSubmit={submitComment} className="flex gap-2 mb-4">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Write a comment..."
          className="flex-1 border rounded-lg px-3 py-2"
        />
        <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-300">
          Post
        </button>
      </form>

      <div className="space-y-3">
        {comments.map((c) => (
          <div key={c.id} className="bg-gray-100 p-3 rounded-lg shadow-sm">
            <p className="font-semibold">{c.author_username}</p>
            <p className="text-gray-700">{c.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
