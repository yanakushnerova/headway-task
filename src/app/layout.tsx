import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Who wants to be a millionaire?',
  description:
    'A quiz game where you can test your knowledge of geography, capitals, and famous landmarks.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
