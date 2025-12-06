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
      <div className='flex flex-col px-4 pt-2 gap-y-2 fixed top-0 left-0 right-0 z-10 bg-[#fafbfd] print:hidden'>
        <Navbar />
        <Toolbar />
      </div>
      <div className='pt-[114px] print:pt-0 '>
        <Editor />
      </div>
    </div>
  );
};

export default DocumentIdPage;
