interface IDocumentLayoutProps {
  children: React.ReactNode;
}

const DocumentLayout = ({ children }: IDocumentLayoutProps) => {
  return <main>{children}</main>;
};

export default DocumentLayout;
