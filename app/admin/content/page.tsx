"use client";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ClipLoader } from "react-spinners";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useState, useEffect } from "react";
import { deleteAdvert, getAllAdverts } from "@/actions/advert";
import { Advert } from "@prisma/client";

function AdvertPage() {
  const [adverts, setAdverts] = useState<Advert[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const getAdverts = async () => {
      try {
        setLoading(true);
        const data = await getAllAdverts();
        if (data?.success) {
          setAdverts(data.adverts as Advert[]);
        }
      } catch (err) {
        setError("Failed to fetch adverts. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    getAdverts();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await deleteAdvert(id as string);
      setAdverts((prev) => prev.filter((advert) => advert.id !== id));
      alert("Advert deleted successfully!");
    } catch (err) {
      alert("Failed to delete advert. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <ClipLoader size={50} color="#3498db" className="animate-spin" />
      </div>
    );
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Adverts Management</h1>
      <Table>
        <TableCaption>All Advertisements</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Content</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {adverts.length > 0 ? (
            adverts.map((advert) => (
              <TableRow key={advert.id}>
                <TableCell>{advert.content}</TableCell>
                <TableCell>{advert.contact}</TableCell>
                <TableCell>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <button className="text-red-600 hover:underline">
                        Delete
                      </button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Confirm Deletion</AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to delete this advert? This
                          action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => handleDelete(advert.id)}
                        >
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4} className="text-center">
                No adverts found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
export default AdvertPage;
