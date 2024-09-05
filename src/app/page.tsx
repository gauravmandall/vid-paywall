import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await auth();

  if (!session) {
    redirect("/api/auth/signin");
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <iframe
        src="https://iframe.mediadelivery.net/embed/300462/5adc3141-9b26-4c28-a2cb-52a0d20de025"
        loading="lazy"
        style={{
          border: "none",
          width: "100%",
          height: "100%",
          position: "absolute",
          top: 0,
          left: 0,
        }}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen={true}
        className="w-full h-96"
      />
    </main>
  );
}
