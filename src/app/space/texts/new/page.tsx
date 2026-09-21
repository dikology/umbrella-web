import AddTextForm from '@/components/AddTextForm';
import BackToLibrary from '@/components/BackToLibrary';

export const metadata = {
  title: 'Add a Text - Umbrella',
  robots: 'noindex',
};

export default function NewTextPage() {
  return (
    <>
      <BackToLibrary />
      <h1 className="mb-2 mt-4 text-4xl text-ink-700">Add a Text</h1>
      <p className="mb-8 max-w-prose text-ink-500">
        Paste the Chinese you want to read. Once it’s in your Library it can’t be edited, only
        deleted, so check the paste first.
      </p>
      <AddTextForm />
    </>
  );
}
