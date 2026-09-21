import BackToLibrary from '@/components/BackToLibrary';
import TextView from '@/components/TextView';

export const metadata = {
  title: 'Text - Umbrella',
  robots: 'noindex',
};

export default async function TextPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return (
    <>
      <BackToLibrary />
      <TextView id={id} />
    </>
  );
}
