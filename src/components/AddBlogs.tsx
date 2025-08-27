import { useEffect, useState } from "react";
const baseURL = import.meta.env.VITE_API_BASE_URL;

interface BlogPost {
  _id?: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  tags?: string;
  coverImage?: string;
}

const AddBlog = ({
  onClose,
  onSuccess,
  existingBlog = null,
}: {
  onClose: () => void;
  onSuccess: () => void;
  existingBlog?: BlogPost | null;
}) => {
  const [formData, setFormData] = useState({
    title: existingBlog?.title || "",
    slug: existingBlog?.slug || "",
    excerpt: existingBlog?.excerpt || "",
    content: existingBlog?.content || "",
    author: existingBlog?.author || "",
    tags: existingBlog?.tags || "",
    coverImage: null as File | null,
  });

  useEffect(() => {
    if (existingBlog) {
      setFormData({
        title: existingBlog.title,
        slug: existingBlog.slug,
        excerpt: existingBlog.excerpt,
        content: existingBlog.content,
        author: existingBlog.author,
        tags: existingBlog?.tags || "",
        coverImage: null,
      });
    }
  }, [existingBlog]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    // Auto-generate slug if the title is changing and the slug hasn't been manually modified
    if (name === "title") {
      const autoSlug = value
        .toLowerCase()
        .replace(/[^a-z0-9\s]/g, "") // remove special chars
        .trim()
        .replace(/\s+/g, "-"); // replace spaces with -

      setFormData((prev) => ({
        ...prev,
        title: value,
        slug: existingBlog ? prev.slug : autoSlug, // don't overwrite if editing
      }));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData({ ...formData, coverImage: e.target.files[0] });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const blogData = new FormData();
    blogData.append("title", formData.title);
    blogData.append("slug", formData.slug);
    blogData.append("excerpt", formData.excerpt);
    blogData.append("content", formData.content);
    blogData.append("author", formData.author);
    blogData.append("tags", formData.tags);
    if (formData.coverImage) blogData.append("coverImage", formData.coverImage);

    try {
      const method = existingBlog ? "PUT" : "POST";
      const endpoint = existingBlog
        ? `${baseURL}/api/blogs/${existingBlog.slug}`
        : `${baseURL}/api/blogs/add`;

      const res = await fetch(endpoint, {
        method,
        body: blogData,
      });

      const data = await res.json();
      if (res.ok) {
        alert(
          existingBlog ? "Blog updated successfully" : "Blog added successfully"
        );
        onSuccess();
        onClose();
      } else {
        alert(
          data.error || `Failed to ${existingBlog ? "update" : "add"} blog`
        );
      }
    } catch (err) {
      alert(`Error ${existingBlog ? "updating" : "adding"} blog`);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-[9999]">
      <div className="bg-white text-black p-6 w-full max-w-2xl rounded-xl overflow-y-auto max-h-[90vh]">
        <h2 className="text-2xl font-bold mb-4">
          {existingBlog ? "Edit Blog" : "Add New Blog"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="title"
            placeholder="Title"
            className="w-full p-2 border"
            value={formData.title}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="slug"
            placeholder="Slug"
            className="w-full p-2 border"
            value={formData.slug}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="excerpt"
            placeholder="Excerpt"
            className="w-full p-2 border"
            value={formData.excerpt}
            onChange={handleChange}
            required
          />
          <textarea
            name="content"
            placeholder="Content"
            className="w-full p-2 border h-32"
            value={formData.content}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="author"
            placeholder="Author"
            className="w-full p-2 border"
            value={formData.author}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="tags"
            placeholder="Tags (comma separated)"
            className="w-full p-2 border"
            value={formData.tags}
            onChange={handleChange}
          />
          <label className="block mb-2 font-medium">
            Upload Image (JPG, JPEG, or PNG only)
          </label>
          <input
            type="file"
            accept="image/png, image/jpeg, image/jpg"
            className="w-full"
            onChange={handleImageChange}
            required={!existingBlog}
          />
          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-400 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-[var(--primary-color)] text-white rounded"
            >
              {existingBlog ? "Update" : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBlog;
