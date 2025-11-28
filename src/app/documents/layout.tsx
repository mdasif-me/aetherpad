interface IDocumentLayoutProps {
  children: React.ReactNode;
}

const DocumentLayout = ({ children }: IDocumentLayoutProps) => {
  return (
    <div>
      <nav className='bg-accent text-primary p-8 w-full flex justify-center items-center gap-10'>
        Navigation Bar
      </nav>
      {children}
    </div>
  );
};

export default DocumentLayout;
