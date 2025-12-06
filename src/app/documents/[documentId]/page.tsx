import Editor from './editor';
import Navbar from './navbar';
import Toolbar from './toolbar';

interface IDocumentIdProps {
  params: Promise<{ documentId: string }>;
}

const DocumentIdPage = async ({ params }: IDocumentIdProps) => {
  const { documentId } = await params;
  console.log('Document ID:', documentId);
  return (
    <div className='min-h-screen'>
      <Navbar />
      <Toolbar />
      <Editor />
    </div>
  );
};

export default DocumentIdPage;
