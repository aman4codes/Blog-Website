import { useEffect, useState } from "react";
import api from "../api/axios";
import Navbar from "../components/navbar";

function Home() {
  const [blogs, setBlogs] = useState([]);

  const blogAPICall = async () => {
    try {
      const { data } = await api.get("/blog/allBlog");

      if (data.success) {
        setBlogs(data.blogs);
      }
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  };

  useEffect(() => {
    blogAPICall();
  }, []);

  return (
    <div className="min-h-screen p-4">
      <div className="flex flex-col border-2 border-red-600 rounded-3xl p-6 gap-6">
        {/* Navbar */}
        <div className="border-2 rounded-3xl p-2">
          <Navbar />
        </div>

        {/* Main Content */}
        <div className="flex flex-1 border-2 rounded-3xl p-4 gap-4">
          {/* Blog Section */}
          <div className="flex-1 border-2 rounded-3xl p-4 overflow-y-auto">
            <h1 className="text-3xl font-bold mb-6">Detail Blogs</h1>

            {blogs.length === 0 ? (
              <p>No blogs found.</p>
            ) : (
              blogs.map((blog) => (
                <div
                  key={blog.id}
                  className="flex flex-row border rounded-xl p-4 mb-4 gap-2"
                >
                  {/* Author Section */}
                  <div>
                    <div className="w-full max-h-max border-2 rounded-3xl p-4">
                      <h1 className="text-2xl font-bold mb-4">
                        Author Details
                      </h1>

                      <p>Name: {blog.author.name}</p>
                      <p>Role: Blogger</p>
                    </div>
                  </div>
                  <div className="border-2 rounded-3xl w-full p-4">
                    <h2 className="text-2xl font-semibold mb-2">
                      {blog.title}
                    </h2>

                    <p className="mb-3">{blog.content}</p>

                    <span
                      className={`px-3 py-1 rounded-lg text-sm ${
                        blog.isPublic ? "bg-green-500" : "bg-red-500"
                      }`}
                    >
                      {blog.isPublic ? "Public" : "Private"}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
