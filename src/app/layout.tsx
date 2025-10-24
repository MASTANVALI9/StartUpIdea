import type { Metadata } from "next";
import "./globals.css";
import VisualEditsMessenger from "../visual-edits/VisualEditsMessenger";
import ErrorReporter from "@/components/ErrorReporter";
import Script from "next/script";

export const metadata: Metadata = {
  title: "CareerPath - Career Guidance for 10th Class Students",
  description: "Complete career guidance platform for 10th class students. Explore streams, compare salaries, and find local colleges.",
  keywords: ["career guidance", "10th class", "career streams", "colleges", "salary insights"],
  authors: [{ name: "CareerPath Team" }],
  openGraph: {
    title: "CareerPath - Career Guidance for 10th Class Students",
    description: "Complete career guidance platform for 10th class students. Explore streams, compare salaries, and find local colleges.",
    type: "website",
  },
};

// Enable static generation
export const dynamic = 'force-static';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <ErrorReporter />
        <Script
          src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/scripts//route-messenger.js"
          strategy="afterInteractive"
          data-target-origin="*"
          data-message-type="ROUTE_CHANGE"
          data-include-search-params="true"
          data-only-in-iframe="true"
          data-debug="true"
          data-custom-data='{"appName": "YourApp", "version": "1.0.0", "greeting": "hi"}'
        />
        {children}
        <VisualEditsMessenger />
      </body>
    </html>
  );
}