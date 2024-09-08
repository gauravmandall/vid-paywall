"use client";
import { Button } from "@/components/ui/button";
import { useCheckPremium } from "@/lib/hooks/users/use-check-premium";
import React from "react";
import Upgrade from "./upgrade";

export const VideoPlayer = () => {
  const { data: isPremium, isPending, isError } = useCheckPremium();

  if (isPending) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading video</div>;
  }

  if (!isPremium) {
    return (
      <div>
        <p>
          This is a premium video. Please subscribe to watch.
          </p>
          <Upgrade />
      </div>
    );
  }
  return (
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
  );
};
