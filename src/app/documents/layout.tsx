interface IDocumentLayoutProps {
  children: React.ReactNode;
}

const DocumentLayout = ({ children }: IDocumentLayoutProps) => {
  return <div>{children}</div>;
};

export default DocumentLayout;
