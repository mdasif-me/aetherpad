import { Button } from '../../../components/ui/button';
import Editor from './editor';

interface IDocumentIdProps {
  params: Promise<{ documentId: string }>;
}

const DocumentIdPage = async ({ params }: IDocumentIdProps) => {
  const { documentId } = await params;

  return (
    <div className='min-h-screen'>
      <nav className='bg-accent text-primary p-8 w-full flex justify-center items-center gap-10'>
        Navigation Bar
        <Button>Document ID: {documentId}</Button>
      </nav>
      <Editor />
    </div>
  );
};

export default DocumentIdPage;
