import AuthButtons from "@/components/AuthButtons";
import WriteConfession from "@/components/WriteConfession";
import ConfessionList from "@/components/ConfessionList";

export default function Home() {
  return (
    <main className="min-h-screen bg-black-50 flex flex-col items-center py-10 px-4">
      <div className="w-full max-w-md space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Anonymous Confession Wall 📝</h1>
          <AuthButtons />
        </div>

        <div className="bg-black rounded-lg shadow p-4">
          <WriteConfession />
        </div>

        <div className="bg-black rounded-lg shadow p-4">
          <h2 className="text-lg font-semibold mb-2">Latest Confessions</h2>
          <ConfessionList />
        </div>
      </div>
    </main>
  );
}
