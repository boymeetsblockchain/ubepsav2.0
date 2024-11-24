import Link from "next/link";

function AdminPage() {
  const boxes = [
    { name: "Create Post", link: "/admin/create " },
    { name: "Adverts", link: "/admin/content" },
    { name: "Users", link: "/admin/users" },
    { name: "Posts", link: "/admin/posts" },
    { name: "Create Adverts", link: "/admin/create-advert" },
  ];

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100  mx-auto">
      <div className="max-w-4xl w-full bg-white  p-10 rounded-lg shadow-lg grid grid-cols-1 sm:grid-cols-2 gap-8">
        {boxes.map((box, index) => (
          <Link key={index} href={box.link}>
            <div className="flex flex-col items-center justify-center bg-gradient-to-r from-blue-500 to-blue-700 dark:from-blue-700 dark:to-blue-900 text-white font-bold p-10 rounded-lg shadow-lg cursor-pointer transition-transform transform hover:scale-105 hover:shadow-2xl">
              <span className="text-2xl mb-2">{box.name}</span>
              <span className="text-xs opacity-80">
                Manage {box.name.toLowerCase()}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default AdminPage;
